import { useEffect, useRef } from "react";
import { Printer, X } from "lucide-react";
import { __ } from "../lib/frappe.js";

export default function ReceiptModal({ order, paymentResult, onClose }) {
  const printRef = useRef(null);

  const handlePrint = () => {
    const printContent = printRef.current;
    const windowPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    
    // Inject thermal receipt styles
    const dir = document.documentElement.dir || "ltr";
    windowPrint.document.write(`
      <html dir="${dir}">
        <head>
          <title>${__("Print Receipt")}</title>
          <style>
            @page { margin: 0; size: 80mm 297mm; }
            body { 
              font-family: monospace; 
              width: 80mm; 
              padding: 5mm; 
              margin: 0 auto; 
              font-size: 12px;
              color: #000;
            }
            .text-center { text-align: center; }
            .font-bold { font-weight: bold; }
            .text-xl { font-size: 16px; }
            .mb-2 { margin-bottom: 8px; }
            .mb-4 { margin-bottom: 16px; }
            .mt-4 { margin-top: 16px; }
            .flex { display: flex; justify-content: space-between; }
            .border-b { border-bottom: 1px dashed #000; padding-bottom: 4px; margin-bottom: 4px; }
            .border-t { border-top: 1px dashed #000; padding-top: 4px; margin-top: 4px; }
            * { box-sizing: border-box; }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    
    windowPrint.document.close();
    windowPrint.focus();
    setTimeout(() => {
      windowPrint.print();
      windowPrint.close();
    }, 250);
  };

  useEffect(() => {
    // Automatically prompt print on load
    handlePrint();
  }, []);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4">
      <div className="flex max-h-full w-full max-w-sm flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 p-4">
          <h2 className="font-bold text-gray-900">{__("Print Receipt")}</h2>
          <button onClick={onClose} className="rounded-full p-2 text-gray-400 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto bg-gray-100 p-6 flex justify-center">
          {/* Printable Area - We style it inline for the preview, but real print styles are injected above */}
          <div 
            ref={printRef}
            className="w-full max-w-[80mm] bg-white p-4 shadow-sm"
            style={{ fontFamily: 'monospace', fontSize: '12px', color: '#000' }}
          >
            <div className="text-center mb-4">
              <h1 className="font-bold text-xl mb-2">CPro POS</h1>
              <div>{__("Order: {0}", [paymentResult?.name || order.name])}</div>
              <div>{__("Date: {0}", [new Date().toLocaleString()])}</div>
              <div>{__("Customer: {0}", [order.customer_name || __("Guest")])}</div>
              {order.cpro_table && <div>{__("Table: {0}", [order.cpro_table])}</div>}
            </div>

            <div className="border-b" style={{ borderBottom: '1px dashed #000', marginBottom: '8px', paddingBottom: '8px' }}>
              <div className="flex" style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                <span>{__("Item")}</span>
                <span>{__("Total")}</span>
              </div>
            </div>

            {/* In a real scenario we'd loop over order.items. 
                Since OrdersPage only fetches summary, we just show the summary here. */}
            <div className="flex mb-2" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{__("Order Total")}</span>
              <span>{Number(order.grand_total).toFixed(2)}</span>
            </div>

            <div className="border-t mt-4" style={{ borderTop: '1px dashed #000', marginTop: '8px', paddingTop: '8px' }}>
              <div className="flex font-bold" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span>{__("Grand Total")}</span>
                <span>{Number(order.grand_total).toFixed(2)}</span>
              </div>
              <div className="flex" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                <span>{__("Paid Amount")}</span>
                <span>{Number(paymentResult?.paid_amount || order.grand_total).toFixed(2)}</span>
              </div>
              <div className="flex" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{__("Change")}</span>
                <span>{Number(paymentResult?.change_amount || 0).toFixed(2)}</span>
              </div>
            </div>

            <div className="text-center mt-4 pt-4 border-t" style={{ borderTop: '1px dashed #000', marginTop: '16px', paddingTop: '16px' }}>
              <div>{__("Thank you for your visit!")}</div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 p-4 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-gray-200 bg-white py-3 font-semibold text-gray-700 hover:bg-gray-50"
          >
            {__("Close")}
          </button>
          <button
            onClick={handlePrint}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-brand py-3 font-semibold text-white hover:bg-brand-dark"
          >
            <Printer className="h-5 w-5" />
            {__("Print Again")}
          </button>
        </div>
      </div>
    </div>
  );
}
