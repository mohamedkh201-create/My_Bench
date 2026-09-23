import frappe
import json
from frappe import _
from frappe.utils import flt

@frappe.whitelist()
def save_order(order_data=None):
    """
    حفظ الطلب وإنشاء فاتورة POS Invoice داخل Frappe ديناميكياً
    """
    # 1. استخراج البيانات بغض النظر عن طريقة إرسال الفرونت إند لها
    if not order_data:
        if frappe.request and frappe.request.get_json():
            order_data = frappe.request.get_json()
        elif frappe.form_dict:
            order_data = frappe.form_dict.get("order_data") or frappe.form_dict

    if isinstance(order_data, str):
        try:
            order_data = json.loads(order_data)
        except Exception:
            pass

    if isinstance(order_data, dict):
        if "order_data" in order_data:
            inner = order_data.get("order_data")
            order_data = json.loads(inner) if isinstance(inner, str) else inner
        elif "order" in order_data:
            inner = order_data.get("order")
            order_data = json.loads(inner) if isinstance(inner, str) else inner

    if not order_data or not isinstance(order_data, dict):
        frappe.throw(_("لم يتم إرسال بيانات الطلب بشكل صحيح"))

    items = order_data.get("items", [])
    if not items:
        frappe.throw(_("السلة فارغة، يجب إرسال عناصر للطلب"))

    # 2. جلب بيانات POS Profile والعميل
    pos_profile_name = order_data.get("pos_profile") or frappe.db.get_value("POS Profile", {"disabled": 0}, "name")
    pos_profile = frappe.get_doc("POS Profile", pos_profile_name) if pos_profile_name else None

    company = order_data.get("company") or (pos_profile.company if pos_profile else frappe.defaults.get_user_default("Company"))
    customer = order_data.get("customer") or (pos_profile.customer if pos_profile else None)

    # إذا لم يتم تحديد عميل، يتم جلب أول عميل مسجل في النظام تلقائياً لمنع خطأ LinkValidation
    if not customer:
        customer = frappe.db.get_value("Customer", {}, "name")
        if not customer:
            frappe.throw(_("لا يوجد أي عميل مسجل في النظام، يرجى إضافة عميل أولاً"))

    # 3. إنشاء مستند الفاتورة
    doc = frappe.new_doc("POS Invoice")
    doc.customer = customer
    doc.company = company
    if pos_profile_name:
        doc.pos_profile = pos_profile_name

    # ربط الفاتورة بالوردية المفتوحة حالياً حتى تظهر في حسابات الوردية
    open_shift = frappe.db.get_value("POS Opening Entry", {"user": frappe.session.user, "status": "Open", "docstatus": 1, "pos_profile": pos_profile_name}, "name")
    if open_shift:
        doc.cpro_pos_opening_shift = open_shift

    doc.posting_date = frappe.utils.nowdate()
    doc.posting_time = frappe.utils.nowtime()

    # نوع الطلب والطاولة
    order_type = order_data.get("order_type") or order_data.get("cpro_order_type") or "Take Away"
    doc.cpro_order_type = order_type
    table_val = order_data.get("table") or order_data.get("cpro_table")
    if order_type == "Dine In" and table_val:
        doc.cpro_table = table_val

    # 4. إضافة المنتجات
    for item in items:
        item_code = item.get("item_code") or item.get("name")
        qty = flt(item.get("qty") or item.get("quantity") or 1)
        rate = flt(item.get("rate") or item.get("price") or 0)

        doc.append("items", {
            "item_code": item_code,
            "qty": qty,
            "rate": rate,
            "amount": qty * rate,
            "allow_zero_valuation_rate": 1,
            "custom_modifiers": json.dumps(item.get("modifiers")) if item.get("modifiers") else None,
            "description": item.get("description", "")
        })

    # حساب الضرائب والإجمالي أولاً لكي يكون doc.grand_total متاحاً
    doc.set_missing_values()
    doc.calculate_taxes_and_totals()

    # 5. إضافة المدفوعات
    payments = order_data.get("payments", [])
    if payments:
        for pay in payments:
            doc.append("payments", {
                "mode_of_payment": pay.get("mode_of_payment"),
                "amount": flt(pay.get("amount", 0))
            })
    elif pos_profile and order_type != "Dine In":
        expected_total = doc.rounded_total or flt(order_data.get("grand_total")) or doc.grand_total
        for pm in pos_profile.payments:
            doc.append("payments", {
                "mode_of_payment": pm.mode_of_payment,
                "amount": expected_total if pm.default else 0
            })

    doc.insert(ignore_permissions=True)

    # إنشاء تذكرة المطبخ Cpro KOT تلقائياً لربطها بشاشة المطبخ
    try:
        kot = frappe.new_doc("Cpro KOT")
        kot.pos_invoice = doc.name
        kot.customer = customer
        kot.status = "New"
        kot.order_time = frappe.utils.now_datetime()
        kot.order_notes = order_data.get("notes") or ""
        if doc.get("cpro_table"):
            kot.table = doc.cpro_table
        elif order_data.get("table"):
            kot.table = order_data.get("table")
        else:
            kot.table = None

        for item in items:
            item_code = item.get("item_code") or item.get("name")
            qty = flt(item.get("qty") or item.get("quantity") or 1)
            kot.append("items", {
                "item": item_code,
                "item_name": item.get("item_name") or item_code,
                "qty": qty,
                "status": "New",
                "notes": item.get("notes") or ""
            })
        kot.insert(ignore_permissions=True)
    except Exception as ke:
        frappe.log_error(f"Error creating KOT for invoice {doc.name}: {str(ke)}")

    should_submit = order_data.get("is_submitted", 1)
    if order_type == "Dine In":
        should_submit = 0

    if should_submit:
        doc.submit()

    frappe.db.commit()

    print_html = None
    print_format = None
    if order_data.get("print_invoice") or order_data.get("print"):
        print_html, print_format = generate_invoice_html(doc.name)

    return {
        "status": "success",
        "message": _("تم تسجيل الطلب بنجاح"),
        "name": doc.name,
        "grand_total": doc.grand_total,
        "print_html": print_html,
        "print_format": print_format
    }


@frappe.whitelist()
def get_pos_board_orders():
    """جلب الطلبات مقسمة إلى: غير مدفوعة (unpaid) ومدفوعة (paid) مع تفاصيل الأصناف"""
    fields = [
        "name", "customer", "customer_name", "posting_date", "posting_time",
        "grand_total", "status", "docstatus", "pos_profile", "creation"
    ]

    unpaid_docs = frappe.get_all(
        "POS Invoice",
        filters={"docstatus": 0},
        fields=fields,
        order_by="creation desc",
        limit_page_length=50
    )

    paid_docs = frappe.get_all(
        "POS Invoice",
        filters={"docstatus": 1},
        fields=fields,
        order_by="creation desc",
        limit_page_length=50
    )

    all_names = [d.name for d in unpaid_docs] + [d.name for d in paid_docs]
    items_map = {}
    if all_names:
        for it in frappe.get_all(
            "POS Invoice Item",
            filters={"parent": ["in", all_names]},
            fields=["parent", "item_code", "item_name", "qty", "rate", "amount"]
        ):
            items_map.setdefault(it.parent, []).append(it)

    for d in unpaid_docs:
        d["items"] = items_map.get(d.name, [])
        d["is_paid"] = False

    for d in paid_docs:
        d["items"] = items_map.get(d.name, [])
        d["is_paid"] = True

    return {
        "unpaid": unpaid_docs,
        "paid": paid_docs
    }


@frappe.whitelist()
def pay_order(invoice_name, mode_of_payment="Cash"):
    """دفع وتأكيد فاتورة معلقة ونقلها إلى حالة مسددة (Paid)"""
    if not invoice_name:
        frappe.throw(_("رقم الفاتورة مطلوب"))

    doc = frappe.get_doc("POS Invoice", invoice_name)
    if doc.docstatus == 1:
        return {
            "status": "already_paid",
            "message": _("الفاتورة مدفوعة ومؤكدة بالفعل"),
            "name": doc.name,
            "grand_total": doc.grand_total
        }

    # تحديث الضرائب والمجاميع أولاً لمعرفة المبلغ النهائي المطلوب
    doc.set_missing_values()
    doc.calculate_taxes_and_totals()
    
    expected_total = doc.rounded_total or doc.grand_total

    # تفريغ المدفوعات السابقة إن وجدت، وإضافة الدفع الجديد بالمبلغ الصحيح
    doc.set("payments", [])
    doc.append("payments", {
        "mode_of_payment": mode_of_payment,
        "amount": expected_total
    })
    
    # لضمان تحديث المجاميع الخاصة بالدفع
    doc.set_paid_amount()

    doc.save(ignore_permissions=True)
    doc.submit()
    frappe.db.commit()

    print_html = None
    try:
        print_html, _fmt = generate_invoice_html(doc.name)
    except Exception as pe:
        frappe.log_error(f"Error generating print on pay: {str(pe)}")

    return {
        "status": "success",
        "message": _("تم سداد الفاتورة بنجاح"),
        "name": doc.name,
        "grand_total": doc.grand_total,
        "print_html": print_html
    }


@frappe.whitelist()
def get_invoice_print(invoice_name, print_format=None):
    """جلب كود الطباعة HTML لفاتورة معينة ديناميكياً بناءً على الـ Print Format المعتمد"""
    if not invoice_name:
        frappe.throw(_("رقم الفاتورة مطلوب"))

    html, print_format = generate_invoice_html(invoice_name, print_format)

    return {
        "name": invoice_name,
        "print_html": html,
        "print_format": print_format or "Standard"
    }

def generate_invoice_html(invoice_name, print_format=None):
    """دالة مساعدة لتوحيد منطق الطباعة في جميع الأماكن"""
    invoice = frappe.get_doc("POS Invoice", invoice_name)
    if not print_format and invoice.pos_profile:
        print_format = frappe.db.get_value("POS Profile", invoice.pos_profile, "print_format")
    
    if not print_format:
        print_format = "Cpro POS Receipt"

    try:
        if print_format == "Cpro POS Receipt":
            cashier_name = frappe.utils.get_fullname(invoice.owner) if hasattr(frappe.utils, "get_fullname") else frappe.db.get_value("User", invoice.owner, "full_name") or invoice.owner
            html = frappe.render_template("cpro/templates/pos_receipt.html", {"doc": invoice, "cashier_name": cashier_name})
        else:
            html = frappe.get_print("POS Invoice", invoice_name, print_format=print_format, doc=invoice)
    except Exception as e:
        frappe.log_error(f"Error generating print HTML for {invoice_name}: {str(e)}")
        html = frappe.get_print("POS Invoice", invoice_name, doc=invoice)
        
    return html, print_format


@frappe.whitelist()
def get_customers():
    """جلب قائمة العملاء المسجلين من Frappe"""
    return frappe.get_all(
        "Customer",
        fields=["name", "customer_name", "mobile_no"],
        order_by="creation desc"
    )


@frappe.whitelist()
def create_customer(customer_name, mobile_no=None):
    """إنشاء عميل جديد فوراً على سيرفر Frappe (Port 8000)"""
    if not customer_name:
        frappe.throw(_("اسم العميل مطلوب"))

    customer = frappe.new_doc("Customer")
    customer.customer_name = customer_name
    customer.customer_group = frappe.db.get_single_value("POS Profile", "customer_group") or "Individual"
    customer.territory = frappe.db.get_single_value("POS Profile", "territory") or "All Territories"

    if mobile_no:
        customer.mobile_no = mobile_no

    customer.insert(ignore_permissions=True)
    frappe.db.commit()

    return {
        "name": customer.name,
        "customer_name": customer.customer_name
    }
@frappe.whitelist()
def get_pos_tax_rate(pos_profile):
    """جلب نسبة الضريبة الكلية المربوطة بـ POS Profile"""
    if not pos_profile:
        return 0
    
    tax_template = frappe.db.get_value("POS Profile", pos_profile, "taxes_and_charges")
    if not tax_template:
        return 0

    taxes = frappe.get_all(
        "Sales Taxes and Charges",
        filters={"parent": tax_template},
        fields=["rate"]
    )
    
    total_rate = sum([flt(t.get("rate")) for t in taxes])
    return total_rate
