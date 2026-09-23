import frappe

def run():
    customer = frappe.get_all("Customer", limit=1)[0].name
    doc = frappe.new_doc("POS Invoice")
    doc.pos_profile = "اليماني"
    doc.customer = customer
    doc.is_pos = 1
    doc.append("items", {
        "item_code": "pizza",
        "qty": 1,
        "rate": 120
    })
    
    doc.set_missing_values()
    doc.calculate_taxes_and_totals()
    
    print("Taxes added:", len(doc.taxes))
    print("Grand Total:", doc.grand_total)
    print("Rounded Total:", doc.rounded_total)

