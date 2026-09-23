import { useState, useMemo } from "react";
import { CreditCard, Banknote, X, Loader2 } from "lucide-react";
import { submitPayment } from "../lib/api.js";
import ReceiptModal from "./ReceiptModal.jsx";
import { __ } from "../lib/frappe.js";

// Hardcoded for typical denominators
const QUICK_CASH = [10, 50, 100, 200, 500];

export default function PaymentModal({ order, shift, onClose, onSuccess }) {
  const [submitting, setSubmitting] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null);
  const [tenderedAmounts, setTenderedAmounts] = useState({});
  const [activeMode, setActiveMode] = useState(null);

  const [discountPercent, setDiscountPercent] = useState("");
  const [discountAmount, setDiscountAmount] = useState("");

  // Derive payment modes from the active shift's balances (the easiest way to know what's enabled)
  const modes = useMemo(() => {
    if (!shift || !shift.balances) return ["Cash"];
    return shift.balances.map((b) => b.mode_of_payment);
  }, [shift]);

  // If no active mode is selected yet, default to the first one (usually Cash)
  const selectedMode = activeMode || modes[0] || "Cash";

  const baseTotal = Number(order.grand_total) || 0;
  const calcDiscount = discountPercent
    ? (baseTotal * Number(discountPercent)) / 100
    : Number(discountAmount) || 0;
  
  const grandTotal = Math.max(0, baseTotal - calcDiscount);
  const totalTendered = Object.values(tenderedAmounts).reduce((a, b) => a + Number(b || 0), 0);
  const remaining = Math.max(0, grandTotal - totalTendered);
  const change = Math.max(0, totalTendered - grandTotal);
  const isPaid = totalTendered >= grandTotal;

  function handleKeypad(val) {
    const current = tenderedAmounts[selectedMode] || "";
    if (val === "C") {
      setTenderedAmounts({ ...tenderedAmounts, [selectedMode]: "" });
    } else if (val === "Exact") {
      setTenderedAmounts({ ...tenderedAmounts, [selectedMode]: remaining > 0 ? remaining : grandTotal });
    } else {
      setTenderedAmounts({ ...tenderedAmounts, [selectedMode]: current + val });
    }
  }

  function handleQuickCash(amt) {
    const current = Number(tenderedAmounts[selectedMode] || 0);
    setTenderedAmounts({ ...tenderedAmounts, [selectedMode]: current + amt });
  }

  async function handleComplete() {
    if (!isPaid) return;
    setSubmitting(true);
    try {
      const payments = Object.entries(tenderedAmounts)
        .filter(([mode, amt]) => Number(amt) > 0)
        .map(([mode, amt]) => ({ mode_of_payment: mode, amount: Number(amt) }));

      const result = await submitPayment(
        order.name, 
        payments, 
        Number(discountPercent) || 0, 
        Number(discountAmount) || 0
      );
      setPaymentResult(result);
    } catch (e) {
      alert(__("Payment failed: {0}", [e.message || "Unknown error"]));
      setSubmitting(false);
    }
  }

  if (paymentResult) {
    return (
      <ReceiptModal 
        order={order} 
        paymentResult={paymentResult} 
        onClose={onSuccess} 
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="flex w-full max-w-4xl overflow-hidden rounded-2xl bg-gray-50 shadow-2xl">
        
        {/* Left side: Order Summary & Payment Modes */}
        <div className="flex w-1/3 flex-col border-e border-gray-200 bg-white">
          <div className="flex items-center justify-between border-b border-gray-100 p-4">
            <div>
              <h2 className="font-bold text-gray-900">{order.customer_name || __("Guest")}</h2>
              <p className="text-xs text-gray-500">{__("Order: {0}", [order.name])}</p>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">{__("Payment Methods")}</h3>
            {modes.map((mode) => (
              <button
                key={mode}
                onClick={() => setActiveMode(mode)}
                className={`flex w-full items-center justify-between rounded-xl border p-4 text-start transition-all ${
                  selectedMode === mode
                    ? "border-brand bg-brand/5 ring-1 ring-brand"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  {mode.toLowerCase().includes("card") || mode.toLowerCase().includes("visa") ? (
                    <CreditCard className={`h-5 w-5 ${selectedMode === mode ? "text-brand" : "text-gray-400"}`} />
                  ) : (
                    <Banknote className={`h-5 w-5 ${selectedMode === mode ? "text-brand" : "text-gray-400"}`} />
                  )}
                  <span className={`font-semibold ${selectedMode === mode ? "text-brand-dark" : "text-gray-700"}`}>
                    {__(mode)}
                  </span>
                </div>
                {Number(tenderedAmounts[mode] || 0) > 0 && (
                  <span className="font-bold text-gray-900">{tenderedAmounts[mode]}</span>
                )}
              </button>
            ))}

            <div className="mt-4 pt-4 border-t border-gray-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">{__("Add Discount")}</h3>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <span className="absolute start-2.5 top-1/2 -translate-y-1/2 text-sm text-gray-400">%</span>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={discountPercent}
                    onChange={(e) => {
                      setDiscountPercent(e.target.value);
                      setDiscountAmount(""); // clear amount if percent is used
                    }}
                    placeholder={__("Percent")}
                    className="w-full rounded-lg border border-gray-300 py-1.5 ps-7 pe-2 text-sm focus:border-brand focus:outline-none"
                  />
                </div>
                <div className="relative flex-1">
                  <span className="absolute start-2.5 top-1/2 -translate-y-1/2 text-sm text-gray-400">#</span>
                  <input
                    type="number"
                    min="0"
                    value={discountAmount}
                    onChange={(e) => {
                      setDiscountAmount(e.target.value);
                      setDiscountPercent(""); // clear percent if amount is used
                    }}
                    placeholder={__("Amount")}
                    className="w-full rounded-lg border border-gray-300 py-1.5 ps-7 pe-2 text-sm focus:border-brand focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">{__("Total Tendered")}</span>
              <span className="font-bold text-gray-900">{totalTendered.toFixed(2)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-lg">
              <span className="font-bold text-gray-700">{__("Remaining")}</span>
              <span className={`font-extrabold ${remaining > 0 ? "text-red-500" : "text-green-500"}`}>
                {remaining > 0 ? remaining.toFixed(2) : "0.00"}
              </span>
            </div>
          </div>
        </div>

        {/* Right side: Numpad & Checkout */}
        <div className="flex flex-1 flex-col p-6">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                {__("Amount Due")} {calcDiscount > 0 && <span className="ms-1 text-xs text-red-500 line-through">{baseTotal.toFixed(2)}</span>}
              </p>
              <p className="text-4xl font-black text-gray-900">{grandTotal.toFixed(2)}</p>
            </div>
            {change > 0 && (
              <div className="text-end">
                <p className="text-sm font-medium text-gray-500">{__("Change")}</p>
                <p className="text-2xl font-bold text-brand">{change.toFixed(2)}</p>
              </div>
            )}
          </div>

          <div className="flex flex-1 gap-6">
            {/* Numpad */}
            <div className="grid flex-1 grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, "C", 0, "."].map((key) => (
                <button
                  key={key}
                  onClick={() => handleKeypad(key.toString())}
                  className="rounded-2xl bg-white text-xl font-bold text-gray-800 shadow-sm ring-1 ring-inset ring-gray-200 transition hover:bg-gray-50 active:bg-gray-100"
                >
                  {key}
                </button>
              ))}
            </div>

            {/* Quick Cash & Actions */}
            <div className="flex w-32 flex-col gap-3">
              <button
                onClick={() => handleKeypad("Exact")}
                className="rounded-2xl bg-brand/10 py-4 font-bold text-brand transition hover:bg-brand/20"
              >
                {__("Exact")}
              </button>
              {QUICK_CASH.map((amt) => (
                <button
                  key={amt}
                  onClick={() => handleQuickCash(amt)}
                  className="rounded-2xl bg-white py-3 font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-200 transition hover:bg-gray-50"
                >
                  +{amt}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleComplete}
            disabled={!isPaid || submitting}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand py-5 text-lg font-black text-white shadow-lg transition hover:bg-brand-dark disabled:bg-gray-300 disabled:shadow-none"
          >
            {submitting ? (
              <>
                <Loader2 className="h-6 w-6 animate-spin" /> {__("Processing...")}
              </>
            ) : (
              __("Complete Payment")
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
