/**
 * ============================================================================
 * Component: DashboardStatsGrid.jsx
 * ============================================================================
 * الوصف:
 * شبكة كروت المؤشرات والاحصائيات السريعة الرئيسية في لوحة التحكم.
 * ============================================================================
 */

import React from 'react';
import MiniAreaChart from './MiniAreaChart';

export default function DashboardStatsGrid({ stats = [] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
                <div key={idx} className="bg-[#FFFDF8] p-5 rounded-2xl border border-[#E6DCC5] shadow-sm flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <span className="text-sm font-bold text-[#8A7F6D]">{stat.title}</span>
                    </div>
                    <div className="text-2xl font-black text-[#16332B] mt-3">{stat.value}</div>
                    <MiniAreaChart />
                </div>
            ))}
        </div>
    );
}
