# Copyright (c) 2026, ahmed hashim and contributors
# For license information, please see license.txt

"""Cpro Settings controller.

Turns the simple VAT / Service-Charge toggles into a real ERPNext **Sales Taxes
and Charges Template** (requirement #5). The generated template is namespaced
(``CPro Taxes - <abbr>``) so CPro never mutates templates it doesn't own, and
the whole sync is fail-soft: if a tax account can't be resolved it guides the
admin with a graceful message instead of raising.
"""

import frappe
from frappe import _
from frappe.model.document import Document

TEMPLATE_PREFIX = "CPro Taxes"


class CproSettings(Document):
	def on_update(self):
		self.sync_tax_template()

	# -- dynamic taxes -----------------------------------------------------
	def sync_tax_template(self):
		if not self.company:
			return
		if not (self.enable_vat or self.enable_service_charge):
			# Nothing to apply — clear our link but leave any template in place.
			return

		account = _resolve_tax_account(self.company)
		if not account:
			frappe.msgprint(
				_(
					"Enable VAT/Service Charge is on, but no tax account was found for {0}. "
					"Please create a tax account (e.g. VAT) and save again."
				).format(self.company),
				title=_("Tax account needed"),
				indicator="orange",
			)
			return

		abbr = frappe.get_cached_value("Company", self.company, "abbr")
		template_name = f"{TEMPLATE_PREFIX} - {abbr}"

		rows = []
		if self.enable_vat and self.vat_rate:
			rows.append(
				{
					"charge_type": "On Net Total",
					"account_head": account,
					"rate": self.vat_rate,
					"description": _("VAT {0}%").format(self.vat_rate),
				}
			)
		if self.enable_service_charge and self.service_charge_rate:
			rows.append(
				{
					"charge_type": "On Net Total",
					"account_head": account,
					"rate": self.service_charge_rate,
					"description": _("Service Charge {0}%").format(self.service_charge_rate),
				}
			)
		if not rows:
			return

		existing = frappe.db.get_value(
			"Sales Taxes and Charges Template",
			{"title": template_name, "company": self.company},
			"name",
		) or (frappe.db.exists("Sales Taxes and Charges Template", template_name) and template_name)

		if existing:
			template = frappe.get_doc("Sales Taxes and Charges Template", existing)
			template.set("taxes", [])
		else:
			template = frappe.new_doc("Sales Taxes and Charges Template")
			template.title = template_name
			template.company = self.company

		for row in rows:
			template.append("taxes", row)
		template.save(ignore_permissions=True)

		# Point the settings at the generated template (avoid recursive save).
		if self.sales_taxes_and_charges_template != template.name:
			self.db_set("sales_taxes_and_charges_template", template.name, update_modified=False)


def _resolve_tax_account(company: str) -> str | None:
	"""Best-effort: a non-group Tax account for the company, preferring VAT-named ones."""
	accounts = frappe.get_all(
		"Account",
		filters={"company": company, "account_type": "Tax", "is_group": 0, "disabled": 0},
		fields=["name"],
	)
	if not accounts:
		return None
	for a in accounts:
		if "vat" in a.name.lower():
			return a.name
	return accounts[0].name
