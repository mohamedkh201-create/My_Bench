import frappe
frappe.init(site="my_resturant")
frappe.connect()
meta = frappe.get_meta("POS Opening Entry")
for f in meta.fields:
    if "branch" in f.fieldname or "branch" in f.label.lower():
        print(f"FIELD: {f.fieldname}, reqd: {f.reqd}, type: {f.fieldtype}")
