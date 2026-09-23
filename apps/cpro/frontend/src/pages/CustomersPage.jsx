import React, { useState, useEffect } from 'react';
import { Search, Plus, User, Phone, Mail, Loader2 } from 'lucide-react';
import { fetchCustomers, addCustomer } from '../lib/api';

export default function CustomersPage() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newCustomer, setNewCustomer] = useState({ name: '', phone: '', email: '' });
    const [adding, setAdding] = useState(false);

    useEffect(() => {
        loadCustomers();
    }, [searchTerm]);

    const loadCustomers = async () => {
        setLoading(true);
        try {
            const data = await fetchCustomers(searchTerm);
            setCustomers(data);
        } catch (error) {
            console.error("Error fetching customers:", error);
        }
        setLoading(false);
    };

    const handleAddCustomer = async (e) => {
        e.preventDefault();
        setAdding(true);
        try {
            await addCustomer(newCustomer.name, newCustomer.phone, newCustomer.email);
            setNewCustomer({ name: '', phone: '', email: '' });
            setIsAddModalOpen(false);
            loadCustomers();
        } catch (error) {
            console.error("Error adding customer:", error);
            alert("حدث خطأ أثناء إضافة العميل");
        }
        setAdding(false);
    };

    return (
        <div className="flex flex-col h-full w-full bg-[#FAF5EA] text-[#16332B]" dir="rtl">
            <div className="bg-[#FFFDF8] border-b border-[#E6DCC5] px-6 py-4 flex flex-wrap items-center justify-between gap-4 shadow-sm rounded-t-xl">
                <h1 className="text-xl font-bold text-[#16332B] flex items-center gap-2">
                    <User className="text-[#B4863B]" />
                    سجل العملاء
                </h1>
                
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-80">
                        <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8A7F6D]" size={18} />
                        <input
                            type="text"
                            placeholder="بحث برقم الهاتف أو الاسم..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-4 pr-10 py-2 bg-[#FAF5EA] border border-[#E6DCC5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#B4863B] transition-all"
                        />
                    </div>
                    
                    <button 
                        onClick={() => setIsAddModalOpen(true)}
                        className="bg-[#16332B] hover:bg-[#1E4038] text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-semibold transition-colors shrink-0"
                    >
                        <Plus size={18} />
                        إضافة عميل
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
                {loading ? (
                    <div className="flex items-center justify-center h-full">
                        <Loader2 className="animate-spin text-[#B4863B]" size={32} />
                    </div>
                ) : customers.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-[#8A7F6D]">
                        <User size={48} className="mb-4 opacity-50" />
                        <p className="text-lg font-semibold">لا يوجد عملاء مطابقين للبحث</p>
                    </div>
                ) : (
                    <div className="bg-[#FFFDF8] rounded-xl border border-[#E6DCC5] shadow-sm overflow-hidden">
                        <table className="w-full text-right text-sm">
                            <thead className="bg-[#F3EBDA] text-[#16332B]">
                                <tr>
                                    <th className="px-6 py-3 font-bold">اسم العميل</th>
                                    <th className="px-6 py-3 font-bold">رقم الهاتف</th>
                                    <th className="px-6 py-3 font-bold">البريد الإلكتروني</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#E6DCC5]">
                                {customers.map((c, i) => (
                                    <tr key={c.name || i} className="hover:bg-[#FAF5EA] transition-colors">
                                        <td className="px-6 py-3 font-semibold text-[#16332B]">{c.customer_name}</td>
                                        <td className="px-6 py-3 font-mono text-[#8A7F6D]">{c.mobile_no || '-'}</td>
                                        <td className="px-6 py-3 font-mono text-[#8A7F6D]">{c.email_id || '-'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal إضافة عميل */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-[#16332B]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-[#FFFDF8] rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-[#E6DCC5]">
                        <div className="bg-[#16332B] text-white p-4 font-bold flex items-center justify-between">
                            <span>إضافة عميل جديد</span>
                            <button onClick={() => setIsAddModalOpen(false)} className="text-white hover:text-red-400">&times;</button>
                        </div>
                        <form onSubmit={handleAddCustomer} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-[#16332B] mb-1">اسم العميل *</label>
                                <input
                                    type="text"
                                    required
                                    value={newCustomer.name}
                                    onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                                    className="w-full px-3 py-2 border border-[#E6DCC5] rounded-lg bg-[#FAF5EA] focus:outline-none focus:border-[#B4863B]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-[#16332B] mb-1">رقم الهاتف</label>
                                <input
                                    type="tel"
                                    value={newCustomer.phone}
                                    onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                                    className="w-full px-3 py-2 border border-[#E6DCC5] rounded-lg bg-[#FAF5EA] focus:outline-none focus:border-[#B4863B] font-mono text-left"
                                    dir="ltr"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-[#16332B] mb-1">البريد الإلكتروني</label>
                                <input
                                    type="email"
                                    value={newCustomer.email}
                                    onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                                    className="w-full px-3 py-2 border border-[#E6DCC5] rounded-lg bg-[#FAF5EA] focus:outline-none focus:border-[#B4863B] font-mono text-left"
                                    dir="ltr"
                                />
                            </div>
                            <div className="pt-2 flex gap-3">
                                <button type="submit" disabled={adding} className="flex-1 bg-[#B4863B] hover:bg-[#8C6A2C] text-white py-2 rounded-lg font-bold">
                                    {adding ? <Loader2 className="animate-spin mx-auto" /> : "حفظ"}
                                </button>
                                <button type="button" onClick={() => setIsAddModalOpen(false)} className="flex-1 bg-[#E6DCC5] hover:bg-[#D5CBB5] text-[#16332B] py-2 rounded-lg font-bold">
                                    إلغاء
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
