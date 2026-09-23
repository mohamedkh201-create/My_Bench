# Copyright (c) 2026, ahmed hashim and contributors
# For license information, please see license.txt

import click
import frappe

# Roles shipped by CPro. Created before DocType permissions are synced so that
# the DocPerm rows bind to real Role records.
CPRO_ROLES = (
	"Cpro Manager",
	"Cpro Cashier",
	"Cpro Waiter",
	"Cpro Kitchen",
)


def before_install():
	"""Ensure CPro roles exist before core DocTypes (and their permissions) sync."""
	_create_roles()


def after_install():
	"""Seed defaults so the app is usable immediately after install."""
	# Lazy import so a problem here can never break before_install (roles).
	from cpro.custom_fields import apply_cpro_custom_fields

	try:
		_create_roles()  # idempotent safety net
		apply_cpro_custom_fields()
		_seed_settings()
		click.secho("Thank you for installing CPro — modern restaurant POS on ERPNext!", fg="green")
	except Exception:
		# Never block installation on seeding; log for follow-up instead.
		frappe.log_error(title="CPro after_install seeding failed")


def after_migrate():
	"""Re-apply custom fields and roles on migrate."""
	from cpro.custom_fields import apply_cpro_custom_fields

	_create_roles()
	apply_cpro_custom_fields()


def before_uninstall():
	"""Cleanly remove CPro's footprint on shared doctypes (custom fields)."""
	from cpro.custom_fields import remove_cpro_custom_fields

	try:
		remove_cpro_custom_fields()
	except Exception:
		frappe.log_error(title="CPro before_uninstall cleanup failed")


def _create_roles():
	for role_name in CPRO_ROLES:
		if frappe.db.exists("Role", role_name):
			continue
		frappe.get_doc(
			{
				"doctype": "Role",
				"role_name": role_name,
				"desk_access": 1,
				"restrict_to_domain": "",
			}
		).insert(ignore_permissions=True)


def _seed_settings():
	"""Create the Cpro Settings single with Egyptian-market defaults if unset."""
	settings = frappe.get_single("Cpro Settings")
	dirty = False

	if not settings.get("vat_rate"):
		settings.enable_vat = 1
		settings.vat_rate = 14
		dirty = True
	if settings.get("enable_call_waiter") is None:
		settings.enable_call_waiter = 1
		dirty = True

	# Default the selling price list to the standard one when present.
	if not settings.get("default_selling_price_list") and frappe.db.exists(
		"Price List", "Standard Selling"
	):
		settings.default_selling_price_list = "Standard Selling"
		dirty = True

	if dirty:
		settings.save(ignore_permissions=True)
