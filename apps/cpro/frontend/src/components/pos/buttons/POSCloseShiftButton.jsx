/**
 * ============================================================================
 * Component: POSCloseShiftButton.jsx
 * ============================================================================
 * الوصف:
 * زر مستقل لإغلاق الوردية الحالية في الكاشير (POS Close Shift Button).
 * عند الضغط عليه ينفذ إجراء إغلاق الوردية المفتوحة.
 * ============================================================================
 */

import React from 'react';
import { Lock } from 'lucide-react';

export default function POSCloseShiftButton({ onClick, disabled }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="bg-red-50 hover:bg-red-100 text-red-600 px-2 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 mr-2 cursor-pointer disabled:opacity-50"
        >
            <Lock size={12} />
            <span>إغلاق الوردية</span>
        </button>
    );
}
