import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { hasPermission, PERMISSIONS } from '../lib/permissions';

export default function ProtectedRoute({ children, permission }) {
  const location = useLocation();

  if (localStorage.getItem('isLoggedIn') !== 'true') {
    return <Navigate to="/login" replace />;
  }

  if (permission && !hasPermission(permission)) {
    // If the user lacks permission for the current route, send them to a route they DO have access to.
    if (hasPermission(PERMISSIONS.UI_RAIL_ONLY) && !hasPermission(PERMISSIONS.UI_FULL_SIDEBAR)) {
      if (location.pathname === '/pos') return children; // Prevent loop if they are already here somehow
      return <Navigate to="/pos" replace />;
    }
    
    // Fallback: If they have full sidebar but lack this specific permission, send to dashboard.
    // Ensure we don't loop if they are already on /dashboard
    if (location.pathname === '/dashboard') {
        // If they don't even have dashboard permission, this is a serious restriction. Send to /login.
        return <Navigate to="/login" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
