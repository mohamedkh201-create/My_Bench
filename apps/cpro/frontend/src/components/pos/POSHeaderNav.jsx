import React from 'react';
import { Monitor, ReceiptText, ChefHat } from 'lucide-react';

/**
 * ============================================================================
 * Component: POSHeaderNav.jsx
 * ============================================================================
 * شريط تنقل كبسولي (Pill Switcher) في منتصف هيدر الكاشير:
 * - POS: شاشة الكاشير الرئيسية ونقاط البيع
 * - Orders: شاشة إدارة ومتابعة الطلبات (غير مدفوعة / مدفوعة)
 * - Kitchen: شاشة المطبخ (اتأكد / في المطبخ / Served)
 * ============================================================================
 */
export default function POSHeaderNav({ activeTab = 'pos', setActiveTab }) {
    const navItems = [
        {
            id: 'pos',
            label: 'POS',
            arabicLabel: 'نقطة البيع',
            icon: Monitor
        },
        {
            id: 'orders',
            label: 'Orders',
            arabicLabel: 'الطلبات',
            icon: ReceiptText
        },
        {
            id: 'kitchen',
            label: 'Kitchen',
            arabicLabel: 'المطبخ',
            icon: ChefHat
        }
    ];

    return (
        <nav 
            aria-label="POS Views" 
            className="flex items-center bg-slate-900/95 p-1 rounded-full shadow-md border border-slate-800 backdrop-blur-xs select-none"
            dir="ltr"
        >
            {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveTab(item.id)}
                        className={`relative flex items-center gap-2 px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                            isActive
                                ? 'bg-white text-slate-900 shadow-md transform scale-[1.02]'
                                : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                        }`}
                        title={item.arabicLabel}
                    >
                        <Icon 
                            size={16} 
                            className={`transition-transform duration-200 ${isActive ? 'text-slate-900' : 'text-slate-400'}`} 
                        />
                        <span>{item.label}</span>
                    </button>
                );
            })}
        </nav>
    );
}
