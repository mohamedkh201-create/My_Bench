# Copyright (c) 2026, ahmed hashim and contributors
# For license information, please see license.txt

from frappe.model.document import Document


class CproPOSBalanceDetail(Document):
	"""Per-mode-of-payment cash figures, shared by opening and closing shifts.

	Opening shifts fill only ``opening_amount``; closing shifts fill
	``closing_amount`` (counted) while ``expected_amount`` / ``difference`` are
	computed from the shift's POS Invoices.
	"""

	pass
