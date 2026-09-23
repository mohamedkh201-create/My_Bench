# Copyright (c) 2026, ahmed hashim and contributors
# For license information, please see license.txt

"""
CPro pricing.

Pricing source precedence:

1. Explicit price list supplied by the caller.
2. Customer's default_price_list.
3. CPro Settings -> default_selling_price_list.

CPro does not depend on ERPNext "Standard Selling".
The configured CPro price list is required when no explicit price
list or customer-specific price list is available.
"""

import frappe
from frappe import _

from cpro.api.utils import get_settings


def _validate_price_list(price_list: str | None) -> str | None:
	"""Return a usable enabled selling Price List or None."""
	if not price_list:
		return None

	exists = frappe.db.get_value(
		"Price List",
		{
			"name": price_list,
			"enabled": 1,
			"selling": 1,
		},
		"name",
	)

	return exists or None


def resolve_price_list(
	customer: str | None = None,
	price_list: str | None = None,
) -> str:
	"""
	Return the CPro selling Price List to use.

	Precedence:
	1. Explicit price_list
	2. Customer default_price_list
	3. Cpro Settings default_selling_price_list

	Standard Selling is intentionally NOT used.
	"""

	# 1) Explicit price list from the POS/menu
	if price_list:
		valid_price_list = _validate_price_list(price_list)

		if not valid_price_list:
			frappe.throw(
				_("The selected price list {0} does not exist, is not a selling list, or is disabled.").format(
					frappe.bold(price_list)
				),
				title=_("Invalid Price List"),
			)

		return valid_price_list

	# 2) Customer-specific price list
	if customer:
		customer_pl = frappe.get_cached_value(
			"Customer",
			customer,
			"default_price_list",
		)

		customer_pl = _validate_price_list(customer_pl)

		if customer_pl:
			return customer_pl

	# 3) CPro Settings
	settings = get_settings()

	configured_pl = _validate_price_list(
		settings.default_selling_price_list
	)

	if configured_pl:
		return configured_pl

	# No hidden ERPNext fallback anymore.
	frappe.throw(
		_(
			"Please configure an enabled Selling Price List in Cpro Settings before taking orders."
		),
		title=_("Price List Required"),
	)


def _best_rate_rows(
	item_codes: list[str],
	price_list: str,
) -> dict[str, float]:
	"""Return the latest selling Item Price for each item."""
	if not item_codes:
		return {}

	rows = frappe.get_all(
		"Item Price",
		filters={
			"item_code": ["in", item_codes],
			"price_list": price_list,
			"selling": 1,
		},
		fields=[
			"item_code",
			"price_list_rate",
			"valid_from",
		],
		order_by="valid_from asc",
	)

	# Later rows overwrite earlier ones, leaving the latest price.
	return {
		row.item_code: row.price_list_rate
		for row in rows
	}


def get_item_rates(
	item_codes: list[str],
	customer: str | None = None,
	price_list: str | None = None,
) -> dict[str, float]:
	"""
	Resolve selling rates in one or two batched queries.

	Explicit price_list:
	    only that list is used.

	No explicit price_list:
	    customer price list is used first,
	    then CPro Settings price list.
	"""

	item_codes = list(dict.fromkeys(item_codes))

	if not item_codes:
		return {}

	# Resolve the actual primary list.
	resolved_price_list = resolve_price_list(
		customer=customer,
		price_list=price_list,
	)

	rates = _best_rate_rows(
		item_codes,
		resolved_price_list,
	)

	# If we are using a customer-specific list and some items are
	# missing from it, fall back ONLY to CPro Settings price list.
	if customer and not price_list:
		settings_price_list = _validate_price_list(
			get_settings().default_selling_price_list
		)

		if (
			settings_price_list
			and settings_price_list != resolved_price_list
		):
			missing = [
				code
				for code in item_codes
				if code not in rates
			]

			if missing:
				rates.update(
					_best_rate_rows(
						missing,
						settings_price_list,
					)
				)

	return rates


@frappe.whitelist()
def get_item_rate(
	item_code: str,
	customer: str | None = None,
	price_list: str | None = None,
) -> float:
	"""Resolve one item's selling rate. Return 0 if no Item Price exists."""
	return get_item_rates(
		[item_code],
		customer=customer,
		price_list=price_list,
	).get(item_code, 0.0)