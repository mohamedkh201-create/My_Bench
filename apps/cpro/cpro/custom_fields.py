# Copyright (c) 2026, ahmed hashim and contributors
# For license information, please see license.txt

"""
Minimal, namespaced (``cpro_``) custom fields that bridge CPro's restaurant
domain onto ERPNext's native POS engine (POS Invoice, Item). Kept deliberately
small — the legacy ury app carried ~210 custom fields; CPro reuses ERPNext where
it can and adds only what F&B genuinely needs.
"""

import frappe
from frappe.custom.doctype.custom_field.custom_field import create_custom_fields

CUSTOM_FIELDS = {
	# Item — menu attributes: KDS routing, modifier groups, menu visibility.
	"Item": [
		{
			"fieldname": "cpro_restaurant_section",
			"fieldtype": "Section Break",
			"label": "Restaurant",
			"insert_after": "item_group",
			"collapsible": 1,
		},
		{
			"fieldname": "cpro_show_in_menu",
			"fieldtype": "Check",
			"label": "Show in Menu",
			"default": "1",
			"insert_after": "cpro_restaurant_section",
		},
		{
			"fieldname": "cpro_kitchen_station",
			"fieldtype": "Link",
			"label": "Kitchen Station",
			"options": "Cpro Kitchen Station",
			"insert_after": "cpro_show_in_menu",
		},
		{
			"fieldname": "cpro_column_break",
			"fieldtype": "Column Break",
			"insert_after": "cpro_kitchen_station",
		},
		{
			"fieldname": "cpro_modifier_groups",
			"fieldtype": "Table",
			"label": "Modifier Groups",
			"options": "Cpro Item Modifier Group",
			"insert_after": "cpro_column_break",
		},
	],
	# POS Invoice — dine-in context (order type + table) and the owning shift.
	"POS Invoice": [
		{
			"fieldname": "cpro_order_type",
			"fieldtype": "Select",
			"label": "Order Type",
			"options": "Dine In\nTake Away\nDelivery",
			"default": "Dine In",
			"insert_after": "customer",
			"in_standard_filter": 1,
		},
		{
			"fieldname": "cpro_table",
			"fieldtype": "Link",
			"label": "Table",
			"options": "Cpro Table",
			"insert_after": "cpro_order_type",
			"depends_on": "eval:doc.cpro_order_type=='Dine In'",
		},
		{
			"fieldname": "cpro_pos_opening_shift",
			"fieldtype": "Link",
			"label": "POS Opening Shift",
			"options": "POS Opening Entry",
			"insert_after": "cpro_table",
			"read_only": 1,
			"in_standard_filter": 1,
			"no_copy": 1,
		},
		{
			"fieldname": "cpro_is_cancelled",
			"fieldtype": "Check",
			"label": "Is Cancelled",
			"insert_after": "cpro_pos_opening_shift",
			"default": "0",
			"read_only": 1,
		},
		{
			"fieldname": "cpro_cancel_reason",
			"fieldtype": "Small Text",
			"label": "Cancel Reason",
			"insert_after": "cpro_is_cancelled",
			"read_only": 1,
		},
		{
			"fieldname": "cpro_cancel_food_status",
			"fieldtype": "Data",
			"label": "Cancel Food Status",
			"insert_after": "cpro_cancel_reason",
			"read_only": 1,
		},
	],
	# POS Invoice Item — per-line critical notes (highlighted RED on POS/receipt/KDS).
	"POS Invoice Item": [
		{
			"fieldname": "cpro_notes",
			"fieldtype": "Small Text",
			"label": "Notes",
			"insert_after": "item_name",
			"description": "Critical prep notes, e.g. \"No onions\", \"Peanut allergy\".",
		},
	],
}


def apply_cpro_custom_fields():
	"""Create/update all CPro custom fields. Idempotent (safe to re-run on migrate)."""
	create_custom_fields(CUSTOM_FIELDS, ignore_validate=True)


def remove_cpro_custom_fields():
	"""Remove CPro custom fields (used on uninstall)."""
	for doctype, fields in CUSTOM_FIELDS.items():
		for field in fields:
			name = f"{doctype}-{field['fieldname']}"
			if frappe.db.exists("Custom Field", name):
				frappe.delete_doc("Custom Field", name, ignore_permissions=True)
