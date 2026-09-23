import frappe
from frappe.custom.doctype.custom_field.custom_field import create_custom_fields

def setup():
    # 1. Create Child Table for Banners
    if not frappe.db.exists("DocType", "Cpro Portal Banner"):
        doc = frappe.get_doc({
            "doctype": "DocType",
            "name": "Cpro Portal Banner",
            "module": "Cpro",
            "custom": 0,
            "istable": 1,
            "fields": [
                {
                    "fieldname": "image",
                    "fieldtype": "Attach Image",
                    "label": "Banner Image",
                    "reqd": 1,
                    "in_list_view": 1
                }
            ]
        })
        doc.insert(ignore_permissions=True)
        print("Created Cpro Portal Banner")

    # 2. Create Single DocType for Settings
    if not frappe.db.exists("DocType", "Cpro Portal Settings"):
        doc = frappe.get_doc({
            "doctype": "DocType",
            "name": "Cpro Portal Settings",
            "module": "Cpro",
            "custom": 0,
            "issingle": 1,
            "fields": [
                {
                    "fieldname": "enable_online_ordering",
                    "fieldtype": "Check",
                    "label": "Enable Online Ordering (Add to Cart)",
                    "default": "1"
                },
                {
                    "fieldname": "banners_section",
                    "fieldtype": "Section Break",
                    "label": "Banners"
                },
                {
                    "fieldname": "banners",
                    "fieldtype": "Table",
                    "label": "Banners",
                    "options": "Cpro Portal Banner"
                }
            ],
            "permissions": [
                {
                    "role": "Cpro Manager",
                    "read": 1,
                    "write": 1,
                    "create": 1
                }
            ]
        })
        doc.insert(ignore_permissions=True)
        print("Created Cpro Portal Settings")

    # 3. Create Custom Fields on POS Invoice
    custom_fields = {
        "POS Invoice": [
            {
                "fieldname": "cpro_source",
                "label": "Order Source",
                "fieldtype": "Select",
                "options": "POS\nPortal",
                "insert_after": "cpro_order_type",
                "default": "POS"
            },
            {
                "fieldname": "cpro_customer_phone",
                "label": "Customer Phone (Portal)",
                "fieldtype": "Data",
                "insert_after": "customer"
            },
            {
                "fieldname": "cpro_delivery_address",
                "label": "Delivery Address",
                "fieldtype": "Small Text",
                "insert_after": "cpro_source"
            }
        ]
    }
    
    create_custom_fields(custom_fields, ignore_validate=True)
    print("Created Custom Fields on POS Invoice")
    
    frappe.db.commit()

setup()
