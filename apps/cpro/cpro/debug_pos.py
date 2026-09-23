import frappe
from cpro.api.pos import save_order
import traceback

def run():
    order_data = {
        "pos_profile": "اليماني",
        "customer": "Mohamed Khaled",
        "order_type": "Take Away",
        "print_invoice": 0,
        "grand_total": 114.0,
        "items": [
            {"item_code": "Burger", "qty": 1, "rate": 100}
        ]
    }
    try:
        save_order(order_data)
        print("SUCCESS")
    except Exception as e:
        print("ERROR:")
        traceback.print_exc()

