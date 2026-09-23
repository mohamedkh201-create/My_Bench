/**
 * ============================================================================
 * Component: DashboardTopTables.jsx
 * ============================================================================
 * الوصف:
 * جداول المبيعات السفلية في لوحة التحكم (أعلى المنتجات، أعلى طرق الدفع، وأعلى الفروع).
 * ============================================================================
 */

import React from 'react';

export default function DashboardTopTables({ topProducts = [], topPayments = [], topBranches = [], currency = "EGP" }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* أعلى المنتجات */}
            <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm space-y-3">
                <h4 className="text-xs font-bold text-gray-700 border-b border-gray-100 pb-2">
                    أعلى المنتجات حسب صافي البيع ({currency})
                </h4>
                <div className="space-y-2">
                    {topProducts.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-xs text-gray-600">
                            <span>{item.name}</span>
                            <span className="font-semibold text-gray-800">{item.amount}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* أعلى المدفوعات */}
            <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm space-y-3">
                <h4 className="text-xs font-bold text-gray-700 border-b border-gray-100 pb-2">
                    أعلى المدفوعات حسب صافي الدخل ({currency})
                </h4>
                <div className="space-y-2">
                    {topPayments.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-xs text-gray-600">
                            <span>{item.name}</span>
                            <span className="font-semibold text-gray-800">{item.amount}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* أعلى الفروع */}
            <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm space-y-3">
                <h4 className="text-xs font-bold text-gray-700 border-b border-gray-100 pb-2">
                    أعلى الفروع حسب صافي المبيعات ({currency})
                </h4>
                <div className="space-y-2">
                    {topBranches.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-xs text-gray-600">
                            <span>{item.name}</span>
                            <span className="font-semibold text-gray-800">{item.amount}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
