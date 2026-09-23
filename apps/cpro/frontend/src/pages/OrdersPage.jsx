/**
 * ============================================================================
 * Page: OrdersPage.jsx
 * ============================================================================
 * الوصف:
 * صفحة إدارة ومتابعة الطلبات والفواتير.
 * تجمع بين مكونات المساعدين (OrdersFilterBar, OrdersTable, OrderDetailModal).
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import { ShoppingBag, RefreshCw } from 'lucide-react';
import OrdersFilterBar from '../components/orders/OrdersFilterBar';
import OrdersTable from '../components/orders/OrdersTable';
import OrderDetailModal from '../components/orders/OrderDetailModal';

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    // جلب الفواتير الحقيقية من DocType: POS Invoice في فرابي
    const fetchOrders = async () => {
        try {
            setLoading(true);
            const fields = JSON.stringify([
                "name", "customer", "customer_name", "posting_date",
                "posting_time", "grand_total", "status", "docstatus", "pos_profile"
            ]);

            const res = await fetch(`/api/resource/POS Invoice?fields=${encodeURIComponent(fields)}&order_by=creation desc&limit_page_length=100`);

            if (res.ok) {
                const data = await res.json();
                if (data && data.data) {
                    setOrders(data.data);
                    setFilteredOrders(data.data);
                }
            } else {
                console.error('فشل جلب الطلبات من فرابي');
            }
        } catch (error) {
            console.error('حدث خطأ أثناء الاتصال بالخادم:', error);
        } finally {
            setLoading(false);
        }
    };

    // جلب تفاصيل فاتورة محددة
    const fetchOrderDetails = async (orderName) => {
        try {
            const res = await fetch(`/api/resource/POS Invoice/${encodeURIComponent(orderName)}`);
            if (res.ok) {
                const data = await res.json();
                setSelectedOrder(data.data);
            }
        } catch (e) {
            console.error('خطأ في جلب تفاصيل الطلب:', e);
        }
    };

    // تصفية الطلبات
    useEffect(() => {
        let result = orders;

        if (statusFilter !== 'All') {
            result = result.filter(o => o.status === statusFilter || (statusFilter === 'Paid' && o.docstatus === 1));
        }

        if (searchQuery.trim() !== '') {
            const q = searchQuery.toLowerCase();
            result = result.filter(o =>
                (o.name && o.name.toLowerCase().includes(q)) ||
                (o.customer_name && o.customer_name.toLowerCase().includes(q)) ||
                (o.customer && o.customer.toLowerCase().includes(q))
            );
        }

        setFilteredOrders(result);
    }, [searchQuery, statusFilter, orders]);

    return (
        <div className="flex flex-col flex-1 h-full w-full text-right overflow-hidden">
            {/* هيدر الصفحة */}
            <div className="bg-[#FFFDF8] border-b border-[#E6DCC5] px-6 py-6 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#1E4038] text-[#FAF5EA] rounded-xl shadow-md">
                        <ShoppingBag size={24} />
                    </div>
                    <div>
                        <h1 className="font-black text-2xl text-[#16332B]">قائمة الطلبات والفواتير</h1>
                        <p className="text-sm font-bold text-[#8A7F6D] mt-1">متابعة الفواتير والطلبات المباشرة من نقاط البيع (Frappe POS Invoices)</p>
                    </div>
                </div>

                <button
                    onClick={fetchOrders}
                    className="px-5 py-2.5 bg-[#FAF5EA] border border-[#E6DCC5] hover:bg-[#F3EBDA] rounded-xl text-[#8C6A2C] transition-colors flex items-center gap-2 text-sm font-bold cursor-pointer shadow-sm"
                >
                    <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                    <span>تحديث الطلبات</span>
                </button>
            </div>

            {/* أدوات البحث والتصفية */}
            <OrdersFilterBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
            />

            {/* جدول الفواتير */}
            <div className="flex-1 px-6 pb-6 overflow-y-auto">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
                    <OrdersTable
                        loading={loading}
                        filteredOrders={filteredOrders}
                        fetchOrderDetails={fetchOrderDetails}
                    />
                </div>
            </div>

            {/* تفاصيل الفاتورة عند المعاينة */}
            <OrderDetailModal
                selectedOrder={selectedOrder}
                onClose={() => setSelectedOrder(null)}
            />
        </div>
    );
}