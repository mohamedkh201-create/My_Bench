import frappe

def run():
    doc = frappe.new_doc("Branch")
    doc.update({
        "branch": "Test Branch XYZ 2",
        "fake_field_123": "fake data"
    })
    doc.save()
    print("Saved successfully!")
