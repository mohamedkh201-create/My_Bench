/**
 * ============================================================================
 * Page: KitchenPage.jsx
 * ============================================================================
 * الوصف:
 * صفحة شاشة المطبخ (Kitchen Display System - KDS).
 * تعرض تذاكر الطلبات للمطبخ وتسمح لموظفي المطبخ بمتابعة وتحديث حالة الطلبات.
 * ============================================================================
 */

import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function KitchenPage() {
    return (
        <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f0f9ff', direction: 'rtl', overflow: 'hidden' }}>
            <Sidebar />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
                <Header />
                <main style={{ padding: '24px' }}>
                    <h2 style={{ color: '#0369a1', margin: 0 }}>👨‍🍳 شاشة المطبخ (KDS)</h2>
                </main>
            </div>
        </div>
    );
}