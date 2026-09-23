/**
 * ============================================================================
 * Component: Sidebar.jsx
 * ============================================================================
 */

import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    ShoppingBag,
    Users,
    BarChart3,
    Boxes,
    UtensilsCrossed,
    Settings,
    ChevronDown,
    ChevronUp,
    Monitor
} from 'lucide-react';
import { hasPermission, PERMISSIONS } from '../lib/permissions';

export default function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isManagementOpen, setIsManagementOpen] = useState(false);

    const isPosActive = location.pathname === '/pos';

    const isRailMode = hasPermission(PERMISSIONS.UI_RAIL_ONLY) && !hasPermission(PERMISSIONS.UI_FULL_SIDEBAR);

    const navItems = [
        { name: 'الملخص', path: '/dashboard', icon: LayoutDashboard, permission: PERMISSIONS.DASHBOARD_VIEW },
        { name: 'الطلبات', path: '/orders', icon: ShoppingBag, permission: PERMISSIONS.ORDERS_VIEW },
        { name: 'العملاء', path: '/customers', icon: Users, permission: PERMISSIONS.CUSTOMERS_VIEW },
        { name: 'التقارير', path: '/reports', icon: BarChart3, permission: PERMISSIONS.REPORTS_VIEW },
        { name: 'المخزون', path: '/inventory', icon: Boxes, permission: PERMISSIONS.INVENTORY_VIEW },
        { name: 'قائمة المنتجات', path: '/menu', icon: UtensilsCrossed, permission: PERMISSIONS.MENU_VIEW },
    ].filter(item => hasPermission(item.permission));

    const managementSubItems = [
        { name: 'المستخدمين', path: '/management/users', permission: PERMISSIONS.ADMIN_USERS },
        { name: 'الأدوار', path: '/management/roles', permission: PERMISSIONS.ADMIN_ROLES },
        { name: 'الفروع', path: '/management/dynamic/branches', permission: PERMISSIONS.ADMIN_BRANCHES },
        { name: 'الغرف والطاولات', path: '/management/dynamic/rooms', permission: PERMISSIONS.ADMIN_ACCESS },
        { name: 'قوائم الأسعار', path: '/management/dynamic/price-lists', permission: PERMISSIONS.ADMIN_ACCESS },
        { name: 'المنيو', path: '/management/dynamic/menus', permission: PERMISSIONS.ADMIN_ACCESS },
        { name: 'البروفايل', path: '/management/dynamic/devices', permission: PERMISSIONS.ADMIN_DEVICES },
        { name: 'المزيد', path: '/management', permission: PERMISSIONS.ADMIN_ACCESS },
        { name: 'كل شاشات Frappe', path: '/app/doctypes', permission: PERMISSIONS.ADMIN_ACCESS },
    ].filter(item => hasPermission(item.permission));

    // Rail Mode view
    if (isRailMode) {
        return (
            <div className="rail" style={{
                width: '80px',
                background: 'var(--green-900, #16332B)',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                padding: '22px 0',
                flexShrink: 0,
                height: '100vh'
            }}>
                <div className="rail-logo" style={{
                    width: '42px', height: '42px', borderRadius: '50%',
                    background: 'var(--gold, #B4863B)',
                    color: 'var(--green-900, #16332B)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, fontSize: '16px',
                    marginBottom: '30px',
                    fontFamily: "'Fraunces', serif"
                }}>C</div>
                
                <div className="rail-nav" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {hasPermission(PERMISSIONS.POS_VIEW) && (
                        <div 
                            className={`rail-item ${location.pathname === '/pos' ? 'active' : ''}`}
                            onClick={() => navigate('/pos')}
                            style={railItemStyle(location.pathname === '/pos')}
                        >
                            <Monitor width="19" height="19" />
                            <span style={{ fontSize: '9.5px', fontWeight: 600 }}>POS</span>
                        </div>
                    )}
                    {hasPermission(PERMISSIONS.ORDERS_VIEW) && (
                        <div 
                            className={`rail-item ${location.pathname === '/orders' ? 'active' : ''}`}
                            onClick={() => navigate('/orders')}
                            style={railItemStyle(location.pathname === '/orders')}
                        >
                            <ShoppingBag width="19" height="19" />
                            <span style={{ fontSize: '9.5px', fontWeight: 600 }}>Orders</span>
                        </div>
                    )}
                    {hasPermission(PERMISSIONS.KITCHEN_VIEW) && (
                        <div 
                            className={`rail-item ${location.pathname === '/kitchen' ? 'active' : ''}`}
                            onClick={() => navigate('/kitchen')}
                            style={railItemStyle(location.pathname === '/kitchen')}
                        >
                            <UtensilsCrossed width="19" height="19" />
                            <span style={{ fontSize: '9.5px', fontWeight: 600 }}>Kitchen</span>
                        </div>
                    )}
                </div>
                
                <div className="rail-spacer" style={{ flex: 1 }}></div>
                <div className="rail-avatar" style={{
                    width: '42px', height: '42px', borderRadius: '50%',
                    background: 'var(--green-700, #2A5347)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--cream, #FAF5EA)',
                    marginTop: '12px'
                }}>
                    <Users width="18" height="18" />
                </div>
            </div>
        );
    }

    // Full Sidebar view
    return (
        <div className="sidebar">
            <div className="sb-logo">C<span>PRO</span></div>
            
            {hasPermission(PERMISSIONS.POS_VIEW) && (
                <div 
                    className={`sb-active ${isPosActive ? '' : 'cursor-pointer hover:bg-[#204439]'}`}
                    onClick={() => !isPosActive && navigate('/pos')}
                >
                    <Monitor width="15" height="15" />
                    الكاشير (POS)
                </div>
            )}

            <div className="sb-nav overflow-y-auto w-full pb-10 custom-scrollbar">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                        <div
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={`sb-item ${isActive ? 'bg-[#204439] text-[#FAF5EA]' : ''}`}
                        >
                            <Icon width="17" height="17" />
                            {item.name}
                        </div>
                    );
                })}

                {hasPermission(PERMISSIONS.ADMIN_ACCESS) && managementSubItems.length > 0 && (
                    <>
                        <div className="sb-group-head mt-4" onClick={() => setIsManagementOpen(!isManagementOpen)}>
                            <div className="left">
                                <Settings width="17" height="17" />
                                إدارة
                            </div>
                            {isManagementOpen ? (
                                <ChevronUp width="14" height="14" />
                            ) : (
                                <ChevronDown width="14" height="14" />
                            )}
                        </div>

                        {isManagementOpen && (
                            <div className="sb-sub">
                                {managementSubItems.map((sub) => {
                                    const isSubActive = location.pathname === sub.path;
                                    return (
                                        <div
                                            key={sub.path}
                                            onClick={() => navigate(sub.path)}
                                            className={`sb-sub-item ${isSubActive ? 'text-[#B4863B] font-bold' : ''}`}
                                        >
                                            {sub.name}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

function railItemStyle(isActive) {
    return {
        width: '50px', height: '50px',
        borderRadius: '9px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: '4px',
        color: isActive ? '#FAF5EA' : '#8FA89E',
        backgroundColor: isActive ? '#2A5347' : 'transparent',
        cursor: 'pointer',
        position: 'relative'
    };
}