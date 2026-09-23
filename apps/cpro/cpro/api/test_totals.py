import frappe
def run():
    frappe.init(site="my_resturant")
    frappe.connect()
    
    doc = frappe.new_doc("POS Invoice")
    doc.customer = frappe.db.get_value("Customer", {}, "name")
    doc.company = frappe.db.get_value("Company", {}, "name")
    doc.pos_profile = "zed"
    doc.append("items", {
        "item_code": frappe.db.get_value("Item", {"is_sales_item": 1}, "name"),
        "qty": 1,
        "rate": 100
    })
    
    doc.set_missing_values()
    doc.calculate_taxes_and_totals()
    print("Grand Total:", doc.grand_total)
