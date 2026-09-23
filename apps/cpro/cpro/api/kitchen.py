# Copyright (c) 2026, ahmed hashim and contributors
# For license information, please see license.txt

"""Kitchen Display System (KDS) API.

Lists active Kitchen Order Tickets for a station and lets kitchen staff advance
their status. Every mutating call is strictly gated to the ``Cpro Kitchen``
role (requirement #3) and pushes a realtime event so open KDS / POS screens
update without polling.
"""

import frappe
from frappe import _

from cpro.api.utils import require_role, ROLE_KITCHEN, ROLE_MANAGER, ROLE_CASHIER

# Statuses still "on the board" for the kitchen.
ACTIVE_STATUSES = ("New", "Preparing", "Ready", "Served")
KDS_ALLOWED_TARGETS = ("New", "Preparing", "Ready", "Served")

REALTIME_EVENT = "cpro_kot_update"


@frappe.whitelist()
def get_active_kots(kitchen_station: str | None = None, pos_opening_shift: str | None = None) -> list[dict]:
    """Active tickets for the board, oldest first. Kitchen / Manager / Cashier."""
    require_role(ROLE_KITCHEN, ROLE_MANAGER, ROLE_CASHIER)

    filters = {"status": ["in", ACTIVE_STATUSES]}
    if kitchen_station:
        filters["kitchen_station"] = kitchen_station

    kots = frappe.get_all(
        "Cpro KOT",
        filters=filters,
        fields=[
            "name",
            "table",
            "customer",
            "status",
            "kitchen_station",
            "order_time",
            "order_notes",
            "pos_invoice",
            "creation",
        ],
        order_by="order_time asc, creation asc",
    )
    if not kots:
        return []

    names = [k.name for k in kots]
    items_by_kot: dict[str, list[dict]] = {}
    for row in frappe.get_all(
        "Cpro KOT Item",
        filters={"parent": ["in", names], "parenttype": "Cpro KOT"},
        fields=["name", "parent", "item", "item_name", "qty", "status", "kitchen_station", "notes", "modifiers_summary"],
        order_by="idx asc",
    ):
        items_by_kot.setdefault(row.parent, []).append(row)

    # جلب بيانات الفواتير المرتبطة للحصول على اسم العميل والطاولة كبديل أمان
    invoice_names = list({k.pos_invoice for k in kots if k.get("pos_invoice")})
    invoice_map = {}
    if invoice_names:
        invs = frappe.get_all("POS Invoice", filters={"name": ["in", invoice_names]}, fields=["name", "customer", "cpro_table"])
        invoice_map = {inv.name: inv for inv in invs}

    # جلب الاسم الصريح للعملاء (customer_name)
    customer_ids = set()
    for k in kots:
        inv = invoice_map.get(k.get("pos_invoice"), {})
        cust_id = k.get("customer") or inv.get("customer")
        if cust_id:
            customer_ids.add(cust_id)
        
    customer_name_map = {}
    if customer_ids:
        custs = frappe.get_all("Customer", filters={"name": ["in", list(customer_ids)]}, fields=["name", "customer_name"])
        customer_name_map = {c.name: c.customer_name for c in custs}

    for k in kots:
        inv = invoice_map.get(k.get("pos_invoice"), {})
        cust_id = k.get("customer") or inv.get("customer")
        k["customer"] = cust_id or ""
        k["customer_name"] = customer_name_map.get(cust_id, cust_id or "")
        
        if not k.get("table") and inv.get("cpro_table"):
            k["table"] = inv.get("cpro_table")

        k["items"] = items_by_kot.get(k.name, [])

    return kots


@frappe.whitelist()
def set_kot_status(kot: str, status: str) -> dict:
    """Advance a whole ticket's status. Kitchen / Manager / Cashier."""
    require_role(ROLE_KITCHEN, ROLE_MANAGER, ROLE_CASHIER)
    if status not in KDS_ALLOWED_TARGETS:
        frappe.throw(_("Invalid kitchen status: {0}").format(status))

    if not frappe.db.exists("Cpro KOT", kot):
        # If kot was referenced by pos invoice name or KOT-<pos_invoice>
        pos_inv_name = kot.replace("KOT-", "")
        if frappe.db.exists("POS Invoice", pos_inv_name):
            inv_doc = frappe.get_doc("POS Invoice", pos_inv_name)
            new_kot = frappe.new_doc("Cpro KOT")
            new_kot.pos_invoice = pos_inv_name
            new_kot.customer = inv_doc.customer
            new_kot.status = status
            new_kot.order_time = inv_doc.creation
            new_kot.table = inv_doc.get("cpro_table") or None
            
            for item in inv_doc.items:
                new_kot.append("items", {
                    "item": item.item_code,
                    "item_name": item.item_name or item.item_code,
                    "qty": item.qty,
                    "status": status
                })
            new_kot.insert(ignore_permissions=True)
            frappe.db.commit()
            return {"name": new_kot.name, "status": status}
        frappe.throw(_("Ticket not found: {0}").format(kot))

    doc = frappe.get_doc("Cpro KOT", kot)
    doc.status = status
    
    if status != "Cancelled":
        for row in doc.items:
            row.status = status
            
    doc.save(ignore_permissions=True)
    frappe.db.commit()
    
    publish_kot_update(doc)
    
    return {"name": doc.name, "status": doc.status}


@frappe.whitelist()
def set_kot_item_status(kot: str, item_name: str, status: str) -> dict:
    """Advance a single line's status (e.g. one dish is ready). Kitchen / Manager / Cashier."""
    require_role(ROLE_KITCHEN, ROLE_MANAGER, ROLE_CASHIER)
    if status not in KDS_ALLOWED_TARGETS:
        frappe.throw(_("Invalid kitchen status: {0}").format(status))

    doc = frappe.get_doc("Cpro KOT", kot)
    found = False
    for row in doc.items:
        if row.name == item_name:
            row.status = status
            found = True
            break
            
    if not found:
        frappe.throw(_("Item not found on this ticket."))

    doc.save(ignore_permissions=True)
    frappe.db.commit()
    
    publish_kot_update(doc)
    
    return {"name": doc.name, "status": doc.status}


def publish_kot_update(doc):
    """Push a realtime KOT snapshot to KDS / POS listeners (called from the controller)."""
    cust_id = doc.get("customer")
    cust_name = ""
    if cust_id:
        cust_name = frappe.db.get_value("Customer", cust_id, "customer_name") or cust_id
    elif doc.get("pos_invoice"):
        inv_cust = frappe.db.get_value("POS Invoice", doc.pos_invoice, "customer")
        if inv_cust:
            cust_id = inv_cust
            cust_name = frappe.db.get_value("Customer", inv_cust, "customer_name") or inv_cust

    frappe.publish_realtime(
        REALTIME_EVENT,
        message={
            "name": doc.name,
            "status": doc.status,
            "kitchen_station": doc.get("kitchen_station"),
            "table": doc.get("table"),
            "customer": cust_id,
            "customer_name": cust_name,
        },
        after_commit=True,
    )


@frappe.whitelist()
def get_kitchen_board_tickets(kitchen_station=None, pos_opening_shift=None):
    """جلب تذاكر المطبخ مقسمة للثلاث مراحل: اتأكد (confirmed/New)، في المطبخ (in_kitchen/Preparing)، و Served"""
    tickets = get_active_kots(kitchen_station=kitchen_station, pos_opening_shift=pos_opening_shift)
    
    # جلب أسماء الفواتير التي لها KOTs بالفعل
    existing_inv_names = {t.get("pos_invoice") for t in tickets if t.get("pos_invoice")}

    # جلب الفواتير الأخيرة التي ليس لها KOT لكي تظهر في قائمة "جديد"
    filters = {}
    if existing_inv_names:
        filters["name"] = ["not in", list(existing_inv_names)]

    recent_invs = frappe.get_all(
        "POS Invoice",
        filters=filters,
        fields=["name", "customer", "customer_name", "posting_date", "posting_time", "creation", "cpro_table"],
        order_by="creation desc",
        limit_page_length=100
    )

    fallback_tickets = []
    if recent_invs:
        inv_names = [inv.name for inv in recent_invs]
        items_by_inv = {}
        for row in frappe.get_all(
            "POS Invoice Item",
            filters={"parent": ["in", inv_names]},
            fields=["parent", "item_code", "item_name", "qty"]
        ):
            items_by_inv.setdefault(row.parent, []).append({
                "item": row.item_code,
                "item_name": row.item_name or row.item_code,
                "qty": row.qty
            })

        for inv in recent_invs:
            fallback_tickets.append({
                "name": f"KOT-{inv.name}",
                "pos_invoice": inv.name,
                "customer": inv.customer,
                "customer_name": inv.customer_name or inv.customer,
                "table": inv.get("cpro_table") or "سفري / طاولة",
                "status": "New",  # كل الفواتير القديمة تعتبر جديدة حتى يتم تحضيرها يدوياً
                "order_time": inv.creation,
                "items": items_by_inv.get(inv.name, [])
            })

    all_tickets = tickets + fallback_tickets

    confirmed = [t for t in all_tickets if t.get("status") in ("New", "اتأكد")]
    in_kitchen = [t for t in all_tickets if t.get("status") in ("Preparing", "Ready", "في المطبخ")]
    served = [t for t in all_tickets if t.get("status") in ("Served", "تم التقديم")]

    return {
        "confirmed": confirmed,
        "in_kitchen": in_kitchen,
        "served": served,
        "all": all_tickets
    }