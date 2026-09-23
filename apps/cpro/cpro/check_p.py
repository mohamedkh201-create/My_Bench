import frappe
def run():
    for p_name in ["اليماني", "حموزو", "zed", "كاشير ههيا", "mahmoud"]:
        try:
            pos = frappe.get_doc("POS Profile", p_name)
            print(f"--- {p_name} ---")
            if not pos.payments: print("No payments configured.")
            for p in pos.payments:
                print(f"Mode: {p.mode_of_payment}, Default: {p.default}")
        except Exception:
            pass
