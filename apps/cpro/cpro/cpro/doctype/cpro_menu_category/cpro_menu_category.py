# Copyright (c) 2026, ahmed hashim and contributors
# For license information, please see license.txt

from frappe.model.document import Document


class CproMenuCategory(Document):
	"""A curated menu section (e.g. Starters, Mains, Drinks) with its own sort
	order, display label, image and visibility — independent of ERPNext Item
	Groups so admins control exactly how the menu presents."""

	pass
