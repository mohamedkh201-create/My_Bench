// Read-only view of the injected Frappe boot payload. These are UI conveniences
// only (greeting, showing/hiding a nav link) — every privileged action is
// enforced server-side by cpro.api.utils.require_role(), never by this file.

export const ROLES = {
  MANAGER: "Cpro Manager",
  CASHIER: "Cpro Cashier",
  WAITER: "Cpro Waiter",
  KITCHEN: "Cpro Kitchen",
};

export function getBoot() {
  try {
    return (window.frappe && window.frappe.boot) || {};
  } catch (e) {
    return {};
  }
}

/** Logged-in user id, or "Guest" on the public portal. */
export function getUser() {
  const b = getBoot();
  return b.user_id || (b.user && b.user.name) || "Guest";
}

export function isGuest() {
  return getUser() === "Guest";
}

export function getRoles() {
  const b = getBoot();
  const roles = (b.user && b.user.roles) || b.user_roles || [];
  return Array.isArray(roles) ? roles : [];
}

/** Best-effort role check for optional UI (System Manager always passes). */
export function hasRole(...roles) {
  const set = new Set(getRoles());
  if (set.has("System Manager") || set.has("Administrator")) return true;
  return roles.some((r) => set.has(r));
}
