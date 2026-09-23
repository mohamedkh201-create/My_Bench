# apps/cpro/cpro/api/customers.py
import frappe

@frappe.whitelist()
def get_customers(search_term=None):
    """جلب قائمة العملاء من Frappe"""
    filters = []
    if search_term:
        filters.append(["Customer", "customer_name", "like", f"%{search_term}%"])
        
    customers = frappe.get_all(
        "Customer",
        fields=["name", "customer_name", "mobile_no", "email_id"],
        filters=filters,
        order_by="modified desc",
        limit_page_length=50
    )
    return customers

@frappe.whitelist()
def create_customer(customer_name, mobile_no=None, email_id=None):
    """إضافة عميل جديد داخل Frappe"""
    if not customer_name:
        frappe.throw("اسم العميل مطلوب")
        
    doc = frappe.get_doc({
        "doctype": "Customer",
        "customer_name": customer_name,
        "mobile_no": mobile_no,
        "email_id": email_id,
        "customer_group": "Individual",
        "territory": "All Territories"
    })
    doc.insert(ignore_permissions=True)
    frappe.db.commit()
    return doc.as_dict()