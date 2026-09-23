import frappe

def create_doctype():
    if frappe.db.exists("DocType", "Cpro Order Audit Log"):
        return "Already exists"
        
    doc = frappe.get_doc({
        "doctype": "DocType",
        "name": "Cpro Order Audit Log",
        "module": "Cpro",
        "custom": 0, # Part of the app
        "istable": 0,
        "naming_rule": "Expression",
        "autoname": "format:AUDIT-{YY}-{MM}-{#####}",
        "field_order": ["pos_invoice", "action", "reason", "user", "timestamp"],
        "fields": [
            {
                "fieldname": "pos_invoice",
                "fieldtype": "Link",
                "label": "POS Invoice",
                "options": "POS Invoice",
                "reqd": 1,
                "in_list_view": 1
            },
            {
                "fieldname": "action",
                "fieldtype": "Select",
                "label": "Action",
                "options": "Cancelled\nAmended",
                "reqd": 1,
                "in_list_view": 1
            },
            {
                "fieldname": "reason",
                "fieldtype": "Small Text",
                "label": "Reason",
                "reqd": 1
            },
            {
                "fieldname": "user",
                "fieldtype": "Link",
                "label": "User",
                "options": "User",
                "reqd": 1,
                "in_list_view": 1
            },
            {
                "fieldname": "timestamp",
                "fieldtype": "Datetime",
                "label": "Timestamp",
                "reqd": 1,
                "in_list_view": 1
            }
        ],
        "permissions": [
            {
                "role": "Cpro Manager",
                "read": 1,
                "write": 1,
                "create": 1,
                "delete": 0
            },
            {
                "role": "Cpro Cashier",
                "read": 1,
                "write": 1,
                "create": 1,
                "delete": 0
            },
            {
                "role": "System Manager",
                "read": 1,
                "write": 1,
                "create": 1,
                "delete": 1
            }
        ],
        "is_submittable": 0
    })
    doc.insert(ignore_permissions=True)
    return "Created"
