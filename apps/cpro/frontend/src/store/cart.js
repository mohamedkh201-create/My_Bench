import { create } from "zustand";

/** Unit price of a cart line = smart base rate + all attached modifier deltas. */
export function lineUnitPrice(line) {
  const modSum = (line.modifiers || []).reduce((s, m) => s + Number(m.rate || 0), 0);
  return Number(line.rate || 0) + modSum;
}

// Lines with the same item + same modifier selection merge into one row.
function lineKey(itemCode, modifiers) {
  const signature = (modifiers || [])
    .map((m) => m.modifier_name)
    .sort()
    .join(",");
  return signature ? `${itemCode}::${signature}` : itemCode;
}

export const useCart = create((set, get) => ({
  items: [],
  customer: null, // { name, customer_name, default_price_list }
  priceList: null, // Active overriding price list
  orderType: "Dine In",
  table: "",
  deliveryAddress: "",
  currency: null,
  posProfile: null, // authoritative POS Profile from the open shift
  posInvoice: null, // set after loading existing order or saving
  updateReason: "", // 🟢 سبب التعديل في حالة تعديل طلب مسبق
  serverTotals: null, // authoritative { grand_total, net_total, total_taxes_and_charges }

  setCurrency: (currency) => set({ currency }),
  setCustomer: (customer) => set({ customer }),
  setPriceList: (priceList) => set({ priceList }),
  setOrderType: (orderType) => set({ orderType }),
  setTable: (table) => set({ table }),
  setDeliveryAddress: (deliveryAddress) => set({ deliveryAddress }),
  setPosProfile: (posProfile) => set({ posProfile }),
  setPosInvoice: (posInvoice) => set({ posInvoice }),
  setUpdateReason: (updateReason) => set({ updateReason }), // 🟢 دالة تعيين سبب التعديل
  setServerTotals: (serverTotals) => set({ serverTotals }),

  addLine: (item, opts = {}) => {
    const modifiers = opts.modifiers || [];
    const qty = opts.qty || 1;
    const key = lineKey(item.item_code, modifiers);
    const items = [...get().items];
    const idx = items.findIndex((l) => l.key === key);
    if (idx !== -1) {
      items[idx] = { ...items[idx], qty: items[idx].qty + qty };
      if (opts.notes) items[idx].notes = opts.notes;
    } else {
      items.push({
        key,
        item_code: item.item_code,
        item_name: item.item_name,
        rate: Number(item.rate || 0),
        qty,
        notes: opts.notes || "",
        modifiers,
        image: item.image,
        uom: item.uom,
        kitchen_station: item.kitchen_station,
      });
    }
    // Any cart change invalidates the last server-computed totals.
    set({ items, serverTotals: null });
  },

  incQty: (key) =>
    set({
      items: get().items.map((l) => (l.key === key ? { ...l, qty: l.qty + 1 } : l)),
      serverTotals: null,
    }),

  decQty: (key) =>
    set({
      items: get()
        .items.map((l) => (l.key === key ? { ...l, qty: l.qty - 1 } : l))
        .filter((l) => l.qty > 0),
      serverTotals: null,
    }),

  setQty: (key, qty) => {
    const q = Math.max(0, Math.floor(Number(qty) || 0));
    set({
      items: get()
        .items.map((l) => (l.key === key ? { ...l, qty: q } : l))
        .filter((l) => l.qty > 0),
      serverTotals: null,
    });
  },

  setNotes: (key, notes) =>
    set({ items: get().items.map((l) => (l.key === key ? { ...l, notes } : l)) }),

  removeLine: (key) => set({ items: get().items.filter((l) => l.key !== key), serverTotals: null }),

  // Re-price cart lines from a freshly fetched menu
  reprice: (menu) => {
    if (!menu) return;
    const byCode = {};
    (menu.items || []).forEach((i) => (byCode[i.item_code] = i));
    const modRate = {};
    Object.values(menu.modifier_groups || {}).forEach((g) =>
      (g.modifiers || []).forEach((m) => (modRate[m.modifier_name] = m.rate))
    );
    set({
      items: get().items.map((l) => ({
        ...l,
        rate: byCode[l.item_code] ? Number(byCode[l.item_code].rate || 0) : l.rate,
        modifiers: (l.modifiers || []).map((m) => ({
          ...m,
          rate: modRate[m.modifier_name] != null ? modRate[m.modifier_name] : m.rate,
        })),
      })),
      serverTotals: null,
    });
  },

  subtotal: () => get().items.reduce((s, l) => s + lineUnitPrice(l) * l.qty, 0),
  count: () => get().items.reduce((s, l) => s + l.qty, 0),
  qtyOf: (itemCode) =>
    get()
      .items.filter((l) => l.item_code === itemCode)
      .reduce((s, l) => s + l.qty, 0),

  // 🟢 دالة جديدة لتجهيز السلة عند اختيار أوردر مفتوح للتعديل عليه
  loadOrder: (order) =>
    set({
      posInvoice: order.name,
      items: order.items || [],
      table: order.cpro_table || "",
      orderType: order.cpro_order_type || "Dine In",
      customer: order.customer || null,
      deliveryAddress: order.cpro_delivery_address || "",
      updateReason: "",
      serverTotals: null,
    }),

  // 🟢 تصفير كامل لإعداد أوردر جديد
  newOrder: () =>
    set({
      items: [],
      posInvoice: null,
      updateReason: "",
      serverTotals: null,
      table: "",
      deliveryAddress: "",
    }),
}));