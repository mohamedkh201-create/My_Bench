import React, { useState, useEffect } from 'react';
import { Search, PackageOpen, Loader2, RefreshCw } from 'lucide-react';
import { fetchInventory } from '../lib/api';

export default function InventoryPage() {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadInventory();
    }, []);

    const loadInventory = async () => {
        setLoading(true);
        try {
            const data = await fetchInventory();
            setInventory(data);
        } catch (error) {
            console.error("Error fetching inventory:", error);
        }
        setLoading(false);
    };

    const filteredInventory = inventory.filter(p => 
        (p.item_name && p.item_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (p.name && p.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (p.item_group && p.item_group.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="flex flex-col h-full w-full bg-[#FAF5EA] text-[#16332B]" dir="rtl">
            <div className="bg-[#FFFDF8] border-b border-[#E6DCC5] px-6 py-4 flex flex-wrap items-center justify-between gap-4 shadow-sm rounded-t-xl">
                <h1 className="text-xl font-bold text-[#16332B] flex items-center gap-2">
                    <PackageOpen className="text-[#B4863B]" />
                    المخزون المتوفر
                </h1>
                
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-80">
                        <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8A7F6D]" size={18} />
                        <input
                            type="text"
                            placeholder="بحث بالصنف أو المجموعة..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-4 pr-10 py-2 bg-[#FAF5EA] border border-[#E6DCC5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#B4863B] transition-all"
                        />
                    </div>
                    
                    <button 
                        onClick={loadInventory}
                        disabled={loading}
                        className="bg-[#E6DCC5] hover:bg-[#D5CBB5] text-[#16332B] p-2 rounded-xl flex items-center justify-center transition-colors shrink-0 disabled:opacity-50"
                        title="تحديث"
                    >
                        <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
                {loading ? (
                    <div className="flex items-center justify-center h-full">
                        <Loader2 className="animate-spin text-[#B4863B]" size={32} />
                    </div>
                ) : filteredInventory.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-[#8A7F6D]">
                        <PackageOpen size={48} className="mb-4 opacity-50" />
                        <p className="text-lg font-semibold">لا يوجد عناصر مخزنية متاحة</p>
                    </div>
                ) : (
                    <div className="bg-[#FFFDF8] rounded-xl border border-[#E6DCC5] shadow-sm overflow-hidden">
                        <table className="w-full text-right text-sm">
                            <thead className="bg-[#F3EBDA] text-[#16332B]">
                                <tr>
                                    <th className="px-6 py-3 font-bold">كود الصنف</th>
                                    <th className="px-6 py-3 font-bold">اسم الصنف</th>
                                    <th className="px-6 py-3 font-bold">المجموعة</th>
                                    <th className="px-6 py-3 font-bold">الرصيد الفعلي</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#E6DCC5]">
                                {filteredInventory.map((item, i) => {
                                    const qty = item.actual_qty || 0;
                                    const isOutOfStock = qty <= 0;
                                    const isLowStock = qty > 0 && qty < 10;
                                    
                                    let badgeClass = "bg-[#E6DCC5] text-[#16332B]";
                                    if (isOutOfStock) badgeClass = "bg-red-100 text-red-700 border border-red-200";
                                    else if (isLowStock) badgeClass = "bg-amber-100 text-amber-700 border border-amber-200";

                                    return (
                                        <tr key={item.name || i} className="hover:bg-[#FAF5EA] transition-colors">
                                            <td className="px-6 py-3 font-mono text-[#8A7F6D] font-bold text-xs">{item.name}</td>
                                            <td className="px-6 py-3 font-semibold text-[#16332B]">{item.item_name}</td>
                                            <td className="px-6 py-3 font-mono text-[#8A7F6D]">{item.item_group || '-'}</td>
                                            <td className="px-6 py-3">
                                                <span className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded font-mono font-bold text-xs min-w-[60px] ${badgeClass}`}>
                                                    {qty} {item.stock_uom}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
