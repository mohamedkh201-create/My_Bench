/**
 * ============================================================================
 * Page: DashboardPage.jsx
 * ============================================================================
 * الوصف:
 * الصفحة الرئيسية للوحة التحكم (Dashboard).
 * تقوم بتجميع المكونات المستقلة وتجلب البيانات بشكل ديناميكي من Frappe Backend.
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import DashboardStatsGrid from '../components/dashboard/DashboardStatsGrid';
import HourlySalesChart from '../components/dashboard/HourlySalesChart';
import DashboardTopTables from '../components/dashboard/DashboardTopTables';
import { call } from '../lib/frappe';

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState('عام');
    const [period, setPeriod] = useState('يوم');
    const [loading, setLoading] = useState(true);

    const [mainStats, setMainStats] = useState([]);
    const [topProducts, setTopProducts] = useState([]);
    const [topPayments, setTopPayments] = useState([]);
    const [topBranches, setTopBranches] = useState([]);
    const [currency, setCurrency] = useState("EGP");
    
    const [userName, setUserName] = useState('');

    useEffect(() => {
        // جلب اسم المستخدم الحالي
        const fetchUser = async () => {
            try {
                const res = await call.get('cpro.api.users.get_current_user_info');
                if (res.message && res.message.name) {
                    setUserName(res.message.name.split(' ')[0]); // الاسم الأول فقط أو حسب الرغبة
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true);
            try {
                const res = await call.get('cpro.api.dashboard.get_dashboard_stats', { period, tab: activeTab });
                if (res.message) {
                    setMainStats(res.message.mainStats || []);
                    setTopProducts(res.message.topProducts || []);
                    setTopPayments(res.message.topPayments || []);
                    setTopBranches(res.message.topBranches || []);
                    setCurrency(res.message.currency || "EGP");
                }
            } catch (error) {
                console.error("خطأ في جلب بيانات لوحة التحكم:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [period, activeTab]);

    return (
        <div className="space-y-6 w-full p-4 lg:p-8">
            {/* الترويسة والترحيب */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-black text-[#16332B] tracking-tight">مرحباً، {userName || '...'}</h1>
                </div>

                {/* التبويبات الرئيسية */}
                <div className="flex items-center gap-2 bg-[#FFFDF8] border border-[#E6DCC5] p-1.5 rounded-xl text-sm font-bold text-[#8A7F6D] shadow-sm">
                    {['عام', 'الفروع', 'المخزون', 'مركز الاتصال'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-5 py-2 rounded-lg transition-all ${
                                activeTab === tab
                                    ? 'bg-[#1E4038] text-[#FAF5EA] shadow-md'
                                    : 'hover:text-[#16332B] hover:bg-[#F3EBDA]'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* الفلتر الزمني */}
            <div className="flex items-center gap-3">
                <div className="flex bg-[#FFFDF8] border border-[#E6DCC5] rounded-lg p-1 text-sm font-bold text-[#8A7F6D] shadow-sm">
                    {['يوم', 'الأسبوع', 'الشهر'].map((p) => (
                        <button
                            key={p}
                            onClick={() => setPeriod(p)}
                            className={`px-4 py-1.5 rounded-md transition-all ${
                                period === p ? 'bg-[#F3EBDA] text-[#8C6A2C]' : 'hover:bg-[#F3EBDA]/50'
                            }`}
                        >
                            {p}
                        </button>
                    ))}
                </div>
                <input
                    type="date"
                    className="bg-[#FFFDF8] border border-[#E6DCC5] shadow-sm rounded-lg text-sm font-bold px-4 py-2 text-[#2B2620] focus:outline-none focus:border-[#B4863B] transition-colors"
                />
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#B4863B]"></div>
                </div>
            ) : (
                <>
                    {/* شبكة كروت المؤشرات */}
                    <DashboardStatsGrid stats={mainStats} />

                    {/* رسم بياني: المبيعات لكل ساعة */}
                    <div className="bg-[#FFFDF8] p-6 rounded-2xl border border-[#E6DCC5] shadow-sm">
                        <h3 className="text-lg font-black text-[#8C6A2C] mb-4">المبيعات لكل ساعة</h3>
                        <HourlySalesChart />
                    </div>

                    {/* الجداول السفليّة للتصنيفات */}
                    <DashboardTopTables
                        topProducts={topProducts}
                        topPayments={topPayments}
                        topBranches={topBranches}
                        currency={currency}
                    />
                </>
            )}
        </div>
    );
}