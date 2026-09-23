/**
 * ============================================================================
 * Page: ReasonsPage.jsx
 * ============================================================================
 * الوصف:
 * صفحة أسباب الإلغاء والإرجاع وتعديل الكميات وعمليات الصندوق في قسم الإدارة.
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { call } from '../lib/frappe';

export default function ReasonsPage() {
    const navigate = useNavigate();

    const [voidReasons, setVoidReasons] = useState([]);
    const [qtyReasons, setQtyReasons] = useState([]);
    const [tillReasons, setTillReasons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReasons = async () => {
            setLoading(true);
            try {
                const res = await call.get('cpro.api.management.get_reasons');
                if (res.message) {
                    setVoidReasons(res.message.voidReasons || []);
                    setQtyReasons(res.message.qtyReasons || []);
                    setTillReasons(res.message.tillReasons || []);
                }
            } catch (error) {
                console.error("خطأ في جلب الأسباب:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReasons();
    }, []);

    return (
        <div className="w-full px-4 lg:px-8 mx-auto relative space-y-6">
            <div
                className="flex items-center gap-2 text-[#8A7F6D] hover:text-[#16332B] cursor-pointer text-sm"
                onClick={() => navigate('/management')}
            >
                <ChevronRight className="w-4 h-4" />
                <span>رجوع</span>
            </div>

            <h2 className="text-2xl font-bold text-[#16332B]">الأسباب</h2>

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1E4038]"></div>
                </div>
            ) : (
                <>
                    {/* أسباب الإلغاء والإرجاع */}
                    <div className="bg-[#FFFDF8] rounded-lg shadow-sm border border-[#E6DCC5] p-6 space-y-4">
                        <div className="flex justify-between items-center border-b border-[#E6DCC5] pb-3">
                            <h3 className="font-bold text-[#2B2620]">أسباب الإلغاء والإرجاع</h3>
                            <button className="px-3 py-1.5 bg-[#F3EBDA] hover:bg-[#E6DCC5] text-[#2B2620] rounded-md text-xs font-semibold">
                                إنشاء سبب
                            </button>
                        </div>
                        <div className="divide-y divide-[#E6DCC5]">
                            {voidReasons.map((reason, idx) => (
                                <div key={idx} className="py-3 text-left text-sm font-medium text-[#2B2620]">
                                    {reason}
                                </div>
                            ))}
                            {voidReasons.length === 0 && <div className="py-3 text-[#8A7F6D] text-sm">لا توجد أسباب مضافة</div>}
                        </div>
                    </div>

                    {/* أسباب تعديل الكمية */}
                    <div className="bg-[#FFFDF8] rounded-lg shadow-sm border border-[#E6DCC5] p-6 space-y-4">
                        <div className="flex justify-between items-center border-b border-[#E6DCC5] pb-3">
                            <h3 className="font-bold text-[#2B2620]">أسباب تعديل الكمية</h3>
                            <button className="px-3 py-1.5 bg-[#F3EBDA] hover:bg-[#E6DCC5] text-[#2B2620] rounded-md text-xs font-semibold">
                                إنشاء سبب
                            </button>
                        </div>
                        <div className="divide-y divide-[#E6DCC5]">
                            {qtyReasons.map((reason, idx) => (
                                <div key={idx} className="py-3 text-left text-sm font-medium text-[#2B2620]">
                                    {reason}
                                </div>
                            ))}
                            {qtyReasons.length === 0 && <div className="py-3 text-[#8A7F6D] text-sm">لا توجد أسباب مضافة</div>}
                        </div>
                    </div>

                    {/* أسباب عمليات الصندوق */}
                    <div className="bg-[#FFFDF8] rounded-lg shadow-sm border border-[#E6DCC5] p-6 space-y-4">
                        <div className="flex justify-between items-center border-b border-[#E6DCC5] pb-3">
                            <h3 className="font-bold text-[#2B2620]">أسباب عمليات الصندوق</h3>
                            <button className="px-3 py-1.5 bg-[#F3EBDA] hover:bg-[#E6DCC5] text-[#2B2620] rounded-md text-xs font-semibold">
                                إنشاء سبب
                            </button>
                        </div>
                        <div className="divide-y divide-[#E6DCC5]">
                            {tillReasons.map((reason, idx) => (
                                <div key={idx} className="py-3 text-left text-sm font-medium text-[#2B2620]">
                                    {reason}
                                </div>
                            ))}
                            {tillReasons.length === 0 && <div className="py-3 text-[#8A7F6D] text-sm">لا توجد أسباب مضافة</div>}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}