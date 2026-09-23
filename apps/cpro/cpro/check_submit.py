import frappe
from cpro.api.pos import save_order

def run():
    order_data = {
        "pos_profile": "اليماني",
        "customer": "Mohamed Khaled",
        "order_type": "Take Away",
        "print_invoice": 0,
        "items": [
            {"item_code": "Burger", "qty": 1, "rate": 100}
        ]
    }
    try:
        save_order(order_data)
    except Exception as e:
        import traceback
        traceback.print_exc()
