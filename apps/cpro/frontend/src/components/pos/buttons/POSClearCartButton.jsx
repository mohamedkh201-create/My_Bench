/**
 * ============================================================================
 * Component: POSClearCartButton.jsx
 * ============================================================================
 * الوصف:
 * زر مستقل لتفريغ ومسح عناصر السلة بالكامل (Clear Cart Button).
 * ============================================================================
 */

import React from 'react';
import { Trash2 } from 'lucide-react';

export default function POSClearCartButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="text-red-500 hover:text-red-700 text-xs flex items-center gap-1 bg-white px-2 py-1 rounded border border-red-200 cursor-pointer"
        >
            <Trash2 size={12} />
            <span>مسح الكل</span>
        </button>
    );
}
