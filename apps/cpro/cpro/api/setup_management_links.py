import frappe
import json

def run():

    doctype_name = "Cpro Management Link"
    if frappe.db.exists("DocType", doctype_name):
        print("DocType already exists. Proceeding to seed data...")
    else:
        doc = frappe.get_doc({
            "doctype": "DocType",
            "name": doctype_name,
        "module": "Cpro",
        "custom": 1,
        "is_submittable": 0,
        "fields": [
            {
                "fieldname": "title",
                "label": "Title",
                "fieldtype": "Data",
                "reqd": 1,
                "in_list_view": 1
            },
            {
                "fieldname": "route",
                "label": "Route",
                "fieldtype": "Data",
                "reqd": 1,
                "in_list_view": 1,
                "unique": 1,
                "description": "e.g. payment-methods (no spaces)"
            },
            {
                "fieldname": "target_doctype",
                "label": "Target Doctype",
                "fieldtype": "Link",
                "options": "DocType",
                "reqd": 1,
                "in_list_view": 1
            },
            {
                "fieldname": "enabled",
                "label": "Enabled",
                "fieldtype": "Check",
                "default": "1",
                "in_list_view": 1
            },
            {
                "fieldname": "fields_config",
                "label": "Fields Configuration (JSON)",
                "fieldtype": "Code",
                "options": "JSON",
                "description": "e.g. [{\"fieldname\": \"name\", \"label\": \"Name\", \"type\": \"Data\"}]"
            },
            {
                "fieldname": "icon",
                "label": "Icon (Lucide)",
                "fieldtype": "Data",
                "description": "Name of Lucide React icon e.g. 'CreditCard'"
            }
        ],
        "permissions": [
            {
                "role": "System Manager",
                "read": 1,
                "write": 1,
                "create": 1,
                "delete": 1
            }
        ]
        })
    
        doc.insert(ignore_permissions=True)
    frappe.db.commit()
    print("DocType 'Cpro Management Link' created successfully!")

    # Seed it with standard modules the user asked for
    links = [
        {
            "title": "طرق الدفع",
            "route": "payment-methods",
            "target_doctype": "Mode of Payment",
            "icon": "CreditCard",
            "enabled": 1,
            "fields_config": json.dumps([
                {"fieldname": "mode_of_payment", "label": "طريقة الدفع", "type": "Data", "reqd": 1},
                {"fieldname": "enabled", "label": "مفعل", "type": "Check", "default": 1}
            ])
        },
        {
            "title": "مناطق التوصيل",
            "route": "delivery-zones",
            "target_doctype": "Delivery Trip", # Note: Standard ERPNext doesn't have a simple Delivery Zone, usually Address or Territory. Let's use Territory.
            "icon": "Map",
            "enabled": 1,
            "fields_config": json.dumps([
                {"fieldname": "territory_name", "label": "المنطقة", "type": "Data", "reqd": 1},
                {"fieldname": "parent_territory", "label": "المنطقة الرئيسية", "type": "Link", "options": "Territory"}
            ])
        },
        {
            "title": "الضرائب",
            "route": "taxes",
            "target_doctype": "Sales Taxes and Charges Template",
            "icon": "Receipt",
            "enabled": 1,
            "fields_config": json.dumps([
                {"fieldname": "title", "label": "الاسم", "type": "Data", "reqd": 1},
                {"fieldname": "disabled", "label": "معطل", "type": "Check", "default": 0},
                {"fieldname": "is_default", "label": "افتراضي", "type": "Check", "default": 0}
            ])
        },
        {
            "title": "الفروع",
            "route": "branches",
            "target_doctype": "Company",
            "icon": "Building2",
            "enabled": 1,
            "fields_config": json.dumps([
                {"fieldname": "company_name", "label": "اسم الفرع", "type": "Data", "reqd": 1},
                {"fieldname": "abbr", "label": "الاختصار", "type": "Data", "reqd": 1},
                {"fieldname": "default_currency", "label": "العملة", "type": "Link", "options": "Currency", "default": "EGP"}
            ])
        },
        {
            "title": "الأجهزة",
            "route": "devices",
            "target_doctype": "POS Profile",
            "icon": "MonitorSmartphone",
            "enabled": 1,
            "fields_config": json.dumps([
                {"fieldname": "name", "label": "اسم الجهاز", "type": "Data", "reqd": 1},
                {"fieldname": "company", "label": "الفرع التابع له", "type": "Link", "options": "Company", "reqd": 1},
                {"fieldname": "warehouse", "label": "المستودع (Warehouse)", "type": "Link", "options": "Warehouse"}
            ])
        }
    ]

    for link in links:
        if not frappe.db.exists("Cpro Management Link", {"route": link["route"]}):
            l = frappe.new_doc("Cpro Management Link")
            l.update(link)
            l.insert(ignore_permissions=True)
    
    frappe.db.commit()
    print("Seed data inserted.")
