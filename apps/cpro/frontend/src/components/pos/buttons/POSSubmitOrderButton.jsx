/**
 * ============================================================================
 * Component: POSSubmitOrderButton.jsx
 * ============================================================================
 * الوصف:
 * أزرار إتمام العمليات أسفل السلة (منفصلة تماماً):
 * 1. زر "تأكيد الأوردر" (Confirm Order): لحفظ الطلب في النظام فقط
 * 2. زر "طباعة الفاتورة" (Print Invoice): لطباعة الفاتورة ديناميكياً
 * ============================================================================
 */

import React from 'react';
import { RefreshCw, Printer, CheckCircle } from 'lucide-react';

export default function POSSubmitOrderButton({
    onConfirmOrder,
    onPrintInvoice,
    disabledConfirm,
    submittingOrder,
    printingInvoice,
    lastInvoice,
    hasItems
}) {
    return (
        <div className="px-6 pb-8 pt-4 space-y-3">
            <div className="flex gap-3 w-full">
                {/* 2. زر طباعة الفاتورة */}
                <button
                    type="button"
                    onClick={() => onPrintInvoice && onPrintInvoice()}
                    disabled={printingInvoice || (!lastInvoice && !hasItems)}
                    className="btn-ghost flex-1"
                >
                    {printingInvoice ? (
                        <RefreshCw className="animate-spin" size={15} />
                    ) : (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
                    )}
                    <span>طباعة</span>
                </button>

                {/* 1. زر تأكيد الأوردر */}
                <button
                    type="button"
                    onClick={onConfirmOrder}
                    disabled={disabledConfirm || submittingOrder}
                    className="btn-confirm flex-1"
                >
                    {submittingOrder ? (
                        <RefreshCw className="animate-spin" size={15} />
                    ) : (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    )}
                    <span>تأكيد الأوردر</span>
                </button>
            </div>

            {/* إشعار بآخر فاتورة مع إمكانية إعادة طباعتها */}
            {lastInvoice && (
                <div className="flex items-center justify-between text-[11px] text-gray-500 bg-[#F3EBDA] px-3 py-1.5 rounded-lg border border-[#E6DCC5]">
                    <span className="truncate">آخر فاتورة: <strong className="text-[#16332B]">#{lastInvoice.name}</strong></span>
                    <button
                        type="button"
                        onClick={() => onPrintInvoice && onPrintInvoice(lastInvoice.name)}
                        className="text-[#16332B] hover:text-[#16332B] font-bold underline mr-2 shrink-0 cursor-pointer"
                    >
                        إعادة طباعة
                    </button>
                </div>
            )}
        </div>
    );
}


