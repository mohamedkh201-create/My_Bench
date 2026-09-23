/**
 * ============================================================================
 * Component: OrderStatusBadge.jsx
 * ============================================================================
 * الوصف:
 * شارة مستقلة تعبر عن حالة الفاتورة أو الطلب (مدفوع / مسودة / ملغي).
 * ============================================================================
 */

import React from 'react';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

export default function OrderStatusBadge({ status, docstatus }) {
    if (docstatus === 1 || status === 'Paid') {
        return (
            <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-max">
                <CheckCircle size={12} /> مدفوع / مؤكد
            </span>
        );
    } else if (docstatus === 2 || status === 'Cancelled') {
        return (
            <span className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-max">
                <XCircle size={12} /> ملغي
            </span>
        );
    } else {
        return (
            <span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-max">
                <Clock size={12} /> مسودة
            </span>
        );
    }
}
