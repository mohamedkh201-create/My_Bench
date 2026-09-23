import React, { useState, useEffect } from 'react';
import { Search, Package, Loader2, Utensils } from 'lucide-react';
import { getMenu } from '../lib/api';

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        setLoading(true);
        try {
            // we use getMenu to fetch pos items, passing no arguments to get the default Standard Selling
            const data = await getMenu();
            setProducts(data?.items || []);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
        setLoading(false);
    };

    const filteredProducts = products.filter(p => 
        (p.item_name && p.item_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (p.item_code && p.item_code.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="flex flex-col h-full w-full bg-[#FAF5EA] text-[#16332B]" dir="rtl">
            <div className="bg-[#FFFDF8] border-b border-[#E6DCC5] px-6 py-4 flex flex-wrap items-center justify-between gap-4 shadow-sm rounded-t-xl">
                <h1 className="text-xl font-bold text-[#16332B] flex items-center gap-2">
                    <Utensils className="text-[#B4863B]" />
                    قائمة المنتجات (Menu)
                </h1>
                
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-80">
                        <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8A7F6D]" size={18} />
                        <input
                            type="text"
                            placeholder="بحث باسم المنتج أو الكود..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-4 pr-10 py-2 bg-[#FAF5EA] border border-[#E6DCC5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#B4863B] transition-all"
                        />
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
                {loading ? (
                    <div className="flex items-center justify-center h-full">
                        <Loader2 className="animate-spin text-[#B4863B]" size={32} />
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-[#8A7F6D]">
                        <Package size={48} className="mb-4 opacity-50" />
                        <p className="text-lg font-semibold">لا يوجد منتجات متاحة</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {filteredProducts.map((p, i) => (
                            <div key={p.name || i} className="bg-[#FFFDF8] rounded-xl border border-[#E6DCC5] shadow-sm overflow-hidden flex flex-col hover:border-[#B4863B] transition-colors">
                                <div className="h-32 bg-[#F3EBDA] flex items-center justify-center overflow-hidden">
                                    {p.image ? (
                                        <img src={p.image} alt={p.item_name} className="w-full h-full object-cover" />
                                    ) : (
                                        <Utensils className="text-[#E6DCC5]" size={40} />
                                    )}
                                </div>
                                <div className="p-3 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-[#16332B] leading-tight text-sm flex-1">{p.item_name}</h3>
                                    </div>
                                    <div className="mt-auto pt-2 flex items-center justify-between border-t border-[#E6DCC5]">
                                        <span className="text-xs bg-[#F3EBDA] text-[#8A7F6D] px-2 py-0.5 rounded font-mono">
                                            {p.item_group || 'عام'}
                                        </span>
                                        <span className="font-mono font-bold text-[#B4863B]">
                                            EGP {(p.rate || p.standard_rate || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
