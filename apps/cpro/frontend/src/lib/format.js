import { frappeUrl } from "./frappe.js";

/** Format a monetary amount with an optional currency prefix (e.g. "EGP 45.00"). */
export function formatMoney(amount, currency) {
  const n = Number(amount || 0);
  const s = n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return (currency || "EGP") + " " + s;
}

/** 2-letter initials for an item image fallback (mirrors the ury POS behavior). */
export function itemInitials(name) {
  if (!name) return "";
  return name
    .split(" ")
    .map((w) => (w ? w[0].toUpperCase() : ""))
    .join("")
    .substring(0, 2);
}

/** Resolve a Frappe file path to an absolute URL. */
export function imagePath(relative) {
  if (!relative) return "";
  if (relative.startsWith("/private/files/")) {
    relative = "/files/" + relative.split("/private/files/")[1];
  }
  if (/^https?:\/\//i.test(relative)) return relative;
  return `${frappeUrl}${relative}`;
}
