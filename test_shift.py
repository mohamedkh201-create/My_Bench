import frappe
frappe.init(site="my_resturant")
frappe.connect()

from cpro.api.shift import open_shift
import json

try:
    res = open_shift("zed", json.dumps([{"mode_of_payment": "Cash", "opening_amount": 0}]))
    print("SUCCESS:", res)
except Exception as e:
    import traceback
    traceback.print_exc()
    frappe.db.rollback()
