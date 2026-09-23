import frappe

def update_workspace():
    ws = frappe.get_doc("Workspace", "Restaurant Management")
    
    # Check if Cpro Portal Settings is already added
    has_portal_settings = any(l.link_to == "Cpro Portal Settings" for l in ws.links)
    if not has_portal_settings:
        ws.append("links", {
            "type": "Link",
            "label": "Portal Settings",
            "link_type": "DocType",
            "link_to": "Cpro Portal Settings",
            "onboard": 1
        })

    # Check if Order Audit Log is already added
    has_audit_log = any(l.link_to == "Cpro Order Audit Log" for l in ws.links)
    if not has_audit_log:
        ws.append("links", {
            "type": "Link",
            "label": "Order Audit Logs",
            "link_type": "DocType",
            "link_to": "Cpro Order Audit Log",
            "onboard": 0
        })

    # Check if Cpro Portal Banner is already added
    has_banner = any(l.link_to == "Cpro Portal Banner" for l in ws.links)
    if not has_banner:
        ws.append("links", {
            "type": "Link",
            "label": "Portal Banners",
            "link_type": "DocType",
            "link_to": "Cpro Portal Banner",
            "onboard": 0
        })

    # Check if Cpro Portal Request is already added
    has_request = any(l.link_to == "Cpro Portal Request" for l in ws.links)
    if not has_request:
        ws.append("links", {
            "type": "Link",
            "label": "Portal Requests",
            "link_type": "DocType",
            "link_to": "Cpro Portal Request",
            "onboard": 0
        })

    ws.save(ignore_permissions=True)
    
    # Export the workspace to sync it back to JSON
    # frappe.modules.export_doc takes doc, folder
    # Or just use the simpler export mechanism:
    from frappe.modules.export_file import export_to_files
    export_to_files(record_list=[["Workspace", "Restaurant Management"]], record_module="Cpro", create_init=True)

    frappe.db.commit()
    print("Workspace updated successfully.")


