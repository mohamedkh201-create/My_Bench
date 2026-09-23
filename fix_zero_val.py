import frappe
frappe.init(site="my_resturant")
frappe.connect()

items = frappe.get_all('POS Invoice Item', filters={'docstatus': 1}, fields=['name', 'parent'])

print("Found items:", len(items))

for item in items:
    # Force set to 1 to trigger cache clear and DB update
    frappe.db.set_value('POS Invoice Item', item.name, 'allow_zero_valuation_rate', 1)
    frappe.cache().hdel('POS Invoice', item.parent)

frappe.db.commit()
print("Cache forcefully cleared")
