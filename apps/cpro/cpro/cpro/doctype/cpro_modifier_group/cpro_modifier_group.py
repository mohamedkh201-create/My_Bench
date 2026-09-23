# Copyright (c) 2026, ahmed hashim and contributors
# For license information, please see license.txt

"""Cpro Modifier Group controller — keeps selection bounds coherent."""

import frappe
from frappe import _
from frappe.model.document import Document


class CproModifierGroup(Document):
	def validate(self):
		if self.selection_type == "Single":
			# Exactly one choice: required → 1, optional → 0..1.
			self.min_selection = 1 if self.is_required else 0
			self.max_selection = 1
			return

		# Multiple selection.
		if self.is_required and not self.min_selection:
			self.min_selection = 1
		if self.min_selection and self.max_selection and self.min_selection > self.max_selection:
			frappe.throw(_("Minimum selection cannot be greater than maximum selection."))
