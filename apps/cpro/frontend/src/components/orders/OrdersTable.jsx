/**
 * ============================================================================
 * Component: OrdersTable.jsx
 * ============================================================================
 * الوصف:
 * جدول عرض قائمة الفواتير والطلبات المسجلة في النظام.
 * ============================================================================
 */

import React from 'react';
import { User, Calendar, Eye, RefreshCw, FileText } from 'lucide-react';
import OrderStatusBadge from './OrderStatusBadge';

export default function OrdersTable({ loading, filteredOrders = [], fetchOrderDetails }) {
    if (loading) {
        return (
            <div className="flex justify-center items-center py-24 text-gray-400 gap-2">
                <RefreshCw className="animate-spin text-[#1E4038]" size={24} />
                <span className="text-sm font-semibold">جاري تحميل الفواتير من فرابي...</span>
            </div>
        );
    }

    if (filteredOrders.length === 0) {
        return (
            <div className="text-center text-gray-400 py-20">
                <FileText className="mx-auto mb-2 opacity-30" size={48} />
                <p className="text-sm font-semibold">لا توجد طلبات مطابقة للبحث</p>
            </div>
        );
    }

    return (
        <table className="w-full text-right text-sm">
            <thead className="bg-[#FFFDF8] border-b border-[#E6DCC5] text-[#8A7F6D] font-bold">
                <tr>
                    <th className="p-5">رقم الفاتورة (DocType)</th>
                    <th className="p-5">العميل</th>
                    <th className="p-5">تاريخ ووقت الطلب</th>
                    <th className="p-5">نقطة البيع (POS)</th>
                    <th className="p-5">المبلغ الكلي</th>
                    <th className="p-5">الحالة</th>
                    <th className="p-5 text-center">التفاصيل</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-[#E6DCC5] text-[#2B2620] bg-white">
                {filteredOrders.map((ord) => (
                    <tr key={ord.name} className="hover:bg-[#F3EBDA] transition-colors">
                        <td className="p-5 font-black text-[#1E4038]">{ord.name}</td>
                        <td className="p-5">
                            <div className="flex items-center gap-2 font-bold text-[#16332B]">
                                <User size={16} className="text-[#8C6A2C]" />
                                <span>{ord.customer_name || ord.customer}</span>
                            </div>
                        </td>
                        <td className="p-5 font-bold text-[#8A7F6D]">
                            <div className="flex items-center gap-2">
                                <Calendar size={16} className="text-[#8A7F6D]" />
                                <span>{ord.posting_date} {ord.posting_time ? `| ${ord.posting_time.slice(0, 5)}` : ''}</span>
                            </div>
                        </td>
                        <td className="p-5 font-bold text-[#2B2620]">{ord.pos_profile || 'Standard'}</td>
                        <td className="p-5 font-black text-[#8C6A2C]">EGP {ord.grand_total?.toFixed(2)}</td>
                        <td className="p-5">
                            <OrderStatusBadge status={ord.status} docstatus={ord.docstatus} />
                        </td>
                        <td className="p-5 text-center">
                            <button
                                onClick={() => fetchOrderDetails(ord.name)}
                                className="p-2.5 bg-[#FAF5EA] hover:bg-[#F3EBDA] text-[#8C6A2C] rounded-lg transition-colors cursor-pointer border border-[#E6DCC5]"
                                title="عرض التفاصيل"
                            >
                                <Eye size={18} />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
