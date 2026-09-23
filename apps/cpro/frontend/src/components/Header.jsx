/**
 * ============================================================================
 * Component: Header.jsx
 * ============================================================================
 * الوصف:
 * شريط الهيدر الرئيسي في التطبيق.
 * يحتوي على حقل البحث العام، زر الملف الشخصي (الذي يظهر بيانات المستخدم الحالي
 * ويمكنه من تسجيل الخروج أو تبديل الحساب).
 * ============================================================================
 */

import React, { useState, useEffect, useRef } from 'react';
import { Search, User, LogOut, ChevronDown } from 'lucide-react';
import { call, frappe } from '../lib/frappe';
import { useNavigate } from 'react-router-dom';

export default function Header() {
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
        <div className="header">
            {/* Search Area */}
            <div className="search-wrap">
                <Search width="16" height="16" className="text-gray-400" />
                <input
                    type="text"
                    placeholder="بحث في النظام..."
                />
            </div>

            <div className="header-spacer"></div>

            {/* User Profile Area */}
            <div className="user-block relative" ref={dropdownRef} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <div className="txt">
                    <div className="name">{userInfo.name}</div>
                    <div className="mail">{userInfo.email}</div>
                </div>
                <div className={`user-avatar ${userInfo.image ? 'p-0 overflow-hidden' : ''}`}>
                    {userInfo.image ? (
                        <img src={userInfo.image} alt="User" className="w-full h-full object-cover" />
                    ) : (
                        <User width="17" height="17" />
                    )}
                </div>
                <ChevronDown width="12" height="12" className={`text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                    <div className="absolute left-0 top-12 mt-1 w-56 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
                        <div className="p-2">
                            <button 
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-3 py-2 text-sm font-semibold text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>تسجيل الخروج / تبديل الحساب</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}