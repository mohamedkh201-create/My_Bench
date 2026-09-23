import { useState, useEffect, useRef } from "react";
import {
  Trash2,
  AlertTriangle,
  ShoppingCart,
  User,
  X,
  Search,
  Plus,
  Minus,
  CheckCircle2,
  Sparkles,
  UserPlus,
} from "lucide-react";
import { useCart, lineUnitPrice } from "../store/cart.js";
import { saveOrder, searchCustomers, createCustomer, getTables, errorMessage } from "../lib/api.js";
import { formatMoney } from "../lib/format.js";
import { Spinner } from "../components/ui.jsx";
import { __ } from "../lib/frappe.js";

const ORDER_TYPES = ["Dine In", "Take Away", "Delivery"];

export default function CartPanel({ currency, onCustomerChange }) {
  const items = useCart((s) => s.items);
  const customer = useCart((s) => s.customer);
  const orderType = useCart((s) => s.orderType);
  const table = useCart((s) => s.table);
  const deliveryAddress = useCart((s) => s.deliveryAddress);
  const posInvoice = useCart((s) => s.posInvoice);
  const posProfile = useCart((s) => s.posProfile);
  const updateReason = useCart((s) => s.updateReason);
  const serverTotals = useCart((s) => s.serverTotals);
  const setCustomer = useCart((s) => s.setCustomer);
  const setOrderType = useCart((s) => s.setOrderType);
  const setTable = useCart((s) => s.setTable);
  const setDeliveryAddress = useCart((s) => s.setDeliveryAddress);
  const setNotes = useCart((s) => s.setNotes);
  const incQty = useCart((s) => s.incQty);
  const decQty = useCart((s) => s.decQty);
  const removeLine = useCart((s) => s.removeLine);
  const setPosInvoice = useCart((s) => s.setPosInvoice);
  const setUpdateReason = useCart((s) => s.setUpdateReason);
  const setServerTotals = useCart((s) => s.setServerTotals);
  const newOrder = useCart((s) => s.newOrder);

  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null); // { type: "success" | "error", text }
  const [tables, setTables] = useState([]);

  // 🟢 حالة إظهار نافذة سبب التعديل
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [reasonInput, setReasonInput] = useState("");

  // Fetch restaurant tables on mount
  useEffect(() => {
    getTables().then(setTables);
  }, []);

  const clientSubtotal = items.reduce((s, l) => s + lineUnitPrice(l) * l.qty, 0);
  const count = items.reduce((s, l) => s + l.qty, 0);

  function handleSelectCustomer(c) {
    setCustomer(c);
  }

  async function handleSave(overrideReason) {
    const activeReason = overrideReason !== undefined ? overrideReason : (updateReason || reasonInput);

    // 🟢 لو بنعدل أوردر مسبق ومفيش سبب تعديل -> يفتح Modal طلب السبب
    if (posInvoice && !activeReason?.trim()) {
      setShowReasonModal(true);
      return;
    }

    setStatus(null);
    setSaving(true);
    try {
      const payload = {
        pos_invoice: posInvoice || null,
        pos_profile: posProfile || null,
        customer: customer ? customer.name : null,
        order_type: orderType,
        table: orderType === "Dine In" ? table || null : null,
        delivery_address: orderType === "Delivery" ? deliveryAddress : null,
        update_reason: posInvoice ? activeReason.trim() : null, // 🟢 إرسال سبب التعديل للباك إند
        items: items.map((l) => ({
          item_code: l.item_code,
          qty: l.qty,
          notes: l.notes || null,
          modifiers: (l.modifiers || []).map((m) => ({
            modifier_name: m.modifier_name,
            rate: m.rate,
            item: m.item || null,
          })),
        })),
      };

      const res = await saveOrder(payload);
      setPosInvoice(res.pos_invoice);
      setServerTotals({
        grand_total: res.grand_total,
        net_total: res.net_total,
        total_taxes_and_charges: res.total_taxes_and_charges,
      });
      if (res.is_addition) {
        setStatus({ type: "success", text: __("🔄 Added to existing order · {0}", [res.pos_invoice]) });
      } else {
        setStatus({ type: "success", text: __("Saved · {0}", [res.pos_invoice]) });
      }

      // إغلاق النافذة وتصفير السبب المحلي
      setShowReasonModal(false);
      setReasonInput("");
      if (setUpdateReason) setUpdateReason("");
    } catch (e) {
      setStatus({ type: "error", text: __(errorMessage(e)) });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-brand" />
          <h2 className="text-base font-bold text-gray-900">{__("Current Order")}</h2>
          {count > 0 && (
            <span className="rounded-full bg-brand px-2 py-0.5 text-xs font-bold text-white">
              {count}
            </span>
          )}
        </div>
        {items.length > 0 && (
          <button
            onClick={() => {
              newOrder();
              setStatus(null);
              setReasonInput("");
            }}
            className="text-xs font-semibold text-gray-400 hover:text-red-500"
          >
            {__("New order")}
          </button>
        )}
      </div>

      {/* Customer + order type */}
      <div className="space-y-3 border-b border-gray-200 px-4 py-3">
        <CustomerPicker customer={customer} onSelect={handleSelectCustomer} />

        <div className="flex gap-1.5">
          {ORDER_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setOrderType(t)}
              className={`flex-1 rounded-lg border py-1.5 text-xs font-semibold transition ${orderType === t
                  ? "border-brand bg-brand text-white"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
            >
              {__(t)}
            </button>
          ))}
        </div>

        {orderType === "Dine In" && (
          <select
            value={table}
            onChange={(e) => setTable(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          >
            <option value="">{__("Select table")}</option>
            {(() => {
              const rooms = [...new Set(tables.map((t) => t.room || ""))];
              if (rooms.length <= 1) {
                return tables.map((t) => (
                  <option key={t.name} value={t.name}>
                    {t.table_number}{t.seating_capacity ? ` (${t.seating_capacity} ${__("seats")})` : ""}
                  </option>
                ));
              }
              return rooms.map((room) => (
                <optgroup key={room} label={room || __("Other")}>
                  {tables
                    .filter((t) => (t.room || "") === room)
                    .map((t) => (
                      <option key={t.name} value={t.name}>
                        {t.table_number}{t.seating_capacity ? ` (${t.seating_capacity} ${__("seats")})` : ""}
                      </option>
                    ))}
                </optgroup>
              ));
            })()}
          </select>
        )}

        {orderType === "Delivery" && (
          <textarea
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            rows={2}
            placeholder={__("Delivery Address")}
          />
        )}
      </div>

      {/* Cart lines */}
      <div className="scrollbar-thin min-h-0 flex-1 overflow-y-auto">
        {items.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center text-gray-400">
            <ShoppingCart className="h-10 w-10" />
            <p className="text-sm">{__("No items yet. Tap a menu item to add it.")}</p>
          </div>
        ) : (
          items.map((l) => (
            <CartLine
              key={l.key}
              line={l}
              currency={currency}
              onInc={() => incQty(l.key)}
              onDec={() => decQty(l.key)}
              onRemove={() => removeLine(l.key)}
              onNotes={(v) => setNotes(l.key, v)}
            />
          ))
        )}
      </div>

      {/* Totals + save */}
      <div className="border-t border-gray-200 px-4 py-4">
        <div className="space-y-1.5 text-sm">
          <Row label={__("Subtotal")} value={formatMoney(clientSubtotal, currency)} muted />
          {serverTotals ? (
            <>
              <Row label={__("Net total")} value={formatMoney(serverTotals.net_total, currency)} muted />
              <Row
                label={__("Taxes (VAT / Service)")}
                value={formatMoney(serverTotals.total_taxes_and_charges, currency)}
                muted
              />
              <div className="my-1 border-t border-dashed border-gray-200" />
              <Row
                label={__("Grand total")}
                value={formatMoney(serverTotals.grand_total, currency)}
                strong
              />
            </>
          ) : (
            <p className="pt-0.5 text-xs text-gray-400">
              {__("VAT / Service charges are calculated and confirmed when you save the order.")}
            </p>
          )}
        </div>

        {status && (
          <div
            className={`mt-3 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${status.type === "success"
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-600"
              }`}
          >
            {status.type === "success" ? (
              <CheckCircle2 className="h-4 w-4 shrink-0" />
            ) : (
              <AlertTriangle className="h-4 w-4 shrink-0" />
            )}
            <span className="min-w-0 break-words">{status.text}</span>
          </div>
        )}

        <button
          onClick={() => handleSave()}
          disabled={items.length === 0 || saving}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3 text-sm font-bold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          {saving && <Spinner className="h-4 w-4 text-white" />}
          {posInvoice ? __("Update Order") : __("Save Order")}
        </button>
      </div>

      {/* 🟢 Modal نافذة سبب التعديل */}
      {showReasonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold text-gray-900">{__("Update Order Reason")}</h3>
              <button
                onClick={() => setShowReasonModal(false)}
                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4">
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                {__("Please enter reason for modifying this order")} *
              </label>
              <textarea
                value={reasonInput}
                onChange={(e) => setReasonInput(e.target.value)}
                placeholder={__("e.g. Added extra items, changed table")}
                className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                rows={3}
                autoFocus
              />
            </div>
            <div className="mt-5 flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setShowReasonModal(false)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50"
              >
                {__("Cancel")}
              </button>
              <button
                type="button"
                disabled={!reasonInput.trim() || saving}
                onClick={() => handleSave(reasonInput)}
                className="flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-xs font-bold text-white hover:bg-brand-dark disabled:opacity-50"
              >
                {saving && <Spinner className="h-3.5 w-3.5 text-white" />}
                {__("Confirm & Update")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value, muted, strong }) {
  return (
    <div className="flex items-center justify-between">
      <span className={strong ? "font-bold text-gray-900" : muted ? "text-gray-500" : "text-gray-700"}>
        {label}
      </span>
      <span className={strong ? "text-lg font-extrabold text-brand-dark" : "font-medium text-gray-800"}>
        {value}
      </span>
    </div>
  );
}

function CartLine({ line, currency, onInc, onDec, onRemove, onNotes }) {
  const modifierSummary = (line.modifiers || []).map((m) => m.modifier_name).join(", ");
  return (
    <div className="border-b border-gray-100 px-4 py-3">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold text-gray-800">{line.item_name}</div>
          {modifierSummary && (
            <div className="mt-0.5 truncate text-xs text-gray-500">{modifierSummary}</div>
          )}
          <div className="mt-0.5 text-xs text-gray-400">
            {formatMoney(lineUnitPrice(line), currency)} {__("each")}
          </div>
        </div>
        <div className="text-sm font-bold text-gray-900">
          {formatMoney(lineUnitPrice(line) * line.qty, currency)}
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center rounded-lg border border-gray-200">
          <button
            onClick={onDec}
            className="flex h-8 w-9 items-center justify-center text-gray-600 hover:bg-gray-50"
            aria-label="Decrease"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="min-w-7 text-center text-sm font-bold text-gray-800">{line.qty}</span>
          <button
            onClick={onInc}
            className="flex h-8 w-9 items-center justify-center text-gray-600 hover:bg-gray-50"
            aria-label="Increase"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <button
          onClick={onRemove}
          className="rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
          aria-label="Remove"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="relative mt-2">
        <AlertTriangle className="pointer-events-none absolute start-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-red-400" />
        <input
          value={line.notes || ""}
          onChange={(e) => onNotes(e.target.value)}
          placeholder={__("Critical note (e.g. no onions, allergy)")}
          className="w-full rounded-lg border border-red-200 bg-red-50/40 py-1.5 ps-8 pe-2 text-xs font-medium text-red-700 placeholder-red-300 focus:border-red-400 focus:outline-none focus:ring-1 focus:ring-red-400"
        />
      </div>
    </div>
  );
}

function CustomerPicker({ customer, onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [newMobile, setNewMobile] = useState("");

  useEffect(() => {
    if (!open) return;
    let active = true;
    setLoading(true);
    const t = setTimeout(async () => {
      const rows = await searchCustomers(query);
      if (active) {
        setResults(rows);
        setLoading(false);
      }
    }, 250);
    return () => {
      active = false;
      clearTimeout(t);
    };
  }, [query, open]);

  useEffect(() => {
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  if (customer) {
    return (
      <div className="flex items-center justify-between rounded-lg border border-brand/30 bg-brand/5 px-3 py-2">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-900">
            <User className="h-4 w-4 shrink-0 text-brand" />
            <span className="truncate">{String(customer.customer_name || customer.name)}</span>
          </div>
          <div className="mt-0.5 flex items-center gap-1 text-xs text-brand-dark">
            <Sparkles className="h-3 w-3" />
            {String(customer.default_price_list
              ? __("Smart price: {0}", [String(customer.default_price_list)])
              : __("Standard pricing"))}
          </div>
        </div>
        <button
          onClick={() => onSelect(null)}
          className="rounded-full p-1 text-gray-400 hover:bg-white hover:text-gray-700"
          aria-label="Clear customer"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setCreating(true);
    try {
      const doc = await createCustomer(newName, newMobile);
      onSelect(doc);
      setOpen(false);
      setQuery("");
      setNewName("");
      setNewMobile("");
    } catch (err) {
      alert(__("Error adding customer: {0}", [errorMessage(err)]));
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="relative" ref={ref}>
      <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <input
        value={query}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setQuery(e.target.value);
          if (/^\d+$/.test(e.target.value.trim())) {
            setNewMobile(e.target.value.trim());
            setNewName("");
          } else {
            setNewName(e.target.value);
            setNewMobile("");
          }
        }}
        placeholder={__("Walk-in customer — search to apply pricing")}
        className="w-full rounded-lg border border-gray-300 py-2 ps-9 pe-3 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
      />
      {open && (
        <div className="scrollbar-thin absolute z-30 mt-1 max-h-80 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
          {loading ? (
            <div className="flex items-center gap-2 px-3 py-3 text-sm text-gray-400">
              <Spinner className="h-4 w-4 text-brand" /> {__("Searching…")}
            </div>
          ) : results.length === 0 && query.trim() ? (
            <div className="p-3">
              <div className="mb-2 text-xs font-semibold text-gray-500">{__("No customers found.")}</div>
              <form onSubmit={handleCreate} className="space-y-2 rounded-lg bg-gray-50 p-3 ring-1 ring-gray-200">
                <div>
                  <input
                    placeholder={__("Customer Name *")}
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full rounded border border-gray-300 px-2 py-1.5 text-sm focus:border-brand focus:outline-none"
                  />
                </div>
                <div>
                  <input
                    placeholder={__("Mobile Number")}
                    value={newMobile}
                    onChange={(e) => setNewMobile(e.target.value)}
                    className="w-full rounded border border-gray-300 px-2 py-1.5 text-sm focus:border-brand focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={creating || !newName.trim()}
                  className="flex w-full items-center justify-center gap-2 rounded bg-brand py-1.5 text-sm font-bold text-white hover:bg-brand-dark disabled:opacity-50"
                >
                  {creating ? <Spinner className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
                  {__("Add & Apply")}
                </button>
              </form>
            </div>
          ) : results.length === 0 ? (
            <div className="px-3 py-3 text-sm text-gray-400">{__("Type to search customers...")}</div>
          ) : (
            results.map((r) => (
              <button
                key={r.name}
                onClick={() => {
                  onSelect(r);
                  setOpen(false);
                  setQuery("");
                }}
                className="flex w-full flex-col items-start px-3 py-2 text-start hover:bg-gray-50"
              >
                <span className="flex items-center justify-between w-full">
                  <span className="text-sm font-medium text-gray-800">
                    {r.customer_name || r.name}
                  </span>
                  {r.mobile_no && <span className="text-xs text-gray-500">{r.mobile_no}</span>}
                </span>
                {r.default_price_list && (
                  <span className="text-xs text-gray-400">{r.default_price_list}</span>
                )}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}