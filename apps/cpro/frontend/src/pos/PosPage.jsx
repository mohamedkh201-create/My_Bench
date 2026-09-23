import { useState, useEffect, useCallback } from "react";
import { AlertTriangle, LockKeyhole, CheckCircle2, TrendingUp, TrendingDown } from "lucide-react";
import Header, { StaffNav } from "../components/Header.jsx";
import { LoadingScreen, Modal } from "../components/ui.jsx";
import { ErrorBoundary } from "../components/ErrorBoundary.jsx";
import OpenShiftScreen from "./OpenShiftScreen.jsx";
import PosBoard from "./PosBoard.jsx";
import { getCurrentShift, errorMessage } from "../lib/api.js";
import { useCart } from "../store/cart.js";
import { __ } from "../lib/frappe.js";
import { formatMoney } from "../lib/format.js";

/**
 * POS entry point and **shift gate**. A cashier cannot reach the selling screen
 * without an open shift:
 *   loading → [ open shift form | "ask a cashier" notice ] → PosBoard
 * Closing the shift returns here so the next cashier opens their own.
 */
export default function PosPage() {
  const [state, setState] = useState({ loading: true, error: "", shift: null, canOpen: false, profiles: [] });
  const [closedNotice, setClosedNotice] = useState(null); // { name, difference_total }

  const loadGate = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: "" }));
    try {
      const data = await getCurrentShift();
      setState({
        loading: false,
        error: "",
        shift: data.shift,
        canOpen: data.can_open,
        profiles: data.pos_profiles || [],
      });
    } catch (e) {
      setState((s) => ({ ...s, loading: false, error: errorMessage(e) }));
    }
  }, []);

  useEffect(() => {
    loadGate();
  }, [loadGate]);

  function handleOpened(shift) {
    setClosedNotice(null);
    setState((s) => ({ ...s, shift }));
  }

  function handleShiftClosed(result) {
    // Clear any lingering cart and drop back to the gate for the next cashier.
    useCart.getState().newOrder();
    useCart.getState().setPosProfile(null);
    setClosedNotice(result || null);
    setState((s) => ({ ...s, shift: null }));
    loadGate();
  }

  const renderContent = () => {
    if (state.loading) {
      return (
        <div className="flex h-screen flex-col overflow-hidden bg-gray-50">
          <Header nav={<StaffNav />} subtitle={__("Point of Sale")} />
          <LoadingScreen label={__("Checking your shift…")} />
        </div>
      );
    }

    if (state.error) {
      return (
        <div className="flex h-screen flex-col overflow-hidden bg-gray-50">
          <Header nav={<StaffNav />} subtitle={__("Point of Sale")} />
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center text-gray-500">
            <AlertTriangle className="h-10 w-10 text-red-400" />
            <p className="max-w-sm text-sm">{__(state.error)}</p>
            <button
              onClick={loadGate}
              className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
            >
              {__("Retry")}
            </button>
          </div>
        </div>
      );
    }

    // Shift open → sell.
    if (state.shift) {
      return (
        <ErrorBoundary>
          <PosBoard shift={state.shift} onShiftClosed={handleShiftClosed} />
        </ErrorBoundary>
      );
    }

    // No shift, but this user may open one.
    if (state.canOpen) {
      return <OpenShiftScreen profiles={state.profiles} onOpened={handleOpened} />;
    }

    // No shift and no permission to open one (e.g. a waiter-only user).
    return (
      <div className="flex h-screen flex-col overflow-hidden bg-gray-50">
        <Header nav={<StaffNav />} subtitle={__("Point of Sale")} />
        <div className="flex flex-1 items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <span className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100">
              <LockKeyhole className="h-7 w-7 text-gray-400" />
            </span>
            <h1 className="text-xl font-extrabold text-gray-900">{__("No open shift")}</h1>
            <p className="mt-1 text-sm text-gray-500">
              {__("A cashier needs to open the POS shift before orders can be taken. Please ask a cashier or manager to open the till.")}
            </p>
            <button
              onClick={loadGate}
              className="mt-5 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
            >
              {__("Check again")}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {renderContent()}
      {closedNotice && <ClosedShiftSummary notice={closedNotice} onDismiss={() => setClosedNotice(null)} />}
    </>
  );
}

function ClosedShiftSummary({ notice, onDismiss }) {
  const diff = notice.difference_total || 0;
  return (
    <Modal
      open
      onClose={onDismiss}
      title={__("Shift Closed Successfully")}
      maxWidth="max-w-md"
      footer={
        <div className="flex items-center gap-3">
          <button
            onClick={onDismiss}
            className="flex-1 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            {__("Done")}
          </button>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="flex flex-col items-center justify-center gap-2 py-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">{__("Shift {0}", [notice.name])}</h3>
          <p className="text-sm text-gray-500">{__("Your shift has been successfully closed and reconciled.")}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
            <div className="text-[11px] font-medium uppercase tracking-wide text-gray-400">{__("Net Total")}</div>
            <div className="mt-0.5 text-lg font-bold text-gray-900">{formatMoney(notice.net_total)}</div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
            <div className="text-[11px] font-medium uppercase tracking-wide text-gray-400">{__("Grand Total")}</div>
            <div className="mt-0.5 text-lg font-bold text-gray-900">{formatMoney(notice.grand_total)}</div>
          </div>
        </div>

        {notice.payments && notice.payments.length > 0 && (
          <div>
            <h4 className="mb-2 text-sm font-semibold text-gray-900">{__("Payment Details")}</h4>
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    <th className="px-3 py-2 text-start">{__("Mode")}</th>
                    <th className="px-3 py-2 text-end">{__("Expected")}</th>
                    <th className="px-3 py-2 text-end">{__("Counted")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {notice.payments.map((p) => (
                    <tr key={p.mode_of_payment}>
                      <td className="px-3 py-2 font-medium text-gray-700">{p.mode_of_payment}</td>
                      <td className="px-3 py-2 text-end text-gray-500">{formatMoney(p.expected_amount)}</td>
                      <td className="px-3 py-2 text-end font-semibold text-gray-900">{formatMoney(p.closing_amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div
          className={`flex items-center justify-between rounded-lg px-3 py-3 text-sm font-semibold ${
            diff === 0
              ? "bg-gray-50 text-gray-600"
              : diff > 0
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-600"
          }`}
        >
          <span className="flex items-center gap-1.5">
            {diff > 0 ? (
              <TrendingUp className="h-4 w-4" />
            ) : diff < 0 ? (
              <TrendingDown className="h-4 w-4" />
            ) : (
              <CheckCircle2 className="h-4 w-4" />
            )}
            {diff === 0 ? __("Balanced") : diff > 0 ? __("Over") : __("Short")}
          </span>
          <span>{formatMoney(diff)}</span>
        </div>
      </div>
    </Modal>
  );
}
