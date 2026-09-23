import frappe

@frappe.whitelist()
def get_reasons():
    try:
        void_reasons = frappe.get_all("POS Reason", filters={"reason_type": "Void"}, fields=["name"])
        void_reasons = [r.name for r in void_reasons]
    except Exception:
        void_reasons = ['Customer Cancelled', 'Wrong']
        
    try:
        qty_reasons = frappe.get_all("POS Reason", filters={"reason_type": "Qty"}, fields=["name"])
        qty_reasons = [r.name for r in qty_reasons]
    except Exception:
        qty_reasons = ['Misplaced', 'Miscount', 'Expiry', 'Waste']
        
    try:
        till_reasons = frappe.get_all("POS Reason", filters={"reason_type": "Till"}, fields=["name"])
        till_reasons = [r.name for r in till_reasons]
    except Exception:
        till_reasons = ['Taking Petty Cash', 'Cash Change']
        
    return {
        "voidReasons": void_reasons,
        "qtyReasons": qty_reasons,
        "tillReasons": till_reasons
    }

@frappe.whitelist()
def get_management_links():
    if "System Manager" not in frappe.get_roles(frappe.session.user):
        return []
    
    links = []
    try:
        links = frappe.get_all("Cpro Management Link", filters={"enabled": 1}, fields=["title", "route", "target_doctype", "fields_config", "icon"], order_by="creation asc")
    except Exception:
        pass
        
    static_links = [
        {
            "title": "البروفايل",
            "route": "devices",
            "target_doctype": "POS Profile",
            "icon": "Monitor",
            "fields_config": [
                {"label": "اسم البروفايل", "fieldname": "name", "type": "Data", "reqd": 1},
                {"label": "الشركة", "fieldname": "company", "type": "Data", "reqd": 1}
            ]
        },
        {
            "title": "الفروع",
            "route": "branches",
            "target_doctype": "Branch",
            "icon": "MapPin",
            "fields_config": [
                {"label": "اسم الفرع", "fieldname": "branch", "type": "Data", "reqd": 1},
                {"label": "رقم الهاتف", "fieldname": "phone", "type": "Data"},
                {"label": "البريد الإلكتروني", "fieldname": "email", "type": "Data"},
                {"label": "العنوان التفصيلي", "fieldname": "address", "type": "Data"}
            ]
        },
        {
            "title": "الغرف والطاولات",
            "route": "rooms",
            "target_doctype": "Cpro Table",
            "icon": "Grid",
            "fields_config": [
                {"label": "الاسم", "fieldname": "name", "type": "Data", "reqd": 1},
                {"label": "رقم الطاولة/الغرفة", "fieldname": "table_number", "type": "Data", "reqd": 1},
                {"label": "الغرفة", "fieldname": "room", "type": "Data"},
                {"label": "مفعل", "fieldname": "is_active", "type": "Check", "default": 1}
            ]
        },
        {
            "title": "قوائم الأسعار",
            "route": "price-lists",
            "target_doctype": "Price List",
            "icon": "List",
            "fields_config": [
                {"label": "اسم القائمة", "fieldname": "price_list_name", "type": "Data", "reqd": 1},
                {"label": "العملة", "fieldname": "currency", "type": "Data", "reqd": 1, "default": "EGP"},
                {"label": "للبيع", "fieldname": "selling", "type": "Check", "default": 1}
            ]
        },
        {
            "title": "المنيو",
            "route": "menus",
            "target_doctype": "Item",
            "icon": "BookOpen",
            "fields_config": [
                {"label": "رمز المنتج", "fieldname": "item_code", "type": "Data", "reqd": 1},
                {"label": "اسم المنتج", "fieldname": "item_name", "type": "Data", "reqd": 1},
                {"label": "المجموعة", "fieldname": "item_group", "type": "Link", "options": "Item Group", "reqd": 1}
            ]
        }
    ]
    static_routes = [s["route"] for s in static_links]
    filtered_links = [l for l in links if l.get("route") not in static_routes]
    
    return static_links + filtered_links

@frappe.whitelist()
def get_dynamic_records(target_doctype, fields):
    if "System Manager" not in frappe.get_roles(frappe.session.user):
        frappe.throw("Access denied", frappe.PermissionError)
        
    import json
    if isinstance(fields, str):
        fields = json.loads(fields)
    
    # Always ensure 'name' is in fields
    if "name" not in fields:
        fields.append("name")
        
    records = frappe.get_all(target_doctype, fields=fields, order_by="creation desc")
    return records

@frappe.whitelist()
def save_dynamic_record(target_doctype, data):
    if "System Manager" not in frappe.get_roles(frappe.session.user):
        frappe.throw("Access denied", frappe.PermissionError)
        
    import json
    if isinstance(data, str):
        data = json.loads(data)
        
    name = data.get("name")
    
    if name:
        doc = frappe.get_doc(target_doctype, name)
        doc.update(data)
    else:
        doc = frappe.new_doc(target_doctype)
        doc.update(data)
        
    doc.save(ignore_permissions=True)
    frappe.db.commit()
    return doc.as_dict()

@frappe.whitelist()
def delete_dynamic_record(target_doctype, name):
    if "System Manager" not in frappe.get_roles(frappe.session.user):
        frappe.throw("Access denied", frappe.PermissionError)
        
    frappe.delete_doc(target_doctype, name, ignore_permissions=True)
    frappe.db.commit()
    return {"status": "success"}

@frappe.whitelist()
def get_all_doctypes():
    if "System Manager" not in frappe.get_roles(frappe.session.user):
        frappe.throw("Access denied", frappe.PermissionError)
        
    doctypes = frappe.get_all("DocType", filters={"istable": 0, "issingle": 0}, fields=["name", "module"], order_by="module asc, name asc")
    return doctypes

@frappe.whitelist()
def get_doctype_meta(doctype):
    if "System Manager" not in frappe.get_roles(frappe.session.user):
        frappe.throw("Access denied", frappe.PermissionError)
        
    meta = frappe.get_meta(doctype)
    fields = []
    for d in meta.fields:
        if d.fieldtype not in ['Section Break', 'Column Break', 'HTML', 'Fold', 'Tab Break', 'Button']:
            fields.append({
                "fieldname": d.fieldname,
                "label": d.label or d.fieldname,
                "type": d.fieldtype,
                "reqd": d.reqd,
                "options": d.options,
                "default": d.default,
                "in_list_view": d.in_list_view
            })
    return {
        "name": meta.name,
        "title_field": meta.title_field,
        "search_fields": meta.search_fields,
        "fields": fields
    }
