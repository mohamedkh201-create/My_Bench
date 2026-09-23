import frappe
frappe.init(site="my_resturant")
frappe.connect()

doc = frappe.new_doc("Branch")
doc.update({
    "branch": "Test Branch XYZ",
    "fake_field_123": "fake data"
})
doc.save()
print("Saved successfully!")
