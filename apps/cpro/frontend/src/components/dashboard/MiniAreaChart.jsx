/**
 * ============================================================================
 * Component: MiniAreaChart.jsx
 * ============================================================================
 * الوصف:
 * رسم بياني مصغر (Sparkline Area Chart) كـ SVG يعرض في كروت المؤشرات السريعة.
 * ============================================================================
 */

import React from 'react';

export default function MiniAreaChart() {
    return (
        <div className="h-16 w-full mt-2">
            <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="miniGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#B4863B" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#B4863B" stopOpacity="0.0" />
                    </linearGradient>
                </defs>
                <path
                    d="M 0 30 Q 15 10, 30 25 T 60 15 T 80 35 T 100 5 L 100 40 L 0 40 Z"
                    fill="url(#miniGrad)"
                />
                <path
                    d="M 0 30 Q 15 10, 30 25 T 60 15 T 80 35 T 100 5"
                    fill="none"
                    stroke="#B4863B"
                    strokeWidth="2"
                />
            </svg>
        </div>
    );
}
