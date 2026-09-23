import { getRoles } from './session';

export const PERMISSIONS = {
  UI_RAIL_ONLY: 'ui.rail_only',
  UI_FULL_SIDEBAR: 'ui.full_sidebar',

  DASHBOARD_VIEW: 'dashboard.view',
  POS_VIEW: 'pos.view',
  ORDERS_VIEW: 'orders.view',
  KITCHEN_VIEW: 'kitchen.view',
  CUSTOMERS_VIEW: 'customers.view',
  REPORTS_VIEW: 'reports.view',
  INVENTORY_VIEW: 'inventory.view',
  MENU_VIEW: 'menu.view',

  // Management permissions
  ADMIN_ACCESS: 'admin.access', // Required to even see the "Management" section
  ADMIN_USERS: 'admin.users',
  ADMIN_ROLES: 'admin.roles',
  ADMIN_BRANCHES: 'admin.branches',
  ADMIN_DEVICES: 'admin.devices',
  ADMIN_DISCOUNTS: 'admin.discounts',
  ADMIN_COUPONS: 'admin.coupons',
  ADMIN_PROMOTIONS: 'admin.promotions',
  ADMIN_EVENTS: 'admin.events',
};

const ROLE_PERMISSIONS = {
  'Cpro Cashier': [
    PERMISSIONS.UI_RAIL_ONLY,
    PERMISSIONS.POS_VIEW,
    PERMISSIONS.ORDERS_VIEW,
    PERMISSIONS.KITCHEN_VIEW,
  ],
  'Cpro Manager': [
    PERMISSIONS.UI_FULL_SIDEBAR,
    PERMISSIONS.DASHBOARD_VIEW,
    PERMISSIONS.POS_VIEW,
    PERMISSIONS.ORDERS_VIEW,
    PERMISSIONS.KITCHEN_VIEW,
    PERMISSIONS.CUSTOMERS_VIEW,
    PERMISSIONS.REPORTS_VIEW,
    PERMISSIONS.INVENTORY_VIEW,
    PERMISSIONS.MENU_VIEW,
    
    PERMISSIONS.ADMIN_ACCESS,
    PERMISSIONS.ADMIN_USERS,
    PERMISSIONS.ADMIN_ROLES,
    PERMISSIONS.ADMIN_BRANCHES,
    PERMISSIONS.ADMIN_DEVICES,
    PERMISSIONS.ADMIN_DISCOUNTS,
    PERMISSIONS.ADMIN_COUPONS,
    PERMISSIONS.ADMIN_PROMOTIONS,
    PERMISSIONS.ADMIN_EVENTS,
  ],
  // محاسب أو HR (حسب الأسماء القياسية في النظام)
  'Accounts Manager': [
    PERMISSIONS.UI_FULL_SIDEBAR,
    PERMISSIONS.DASHBOARD_VIEW,
    PERMISSIONS.POS_VIEW,
    PERMISSIONS.ORDERS_VIEW,
    PERMISSIONS.CUSTOMERS_VIEW,
    PERMISSIONS.REPORTS_VIEW,
    PERMISSIONS.INVENTORY_VIEW,
    PERMISSIONS.MENU_VIEW,
  ],
  'HR Manager': [
    PERMISSIONS.UI_FULL_SIDEBAR,
    PERMISSIONS.DASHBOARD_VIEW,
    PERMISSIONS.POS_VIEW,
    PERMISSIONS.ORDERS_VIEW,
    PERMISSIONS.CUSTOMERS_VIEW,
    PERMISSIONS.REPORTS_VIEW,
    PERMISSIONS.INVENTORY_VIEW,
    PERMISSIONS.MENU_VIEW,
  ]
};

export function hasPermission(permission) {
  const roles = getRoles();
  
  if (roles.includes("System Manager") || roles.includes("Administrator")) {
    return true; 
  }
  
  for (const role of roles) {
    if (ROLE_PERMISSIONS[role] && ROLE_PERMISSIONS[role].includes(permission)) {
      return true;
    }
  }
  
  return false;
}
