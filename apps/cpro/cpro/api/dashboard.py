import frappe
from frappe import _

from frappe.utils import today, add_days, get_first_day

@frappe.whitelist()
def get_dashboard_stats(period="يوم", tab="عام"):
    # جلب العملة الافتراضية للنظام
    currency = frappe.db.get_default("currency") or frappe.db.get_single_value("Global Defaults", "default_currency") or "EGP"
    
    filters = {"docstatus": 1}
    date_condition = ""
    
    if period == "يوم":
        filters["posting_date"] = today()
        date_condition = f"AND posting_date = '{today()}'"
    elif period == "الأسبوع":
        start_date = add_days(today(), -7)
        filters["posting_date"] = ["between", [start_date, today()]]
        date_condition = f"AND posting_date BETWEEN '{start_date}' AND '{today()}'"
    elif period == "الشهر":
        start_date = get_first_day(today())
        filters["posting_date"] = ["between", [start_date, today()]]
        date_condition = f"AND posting_date BETWEEN '{start_date}' AND '{today()}'"
        
    # جلب جميع فواتير نقاط البيع المعتمدة
    invoices = frappe.get_all("POS Invoice", filters=filters, fields=["name", "grand_total", "net_total", "base_discount_amount", "company"])
    
    total_sales = sum([i.grand_total for i in invoices]) or 0.0
    total_net = sum([i.net_total for i in invoices]) or 0.0
    total_discount = sum([i.base_discount_amount for i in invoices]) or 0.0
    
    if tab == "عام":
        main_stats = [
            {'title': 'الطلبات', 'value': len(invoices)},
            {'title': f'صافي المبيعات ({currency})', 'value': f"{total_net:,.2f}"},
            {'title': f'صافي الدخل ({currency})', 'value': f"{total_sales:,.2f}"},
            {'title': 'طلبات التوصيل', 'value': 0},
            {'title': 'الطلبات المحلية', 'value': len(invoices)},
            {'title': 'طلبات الاستلام', 'value': 0},
            {'title': f'مبلغ الإرجاع ({currency})', 'value': "0.00"},
            {'title': f'مبلغ الخصم ({currency})', 'value': f"{total_discount:,.2f}"},
        ]
    elif tab == "الفروع":
        companies = frappe.get_all("Company", filters={"is_group": 0})
        main_stats = [
            {'title': 'إجمالي الفروع', 'value': len(companies)},
            {'title': 'فروع نشطة', 'value': len(companies)},
            {'title': f'مبيعات الفروع ({currency})', 'value': f"{total_sales:,.2f}"},
            {'title': 'متوسط مبيعات الفرع', 'value': f"{(total_sales/len(companies) if len(companies) else 0):,.2f}"},
        ]
    elif tab == "المخزون":
        items = frappe.get_all("Item", filters={"is_stock_item": 1})
        bins = frappe.get_all("Bin", fields=["actual_qty"])
        total_qty = sum([b.actual_qty for b in bins]) or 0
        main_stats = [
            {'title': 'أصناف المخزون', 'value': len(items)},
            {'title': 'إجمالي الكميات', 'value': f"{total_qty:,.2f}"},
            {'title': 'أصناف منخفضة', 'value': 0},
            {'title': 'أصناف نافذة', 'value': 0},
        ]
    elif tab == "مركز الاتصال":
        main_stats = [
            {'title': 'مكالمات اليوم', 'value': 0},
            {'title': 'الطلبات الهاتفية', 'value': 0},
            {'title': f'مبيعات المركز ({currency})', 'value': "0.00"},
            {'title': 'متوسط وقت الرد', 'value': "0 ثانية"},
        ]
    else:
        main_stats = []
    
    # المنتجات الأكثر مبيعاً
    top_products = []
    try:
        items = frappe.db.sql(f"""
            SELECT item_name, sum(amount) as amount 
            FROM `tabPOS Invoice Item` 
            WHERE docstatus=1 {date_condition}
            GROUP BY item_name 
            ORDER BY amount DESC 
            LIMIT 5
        """, as_dict=True)
        top_products = [{'name': i.item_name, 'amount': f"{i.amount:,.2f}"} for i in items]
    except Exception:
        pass

    # طرق الدفع الأكثر استخداماً
    top_payments = []
    try:
        payments = frappe.db.sql(f"""
            SELECT mode_of_payment, sum(amount) as amount 
            FROM `tabSales Invoice Payment` 
            WHERE docstatus=1 AND parenttype='POS Invoice' {date_condition}
            GROUP BY mode_of_payment 
            ORDER BY amount DESC 
            LIMIT 5
        """, as_dict=True)
        top_payments = [{'name': i.mode_of_payment, 'amount': f"{i.amount:,.2f}"} for i in payments]
    except Exception:
        pass

    top_branches = [
        {'name': 'الفرع الرئيسي', 'amount': f"{total_sales:,.2f}"}
    ]
    
    return {
        "mainStats": main_stats,
        "topProducts": top_products,
        "topPayments": top_payments,
        "topBranches": top_branches,
        "currency": currency
    }

@frappe.whitelist()
def get_sales_reports(start_date=None, end_date=None):
    """جلب قائمة فواتير المبيعات POS Invoices"""
    filters = {"docstatus": 1}
    
    if start_date and end_date:
        filters["posting_date"] = ["between", [start_date, end_date]]
        
    invoices = frappe.get_all(
        "POS Invoice",
        filters=filters,
        fields=["name", "customer_name", "posting_date", "posting_time", "grand_total", "status", "company"],
        order_by="posting_date desc, posting_time desc",
        limit_page_length=100
    )
    return invoices
