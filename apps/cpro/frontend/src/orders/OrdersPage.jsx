import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Utensils, Receipt, CheckCircle, Clock } from "lucide-react";
import { getCurrentShift, getOpenOrders, getOrder, cancelOrder, getPaidOrders, cancelPaidOrder, amendPaidOrder } from "../lib/api.js";
import { useCart } from "../store/cart.js";
import { LoadingScreen, Modal } from "../components/ui.jsx";
import PaymentModal from "../pos/PaymentModal.jsx";
import Header, { StaffNav } from "../components/Header.jsx";
import { __ } from "../lib/frappe.js";

export default function OrdersPage() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [paidOrders, setPaidOrders] = useState([]);
  const [shift, setShift] = useState(null);
  const [query, setQuery] = useState("");
  const [payOrder, setPayOrder] = useState(null); // The order currently being paid
  const [cancelOrderObj, setCancelOrderObj] = useState(null);
  const [cancelReason, setCancelReason] = useState("");
  const [cancelling, setCancelling] = useState(false);
  
  const [cancelPaidOrderObj, setCancelPaidOrderObj] = useState(null);
  const [amendPaidOrderObj, setAmendPaidOrderObj] = useState(null);
  const [auditReason, setAuditReason] = useState("");
  const [submittingAudit, setSubmittingAudit] = useState(false);
  
  const navigate = useNavigate();

  const handleCancelSubmit = async (e) => {
    e.preventDefault();
    if (!cancelReason.trim()) return;
    setCancelling(true);
    try {
      await cancelOrder(cancelOrderObj.name, cancelReason);
      setOrders(orders.filter((o) => o.name !== cancelOrderObj.name));
      setCancelOrderObj(null);
      setCancelReason("");
    } catch (err) {
      alert(__("Error cancelling order: {0}", [err.message]));
    } finally {
      setCancelling(false);
    }
  };

  const handleCancelPaidSubmit = async (e) => {
    e.preventDefault();
    if (!auditReason.trim()) return;
    setSubmittingAudit(true);
    try {
      await cancelPaidOrder(cancelPaidOrderObj.name, auditReason);
      setPaidOrders(paidOrders.filter((o) => o.name !== cancelPaidOrderObj.name));
      setCancelPaidOrderObj(null);
      setAuditReason("");
    } catch (err) {
      alert(__("Error cancelling order: {0}", [err.message]));
    } finally {
      setSubmittingAudit(false);
    }
  };

  const handleAmendPaidSubmit = async (e) => {
    e.preventDefault();
    if (!auditReason.trim()) return;
    setSubmittingAudit(true);
    try {
      const res = await amendPaidOrder(amendPaidOrderObj.name, auditReason);
      setPaidOrders(paidOrders.filter((o) => o.name !== amendPaidOrderObj.name));
      setAmendPaidOrderObj(null);
      setAuditReason("");
      
      // Load the new draft invoice in the POS
      handleEdit(res.new_pos_invoice);
    } catch (err) {
      alert(__("Error amending order: {0}", [err.message]));
      setSubmittingAudit(false);
    }
  };

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const shiftData = await getCurrentShift();
        if (shiftData?.shift) {
          setShift(shiftData.shift);
          
          const [activeOrders, paidOrdersData] = await Promise.all([
            getOpenOrders(shiftData.shift.name),
            getPaidOrders(shiftData.shift.name)
          ]);
          
          setOrders(activeOrders);
          setPaidOrders(paidOrdersData);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleEdit = async (orderId) => {
    try {
      const full = await getOrder(orderId);
      const cart = useCart.getState();
      cart.newOrder();
      cart.setPosInvoice(full.pos_invoice);
      cart.setCustomer({ name: full.customer, customer_name: full.customer });
      if (full.table) cart.setTable(full.table);
      if (full.order_type) cart.setOrderType(full.order_type);
      if (full.delivery_address) cart.setDeliveryAddress(full.delivery_address);
      
      full.items.forEach(i => {
        cart.addLine(i, { qty: i.qty, notes: i.notes });
      });
      navigate("/cpro");
    } catch (e) {
      alert(__("Error loading order: {0}", [e.message]));
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen flex-col overflow-hidden bg-gray-50">
        <Header nav={<StaffNav />} subtitle={__("Orders")} />
        <LoadingScreen label={__("Loading active orders…")} />
      </div>
    );
  }

  if (!shift) {
    return (
      <div className="flex h-screen flex-col overflow-hidden bg-gray-50">
        <Header nav={<StaffNav />} subtitle={__("Orders")} />
        <div className="flex flex-1 items-center justify-center text-gray-500">
          {__("No active shift found. Please open a shift in the POS terminal.")}
        </div>
      </div>
    );
  }

  const filtered = orders.filter(
    (o) =>
      o.name.toLowerCase().includes(query.toLowerCase()) ||
      (o.customer_name && o.customer_name.toLowerCase().includes(query.toLowerCase())) ||
      (o.cpro_table && o.cpro_table.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredPaid = paidOrders.filter(
    (o) =>
      o.name.toLowerCase().includes(query.toLowerCase()) ||
      (o.customer_name && o.customer_name.toLowerCase().includes(query.toLowerCase())) ||
      (o.cpro_table && o.cpro_table.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <Header nav={<StaffNav />} subtitle={__("Orders")} />
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">{__("Active Orders")}</h1>
        <div className="relative w-72">
          <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={__("Search orders, tables, customers…")}
            className="w-full rounded-xl border-none bg-white py-2 ps-9 pe-4 text-sm shadow-sm focus:ring-2 focus:ring-brand"
          />
        </div>
      </div>

      <div className="flex flex-1 gap-4 overflow-hidden pb-4">
        {["Dine In", "Take Away", "Delivery"].map((type) => {
          const columnOrders = filtered.filter((o) => (o.cpro_order_type || "Dine In") === type);
          return (
            <div key={type} className="flex h-full w-1/4 flex-col rounded-2xl bg-brand/5 p-3 ring-1 ring-brand/10">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-bold text-brand-dark">{__(type)}</h2>
                <span className="rounded-full bg-brand/10 px-2 py-0.5 text-xs font-bold text-brand-dark">
                  {columnOrders.length}
                </span>
              </div>
              
              <div className="scrollbar-thin flex-1 overflow-y-auto space-y-3 pe-1">
                {columnOrders.length === 0 ? (
                  <div className="py-8 text-center text-sm text-gray-400">{__("No {0} orders", [__(type)])}</div>
                ) : (
                  columnOrders.map((order) => (
                    <div
                      key={order.name}
                      className="flex flex-col justify-between overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200 transition hover:shadow-md"
                    >
                      <div className="p-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-sm font-bold text-gray-900">{order.customer_name || __("Guest")}</h3>
                            <p className="text-[10px] text-gray-500">{order.name}</p>
                            {order.cpro_source === "Portal" && (
                              <span className="mt-1 inline-block rounded bg-purple-100 px-1.5 py-0.5 text-[10px] font-bold text-purple-700">Online Order</span>
                            )}
                            {order.cpro_delivery_address && (
                              <p className="text-[10px] text-gray-500 mt-1 line-clamp-1">{order.cpro_delivery_address}</p>
                            )}
                          </div>
                          <span className="text-lg font-extrabold text-brand-dark">
                            {order.grand_total}
                          </span>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          {order.kot_status ? (
                            <div className="flex items-center gap-1 rounded bg-brand/10 px-1.5 py-0.5 text-[10px] font-medium text-brand-dark">
                              {order.kot_status === "Ready" ? (
                                <CheckCircle className="h-3 w-3" />
                              ) : (
                                <Clock className="h-3 w-3" />
                              )}
                              {__(order.kot_status)}
                            </div>
                          ) : (
                            <div />
                          )}

                          {order.cpro_table && (
                            <div className="flex items-center gap-1 text-sm font-bold text-brand-dark">
                              <Utensils className="h-3.5 w-3.5" />
                              {order.cpro_table}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex border-t border-gray-100 bg-gray-50/50 p-1.5 gap-1.5">
                        <button
                          onClick={() => handleEdit(order.name)}
                          className="flex-1 rounded-lg bg-white px-1.5 py-1.5 text-[11px] font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          {__("Edit")}
                        </button>
                        <button
                          onClick={() => setPayOrder(order)}
                          className="flex-1 rounded-lg bg-brand px-1.5 py-1.5 text-[11px] font-semibold text-white shadow-sm hover:bg-brand-dark"
                        >
                          {__("Pay")}
                        </button>
                        <button
                          onClick={() => setCancelOrderObj(order)}
                          className="flex-1 rounded-lg bg-red-50 px-1.5 py-1.5 text-[11px] font-semibold text-red-600 shadow-sm ring-1 ring-inset ring-red-200 hover:bg-red-100"
                        >
                          {__("Cancel")}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}

        {/* Paid Orders Column */}
        <div className="flex h-full w-1/4 flex-col rounded-2xl bg-green-50 p-3 ring-1 ring-green-200">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-bold text-green-800">{__("Paid")}</h2>
            <span className="rounded-full bg-green-200 px-2 py-0.5 text-xs font-bold text-green-900">
              {filteredPaid.length}
            </span>
          </div>
          
          <div className="scrollbar-thin flex-1 overflow-y-auto space-y-3 pe-1">
            {filteredPaid.length === 0 ? (
              <div className="py-8 text-center text-sm text-green-600/60">{__("No paid orders")}</div>
            ) : (
              filteredPaid.map((order) => (
                <div
                  key={order.name}
                  className="flex flex-col justify-between overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-green-200 transition hover:shadow-md"
                >
                  <div className="p-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-gray-900">{order.customer_name || __("Guest")}</h3>
                        <p className="text-[10px] text-gray-500">{order.name}</p>
                        {order.cpro_source === "Portal" && (
                          <span className="mt-1 inline-block rounded bg-purple-100 px-1.5 py-0.5 text-[10px] font-bold text-purple-700">Online Order</span>
                        )}
                        {order.cpro_delivery_address && (
                          <p className="text-[10px] text-gray-500 mt-1 line-clamp-1">{order.cpro_delivery_address}</p>
                        )}
                      </div>
                      <span className="text-lg font-extrabold text-green-700">
                        {order.grand_total}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-1 rounded bg-green-100 px-1.5 py-0.5 text-[10px] font-medium text-green-800">
                        <CheckCircle className="h-3 w-3" />
                        {__("Paid")}
                      </div>

                      {order.cpro_table && (
                        <div className="flex items-center gap-1 text-sm font-bold text-gray-600">
                          <Utensils className="h-3.5 w-3.5" />
                          {order.cpro_table}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex border-t border-gray-100 bg-gray-50/50 p-1.5 gap-1.5">
                    <button
                      onClick={() => setAmendPaidOrderObj(order)}
                      className="flex-1 rounded-lg bg-white px-1.5 py-1.5 text-[11px] font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      {__("Edit")}
                    </button>
                    <button
                      onClick={() => setCancelPaidOrderObj(order)}
                      className="flex-1 rounded-lg bg-red-50 px-1.5 py-1.5 text-[11px] font-semibold text-red-600 shadow-sm ring-1 ring-inset ring-red-200 hover:bg-red-100"
                    >
                      {__("Cancel")}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {payOrder && (
        <PaymentModal
          order={payOrder}
          shift={shift}
          onClose={() => setPayOrder(null)}
          onSuccess={() => {
            setPayOrder(null);
            setOrders(orders.filter((o) => o.name !== payOrder.name));
            // Reload paid orders since we just paid one
            getPaidOrders(shift.name).then(setPaidOrders);
          }}
        />
      )}

      {/* Cancel Active Order Modal */}
      {cancelOrderObj && (
        <Modal
          open={!!cancelOrderObj}
          onClose={() => {
            setCancelOrderObj(null);
            setCancelReason("");
          }}
          title={__("Cancel Order: {0}", [cancelOrderObj.name])}
          footer={
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => {
                  setCancelOrderObj(null);
                  setCancelReason("");
                }}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                {__("Close")}
              </button>
              <button
                form="cancel-order-form"
                type="submit"
                disabled={cancelling || !cancelReason.trim()}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
              >
                {__("Confirm Cancel")}
              </button>
            </div>
          }
        >
          <form id="cancel-order-form" onSubmit={handleCancelSubmit} className="space-y-4">
            <div className="rounded-lg bg-amber-50 p-3 text-xs text-amber-800 ring-1 ring-amber-200">
              {__("Cancelling this order will automatically update the kitchen order ticket status to Cancelled. Current kitchen status: {0}", [__(cancelOrderObj.kot_status || "New")])}
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                {__("Reason for Cancellation *")}
              </label>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder={__("Enter reason...")}
                required
                rows={3}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              />
            </div>
          </form>
        </Modal>
      )}

      {/* Cancel Paid Order Modal */}
      {cancelPaidOrderObj && (
        <Modal
          open={!!cancelPaidOrderObj}
          onClose={() => {
            setCancelPaidOrderObj(null);
            setAuditReason("");
          }}
          title={__("Cancel Paid Order: {0}", [cancelPaidOrderObj.name])}
          footer={
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => {
                  setCancelPaidOrderObj(null);
                  setAuditReason("");
                }}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                {__("Close")}
              </button>
              <button
                form="cancel-paid-order-form"
                type="submit"
                disabled={submittingAudit || !auditReason.trim()}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
              >
                {__("Confirm Cancel")}
              </button>
            </div>
          }
        >
          <form id="cancel-paid-order-form" onSubmit={handleCancelPaidSubmit} className="space-y-4">
            <div className="rounded-lg bg-red-50 p-3 text-xs text-red-800 ring-1 ring-red-200">
              {__("WARNING: You are about to cancel a PAID invoice. This will reverse financial and stock entries and log the action. This cannot be undone.")}
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                {__("Reason for Cancellation *")}
              </label>
              <textarea
                value={auditReason}
                onChange={(e) => setAuditReason(e.target.value)}
                className="w-full rounded-xl border-gray-300 shadow-sm focus:border-brand focus:ring-brand"
                rows={3}
                placeholder={__("Enter reason...")}
                required
              />
            </div>
          </form>
        </Modal>
      )}

      {/* Amend Paid Order Modal */}
      {amendPaidOrderObj && (
        <Modal
          open={!!amendPaidOrderObj}
          onClose={() => {
            setAmendPaidOrderObj(null);
            setAuditReason("");
          }}
          title={__("Edit Paid Order: {0}", [amendPaidOrderObj.name])}
          footer={
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => {
                  setAmendPaidOrderObj(null);
                  setAuditReason("");
                }}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                {__("Close")}
              </button>
              <button
                form="amend-paid-order-form"
                type="submit"
                disabled={submittingAudit || !auditReason.trim()}
                className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark disabled:opacity-50"
              >
                {__("Cancel & Edit")}
              </button>
            </div>
          }
        >
          <form id="amend-paid-order-form" onSubmit={handleAmendPaidSubmit} className="space-y-4">
            <div className="rounded-lg bg-amber-50 p-3 text-xs text-amber-800 ring-1 ring-amber-200">
              {__("To edit a paid invoice, the original invoice will be cancelled and a new draft will be opened with the same items. You can then modify and re-pay it.")}
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                {__("Reason for Edit *")}
              </label>
              <textarea
                value={auditReason}
                onChange={(e) => setAuditReason(e.target.value)}
                className="w-full rounded-xl border-gray-300 shadow-sm focus:border-brand focus:ring-brand"
                rows={3}
                placeholder={__("Enter reason...")}
                required
              />
            </div>
          </form>
        </Modal>
      )}
      </div>
    </div>
  );
}
