import frappe
from frappe.custom.doctype.custom_field.custom_field import create_custom_fields

def run():
    custom_fields = [
        {
            "fieldname": "phone",
            "label": "Phone",
            "fieldtype": "Data",
            "insert_after": "branch"
        },
        {
            "fieldname": "email",
            "label": "Email",
            "fieldtype": "Data",
            "insert_after": "phone"
        },
        {
            "fieldname": "address",
            "label": "Address",
            "fieldtype": "Small Text",
            "insert_after": "email"
        }
    ]
    create_custom_fields({"Branch": custom_fields})
    frappe.db.commit()
    print("Added Custom Fields to Branch")
