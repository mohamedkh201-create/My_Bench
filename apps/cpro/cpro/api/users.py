import frappe
from frappe import _
import json

def _check_admin():
    if "System Manager" not in frappe.get_roles(frappe.session.user):
        frappe.throw(_("انت لا تمتلك صلاحيه لفتح هذه الصفحه"), frappe.PermissionError)

@frappe.whitelist()
def get_users():
    _check_admin()
    users = frappe.get_all("User", filters={"enabled": 1}, fields=["name", "full_name", "email", "role_profile_name"])
    
    formatted_users = []
    for i, u in enumerate(users):
        formatted_users.append({
            "id": u.name,
            "name": u.full_name or u.name,
            "email": u.email,
            "role": u.role_profile_name or "مستخدم",
            "branch": "الفرع الرئيسي"
        })
    return formatted_users

@frappe.whitelist()
def get_roles():
    _check_admin()
    # Fetch roles excluding some system defaults that aren't typically assigned directly in this view
    excluded_roles = ["All", "Guest", "Administrator"]
    roles = frappe.get_all("Role", filters={"disabled": 0, "name": ["not in", excluded_roles]}, pluck="name", order_by="name asc")
    return roles

@frappe.whitelist()
def get_user_roles(user_email):
    _check_admin()
    # Fetch roles currently assigned to this user
    roles = frappe.get_all("Has Role", filters={"parent": user_email}, pluck="role")
    return roles

@frappe.whitelist()
def update_user_roles(user_email, roles):
    _check_admin()
    if isinstance(roles, str):
        roles = json.loads(roles)
        
    user = frappe.get_doc("User", user_email)
    
    # Remove existing roles assigned directly (not inherited)
    user.set("roles", [])
    
    for r in roles:
        user.append("roles", {
            "role": r
        })
        
    user.save(ignore_permissions=True)
    return {"status": "success"}

@frappe.whitelist()
def create_user(email, first_name, password, roles=None):
    _check_admin()
    
    if frappe.db.exists("User", email):
        frappe.throw(f"المستخدم {email} مسجل مسبقاً")
        
    user = frappe.new_doc("User")
    user.email = email
    user.first_name = first_name
    user.send_welcome_email = 0
    user.new_password = password
    user.flags.ignore_password_policy = True
    
    # Save the user first
    user.insert(ignore_permissions=True)
    
    # Add roles if provided
    if roles:
        if isinstance(roles, str):
            roles = json.loads(roles)
            
        for r in roles:
            user.append("roles", {
                "role": r
            })
        user.save(ignore_permissions=True)
        
    return {"status": "success", "user": user.name}

@frappe.whitelist(allow_guest=True)
def get_current_user_info():
    user = frappe.session.user
    if user == "Guest":
        return {"name": "Guest", "email": ""}
        
    doc = frappe.get_doc("User", user)
    return {
        "name": doc.full_name or doc.first_name or user,
        "email": doc.email,
        "image": doc.user_image,
        "roles": frappe.get_roles(user)
    }
