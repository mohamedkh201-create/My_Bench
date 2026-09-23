# Copyright (c) 2026, ahmed hashim and contributors
# For license information, please see license.txt

"""Shared helpers for the CPro API layer.

Kept dependency-light: everything here builds on ``frappe`` + ERPNext, never on
any legacy app. User-facing strings go through ``frappe._`` so the UI can be
localized (en / ar) per requirement #8 (graceful, localized errors).
"""

import frappe
from frappe import _

SETTINGS_DOCTYPE = "Cpro Settings"

# Role names shipped by CPro (mirrors cpro.install.CPRO_ROLES).
ROLE_MANAGER = "Cpro Manager"
ROLE_CASHIER = "Cpro Cashier"
ROLE_WAITER = "Cpro Waiter"
ROLE_KITCHEN = "Cpro Kitchen"


def get_settings():
	"""Return the (cached) Cpro Settings single."""
	return frappe.get_cached_doc(SETTINGS_DOCTYPE)


def has_any_role(*roles) -> bool:
	"""True if the current user has at least one of ``roles`` (System Manager always passes)."""
	user_roles = set(frappe.get_roles())
	if "System Manager" in user_roles:
		return True
	return bool(user_roles.intersection(roles))


def require_role(*roles, message: str | None = None):
	"""Guard a whitelisted method behind one or more CPro roles.

	Raises a *graceful*, localized permission error instead of a raw stack trace.
	"""
	if has_any_role(*roles):
		return
	frappe.throw(
		message or _("You do not have permission to perform this action."),
		frappe.PermissionError,
		title=_("Permission Required"),
	)


def guest_orders_allowed() -> bool:
	return bool(get_settings().allow_guest_orders)


def call_waiter_enabled() -> bool:
	return bool(get_settings().enable_call_waiter)
