/**
 * ============================================================================
 * Component: POSHeader.jsx
 * ============================================================================
 * الوصف:
 * شريط الترويسة العلوي لنقطة البيع.
 * يتيح اختيار قائمة الأسعار، بروفايل نقطة البيع، وعرض حالة الوردية مع استخدام أزرار الوردية المنفصلة:
 * - POSOpenShiftButton
 * - POSCloseShiftButton
 * كما يتيح تبديل المستخدم وتسجيل الخروج.
 * ============================================================================
 */

import React, { useState, useEffect, useRef } from 'react';
import { Tag, User, LogOut, ChevronDown } from 'lucide-react';
import POSOpenShiftButton from './buttons/POSOpenShiftButton';
import POSCloseShiftButton from './buttons/POSCloseShiftButton';
import POSHeaderNav from './POSHeaderNav';
import { call, frappe } from '../../lib/frappe';
import { useNavigate } from 'react-router-dom';

export default function POSHeader({
    currentPriceList,
    setCurrentPriceList,
    priceLists = [],
    selectedProfileName,
    setSelectedProfileName,
    profiles = [],
    currentOpening,
    handleCloseShift,
    openingLoading,
    setShowOpenModal,
    searchQuery,
    setSearchQuery,
    activeTab = 'pos',
    setActiveTab
}) {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [userInfo, setUserInfo] = useState({ name: 'جاري التحميل...', email: '' });
    const dropdownRef = useRef(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await call.get('cpro.api.users.get_current_user_info');
                if (res.message) {
                    setUserInfo(res.message);
                }
            } catch (error) {
                console.error("خطأ في جلب بيانات المستخدم:", error);
                setUserInfo({ name: 'مستخدم غير معروف', email: '' });
            }
        };
        fetchUser();
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            await frappe.auth().logout();
            localStorage.removeItem('isLoggedIn');
            navigate('/login');
        } catch (error) {
            console.error("Logout failed:", error);
            // Fallback: force redirect anyway
            localStorage.removeItem('isLoggedIn');
            navigate('/login');
        }
    };

    return (
        <>
            <div className="header">
                <div className="brand-chip relative overflow-hidden">
                    البروفايل: <b>{selectedProfileName || 'اختر بروفايل'}</b>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                    <select
                        value={selectedProfileName}
                        onChange={(e) => setSelectedProfileName(e.target.value)}
                        className="absolute opacity-0 inset-0 w-full h-full cursor-pointer"
                    >
                        {profiles.map(p => (
                            <option key={p.name} value={p.name}>{p.name} ({p.company || 'Main'})</option>
                        ))}
                    </select>
                </div>

                <div className="search-wrap">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    <input 
                        placeholder="بحث في الطلبات والمنتجات..."
                        value={searchQuery || ''}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="header-spacer"></div>

                {currentOpening ? (
                    <button className="close-shift" onClick={handleCloseShift} disabled={openingLoading}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
                        إغلاق الوردية
                    </button>
                ) : (
                    <button className="close-shift" style={{background: '#d1fae5', color: '#047857'}} onClick={() => setShowOpenModal(true)}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                        فتح وردية جديدة
                    </button>
                )}

                <div className="status-live">
                    {currentOpening ? (
                        <>
                            <span className="dot-live"></span>
                            وردية مفتوحة: {currentOpening.name}
                        </>
                    ) : (
                        <>
                            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                            لا توجد وردية مفتوحة
                        </>
                    )}
                </div>

                <div className="user-block relative" ref={dropdownRef} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                    <div className="txt">
                        <div className="name">{userInfo.name}</div>
                        <div className="mail">{userInfo.email}</div>
                    </div>
                    <div className={`user-avatar ${userInfo.image ? 'p-0 overflow-hidden' : ''}`}>
                        {userInfo.image ? (
                            <img src={userInfo.image} alt="User" className="w-full h-full object-cover" />
                        ) : (
                            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--green-900)" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>
                        )}
                    </div>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>

                    {isDropdownOpen && (
                        <div className="absolute left-0 top-12 mt-1 w-56 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
                            <div className="p-2">
                                <button onClick={handleLogout} className="w-full text-right px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2">
                                    <LogOut size={16} /> تسجيل الخروج
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="toolbar">
                <div className="segmented">
                    <div className={`seg-item ${activeTab === 'pos' ? 'active' : ''}`} onClick={() => setActiveTab('pos')}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                        POS
                    </div>
                    <div className={`seg-item ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 2h6l1 4H8l1-4z"/><path d="M4 6h16l-1.5 14a2 2 0 0 1-2 2H7.5a2 2 0 0 1-2-2L4 6z"/></svg>
                        Orders
                    </div>
                    <div className={`seg-item ${activeTab === 'kitchen' ? 'active' : ''}`} onClick={() => setActiveTab('kitchen')}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6z"/><line x1="6" y1="17" x2="18" y2="17"/></svg>
                        Kitchen
                    </div>
                </div>
                
                <div className="pricelist-chip relative overflow-hidden">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--gold-dark)" strokeWidth="2"><path d="M20.59 13.41 11 3.83A2 2 0 0 0 9.59 3.3L4 3a1 1 0 0 0-1 1l.3 5.59a2 2 0 0 0 .58 1.41l9.58 9.58a2 2 0 0 0 2.83 0l4.3-4.3a2 2 0 0 0 0-2.87z"/><circle cx="7.5" cy="7.5" r="1.5"/></svg>
                    قائمة الأسعار: <b>{currentPriceList || 'Standard Selling'}</b>
                    <select
                        value={currentPriceList}
                        onChange={(e) => setCurrentPriceList(e.target.value)}
                        className="absolute opacity-0 inset-0 w-full h-full cursor-pointer"
                    >
                        {priceLists.length > 0 ? (
                            priceLists.map(pl => (
                                <option key={pl.name} value={pl.name}>{pl.name}</option>
                            ))
                        ) : (
                            <option value="">Standard Selling</option>
                        )}
                    </select>
                </div>
            </div>
        </>
    );
}
