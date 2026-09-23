/**
 * ============================================================================
 * Component: OrderDetailModal.jsx
 * ============================================================================
 * الوصف:
 * نافذة تفاصيل الفاتورة المنبثقة عند الضغط على زر المعاينة في جدول الطلبات.
 * تعرض تفاصيل المنتجات والأسعار والكميات وطرق الدفع.
 * ============================================================================
 */

import React, { useState } from 'react';
import { XCircle, Printer, RefreshCw } from 'lucide-react';
import { getInvoicePrint } from '../../lib/api';
import { printInvoiceHtml } from '../../lib/printUtils';

export default function OrderDetailModal({ selectedOrder, onClose }) {
    const [printing, setPrinting] = useState(false);
    if (!selectedOrder) return null;

    const handlePrint = async () => {
        setPrinting(true);
        try {
            const data = await getInvoicePrint(selectedOrder.name);
            if (data?.print_html) {
                printInvoiceHtml(data.print_html);
            } else {
                alert("تعذر جلب قالب الطباعة من السيرفر.");
            }
        } catch (err) {
            console.error("خطأ أثناء طباعة الفاتورة:", err);
            alert("حدث خطأ أثناء محاولة الطباعة.");
        } finally {
            setPrinting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl w-[500px] max-h-[85vh] shadow-xl flex flex-col overflow-hidden" dir="rtl">

                {/* هيدر التفاصيل */}
                <div className="p-5 bg-[#1E4038] text-white flex justify-between items-center">
                    <div>
                        <h3 className="font-bold text-base">تفاصيل الفاتورة #{selectedOrder.name}</h3>
                        <p className="text-xs opacity-80">العميل: {selectedOrder.customer_name || selectedOrder.customer}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-white/20 rounded-lg transition cursor-pointer"
                    >
                        <XCircle size={22} />
                    </button>
                </div>

                {/* أصناف الفاتورة */}
                <div className="p-5 flex-1 overflow-y-auto space-y-4 text-xs">
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 space-y-1">
                        <p><span className="font-bold text-gray-600">التاريخ:</span> {selectedOrder.posting_date} {selectedOrder.posting_time}</p>
                        <p><span className="font-bold text-gray-600">طريقة الدفع:</span> {selectedOrder.payments?.[0]?.mode_of_payment || 'Cash'}</p>
                        <p><span className="font-bold text-gray-600">بروفايل POS:</span> {selectedOrder.pos_profile}</p>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-800 mb-2 border-b pb-1">الأصناف المطلوبة:</h4>
                        <div className="space-y-2">
                            {selectedOrder.items?.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center p-2.5 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="font-bold text-gray-800">{item.item_name || item.item_code}</p>
                                        <p className="text-[10px] text-gray-500">EGP {item.rate} × {item.qty}</p>
                                    </div>
                                    <span className="font-bold text-[#16332B]">EGP {item.amount}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
                        <span className="font-bold text-sm text-gray-800">إجمالي الفاتورة:</span>
                        <span className="font-bold text-base text-[#16332B]">EGP {selectedOrder.grand_total?.toFixed(2)}</span>
                    </div>
                </div>

                {/* فوتر المودال */}
                <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                    <button
                        onClick={handlePrint}
                        disabled={printing}
                        className="bg-[#1E4038] hover:bg-[#16332B] active:bg-[#16332B] text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-xs disabled:bg-gray-300"
                    >
                        {printing ? (
                            <>
                                <RefreshCw size={14} className="animate-spin" />
                                <span>جاري تجهيز الطباعة...</span>
                            </>
                        ) : (
                            <>
                                <Printer size={15} />
                                <span>طباعة الفاتورة</span>
                            </>
                        )}
                    </button>

                    <button
                        onClick={onClose}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
                    >
                        إغلاق
                    </button>
                </div>

            </div>
        </div>
    );
}
