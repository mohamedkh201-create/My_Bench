# Copyright (c) 2026, ahmed hashim and contributors
# For license information, please see license.txt

"""Cpro POS Opening Shift.

A cashier opens a shift (declaring the opening cash float per payment mode)
before taking any orders. Submitting the shift flips it to ``Open``; a matching
Closing Shift flips it to ``Closed``. Only one Open shift may exist per
(cashier, POS profile) at a time so reconciliation stays unambiguous.
"""

import frappe
from frappe import _
from frappe.model.document import Document
from frappe.utils import now_datetime


class CproPOSOpeningShift(Document):
	def validate(self):
		if not self.user:
			self.user = frappe.session.user
		if not self.period_start_datetime:
			self.period_start_datetime = now_datetime()
		self._guard_single_open_shift()

	def on_submit(self):
		self.db_set("status", "Open")

	def on_cancel(self):
		self.db_set("status", "Draft")

	def _guard_single_open_shift(self):
		"""Refuse a second concurrent Open shift for the same cashier + profile."""
		existing = frappe.db.exists(
			"Cpro POS Opening Shift",
			{
				"user": self.user,
				"pos_profile": self.pos_profile,
				"status": "Open",
				"docstatus": 1,
				"name": ["!=", self.name or ""],
			},
		)
		if existing:
			frappe.throw(
				_("Cashier {0} already has an open shift ({1}) on this POS profile. Close it first.").format(
					frappe.bold(self.user), frappe.bold(existing)
				),
				title=_("Shift Already Open"),
			)
