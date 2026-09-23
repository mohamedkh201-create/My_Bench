import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function StaffLayout() {
  const location = useLocation();
  const isPos = location.pathname === '/pos';

  return (
    <div className="shell" dir="rtl">
      <Sidebar />
      <div className="main">
        {!isPos && <Header />}
        <Outlet />
      </div>
    </div>
  );
}