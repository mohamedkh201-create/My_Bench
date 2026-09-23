/**
 * ============================================================================
 * Component: OrdersFilterBar.jsx
 * ============================================================================
 * الوصف:
 * شريط تصفية وحقول بحث قائمة الطلبات والفواتير.
 * ============================================================================
 */

import React from 'react';
import { Search } from 'lucide-react';

export default function OrdersFilterBar({ searchQuery, setSearchQuery, statusFilter, setStatusFilter }) {
    return (
        <div className="p-6 bg-transparent flex justify-between items-center gap-4 shrink-0">
            <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-3.5 text-[#8A7F6D]" size={20} />
                <input
                    type="text"
                    placeholder="البحث برقم الفاتورة أو اسم العميل..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#FFFDF8] border border-[#E6DCC5] rounded-xl pl-12 pr-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#8C6A2C] text-[#2B2620] shadow-sm transition-shadow"
                />
            </div>

            <div className="flex gap-2 bg-[#FFFDF8] p-1.5 border border-[#E6DCC5] rounded-xl shadow-sm">
                {['All', 'Paid', 'Draft', 'Cancelled'].map((st) => (
                    <button
                        key={st}
                        onClick={() => setStatusFilter(st)}
                        className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                            statusFilter === st
                                ? 'bg-[#1E4038] text-[#FAF5EA] shadow-md'
                                : 'bg-transparent text-[#8A7F6D] hover:bg-[#F3EBDA] hover:text-[#16332B]'
                        }`}
                    >
                        {st === 'All' ? 'الكل' : st === 'Paid' ? 'المدفوعة' : st === 'Draft' ? 'المسودات' : 'الملغاة'}
                    </button>
                ))}
            </div>
        </div>
    );
}
