import frappe
def run():
    print(frappe.get_all("Item", limit=1)[0].name)
