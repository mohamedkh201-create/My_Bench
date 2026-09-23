import frappe
def run():
    pos_profile = "zed"
    branch = frappe.db.get_value("POS Profile", pos_profile, "branch")
    print("Initial branch from POS Profile:", branch)
    
    if not branch:
        branch = frappe.db.get_value("Branch", {}, "name")
        print("Fallback branch:", branch)
        frappe.db.set_value("POS Profile", pos_profile, "branch", branch)
        frappe.db.commit()
    
    branch_after = frappe.db.get_value("POS Profile", pos_profile, "branch")
    print("Branch on POS Profile after set_value:", branch_after)
    
    doc = frappe.new_doc("POS Opening Entry")
    doc.pos_profile = pos_profile
    doc.user = "Administrator"
    doc.company = frappe.db.get_value("POS Profile", pos_profile, "company")
    doc.branch = branch_after
    doc.period_start_date = frappe.utils.now_datetime()
    doc.append("balance_details", {"mode_of_payment": "Cash", "opening_amount": 0})
    
    try:
        doc.insert(ignore_permissions=True)
        print("INSERT SUCCESS! Name:", doc.name)
    except Exception as e:
        print("INSERT FAILED!")
        import traceback
        traceback.print_exc()
