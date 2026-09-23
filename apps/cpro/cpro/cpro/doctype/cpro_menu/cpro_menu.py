# Copyright (c) 2026, ahmed hashim and contributors
# For license information, please see license.txt

"""Cpro Menu.

A curated, orderable collection of items grouped into menu categories. The POS
and the customer portal render whatever the active/default menu exposes, giving
admins full control over what shows, in what order, and under which section —
without touching ERPNext Item masters. Exactly one menu may be the default.
"""

import frappe
from frappe.model.document import Document


class CproMenu(Document):
	def validate(self):
		self._enforce_single_default()

	def on_update(self):
		self._sync_pricing()

	def _sync_pricing(self):
		"""Create/Update a Price List matching this Menu's name, and set Item Prices."""
		if not frappe.db.exists("Price List", self.menu_name):
			pl = frappe.new_doc("Price List")
			pl.price_list_name = self.menu_name
			pl.selling = 1
			pl.buying = 0
			pl.enabled = 1
			pl.insert(ignore_permissions=True)
			
		for row in self.items:
			if not row.item or row.price is None:
				continue
				
			# Check if Item Price exists for this Price List and Item
			existing_price = frappe.db.get_value("Item Price", {
				"price_list": self.menu_name,
				"item_code": row.item
			}, "name")
			
			if existing_price:
				frappe.db.set_value("Item Price", existing_price, "price_list_rate", row.price)
			else:
				p = frappe.new_doc("Item Price")
				p.price_list = self.menu_name
				p.item_code = row.item
				p.price_list_rate = row.price
				p.insert(ignore_permissions=True)

	def _enforce_single_default(self):
		if not self.is_default:
			return
		# Clear the default flag on every other menu so exactly one stays default.
		others = frappe.get_all(
			"Cpro Menu", filters={"is_default": 1, "name": ["!=", self.name or ""]}, pluck="name"
		)
		for name in others:
			frappe.db.set_value("Cpro Menu", name, "is_default", 0)
