import { call, db } from "./frappe.js";

// Every backend method returns { message: T }; these helpers unwrap to T.

// --------------------------------------------------------------------------- //
// Menu + orders (POS)                                                         //
// --------------------------------------------------------------------------- //

/** Full menu payload: categories, items (smart price + availability), modifier groups. */
export async function getMenu(customer, menuName) {
  const payload = {};
  if (customer) payload.customer = customer;
  if (menuName) {
    payload.menu = menuName;
    payload.price_list = menuName;
  }
  const res = await call.get("cpro.api.menu.get_menu", payload);
  return res.message;
}

/** Create/update the open POS order (draft POS Invoice). Returns server totals. */
export async function saveOrder(order) {
  const res = await call.post("cpro.api.pos.save_order", { order });
  return res.message;
}

/** Fetch dynamic printable HTML for an invoice from Frappe backend */
export async function getInvoicePrint(invoiceName, printFormat = null) {
  const res = await call.get("cpro.api.pos.get_invoice_print", {
    invoice_name: invoiceName,
    print_format: printFormat || ""
  });
  return res.message;
}

/** Fetch POS Board orders split by unpaid and paid */
export async function getPosBoardOrders(posOpeningShift = null) {
  const payload = {};
  if (posOpeningShift) payload.pos_opening_shift = posOpeningShift;
  const res = await call.get("cpro.api.pos.get_pos_board_orders", payload);
  return res.message || { unpaid: [], paid: [] };
}

/** Pay an unpaid POS order and optionally print */
export async function payOrder(invoiceName, modeOfPayment = "Cash") {
  const res = await call.post("cpro.api.pos.pay_order", {
    invoice_name: invoiceName,
    mode_of_payment: modeOfPayment
  });
  return res.message;
}


export function cancelPortalRequest(requestId) {
  return call.post("cpro.api.portal.cancel_portal_request", { request_id: requestId });
}

export function acceptPortalRequest(requestId, tableNumber) {
  return call.post("cpro.api.portal.accept_portal_request", { request_id: requestId, table_number: tableNumber });
}

export async function getPortalRequests() {
  const res = await call.get("cpro.api.portal.get_portal_requests");
  return res.message || [];
}

/** Fetch an existing open order to resume editing. */
export async function getOrder(posInvoice) {
  const res = await call.get("cpro.api.pos.get_order", { pos_invoice: posInvoice });
  return res.message;
}

/** Fetch all draft orders for the active shift. */
export async function getOpenOrders(posOpeningShift) {
  const res = await call.get("cpro.api.pos.get_open_orders", { pos_opening_shift: posOpeningShift });
  return res.message || [];
}

/** Submit a payment for a POS Invoice to finalize it. */
export async function submitPayment(posInvoice, payments, discountPercentage = 0, discountAmount = 0) {
  const res = await call.post("cpro.api.pos.submit_payment", {
    pos_invoice: posInvoice,
    payments,
    discount_percentage: discountPercentage,
    discount_amount: discountAmount,
  });
  return res.message;
}

/** Cancel a POS Invoice order. */
export async function cancelOrder(posInvoice, reason) {
  const res = await call.post("cpro.api.pos.cancel_order", {
    pos_invoice: posInvoice,
    reason,
  });
  return res.message;
}

/** Fetch all submitted orders (paid) for the active shift. */
export async function getPaidOrders(posOpeningShift) {
  const res = await call.get("cpro.api.pos.get_paid_orders", { pos_opening_shift: posOpeningShift });
  return res.message || [];
}

/** Cancel a submitted POS Invoice order. */
export async function cancelPaidOrder(posInvoice, reason) {
  const res = await call.post("cpro.api.pos.cancel_paid_order", {
    pos_invoice: posInvoice,
    reason,
  });
  return res.message;
}

/** Amend a submitted POS Invoice order. */
export async function amendPaidOrder(posInvoice, reason) {
  const res = await call.post("cpro.api.pos.amend_paid_order", {
    pos_invoice: posInvoice,
    reason,
  });
  return res.message;
}

/** Fetch all active Selling Price Lists dynamically. */
export async function getMenus() {
  try {
    const docs = await db.getDocList("Price List", {
      fields: ["name"],
      filters: [["selling", "=", 1], ["enabled", "=", 1]],
      orderBy: { field: "name", order: "asc" },
      limit: 0,
    });
    // Map it to match the shape expected by the UI (previously Cpro Menus)
    return (docs || []).map(m => ({ name: m.name, description: m.name }));
  } catch (e) {
    return [];
  }
}

/** Fetch all active restaurant tables. */
export async function getTables() {
  try {
    const docs = await db.getDocList("Cpro Table", {
      fields: ["name", "table_number", "room", "seating_capacity", "status"],
      filters: [["is_active", "=", 1]],
      orderBy: { field: "table_number", order: "asc" },
      limit: 0,
    });
    return docs || [];
  } catch (e) {
    return [];
  }
}

/** Lightweight customer link search for the POS customer picker. */
export async function searchCustomers(query) {
  try {
    const docs = await db.getDocList("Customer", {
      fields: ["name", "customer_name", "default_price_list", "mobile_no"],
      filters: query ? [["customer_name", "like", `%${query}%`]] : [],
      orderBy: { field: "modified", order: "desc" },
      limit: 3,
    });
    return docs || [];
  } catch (e) {
    return [];
  }
}

/** Create a basic customer on the fly */
export async function createCustomer(customerName, mobileNo) {
  const payload = {
    customer_name: customerName,
    customer_type: "Individual",
  };
  if (mobileNo) {
    payload.mobile_no = mobileNo;
  }
  const doc = await db.createDoc("Customer", payload);
  return doc;
}

// --------------------------------------------------------------------------- //
// Shift management                                                            //
// --------------------------------------------------------------------------- //

/** Gate payload: the open shift (or null), can_open, and openable POS profiles. */
export async function getCurrentShift(posProfile) {
  const res = await call.get(
    "cpro.api.shift.get_current_shift",
    posProfile ? { pos_profile: posProfile } : {}
  );
  return res.message;
}

/** Open (create + submit) a shift. balanceDetails: [{mode_of_payment, opening_amount}]. */
export async function openShift(posProfile, balanceDetails) {
  const res = await call.post("cpro.api.shift.open_shift", {
    pos_profile: posProfile,
    balance_details: balanceDetails,
  });
  return res.message;
}

export async function getPosTaxRate(posProfile) {
  const res = await call.get("cpro.api.pos.get_pos_tax_rate", { pos_profile: posProfile });
  return res.message || 0;
}

/** Preview a shift's sales + expected cash for the close-out screen. */
export async function getShiftSummary(posOpeningShift) {
  const res = await call.get("cpro.api.shift.get_shift_summary", {
    pos_opening_shift: posOpeningShift,
  });
  return res.message;
}

/** Close a shift with a counted-cash reconciliation. */
export async function closeShift(posOpeningShift, paymentReconciliation, closingNotes) {
  const res = await call.post("cpro.api.shift.close_shift", {
    pos_opening_shift: posOpeningShift,
    payment_reconciliation: paymentReconciliation,
    closing_notes: closingNotes || null,
  });
  return res.message;
}

// --------------------------------------------------------------------------- //
// Kitchen Display System (KDS)                                                //
// --------------------------------------------------------------------------- //

/** Fetch active KOTs, optionally filtered by kitchen_station and pos_opening_shift. */
export async function getActiveKots(kitchenStation, posOpeningShift) {
  const payload = {};
  if (kitchenStation) payload.kitchen_station = kitchenStation;
  if (posOpeningShift) payload.pos_opening_shift = posOpeningShift;
  const res = await call.get("cpro.api.kitchen.get_active_kots", payload);
  return res.message || [];
}

/** Fetch kitchen board tickets split by confirmed (اتأكد), in_kitchen (في المطبخ), served (تم التقديم) */
export async function getKitchenBoardTickets(kitchenStation, posOpeningShift) {
  const payload = {};
  if (kitchenStation) payload.kitchen_station = kitchenStation;
  if (posOpeningShift) payload.pos_opening_shift = posOpeningShift;
  const res = await call.get("cpro.api.kitchen.get_kitchen_board_tickets", payload);
  return res.message || { confirmed: [], in_kitchen: [], served: [] };
}

/** Advance a whole ticket's status (New → Preparing → Ready → Served). */
export async function setKotStatus(kot, status) {
  const res = await call.post("cpro.api.kitchen.set_kot_status", { kot, status });
  return res.message;
}

/** Advance a single line's status on a ticket. */
export async function setKotItemStatus(kot, itemName, status) {
  const res = await call.post("cpro.api.kitchen.set_kot_item_status", {
    kot,
    item_name: itemName,
    status,
  });
  return res.message;
}

/** Active kitchen stations for the KDS filter. */
export async function getKitchenStations() {
  try {
    const docs = await db.getDocList("Cpro Kitchen Station", {
      fields: ["name", "station_name", "display_order"],
      filters: [["is_active", "=", 1]],
      orderBy: { field: "display_order", order: "asc" },
      limit: 0,
    });
    return docs || [];
  } catch (e) {
    return [];
  }
}

// --------------------------------------------------------------------------- //
// Public portal (guest, allow_guest=True)                                     //
// --------------------------------------------------------------------------- //

/** Public digital menu for a table (standard pricing + ordering/waiter toggles). */
export async function getPublicMenu(table) {
  const res = await call.get(
    "cpro.api.portal.get_public_menu",
    table ? { table } : {}
  );
  return res.message;
}

/** Fire a real-time "call waiter" alert for a table. */
export async function callWaiter(table) {
  const res = await call.post("cpro.api.portal.call_waiter", { table });
  return res.message;
}

/** Place a guest order (creates a New KOT — no financial doc). */
export async function placeGuestOrder(items, order_type, table, address, name, phone) {
  const res = await call.post("cpro.api.portal.place_guest_order", { 
    items, order_type, table, address, name, phone 
  });
  return res.message;
}

// --------------------------------------------------------------------------- //
// Management & Dashboard                                                      //
// --------------------------------------------------------------------------- //

export async function fetchCustomers(searchTerm = "") {
  const res = await call.get("cpro.api.customers.get_customers", { search_term: searchTerm });
  return res.message || [];
}

export async function addCustomer(customerName, mobileNo, emailId) {
  const res = await call.post("cpro.api.customers.create_customer", {
    customer_name: customerName,
    mobile_no: mobileNo,
    email_id: emailId
  });
  return res.message;
}

export async function fetchInventory(warehouse = null) {
  const res = await call.get("cpro.api.inventory.get_inventory_list", warehouse ? { warehouse } : {});
  return res.message || [];
}

export async function fetchSalesReports(startDate, endDate) {
  const payload = {};
  if (startDate) payload.start_date = startDate;
  if (endDate) payload.end_date = endDate;
  const res = await call.get("cpro.api.dashboard.get_sales_reports", payload);
  return res.message || [];
}

// --------------------------------------------------------------------------- //
// Errors                                                                      //
// --------------------------------------------------------------------------- //

export function errorMessage(err) {
  try {
    if (err && err._server_messages) {
      const messages = JSON.parse(err._server_messages);
      const first = JSON.parse(messages[0]);
      if (first && first.message) return String(first.message);
    }
  } catch (e) {
    /* fall through */
  }
  let msg = (err && (err.message || err.exception)) || "Something went wrong. Please try again.";
  if (typeof msg !== "string") {
    try {
      msg = JSON.stringify(msg);
    } catch (e) {
      msg = String(msg);
    }
  }
  return msg;
}
