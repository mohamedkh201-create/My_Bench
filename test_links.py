import frappe
frappe.init(site="attia")
frappe.connect()
links = frappe.get_all("Cpro Management Link", fields=["name", "title", "route", "target_doctype", "fields_config"])
for l in links:
    print(l)
