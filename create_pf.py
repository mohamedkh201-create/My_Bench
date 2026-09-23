import frappe

def create_print_format():
    frappe.init(site="my_resturant")
    frappe.connect()
    pf_name = "Cpro POS Receipt"
    if not frappe.db.exists("Print Format", pf_name):
        doc = frappe.new_doc("Print Format")
        doc.name = pf_name
        doc.doc_type = "POS Invoice"
        doc.standard = "No"
        doc.custom_format = 1
        doc.print_format_type = "Jinja"
    else:
        doc = frappe.get_doc("Print Format", pf_name)

    html = """
<style>
  @media print {
      @page { margin: 0; }
      body { margin: 0; padding: 5px; }
  }
  .receipt-container {
      width: 100%;
      max-width: 320px;
      margin: 0 auto;
      font-family: 'Courier New', Courier, monospace;
      font-size: 14px;
      color: #000;
      line-height: 1.3;
  }
  .receipt-header {
      text-align: center;
      margin-bottom: 10px;
  }
  .receipt-header h3 {
      font-size: 18px;
      margin: 0 0 5px 0;
      font-weight: bold;
      text-transform: uppercase;
  }
  .receipt-header .cashier-name {
      font-size: 14px;
  }
  .text-center { text-align: center; }
  .text-right { text-align: right; }
  .bold { font-weight: bold; }
  .dashed-line {
      border-top: 2px dashed #000;
      margin: 10px 0;
  }
  .receipt-info {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
  }
  .items-table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
  }
  .items-table td {
      vertical-align: top;
      padding: 4px 0;
  }
  .col-qty {
      width: 25px;
      font-weight: bold;
  }
  .col-name {
      width: 195px;
  }
  .col-total {
      width: 100px;
      text-align: right;
  }
  .item-name {
      display: block;
      text-transform: uppercase;
  }
  .item-rate {
      display: block;
  }
  .totals-table {
      width: 100%;
      margin-top: 10px;
  }
  .totals-table td {
      padding: 4px 0;
  }
  .grand-total-row td {
      font-size: 22px;
      font-weight: bold;
      padding-top: 10px;
  }
</style>

<div class="receipt-container" dir="ltr">
    <div class="receipt-header">
        <h3>*** {{ doc.company }} ***</h3>
        <div class="cashier-name">{{ doc.owner }}</div>
    </div>
    
    <div class="receipt-info">
        <div>CHK {{ doc.name.split("-")[-1] }}</div>
        <div>TBL {{ doc.cpro_table or '9/1' }}</div>
        <div>GST 2</div>
    </div>
    
    <div class="text-center" style="margin-bottom: 10px;">
        {{ frappe.utils.format_datetime(doc.posting_date ~ " " ~ doc.posting_time, "dd MMM'yy hh:mm a") }}
    </div>
    
    <div class="dashed-line"></div>
    
    <div class="text-center bold" style="font-size: 18px; margin: 10px 0;">
        {{ doc.cpro_order_type or 'Take Away' }}
    </div>
    
    <table class="items-table">
        {% for item in doc.items %}
        <tr>
            <td class="col-qty">{{ item.qty | int }}</td>
            <td class="col-name">
                <span class="item-name">{{ item.item_name }}</span>
                {% if item.qty > 1 %}
                <span class="item-rate">@ {{ "{:,.2f}".format(item.rate) }}</span>
                {% endif %}
            </td>
            <td class="col-total">{{ "{:,.2f}".format(item.amount) }}</td>
        </tr>
        {% endfor %}
    </table>
    
    <div class="dashed-line"></div>
    
    <table class="totals-table">
        <tr>
            <td>Subtotal</td>
            <td class="text-right">{{ "{:,.2f}".format(doc.net_total) }} EGP</td>
        </tr>
        {% for tax in doc.taxes %}
        <tr>
            <td>{{ tax.description }}</td>
            <td class="text-right">{{ "{:,.2f}".format(tax.tax_amount) }} EGP</td>
        </tr>
        {% endfor %}
        <tr class="grand-total-row">
            <td>Total Due</td>
            <td class="text-right">{{ "{:,.2f}".format(doc.grand_total) }} EGP</td>
        </tr>
    </table>
</div>
"""
    doc.html = html
    doc.save()
    frappe.db.commit()
    print("Print Format created/updated.")

if __name__ == "__main__":
    create_print_format()
