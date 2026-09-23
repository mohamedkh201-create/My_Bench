import frappe
def make_public():
    files = frappe.get_all('File', filters={'file_url': ['like', '/private/files/%']})
    for f in files:
        doc = frappe.get_doc('File', f.name)
        doc.is_private = 0
        doc.save(ignore_permissions=True)
    frappe.db.commit()
    print('Done fixing {} files'.format(len(files)))
