# Copyright (c) 2026, ahmed hashim and contributors
# For license information, please see license.txt

"""Cpro KOT (Kitchen Order Ticket) controller.

Derives the ticket's overall status from its line items and pushes a realtime
update to KDS / POS listeners on every save. Terminal ``Cancelled`` is never
overridden by the rollup.
"""

import frappe
from frappe.model.document import Document
from frappe.utils import now_datetime

from cpro.api.kitchen import publish_kot_update


class CproKOT(Document):
	def validate(self):
		if not self.order_time:
			self.order_time = now_datetime()
		self._rollup_status()

	def on_update(self):
		publish_kot_update(self)

	def _rollup_status(self):
		"""Roll the line-item statuses up into the ticket status."""
		if self.status == "Cancelled" or not self.items:
			return

		statuses = {(row.status or "New") for row in self.items}
		if statuses <= {"Served"}:
			self.status = "Served"
		elif statuses <= {"Ready", "Served"}:
			self.status = "Ready"
		elif statuses & {"Preparing", "Ready", "Served"}:
			self.status = "Preparing"
		else:
			self.status = "New"
