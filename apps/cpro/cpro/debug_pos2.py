import frappe
from cpro.api.pos import save_order

def run():
    customer = frappe.get_all("Customer", limit=1)[0].name
    print("Using Customer:", customer)
    order_data = {
        "pos_profile": "اليماني",
        "customer": customer,
        "order_type": "Take Away",
        "print_invoice": 0,
        "grand_total": 136.80,
        "items": [
            {"item_code": "Burger", "qty": 1, "rate": 100}
        ]
    }
    try:
        save_order(order_data)
        print("SUCCESS")
    except Exception as e:
        import traceback
        traceback.print_exc()
