# Copyright (c) 2026, ahmed hashim and contributors
# For license information, please see license.txt

"""Customer-facing digital menu portal.

Powers the mobile menu (requirement #6): browse by category, optionally place a
guest order (gated by the *Allow Guest Orders* toggle), and a *Call Waiter*
button that fires an instant realtime alert to the cashier/waiter with the
table number (gated by the *Enable Call Waiter* toggle). Guest orders create a
Kitchen Order Ticket only — never a financial document directly; a cashier
turns it into a POS Invoice.
"""

import frappe
from frappe import _

from cpro.api.menu import build_menu
from cpro.api.utils import call_waiter_enabled, guest_orders_allowed

CALL_WAITER_EVENT = "cpro_call_waiter"


def _resolve_table(table: str | None) -> str | None:
	"""Resolve a table from a portal slug or its name; None if not found."""
	if not table:
		return None
	by_slug = frappe.db.get_value("Cpro Table", {"portal_slug": table}, "name")
	if by_slug:
		return by_slug
	if frappe.db.exists("Cpro Table", table):
		return table
	return None


@frappe.whitelist(allow_guest=True)
def get_public_menu(table: str | None = None) -> dict:
	"""Public digital menu (standard pricing). Safe for guests to view."""
	payload = build_menu(customer=None)
	resolved = _resolve_table(table)
	payload["table"] = resolved
	
	settings = frappe.get_single("Cpro Portal Settings")
	payload["guest_orders_allowed"] = settings.enable_online_ordering
	payload["call_waiter_enabled"] = settings.enable_call_waiter
	payload["banners"] = [b.image for b in settings.banners] if settings.banners else []
	
	company = frappe.db.get_single_value("Cpro Settings", "company")
	payload["restaurant_name"] = company or "Restaurant"
	payload["restaurant_logo"] = frappe.db.get_value("Company", company, "company_logo") if company else None
	
	payload["tables"] = frappe.db.get_all("Cpro Table", filters={"is_active": 1}, fields=["name", "table_number"])
	
	return payload


@frappe.whitelist(allow_guest=True)
def call_waiter(table: str | None = None) -> dict:
	try:
		settings = frappe.get_single("Cpro Portal Settings")
		if not settings.enable_call_waiter:
			frappe.throw(_("Waiter service is currently unavailable."))
			
		if not table:
			frappe.throw(_("Table number is required."))

		req = frappe.new_doc("Cpro Portal Request")
		req.request_type = "Call Waiter"
		req.status = "Pending"
		req.table_number = table
		req.insert(ignore_permissions=True)

		frappe.publish_realtime(
			event=CALL_WAITER_EVENT,
			message={"table": table, "request_id": req.name, "type": "Call Waiter"},
			after_commit=True
		)
		frappe.db.commit()
		return {"ok": True, "message": _("A waiter has been notified.")}
	except Exception as e:
		frappe.log_error(title="DEBUG: call_waiter failed", message=frappe.get_traceback())
		raise


@frappe.whitelist(allow_guest=True)
def place_guest_order(items, order_type: str = "Dine In", table: str | None = None, address: str | None = None, name: str | None = None, phone: str | None = None) -> dict:
	"""Create a Draft POS Invoice and a KOT from a guest's cart (toggle-gated)."""
	try:
		if isinstance(items, str):
			import json
			items = json.loads(items)

		settings = frappe.get_single("Cpro Portal Settings")
		if not settings.enable_online_ordering:
			frappe.throw(_("Online ordering is currently closed. Please call a waiter to order."))
		
		req = frappe.new_doc("Cpro Portal Request")
		req.request_type = "Order"
		req.status = "Pending"
		req.customer_name = name or "Online Guest"
		req.phone = phone
		req.address = address
		req.table_number = table
		req.order_type = order_type
		req.order_payload = frappe.as_json(items)
		req.insert(ignore_permissions=True)

		frappe.publish_realtime(
			event=CALL_WAITER_EVENT,
			message={"table": table, "request_id": req.name, "type": "Order"},
			after_commit=True
		)
		frappe.db.commit()
		return {
			"ok": True,
			"message": _("Your order has been received and is waiting for review!")
		}
	except Exception as e:
		frappe.log_error(title="DEBUG: place_guest_order failed", message=frappe.get_traceback())
		raise

@frappe.whitelist()
def get_portal_requests() -> list:
	# Get all requests from the last 24 hours
	since = frappe.utils.add_days(frappe.utils.now(), -1)
	return frappe.get_all("Cpro Portal Request", filters={"creation": [">", since]}, fields=["name as id", "request_type as type", "table_number as table", "order_type", "order_payload", "customer_name", "phone", "creation", "status"], order_by="creation desc")

def cleanup_portal_requests():
	"""Delete portal requests older than 7 days."""
	import datetime
	older_than = frappe.utils.add_days(frappe.utils.now(), -7)
	# Direct SQL to avoid permission hooks and speed up bulk delete
	frappe.db.sql("DELETE FROM `tabCpro Portal Request` WHERE creation < %s", (older_than,))
	frappe.db.commit()

@frappe.whitelist()
def accept_portal_request(request_id: str, table_number: str = None) -> dict:
	"""Convert a Cpro Portal Request into a real POS Invoice and KOT, or just mark Waiter call as done."""
	import json
	req = frappe.get_doc("Cpro Portal Request", request_id)
	
	if req.status != "Pending":
		return {"ok": True, "message": "Already processed."}
		
	if table_number:
		req.table_number = table_number
		req.save()
		
	if req.request_type == "Call Waiter":
		req.status = "Completed"
		req.save()
		return {"ok": True, "message": "Waiter call marked as done."}
		
	# Process Order
	items = json.loads(req.order_payload or "[]")
	if not items:
		frappe.throw(_("Order payload is empty."))
		
	resolved_table = _resolve_table(req.table_number)

	menu = build_menu(customer=None)
	orderable_items = {i["item_code"]: i for i in menu.get("items", [])}

	custom_table_note = ""
	if req.order_type == "Dine In" and not resolved_table and req.table_number:
		custom_table_note = f"Table (Custom): {req.table_number}\n"

	# Find or Create Customer
	customer_name = "Guest"
	if req.phone:
		existing = frappe.db.get_value("Customer", {"mobile_no": req.phone}, "name")
		if existing:
			customer_name = existing
		else:
			try:
				cust = frappe.new_doc("Customer")
				cust.customer_name = req.customer_name or "Online Guest"
				cust.customer_group = "All Customer Groups"
				cust.territory = "All Territories"
				cust.customer_type = "Individual"
				cust.mobile_no = req.phone
				cust.insert(ignore_permissions=True)
				customer_name = cust.name
			except Exception:
				pass

	inv = frappe.new_doc("POS Invoice")
	inv.customer = customer_name
	inv.cpro_order_type = req.order_type
	inv.cpro_source = "Portal"
	inv.cpro_delivery_address = req.address
	inv.cpro_customer_phone = req.phone
	if resolved_table:
		inv.cpro_table = resolved_table
		
	shift = frappe.db.get_value("Cpro POS Opening Shift", {"status": "Open"}, "name")
	if shift:
		inv.cpro_pos_opening_shift = shift
		profile = frappe.db.get_value("Cpro POS Opening Shift", shift, "pos_profile")
		if profile:
			inv.pos_profile = profile

	for line in items:
		item_code = line.get("item_code")
		if not item_code or item_code not in orderable_items:
			continue
		price = orderable_items[item_code].get("price", 0)
		inv.append("items", {
			"item_code": item_code,
			"qty": line.get("qty") or 1,
			"rate": price,
			"cpro_notes": (custom_table_note + (line.get("notes") or "")).strip()
		})

	if not inv.items:
		frappe.throw(_("None of the items are available to order."))

	inv.insert(ignore_permissions=True)
	
	kot = frappe.new_doc("Cpro KOT")
	kot.pos_invoice = inv.name
	kot.cpro_order_type = req.order_type
	if resolved_table:
		kot.table = resolved_table
	kot.status = "New"
	kot.order_notes = (custom_table_note + _("Placed from the portal.")).strip()
	
	for line in items:
		item_code = line.get("item_code")
		if not item_code or item_code not in orderable_items:
			continue
		modifiers = line.get("modifiers") or []
		kot.append("items", {
			"item": item_code,
			"qty": line.get("qty") or 1,
			"status": "New",
			"notes": line.get("notes"),
			"modifiers_summary": ", ".join(modifiers) if modifiers else None,
		})
	kot.insert(ignore_permissions=True)

	req.status = "Completed"
	req.save()

	frappe.db.commit()
	return {"ok": True, "invoice": inv.name}

@frappe.whitelist()
def cancel_portal_request(request_id: str) -> dict:
	req = frappe.get_doc("Cpro Portal Request", request_id)
	req.status = "Cancelled"
	req.save()
	frappe.db.commit()
	return {"ok": True}
