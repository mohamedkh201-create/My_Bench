import frappe

def run():
    try:
        links = frappe.get_all("Cpro Management Link", fields=["name", "route", "target_doctype", "title"])
        print("LINKS:", links)
    except Exception as e:
        print("ERROR:", e)
