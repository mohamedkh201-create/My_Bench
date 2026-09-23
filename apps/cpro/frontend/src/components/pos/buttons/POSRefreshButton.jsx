/**
 * ============================================================================
 * Component: POSRefreshButton.jsx
 * ============================================================================
 * الوصف:
 * زر تحديث الأصناف والمنتجات المعروضة في شبكة المنتجات (Refresh Products Button).
 * ============================================================================
 */

import React from 'react';
import { RefreshCw } from 'lucide-react';

export default function POSRefreshButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-600 transition flex items-center gap-1 text-sm font-medium cursor-pointer"
            title="تحديث المنتجات"
        >
            <RefreshCw size={18} />
        </button>
    );
}
