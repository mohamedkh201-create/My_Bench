import frappe
from frappe.custom.doctype.custom_field.custom_field import create_custom_fields

def create_doctype():
    if not frappe.db.exists("DocType", "Cpro Portal Request"):
        doc = frappe.get_doc({
            "doctype": "DocType",
            "name": "Cpro Portal Request",
            "module": "Cpro",
            "custom": 1,
            "istable": 0,
            "naming_rule": "Expression",
            "autoname": "REQ-.YYYY.-.#####",
            "fields": [
                {"fieldname": "request_type", "label": "Type", "fieldtype": "Select", "options": "Order\nCall Waiter", "in_list_view": 1, "reqd": 1},
                {"fieldname": "status", "label": "Status", "fieldtype": "Select", "options": "Pending\nCompleted\nCancelled", "default": "Pending", "in_list_view": 1, "reqd": 1},
                {"fieldname": "column_break_1", "fieldtype": "Column Break"},
                {"fieldname": "customer_name", "label": "Customer Name", "fieldtype": "Data"},
                {"fieldname": "phone", "label": "Phone", "fieldtype": "Data"},
                {"fieldname": "section_break_1", "fieldtype": "Section Break"},
                {"fieldname": "table_number", "label": "Table Number", "fieldtype": "Data", "in_list_view": 1},
                {"fieldname": "order_type", "label": "Order Type", "fieldtype": "Select", "options": "Dine In\nDelivery"},
                {"fieldname": "address", "label": "Address", "fieldtype": "Data"},
                {"fieldname": "section_break_2", "fieldtype": "Section Break", "label": "Payload"},
                {"fieldname": "order_payload", "label": "Order Payload (JSON)", "fieldtype": "Code", "options": "JSON"}
            ],
            "permissions": [{"role": "System Manager", "read": 1, "write": 1, "create": 1, "delete": 1}]
        })
        doc.insert(ignore_permissions=True)
        print("Created Cpro Portal Request DocType")
    else:
        print("Cpro Portal Request DocType already exists")

    frappe.db.commit()

