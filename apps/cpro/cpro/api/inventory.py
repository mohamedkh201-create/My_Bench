# Copyright (c) 2026, ahmed hashim and contributors
# For license information, please see license.txt

"""Inventory availability.

Answers "can we sell this right now?" for the POS / digital menu so the UI can
gray out unavailable dishes (requirement #4). An item is available when either
it has finished stock on hand, or it has an active BOM whose raw materials are
all in stock. The check is deliberately *fail-open*: any uncertainty or error
resolves to available, so a stock-lookup glitch never empties the menu.
"""

import frappe

from cpro.api.utils import get_settings


def _finished_qty(item_code: str, warehouse: str | None) -> float:
	if warehouse:
		return frappe.db.get_value("Bin", {"item_code": item_code, "warehouse": warehouse}, "actual_qty") or 0.0
	rows = frappe.get_all("Bin", filters={"item_code": item_code}, fields=["actual_qty"])
	return sum((r.actual_qty or 0.0) for r in rows) if rows else 0.0


def _active_bom(item_code: str) -> str | None:
	return frappe.db.get_value(
		"BOM", {"item": item_code, "is_active": 1, "is_default": 1}, "name"
	) or frappe.db.get_value("BOM", {"item": item_code, "is_active": 1}, "name")


def _bom_materials_available(bom: str, warehouse: str | None) -> bool:
	"""True if every raw material in ``bom`` can cover at least one finished unit."""
	base_qty = frappe.db.get_value("BOM", bom, "quantity") or 1.0
	materials = frappe.get_all(
		"BOM Item", filters={"parent": bom}, fields=["item_code", "stock_qty"]
	)
	for m in materials:
		required_per_unit = (m.stock_qty or 0.0) / base_qty
		if required_per_unit <= 0:
			continue
		if _finished_qty(m.item_code, warehouse) < required_per_unit:
			return False
	return True


def _is_available(item_code: str, is_stock_item: int, warehouse: str | None) -> bool:
	# Non-stock items (services / made-to-order without tracking) are always sellable.
	if not is_stock_item:
		return True
	if _finished_qty(item_code, warehouse) > 0:
		return True
	bom = _active_bom(item_code)
	if bom:
		return _bom_materials_available(bom, warehouse)
	# Stock item, no stock, no BOM → out of stock.
	return False


def get_item_availability(item_codes: list[str], warehouse: str | None = None) -> dict[str, bool]:
	"""Batch availability map. Fail-open: errors resolve to available."""
	item_codes = list(dict.fromkeys(item_codes))
	availability = {c: True for c in item_codes}
	if not item_codes:
		return availability

	meta = {
		i.name: i.is_stock_item
		for i in frappe.get_all(
			"Item", filters={"name": ["in", item_codes]}, fields=["name", "is_stock_item"]
		)
	}
	for code in item_codes:
		try:
			availability[code] = _is_available(code, meta.get(code, 0), warehouse)
		except Exception:
			frappe.log_error(title="CPro availability check failed", message=code)
			availability[code] = True  # fail open
	return availability


def default_menu_warehouse() -> str | None:
	"""Best-effort default warehouse for availability checks (company default)."""
	company = get_settings().company
	if company:
		return frappe.get_cached_value("Company", company, "default_warehouse")
	return None

@frappe.whitelist()
def get_inventory_list(warehouse=None):
	"""جلب قائمة بكل الأصناف المخزنية مع رصيدها الفعلي."""
	# 1. نجلب الأصناف التي هي "Stock Item"
	items = frappe.get_all(
		"Item",
		filters={"is_stock_item": 1, "disabled": 0},
		fields=["name", "item_name", "item_group", "stock_uom"],
		limit_page_length=2000
	)

	# 2. نجلب الأرصدة
	bin_filters = {}
	if warehouse:
		bin_filters["warehouse"] = warehouse
	bins = frappe.get_all("Bin", filters=bin_filters, fields=["item_code", "actual_qty"])
	
	qty_map = {}
	for b in bins:
		qty_map[b.item_code] = qty_map.get(b.item_code, 0.0) + (b.actual_qty or 0.0)
	
	# 3. ندمجها
	for item in items:
		item["actual_qty"] = qty_map.get(item.name, 0.0)
		
	return items
