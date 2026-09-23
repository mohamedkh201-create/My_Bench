/**
 * ============================================================================
 * Component: POSAddCustomerModal.jsx
 * ============================================================================
 * الوصف:
 * نافذة منبثقة (Modal) لإضافة عميل جديد فوراً في نقطة البيع.
 * تأخذ اسم العميل ورقم الهاتف وتنشئ العميل على السيرفر مباشرة.
 * ============================================================================
 */

import React from 'react';
import { UserPlus, RefreshCw } from 'lucide-react';

export default function POSAddCustomerModal({
    newCustomerName,
    setNewCustomerName,
    newCustomerMobile,
    setNewCustomerMobile,
    handleAddCustomer,
    addingCustomer,
    setShowCustomerModal
}) {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl w-96 shadow-xl space-y-4" dir="rtl">
                <h3 className="font-bold text-gray-800 text-base border-b pb-2 flex items-center gap-2">
                    <UserPlus className="text-[#1E4038]" size={18} /> إضافة / اختيار عميل
                </h3>

                <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">اسم العميل *</label>
                    <input
                        type="text"
                        placeholder="أدخل اسم العميل..."
                        value={newCustomerName}
                        onChange={(e) => setNewCustomerName(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-[#2A5347] focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">رقم الهاتف (اختياري)</label>
                    <input
                        type="text"
                        placeholder="أدخل رقم الهاتف..."
                        value={newCustomerMobile}
                        onChange={(e) => setNewCustomerMobile(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-[#2A5347] focus:outline-none"
                    />
                </div>

                <div className="flex gap-2 pt-2">
                    <button
                        onClick={handleAddCustomer}
                        disabled={addingCustomer}
                        className="flex-1 bg-[#1E4038] hover:bg-[#16332B] disabled:bg-gray-300 text-white py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                    >
                        {addingCustomer ? (
                            <>
                                <RefreshCw className="animate-spin" size={14} />
                                <span>جاري الإضافة...</span>
                            </>
                        ) : (
                            <span>حفظ</span>
                        )}
                    </button>
                    <button
                        onClick={() => setShowCustomerModal(false)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
                    >
                        إلغاء
                    </button>
                </div>
            </div>
        </div>
    );
}
