import frappe
def run():
    settings = frappe.get_doc("Stock Settings")
    settings.allow_negative_stock = 1
    settings.save(ignore_permissions=True)
    frappe.db.commit()
    print("Negative stock allowed globally!")
