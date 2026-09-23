import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ShoppingBag,
  ShoppingCart,
  BellRing,
  Plus,
  Minus,
  Trash2,
  X,
  CheckCircle2,
  AlertTriangle,
  UtensilsCrossed,
  Eye,
  ArrowRight,
} from "lucide-react";
import ModifierModal from "../pos/ModifierModal.jsx";
import { Modal, Spinner, LoadingScreen } from "../components/ui.jsx";
import { getPublicMenu, callWaiter, placeGuestOrder, errorMessage } from "../lib/api.js";
import { lineUnitPrice } from "../store/cart.js";
import { formatMoney, itemInitials, imagePath } from "../lib/format.js";
import { __ } from "../lib/frappe.js";

function lineKey(itemCode, modifiers) {
  const sig = (modifiers || []).map((m) => m.modifier_name).sort().join(",");
  return sig ? `${itemCode}::${sig}` : itemCode;
}

/**
 * Public digital menu (route: /menu?table=<slug>). Served to guests by
 * www/menu.py. Ordering and the Call-Waiter button are each gated by a toggle
 * in Cpro Settings AND by having a resolvable table; otherwise the page is a
 * view-only menu.
 */
export default function PortalPage() {
  const [params] = useSearchParams();
  const tableParam = params.get("table") || "";

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCat, setActiveCat] = useState("All");
  const [cart, setCart] = useState([]);
  const [configItem, setConfigItem] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [toast, setToast] = useState(null); // { type, text }
  const [waiterCooldown, setWaiterCooldown] = useState(false);
  
  // Checkout Form State
  const [checkoutStep, setCheckoutStep] = useState(false);
  const [orderType, setOrderType] = useState(tableParam ? "Dine In" : "Delivery");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [tableNumber, setTableNumber] = useState(tableParam);

  const [waiterModalOpen, setWaiterModalOpen] = useState(false);
  const [waiterTable, setWaiterTable] = useState(tableParam || "");

  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const lastCall = localStorage.getItem("cpro_last_waiter_call");
    if (lastCall) {
      const timePassed = Date.now() - parseInt(lastCall);
      if (timePassed < 120000) {
        setWaiterCooldown(true);
        setTimeout(() => setWaiterCooldown(false), 120000 - timePassed);
      }
    }
  }, []);

  useEffect(() => {
    if (!data?.banners?.length) return;
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % data.banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [data?.banners]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    getPublicMenu(tableParam)
      .then((d) => active && setData(d))
      .catch((e) => active && setError(errorMessage(e)))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [tableParam]);

  const showToast = useCallback((type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 4000);
  }, []);

  const currency = data?.currency;
  const table = data?.table || null; // resolved canonical table (or null if unknown)
  const orderingEnabled = !!data?.guest_orders_allowed;
  const waiterEnabled = !!data?.call_waiter_enabled;

  // Group items by category, preserving the server's ordering.
  const grouped = useMemo(() => {
    const map = new Map();
    (data?.items || []).forEach((it) => {
      if (!map.has(it.category)) map.set(it.category, []);
      map.get(it.category).push(it);
    });
    return map;
  }, [data]);

  const categories = (data?.categories || []).filter(c => c.name !== "Uncategorized" && c.name !== __("Uncategorized"));
  const visibleCats = activeCat === "All" ? [...grouped.keys()] : [activeCat];

  const cartCount = cart.reduce((s, l) => s + l.qty, 0);
  const cartTotal = cart.reduce((s, l) => s + lineUnitPrice(l) * l.qty, 0);

  function addToCart(item, opts = {}) {
    const modifiers = opts.modifiers || [];
    const qty = opts.qty || 1;
    const key = lineKey(item.item_code, modifiers);
    setCart((prev) => {
      const idx = prev.findIndex((l) => l.key === key);
      if (idx !== -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty, notes: opts.notes || next[idx].notes };
        return next;
      }
      return [
        ...prev,
        {
          key,
          item_code: item.item_code,
          item_name: item.item_name,
          rate: Number(item.rate || 0),
          qty,
          notes: opts.notes || "",
          modifiers,
          image: item.image,
        },
      ];
    });
  }

  function handleItemTap(item) {
    if (!orderingEnabled) return;
    if ((item.modifier_groups || []).length > 0) {
      setConfigItem(item);
    } else {
      const existing = cart.find(l => l.item_code === item.item_code);
      if (existing) {
        removeLine(existing.key);
      } else {
        addToCart(item);
      }
    }
  }

  function changeQty(key, delta) {
    setCart((prev) =>
      prev.map((l) => (l.key === key ? { ...l, qty: l.qty + delta } : l)).filter((l) => l.qty > 0)
    );
  }

  function removeLine(key) {
    setCart((prev) => prev.filter((l) => l.key !== key));
  }

  const [placing, setPlacing] = useState(false);
  async function handlePlaceOrder(e) {
    if (e) e.preventDefault();
    if (cart.length === 0) return;
    setPlacing(true);
    try {
      const items = cart.map((l) => ({
        item_code: l.item_code,
        qty: l.qty,
        notes: l.notes || null,
        modifiers: (l.modifiers || []).map((m) => m.modifier_name),
      }));
      const res = await placeGuestOrder(
        items,
        orderType,
        orderType === "Dine In" ? tableNumber : null,
        orderType === "Delivery" ? deliveryAddress : null,
        customerName,
        customerPhone
      );
      setCart([]);
      setSheetOpen(false);
      setCheckoutStep(false);
      showToast("success", res.message || "Order sent to the kitchen!");
    } catch (e) {
      showToast("error", errorMessage(e));
    } finally {
      setPlacing(false);
    }
  }


  async function handleCallWaiter(e) {
    if (e) e.preventDefault();
    if (!waiterEnabled || waiterCooldown) return;
    if (!waiterTable) {
      setWaiterModalOpen(true);
      return;
    }
    setWaiterCooldown(true);
    setWaiterModalOpen(false);
    try {
      const res = await callWaiter(waiterTable);
      showToast("success", res.message || "Waiter notified!");
      localStorage.setItem("cpro_last_waiter_call", Date.now().toString());
      setTimeout(() => setWaiterCooldown(false), 120000); // 120s cooldown
    } catch (e) {
      showToast("error", errorMessage(e));
      setWaiterCooldown(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <LoadingScreen label="Loading menu…" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-gray-50 px-6 text-center text-gray-500">
        <AlertTriangle className="h-10 w-10 text-red-400" />
        <p className="max-w-sm text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center justify-end gap-3 px-4 py-3">
          <div className="flex items-center gap-2">
            {!orderingEnabled && (
              <span className="flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-semibold text-gray-500">
                <Eye className="h-3 w-3" /> View only
              </span>
            )}
          </div>
        </div>
        
        {/* Banners Carousel */}
        {data?.banners && data.banners.length > 0 && (
          <div className="mx-auto max-w-2xl px-4 mt-2 mb-4 relative">
            <div className="relative w-full h-48 overflow-hidden rounded-2xl shadow-sm">
              {data.banners.map((b, idx) => (
                <img
                  key={idx}
                  src={imagePath(b)}
                  alt={`Banner ${idx}`}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${idx === currentBanner ? "opacity-100" : "opacity-0"}`}
                />
              ))}
            </div>
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
              {data.banners.map((_, idx) => (
                <div key={idx} className={`h-1.5 rounded-full transition-all ${idx === currentBanner ? "w-4 bg-white" : "w-1.5 bg-white/50"}`} />
              ))}
            </div>
          </div>
        )}

        {/* Category chips */}
        {categories.length > 0 && (
          <div className="scrollbar-thin mx-auto flex max-w-2xl gap-2 overflow-x-auto px-4 pb-3">
            <Chip label="All" active={activeCat === "All"} onClick={() => setActiveCat("All")} />
            {categories.map((c) => (
              <Chip
                key={c.name}
                label={c.name}
                active={activeCat === c.name}
                onClick={() => setActiveCat(c.name)}
              />
            ))}
          </div>
        )}
      </header>

      {/* Menu body */}
      <main className="mx-auto max-w-2xl px-4 py-4">
        {(data?.items || []).length === 0 ? (
          <div className="flex h-[50vh] flex-col items-center justify-center gap-2 text-gray-400">
            <UtensilsCrossed className="h-10 w-10" />
            <p className="text-sm">The menu is not available right now.</p>
          </div>
        ) : (
          visibleCats.map((cat) => (
            <section key={cat} className="mb-6">
              <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-gray-500">{cat}</h2>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {(grouped.get(cat) || []).map((item) => (
                  <ItemRow
                    key={item.item_code}
                    item={item}
                    currency={currency}
                    orderingEnabled={orderingEnabled}
                    isSelected={cart.some(l => l.item_code === item.item_code)}
                    onTap={() => handleItemTap(item)}
                  />
                ))}
              </div>
            </section>
          ))
        )}
      </main>

      {/* Cart FAB */}
      {orderingEnabled && cartCount > 0 && !sheetOpen && (
        <button
          onClick={() => { setSheetOpen(true); setCheckoutStep(false); }}
          className="fixed bottom-4 right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-xl transition-transform hover:scale-105"
        >
          <ShoppingCart className="h-6 w-6" />
          <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-red-500 text-[11px] font-bold text-white">
            {cartCount}
          </span>
        </button>
      )}

      {/* Call Waiter FAB */}
      {waiterEnabled && (
        <button
          onClick={handleCallWaiter}
          disabled={waiterCooldown}
          className={`fixed bottom-4 left-4 z-30 flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 ${
            waiterCooldown ? "bg-gray-200 text-gray-400" : "bg-amber-500 text-white"
          }`}
        >
          <BellRing className="h-5 w-5" />
        </button>
      )}



      {/* Modifier modal (reused from POS) */}
      <ModifierModal
        open={!!configItem}
        item={configItem}
        modifierGroups={(data && data.modifier_groups) || {}}
        currency={currency}
        onClose={() => setConfigItem(null)}
        onConfirm={({ modifiers, qty, notes }) => {
          addToCart(configItem, { modifiers, qty, notes });
          setConfigItem(null);
        }}
      />

      {/* Cart review sheet */}
      {sheetOpen && (
        <Modal
          open
          onClose={() => {
            if (checkoutStep) {
              setCheckoutStep(false);
            } else {
              setSheetOpen(false);
            }
          }}
          title={checkoutStep ? "Checkout details" : "Your order"}
          footer={
            checkoutStep ? (
              <button
                form="checkout-form"
                type="submit"
                disabled={placing}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3 text-sm font-bold text-white hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-brand-dark"
              >
                {placing && <Spinner className="h-4 w-4 text-white" />}
                Confirm Order
              </button>
            ) : (
              <button
                onClick={() => setCheckoutStep(true)}
                disabled={cart.length === 0}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3 text-sm font-bold text-white hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                Proceed to checkout · {formatMoney(cartTotal, currency)}
              </button>
            )
          }
        >
          {!checkoutStep ? (
            cart.length === 0 ? (
            <p className="py-6 text-center text-sm text-gray-400">Your order is empty.</p>
          ) : (
            <div className="space-y-3">
              {cart.map((l) => (
                <div key={l.key} className="flex items-start justify-between gap-3 border-b border-gray-100 pb-3">
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-gray-800">{l.item_name}</div>
                    {l.modifiers.length > 0 && (
                      <div className="truncate text-xs text-gray-500">
                        {l.modifiers.map((m) => m.modifier_name).join(", ")}
                      </div>
                    )}
                    {l.notes && <div className="text-xs font-medium text-red-500">⚠ {l.notes}</div>}
                    <div className="mt-0.5 text-xs text-gray-400">
                      {formatMoney(lineUnitPrice(l), currency)} each
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <div className="text-sm font-bold text-gray-900">
                      {formatMoney(lineUnitPrice(l) * l.qty, currency)}
                    </div>
                    <div className="flex items-center rounded-lg border border-gray-200">
                      <button
                        onClick={() => changeQty(l.key, -1)}
                        className="flex h-7 w-8 items-center justify-center text-gray-600 hover:bg-gray-50"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="min-w-6 text-center text-sm font-bold">{l.qty}</span>
                      <button
                        onClick={() => changeQty(l.key, 1)}
                        className="flex h-7 w-8 items-center justify-center text-gray-600 hover:bg-gray-50"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeLine(l.key)}
                      className="text-gray-300 hover:text-red-500"
                      aria-label="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            )
          ) : (
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setOrderType("Dine In")}
                  className={`rounded-xl border p-3 text-center text-sm font-bold transition ${
                    orderType === "Dine In" ? "border-brand bg-brand/5 text-brand-dark" : "border-gray-200 bg-white text-gray-500"
                  }`}
                >
                  Dine In
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType("Delivery")}
                  className={`rounded-xl border p-3 text-center text-sm font-bold transition ${
                    orderType === "Delivery" ? "border-brand bg-brand/5 text-brand-dark" : "border-gray-200 bg-white text-gray-500"
                  }`}
                >
                  Delivery
                </button>
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-gray-700">Name</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full rounded-xl border-gray-300 p-3 shadow-sm focus:border-brand focus:ring-brand"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-gray-700">Phone</label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full rounded-xl border-gray-300 p-3 shadow-sm focus:border-brand focus:ring-brand"
                  placeholder="01xxxxxxxxx"
                />
              </div>

              {orderType === "Dine In" && (
                <div>
                  <label className="mb-1 block text-xs font-bold text-gray-700">Table Number</label>
                  <input
                    type="text"
                    required
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="w-full rounded-xl border-gray-300 p-3 shadow-sm focus:border-brand focus:ring-brand"
                    placeholder="E.g. T-01"
                  />
                </div>
              )}

              {orderType === "Delivery" && (
                <div>
                  <label className="mb-1 block text-xs font-bold text-gray-700">Delivery Address</label>
                  <textarea
                    required
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full rounded-xl border-gray-300 p-3 shadow-sm focus:border-brand focus:ring-brand"
                    rows={2}
                    placeholder="Full address details..."
                  />
                </div>
              )}
            </form>
          )}
        </Modal>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
          <div
            className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold shadow-lg ${
              toast.type === "success" ? "bg-gray-900 text-white" : "bg-red-600 text-white"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="h-5 w-5 text-green-400" />
            ) : (
              <AlertTriangle className="h-5 w-5" />
            )}
            <span className="max-w-xs">{toast.text}</span>
          </div>
        </div>
      )}
      {/* Waiter Modal */}
      {waiterModalOpen && (
        <Modal
          open
          onClose={() => setWaiterModalOpen(false)}
          title="Call Waiter"
          footer={
            <button
              form="waiter-form"
              type="submit"
              disabled={!waiterTable}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 py-3 text-sm font-bold text-white hover:bg-amber-600 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              Notify Waiter
            </button>
          }
        >
          <form id="waiter-form" onSubmit={handleCallWaiter} className="space-y-4">
            <p className="text-sm text-gray-500">
              Please select your table so the waiter knows where you are.
            </p>
            <div>
              <label className="mb-1 block text-xs font-bold text-gray-700">Table</label>
              <input
                type="text"
                required
                value={waiterTable}
                onChange={(e) => setWaiterTable(e.target.value)}
                className="w-full rounded-xl border-gray-300 p-3 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                placeholder="E.g. T-01"
              />
            </div>
          </form>
        </Modal>
      )}

    </div>
  );
}

function Chip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
        active ? "border-brand bg-brand text-white" : "border-gray-300 bg-white text-gray-600"
      }`}
    >
      {label}
    </button>
  );
}

function ItemRow({ item, currency, orderingEnabled, onTap, isSelected }) {
  const available = item.available !== false;
  const img = imagePath(item.image);

  return (
    <div
      onClick={orderingEnabled && available ? onTap : undefined}
      className={`relative flex cursor-pointer flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-all ${
        isSelected ? "border-brand ring-1 ring-brand" : "border-gray-100"
      } ${available ? "" : "opacity-60 grayscale"}`}
    >
      <div className="aspect-[4/3] w-full bg-gray-50">
        {img ? (
          <img src={img} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-brand-light/10 text-xl font-bold text-brand-light/70">
            {itemInitials(item.item_name)}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-2 text-center">
        <div className="line-clamp-2 text-[11px] font-bold leading-tight text-gray-800">
          {item.item_name}
        </div>
        <div className="mt-auto pt-1 text-xs font-extrabold text-brand-dark">
          {formatMoney(item.rate, currency)}
        </div>
      </div>

      {isSelected && (
        <div className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand text-white shadow-sm">
          <CheckCircle2 className="h-3 w-3" />
        </div>
      )}
      {!available && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-[1px]">
          <span className="rounded-md bg-gray-800/80 px-2 py-1 text-[10px] font-bold text-white">
            Sold out
          </span>
        </div>
      )}
    </div>
  );
}
