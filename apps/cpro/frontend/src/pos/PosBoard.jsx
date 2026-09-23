import { useState, useEffect, useCallback } from "react";
import { AlertTriangle, LockKeyhole, BellRing, X, ArrowRight } from "lucide-react";
import Header, { StaffNav } from "../components/Header.jsx";
import MenuPanel from "./MenuPanel.jsx";
import CartPanel from "./CartPanel.jsx";
import ModifierModal from "./ModifierModal.jsx";
import CloseShiftModal from "./CloseShiftModal.jsx";
import { LoadingScreen, Modal } from "../components/ui.jsx";
import { getMenu, getPortalRequests, acceptPortalRequest, cancelPortalRequest, errorMessage } from "../lib/api.js";
import { onRealtime } from "../lib/socket.js";
import { CALL_WAITER_EVENT } from "../lib/events.js";
import { useCart } from "../store/cart.js";
import { __ } from "../lib/frappe.js";

function RequestCard({ req, onAction }) {
  const [table, setTable] = useState(req.table || "");
  const [loading, setLoading] = useState(false);

  async function handleAccept() {
    setLoading(true);
    try {
      await acceptPortalRequest(req.id, table);
      onAction();
    } catch (e) {
      alert(errorMessage(e));
    } finally {
      setLoading(false);
    }
  }

  async function handleCancel() {
    setLoading(true);
    try {
      await cancelPortalRequest(req.id);
      onAction();
    } catch (e) {
      alert(errorMessage(e));
    } finally {
      setLoading(false);
    }
  }

  const isOrder = req.type === "Order";

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${isOrder ? "bg-blue-100" : "bg-amber-100"}`}>
            <BellRing className={`h-5 w-5 ${isOrder ? "text-blue-600" : "text-amber-600"}`} />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-gray-900">{isOrder ? __("New Order") : __("Waiter Call")}</span>
              {req.status !== "Pending" && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${req.status === "Accepted" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"}`}>
                  {req.status}
                </span>
              )}
            </div>
            <div className="text-xs text-gray-500">
              {req.customer_name ? `${req.customer_name} • ` : ""}
              {new Date(req.creation || Date.now()).toLocaleTimeString()}
            </div>
          </div>
        </div>
        {req.status === "Pending" && (
          <button
            onClick={handleCancel}
            disabled={loading}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="mt-2 flex items-center gap-2">
        <label className="text-xs font-semibold text-gray-600 w-16">{__("Table")}:</label>
        <input
          type="text"
          value={table}
          onChange={(e) => setTable(e.target.value)}
          disabled={req.status !== "Pending"}
          className="flex-1 rounded-md border-gray-300 p-2 text-sm focus:border-brand focus:ring-brand disabled:bg-gray-100"
          placeholder="E.g. T-01"
        />
        {req.status === "Pending" && (
          <button
            onClick={handleAccept}
            disabled={loading}
            className="rounded-lg bg-brand px-4 py-2 text-sm font-bold text-white transition hover:bg-brand-dark"
          >
            {isOrder ? __("Accept Order") : __("Mark Done")}
          </button>
        )}
      </div>
      
      {isOrder && req.order_payload && (
        <div className="mt-2 rounded-md bg-gray-50 p-2 text-xs text-gray-600">
          <div className="font-bold mb-1">{req.order_type}</div>
          {(() => {
            try {
              const items = JSON.parse(req.order_payload);
              return items.map((it, i) => (
                <div key={i} className="flex justify-between">
                  <span>{it.qty}x {it.item_code}</span>
                  {(it.modifiers || []).length > 0 && <span className="text-[10px] text-gray-400">({it.modifiers.join(', ')})</span>}
                </div>
              ));
            } catch(e) { return null; }
          })()}
        </div>
      )}
    </div>
  );
}

/**
 * The POS selling screen, mounted only once a shift is open. Owns menu loading,
 * the modifier modal, the close-shift flow, and the live Call-Waiter alerts
 * pushed from the guest portal.
 */
export default function PosBoard({ shift, onShiftClosed }) {
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [configItem, setConfigItem] = useState(null);
  const [closing, setClosing] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [alertsModalOpen, setAlertsModalOpen] = useState(false);
  const [alertTab, setAlertTab] = useState("Unread"); // "Unread" | "Read"

  const setCurrency = useCart((s) => s.setCurrency);
  const setPosProfile = useCart((s) => s.setPosProfile);
  const setOrderType = useCart((s) => s.setOrderType);
  const setTable = useCart((s) => s.setTable);
  const addLine = useCart((s) => s.addLine);
  
  // Sync current selection from global store (so the modifier modal can prefill)
  const cartLines = useCart((s) => s.lines);
  const reprice = useCart((s) => s.reprice);
  
  const customer = useCart((s) => s.customer);
  const priceList = useCart((s) => s.priceList);
  const setPriceList = useCart((s) => s.setPriceList);
  const [menus, setMenus] = useState([]);

  // Fetch available menus once
  useEffect(() => {
    import("../lib/api.js").then((api) => api.getMenus().then(setMenus));
  }, []);

  // The open shift dictates the authoritative POS profile used on save.
  useEffect(() => {
    setPosProfile(shift?.pos_profile || null);
  }, [shift, setPosProfile]);

  const load = useCallback(
    async (customerName, activePriceList) => {
      // Only show full loading screen on initial load, not on reprice
      if (!menu) setLoading(true);
      setError("");
      try {
        const data = await getMenu(customerName, activePriceList);
        setMenu(data);
        setCurrency(data.currency || null);
        reprice(data);
      } catch (e) {
        setError(errorMessage(e));
      } finally {
        setLoading(false);
      }
    },
    [setCurrency, reprice, menu]
  );

  // Reload menu when customer or explicit priceList changes
  useEffect(() => {
    load(customer ? customer.name : null, priceList);
  }, [load, customer, priceList]);

  async function refreshRequests() {
    try {
      const allReqs = await getPortalRequests();
      setAlerts(allReqs);
    } catch(e) { console.error(e); }
  }

  useEffect(() => {
    refreshRequests();
    const interval = setInterval(refreshRequests, 15000); // 15s poll as fallback
    return () => clearInterval(interval);
  }, []);

  // Live alerts from the portal
  useEffect(() => {
    const off = onRealtime(CALL_WAITER_EVENT, (data) => {
      // Fetch fresh list to get all details, or optimistically append
      refreshRequests();
    });
    return off;
  }, []);

  const handleCustomerChange = useCallback((customer) => load(customer ? customer.name : null), [load]);

  function handleConfirmModifiers({ modifiers, qty, notes }) {
    addLine(configItem, { modifiers, qty, notes });
    setConfigItem(null);
  }

  function dismissAlert(id) {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  }

  function goToTable(table) {
    setOrderType("Dine In");
    setTable(table);
    setAlerts([]);
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gray-50">
      <Header
        subtitle="Point of Sale"
        nav={<StaffNav />}
        right={
          <div className="flex items-center gap-3">
            <button
              onClick={() => setAlertsModalOpen(true)}
              className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            >
              <BellRing className="h-5 w-5" />
              {alerts.filter(a => a.status === "Pending").length > 0 && (
                <span className="absolute right-1.5 top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white ring-2 ring-white">
                  {alerts.filter(a => a.status === "Pending").length}
                </span>
              )}
            </button>
            <div className="hidden items-center gap-2 sm:flex">
              <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                ● {shift?.pos_profile || __("Shift open")}
              </span>
              <button
                onClick={() => setClosing(true)}
                className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-semibold text-gray-700 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600"
              >
                <LockKeyhole className="h-4 w-4" /> {__("Close Shift")}
              </button>
            </div>
          </div>
        }
      />

      {loading ? (
        <LoadingScreen label={__("Loading menu…")} />
      ) : error ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center text-gray-500">
          <AlertTriangle className="h-10 w-10 text-red-400" />
          <p className="max-w-sm text-sm">{__(error)}</p>
          <button
            onClick={() => load(null)}
            className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            {__("Retry")}
          </button>
        </div>
      ) : (
        <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
          <MenuPanel 
            menu={menu} 
            currency={menu.currency} 
            onConfigure={setConfigItem} 
            menus={menus}
            activeMenu={priceList}
            onSelectMenu={setPriceList}
          />
          <aside className="h-[45vh] shrink-0 border-t border-gray-200 lg:h-full lg:w-[384px] lg:border-s lg:border-t-0">
            {/* Mobile close-shift control (header button is hidden on small screens) */}
            <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2 sm:hidden">
              <span className="text-xs font-semibold text-green-700">● {shift?.pos_profile}</span>
              <button
                onClick={() => setClosing(true)}
                className="flex items-center gap-1 text-xs font-semibold text-gray-600"
              >
                <LockKeyhole className="h-3.5 w-3.5" /> {__("Close Shift")}
              </button>
            </div>
            <CartPanel currency={menu.currency} onCustomerChange={handleCustomerChange} />
          </aside>
        </div>
      )}

      <ModifierModal
        open={!!configItem}
        item={configItem}
        modifierGroups={(menu && menu.modifier_groups) || {}}
        currency={menu && menu.currency}
        onClose={() => setConfigItem(null)}
        onConfirm={handleConfirmModifiers}
      />

      {closing && (
        <CloseShiftModal
          shift={shift}
          currency={menu && menu.currency}
          onClose={() => setClosing(false)}
          onClosed={(result) => {
            setClosing(false);
            onShiftClosed(result);
          }}
        />
      )}

      <Modal
        open={alertsModalOpen}
        onClose={() => setAlertsModalOpen(false)}
        title={__("Online Requests")}
      >
        <div className="flex flex-col gap-3 overflow-y-auto p-4 max-h-[70vh] bg-gray-50/50">
          <div className="flex border-b border-gray-200 mb-2">
            <button
              onClick={() => setAlertTab("Unread")}
              className={`flex-1 py-2 text-center text-sm font-bold ${alertTab === "Unread" ? "border-b-2 border-brand text-brand" : "text-gray-500 hover:text-gray-700"}`}
            >
              {__("Unread")} ({alerts.filter(a => a.status === "Pending").length})
            </button>
            <button
              onClick={() => setAlertTab("Read")}
              className={`flex-1 py-2 text-center text-sm font-bold ${alertTab === "Read" ? "border-b-2 border-brand text-brand" : "text-gray-500 hover:text-gray-700"}`}
            >
              {__("Read")} ({alerts.filter(a => a.status !== "Pending").length})
            </button>
          </div>

          {(() => {
            const list = alertTab === "Unread" ? alerts.filter(a => a.status === "Pending") : alerts.filter(a => a.status !== "Pending");
            if (list.length === 0) {
              return (
                <div className="py-8 text-center text-sm text-gray-500">
                  {__("No requests here.")}
                </div>
              );
            }
            return list.map((a) => (
              <RequestCard key={a.id} req={a} onAction={refreshRequests} />
            ));
          })()}
        </div>
      </Modal>

    </div>
  );
}
