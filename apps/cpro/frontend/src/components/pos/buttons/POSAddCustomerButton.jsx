/**
 * ============================================================================
 * Component: POSAddCustomerButton.jsx
 * ============================================================================
 * الوصف:
 * زر مستقل لفتح مودال إضافة عميل جديد في السلة (Add Customer Button).
 * ============================================================================
 */

import React from 'react';
import { UserPlus } from 'lucide-react';

export default function POSAddCustomerButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="text-[#1E4038] hover:text-[#16332B] text-xs flex items-center gap-1 bg-white px-2 py-1 rounded border border-[#E6DCC5] font-semibold cursor-pointer"
        >
            <UserPlus size={12} />
            <span>إضافة عميل</span>
        </button>
    );
}
