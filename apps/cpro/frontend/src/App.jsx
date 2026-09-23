/**
 * ============================================================================
 * File: App.jsx
 * ============================================================================
 * الوصف:
 * مكون التوجيه الرئيسي (Root Router) لتطبيق CPRO POS.
 * يحدد المسارات الرئيسية للنظام:
 * - /login: صفحة تسجيل الدخول
 * - /: التخطيط الرئيسي مع السايدبار للهيدر
 * - /pos: صفحة نقطة البيع (POSPage)
 * - /dashboard: لوحة التحكم الرئيسية (DashboardPage)
 * - /orders: قائمة ومتابعة الطلبات (OrdersPage)
 * - /management: قسم الإدارة والخيارات (ManagementPage)
 * - /kitchen: شاشة المطبخ KDS (KitchenPage)
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { call } from './lib/frappe';

import StaffLayout from './layout/StaffLayout';
import DashboardPage from './pages/DashboardPage';
import OrdersPage from './pages/OrdersPage';
import ManagementPage from './pages/ManagementPage';
import ReasonsPage from './pages/ReasonsPage';
import UsersManagementPage from './pages/UsersManagementPage';
import GenericManagementPage from './pages/GenericManagementPage';
import POSPage from './pages/POSPage';
import KitchenPage from './pages/KitchenPage';
import LoginPage from './pages/LoginPage';
import FrappeDocTypesList from './pages/FrappeDocTypesList';
import DynamicFrappeView from './pages/DynamicFrappeView';

import CustomersPage from './pages/CustomersPage';
import ReportsPage from './pages/ReportsPage';
import InventoryPage from './pages/InventoryPage';
import ProductsPage from './pages/ProductsPage';

import ProtectedRoute from './components/ProtectedRoute';
import { PERMISSIONS, hasPermission } from './lib/permissions';

export default function App() {
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    async function initSession() {
      // Skip fetching if boot is already injected (e.g. in production Frappe view)
      if (window.frappe && window.frappe.boot && window.frappe.boot.user && window.frappe.boot.user.roles) {
        setIsInitializing(false);
        return;
      }
      try {
        const res = await call.get('cpro.api.users.get_current_user_info');
        if (res && res.message) {
          window.frappe = window.frappe || {};
          window.frappe.boot = window.frappe.boot || {};
          window.frappe.boot.user = window.frappe.boot.user || {};
          window.frappe.boot.user.roles = res.message.roles || [];
          window.frappe.boot.user.name = res.message.name;
        }
      } catch (e) {
        console.error("Failed to fetch user session", e);
      } finally {
        setIsInitializing(false);
      }
    }
    initSession();
  }, []);

  if (isInitializing) {
    return <div style={{display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: '#16332B'}}>جاري التحميل...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* صفحة تسجيل الدخول */}
        <Route path="/login" element={<LoginPage />} />

        {/* الواجهة الرئيسية مع السايدبار والهيدر */}
        <Route path="/" element={<StaffLayout />}>
          <Route index element={
            <Navigate to={hasPermission(PERMISSIONS.UI_RAIL_ONLY) && !hasPermission(PERMISSIONS.UI_FULL_SIDEBAR) ? "/pos" : "/dashboard"} replace />
          } />
          <Route path="dashboard" element={<ProtectedRoute permission={PERMISSIONS.DASHBOARD_VIEW}><DashboardPage /></ProtectedRoute>} />
          <Route path="pos" element={<ProtectedRoute permission={PERMISSIONS.POS_VIEW}><POSPage /></ProtectedRoute>} />
          <Route path="orders" element={<ProtectedRoute permission={PERMISSIONS.ORDERS_VIEW}><OrdersPage /></ProtectedRoute>} />
          <Route path="customers" element={<ProtectedRoute permission={PERMISSIONS.CUSTOMERS_VIEW}><CustomersPage /></ProtectedRoute>} />
          <Route path="reports" element={<ProtectedRoute permission={PERMISSIONS.REPORTS_VIEW}><ReportsPage /></ProtectedRoute>} />
          <Route path="inventory" element={<ProtectedRoute permission={PERMISSIONS.INVENTORY_VIEW}><InventoryPage /></ProtectedRoute>} />
          <Route path="menu" element={<ProtectedRoute permission={PERMISSIONS.MENU_VIEW}><ProductsPage /></ProtectedRoute>} />

          {/* مسارات قسم إدارة */}
          <Route path="management" element={<ProtectedRoute permission={PERMISSIONS.ADMIN_ACCESS}><ManagementPage /></ProtectedRoute>} />
          <Route path="management/reasons" element={<ProtectedRoute permission={PERMISSIONS.ADMIN_ACCESS}><ReasonsPage /></ProtectedRoute>} />
          <Route path="management/users" element={<ProtectedRoute permission={PERMISSIONS.ADMIN_USERS}><UsersManagementPage /></ProtectedRoute>} />
          <Route path="management/dynamic/:route" element={<ProtectedRoute permission={PERMISSIONS.ADMIN_ACCESS}><GenericManagementPage /></ProtectedRoute>} />
          <Route path="app/doctypes" element={<ProtectedRoute permission={PERMISSIONS.ADMIN_ACCESS}><FrappeDocTypesList /></ProtectedRoute>} />
          <Route path="app/doctypes/:doctypeName" element={<ProtectedRoute permission={PERMISSIONS.ADMIN_ACCESS}><DynamicFrappeView /></ProtectedRoute>} />
          <Route path="management/*" element={<ProtectedRoute permission={PERMISSIONS.ADMIN_ACCESS}><ManagementPage /></ProtectedRoute>} />
        </Route>

        {/* شاشة المطبخ (مستقلة ملء الشاشة) */}
        <Route path="/kitchen" element={<ProtectedRoute permission={PERMISSIONS.KITCHEN_VIEW}><KitchenPage /></ProtectedRoute>} />

        {/* التوجيه الافتراضي */}
        <Route path="*" element={
            <Navigate to={hasPermission(PERMISSIONS.UI_RAIL_ONLY) && !hasPermission(PERMISSIONS.UI_FULL_SIDEBAR) ? "/pos" : "/dashboard"} replace />
        } />
      </Routes>
    </Router>
  );
}