import frappe
frappe.init(site="attia")
frappe.connect()
fields = frappe.get_meta("Branch").fields
for f in fields:
    print(f.fieldname, f.fieldtype, f.label, f.reqd)
