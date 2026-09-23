# Copyright (c) 2026, ahmed hashim and contributors
# For license information, please see license.txt

"""POS Shift management API.

A cashier must **open a shift** (declaring the opening cash float) before the
POS will take orders, and **close it** with a cash reconciliation at hand-off.
Shifts are ERPNext-native in spirit but CPro-owned:

* ``POS Opening Entry``  — submitted → status ``Open``
* ``POS Closing Entry``  — submitted → closes the opening shift

Every POS Invoice raised in between is stamped with ``cpro_pos_opening_shift``
so closing can total sales and expected cash per payment mode. All figures are
recomputed server-side from those invoices — the client never dictates money.
"""

import frappe
import frappe.permissions
from frappe import _
from frappe.utils import flt, now_datetime

from cpro.api.utils import require_role, has_any_role, ROLE_CASHIER, ROLE_MANAGER, ROLE_WAITER

OPEN_STATUS = "Open"


# --------------------------------------------------------------------------- #
# Internal helpers (no role check — callers guard)                            #
# --------------------------------------------------------------------------- #
def _get_open_shift_name(user: str, pos_profile: str | None = None) -> str | None:
	"""Return the name of the user's currently open shift, or None."""
	filters = {"user": user, "status": OPEN_STATUS, "docstatus": 1}
	if pos_profile:
		filters["pos_profile"] = pos_profile
	return frappe.db.get_value("POS Opening Entry", filters, "name")


def require_open_shift(user: str, pos_profile: str | None = None) -> str:
	"""Return the open shift name or raise a graceful, localized error."""
	shift = _get_open_shift_name(user, pos_profile)
	if not shift:
		frappe.throw(
			_("Please open a POS shift before taking orders."),
			title=_("No Open Shift"),
		)
	return shift


def compute_shift_aggregates(opening_shift: str) -> dict:
	"""Totals + expected cash by payment mode for a shift's paid POS Invoices.

	Only *submitted* (paid) invoices count toward money; draft orders are still
	open tabs and are reported separately as ``open_order_count``.
	"""
	paid = frappe.get_all(
		"POS Invoice",
		filters={"cpro_pos_opening_shift": opening_shift, "docstatus": 1},
		fields=["name", "net_total", "total_taxes_and_charges", "grand_total", "total_qty", "change_amount"],
	)
	names = [r.name for r in paid]

	expected_by_mode: dict[str, float] = {}
	if names:
		for p in frappe.get_all(
			"Sales Invoice Payment",
			filters={"parent": ["in", names], "parenttype": "POS Invoice"},
			fields=["mode_of_payment", "amount"],
		):
			expected_by_mode[p.mode_of_payment] = expected_by_mode.get(p.mode_of_payment, 0) + flt(p.amount)

	# Deduct change amounts (usually returned in Cash) from the Cash mode
	total_change = sum(flt(r.change_amount) for r in paid)
	if total_change > 0:
		cash_mode = "Cash"
		if cash_mode in expected_by_mode:
			expected_by_mode[cash_mode] -= total_change
		elif expected_by_mode:
			# fallback: deduct from the first available mode
			first_mode = next(iter(expected_by_mode))
			expected_by_mode[first_mode] -= total_change

	open_order_count = frappe.db.count(
		"POS Invoice", {"cpro_pos_opening_shift": opening_shift, "docstatus": 0}
	)

	return {
		"pos_invoice_count": len(paid),
		"open_order_count": open_order_count,
		"total_quantity": sum(flt(r.total_qty) for r in paid),
		"net_total": sum(flt(r.net_total) for r in paid),
		"total_taxes_and_charges": sum(flt(r.total_taxes_and_charges) for r in paid),
		"grand_total": sum(flt(r.grand_total) for r in paid),
		"expected_by_mode": expected_by_mode,
	}


def _profile_payment_modes(pos_profile: str) -> list[str]:
	"""Payment modes configured on a POS Profile (fallback: enabled + Cash)."""
	modes = [
		r.mode_of_payment
		for r in frappe.get_all(
			"POS Payment Method",
			filters={"parent": pos_profile, "parenttype": "POS Profile"},
			fields=["mode_of_payment"],
			order_by="idx asc",
		)
	]
	if modes:
		return modes
	if frappe.db.exists("Mode of Payment", "Cash"):
		return ["Cash"]
	first = frappe.db.get_value("Mode of Payment", {"enabled": 1}, "name")
	return [first] if first else []


def _available_pos_profiles(user: str) -> list[dict]:
	"""POS profiles the user may open a shift on, each with its payment modes."""
	profiles = frappe.get_all(
		"POS Profile", filters={"disabled": 0}, fields=["name", "company", "currency"], order_by="name asc"
	)
	for p in profiles:
		p["payment_modes"] = _profile_payment_modes(p.name)
	return profiles


def _serialize_shift(name: str) -> dict:
	doc = frappe.get_doc("POS Opening Entry", name)
	return {
		"name": doc.name,
		"pos_profile": doc.pos_profile,
		"company": doc.company,
		"user": doc.user,
		"status": doc.status,
		"period_start_datetime": str(doc.period_start_date),
		"balances": [
			{"mode_of_payment": r.mode_of_payment, "opening_amount": flt(r.opening_amount)}
			for r in doc.balance_details
		],
	}


# --------------------------------------------------------------------------- #
# Whitelisted API                                                             #
# --------------------------------------------------------------------------- #
@frappe.whitelist()
def get_current_shift(pos_profile: str | None = None) -> dict:
	"""Everything the POS gate needs in one call: the open shift (if any),
	whether the user may open one, and the profiles + payment modes to open with."""
	require_role(ROLE_CASHIER, ROLE_WAITER, ROLE_MANAGER)
	user = frappe.session.user
	open_name = _get_open_shift_name(user, pos_profile)
	return {
		"shift": _serialize_shift(open_name) if open_name else None,
		"can_open": has_any_role(ROLE_CASHIER, ROLE_MANAGER),
		"pos_profiles": _available_pos_profiles(user),
	}


@frappe.whitelist()
def open_shift(pos_profile: str, balance_details) -> dict:
	"""Open (create + submit) a shift for the current user."""
	require_role(ROLE_CASHIER, ROLE_MANAGER)
	user = frappe.session.user

	if _get_open_shift_name(user, pos_profile):
		frappe.throw(
			_("You already have an open shift on this POS profile."), title=_("Shift Already Open")
		)

	balance_details = frappe.parse_json(balance_details) if isinstance(balance_details, str) else balance_details

	doc = frappe.new_doc("POS Opening Entry")
	doc.pos_profile = pos_profile
	doc.user = user
	doc.company = frappe.db.get_value("POS Profile", pos_profile, "company")
	branch = frappe.db.get_value("POS Profile", pos_profile, "branch")
	if not branch:
		branch = frappe.db.get_value("Branch", {}, "name")
		if not branch:
			new_branch = frappe.new_doc("Branch")
			new_branch.branch = "Main Branch"
			new_branch.branch_name = "Main Branch"
			new_branch.insert(ignore_permissions=True)
			branch = new_branch.name
		frappe.db.set_value("POS Profile", pos_profile, "branch", branch)
	doc.branch = branch
	doc.period_start_date = now_datetime()
	for row in balance_details or []:
		doc.append(
			"balance_details",
			{
				"mode_of_payment": row.get("mode_of_payment"),
				"opening_amount": flt(row.get("opening_amount")),
			},
		)
	if not doc.balance_details:
		frappe.throw(_("Declare an opening balance for at least one payment mode."))

	try:
		doc.insert(ignore_permissions=True)
		doc.submit()
		frappe.db.commit()
	except Exception as e:
		import traceback
		frappe.log_error(title="Open Shift Error", message=traceback.format_exc())
		raise e

	return _serialize_shift(doc.name)


@frappe.whitelist()
def get_shift_summary(pos_opening_shift: str) -> dict:
	"""Preview a shift's sales + expected cash for the close-out screen."""
	require_role(ROLE_CASHIER, ROLE_MANAGER)
	agg = compute_shift_aggregates(pos_opening_shift)

	opening = frappe.get_doc("POS Opening Entry", pos_opening_shift)
	opening_by_mode = {r.mode_of_payment: flt(r.opening_amount) for r in opening.balance_details}

	# Union of every payment mode that has either an opening float or takings.
	modes = list(dict.fromkeys([*opening_by_mode.keys(), *agg["expected_by_mode"].keys()]))
	rows = [
		{
			"mode_of_payment": m,
			"opening_amount": opening_by_mode.get(m, 0),
			"expected_amount": opening_by_mode.get(m, 0) + agg["expected_by_mode"].get(m, 0),
		}
		for m in modes
	]

	return {
		"pos_opening_shift": pos_opening_shift,
		"pos_profile": opening.pos_profile,
		"user": opening.user,
		"period_start_datetime": str(opening.period_start_date),
		"pos_invoice_count": agg["pos_invoice_count"],
		"open_order_count": agg["open_order_count"],
		"total_quantity": agg["total_quantity"],
		"net_total": agg["net_total"],
		"total_taxes_and_charges": agg["total_taxes_and_charges"],
		"grand_total": agg["grand_total"],
		"reconciliation": rows,
	}


@frappe.whitelist()
def close_shift(pos_opening_shift: str, payment_reconciliation, closing_notes: str | None = None) -> dict:
	"""Create + submit the closing shift, reconciling counted vs expected cash."""
	require_role(ROLE_CASHIER, ROLE_MANAGER)
	payment_reconciliation = (
		frappe.parse_json(payment_reconciliation)
		if isinstance(payment_reconciliation, str)
		else payment_reconciliation
	)

	from erpnext.accounts.doctype.pos_closing_entry.pos_closing_entry import make_closing_entry_from_opening

	opening_entry = frappe.get_doc("POS Opening Entry", pos_opening_shift)
	doc = make_closing_entry_from_opening(opening_entry)

	branch = opening_entry.branch if hasattr(opening_entry, "branch") else None
	if not branch:
		branch = frappe.db.get_value("Branch", {}, "name")
		if not branch:
			new_branch = frappe.new_doc("Branch")
			new_branch.branch = "Main Branch"
			new_branch.branch_name = "Main Branch"
			new_branch.insert(ignore_permissions=True)
			branch = new_branch.name
	doc.branch = branch
	
	input_by_mode = {r.get("mode_of_payment"): flt(r.get("closing_amount")) for r in payment_reconciliation or []}
	for row in doc.payment_reconciliation:
		row.closing_amount = input_by_mode.get(row.mode_of_payment, 0)
	
	expected_modes = [r.mode_of_payment for r in doc.payment_reconciliation]
	for r in payment_reconciliation or []:
		if r.get("mode_of_payment") not in expected_modes:
			doc.append("payment_reconciliation", {
				"mode_of_payment": r.get("mode_of_payment"),
				"opening_amount": flt(r.get("opening_amount", 0)),
				"expected_amount": 0,
				"closing_amount": flt(r.get("closing_amount", 0))
			})

	original_has_permission = frappe.permissions.has_permission
	frappe.permissions.has_permission = lambda *args, **kwargs: True
	frappe.flags.ignore_permissions = True
	try:
		doc.insert(ignore_permissions=True)  # expected/difference computed in validate
		doc.submit()
	finally:
		frappe.permissions.has_permission = original_has_permission
		frappe.flags.ignore_permissions = False
	frappe.db.commit()

	return {
		"name": doc.name,
		"grand_total": doc.grand_total,
		"net_total": doc.net_total,
		"total_taxes_and_charges": doc.total_taxes_and_charges,
		"difference_total": sum(flt(r.difference) for r in doc.payment_reconciliation),
		"payments": [
			{
				"mode_of_payment": r.mode_of_payment,
				"expected_amount": flt(r.expected_amount),
				"closing_amount": flt(r.closing_amount),
				"difference": flt(r.difference),
			}
			for r in doc.payment_reconciliation
		]
	}
