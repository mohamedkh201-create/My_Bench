import frappe
from frappe import _
import json


@frappe.whitelist()
def create_pos_invoice(customer, items, phone=None, pos_profile=None):
    """
    Create a POS Invoice with minimal input — designed for n8n / external integrations.

    Required: customer, items
    Optional: phone, pos_profile

    Example body:
        {
            "customer": "أحمد",
            "phone": "01012345678",
            "items": [{"item_code": "برجر", "qty": 2}]
        }
    """
    items = _parse(items)

    if not items:
        frappe.throw(_("At least one item is required"))

    pos_profile = pos_profile or _get_pos_profile()
    customer = _get_or_create_customer(customer, phone)

    invoice = _build_invoice(customer, pos_profile, items)

    invoice.flags.ignore_permissions = True
    invoice.insert()
    frappe.db.commit()

    return {
        "status": "success",
        "message": _("POS Invoice created successfully"),
        "data": {
            "name": invoice.name,
            "grand_total": invoice.grand_total,
            "status": invoice.status,
            "posting_date": str(invoice.posting_date),
        }
    }

# ── Update Draft Order ────────────────────────────────────────────


@frappe.whitelist()
def update_pos_invoice(invoice_name, items=None, customer=None, phone=None):
    """
    Update an existing Draft POS Invoice.

    Example body:
        {
            "invoice_name": "ACC-PSINV-2026-00014",
            "items": [{"item_code": "برجر", "qty": 3}],
            "customer": "محمد"
        }
    """
    items = _parse(items)

    if not frappe.db.exists("POS Invoice", invoice_name):
        frappe.throw(_("Invoice '{0}' not found").format(invoice_name))

    invoice = frappe.get_doc("POS Invoice", invoice_name)

    if invoice.docstatus != 0:
        frappe.throw(_("Only Draft invoices can be updated"))

    # Update customer if provided
    if customer:
        invoice.customer = _get_or_create_customer(customer, phone)

    # Update items if provided
    if items:
        invoice.items = []
        for item in items:
            invoice.append("items", {
                "item_code": _resolve_item(item),
                "qty": float(item.get("qty", 1)),
            })

    invoice.set_missing_values()
    _apply_menu_prices(invoice)
    invoice.calculate_taxes_and_totals()

    # Update payments (Auto-calculate)
    pos_profile = invoice.pos_profile
    invoice.payments = []
    invoice.append("payments", {
        "mode_of_payment": _get_default_payment(pos_profile),
        "amount": invoice.grand_total,
    })

    invoice.flags.ignore_permissions = True
    invoice.save()
    frappe.db.commit()

    return {
        "status": "success",
        "message": _("Invoice updated successfully"),
        "data": {
            "name": invoice.name,
            "grand_total": invoice.grand_total,
            "status": invoice.status,
        }
    }


# ── Cancel Draft Order ────────────────────────────────────────────


@frappe.whitelist()
def cancel_pos_invoice(invoice_name):
    """
    Cancel (delete) a Draft POS Invoice.

    Example body:
        { "invoice_name": "ACC-PSINV-2026-00014" }
    """
    if not frappe.db.exists("POS Invoice", invoice_name):
        frappe.throw(_("Invoice '{0}' not found").format(invoice_name))

    invoice = frappe.get_doc("POS Invoice", invoice_name)

    if invoice.docstatus != 0:
        frappe.throw(_("Only Draft invoices can be cancelled"))

    invoice.flags.ignore_permissions = True
    invoice.delete()
    frappe.db.commit()

    return {
        "status": "success",
        "message": _("Invoice '{0}' cancelled successfully").format(invoice_name),
    }


# ── Helper Functions ──────────────────────────────────────────────


def _apply_menu_prices(invoice):
    """Fetch item prices from URY Active Menu and override them."""
    restaurant = frappe.db.get_value("POS Profile", invoice.pos_profile, "restaurant")
    if not restaurant:
        return
        
    active_menu = frappe.db.get_value("URY Restaurant", restaurant, "active_menu")
    if not active_menu:
        return
        
    menu_items = frappe.get_all("URY Menu Item", filters={"parent": active_menu, "disabled": 0}, fields=["item", "rate"])
    item_rates = {d.item: d.rate for d in menu_items}
    
    for row in invoice.items:
        if row.item_code in item_rates:
            row.rate = item_rates[row.item_code]
            row.price_list_rate = item_rates[row.item_code]
            row.amount = row.rate * row.qty


def _build_invoice(customer, pos_profile, items):
    """Build a POS Invoice doc with items."""
    inv = frappe.new_doc("POS Invoice")
    inv.customer = customer
    inv.pos_profile = pos_profile
    inv.is_pos = 1
    inv.update_stock = 1

    for item in items:
        inv.append("items", {
            "item_code": _resolve_item(item),
            "qty": float(item.get("qty", 1)),
        })

    inv.set_missing_values()
    _apply_menu_prices(inv)
    inv.calculate_taxes_and_totals()

    inv.payments = []
    inv.append("payments", {
        "mode_of_payment": _get_default_payment(pos_profile),
        "amount": inv.grand_total,
    })

    return inv


def _get_pos_profile():
    """Get POS Profile from open shift or user default."""
    user = frappe.session.user

    # Try open shift
    opening = frappe.get_all(
        "POS Opening Entry",
        filters={"user": user, "status": "Open", "docstatus": 1},
        fields=["pos_profile"],
        order_by="creation desc",
        limit=1,
        ignore_permissions=True,
    )
    if opening:
        return opening[0].pos_profile

    # Try user default
    profile = frappe.db.get_value("POS Profile User", {"user": user, "default": 1}, "parent")
    if profile:
        return profile

    frappe.throw(_("No POS Profile found. Open a shift or pass pos_profile."))


def _get_or_create_customer(name, phone=None):
    """Find customer by name/phone, or create a new one."""
    # By name
    if frappe.db.exists("Customer", name):
        return name

    # By phone
    lookup = phone or name
    found = frappe.db.get_value("Customer", {"mobile_no": lookup}, "name")
    if found:
        return found

    # Create new
    doc = frappe.new_doc("Customer")
    doc.customer_name = name
    doc.customer_type = "Individual"
    doc.mobile_no = phone or (name if name.isdigit() else None)
    doc.insert(ignore_permissions=True)
    return doc.name


def _resolve_item(item):
    """Resolve item_code from input — accepts code or name."""
    code = item.get("item_code") or item.get("item_name") or item.get("item")
    if not code:
        frappe.throw(_("Each item must have 'item_code'"))

    if frappe.db.exists("Item", code):
        return code

    found = frappe.db.get_value("Item", {"item_name": code}, "name")
    if found:
        return found

    frappe.throw(_("Item '{0}' not found").format(code))


def _get_default_payment(pos_profile):
    """Get default payment method from POS Profile."""
    return frappe.db.get_value(
        "POS Payment Method",
        {"parent": pos_profile, "default": 1},
        "mode_of_payment",
    ) or "Cash"


def _parse(value):
    """Parse JSON string or return as-is."""
    if not value:
        return None
    if isinstance(value, str):
        return json.loads(value)
    return value
