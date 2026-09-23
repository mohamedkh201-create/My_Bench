/**
 * ============================================================================
 * Component: POSOpenShiftModal.jsx
 * ============================================================================
 * الوصف:
 * نافذة منبثقة (Modal) لفتح وردية جديدة في الكاشير.
 * تطلب من الكاشير إدخال مبلغ الرصيد النقدى الافتتاحي وتأكيد فتح الوردية.
 * ============================================================================
 */

import React from 'react';
import { Unlock, RefreshCw, CheckCircle } from 'lucide-react';

export default function POSOpenShiftModal({
    selectedProfileName,
    openingBalance,
    setOpeningBalance,
    handleOpenShift,
    openingLoading,
    setShowOpenModal
}) {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl w-96 shadow-xl space-y-4" dir="rtl">
                <h3 className="font-bold text-gray-800 text-base border-b pb-2 flex items-center gap-2">
                    <Unlock className="text-[#1E4038]" size={18} /> فتح وردية جديدة (POS Opening)
                </h3>
                <p className="text-xs text-gray-500">
                    البروفايل المحدد: <span className="font-bold text-gray-700">{selectedProfileName}</span>
                </p>
                <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">الرصيد النقدي الافتتاحي (Opening Amount)</label>
                    <input
                        type="number"
                        value={openingBalance}
                        onChange={(e) => setOpeningBalance(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-[#2A5347] focus:outline-none"
                    />
                </div>
                <div className="flex gap-2 pt-2">
                    <button
                        onClick={handleOpenShift}
                        disabled={openingLoading}
                        className="flex-1 bg-[#1E4038] hover:bg-[#16332B] text-white py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                    >
                        {openingLoading ? <RefreshCw className="animate-spin" size={14} /> : <CheckCircle size={14} />}
                        <span>تأكيد الفتح</span>
                    </button>
                    <button
                        onClick={() => setShowOpenModal(false)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
                    >
                        إلغاء
                    </button>
                </div>
            </div>
        </div>
    );
}
