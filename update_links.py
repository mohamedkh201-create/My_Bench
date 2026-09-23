import frappe
import json

def update_links():
    frappe.init(site="my_resturant")
    frappe.connect()

    new_links = [
        {
            "title": "الفروع",
            "route": "branches",
            "target_doctype": "Company",
            "icon": "Building2",
            "enabled": 1,
            "fields_config": json.dumps([
                {"fieldname": "company_name", "label": "اسم الفرع (Company)", "type": "Data", "reqd": 1},
                {"fieldname": "abbr", "label": "الاختصار", "type": "Data", "reqd": 1},
                {"fieldname": "default_currency", "label": "العملة الافتراضية", "type": "Link", "options": "Currency", "default": "EGP"}
            ])
        },
        {
            "title": "الأجهزة",
            "route": "devices",
            "target_doctype": "POS Profile",
            "icon": "MonitorSmartphone",
            "enabled": 1,
            "fields_config": json.dumps([
                {"fieldname": "name", "label": "اسم الجهاز (POS Profile)", "type": "Data", "reqd": 1},
                {"fieldname": "company", "label": "الفرع التابع له", "type": "Link", "options": "Company", "reqd": 1},
                {"fieldname": "warehouse", "label": "المستودع (Warehouse)", "type": "Link", "options": "Warehouse"}
            ])
        }
    ]

    for link in new_links:
        if not frappe.db.exists("Cpro Management Link", link["route"]):
            l = frappe.new_doc("Cpro Management Link")
            l.update(link)
            l.insert(ignore_permissions=True)
            print(f"Added link {link['route']}")
        else:
            print(f"Link {link['route']} already exists")
            
    frappe.db.commit()

update_links()
