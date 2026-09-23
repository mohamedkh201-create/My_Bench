import React, { useState, useEffect } from 'react';
import { Search, FileText, Loader2, RefreshCw, Calendar, ArrowRight } from 'lucide-react';
import { fetchSalesReports } from '../lib/api';

export default function ReportsPage() {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    
    // Default date range: today
    const todayStr = new Date().toISOString().split('T')[0];
    const [startDate, setStartDate] = useState(todayStr);
    const [endDate, setEndDate] = useState(todayStr);

    useEffect(() => {
        loadReports();
    }, [startDate, endDate]);

    const loadReports = async () => {
        setLoading(true);
        try {
            const data = await fetchSalesReports(startDate, endDate);
            setInvoices(data);
        } catch (error) {
            console.error("Error fetching reports:", error);
        }
        setLoading(false);
    };

    const filteredInvoices = invoices.filter(inv => 
        (inv.name && inv.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (inv.customer_name && inv.customer_name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const totalSales = filteredInvoices.reduce((acc, inv) => acc + (inv.grand_total || 0), 0);

    return (
        <div className="flex flex-col h-full w-full bg-[#FAF5EA] text-[#16332B]" dir="rtl">
            <div className="bg-[#FFFDF8] border-b border-[#E6DCC5] px-6 py-4 flex flex-wrap items-center justify-between gap-4 shadow-sm rounded-t-xl">
                <h1 className="text-xl font-bold text-[#16332B] flex items-center gap-2">
                    <FileText className="text-[#B4863B]" />
                    سجل المبيعات والتقارير
                </h1>
                
                <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                    {/* Date Filters */}
                    <div className="flex items-center gap-2 bg-[#FAF5EA] border border-[#E6DCC5] rounded-xl px-3 py-1.5">
                        <Calendar size={16} className="text-[#B4863B]" />
                        <input 
                            type="date" 
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="bg-transparent text-sm focus:outline-none font-mono text-[#16332B]"
                        />
                        <ArrowRight size={14} className="text-[#8A7F6D]" />
                        <input 
                            type="date" 
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="bg-transparent text-sm focus:outline-none font-mono text-[#16332B]"
                        />
                    </div>

                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8A7F6D]" size={18} />
                        <input
                            type="text"
                            placeholder="بحث بالفاتورة أو العميل..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-4 pr-10 py-2 bg-[#FAF5EA] border border-[#E6DCC5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#B4863B] transition-all"
                        />
                    </div>
                    
                    <button 
                        onClick={loadReports}
                        disabled={loading}
                        className="bg-[#E6DCC5] hover:bg-[#D5CBB5] text-[#16332B] p-2 rounded-xl flex items-center justify-center transition-colors shrink-0 disabled:opacity-50"
                        title="تحديث"
                    >
                        <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* الإحصائيات العلوية */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[#FFFDF8] border border-[#E6DCC5] rounded-xl p-4 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-[#8A7F6D] text-sm font-semibold mb-1">إجمالي المبيعات (ضمن الفلتر)</p>
                            <p className="text-2xl font-bold text-[#16332B]">EGP {totalSales.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-[#F3EBDA] flex items-center justify-center">
                            <FileText size={24} className="text-[#B4863B]" />
                        </div>
                    </div>
                    <div className="bg-[#FFFDF8] border border-[#E6DCC5] rounded-xl p-4 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-[#8A7F6D] text-sm font-semibold mb-1">عدد الفواتير</p>
                            <p className="text-2xl font-bold text-[#16332B]">{filteredInvoices.length}</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-[#F3EBDA] flex items-center justify-center">
                            <FileText size={24} className="text-[#B4863B]" />
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center h-48">
                        <Loader2 className="animate-spin text-[#B4863B]" size={32} />
                    </div>
                ) : filteredInvoices.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-48 text-[#8A7F6D] bg-[#FFFDF8] border border-[#E6DCC5] rounded-xl">
                        <FileText size={48} className="mb-4 opacity-50" />
                        <p className="text-lg font-semibold">لا يوجد تقارير مبيعات لهذه الفترة</p>
                    </div>
                ) : (
                    <div className="bg-[#FFFDF8] rounded-xl border border-[#E6DCC5] shadow-sm overflow-hidden">
                        <table className="w-full text-right text-sm">
                            <thead className="bg-[#F3EBDA] text-[#16332B]">
                                <tr>
                                    <th className="px-6 py-3 font-bold">رقم الفاتورة</th>
                                    <th className="px-6 py-3 font-bold">التاريخ والوقت</th>
                                    <th className="px-6 py-3 font-bold">العميل</th>
                                    <th className="px-6 py-3 font-bold">الفرع</th>
                                    <th className="px-6 py-3 font-bold">الإجمالي</th>
                                    <th className="px-6 py-3 font-bold">الحالة</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#E6DCC5]">
                                {filteredInvoices.map((inv, i) => (
                                    <tr key={inv.name || i} className="hover:bg-[#FAF5EA] transition-colors">
                                        <td className="px-6 py-3 font-mono text-[#8A7F6D] font-bold text-xs">{inv.name}</td>
                                        <td className="px-6 py-3 font-mono text-[#8A7F6D] text-xs">
                                            {inv.posting_date} <br/> <span className="text-[#B4863B]">{inv.posting_time}</span>
                                        </td>
                                        <td className="px-6 py-3 font-semibold text-[#16332B]">{inv.customer_name || 'عميل عام'}</td>
                                        <td className="px-6 py-3 font-semibold text-[#16332B]">{inv.company}</td>
                                        <td className="px-6 py-3 font-mono font-bold text-[#16332B]">EGP {(inv.grand_total || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                                        <td className="px-6 py-3">
                                            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded font-bold text-[10px] bg-[#16332B] text-white">
                                                {inv.status || 'مدفوع'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
