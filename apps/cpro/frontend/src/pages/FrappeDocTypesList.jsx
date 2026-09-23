import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { call } from '../lib/frappe';
import { Search, Database, Layers } from 'lucide-react';

export default function FrappeDocTypesList() {
    const [doctypes, setDoctypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctypes = async () => {
            try {
                const res = await call.get('cpro.api.management.get_all_doctypes');
                setDoctypes(res.message || []);
            } catch (error) {
                console.error("Error fetching doctypes:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDoctypes();
    }, []);

    const groupedDoctypes = useMemo(() => {
        const filtered = doctypes.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()));
        return filtered.reduce((acc, curr) => {
            const mod = curr.module || 'Other';
            if (!acc[mod]) acc[mod] = [];
            acc[mod].push(curr);
            return acc;
        }, {});
    }, [doctypes, searchTerm]);

    if (loading) {
        return <div className="flex justify-center p-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1E4038]"></div></div>;
    }

    return (
        <div className="space-y-6 w-full px-4 lg:px-8 mx-auto">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#16332B] flex items-center gap-2">
                        <Database className="w-6 h-6 text-[#1E4038]" />
                        كل شاشات Frappe (مدير النظام)
                    </h1>
                    <p className="text-[#8A7F6D] text-sm mt-1">تصفح وإدارة كافة الجداول (DocTypes) المتوفرة في نظام Frappe</p>
                </div>
                <div className="relative w-full md:w-72">
                    <input 
                        type="text" 
                        placeholder="ابحث عن DocType..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#FFFDF8] border border-[#E6DCC5] rounded-xl px-4 py-2.5 pl-10 focus:ring-2 focus:ring-[#1E4038] outline-none text-sm text-[#2B2620]"
                    />
                    <Search className="w-4 h-4 text-[#8A7F6D] absolute left-3 top-3" />
                </div>
            </div>

            <div className="space-y-8">
                {Object.entries(groupedDoctypes).map(([moduleName, moduleDoctypes]) => (
                    <div key={moduleName} className="bg-[#FFFDF8] rounded-xl border border-[#E6DCC5] shadow-sm overflow-hidden">
                        <div className="bg-[#1E4038] px-5 py-3 border-b border-[#16332B] flex items-center gap-2">
                            <Layers className="w-5 h-5 text-white/80" />
                            <h2 className="text-white font-semibold">{moduleName}</h2>
                            <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full mr-auto">
                                {moduleDoctypes.length}
                            </span>
                        </div>
                        <div className="p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                            {moduleDoctypes.map(dt => (
                                <button
                                    key={dt.name}
                                    onClick={() => navigate(`/app/doctypes/${encodeURIComponent(dt.name)}`)}
                                    className="text-right p-3 rounded-lg hover:bg-[#F3EFE7] transition-colors border border-transparent hover:border-[#E6DCC5] flex items-center gap-3 group"
                                >
                                    <div className="w-8 h-8 rounded-md bg-[#E6DCC5]/30 flex items-center justify-center text-[#1E4038] group-hover:bg-[#1E4038] group-hover:text-white transition-colors">
                                        {dt.name.charAt(0)}
                                    </div>
                                    <span className="text-[#2B2620] font-medium text-sm truncate">{dt.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
                
                {Object.keys(groupedDoctypes).length === 0 && (
                    <div className="text-center py-10 text-[#8A7F6D] bg-[#FFFDF8] rounded-xl border border-[#E6DCC5]">
                        لا توجد نتائج مطابقة للبحث
                    </div>
                )}
            </div>
        </div>
    );
}
