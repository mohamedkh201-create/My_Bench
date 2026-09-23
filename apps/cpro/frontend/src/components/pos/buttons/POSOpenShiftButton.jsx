/**
 * ============================================================================
 * Component: POSOpenShiftButton.jsx
 * ============================================================================
 * الوصف:
 * زر مستقل لفتح وردية جديدة في الكاشير (POS Opening Shift Button).
 * عند الضغط عليه يقوم بإظهار نافذة إدخال الرصيد الافتتاحي وفتح الوردية.
 * ============================================================================
 */

import React from 'react';
import { Unlock } from 'lucide-react';

export default function POSOpenShiftButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="bg-[#1E4038] hover:bg-[#16332B] text-white px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 mr-2 shadow-xs cursor-pointer"
        >
            <Unlock size={12} />
            <span>فتح وردية جديدة</span>
        </button>
    );
}
