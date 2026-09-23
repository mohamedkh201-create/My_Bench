# apps/cpro/cpro/api/menu.py
import frappe

@frappe.whitelist()
def get_pos_menu(pos_profile=None, price_list=None):
    """جلب الأصناف والأسعار ديناميكياً بناءً على قائمة الأسعار المختارة أو بروفايل الكاشير"""
    
    # 1. تحديث قائمة الأسعار المستهدفة ديناميكياً
    target_price_list = price_list

    # 2. إذا لم يتم تمرير قائمة أسعار صريحة، نجلبها من POS Profile
    if not target_price_list and pos_profile:
        target_price_list = frappe.db.get_value("POS Profile", pos_profile, "selling_price_list")
        
    # 3. إذا لم تتوفر، نستخدم القائمة الافتراضية للمبيعات
    if not target_price_list:
        target_price_list = frappe.db.get_single_value("Selling Settings", "selling_price_list") or "Standard Selling"

    # جلب كافة الأصناف المفعلة
    items = frappe.get_all(
        "Item",
        fields=["name", "item_code", "item_name", "item_group", "standard_rate", "image"],
        filters=[["disabled", "=", 0]],
        limit_page_length=500
    )

    # جلب الأسعار المحددة للقائمة المطلوبة حصراً
    item_prices = frappe.get_all(
        "Item Price",
        fields=["item_code", "price_list_rate"],
        filters=[["selling", "=", 1], ["price_list", "=", target_price_list]],
        limit_page_length=1000
    )

    price_map = {p["item_code"]: p["price_list_rate"] for p in item_prices}

    # دمج السعر المحدد للقائمة أو استخدام standard_rate كبديل
    for item in items:
        code = item.get("item_code") or item.get("name")
        item["rate"] = price_map.get(code, item.get("standard_rate") or 0)

    return {
        "price_list": target_price_list,
        "items": items
    }

@frappe.whitelist()
def get_menu(pos_profile=None, price_list=None):
    return get_pos_menu(pos_profile=pos_profile, price_list=price_list)

@frappe.whitelist()
def build_menu(pos_profile=None, price_list=None):
    return get_pos_menu(pos_profile=pos_profile, price_list=price_list)