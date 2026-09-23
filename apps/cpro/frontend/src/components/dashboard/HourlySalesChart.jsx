/**
 * ============================================================================
 * Component: HourlySalesChart.jsx
 * ============================================================================
 * الوصف:
 * مكون الرسم البياني الرئيسي لمبيعات الساعات في لوحة التحكم (Dashboard).
 * ============================================================================
 */

import React from 'react';

export default function HourlySalesChart() {
    return (
        <div className="h-48 w-full mt-4">
            <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="mainGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#B4863B" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#B4863B" stopOpacity="0.02" />
                    </linearGradient>
                </defs>
                <path
                    d="M 0 130 L 50 125 L 100 128 L 150 120 L 200 122 L 250 125 L 300 20 L 350 100 L 400 60 L 450 110 L 500 80 L 500 150 L 0 150 Z"
                    fill="url(#mainGrad)"
                />
                <path
                    d="M 0 130 L 50 125 L 100 128 L 150 120 L 200 122 L 250 125 L 300 20 L 350 100 L 400 60 L 450 110 L 500 80"
                    fill="none"
                    stroke="#B4863B"
                    strokeWidth="2.5"
                />
            </svg>
            <div className="flex justify-between text-[10px] text-gray-400 mt-1 px-1">
                <span>PM 04</span>
                <span>PM 06</span>
                <span>PM 08</span>
                <span>PM 10</span>
                <span>AM 12</span>
                <span>AM 02</span>
                <span>AM 04</span>
                <span>AM 06</span>
                <span>AM 08</span>
                <span>AM 10</span>
                <span>PM 12</span>
                <span>PM 02</span>
            </div>
        </div>
    );
}
