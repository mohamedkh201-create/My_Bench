# Copyright (c) 2026, ahmed hashim and contributors
# For license information, please see license.txt

"""Cpro POS Closing Shift.

Reconciles a shift at hand-off: pulls the sales totals and expected cash (by
payment mode) from the POS Invoices raised during the shift, compares them
against the cashier's counted amounts, and closes the linked Opening Shift on
submit.
"""

import frappe
from frappe import _
from frappe.model.document import Document
from frappe.utils import flt, now_datetime


class CproPOSClosingShift(Document):
	def validate(self):
		if not self.period_end_datetime:
			self.period_end_datetime = now_datetime()
		self._validate_opening_shift()
		self._pull_aggregates()

	def on_submit(self):
		self.db_set("status", "Submitted")
		frappe.db.set_value("Cpro POS Opening Shift", self.pos_opening_shift, "status", "Closed")

	def on_cancel(self):
		self.db_set("status", "Draft")
		# Re-open the shift so it can be reconciled again.
		frappe.db.set_value("Cpro POS Opening Shift", self.pos_opening_shift, "status", "Open")

	def _validate_opening_shift(self):
		opening = frappe.db.get_value(
			"Cpro POS Opening Shift", self.pos_opening_shift, ["status", "docstatus"], as_dict=True
		)
		if not opening:
			frappe.throw(_("The linked opening shift no longer exists."))
		# On submit the shift must still be Open; allow re-editing a draft closing of
		# an already-closed shift only if this very doc closed it (cancel/amend flow).
		if self.docstatus == 0 and opening.status == "Closed":
			frappe.throw(
				_("Opening shift {0} is already closed.").format(frappe.bold(self.pos_opening_shift)),
				title=_("Shift Already Closed"),
			)

	def _pull_aggregates(self):
		"""Recompute totals + expected cash from the shift's POS Invoices (source of truth)."""
		from cpro.api.shift import compute_shift_aggregates

		agg = compute_shift_aggregates(self.pos_opening_shift)
		self.pos_invoice_count = agg["pos_invoice_count"]
		self.total_quantity = agg["total_quantity"]
		self.net_total = agg["net_total"]
		self.total_taxes_and_charges = agg["total_taxes_and_charges"]
		self.grand_total = agg["grand_total"]

		expected = agg["expected_by_mode"]
		# Update each reconciliation row's expected + difference; keep counted as entered.
		for row in self.payment_reconciliation:
			row.expected_amount = flt(expected.get(row.mode_of_payment, 0))
			row.difference = flt(row.closing_amount) - flt(row.expected_amount)
