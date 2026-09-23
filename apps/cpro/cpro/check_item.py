import frappe

def run():
    meta = frappe.get_meta("Item")
    for f in meta.fields:
        if "cat" in f.fieldname.lower() or (f.label and "cat" in f.label.lower()):
            print(f"{f.fieldname} ({f.label})")
