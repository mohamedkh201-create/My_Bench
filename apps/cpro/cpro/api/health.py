# Copyright (c) 2026, ahmed hashim and contributors
# For license information, please see license.txt

"""Post-install health check.

Run with::

    bench --site <site> execute cpro.api.health.verify_install

Returns a dict summarizing whether roles, DocTypes, custom fields, the settings
single, and the workspace all landed. Read-only — safe to run anytime.
"""

import frappe

from cpro.api.utils import ROLE_CASHIER, ROLE_KITCHEN, ROLE_MANAGER, ROLE_WAITER

EXPECTED_DOCTYPES = [
	"Cpro Settings",
	"Cpro Room",
	"Cpro Table",
	"Cpro Kitchen Station",
	"Cpro Modifier Group",
	"Cpro Modifier",
	"Cpro KOT",
	"Cpro KOT Item",
	"Cpro Item Modifier Group",
]

EXPECTED_ROLES = [ROLE_MANAGER, ROLE_CASHIER, ROLE_WAITER, ROLE_KITCHEN]

EXPECTED_CUSTOM_FIELDS = [
	"Item-cpro_show_in_menu",
	"Item-cpro_kitchen_station",
	"Item-cpro_modifier_groups",
	"POS Invoice-cpro_order_type",
	"POS Invoice-cpro_table",
	"POS Invoice Item-cpro_notes",
]


def verify_install() -> dict:
	roles = {r: bool(frappe.db.exists("Role", r)) for r in EXPECTED_ROLES}
	doctypes = {d: bool(frappe.db.exists("DocType", d)) for d in EXPECTED_DOCTYPES}
	custom_fields = {c: bool(frappe.db.exists("Custom Field", c)) for c in EXPECTED_CUSTOM_FIELDS}

	settings_ok = bool(frappe.db.exists("DocType", "Cpro Settings"))
	vat_rate = None
	if settings_ok:
		vat_rate = frappe.db.get_single_value("Cpro Settings", "vat_rate")

	workspace_ok = bool(frappe.db.exists("Workspace", "Restaurant Management"))

	result = {
		"roles": roles,
		"doctypes": doctypes,
		"custom_fields": custom_fields,
		"settings_seeded_vat_rate": vat_rate,
		"workspace_present": workspace_ok,
	}
	result["all_ok"] = (
		all(roles.values())
		and all(doctypes.values())
		and all(custom_fields.values())
		and workspace_ok
	)
	return result
