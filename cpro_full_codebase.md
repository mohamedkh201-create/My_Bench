This document contains the complete codebase for the 'cpro' application.
The application consists of a Backend (Frappe/Python) and a Frontend (React/Vite).
Backend files are located primarily in the `cpro/` directory.
Frontend files are located in the `frontend/` directory.

Please review the following file tree and file contents to understand the codebase. I will ask you to make modifications afterwards.

### Directory Tree

```
cpro/
├── README.md
├── cpro/
│   ├── __init__.py
│   ├── api/
│   │   ├── __init__.py
│   │   ├── allow_negative_stock.py
│   │   ├── customers.py
│   │   ├── dashboard.py
│   │   ├── health.py
│   │   ├── inventory.py
│   │   ├── kitchen.py
│   │   ├── management.py
│   │   ├── menu.py
│   │   ├── portal.py
│   │   ├── pos.py
│   │   ├── pricing.py
│   │   ├── setup_management_links.py
│   │   ├── shift.py
│   │   ├── test_debug.py
│   │   ├── test_totals.py
│   │   ├── users.py
│   │   └── utils.py
│   ├── check_item.py
│   ├── config/
│   │   └── __init__.py
│   ├── cpro/
│   │   ├── __init__.py
│   │   ├── doctype/
│   │   │   ├── __init__.py
│   │   │   ├── cpro_item_modifier_group/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── cpro_item_modifier_group.json
│   │   │   │   └── cpro_item_modifier_group.py
│   │   │   ├── cpro_kitchen_station/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── cpro_kitchen_station.json
│   │   │   │   └── cpro_kitchen_station.py
│   │   │   ├── cpro_kot/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── cpro_kot.json
│   │   │   │   └── cpro_kot.py
│   │   │   ├── cpro_kot_item/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── cpro_kot_item.json
│   │   │   │   └── cpro_kot_item.py
│   │   │   ├── cpro_menu/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── cpro_menu.json
│   │   │   │   └── cpro_menu.py
│   │   │   ├── cpro_menu_category/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── cpro_menu_category.json
│   │   │   │   └── cpro_menu_category.py
│   │   │   ├── cpro_menu_item/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── cpro_menu_item.json
│   │   │   │   └── cpro_menu_item.py
│   │   │   ├── cpro_modifier/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── cpro_modifier.json
│   │   │   │   └── cpro_modifier.py
│   │   │   ├── cpro_modifier_group/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── cpro_modifier_group.json
│   │   │   │   └── cpro_modifier_group.py
│   │   │   ├── cpro_order_audit_log/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── cpro_order_audit_log.js
│   │   │   │   ├── cpro_order_audit_log.json
│   │   │   │   ├── cpro_order_audit_log.py
│   │   │   │   └── test_cpro_order_audit_log.py
│   │   │   ├── cpro_portal_banner/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── cpro_portal_banner.json
│   │   │   │   └── cpro_portal_banner.py
│   │   │   ├── cpro_portal_settings/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── cpro_portal_settings.js
│   │   │   │   ├── cpro_portal_settings.json
│   │   │   │   ├── cpro_portal_settings.py
│   │   │   │   └── test_cpro_portal_settings.py
│   │   │   ├── cpro_pos_balance_detail/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── cpro_pos_balance_detail.json
│   │   │   │   └── cpro_pos_balance_detail.py
│   │   │   ├── cpro_pos_closing_shift/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── cpro_pos_closing_shift.json
│   │   │   │   └── cpro_pos_closing_shift.py
│   │   │   ├── cpro_pos_opening_shift/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── cpro_pos_opening_shift.json
│   │   │   │   └── cpro_pos_opening_shift.py
│   │   │   ├── cpro_room/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── cpro_room.json
│   │   │   │   └── cpro_room.py
│   │   │   ├── cpro_settings/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── cpro_settings.json
│   │   │   │   └── cpro_settings.py
│   │   │   └── cpro_table/
│   │   │       ├── __init__.py
│   │   │       ├── cpro_table.json
│   │   │       └── cpro_table.py
│   │   └── workspace/
│   │       ├── __init__.py
│   │       └── restaurant_management/
│   │           ├── __init__.py
│   │           └── restaurant_management.json
│   ├── create_portal_request.py
│   ├── custom_fields.py
│   ├── desktop_icon/
│   │   ├── cpro.json
│   │   └── restaurant_management.json
│   ├── fix_files.py
│   ├── hooks.py
│   ├── install.py
│   ├── modules.txt
│   ├── patches/
│   │   ├── __init__.py
│   │   └── v0_1/
│   │       ├── __init__.py
│   │       └── apply_cpro_custom_fields.py
│   ├── patches.txt
│   ├── scratch_add.py
│   ├── spa_boot.py
│   ├── templates/
│   │   ├── __init__.py
│   │   └── pages/
│   │       └── __init__.py
│   ├── workspace_sidebar/
│   │   └── restaurant_management.json
│   └── www/
│       ├── __init__.py
│       ├── cpro.html
│       ├── cpro.py
│       ├── menu.html
│       └── menu.py
├── create_audit_log_doctype.py
├── frontend/
│   ├── index.html
│   ├── jsconfig.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── src/
│   │   ├── App.jsx
│   │   ├── api/
│   │   │   ├── auth.js
│   │   │   ├── orders.js
│   │   │   └── users.js
│   │   ├── components/
│   │   │   ├── ErrorBoundary.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── StatCard.jsx
│   │   │   ├── dashboard/
│   │   │   │   ├── DashboardStatsGrid.jsx
│   │   │   │   ├── DashboardTopTables.jsx
│   │   │   │   ├── HourlySalesChart.jsx
│   │   │   │   └── MiniAreaChart.jsx
│   │   │   ├── orders/
│   │   │   │   ├── OrderDetailModal.jsx
│   │   │   │   ├── OrderStatusBadge.jsx
│   │   │   │   ├── OrdersFilterBar.jsx
│   │   │   │   └── OrdersTable.jsx
│   │   │   ├── pos/
│   │   │   │   ├── POSAddCustomerModal.jsx
│   │   │   │   ├── POSCart.jsx
│   │   │   │   ├── POSCartItem.jsx
│   │   │   │   ├── POSCategoryTabs.jsx
│   │   │   │   ├── POSHeader.jsx
│   │   │   │   ├── POSItemCard.jsx
│   │   │   │   ├── POSOpenShiftModal.jsx
│   │   │   │   ├── POSProductGrid.jsx
│   │   │   │   └── buttons/
│   │   │   │       ├── POSAddCustomerButton.jsx
│   │   │   │       ├── POSClearCartButton.jsx
│   │   │   │       ├── POSCloseShiftButton.jsx
│   │   │   │       ├── POSOpenShiftButton.jsx
│   │   │   │       ├── POSRefreshButton.jsx
│   │   │   │       └── POSSubmitOrderButton.jsx
│   │   │   └── ui.jsx
│   │   ├── hooks/
│   │   │   └── usePOSLogic.js
│   │   ├── index.css
│   │   ├── kds/
│   │   │   ├── KdsPage.jsx
│   │   │   └── KotCard.jsx
│   │   ├── layout/
│   │   │   └── StaffLayout.jsx
│   │   ├── lib/
│   │   │   ├── api.js
│   │   │   ├── events.js
│   │   │   ├── format.js
│   │   │   ├── frappe.js
│   │   │   ├── session.js
│   │   │   └── socket.js
│   │   ├── main.jsx
│   │   ├── orders/
│   │   │   └── OrdersPage.jsx
│   │   ├── pages/
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── GenericManagementPage.jsx
│   │   │   ├── KitchenPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── ManagementPage.jsx
│   │   │   ├── OrdersPage.jsx
│   │   │   ├── POSPage.jsx
│   │   │   ├── ReasonsPage.jsx
│   │   │   └── UsersManagementPage.jsx
│   │   ├── portal/
│   │   │   └── PortalPage.jsx
│   │   ├── pos/
│   │   │   ├── CartPanel.jsx
│   │   │   ├── CloseShiftModal.jsx
│   │   │   ├── ItemCard.jsx
│   │   │   ├── MenuPanel.jsx
│   │   │   ├── ModifierModal.jsx
│   │   │   ├── OpenShiftScreen.jsx
│   │   │   ├── PaymentModal.jsx
│   │   │   ├── PosBoard.jsx
│   │   │   ├── PosPage.jsx
│   │   │   └── ReceiptModal.jsx
│   │   └── store/
│   │       └── cart.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── generate_md.py
├── license.txt
├── pyproject.toml
├── setup_portal.py
└── translations/
    └── ar.csv
```

### Code Files

### README.md

```markdown
<div align="center">
  <img src="cpro/public/images/cpro-logo.svg" width="96" height="96" alt="CPro"/>

  # CPro

  **Modern restaurant POS, KDS & digital ordering — built strictly on ERPNext.**
</div>

---

CPro turns ERPNext into a fast, focused food‑and‑beverage platform: a lightning‑quick
**point‑of‑sale**, a real‑time **kitchen display**, and a mobile **customer menu** — without
duplicating the accounting, stock, or tax engines ERPNext already does well.

Every order rides on ERPNext's own **POS Invoice**; stock moves through the **Stock Ledger**;
tax comes from a **Sales Taxes and Charges Template**. CPro adds only the restaurant domain on
top: shifts, menus, modifiers, tables, kitchen tickets, and three purpose‑built React screens.

> **Dependency:** `required_apps = ["erpnext"]` — nothing else. CPro is a clean, self‑contained
> app; installing or removing it never touches another custom app.

---

## The three screens

CPro ships a single React bundle that serves three screens from three routes:

| Screen | Route | Who | Auth |
|--------|-------|-----|------|
| 🧾 **POS** | `/cpro` | Cashier · Waiter · Manager | Login required |
| 🍳 **Kitchen Display (KDS)** | `/cpro/kds` | Kitchen · Manager | Login required |
| 📱 **Digital Menu** | `/menu?table=<slug>` | Customers (guests) | Public |

Staff toggle between POS and KDS from the in‑app header. Customers reach the digital menu by
scanning a QR code that encodes their table's `portal_slug`.

The desk hub for administrators is the **Restaurant Management** workspace
(`/app/restaurant-management`), which carries shortcuts to all three screens plus every master,
report, and setting.

---

## Feature guide

### 1 · POS Shift Management

A cashier **cannot take an order until a shift is open**, and closes it with a **cash
reconciliation** at hand‑off. All money is computed **server‑side** from the shift's invoices —
the client never dictates totals.

- **Open** — pick a POS Profile and declare the opening float per payment mode. This creates and
  submits a `Cpro POS Opening Shift` (status → **Open**). Every `POS Invoice` raised afterwards is
  stamped with `cpro_pos_opening_shift`.
- **Close** — the close‑out screen previews sales (paid invoices, open tabs, items, grand total)
  and a reconciliation table of **expected vs. counted** cash per mode. Submitting a
  `Cpro POS Closing Shift` closes the opening shift (status → **Closed**) and records the
  **difference** (`counted − expected`) per payment mode.
- **Source of truth** — expected cash is summed from `Sales Invoice Payment` rows of *submitted*
  (paid) POS Invoices; draft orders are reported separately as **open tabs**, never counted as cash.

> The POS screen is a hard **gate**: no open shift → the cashier sees the Open‑Shift screen and
> nothing else. Cancelling a closing shift re‑opens the original so it can be reconciled again.

### 2 · Menu Management

Two sources, one payload — so POS and the digital menu always agree:

- **Curated (primary):** a `Cpro Menu` dictates exactly which items appear, under which
  `Cpro Menu Category`, in what order, with optional display‑name overrides and a *featured* flag.
  Categories carry a `display_name`, `sequence`, and `is_active`; item rows carry `display_name`,
  `sequence`, `hidden`, and `is_featured`. The default active menu is used unless a specific one is
  requested.
- **Fallback:** when no active menu exists, the menu is derived from every `Item` flagged
  `cpro_show_in_menu`, grouped by its ERPNext **Item Group** — so a fresh install works immediately.

Only enabled, sellable items (`disabled = 0`, `is_sales_item = 1`) ever reach a guest, and the
guest‑order endpoint re‑validates every line against this same menu — a customer can never order
something that isn't actually on it.

### 3 · Web Portal (Digital Menu)

A mobile‑first public page at **`/menu`**. Scanning a table's QR opens `/menu?table=<slug>`.

- **Browse** by category with live prices and availability.
- **Guest ordering** — gated by the **Allow Guest Orders** toggle in `Cpro Settings`. When on (and a
  table is identified), the guest can order directly from the page; the order creates a **Kitchen
  Order Ticket only** — never a financial document. A cashier turns it into a POS Invoice. When off,
  the page is **view‑only**.
- **Call Waiter** — gated by the **Enable Call Waiter** toggle. The button fires an instant realtime
  alert carrying the table number to every open POS/waiter screen (see [Realtime](#realtime)).

Guests only ever call `allow_guest` endpoints, and every action is re‑checked server‑side against
the settings toggles — the client cannot bypass a disabled feature.

### 4 · Kitchen Display System (KDS)

A dedicated kitchen screen at **`/cpro/kds`**, gated to the **Cpro Kitchen** / **Cpro Manager**
roles.

- Live board of active tickets (`New` · `Preparing` · `Ready`), oldest first, with age accents
  (amber > 5 min, red > 10 min).
- **Per‑item** advance (one dish is ready) and **whole‑ticket** advance:
  `New → Preparing → Ready → Served`. Advancing a ticket cascades to its lines.
- Filter by **kitchen station** and by status; new tickets and status changes arrive in real time,
  backed by an 8‑second poll so the board is correct even if the socket drops.

Items route to stations via the `cpro_kitchen_station` field on the `Item` (or per KOT line).

### 5 · Restaurant Management workspace

One desk hub, logically grouped, with **shortcuts to everything** — POS, Kitchen Display, Digital
Menu, Open/Close Shift, Menu, Modifiers, Tables, Reports (Sales Register), and Settings — plus card
groups for **Operations**, **Shifts and Cash**, **Menu Management**, **Floor and Tables**,
**Reports**, and **Setup**.

---

## Business logic

### Modifiers

Modifiers are add‑ons/choices attached to a dish. A `Cpro Modifier Group` defines the *rules*
(`selection_type`, `is_required`, `min_selection`, `max_selection`); its `Cpro Modifier` rows define
the *choices* (`modifier_name`, `rate`, `default_selected`, `is_available`, and an optional linked
`item`). Groups attach to a dish through the `Cpro Item Modifier Group` table on the `Item`.

Two pricing behaviours, decided per modifier:

| Modifier | Behaviour on the invoice |
|----------|--------------------------|
| **No linked item** (e.g. *"Extra spicy"*, *"Well done"*) | Its `rate` **folds into the parent line's rate** — one clean line. |
| **Linked to a stock `Item`** (e.g. *"Add cheese"*, *"Extra shot"*) | Posts as its **own invoice line** so the add‑on's stock/BOM is accounted by ERPNext. |

The human‑readable list of chosen modifiers is kept on the parent line's description and on the KOT.

### Stock & availability

CPro **reads** stock to gate the menu and lets **ERPNext move** it — it never writes its own ledger
entries.

- **Availability (menu graying):** an item is available when it has finished stock on hand **or** it
  has an active **BOM** whose raw materials can each cover at least one finished unit. Non‑stock
  items (services / made‑to‑order) are always available. The check is deliberately **fail‑open** —
  any lookup error resolves to *available*, so a stock glitch never empties the menu.
- **Deduction:** when the POS Profile has **Update Stock** enabled, submitting the paid POS Invoice
  moves stock through ERPNext's native Stock Ledger. Because stock‑item modifiers post as their own
  lines, their consumption is captured too.

### Pricing

Rates are resolved in strict precedence and applied as manual line rates with
`ignore_pricing_rule = 1`, keeping CPro authoritative over price:

1. the **customer's** `default_price_list`, then
2. **Cpro Settings → Default Selling Price List**, then
3. `Standard Selling`.

Lookups are batched (one query per price list) and pick the most recent `Item Price` by
`valid_from`. Items missing from a customer's partial price list fall back to the default, so every
dish always shows a price.

### Taxes & charges

Every order is stamped with the **Sales Taxes and Charges Template** configured in `Cpro Settings`,
and ERPNext computes VAT / service charge from it. The settings also record the intended rates —
**VAT** (seeded at **14%**) and an optional **Service Charge** — so the template and the app agree.
Net, tax, and grand totals returned to the POS come straight from the saved invoice.

### Shifts & cash (recap)

Opening float + counted cash are the only figures a human enters. Sales totals and *expected* cash
are always recomputed from the shift's submitted POS Invoices at preview and again on submit, so a
closing shift can never disagree with the invoices behind it.

---

## Data model

| Area | DocTypes |
|------|----------|
| **Settings** | `Cpro Settings` — pricing, VAT & service‑charge toggles, guest orders, Call‑Waiter, auto‑KOT |
| **Shifts** | `Cpro POS Opening Shift` (+ `Cpro POS Balance Detail`), `Cpro POS Closing Shift` |
| **Menu** | `Cpro Menu` (+ `Cpro Menu Item`), `Cpro Menu Category` |
| **Modifiers** | `Cpro Modifier Group` (+ `Cpro Modifier`), attached via `Cpro Item Modifier Group` |
| **Floor plan** | `Cpro Room`, `Cpro Table` (status + QR `portal_slug`) |
| **Kitchen** | `Cpro Kitchen Station`, `Cpro KOT` (+ `Cpro KOT Item`) — `New → Preparing → Ready → Served` |

**Custom fields (`cpro_`), added on install, removed cleanly on uninstall:**

| DocType | Fields |
|---------|--------|
| `Item` | `cpro_show_in_menu`, `cpro_kitchen_station`, `cpro_modifier_groups` |
| `POS Invoice` | `cpro_order_type` (Dine In / Take Away / Delivery), `cpro_table`, `cpro_pos_opening_shift` |
| `POS Invoice Item` | `cpro_notes` — **critical prep notes** (e.g. *"No onions"*, *"Peanut allergy"*), surfaced in **red** on POS, receipt, and KDS |

CPro deliberately keeps this footprint tiny — a handful of namespaced fields versus a legacy sprawl —
reusing ERPNext everywhere it can.

---

## Roles & permissions

Four roles are created automatically on install; **System Manager** always passes.

| Role | Can |
|------|-----|
| **Cpro Manager** | Everything — POS, KDS, shifts, menus, settings, reports |
| **Cpro Cashier** | Open/close shifts, take & pay orders on the POS |
| **Cpro Waiter** | Take orders on the POS (no shift open/close) |
| **Cpro Kitchen** | The KDS board — advance ticket / item status |

Every whitelisted API method is guarded by these roles server‑side and returns a graceful, localized
permission error rather than a raw stack trace. UI role checks are convenience only — the server is
the boundary.

---

## Realtime

CPro publishes two site‑wide events with `frappe.publish_realtime` (no room). Frappe's socket server
delivers site broadcasts only to **System Users** (logged‑in staff), so guests never receive them —
no backend change required.

| Event | Fired by | Consumed by | Payload |
|-------|----------|-------------|---------|
| `cpro_kot_update` | KOT create / status change | **KDS** (and POS) | `{ name, status, kitchen_station, table }` |
| `cpro_call_waiter` | Digital menu **Call Waiter** | **POS / waiter** screens | `{ table }` |

The React clients connect to the site's socket namespace with credentials and treat realtime as an
*enhancement* — polling (KDS) and explicit refresh remain the guarantee if the socket is unavailable.

---

## Settings reference (`Cpro Settings`)

| Field | Purpose |
|-------|---------|
| **Company** | Company for defaults (currency, warehouse) |
| **Default Selling Price List** | Fallback price list (seeded to *Standard Selling* when present) |
| **Currency** | Display currency |
| **Allow Guest Orders** | Master switch for digital‑menu ordering (off → view‑only) |
| **Enable Call Waiter** | Master switch for the Call‑Waiter button (seeded **on**) |
| **Auto‑create KOT** | Automatically raise/refresh a kitchen ticket when a POS order is saved |
| **Enable VAT** / **VAT Rate (%)** | VAT declaration (seeded **14%**) |
| **Enable Service Charge** / **Service Charge Rate (%)** | Optional service charge |
| **Sales Taxes and Charges Template** | The template applied to every order |

---

## Architecture

- **One bundle, three screens.** React 19 + Vite + Tailwind, React Router with routes `/cpro`,
  `/cpro/kds`, `/menu`. State via Zustand; API via `frappe-js-sdk`.
- **Serving.** `vite build` emits to `cpro/public/spa/` (served at `/assets/cpro/spa/`) and copies
  `index.html` to `www/cpro.html` (login‑gated: `www/cpro.py`) and `www/menu.html` (guest:
  `www/menu.py`). Each www page injects a fresh CSRF token and the session boot payload so the
  same‑origin SDK client is authorized.
- **Routing.** `website_route_rules` map `/cpro/<path>` → `cpro` and `/menu/<path>` → `menu`, so the
  client‑side router owns navigation under each. `/cpro/kds` is therefore served (login‑gated) by the
  same page as the POS.
- **Backend.** Thin, role‑guarded whitelisted APIs under `cpro/api/` (`menu`, `pos`, `shift`,
  `kitchen`, `portal`, `pricing`, `inventory`) that orchestrate native ERPNext documents.

```
cpro/
├── api/               # whitelisted endpoints (menu, pos, shift, kitchen, portal, pricing, inventory)
├── cpro/doctype/      # Cpro DocTypes
├── cpro/workspace/    # Restaurant Management workspace
├── www/               # cpro.py / menu.py — SPA entry pages
├── custom_fields.py   # the cpro_ custom fields
├── install.py         # roles + settings seeding
└── public/spa/        # built React bundle (generated)
frontend/              # React source (Vite)
├── src/pos/           # POS: gate, board, cart, modifiers, shift open/close
├── src/kds/           # Kitchen Display
├── src/portal/        # customer digital menu
└── src/lib/           # api, socket, session, events, format helpers
```

---

## Setup & build

**1 · Install the app**

```bash
cd $PATH_TO_YOUR_BENCH
bench --site <your-site> install-app cpro
```

The installer creates the four roles, applies the `cpro_` custom fields, and seeds `Cpro Settings`
(VAT 14%, Call‑Waiter on, Standard Selling price list when present).

**2 · Build the React screens**

```bash
cd apps/cpro/frontend
yarn install
yarn build     # → cpro/public/spa + www/cpro.html + www/menu.html
```

**3 · Sync & clear caches**

```bash
bench --site <your-site> migrate
bench --site <your-site> clear-cache
bench --site <your-site> clear-website-cache
```

**4 · Configure**

1. Open **Restaurant Management** (`/app/restaurant-management`).
2. Set **Cpro Settings** — Company, price list, tax template, toggles.
3. Create a **POS Profile** (assign users; enable **Update Stock** if you want stock to move) and set
   its payment modes.
4. Build the menu — a **Cpro Menu** with **Menu Categories**, or just flag items with **Show in
   Menu**. Add **Modifier Groups** where needed and attach them to items.
5. Define **Rooms**, **Tables** (each gets a `portal_slug` for its QR), and **Kitchen Stations**;
   set each item's kitchen station.
6. Assign staff their **Cpro** roles.

**5 · Go live**

- Cashiers/waiters → `/cpro` (open a shift first).
- Kitchen → `/cpro/kds`.
- Print each table's QR pointing at `/menu?table=<portal_slug>`.

---

## Development

```bash
cd apps/cpro/frontend
yarn dev       # Vite dev server (proxy API calls to your bench site)
```

Pre‑commit hooks (ruff, eslint, prettier, pyupgrade):

```bash
cd apps/cpro
pre-commit install
```

**Conventions:** React components are `.jsx` (no TypeScript). The backend depends only on
`frappe` + `erpnext`. User‑facing strings go through `frappe._` / the client formatter for
localization.

---

## License

MIT

```

### create_audit_log_doctype.py

```python
import frappe

def create_doctype():
    if frappe.db.exists("DocType", "Cpro Order Audit Log"):
        return "Already exists"
        
    doc = frappe.get_doc({
        "doctype": "DocType",
        "name": "Cpro Order Audit Log",
        "module": "Cpro",
        "custom": 0, # Part of the app
        "istable": 0,
        "naming_rule": "Expression",
        "autoname": "format:AUDIT-{YY}-{MM}-{#####}",
        "field_order": ["pos_invoice", "action", "reason", "user", "timestamp"],
        "fields": [
            {
                "fieldname": "pos_invoice",
                "fieldtype": "Link",
                "label": "POS Invoice",
                "options": "POS Invoice",
                "reqd": 1,
                "in_list_view": 1
            },
            {
                "fieldname": "action",
                "fieldtype": "Select",
                "label": "Action",
                "options": "Cancelled\nAmended",
                "reqd": 1,
                "in_list_view": 1
            },
            {
                "fieldname": "reason",
                "fieldtype": "Small Text",
                "label": "Reason",
                "reqd": 1
            },
            {
                "fieldname": "user",
                "fieldtype": "Link",
                "label": "User",
                "options": "User",
                "reqd": 1,
                "in_list_view": 1
            },
            {
                "fieldname": "timestamp",
                "fieldtype": "Datetime",
                "label": "Timestamp",
                "reqd": 1,
                "in_list_view": 1
            }
        ],
        "permissions": [
            {
                "role": "Cpro Manager",
                "read": 1,
                "write": 1,
                "create": 1,
                "delete": 0
            },
            {
                "role": "Cpro Cashier",
                "read": 1,
                "write": 1,
                "create": 1,
                "delete": 0
            },
            {
                "role": "System Manager",
                "read": 1,
                "write": 1,
                "create": 1,
                "delete": 1
            }
        ],
        "is_submittable": 0
    })
    doc.insert(ignore_permissions=True)
    return "Created"

```

### generate_md.py

```python
import os
import subprocess

app_dir = "/home/user/test/apps/cpro"
output_file = "/home/user/test/cpro_full_codebase.md"

exclude_dirs = {'node_modules', '.git', '__pycache__', 'build', 'dist', 'public', 'assets', 'env'}
exclude_exts = {'.pyc', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.woff', '.woff2', '.ttf', '.eot', '.pdf', '.lock', '.zip', '.tar', '.gz'}
exclude_files = {'yarn.lock', 'package-lock.json'}

with open(output_file, 'w', encoding='utf-8') as out:
    out.write("This document contains the complete codebase for the 'cpro' application.\n")
    out.write("The application consists of a Backend (Frappe/Python) and a Frontend (React/Vite).\n")
    out.write("Backend files are located primarily in the `cpro/` directory.\n")
    out.write("Frontend files are located in the `frontend/` directory.\n\n")
    out.write("Please review the following file tree and file contents to understand the codebase. I will ask you to make modifications afterwards.\n\n")
    
    # Directory Structure
    out.write("### Directory Tree\n\n")
    out.write("```\n")
    
    def generate_tree(dir_path, prefix=""):
        try:
            entries = os.listdir(dir_path)
        except OSError:
            return
            
        entries = sorted([e for e in entries if e not in exclude_dirs and e not in exclude_files and not e.startswith('.')])
        
        for i, entry in enumerate(entries):
            path = os.path.join(dir_path, entry)
            is_last = (i == len(entries) - 1)
            connector = "└── " if is_last else "├── "
            
            if os.path.isdir(path):
                out.write(prefix + connector + entry + "/\n")
                extension = "    " if is_last else "│   "
                generate_tree(path, prefix + extension)
            else:
                if not any(entry.endswith(ext) for ext in exclude_exts):
                    out.write(prefix + connector + entry + "\n")

    out.write("cpro/\n")
    generate_tree(app_dir)
    out.write("```\n\n")

    # File Contents
    out.write("### Code Files\n\n")

    for root, dirs, files in os.walk(app_dir):
        # Modify dirs in place to skip excluded directories and sort them
        dirs[:] = sorted([d for d in dirs if d not in exclude_dirs and not d.startswith('.')])
        
        for file in sorted(files):
            if file in exclude_files or file.startswith('.'):
                continue
            if any(file.endswith(ext) for ext in exclude_exts):
                continue
            
            filepath = os.path.join(root, file)
            relpath = os.path.relpath(filepath, app_dir)
            
            out.write(f"### {relpath}\n\n")
            
            # Determine language for markdown block
            ext = os.path.splitext(file)[1].lower()
            lang = ""
            if ext == '.py': lang = "python"
            elif ext in ['.js', '.jsx']: lang = "javascript"
            elif ext in ['.ts', '.tsx']: lang = "typescript"
            elif ext == '.html': lang = "html"
            elif ext == '.css': lang = "css"
            elif ext == '.json': lang = "json"
            elif ext == '.md': lang = "markdown"
            elif ext in ['.yml', '.yaml']: lang = "yaml"
            
            out.write(f"```{lang}\n")
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    out.write(f.read())
            except Exception as e:
                out.write(f"// Error reading file (possibly binary or wrong encoding): {e}\n")
            
            if not out.tell() or out.tell() == 0:
                out.write("\n")
            out.write("\n```\n\n")

print(f"Export completed. File saved at: {output_file}")

```

### license.txt

```
mit
```

### pyproject.toml

```
[project]
name = "cpro"
authors = [
    { name = "ahmed hashim", email = "eng.ahmedhashim@gmail.com"}
]
description = "casher pro"
requires-python = ">=3.14"
readme = "README.md"
dynamic = ["version"]
dependencies = [
    # "frappe~=16.0.0" # Installed and managed by bench.
]

[build-system]
requires = ["flit_core >=3.4,<4"]
build-backend = "flit_core.buildapi"

# These dependencies are only installed when developer mode is enabled
[tool.bench.dev-dependencies]
# package_name = "~=1.1.0"

# These apt dependencies will be installed from Ubuntu repositories when you host your app on Frappe Cloud
[deploy.dependencies.apt]
packages = []

[tool.ruff]
line-length = 110
target-version = "py314"

[tool.ruff.lint]
select = [
    "F",
    "E",
    "W",
    "I",
    "UP",
    "B",
    "RUF",
]
ignore = [
    "B017", # assertRaises(Exception) - should be more specific
    "B018", # useless expression, not assigned to anything
    "B023", # function doesn't bind loop variable - will have last iteration's value
    "B904", # raise inside except without from
    "E101", # indentation contains mixed spaces and tabs
    "E402", # module level import not at top of file
    "E501", # line too long
    "E741", # ambiguous variable name
    "F401", # "unused" imports
    "F403", # can't detect undefined names from * import
    "F405", # can't detect undefined names from * import
    "F722", # syntax error in forward type annotation
    "W191", # indentation contains tabs
    "UP030", # Use implicit references for positional format fields (translations)
    "UP031", # Use format specifiers instead of percent format
    "UP032", # Use f-string instead of `format` call (translations)
    "UP037", # quoted annotations
    "UP040", # Use type aliases instead of type annotations
]
typing-modules = ["frappe.types.DF"]

[tool.ruff.format]
quote-style = "double"
indent-style = "tab"
docstring-code-format = true

```

### setup_portal.py

```python
import frappe
from frappe.custom.doctype.custom_field.custom_field import create_custom_fields

def setup():
    # 1. Create Child Table for Banners
    if not frappe.db.exists("DocType", "Cpro Portal Banner"):
        doc = frappe.get_doc({
            "doctype": "DocType",
            "name": "Cpro Portal Banner",
            "module": "Cpro",
            "custom": 0,
            "istable": 1,
            "fields": [
                {
                    "fieldname": "image",
                    "fieldtype": "Attach Image",
                    "label": "Banner Image",
                    "reqd": 1,
                    "in_list_view": 1
                }
            ]
        })
        doc.insert(ignore_permissions=True)
        print("Created Cpro Portal Banner")

    # 2. Create Single DocType for Settings
    if not frappe.db.exists("DocType", "Cpro Portal Settings"):
        doc = frappe.get_doc({
            "doctype": "DocType",
            "name": "Cpro Portal Settings",
            "module": "Cpro",
            "custom": 0,
            "issingle": 1,
            "fields": [
                {
                    "fieldname": "enable_online_ordering",
                    "fieldtype": "Check",
                    "label": "Enable Online Ordering (Add to Cart)",
                    "default": "1"
                },
                {
                    "fieldname": "banners_section",
                    "fieldtype": "Section Break",
                    "label": "Banners"
                },
                {
                    "fieldname": "banners",
                    "fieldtype": "Table",
                    "label": "Banners",
                    "options": "Cpro Portal Banner"
                }
            ],
            "permissions": [
                {
                    "role": "Cpro Manager",
                    "read": 1,
                    "write": 1,
                    "create": 1
                }
            ]
        })
        doc.insert(ignore_permissions=True)
        print("Created Cpro Portal Settings")

    # 3. Create Custom Fields on POS Invoice
    custom_fields = {
        "POS Invoice": [
            {
                "fieldname": "cpro_source",
                "label": "Order Source",
                "fieldtype": "Select",
                "options": "POS\nPortal",
                "insert_after": "cpro_order_type",
                "default": "POS"
            },
            {
                "fieldname": "cpro_customer_phone",
                "label": "Customer Phone (Portal)",
                "fieldtype": "Data",
                "insert_after": "customer"
            },
            {
                "fieldname": "cpro_delivery_address",
                "label": "Delivery Address",
                "fieldtype": "Small Text",
                "insert_after": "cpro_source"
            }
        ]
    }
    
    create_custom_fields(custom_fields, ignore_validate=True)
    print("Created Custom Fields on POS Invoice")
    
    frappe.db.commit()

setup()

```

### cpro/__init__.py

```python
__version__ = "0.0.1"

```

### cpro/check_item.py

```python
import frappe

def run():
    meta = frappe.get_meta("Item")
    for f in meta.fields:
        if "cat" in f.fieldname.lower() or (f.label and "cat" in f.label.lower()):
            print(f"{f.fieldname} ({f.label})")

```

### cpro/create_portal_request.py

```python
import frappe
from frappe.custom.doctype.custom_field.custom_field import create_custom_fields

def create_doctype():
    if not frappe.db.exists("DocType", "Cpro Portal Request"):
        doc = frappe.get_doc({
            "doctype": "DocType",
            "name": "Cpro Portal Request",
            "module": "Cpro",
            "custom": 1,
            "istable": 0,
            "naming_rule": "Expression",
            "autoname": "REQ-.YYYY.-.#####",
            "fields": [
                {"fieldname": "request_type", "label": "Type", "fieldtype": "Select", "options": "Order\nCall Waiter", "in_list_view": 1, "reqd": 1},
                {"fieldname": "status", "label": "Status", "fieldtype": "Select", "options": "Pending\nCompleted\nCancelled", "default": "Pending", "in_list_view": 1, "reqd": 1},
                {"fieldname": "column_break_1", "fieldtype": "Column Break"},
                {"fieldname": "customer_name", "label": "Customer Name", "fieldtype": "Data"},
                {"fieldname": "phone", "label": "Phone", "fieldtype": "Data"},
                {"fieldname": "section_break_1", "fieldtype": "Section Break"},
                {"fieldname": "table_number", "label": "Table Number", "fieldtype": "Data", "in_list_view": 1},
                {"fieldname": "order_type", "label": "Order Type", "fieldtype": "Select", "options": "Dine In\nDelivery"},
                {"fieldname": "address", "label": "Address", "fieldtype": "Data"},
                {"fieldname": "section_break_2", "fieldtype": "Section Break", "label": "Payload"},
                {"fieldname": "order_payload", "label": "Order Payload (JSON)", "fieldtype": "Code", "options": "JSON"}
            ],
            "permissions": [{"role": "System Manager", "read": 1, "write": 1, "create": 1, "delete": 1}]
        })
        doc.insert(ignore_permissions=True)
        print("Created Cpro Portal Request DocType")
    else:
        print("Cpro Portal Request DocType already exists")

    frappe.db.commit()


```

### cpro/custom_fields.py

```python
# Copyright (c) 2026, ahmed hashim and contributors
# For license information, please see license.txt

"""
Minimal, namespaced (``cpro_``) custom fields that bridge CPro's restaurant
domain onto ERPNext's native POS engine (POS Invoice, Item). Kept deliberately
small — the legacy ury app carried ~210 custom fields; CPro reuses ERPNext where
it can and adds only what F&B genuinely needs.
"""

import frappe
from frappe.custom.doctype.custom_field.custom_field import create_custom_fields

CUSTOM_FIELDS = {
	# Item — menu attributes: KDS routing, modifier groups, menu visibility.
	"Item": [
		{
			"fieldname": "cpro_restaurant_section",
			"fieldtype": "Section Break",
			"label": "Restaurant",
			"insert_after": "item_group",
			"collapsible": 1,
		},
		{
			"fieldname": "cpro_show_in_menu",
			"fieldtype": "Check",
			"label": "Show in Menu",
			"default": "1",
			"insert_after": "cpro_restaurant_section",
		},
		{
			"fieldname": "cpro_kitchen_station",
			"fieldtype": "Link",
			"label": "Kitchen Station",
			"options": "Cpro Kitchen Station",
			"insert_after": "cpro_show_in_menu",
		},
		{
			"fieldname": "cpro_column_break",
			"fieldtype": "Column Break",
			"insert_after": "cpro_kitchen_station",
		},
		{
			"fieldname": "cpro_modifier_groups",
			"fieldtype": "Table",
			"label": "Modifier Groups",
			"options": "Cpro Item Modifier Group",
			"insert_after": "cpro_column_break",
		},
	],
	# POS Invoice — dine-in context (order type + table) and the owning shift.
	"POS Invoice": [
		{
			"fieldname": "cpro_order_type",
			"fieldtype": "Select",
			"label": "Order Type",
			"options": "Dine In\nTake Away\nDelivery",
			"default": "Dine In",
			"insert_after": "customer",
			"in_standard_filter": 1,
		},
		{
			"fieldname": "cpro_table",
			"fieldtype": "Link",
			"label": "Table",
			"options": "Cpro Table",
			"insert_after": "cpro_order_type",
			"depends_on": "eval:doc.cpro_order_type=='Dine In'",
		},
		{
			"fieldname": "cpro_pos_opening_shift",
			"fieldtype": "Link",
			"label": "POS Opening Shift",
			"options": "Cpro POS Opening Shift",
			"insert_after": "cpro_table",
			"read_only": 1,
			"in_standard_filter": 1,
			"no_copy": 1,
		},
		{
			"fieldname": "cpro_is_cancelled",
			"fieldtype": "Check",
			"label": "Is Cancelled",
			"insert_after": "cpro_pos_opening_shift",
			"default": "0",
			"read_only": 1,
		},
		{
			"fieldname": "cpro_cancel_reason",
			"fieldtype": "Small Text",
			"label": "Cancel Reason",
			"insert_after": "cpro_is_cancelled",
			"read_only": 1,
		},
		{
			"fieldname": "cpro_cancel_food_status",
			"fieldtype": "Data",
			"label": "Cancel Food Status",
			"insert_after": "cpro_cancel_reason",
			"read_only": 1,
		},
	],
	# POS Invoice Item — per-line critical notes (highlighted RED on POS/receipt/KDS).
	"POS Invoice Item": [
		{
			"fieldname": "cpro_notes",
			"fieldtype": "Small Text",
			"label": "Notes",
			"insert_after": "item_name",
			"description": "Critical prep notes, e.g. \"No onions\", \"Peanut allergy\".",
		},
	],
}


def apply_cpro_custom_fields():
	"""Create/update all CPro custom fields. Idempotent (safe to re-run on migrate)."""
	create_custom_fields(CUSTOM_FIELDS, ignore_validate=True)


def remove_cpro_custom_fields():
	"""Remove CPro custom fields (used on uninstall)."""
	for doctype, fields in CUSTOM_FIELDS.items():
		for field in fields:
			name = f"{doctype}-{field['fieldname']}"
			if frappe.db.exists("Custom Field", name):
				frappe.delete_doc("Custom Field", name, ignore_permissions=True)

```

### cpro/fix_files.py

```python
import frappe
def make_public():
    files = frappe.get_all('File', filters={'file_url': ['like', '/private/files/%']})
    for f in files:
        doc = frappe.get_doc('File', f.name)
        doc.is_private = 0
        doc.save(ignore_permissions=True)
    frappe.db.commit()
    print('Done fixing {} files'.format(len(files)))

```

### cpro/hooks.py

```python
app_name = "cpro"
app_title = "Cpro"
app_publisher = "ahmed hashim"
app_description = "casher pro"
app_email = "eng.ahmedhashim@gmail.com"
app_license = "mit"

# Apps
# ------------------

# CPro builds strictly on top of ERPNext (POS Invoice, Stock, BOM, Taxes).
required_apps = ["erpnext"]

# Each item in the list will be shown as an app in the apps page
add_to_apps_screen = [
	{
		"name": "cpro",
		"logo": "/assets/cpro/images/cpro-logo.svg",
		"title": "CPro",
		"route": "/app/restaurant-management",
	}
]

# Website (SPA serving)
# ------------------
# One Vite bundle, three screens. Staff POS + KDS live under /cpro (login-gated
# by www/cpro.py); the public digital menu lives under /menu (guest, www/menu.py).
# Sub-paths route to the same page so the client-side router handles navigation.
website_route_rules = [
	{"from_route": "/cpro/<path:app_path>", "to_route": "cpro"},
	{"from_route": "/menu/<path:app_path>", "to_route": "menu"},
]

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/cpro/css/cpro.css"
# app_include_js = "/assets/cpro/js/cpro.js"

# include js, css files in header of web template
# web_include_css = "/assets/cpro/css/cpro.css"
# web_include_js = "/assets/cpro/js/cpro.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "cpro/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Svg Icons
# ------------------
# include app icons in desk
# app_include_icons = "cpro/public/icons.svg"

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
# 	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# automatically load and sync documents of this doctype from downstream apps
# importable_doctypes = [doctype_1]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
# 	"methods": "cpro.utils.jinja_methods",
# 	"filters": "cpro.utils.jinja_filters"
# }

# Installation
# ------------

# Roles must exist before DocType permissions sync, so create them in before_install.
before_install = "cpro.install.before_install"
after_install = "cpro.install.after_install"
after_migrate = "cpro.install.after_migrate"

# Uninstallation
# ------------

before_uninstall = "cpro.install.before_uninstall"
# after_uninstall = "cpro.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "cpro.utils.before_app_install"
# after_app_install = "cpro.utils.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "cpro.utils.before_app_uninstall"
# after_app_uninstall = "cpro.utils.after_app_uninstall"

# Build
# ------------------
# To hook into the build process

# after_build = "cpro.build.after_build"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "cpro.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
# 	}
# }

# Scheduled Tasks
# ---------------

scheduler_events = {
	"weekly": [
		"cpro.api.portal.cleanup_portal_requests"
	]
}

# Testing
# -------

# before_tests = "cpro.install.before_tests"

# Extend DocType Class
# ------------------------------
#
# Specify custom mixins to extend the standard doctype controller.
# extend_doctype_class = {
# 	"Task": "cpro.custom.task.CustomTaskMixin"
# }

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "cpro.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "cpro.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["cpro.utils.before_request"]
# after_request = ["cpro.utils.after_request"]

# Job Events
# ----------
# before_job = ["cpro.utils.before_job"]
# after_job = ["cpro.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
# 	{
# 		"doctype": "{doctype_1}",
# 		"filter_by": "{filter_by}",
# 		"redact_fields": ["{field_1}", "{field_2}"],
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_2}",
# 		"filter_by": "{filter_by}",
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_3}",
# 		"strict": False,
# 	},
# 	{
# 		"doctype": "{doctype_4}"
# 	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
# 	"cpro.auth.validate"
# ]

# Automatically update python controller files with type annotations for this app.
# export_python_type_annotations = True

# default_log_clearing_doctypes = {
# 	"Logging DocType Name": 30  # days to retain logs
# }

# Translation
# ------------
# List of apps whose translatable strings should be excluded from this app's translations.
# ignore_translatable_strings_from = []


```

### cpro/install.py

```python
# Copyright (c) 2026, ahmed hashim and contributors
# For license information, please see license.txt

import click
import frappe

# Roles shipped by CPro. Created before DocType permissions are synced so that
# the DocPerm rows bind to real Role records.
CPRO_ROLES = (
	"Cpro Manager",
	"Cpro Cashier",
	"Cpro Waiter",
	"Cpro Kitchen",
)


def before_install():
	"""Ensure CPro roles exist before core DocTypes (and their permissions) sync."""
	_create_roles()


def after_install():
	"""Seed defaults so the app is usable immediately after install."""
	# Lazy import so a problem here can never break before_install (roles).
	from cpro.custom_fields import apply_cpro_custom_fields

	try:
		_create_roles()  # idempotent safety net
		apply_cpro_custom_fields()
		_seed_settings()
		click.secho("Thank you for installing CPro — modern restaurant POS on ERPNext!", fg="green")
	except Exception:
		# Never block installation on seeding; log for follow-up instead.
		frappe.log_error(title="CPro after_install seeding failed")


def after_migrate():
	"""Re-apply custom fields and roles on migrate."""
	from cpro.custom_fields import apply_cpro_custom_fields

	_create_roles()
	apply_cpro_custom_fields()


def before_uninstall():
	"""Cleanly remove CPro's footprint on shared doctypes (custom fields)."""
	from cpro.custom_fields import remove_cpro_custom_fields

	try:
		remove_cpro_custom_fields()
	except Exception:
		frappe.log_error(title="CPro before_uninstall cleanup failed")


def _create_roles():
	for role_name in CPRO_ROLES:
		if frappe.db.exists("Role", role_name):
			continue
		frappe.get_doc(
			{
				"doctype": "Role",
				"role_name": role_name,
				"desk_access": 1,
				"restrict_to_domain": "",
			}
		).insert(ignore_permissions=True)


def _seed_settings():
	"""Create the Cpro Settings single with Egyptian-market defaults if unset."""
	settings = frappe.get_single("Cpro Settings")
	dirty = False

	if not settings.get("vat_rate"):
		settings.enable_vat = 1
		settings.vat_rate = 14
		dirty = True
	if settings.get("enable_call_waiter") is None:
		settings.enable_call_waiter = 1
		dirty = True

	# Default the selling price list to the standard one when present.
	if not settings.get("default_selling_price_list") and frappe.db.exists(
		"Price List", "Standard Selling"
	):
		settings.default_selling_price_list = "Standard Selling"
		dirty = True

	if dirty:
		settings.save(ignore_permissions=True)

```

### cpro/modules.txt

```
Cpro
```

### cpro/patches.txt

```
[pre_model_sync]
# Patches added in this section will be executed before doctypes are migrated
# Read docs to understand patches: https://frappeframework.com/docs/v14/user/en/database-migrations

[post_model_sync]
# Patches added in this section will be executed after doctypes are migrated
cpro.patches.v0_1.apply_cpro_custom_fields
```

### cpro/scratch_add.py

```python
import frappe

def update_workspace():
    ws = frappe.get_doc("Workspace", "Restaurant Management")
    
    # Check if Cpro Portal Settings is already added
    has_portal_settings = any(l.link_to == "Cpro Portal Settings" for l in ws.links)
    if not has_portal_settings:
        ws.append("links", {
            "type": "Link",
            "label": "Portal Settings",
            "link_type": "DocType",
            "link_to": "Cpro Portal Settings",
            "onboard": 1
        })

    # Check if Order Audit Log is already added
    has_audit_log = any(l.link_to == "Cpro Order Audit Log" for l in ws.links)
    if not has_audit_log:
        ws.append("links", {
            "type": "Link",
            "label": "Order Audit Logs",
            "link_type": "DocType",
            "link_to": "Cpro Order Audit Log",
            "onboard": 0
        })

    # Check if Cpro Portal Banner is already added
    has_banner = any(l.link_to == "Cpro Portal Banner" for l in ws.links)
    if not has_banner:
        ws.append("links", {
            "type": "Link",
            "label": "Portal Banners",
            "link_type": "DocType",
            "link_to": "Cpro Portal Banner",
            "onboard": 0
        })

    # Check if Cpro Portal Request is already added
    has_request = any(l.link_to == "Cpro Portal Request" for l in ws.links)
    if not has_request:
        ws.append("links", {
            "type": "Link",
            "label": "Portal Requests",
            "link_type": "DocType",
            "link_to": "Cpro Portal Request",
            "onboard": 0
        })

    ws.save(ignore_permissions=True)
    
    # Export the workspace to sync it back to JSON
    # frappe.modules.export_doc takes doc, folder
    # Or just use the simpler export mechanism:
    from frappe.modules.export_file import export_to_files
    export_to_files(record_list=[["Workspace", "Restaurant Management"]], record_module="Cpro", create_init=True)

    frappe.db.commit()
    print("Workspace updated successfully.")



```

### cpro/spa_boot.py

```python
# Copyright (c) 2026, ahmed hashim and contributors
# For license information, please see license.txt

"""Shared boot-context builder for the CPro single-page-app pages.

``cpro.html`` (POS + KDS) and ``menu.html`` (guest portal) are the *same* Vite
bundle; each ``www`` page injects a fresh CSRF token and the session boot
payload so the same-origin ``frappe-js-sdk`` client is authorized. Staff pages
require a login (Guest is bounced to ``/login``); the public menu allows guests.
"""

import json
import re

import frappe
import frappe.sessions
import frappe.website.utils

# Boot JSON is embedded in the page; strip any script tags to prevent breakout.
SCRIPT_TAG_PATTERN = re.compile(r"\<script[^<]*\</script\>")
CLOSING_SCRIPT_TAG_PATTERN = re.compile(r"</script\>")


def build_spa_context(context, *, require_login: bool = False):
	"""Populate ``context`` with build_version, boot, csrf_token and app_name.

	When ``require_login`` is set and the visitor is a Guest, redirect them to
	the login page (returning here afterwards) instead of booting the app.
	"""
	if require_login and frappe.session.user == "Guest":
		frappe.local.flags.redirect_location = f"/login?redirect-to={frappe.request.path}"
		raise frappe.Redirect

	csrf_token = frappe.sessions.get_csrf_token()
	# Commit so the freshly generated CSRF token is persisted for the session.
	frappe.db.commit()  # nosemgrep

	if frappe.session.user == "Guest":
		boot = frappe.website.utils.get_boot_data()
	else:
		try:
			boot = frappe.sessions.get()
		except Exception as e:
			raise frappe.SessionBootFailed from e

	if "server_script_enabled" in frappe.conf:
		enabled = frappe.conf.server_script_enabled
	else:
		enabled = True
	boot["server_script_enabled"] = enabled

	boot_json = frappe.as_json(boot, indent=None, separators=(",", ":"))
	boot_json = SCRIPT_TAG_PATTERN.sub("", boot_json)
	boot_json = CLOSING_SCRIPT_TAG_PATTERN.sub("", boot_json)
	boot_json = json.dumps(boot_json)

	context.update(
		{
			"build_version": frappe.utils.get_build_version(),
			"boot": boot_json,
			"csrf_token": csrf_token,
			"app_name": "cpro",
		}
	)
	return context

```

### cpro/api/__init__.py

```python
from .pos import save_order
from .customers import get_customers, create_customer
from .menu import get_pos_menu
```

### cpro/api/allow_negative_stock.py

```python
import frappe
def run():
    settings = frappe.get_doc("Stock Settings")
    settings.allow_negative_stock = 1
    settings.save(ignore_permissions=True)
    frappe.db.commit()
    print("Negative stock allowed globally!")

```

### cpro/api/customers.py

```python
# apps/cpro/cpro/api/customers.py
import frappe

@frappe.whitelist()
def get_customers(search_term=None):
    """جلب قائمة العملاء من Frappe"""
    filters = []
    if search_term:
        filters.append(["Customer", "customer_name", "like", f"%{search_term}%"])
        
    customers = frappe.get_all(
        "Customer",
        fields=["name", "customer_name", "mobile_no", "email_id"],
        filters=filters,
        order_by="modified desc",
        limit_page_length=50
    )
    return customers

@frappe.whitelist()
def create_customer(customer_name, mobile_no=None, email_id=None):
    """إضافة عميل جديد داخل Frappe"""
    if not customer_name:
        frappe.throw("اسم العميل مطلوب")
        
    doc = frappe.get_doc({
        "doctype": "Customer",
        "customer_name": customer_name,
        "mobile_no": mobile_no,
        "email_id": email_id,
        "customer_group": "Individual",
        "territory": "All Territories"
    })
    doc.insert(ignore_permissions=True)
    frappe.db.commit()
    return doc.as_dict()
```

### cpro/api/dashboard.py

```python
import frappe
from frappe import _

@frappe.whitelist()
def get_dashboard_stats(period="يوم"):
    # جلب جميع فواتير نقاط البيع المعتمدة
    invoices = frappe.get_all("POS Invoice", filters={"docstatus": 1}, fields=["name", "grand_total", "net_total", "base_discount_amount"])
    
    total_sales = sum([i.grand_total for i in invoices]) or 0.0
    total_net = sum([i.net_total for i in invoices]) or 0.0
    total_discount = sum([i.base_discount_amount for i in invoices]) or 0.0
    
    main_stats = [
        {'title': 'الطلبات', 'value': len(invoices)},
        {'title': 'صافي المبيعات (SAR)', 'value': f"{total_net:,.2f}"},
        {'title': 'صافي الدخل (SAR)', 'value': f"{total_sales:,.2f}"},
        {'title': 'طلبات التوصيل', 'value': 0},
        {'title': 'الطلبات المحلية', 'value': len(invoices)},
        {'title': 'طلبات الاستلام', 'value': 0},
        {'title': 'مبلغ الإرجاع (SAR)', 'value': "0.00"},
        {'title': 'مبلغ الخصم (SAR)', 'value': f"{total_discount:,.2f}"},
    ]
    
    # المنتجات الأكثر مبيعاً
    top_products = []
    try:
        items = frappe.db.sql("""
            SELECT item_name, sum(amount) as amount 
            FROM `tabPOS Invoice Item` 
            WHERE docstatus=1 
            GROUP BY item_name 
            ORDER BY amount DESC 
            LIMIT 5
        """, as_dict=True)
        top_products = [{'name': i.item_name, 'amount': f"{i.amount:,.2f}"} for i in items]
    except Exception:
        pass

    # طرق الدفع الأكثر استخداماً
    top_payments = []
    try:
        payments = frappe.db.sql("""
            SELECT mode_of_payment, sum(amount) as amount 
            FROM `tabSales Invoice Payment` 
            WHERE docstatus=1 AND parenttype='POS Invoice'
            GROUP BY mode_of_payment 
            ORDER BY amount DESC 
            LIMIT 5
        """, as_dict=True)
        top_payments = [{'name': i.mode_of_payment, 'amount': f"{i.amount:,.2f}"} for i in payments]
    except Exception:
        pass

    top_branches = [
        {'name': 'الفرع الرئيسي', 'amount': f"{total_sales:,.2f}"}
    ]
    
    return {
        "mainStats": main_stats,
        "topProducts": top_products,
        "topPayments": top_payments,
        "topBranches": top_branches
    }

```

### cpro/api/health.py

```python
# Copyright (c) 2026, ahmed hashim and contributors
# For license information, please see license.txt

"""Post-install health check.

Run with::

    bench --site <site> execute cpro.api.health.verify_install

Returns a dict summarizing whether roles, DocTypes, custom fields, the settings
single, and the workspace all landed. Read-only — safe to run anytime.
"""

import frappe

from cpro.api.utils import ROLE_CASHIER, ROLE_KITCHEN, ROLE_MANAGER, ROLE_WAITER

EXPECTED_DOCTYPES = [
	"Cpro Settings",
	"Cpro Room",
	"Cpro Table",
	"Cpro Kitchen Station",
	"Cpro Modifier Group",
	"Cpro Modifier",
	"Cpro KOT",
	"Cpro KOT Item",
	"Cpro Item Modifier Group",
]

EXPECTED_ROLES = [ROLE_MANAGER, ROLE_CASHIER, ROLE_WAITER, ROLE_KITCHEN]

EXPECTED_CUSTOM_FIELDS = [
	"Item-cpro_show_in_menu",
	"Item-cpro_kitchen_station",
	"Item-cpro_modifier_groups",
	"POS Invoice-cpro_order_type",
	"POS Invoice-cpro_table",
	"POS Invoice Item-cpro_notes",
]


def verify_install() -> dict:
	roles = {r: bool(frappe.db.exists("Role", r)) for r in EXPECTED_ROLES}
	doctypes = {d: bool(frappe.db.exists("DocType", d)) for d in EXPECTED_DOCTYPES}
	custom_fields = {c: bool(frappe.db.exists("Custom Field", c)) for c in EXPECTED_CUSTOM_FIELDS}

	settings_ok = bool(frappe.db.exists("DocType", "Cpro Settings"))
	vat_rate = None
	if settings_ok:
		vat_rate = frappe.db.get_single_value("Cpro Settings", "vat_rate")

	workspace_ok = bool(frappe.db.exists("Workspace", "Restaurant Management"))

	result = {
		"roles": roles,
		"doctypes": doctypes,
		"custom_fields": custom_fields,
		"settings_seeded_vat_rate": vat_rate,
		"workspace_present": workspace_ok,
	}
	result["all_ok"] = (
		all(roles.values())
		and all(doctypes.values())
		and all(custom_fields.values())
		and workspace_ok
	)
	return result

```

### cpro/api/inventory.py

```python
# Copyright (c) 2026, ahmed hashim and contributors
# For license information, please see license.txt

"""Inventory availability.

Answers "can we sell this right now?" for the POS / digital menu so the UI can
gray out unavailable dishes (requirement #4). An item is available when either
it has finished stock on hand, or it has an active BOM whose raw materials are
all in stock. The check is deliberately *fail-open*: any uncertainty or error
resolves to available, so a stock-lookup glitch never empties the menu.
"""

import frappe

from cpro.api.utils import get_settings


def _finished_qty(item_code: str, warehouse: str | None) -> float:
	if warehouse:
		return frappe.db.get_value("Bin", {"item_code": item_code, "warehouse": warehouse}, "actual_qty") or 0.0
	rows = frappe.get_all("Bin", filters={"item_code": item_code}, fields=["actual_qty"])
	return sum((r.actual_qty or 0.0) for r in rows) if rows else 0.0


def _active_bom(item_code: str) -> str | None:
	return frappe.db.get_value(
		"BOM", {"item": item_code, "is_active": 1, "is_default": 1}, "name"
	) or frappe.db.get_value("BOM", {"item": item_code, "is_active": 1}, "name")


def _bom_materials_available(bom: str, warehouse: str | None) -> bool:
	"""True if every raw material in ``bom`` can cover at least one finished unit."""
	base_qty = frappe.db.get_value("BOM", bom, "quantity") or 1.0
	materials = frappe.get_all(
		"BOM Item", filters={"parent": bom}, fields=["item_code", "stock_qty"]
	)
	for m in materials:
		required_per_unit = (m.stock_qty or 0.0) / base_qty
		if required_per_unit <= 0:
			continue
		if _finished_qty(m.item_code, warehouse) < required_per_unit:
			return False
	return True


def _is_available(item_code: str, is_stock_item: int, warehouse: str | None) -> bool:
	# Non-stock items (services / made-to-order without tracking) are always sellable.
	if not is_stock_item:
		return True
	if _finished_qty(item_code, warehouse) > 0:
		return True
	bom = _active_bom(item_code)
	if bom:
		return _bom_materials_available(bom, warehouse)
	# Stock item, no stock, no BOM → out of stock.
	return False


def get_item_availability(item_codes: list[str], warehouse: str | None = None) -> dict[str, bool]:
	"""Batch availability map. Fail-open: errors resolve to available."""
	item_codes = list(dict.fromkeys(item_codes))
	availability = {c: True for c in item_codes}
	if not item_codes:
		return availability

	meta = {
		i.name: i.is_stock_item
		for i in frappe.get_all(
			"Item", filters={"name": ["in", item_codes]}, fields=["name", "is_stock_item"]
		)
	}
	for code in item_codes:
		try:
			availability[code] = _is_available(code, meta.get(code, 0), warehouse)
		except Exception:
			frappe.log_error(title="CPro availability check failed", message=code)
			availability[code] = True  # fail open
	return availability


def default_menu_warehouse() -> str | None:
	"""Best-effort default warehouse for availability checks (company default)."""
	company = get_settings().company
	if company:
		return frappe.get_cached_value("Company", company, "default_warehouse")
	return None

```

### cpro/api/kitchen.py

```python
# Copyright (c) 2026, ahmed hashim and contributors
# For license information, please see license.txt

"""Kitchen Display System (KDS) API.

Lists active Kitchen Order Tickets for a station and lets kitchen staff advance
their status. Every mutating call is strictly gated to the ``Cpro Kitchen``
role (requirement #3) and pushes a realtime event so open KDS / POS screens
update without polling.
"""

import frappe
from frappe import _

from cpro.api.utils import require_role, ROLE_KITCHEN, ROLE_MANAGER

# Statuses still "on the board" for the kitchen.
ACTIVE_STATUSES = ("New", "Preparing", "Ready", "Served")
KDS_ALLOWED_TARGETS = ("New", "Preparing", "Ready", "Served")

REALTIME_EVENT = "cpro_kot_update"


@frappe.whitelist()
def get_active_kots(kitchen_station: str | None = None, pos_opening_shift: str | None = None) -> list[dict]:
    """Active tickets for the board, oldest first. Kitchen / Manager only."""
    require_role(ROLE_KITCHEN, ROLE_MANAGER)

    filters = {"status": ["in", ACTIVE_STATUSES]}
    if kitchen_station:
        filters["kitchen_station"] = kitchen_station
        
    if pos_opening_shift:
        invoices = frappe.get_all("POS Invoice", filters={"cpro_pos_opening_shift": pos_opening_shift}, pluck="name")
        if not invoices:
            return []
        filters["pos_invoice"] = ["in", invoices]

    kots = frappe.get_all(
        "Cpro KOT",
        filters=filters,
        fields=[
            "name",
            "table",
            "customer",
            "status",
            "kitchen_station",
            "order_time",
            "order_notes",
            "pos_invoice",
            "creation",
        ],
        order_by="order_time asc, creation asc",
    )
    if not kots:
        return []

    names = [k.name for k in kots]
    items_by_kot: dict[str, list[dict]] = {}
    for row in frappe.get_all(
        "Cpro KOT Item",
        filters={"parent": ["in", names], "parenttype": "Cpro KOT"},
        fields=["name", "parent", "item", "item_name", "qty", "status", "kitchen_station", "notes", "modifiers_summary"],
        order_by="idx asc",
    ):
        items_by_kot.setdefault(row.parent, []).append(row)

    # جلب بيانات الفواتير المرتبطة للحصول على اسم العميل والطاولة كبديل أمان
    invoice_names = list({k.pos_invoice for k in kots if k.get("pos_invoice")})
    invoice_map = {}
    if invoice_names:
        invs = frappe.get_all("POS Invoice", filters={"name": ["in", invoice_names]}, fields=["name", "customer", "cpro_table"])
        invoice_map = {inv.name: inv for inv in invs}

    # جلب الاسم الصريح للعملاء (customer_name)
    customer_ids = set()
    for k in kots:
        inv = invoice_map.get(k.get("pos_invoice"), {})
        cust_id = k.get("customer") or inv.get("customer")
        if cust_id:
            customer_ids.add(cust_id)
        
    customer_name_map = {}
    if customer_ids:
        custs = frappe.get_all("Customer", filters={"name": ["in", list(customer_ids)]}, fields=["name", "customer_name"])
        customer_name_map = {c.name: c.customer_name for c in custs}

    for k in kots:
        inv = invoice_map.get(k.get("pos_invoice"), {})
        cust_id = k.get("customer") or inv.get("customer")
        k["customer"] = cust_id or ""
        k["customer_name"] = customer_name_map.get(cust_id, cust_id or "")
        
        if not k.get("table") and inv.get("cpro_table"):
            k["table"] = inv.get("cpro_table")

        k["items"] = items_by_kot.get(k.name, [])

    return kots


@frappe.whitelist()
def set_kot_status(kot: str, status: str) -> dict:
    """Advance a whole ticket's status. Kitchen / Manager only."""
    require_role(ROLE_KITCHEN, ROLE_MANAGER)
    if status not in KDS_ALLOWED_TARGETS:
        frappe.throw(_("Invalid kitchen status: {0}").format(status))

    doc = frappe.get_doc("Cpro KOT", kot)
    doc.status = status
    
    if status != "Cancelled":
        for row in doc.items:
            row.status = status
            
    doc.save(ignore_permissions=True)
    frappe.db.commit()
    
    publish_kot_update(doc)
    
    return {"name": doc.name, "status": doc.status}


@frappe.whitelist()
def set_kot_item_status(kot: str, item_name: str, status: str) -> dict:
    """Advance a single line's status (e.g. one dish is ready). Kitchen / Manager only."""
    require_role(ROLE_KITCHEN, ROLE_MANAGER)
    if status not in KDS_ALLOWED_TARGETS:
        frappe.throw(_("Invalid kitchen status: {0}").format(status))

    doc = frappe.get_doc("Cpro KOT", kot)
    found = False
    for row in doc.items:
        if row.name == item_name:
            row.status = status
            found = True
            break
            
    if not found:
        frappe.throw(_("Item not found on this ticket."))

    doc.save(ignore_permissions=True)
    frappe.db.commit()
    
    publish_kot_update(doc)
    
    return {"name": doc.name, "status": doc.status}


def publish_kot_update(doc):
    """Push a realtime KOT snapshot to KDS / POS listeners (called from the controller)."""
    cust_id = doc.get("customer")
    cust_name = ""
    if cust_id:
        cust_name = frappe.db.get_value("Customer", cust_id, "customer_name") or cust_id
    elif doc.get("pos_invoice"):
        inv_cust = frappe.db.get_value("POS Invoice", doc.pos_invoice, "customer")
        if inv_cust:
            cust_id = inv_cust
            cust_name = frappe.db.get_value("Customer", inv_cust, "customer_name") or inv_cust

    frappe.publish_realtime(
        REALTIME_EVENT,
        message={
            "name": doc.name,
            "status": doc.status,
            "kitchen_station": doc.get("kitchen_station"),
            "table": doc.get("table"),
            "customer": cust_id,
            "customer_name": cust_name,
        },
        after_commit=True,
    )
```

### cpro/api/management.py

```python
import frappe

@frappe.whitelist()
def get_reasons():
    try:
        void_reasons = frappe.get_all("POS Reason", filters={"reason_type": "Void"}, fields=["name"])
        void_reasons = [r.name for r in void_reasons]
    except Exception:
        void_reasons = ['Customer Cancelled', 'Wrong']
        
    try:
        qty_reasons = frappe.get_all("POS Reason", filters={"reason_type": "Qty"}, fields=["name"])
        qty_reasons = [r.name for r in qty_reasons]
    except Exception:
        qty_reasons = ['Misplaced', 'Miscount', 'Expiry', 'Waste']
        
    try:
        till_reasons = frappe.get_all("POS Reason", filters={"reason_type": "Till"}, fields=["name"])
        till_reasons = [r.name for r in till_reasons]
    except Exception:
        till_reasons = ['Taking Petty Cash', 'Cash Change']
        
    return {
        "voidReasons": void_reasons,
        "qtyReasons": qty_reasons,
        "tillReasons": till_reasons
    }

@frappe.whitelist()
def get_management_links():
    if "System Manager" not in frappe.get_roles(frappe.session.user):
        return []
    
    links = frappe.get_all("Cpro Management Link", filters={"enabled": 1}, fields=["title", "route", "target_doctype", "fields_config", "icon"], order_by="creation asc")
    return links

@frappe.whitelist()
def get_dynamic_records(target_doctype, fields):
    if "System Manager" not in frappe.get_roles(frappe.session.user):
        frappe.throw("Access denied", frappe.PermissionError)
        
    import json
    if isinstance(fields, str):
        fields = json.loads(fields)
    
    # Always ensure 'name' is in fields
    if "name" not in fields:
        fields.append("name")
        
    records = frappe.get_all(target_doctype, fields=fields, order_by="creation desc")
    return records

@frappe.whitelist()
def save_dynamic_record(target_doctype, data):
    if "System Manager" not in frappe.get_roles(frappe.session.user):
        frappe.throw("Access denied", frappe.PermissionError)
        
    import json
    if isinstance(data, str):
        data = json.loads(data)
        
    name = data.get("name")
    
    if name:
        doc = frappe.get_doc(target_doctype, name)
        doc.update(data)
    else:
        doc = frappe.new_doc(target_doctype)
        doc.update(data)
        
    doc.save(ignore_permissions=True)
    frappe.db.commit()
    return doc.as_dict()

@frappe.whitelist()
def delete_dynamic_record(target_doctype, name):
    if "System Manager" not in frappe.get_roles(frappe.session.user):
        frappe.throw("Access denied", frappe.PermissionError)
        
    frappe.delete_doc(target_doctype, name, ignore_permissions=True)
    frappe.db.commit()
    return {"status": "success"}

```

### cpro/api/menu.py

```python
# apps/cpro/cpro/api/menu.py
import frappe

@frappe.whitelist()
def get_pos_menu(pos_profile=None, price_list=None):
    """جلب الأصناف والأسعار ديناميكياً بناءً على قائمة الأسعار المختارة أو بروفايل الكاشير"""
    
    # 1. تحديث قائمة الأسعار المستهدفة ديناميكياً
    target_price_list = price_list

    # 2. إذا لم يتم تمرير قائمة أسعار صريحة، نجلبها من POS Profile
    if not target_price_list and pos_profile:
        target_price_list = frappe.db.get_value("POS Profile", pos_profile, "selling_price_list")
        
    # 3. إذا لم تتوفر، نستخدم القائمة الافتراضية للمبيعات
    if not target_price_list:
        target_price_list = frappe.db.get_single_value("Selling Settings", "selling_price_list") or "Standard Selling"

    # جلب كافة الأصناف المفعلة
    items = frappe.get_all(
        "Item",
        fields=["name", "item_code", "item_name", "item_group", "standard_rate", "image"],
        filters=[["disabled", "=", 0]],
        limit_page_length=500
    )

    # جلب الأسعار المحددة للقائمة المطلوبة حصراً
    item_prices = frappe.get_all(
        "Item Price",
        fields=["item_code", "price_list_rate"],
        filters=[["selling", "=", 1], ["price_list", "=", target_price_list]],
        limit_page_length=1000
    )

    price_map = {p["item_code"]: p["price_list_rate"] for p in item_prices}

    # دمج السعر المحدد للقائمة أو استخدام standard_rate كبديل
    for item in items:
        code = item.get("item_code") or item.get("name")
        item["rate"] = price_map.get(code, item.get("standard_rate") or 0)

    return {
        "price_list": target_price_list,
        "items": items
    }

@frappe.whitelist()
def get_menu(pos_profile=None, price_list=None):
    return get_pos_menu(pos_profile=pos_profile, price_list=price_list)

@frappe.whitelist()
def build_menu(pos_profile=None, price_list=None):
    return get_pos_menu(pos_profile=pos_profile, price_list=price_list)
```

### cpro/api/portal.py

```python
# Copyright (c) 2026, ahmed hashim and contributors
# For license information, please see license.txt

"""Customer-facing digital menu portal.

Powers the mobile menu (requirement #6): browse by category, optionally place a
guest order (gated by the *Allow Guest Orders* toggle), and a *Call Waiter*
button that fires an instant realtime alert to the cashier/waiter with the
table number (gated by the *Enable Call Waiter* toggle). Guest orders create a
Kitchen Order Ticket only — never a financial document directly; a cashier
turns it into a POS Invoice.
"""

import frappe
from frappe import _

from cpro.api.menu import build_menu
from cpro.api.utils import call_waiter_enabled, guest_orders_allowed

CALL_WAITER_EVENT = "cpro_call_waiter"


def _resolve_table(table: str | None) -> str | None:
	"""Resolve a table from a portal slug or its name; None if not found."""
	if not table:
		return None
	by_slug = frappe.db.get_value("Cpro Table", {"portal_slug": table}, "name")
	if by_slug:
		return by_slug
	if frappe.db.exists("Cpro Table", table):
		return table
	return None


@frappe.whitelist(allow_guest=True)
def get_public_menu(table: str | None = None) -> dict:
	"""Public digital menu (standard pricing). Safe for guests to view."""
	payload = build_menu(customer=None)
	resolved = _resolve_table(table)
	payload["table"] = resolved
	
	settings = frappe.get_single("Cpro Portal Settings")
	payload["guest_orders_allowed"] = settings.enable_online_ordering
	payload["call_waiter_enabled"] = settings.enable_call_waiter
	payload["banners"] = [b.image for b in settings.banners] if settings.banners else []
	
	company = frappe.db.get_single_value("Cpro Settings", "company")
	payload["restaurant_name"] = company or "Restaurant"
	payload["restaurant_logo"] = frappe.db.get_value("Company", company, "company_logo") if company else None
	
	payload["tables"] = frappe.db.get_all("Cpro Table", filters={"is_active": 1}, fields=["name", "table_number"])
	
	return payload


@frappe.whitelist(allow_guest=True)
def call_waiter(table: str | None = None) -> dict:
	try:
		settings = frappe.get_single("Cpro Portal Settings")
		if not settings.enable_call_waiter:
			frappe.throw(_("Waiter service is currently unavailable."))
			
		if not table:
			frappe.throw(_("Table number is required."))

		req = frappe.new_doc("Cpro Portal Request")
		req.request_type = "Call Waiter"
		req.status = "Pending"
		req.table_number = table
		req.insert(ignore_permissions=True)

		frappe.publish_realtime(
			event=CALL_WAITER_EVENT,
			message={"table": table, "request_id": req.name, "type": "Call Waiter"},
			after_commit=True
		)
		frappe.db.commit()
		return {"ok": True, "message": _("A waiter has been notified.")}
	except Exception as e:
		frappe.log_error(title="DEBUG: call_waiter failed", message=frappe.get_traceback())
		raise


@frappe.whitelist(allow_guest=True)
def place_guest_order(items, order_type: str = "Dine In", table: str | None = None, address: str | None = None, name: str | None = None, phone: str | None = None) -> dict:
	"""Create a Draft POS Invoice and a KOT from a guest's cart (toggle-gated)."""
	try:
		if isinstance(items, str):
			import json
			items = json.loads(items)

		settings = frappe.get_single("Cpro Portal Settings")
		if not settings.enable_online_ordering:
			frappe.throw(_("Online ordering is currently closed. Please call a waiter to order."))
		
		req = frappe.new_doc("Cpro Portal Request")
		req.request_type = "Order"
		req.status = "Pending"
		req.customer_name = name or "Online Guest"
		req.phone = phone
		req.address = address
		req.table_number = table
		req.order_type = order_type
		req.order_payload = frappe.as_json(items)
		req.insert(ignore_permissions=True)

		frappe.publish_realtime(
			event=CALL_WAITER_EVENT,
			message={"table": table, "request_id": req.name, "type": "Order"},
			after_commit=True
		)
		frappe.db.commit()
		return {
			"ok": True,
			"message": _("Your order has been received and is waiting for review!")
		}
	except Exception as e:
		frappe.log_error(title="DEBUG: place_guest_order failed", message=frappe.get_traceback())
		raise

@frappe.whitelist()
def get_portal_requests() -> list:
	# Get all requests from the last 24 hours
	since = frappe.utils.add_days(frappe.utils.now(), -1)
	return frappe.get_all("Cpro Portal Request", filters={"creation": [">", since]}, fields=["name as id", "request_type as type", "table_number as table", "order_type", "order_payload", "customer_name", "phone", "creation", "status"], order_by="creation desc")

def cleanup_portal_requests():
	"""Delete portal requests older than 7 days."""
	import datetime
	older_than = frappe.utils.add_days(frappe.utils.now(), -7)
	# Direct SQL to avoid permission hooks and speed up bulk delete
	frappe.db.sql("DELETE FROM `tabCpro Portal Request` WHERE creation < %s", (older_than,))
	frappe.db.commit()

@frappe.whitelist()
def accept_portal_request(request_id: str, table_number: str = None) -> dict:
	"""Convert a Cpro Portal Request into a real POS Invoice and KOT, or just mark Waiter call as done."""
	import json
	req = frappe.get_doc("Cpro Portal Request", request_id)
	
	if req.status != "Pending":
		return {"ok": True, "message": "Already processed."}
		
	if table_number:
		req.table_number = table_number
		req.save()
		
	if req.request_type == "Call Waiter":
		req.status = "Completed"
		req.save()
		return {"ok": True, "message": "Waiter call marked as done."}
		
	# Process Order
	items = json.loads(req.order_payload or "[]")
	if not items:
		frappe.throw(_("Order payload is empty."))
		
	resolved_table = _resolve_table(req.table_number)

	menu = build_menu(customer=None)
	orderable_items = {i["item_code"]: i for i in menu.get("items", [])}

	custom_table_note = ""
	if req.order_type == "Dine In" and not resolved_table and req.table_number:
		custom_table_note = f"Table (Custom): {req.table_number}\n"

	# Find or Create Customer
	customer_name = "Guest"
	if req.phone:
		existing = frappe.db.get_value("Customer", {"mobile_no": req.phone}, "name")
		if existing:
			customer_name = existing
		else:
			try:
				cust = frappe.new_doc("Customer")
				cust.customer_name = req.customer_name or "Online Guest"
				cust.customer_group = "All Customer Groups"
				cust.territory = "All Territories"
				cust.customer_type = "Individual"
				cust.mobile_no = req.phone
				cust.insert(ignore_permissions=True)
				customer_name = cust.name
			except Exception:
				pass

	inv = frappe.new_doc("POS Invoice")
	inv.customer = customer_name
	inv.cpro_order_type = req.order_type
	inv.cpro_source = "Portal"
	inv.cpro_delivery_address = req.address
	inv.cpro_customer_phone = req.phone
	if resolved_table:
		inv.cpro_table = resolved_table
		
	shift = frappe.db.get_value("Cpro POS Opening Shift", {"status": "Open"}, "name")
	if shift:
		inv.cpro_pos_opening_shift = shift
		profile = frappe.db.get_value("Cpro POS Opening Shift", shift, "pos_profile")
		if profile:
			inv.pos_profile = profile

	for line in items:
		item_code = line.get("item_code")
		if not item_code or item_code not in orderable_items:
			continue
		price = orderable_items[item_code].get("price", 0)
		inv.append("items", {
			"item_code": item_code,
			"qty": line.get("qty") or 1,
			"rate": price,
			"cpro_notes": (custom_table_note + (line.get("notes") or "")).strip()
		})

	if not inv.items:
		frappe.throw(_("None of the items are available to order."))

	inv.insert(ignore_permissions=True)
	
	kot = frappe.new_doc("Cpro KOT")
	kot.pos_invoice = inv.name
	kot.cpro_order_type = req.order_type
	if resolved_table:
		kot.table = resolved_table
	kot.status = "New"
	kot.order_notes = (custom_table_note + _("Placed from the portal.")).strip()
	
	for line in items:
		item_code = line.get("item_code")
		if not item_code or item_code not in orderable_items:
			continue
		modifiers = line.get("modifiers") or []
		kot.append("items", {
			"item": item_code,
			"qty": line.get("qty") or 1,
			"status": "New",
			"notes": line.get("notes"),
			"modifiers_summary": ", ".join(modifiers) if modifiers else None,
		})
	kot.insert(ignore_permissions=True)

	req.status = "Completed"
	req.save()

	frappe.db.commit()
	return {"ok": True, "invoice": inv.name}

@frappe.whitelist()
def cancel_portal_request(request_id: str) -> dict:
	req = frappe.get_doc("Cpro Portal Request", request_id)
	req.status = "Cancelled"
	req.save()
	frappe.db.commit()
	return {"ok": True}

```

### cpro/api/pos.py

```python
import frappe
import json
from frappe import _
from frappe.utils import flt

@frappe.whitelist()
def save_order(order_data=None):
    """
    حفظ الطلب وإنشاء فاتورة POS Invoice داخل Frappe ديناميكياً
    """
    # 1. استخراج البيانات بغض النظر عن طريقة إرسال الفرونت إند لها
    if not order_data:
        if frappe.request and frappe.request.get_json():
            order_data = frappe.request.get_json()
        elif frappe.form_dict:
            order_data = frappe.form_dict.get("order_data") or frappe.form_dict

    if isinstance(order_data, str):
        try:
            order_data = json.loads(order_data)
        except Exception:
            pass

    if isinstance(order_data, dict):
        if "order_data" in order_data:
            inner = order_data.get("order_data")
            order_data = json.loads(inner) if isinstance(inner, str) else inner
        elif "order" in order_data:
            inner = order_data.get("order")
            order_data = json.loads(inner) if isinstance(inner, str) else inner

    if not order_data or not isinstance(order_data, dict):
        frappe.throw(_("لم يتم إرسال بيانات الطلب بشكل صحيح"))

    items = order_data.get("items", [])
    if not items:
        frappe.throw(_("السلة فارغة، يجب إرسال عناصر للطلب"))

    # 2. جلب بيانات POS Profile والعميل
    pos_profile_name = order_data.get("pos_profile") or frappe.db.get_value("POS Profile", {"disabled": 0}, "name")
    pos_profile = frappe.get_doc("POS Profile", pos_profile_name) if pos_profile_name else None

    company = order_data.get("company") or (pos_profile.company if pos_profile else frappe.defaults.get_user_default("Company"))
    customer = order_data.get("customer") or (pos_profile.customer if pos_profile else None)

    # إذا لم يتم تحديد عميل، يتم جلب أول عميل مسجل في النظام تلقائياً لمنع خطأ LinkValidation
    if not customer:
        customer = frappe.db.get_value("Customer", {}, "name")
        if not customer:
            frappe.throw(_("لا يوجد أي عميل مسجل في النظام، يرجى إضافة عميل أولاً"))

    # 3. إنشاء مستند الفاتورة
    doc = frappe.new_doc("POS Invoice")
    doc.customer = customer
    doc.company = company
    if pos_profile_name:
        doc.pos_profile = pos_profile_name

    doc.posting_date = frappe.utils.nowdate()
    doc.posting_time = frappe.utils.nowtime()

    # 4. إضافة المنتجات
    for item in items:
        item_code = item.get("item_code") or item.get("name")
        qty = flt(item.get("qty") or item.get("quantity") or 1)
        rate = flt(item.get("rate") or item.get("price") or 0)

        doc.append("items", {
            "item_code": item_code,
            "qty": qty,
            "rate": rate,
            "amount": qty * rate,
            "custom_modifiers": json.dumps(item.get("modifiers")) if item.get("modifiers") else None,
            "description": item.get("description", "")
        })

    # حساب الضرائب والإجمالي أولاً لكي يكون doc.grand_total متاحاً
    doc.set_missing_values()
    doc.calculate_taxes_and_totals()

    # 5. إضافة المدفوعات
    payments = order_data.get("payments", [])
    if payments:
        for pay in payments:
            doc.append("payments", {
                "mode_of_payment": pay.get("mode_of_payment"),
                "amount": flt(pay.get("amount", 0))
            })
    elif pos_profile:
        for pm in pos_profile.payments:
            doc.append("payments", {
                "mode_of_payment": pm.mode_of_payment,
                "amount": doc.grand_total if pm.default else 0
            })

    doc.insert(ignore_permissions=True)

    if order_data.get("is_submitted", 1):
        doc.submit()

    frappe.db.commit()

    return {
        "status": "success",
        "message": _("تم تسجيل الطلب بنجاح"),
        "name": doc.name,
        "grand_total": doc.grand_total
    }


@frappe.whitelist()
def get_customers():
    """جلب قائمة العملاء المسجلين من Frappe"""
    return frappe.get_all(
        "Customer",
        fields=["name", "customer_name", "mobile_no"],
        order_by="creation desc"
    )


@frappe.whitelist()
def create_customer(customer_name, mobile_no=None):
    """إنشاء عميل جديد فوراً على سيرفر Frappe (Port 8000)"""
    if not customer_name:
        frappe.throw(_("اسم العميل مطلوب"))

    customer = frappe.new_doc("Customer")
    customer.customer_name = customer_name
    customer.customer_group = frappe.db.get_single_value("POS Profile", "customer_group") or "Individual"
    customer.territory = frappe.db.get_single_value("POS Profile", "territory") or "All Territories"

    if mobile_no:
        customer.mobile_no = mobile_no

    customer.insert(ignore_permissions=True)
    frappe.db.commit()

    return {
        "name": customer.name,
        "customer_name": customer.customer_name
    }
```

### cpro/api/pricing.py

```python
# Copyright (c) 2026, ahmed hashim and contributors
# For license information, please see license.txt

"""
CPro pricing.

Pricing source precedence:

1. Explicit price list supplied by the caller.
2. Customer's default_price_list.
3. CPro Settings -> default_selling_price_list.

CPro does not depend on ERPNext "Standard Selling".
The configured CPro price list is required when no explicit price
list or customer-specific price list is available.
"""

import frappe
from frappe import _

from cpro.api.utils import get_settings


def _validate_price_list(price_list: str | None) -> str | None:
	"""Return a usable enabled selling Price List or None."""
	if not price_list:
		return None

	exists = frappe.db.get_value(
		"Price List",
		{
			"name": price_list,
			"enabled": 1,
			"selling": 1,
		},
		"name",
	)

	return exists or None


def resolve_price_list(
	customer: str | None = None,
	price_list: str | None = None,
) -> str:
	"""
	Return the CPro selling Price List to use.

	Precedence:
	1. Explicit price_list
	2. Customer default_price_list
	3. Cpro Settings default_selling_price_list

	Standard Selling is intentionally NOT used.
	"""

	# 1) Explicit price list from the POS/menu
	if price_list:
		valid_price_list = _validate_price_list(price_list)

		if not valid_price_list:
			frappe.throw(
				_("The selected price list {0} does not exist, is not a selling list, or is disabled.").format(
					frappe.bold(price_list)
				),
				title=_("Invalid Price List"),
			)

		return valid_price_list

	# 2) Customer-specific price list
	if customer:
		customer_pl = frappe.get_cached_value(
			"Customer",
			customer,
			"default_price_list",
		)

		customer_pl = _validate_price_list(customer_pl)

		if customer_pl:
			return customer_pl

	# 3) CPro Settings
	settings = get_settings()

	configured_pl = _validate_price_list(
		settings.default_selling_price_list
	)

	if configured_pl:
		return configured_pl

	# No hidden ERPNext fallback anymore.
	frappe.throw(
		_(
			"Please configure an enabled Selling Price List in Cpro Settings before taking orders."
		),
		title=_("Price List Required"),
	)


def _best_rate_rows(
	item_codes: list[str],
	price_list: str,
) -> dict[str, float]:
	"""Return the latest selling Item Price for each item."""
	if not item_codes:
		return {}

	rows = frappe.get_all(
		"Item Price",
		filters={
			"item_code": ["in", item_codes],
			"price_list": price_list,
			"selling": 1,
		},
		fields=[
			"item_code",
			"price_list_rate",
			"valid_from",
		],
		order_by="valid_from asc",
	)

	# Later rows overwrite earlier ones, leaving the latest price.
	return {
		row.item_code: row.price_list_rate
		for row in rows
	}


def get_item_rates(
	item_codes: list[str],
	customer: str | None = None,
	price_list: str | None = None,
) -> dict[str, float]:
	"""
	Resolve selling rates in one or two batched queries.

	Explicit price_list:
	    only that list is used.

	No explicit price_list:
	    customer price list is used first,
	    then CPro Settings price list.
	"""

	item_codes = list(dict.fromkeys(item_codes))

	if not item_codes:
		return {}

	# Resolve the actual primary list.
	resolved_price_list = resolve_price_list(
		customer=customer,
		price_list=price_list,
	)

	rates = _best_rate_rows(
		item_codes,
		resolved_price_list,
	)

	# If we are using a customer-specific list and some items are
	# missing from it, fall back ONLY to CPro Settings price list.
	if customer and not price_list:
		settings_price_list = _validate_price_list(
			get_settings().default_selling_price_list
		)

		if (
			settings_price_list
			and settings_price_list != resolved_price_list
		):
			missing = [
				code
				for code in item_codes
				if code not in rates
			]

			if missing:
				rates.update(
					_best_rate_rows(
						missing,
						settings_price_list,
					)
				)

	return rates


@frappe.whitelist()
def get_item_rate(
	item_code: str,
	customer: str | None = None,
	price_list: str | None = None,
) -> float:
	"""Resolve one item's selling rate. Return 0 if no Item Price exists."""
	return get_item_rates(
		[item_code],
		customer=customer,
		price_list=price_list,
	).get(item_code, 0.0)
```

### cpro/api/setup_management_links.py

```python
import frappe
import json

def run():
    frappe.init(site="my_resturant")
    frappe.connect()

    doctype_name = "Cpro Management Link"
    if frappe.db.exists("DocType", doctype_name):
        print("DocType already exists.")
        return

    doc = frappe.get_doc({
        "doctype": "DocType",
        "name": doctype_name,
        "module": "Cpro",
        "custom": 1,
        "is_submittable": 0,
        "fields": [
            {
                "fieldname": "title",
                "label": "Title",
                "fieldtype": "Data",
                "reqd": 1,
                "in_list_view": 1
            },
            {
                "fieldname": "route",
                "label": "Route",
                "fieldtype": "Data",
                "reqd": 1,
                "in_list_view": 1,
                "unique": 1,
                "description": "e.g. payment-methods (no spaces)"
            },
            {
                "fieldname": "target_doctype",
                "label": "Target Doctype",
                "fieldtype": "Link",
                "options": "DocType",
                "reqd": 1,
                "in_list_view": 1
            },
            {
                "fieldname": "enabled",
                "label": "Enabled",
                "fieldtype": "Check",
                "default": "1",
                "in_list_view": 1
            },
            {
                "fieldname": "fields_config",
                "label": "Fields Configuration (JSON)",
                "fieldtype": "Code",
                "options": "JSON",
                "description": "e.g. [{\"fieldname\": \"name\", \"label\": \"Name\", \"type\": \"Data\"}]"
            },
            {
                "fieldname": "icon",
                "label": "Icon (Lucide)",
                "fieldtype": "Data",
                "description": "Name of Lucide React icon e.g. 'CreditCard'"
            }
        ],
        "permissions": [
            {
                "role": "System Manager",
                "read": 1,
                "write": 1,
                "create": 1,
                "delete": 1
            }
        ]
    })
    
    doc.insert(ignore_permissions=True)
    frappe.db.commit()
    print("DocType 'Cpro Management Link' created successfully!")

    # Seed it with standard modules the user asked for
    links = [
        {
            "title": "طرق الدفع",
            "route": "payment-methods",
            "target_doctype": "Mode of Payment",
            "icon": "CreditCard",
            "enabled": 1,
            "fields_config": json.dumps([
                {"fieldname": "mode_of_payment", "label": "طريقة الدفع", "type": "Data", "reqd": 1},
                {"fieldname": "enabled", "label": "مفعل", "type": "Check", "default": 1}
            ])
        },
        {
            "title": "مناطق التوصيل",
            "route": "delivery-zones",
            "target_doctype": "Delivery Trip", # Note: Standard ERPNext doesn't have a simple Delivery Zone, usually Address or Territory. Let's use Territory.
            "icon": "Map",
            "enabled": 1,
            "fields_config": json.dumps([
                {"fieldname": "territory_name", "label": "المنطقة", "type": "Data", "reqd": 1},
                {"fieldname": "parent_territory", "label": "المنطقة الرئيسية", "type": "Link", "options": "Territory"}
            ])
        },
        {
            "title": "الضرائب",
            "route": "taxes",
            "target_doctype": "Sales Taxes and Charges Template",
            "icon": "Receipt",
            "enabled": 1,
            "fields_config": json.dumps([
                {"fieldname": "title", "label": "الاسم", "type": "Data", "reqd": 1},
                {"fieldname": "disabled", "label": "معطل", "type": "Check", "default": 0},
                {"fieldname": "is_default", "label": "افتراضي", "type": "Check", "default": 0}
            ])
        }
    ]

    for link in links:
        if not frappe.db.exists("Cpro Management Link", link["route"]):
            l = frappe.new_doc("Cpro Management Link")
            l.update(link)
            l.insert(ignore_permissions=True)
    
    frappe.db.commit()
    print("Seed data inserted.")

```

### cpro/api/shift.py

```python
# Copyright (c) 2026, ahmed hashim and contributors
# For license information, please see license.txt

"""POS Shift management API.

A cashier must **open a shift** (declaring the opening cash float) before the
POS will take orders, and **close it** with a cash reconciliation at hand-off.
Shifts are ERPNext-native in spirit but CPro-owned:

* ``POS Opening Entry``  — submitted → status ``Open``
* ``POS Closing Entry``  — submitted → closes the opening shift

Every POS Invoice raised in between is stamped with ``cpro_pos_opening_shift``
so closing can total sales and expected cash per payment mode. All figures are
recomputed server-side from those invoices — the client never dictates money.
"""

import frappe
from frappe import _
from frappe.utils import flt, now_datetime

from cpro.api.utils import require_role, has_any_role, ROLE_CASHIER, ROLE_MANAGER, ROLE_WAITER

OPEN_STATUS = "Open"


# --------------------------------------------------------------------------- #
# Internal helpers (no role check — callers guard)                            #
# --------------------------------------------------------------------------- #
def _get_open_shift_name(user: str, pos_profile: str | None = None) -> str | None:
	"""Return the name of the user's currently open shift, or None."""
	filters = {"user": user, "status": OPEN_STATUS, "docstatus": 1}
	if pos_profile:
		filters["pos_profile"] = pos_profile
	return frappe.db.get_value("POS Opening Entry", filters, "name")


def require_open_shift(user: str, pos_profile: str | None = None) -> str:
	"""Return the open shift name or raise a graceful, localized error."""
	shift = _get_open_shift_name(user, pos_profile)
	if not shift:
		frappe.throw(
			_("Please open a POS shift before taking orders."),
			title=_("No Open Shift"),
		)
	return shift


def compute_shift_aggregates(opening_shift: str) -> dict:
	"""Totals + expected cash by payment mode for a shift's paid POS Invoices.

	Only *submitted* (paid) invoices count toward money; draft orders are still
	open tabs and are reported separately as ``open_order_count``.
	"""
	paid = frappe.get_all(
		"POS Invoice",
		filters={"cpro_pos_opening_shift": opening_shift, "docstatus": 1},
		fields=["name", "net_total", "total_taxes_and_charges", "grand_total", "total_qty", "change_amount"],
	)
	names = [r.name for r in paid]

	expected_by_mode: dict[str, float] = {}
	if names:
		for p in frappe.get_all(
			"Sales Invoice Payment",
			filters={"parent": ["in", names], "parenttype": "POS Invoice"},
			fields=["mode_of_payment", "amount"],
		):
			expected_by_mode[p.mode_of_payment] = expected_by_mode.get(p.mode_of_payment, 0) + flt(p.amount)

	# Deduct change amounts (usually returned in Cash) from the Cash mode
	total_change = sum(flt(r.change_amount) for r in paid)
	if total_change > 0:
		cash_mode = "Cash"
		if cash_mode in expected_by_mode:
			expected_by_mode[cash_mode] -= total_change
		elif expected_by_mode:
			# fallback: deduct from the first available mode
			first_mode = next(iter(expected_by_mode))
			expected_by_mode[first_mode] -= total_change

	open_order_count = frappe.db.count(
		"POS Invoice", {"cpro_pos_opening_shift": opening_shift, "docstatus": 0}
	)

	return {
		"pos_invoice_count": len(paid),
		"open_order_count": open_order_count,
		"total_quantity": sum(flt(r.total_qty) for r in paid),
		"net_total": sum(flt(r.net_total) for r in paid),
		"total_taxes_and_charges": sum(flt(r.total_taxes_and_charges) for r in paid),
		"grand_total": sum(flt(r.grand_total) for r in paid),
		"expected_by_mode": expected_by_mode,
	}


def _profile_payment_modes(pos_profile: str) -> list[str]:
	"""Payment modes configured on a POS Profile (fallback: enabled + Cash)."""
	modes = [
		r.mode_of_payment
		for r in frappe.get_all(
			"POS Payment Method",
			filters={"parent": pos_profile, "parenttype": "POS Profile"},
			fields=["mode_of_payment"],
			order_by="idx asc",
		)
	]
	if modes:
		return modes
	if frappe.db.exists("Mode of Payment", "Cash"):
		return ["Cash"]
	first = frappe.db.get_value("Mode of Payment", {"enabled": 1}, "name")
	return [first] if first else []


def _available_pos_profiles(user: str) -> list[dict]:
	"""POS profiles the user may open a shift on, each with its payment modes."""
	profiles = frappe.get_all(
		"POS Profile", filters={"disabled": 0}, fields=["name", "company", "currency"], order_by="name asc"
	)
	for p in profiles:
		p["payment_modes"] = _profile_payment_modes(p.name)
	return profiles


def _serialize_shift(name: str) -> dict:
	doc = frappe.get_doc("POS Opening Entry", name)
	return {
		"name": doc.name,
		"pos_profile": doc.pos_profile,
		"company": doc.company,
		"user": doc.user,
		"status": doc.status,
		"period_start_datetime": str(doc.period_start_date),
		"balances": [
			{"mode_of_payment": r.mode_of_payment, "opening_amount": flt(r.opening_amount)}
			for r in doc.balance_details
		],
	}


# --------------------------------------------------------------------------- #
# Whitelisted API                                                             #
# --------------------------------------------------------------------------- #
@frappe.whitelist()
def get_current_shift(pos_profile: str | None = None) -> dict:
	"""Everything the POS gate needs in one call: the open shift (if any),
	whether the user may open one, and the profiles + payment modes to open with."""
	require_role(ROLE_CASHIER, ROLE_WAITER, ROLE_MANAGER)
	user = frappe.session.user
	open_name = _get_open_shift_name(user, pos_profile)
	return {
		"shift": _serialize_shift(open_name) if open_name else None,
		"can_open": has_any_role(ROLE_CASHIER, ROLE_MANAGER),
		"pos_profiles": _available_pos_profiles(user),
	}


@frappe.whitelist()
def open_shift(pos_profile: str, balance_details) -> dict:
	"""Open (create + submit) a shift for the current user."""
	require_role(ROLE_CASHIER, ROLE_MANAGER)
	user = frappe.session.user

	if _get_open_shift_name(user, pos_profile):
		frappe.throw(
			_("You already have an open shift on this POS profile."), title=_("Shift Already Open")
		)

	balance_details = frappe.parse_json(balance_details) if isinstance(balance_details, str) else balance_details

	doc = frappe.new_doc("POS Opening Entry")
	doc.pos_profile = pos_profile
	doc.user = user
	doc.company = frappe.db.get_value("POS Profile", pos_profile, "company")
	branch = frappe.db.get_value("POS Profile", pos_profile, "branch")
	if not branch:
		branch = frappe.db.get_value("Branch", {}, "name")
		if not branch:
			new_branch = frappe.new_doc("Branch")
			new_branch.branch = "Main Branch"
			new_branch.branch_name = "Main Branch"
			new_branch.insert(ignore_permissions=True)
			branch = new_branch.name
		frappe.db.set_value("POS Profile", pos_profile, "branch", branch)
	doc.branch = branch
	doc.period_start_date = now_datetime()
	for row in balance_details or []:
		doc.append(
			"balance_details",
			{
				"mode_of_payment": row.get("mode_of_payment"),
				"opening_amount": flt(row.get("opening_amount")),
			},
		)
	if not doc.balance_details:
		frappe.throw(_("Declare an opening balance for at least one payment mode."))

	doc.insert(ignore_permissions=True)
	doc.submit()
	frappe.db.commit()
	return _serialize_shift(doc.name)


@frappe.whitelist()
def get_shift_summary(pos_opening_shift: str) -> dict:
	"""Preview a shift's sales + expected cash for the close-out screen."""
	require_role(ROLE_CASHIER, ROLE_MANAGER)
	agg = compute_shift_aggregates(pos_opening_shift)

	opening = frappe.get_doc("POS Opening Entry", pos_opening_shift)
	opening_by_mode = {r.mode_of_payment: flt(r.opening_amount) for r in opening.balance_details}

	# Union of every payment mode that has either an opening float or takings.
	modes = list(dict.fromkeys([*opening_by_mode.keys(), *agg["expected_by_mode"].keys()]))
	rows = [
		{
			"mode_of_payment": m,
			"opening_amount": opening_by_mode.get(m, 0),
			"expected_amount": opening_by_mode.get(m, 0) + agg["expected_by_mode"].get(m, 0),
		}
		for m in modes
	]

	return {
		"pos_opening_shift": pos_opening_shift,
		"pos_profile": opening.pos_profile,
		"user": opening.user,
		"period_start_datetime": str(opening.period_start_date),
		"pos_invoice_count": agg["pos_invoice_count"],
		"open_order_count": agg["open_order_count"],
		"total_quantity": agg["total_quantity"],
		"net_total": agg["net_total"],
		"total_taxes_and_charges": agg["total_taxes_and_charges"],
		"grand_total": agg["grand_total"],
		"reconciliation": rows,
	}


@frappe.whitelist()
def close_shift(pos_opening_shift: str, payment_reconciliation, closing_notes: str | None = None) -> dict:
	"""Create + submit the closing shift, reconciling counted vs expected cash."""
	require_role(ROLE_CASHIER, ROLE_MANAGER)
	payment_reconciliation = (
		frappe.parse_json(payment_reconciliation)
		if isinstance(payment_reconciliation, str)
		else payment_reconciliation
	)

	opening_entry = frappe.get_doc("POS Opening Entry", pos_opening_shift)
	doc = frappe.new_doc("POS Closing Entry")
	doc.pos_opening_entry = pos_opening_shift
	doc.pos_profile = opening_entry.pos_profile
	doc.company = opening_entry.company
	branch = opening_entry.branch if hasattr(opening_entry, "branch") else None
	if not branch:
		branch = frappe.db.get_value("Branch", {}, "name")
		if not branch:
			new_branch = frappe.new_doc("Branch")
			new_branch.branch = "Main Branch"
			new_branch.branch_name = "Main Branch"
			new_branch.insert(ignore_permissions=True)
			branch = new_branch.name
	doc.branch = branch
	doc.user = opening_entry.user
	doc.period_start_date = opening_entry.period_start_date
	doc.period_end_date = now_datetime()
	for row in payment_reconciliation or []:
		doc.append(
			"payment_reconciliation",
			{
				"mode_of_payment": row.get("mode_of_payment"),
				"opening_amount": flt(row.get("opening_amount")),
				"closing_amount": flt(row.get("closing_amount")),
			},
		)

	doc.insert(ignore_permissions=True)  # expected/difference computed in validate
	doc.submit()
	frappe.db.commit()

	return {
		"name": doc.name,
		"grand_total": doc.grand_total,
		"net_total": doc.net_total,
		"total_taxes_and_charges": doc.total_taxes_and_charges,
		"difference_total": sum(flt(r.difference) for r in doc.payment_reconciliation),
	}

```

### cpro/api/test_debug.py

```python
import frappe
def run():
    pos_profile = "zed"
    branch = frappe.db.get_value("POS Profile", pos_profile, "branch")
    print("Initial branch from POS Profile:", branch)
    
    if not branch:
        branch = frappe.db.get_value("Branch", {}, "name")
        print("Fallback branch:", branch)
        frappe.db.set_value("POS Profile", pos_profile, "branch", branch)
        frappe.db.commit()
    
    branch_after = frappe.db.get_value("POS Profile", pos_profile, "branch")
    print("Branch on POS Profile after set_value:", branch_after)
    
    doc = frappe.new_doc("POS Opening Entry")
    doc.pos_profile = pos_profile
    doc.user = "Administrator"
    doc.company = frappe.db.get_value("POS Profile", pos_profile, "company")
    doc.branch = branch_after
    doc.period_start_date = frappe.utils.now_datetime()
    doc.append("balance_details", {"mode_of_payment": "Cash", "opening_amount": 0})
    
    try:
        doc.insert(ignore_permissions=True)
        print("INSERT SUCCESS! Name:", doc.name)
    except Exception as e:
        print("INSERT FAILED!")
        import traceback
        traceback.print_exc()

```

### cpro/api/test_totals.py

```python
import frappe
def run():
    frappe.init(site="my_resturant")
    frappe.connect()
    
    doc = frappe.new_doc("POS Invoice")
    doc.customer = frappe.db.get_value("Customer", {}, "name")
    doc.company = frappe.db.get_value("Company", {}, "name")
    doc.pos_profile = "zed"
    doc.append("items", {
        "item_code": frappe.db.get_value("Item", {"is_sales_item": 1}, "name"),
        "qty": 1,
        "rate": 100
    })
    
    doc.set_missing_values()
    doc.calculate_taxes_and_totals()
    print("Grand Total:", doc.grand_total)

```

### cpro/api/users.py

```python
import frappe
from frappe import _
import json

def _check_admin():
    if "System Manager" not in frappe.get_roles(frappe.session.user):
        frappe.throw(_("انت لا تمتلك صلاحيه لفتح هذه الصفحه"), frappe.PermissionError)

@frappe.whitelist()
def get_users():
    _check_admin()
    users = frappe.get_all("User", filters={"enabled": 1}, fields=["name", "full_name", "email", "role_profile_name"])
    
    formatted_users = []
    for i, u in enumerate(users):
        formatted_users.append({
            "id": u.name,
            "name": u.full_name or u.name,
            "email": u.email,
            "role": u.role_profile_name or "مستخدم",
            "branch": "الفرع الرئيسي"
        })
    return formatted_users

@frappe.whitelist()
def get_roles():
    _check_admin()
    # Fetch roles excluding some system defaults that aren't typically assigned directly in this view
    excluded_roles = ["All", "Guest", "Administrator"]
    roles = frappe.get_all("Role", filters={"disabled": 0, "name": ["not in", excluded_roles]}, pluck="name", order_by="name asc")
    return roles

@frappe.whitelist()
def get_user_roles(user_email):
    _check_admin()
    # Fetch roles currently assigned to this user
    roles = frappe.get_all("Has Role", filters={"parent": user_email}, pluck="role")
    return roles

@frappe.whitelist()
def update_user_roles(user_email, roles):
    _check_admin()
    if isinstance(roles, str):
        roles = json.loads(roles)
        
    user = frappe.get_doc("User", user_email)
    
    # Remove existing roles assigned directly (not inherited)
    user.set("roles", [])
    
    for r in roles:
        user.append("roles", {
            "role": r
        })
        
    user.save(ignore_permissions=True)
    return {"status": "success"}

@frappe.whitelist()
def create_user(email, first_name, password, roles=None):
    _check_admin()
    
    if frappe.db.exists("User", email):
        frappe.throw(f"المستخدم {email} مسجل مسبقاً")
        
    user = frappe.new_doc("User")
    user.email = email
    user.first_name = first_name
    user.send_welcome_email = 0
    user.new_password = password
    user.flags.ignore_password_policy = True
    
    # Save the user first
    user.insert(ignore_permissions=True)
    
    # Add roles if provided
    if roles:
        if isinstance(roles, str):
            roles = json.loads(roles)
            
        for r in roles:
            user.append("roles", {
                "role": r
            })
        user.save(ignore_permissions=True)
        
    return {"status": "success", "user": user.name}

@frappe.whitelist()
def get_current_user_info():
    user = frappe.session.user
    if user == "Guest":
        return {"name": "Guest", "email": ""}
        
    doc = frappe.get_doc("User", user)
    return {
        "name": doc.full_name or doc.first_name or user,
        "email": doc.email,
        "roles": frappe.get_roles(user)
    }

```

### cpro/api/utils.py

```python
# Copyright (c) 2026, ahmed hashim and contributors
# For license information, please see license.txt

"""Shared helpers for the CPro API layer.

Kept dependency-light: everything here builds on ``frappe`` + ERPNext, never on
any legacy app. User-facing strings go through ``frappe._`` so the UI can be
localized (en / ar) per requirement #8 (graceful, localized errors).
"""

import frappe
from frappe import _

SETTINGS_DOCTYPE = "Cpro Settings"

# Role names shipped by CPro (mirrors cpro.install.CPRO_ROLES).
ROLE_MANAGER = "Cpro Manager"
ROLE_CASHIER = "Cpro Cashier"
ROLE_WAITER = "Cpro Waiter"
ROLE_KITCHEN = "Cpro Kitchen"


def get_settings():
	"""Return the (cached) Cpro Settings single."""
	return frappe.get_cached_doc(SETTINGS_DOCTYPE)


def has_any_role(*roles) -> bool:
	"""True if the current user has at least one of ``roles`` (System Manager always passes)."""
	user_roles = set(frappe.get_roles())
	if "System Manager" in user_roles:
		return True
	return bool(user_roles.intersection(roles))


def require_role(*roles, message: str | None = None):
	"""Guard a whitelisted method behind one or more CPro roles.

	Raises a *graceful*, localized permission error instead of a raw stack trace.
	"""
	if has_any_role(*roles):
		return
	frappe.throw(
		message or _("You do not have permission to perform this action."),
		frappe.PermissionError,
		title=_("Permission Required"),
	)


def guest_orders_allowed() -> bool:
	return bool(get_settings().allow_guest_orders)


def call_waiter_enabled() -> bool:
	return bool(get_settings().enable_call_waiter)

```

### cpro/config/__init__.py

```python

```

### cpro/cpro/__init__.py

```python

```

### cpro/cpro/doctype/__init__.py

```python

```

### cpro/cpro/doctype/cpro_item_modifier_group/__init__.py

```python

```

### cpro/cpro/doctype/cpro_item_modifier_group/cpro_item_modifier_group.json

```json
{
 "actions": [],
 "allow_rename": 1,
 "autoname": "CPROIMG.#####",
 "creation": "2026-08-20 00:00:00.000000",
 "default_view": "List",
 "doctype": "DocType",
 "editable_grid": 1,
 "engine": "InnoDB",
 "field_order": [
  "modifier_group",
  "selection_type",
  "is_required"
 ],
 "fields": [
  {
   "fieldname": "modifier_group",
   "fieldtype": "Link",
   "in_list_view": 1,
   "label": "Modifier Group",
   "options": "Cpro Modifier Group",
   "reqd": 1
  },
  {
   "fetch_from": "modifier_group.selection_type",
   "fieldname": "selection_type",
   "fieldtype": "Data",
   "in_list_view": 1,
   "label": "Selection Type",
   "read_only": 1
  },
  {
   "default": "0",
   "fetch_from": "modifier_group.is_required",
   "fieldname": "is_required",
   "fieldtype": "Check",
   "in_list_view": 1,
   "label": "Required",
   "read_only": 1
  }
 ],
 "index_web_pages_for_search": 1,
 "istable": 1,
 "links": [],
 "modified": "2026-08-20 00:00:00.000000",
 "modified_by": "Administrator",
 "module": "Cpro",
 "name": "Cpro Item Modifier Group",
 "naming_rule": "Expression (old style)",
 "owner": "Administrator",
 "permissions": [],
 "sort_field": "modified",
 "sort_order": "DESC",
 "states": []
}

```

### cpro/cpro/doctype/cpro_item_modifier_group/cpro_item_modifier_group.py

```python
# Copyright (c) 2026, ahmed hashim and contributors
# For license information, please see license.txt

from frappe.model.document import Document


class CproItemModifierGroup(Document):
	pass

```

### cpro/cpro/doctype/cpro_kitchen_station/__init__.py

```python

```

### cpro/cpro/doctype/cpro_kitchen_station/cpro_kitchen_station.json

```json
{
 "actions": [],
 "allow_rename": 1,
 "autoname": "field:station_name",
 "creation": "2026-08-20 00:00:00.000000",
 "default_view": "List",
 "doctype": "DocType",
 "editable_grid": 1,
 "engine": "InnoDB",
 "field_order": [
  "station_name",
  "column_break_main",
  "is_active",
  "display_order",
  "description"
 ],
 "fields": [
  {
   "fieldname": "station_name",
   "fieldtype": "Data",
   "in_list_view": 1,
   "label": "Station Name",
   "reqd": 1,
   "unique": 1
  },
  {
   "fieldname": "column_break_main",
   "fieldtype": "Column Break"
  },
  {
   "default": "1",
   "fieldname": "is_active",
   "fieldtype": "Check",
   "in_list_view": 1,
   "label": "Is Active"
  },
  {
   "default": "0",
   "fieldname": "display_order",
   "fieldtype": "Int",
   "label": "Display Order"
  },
  {
   "fieldname": "description",
   "fieldtype": "Small Text",
   "label": "Description"
  }
 ],
 "index_web_pages_for_search": 1,
 "links": [],
 "modified": "2026-08-20 00:00:00.000000",
 "modified_by": "Administrator",
 "module": "Cpro",
 "name": "Cpro Kitchen Station",
 "naming_rule": "By fieldname",
 "owner": "Administrator",
 "permissions": [
  {
   "create": 1,
   "delete": 1,
   "email": 1,
   "export": 1,
   "print": 1,
   "read": 1,
   "report": 1,
   "role": "System Manager",
   "select": 1,
   "share": 1,
   "write": 1
  },
  {
   "create": 1,
   "delete": 1,
   "email": 1,
   "export": 1,
   "print": 1,
   "read": 1,
   "report": 1,
   "role": "Cpro Manager",
   "select": 1,
   "share": 1,
   "write": 1
  },
  {
   "read": 1,
   "report": 1,
   "role": "Cpro Kitchen",
   "select": 1
  },
  {
   "read": 1,
   "report": 1,
   "role": "Cpro Cashier",
   "select": 1
  }
 ],
 "sort_field": "modified",
 "sort_order": "DESC",
 "states": [],
 "track_changes": 1
}

```

### cpro/cpro/doctype/cpro_kitchen_station/cpro_kitchen_station.py

```python
# Copyright (c) 2026, ahmed hashim and contributors
# For license information, please see license.txt

from frappe.model.document import Document


class CproKitchenStation(Document):
	pass

```

### cpro/cpro/doctype/cpro_kot/__init__.py

```python

```

### cpro/cpro/doctype/cpro_kot/cpro_kot.json

```json
{
 "actions": [],
 "allow_rename": 0,
 "autoname": "naming_series:",
 "creation": "2026-08-20 00:00:00.000000",
 "default_view": "List",
 "doctype": "DocType",
 "editable_grid": 1,
 "engine": "InnoDB",
 "field_order": [
  "naming_series",
  "pos_invoice",
  "table",
  "customer",
  "column_break_head",
  "status",
  "kitchen_station",
  "order_time",
  "notes_section",
  "order_notes",
  "items_section",
  "items"
 ],
 "fields": [
  {
   "default": "KOT-.YYYY.-",
   "fieldname": "naming_series",
   "fieldtype": "Select",
   "label": "Series",
   "options": "KOT-.YYYY.-",
   "reqd": 1
  },
  {
   "fieldname": "pos_invoice",
   "fieldtype": "Link",
   "label": "POS Invoice",
   "options": "POS Invoice"
  },
  {
   "fieldname": "table",
   "fieldtype": "Link",
   "in_list_view": 1,
   "label": "Table",
   "options": "Cpro Table"
  },
  {
   "fieldname": "customer",
   "fieldtype": "Link",
   "label": "Customer",
   "options": "Customer"
  },
  {
   "fieldname": "column_break_head",
   "fieldtype": "Column Break"
  },
  {
   "default": "New",
   "fieldname": "status",
   "fieldtype": "Select",
   "in_list_view": 1,
   "in_standard_filter": 1,
   "label": "Status",
   "options": "New\nPreparing\nReady\nServed\nCancelled"
  },
  {
   "fieldname": "kitchen_station",
   "fieldtype": "Link",
   "in_standard_filter": 1,
   "label": "Kitchen Station",
   "options": "Cpro Kitchen Station"
  },
  {
   "default": "Now",
   "fieldname": "order_time",
   "fieldtype": "Datetime",
   "label": "Order Time"
  },
  {
   "collapsible": 1,
   "fieldname": "notes_section",
   "fieldtype": "Section Break",
   "label": "Order Notes"
  },
  {
   "fieldname": "order_notes",
   "fieldtype": "Small Text",
   "label": "Order Notes"
  },
  {
   "fieldname": "items_section",
   "fieldtype": "Section Break",
   "label": "Items"
  },
  {
   "fieldname": "items",
   "fieldtype": "Table",
   "label": "Items",
   "options": "Cpro KOT Item"
  }
 ],
 "index_web_pages_for_search": 1,
 "links": [],
 "modified": "2026-08-20 00:00:00.000000",
 "modified_by": "Administrator",
 "module": "Cpro",
 "name": "Cpro KOT",
 "naming_rule": "By \"Naming Series\" field",
 "owner": "Administrator",
 "permissions": [
  {
   "create": 1,
   "delete": 1,
   "email": 1,
   "export": 1,
   "print": 1,
   "read": 1,
   "report": 1,
   "role": "System Manager",
   "select": 1,
   "share": 1,
   "write": 1
  },
  {
   "create": 1,
   "delete": 1,
   "email": 1,
   "export": 1,
   "print": 1,
   "read": 1,
   "report": 1,
   "role": "Cpro Manager",
   "select": 1,
   "share": 1,
   "write": 1
  },
  {
   "create": 1,
   "delete": 1,
   "print": 1,
   "read": 1,
   "report": 1,
   "role": "Cpro Cashier",
   "select": 1,
   "write": 1
  },
  {
   "create": 1,
   "print": 1,
   "read": 1,
   "report": 1,
   "role": "Cpro Waiter",
   "select": 1,
   "write": 1
  },
  {
   "print": 1,
   "read": 1,
   "report": 1,
   "role": "Cpro Kitchen",
   "select": 1,
   "write": 1
  }
 ],
 "sort_field": "modified",
 "sort_order": "DESC",
 "states": [],
 "track_changes": 1
}

```

### cpro/cpro/doctype/cpro_kot/cpro_kot.py

```python
# Copyright (c) 2026, ahmed hashim and contributors
# For license information, please see license.txt

"""Cpro KOT (Kitchen Order Ticket) controller.

Derives the ticket's overall status from its line items and pushes a realtime
update to KDS / POS listeners on every save. Terminal ``Cancelled`` is never
overridden by the rollup.
"""

import frappe
from frappe.model.document import Document
from frappe.utils import now_datetime

from cpro.api.kitchen import publish_kot_update


class CproKOT(Document):
	def validate(self):
		if not self.order_time:
			self.order_time = now_datetime()
		self._rollup_status()

	def on_update(self):
		publish_kot_update(self)

	def _rollup_status(self):
		"""Roll the line-item statuses up into the ticket status."""
		if self.status == "Cancelled" or not self.items:
			return

		statuses = {(row.status or "New") for row in self.items}
		if statuses <= {"Served"}:
			self.status = "Served"
		elif statuses <= {"Ready", "Served"}:
			self.status = "Ready"
		elif statuses & {"Preparing", "Ready", "Served"}:
			self.status = "Preparing"
		else:
			self.status = "New"

```

### cpro/cpro/doctype/cpro_kot_item/__init__.py

```python

```

### cpro/cpro/doctype/cpro_kot_item/cpro_kot_item.json

```json
{
 "actions": [],
 "allow_rename": 1,
 "autoname": "CPROKOTI.#####",
 "creation": "2026-08-20 00:00:00.000000",
 "default_view": "List",
 "doctype": "DocType",
 "editable_grid": 1,
 "engine": "InnoDB",
 "field_order": [
  "item",
  "item_name",
  "qty",
  "status",
  "kitchen_station",
  "notes",
  "modifiers_summary"
 ],
 "fields": [
  {
   "fieldname": "item",
   "fieldtype": "Link",
   "in_list_view": 1,
   "label": "Item",
   "options": "Item",
   "reqd": 1
  },
  {
   "fetch_from": "item.item_name",
   "fieldname": "item_name",
   "fieldtype": "Data",
   "in_list_view": 1,
   "label": "Item Name",
   "read_only": 1
  },
  {
   "default": "1",
   "fieldname": "qty",
   "fieldtype": "Float",
   "in_list_view": 1,
   "label": "Qty"
  },
  {
   "default": "New",
   "fieldname": "status",
   "fieldtype": "Select",
   "in_list_view": 1,
   "label": "Status",
   "options": "New\nPreparing\nReady\nServed"
  },
  {
   "fieldname": "kitchen_station",
   "fieldtype": "Link",
   "label": "Kitchen Station",
   "options": "Cpro Kitchen Station"
  },
  {
   "description": "Critical preparation notes (e.g. \"No onions\", \"Peanut allergy\"). Highlighted in red on POS, receipt and KDS.",
   "fieldname": "notes",
   "fieldtype": "Small Text",
   "in_list_view": 1,
   "label": "Notes"
  },
  {
   "fieldname": "modifiers_summary",
   "fieldtype": "Small Text",
   "label": "Modifiers",
   "read_only": 1
  }
 ],
 "index_web_pages_for_search": 1,
 "istable": 1,
 "links": [],
 "modified": "2026-08-20 00:00:00.000000",
 "modified_by": "Administrator",
 "module": "Cpro",
 "name": "Cpro KOT Item",
 "naming_rule": "Expression (old style)",
 "owner": "Administrator",
 "permissions": [],
 "sort_field": "modified",
 "sort_order": "DESC",
 "states": []
}

```

### cpro/cpro/doctype/cpro_kot_item/cpro_kot_item.py

```python
# Copyright (c) 2026, ahmed hashim and contributors
# For license information, please see license.txt

from frappe.model.document import Document


class CproKOTItem(Document):
	pass

```

### cpro/cpro/doctype/cpro_menu/__init__.py

```python

```

### cpro/cpro/doctype/cpro_menu/cpro_menu.json

```json
{
 "actions": [],
 "allow_rename": 1,
 "autoname": "field:menu_name",
 "creation": "2026-08-20 00:00:00.000000",
 "default_view": "List",
 "doctype": "DocType",
 "editable_grid": 1,
 "engine": "InnoDB",
 "field_order": [
  "menu_name",
  "is_active",
  "is_default",
  "column_break_head",
  "description",
  "items_section",
  "items"
 ],
 "fields": [
  {
   "fieldname": "menu_name",
   "fieldtype": "Data",
   "in_list_view": 1,
   "label": "Menu Name",
   "reqd": 1,
   "unique": 1
  },
  {
   "default": "1",
   "fieldname": "is_active",
   "fieldtype": "Check",
   "in_list_view": 1,
   "label": "Active"
  },
  {
   "default": "0",
   "description": "The menu served to the POS and portal when no specific menu is requested. Only one menu can be the default.",
   "fieldname": "is_default",
   "fieldtype": "Check",
   "in_list_view": 1,
   "label": "Default Menu"
  },
  {
   "fieldname": "column_break_head",
   "fieldtype": "Column Break"
  },
  {
   "fieldname": "description",
   "fieldtype": "Small Text",
   "label": "Description"
  },
  {
   "fieldname": "items_section",
   "fieldtype": "Section Break",
   "label": "Menu Items"
  },
  {
   "fieldname": "items",
   "fieldtype": "Table",
   "label": "Items",
   "options": "Cpro Menu Item"
  }
 ],
 "index_web_pages_for_search": 1,
 "links": [],
 "modified": "2026-08-20 00:00:00.000000",
 "modified_by": "Administrator",
 "module": "Cpro",
 "name": "Cpro Menu",
 "naming_rule": "By fieldname",
 "owner": "Administrator",
 "permissions": [
  {
   "create": 1,
   "delete": 1,
   "email": 1,
   "export": 1,
   "print": 1,
   "read": 1,
   "report": 1,
   "role": "System Manager",
   "select": 1,
   "share": 1,
   "write": 1
  },
  {
   "create": 1,
   "delete": 1,
   "email": 1,
   "export": 1,
   "print": 1,
   "read": 1,
   "report": 1,
   "role": "Cpro Manager",
   "select": 1,
   "share": 1,
   "write": 1
  },
  {
   "read": 1,
   "report": 1,
   "role": "Cpro Cashier",
   "select": 1
  },
  {
   "read": 1,
   "report": 1,
   "role": "Cpro Waiter",
   "select": 1
  }
 ],
 "sort_field": "modified",
 "sort_order": "DESC",
 "states": [],
 "track_changes": 1
}

```

### cpro/cpro/doctype/cpro_menu/cpro_menu.py

```python
# Copyright (c) 2026, ahmed hashim and contributors
# For license information, please see license.txt

"""Cpro Menu.

A curated, orderable collection of items grouped into menu categories. The POS
and the customer portal render whatever the active/default menu exposes, giving
admins full control over what shows, in what order, and under which section —
without touching ERPNext Item masters. Exactly one menu may be the default.
"""

import frappe
from frappe.model.document import Document


class CproMenu(Document):
	def validate(self):
		self._enforce_single_default()

	def on_update(self):
		self._sync_pricing()

	def _sync_pricing(self):
		"""Create/Update a Price List matching this Menu's name, and set Item Prices."""
		if not frappe.db.exists("Price List", self.menu_name):
			pl = frappe.new_doc("Price List")
			pl.price_list_name = self.menu_name
			pl.selling = 1
			pl.buying = 0
			pl.enabled = 1
			pl.insert(ignore_permissions=True)
			
		for row in self.items:
			if not row.item or row.price is None:
				continue
				
			# Check if Item Price exists for this Price List and Item
			existing_price = frappe.db.get_value("Item Price", {
				"price_list": self.menu_name,
				"item_code": row.item
			}, "name")
			
			if existing_price:
				frappe.db.set_value("Item Price", existing_price, "price_list_rate", row.price)
			else:
				p = frappe.new_doc("Item Price")
				p.price_list = self.menu_name
				p.item_code = row.item
				p.price_list_rate = row.price
				p.insert(ignore_permissions=True)

	def _enforce_single_default(self):
		if not self.is_default:
			return
		# Clear the default flag on every other menu so exactly one stays default.
		others = frappe.get_all(
			"Cpro Menu", filters={"is_default": 1, "name": ["!=", self.name or ""]}, pluck="name"
		)
		for name in others:
			frappe.db.set_value("Cpro Menu", name, "is_default", 0)

```

### cpro/cpro/doctype/cpro_menu_category/__init__.py

```python

```

### cpro/cpro/doctype/cpro_menu_category/cpro_menu_category.json

```json
{
 "actions": [],
 "allow_rename": 1,
 "autoname": "field:category_name",
 "creation": "2026-08-20 00:00:00.000000",
 "default_view": "List",
 "doctype": "DocType",
 "editable_grid": 1,
 "engine": "InnoDB",
 "field_order": [
  "category_name",
  "display_name",
  "is_active",
  "column_break_head",
  "sequence",
  "image",
  "description"
 ],
 "fields": [
  {
   "fieldname": "category_name",
   "fieldtype": "Data",
   "in_list_view": 1,
   "label": "Category Name",
   "reqd": 1,
   "unique": 1
  },
  {
   "description": "Optional label shown to customers/cashiers (defaults to the category name).",
   "fieldname": "display_name",
   "fieldtype": "Data",
   "in_list_view": 1,
   "label": "Display Name"
  },
  {
   "default": "1",
   "fieldname": "is_active",
   "fieldtype": "Check",
   "in_list_view": 1,
   "label": "Active"
  },
  {
   "fieldname": "column_break_head",
   "fieldtype": "Column Break"
  },
  {
   "default": "0",
   "description": "Lower numbers appear first.",
   "fieldname": "sequence",
   "fieldtype": "Int",
   "in_list_view": 1,
   "label": "Sort Order"
  },
  {
   "fieldname": "image",
   "fieldtype": "Attach Image",
   "label": "Image"
  },
  {
   "fieldname": "description",
   "fieldtype": "Small Text",
   "label": "Description"
  }
 ],
 "image_field": "image",
 "index_web_pages_for_search": 1,
 "links": [],
 "modified": "2026-08-20 00:00:00.000000",
 "modified_by": "Administrator",
 "module": "Cpro",
 "name": "Cpro Menu Category",
 "naming_rule": "By fieldname",
 "owner": "Administrator",
 "permissions": [
  {
   "create": 1,
   "delete": 1,
   "email": 1,
   "export": 1,
   "print": 1,
   "read": 1,
   "report": 1,
   "role": "System Manager",
   "select": 1,
   "share": 1,
   "write": 1
  },
  {
   "create": 1,
   "delete": 1,
   "email": 1,
   "export": 1,
   "print": 1,
   "read": 1,
   "report": 1,
   "role": "Cpro Manager",
   "select": 1,
   "share": 1,
   "write": 1
  },
  {
   "read": 1,
   "report": 1,
   "role": "Cpro Cashier",
   "select": 1
  },
  {
   "read": 1,
   "report": 1,
   "role": "Cpro Waiter",
   "select": 1
  }
 ],
 "sort_field": "sequence",
 "sort_order": "ASC",
 "states": [],
 "track_changes": 1
}

```

### cpro/cpro/doctype/cpro_menu_category/cpro_menu_category.py

```python
# Copyright (c) 2026, ahmed hashim and contributors
# For license information, please see license.txt

from frappe.model.document import Document


class CproMenuCategory(Document):
	"""A curated menu section (e.g. Starters, Mains, Drinks) with its own sort
	order, display label, image and visibility — independent of ERPNext Item
	Groups so admins control exactly how the menu presents."""

	pass

```

### cpro/cpro/doctype/cpro_menu_item/__init__.py

```python

```

### cpro/cpro/doctype/cpro_menu_item/cpro_menu_item.json

```json
{
 "actions": [],
 "allow_rename": 1,
 "creation": "2026-08-20 00:00:00.000000",
 "doctype": "DocType",
 "editable_grid": 1,
 "engine": "InnoDB",
 "field_order": [
  "item",
  "item_name",
  "menu_category",
  "price",
  "display_name",
  "sequence",
  "is_featured",
  "hidden"
 ],
 "fields": [
  {
   "columns": 3,
   "fieldname": "item",
   "fieldtype": "Link",
   "in_list_view": 1,
   "label": "Item",
   "options": "Item",
   "reqd": 1
  },
  {
   "columns": 2,
   "fetch_from": "item.item_name",
   "fieldname": "item_name",
   "fieldtype": "Data",
   "in_list_view": 1,
   "label": "Item Name",
   "read_only": 1
  },
  {
   "columns": 2,
   "fieldname": "menu_category",
   "fieldtype": "Link",
   "in_list_view": 1,
   "label": "Category",
   "options": "Cpro Menu Category"
  },
  {
   "description": "Overrides the item name on the menu (optional).",
   "fieldname": "display_name",
   "fieldtype": "Data",
   "label": "Display Name"
  },
  {
   "columns": 2,
   "fieldname": "price",
   "fieldtype": "Currency",
   "in_list_view": 1,
   "label": "Price",
   "reqd": 1,
   "default": "0"
  },
  {
   "columns": 1,
   "default": "0",
   "fieldname": "sequence",
   "fieldtype": "Int",
   "in_list_view": 1,
   "label": "Sort"
  },
  {
   "columns": 1,
   "default": "0",
   "fieldname": "is_featured",
   "fieldtype": "Check",
   "in_list_view": 1,
   "label": "Featured"
  },
  {
   "columns": 1,
   "default": "0",
   "description": "Keep on the menu record but hide from POS / portal display.",
   "fieldname": "hidden",
   "fieldtype": "Check",
   "in_list_view": 1,
   "label": "Hidden"
  }
 ],
 "index_web_pages_for_search": 1,
 "istable": 1,
 "links": [],
 "modified": "2026-08-20 00:00:00.000000",
 "modified_by": "Administrator",
 "module": "Cpro",
 "name": "Cpro Menu Item",
 "owner": "Administrator",
 "permissions": [],
 "sort_field": "modified",
 "sort_order": "DESC",
 "states": [],
 "track_changes": 1
}

```

### cpro/cpro/doctype/cpro_menu_item/cpro_menu_item.py

```python
# Copyright (c) 2026, ahmed hashim and contributors
# For license information, please see license.txt

from frappe.model.document import Document


class CproMenuItem(Document):
	"""A line on a Cpro Menu: an Item placed into a category with its own sort
	order, optional display-name override, featured flag, and a hide toggle."""

	pass

```

### cpro/cpro/doctype/cpro_modifier/__init__.py

```python

```

### cpro/cpro/doctype/cpro_modifier/cpro_modifier.json

```json
{
 "actions": [],
 "allow_rename": 1,
 "autoname": "CPROMOD.#####",
 "creation": "2026-08-20 00:00:00.000000",
 "default_view": "List",
 "doctype": "DocType",
 "editable_grid": 1,
 "engine": "InnoDB",
 "field_order": [
  "modifier_name",
  "item",
  "item_name",
  "rate",
  "default_selected",
  "is_available"
 ],
 "fields": [
  {
   "fieldname": "modifier_name",
   "fieldtype": "Data",
   "in_list_view": 1,
   "label": "Modifier Name",
   "reqd": 1
  },
  {
   "description": "Optional stock item. When set, the price and raw-material deduction come from this item.",
   "fieldname": "item",
   "fieldtype": "Link",
   "in_list_view": 1,
   "label": "Item",
   "options": "Item"
  },
  {
   "fetch_from": "item.item_name",
   "fieldname": "item_name",
   "fieldtype": "Data",
   "label": "Item Name",
   "read_only": 1
  },
  {
   "default": "0",
   "fieldname": "rate",
   "fieldtype": "Currency",
   "in_list_view": 1,
   "label": "Extra Price"
  },
  {
   "default": "0",
   "fieldname": "default_selected",
   "fieldtype": "Check",
   "label": "Selected by Default"
  },
  {
   "default": "1",
   "fieldname": "is_available",
   "fieldtype": "Check",
   "in_list_view": 1,
   "label": "Available"
  }
 ],
 "index_web_pages_for_search": 1,
 "istable": 1,
 "links": [],
 "modified": "2026-08-20 00:00:00.000000",
 "modified_by": "Administrator",
 "module": "Cpro",
 "name": "Cpro Modifier",
 "naming_rule": "Expression (old style)",
 "owner": "Administrator",
 "permissions": [],
 "sort_field": "modified",
 "sort_order": "DESC",
 "states": []
}

```

### cpro/cpro/doctype/cpro_modifier/cpro_modifier.py

```python
# Copyright (c) 2026, ahmed hashim and contributors
# For license information, please see license.txt

from frappe.model.document import Document


class CproModifier(Document):
	pass

```

### cpro/cpro/doctype/cpro_modifier_group/__init__.py

```python

```

### cpro/cpro/doctype/cpro_modifier_group/cpro_modifier_group.json

```json
{
 "actions": [],
 "allow_rename": 1,
 "autoname": "field:group_name",
 "creation": "2026-08-20 00:00:00.000000",
 "default_view": "List",
 "doctype": "DocType",
 "editable_grid": 1,
 "engine": "InnoDB",
 "field_order": [
  "group_name",
  "selection_type",
  "column_break_main",
  "is_required",
  "min_selection",
  "max_selection",
  "modifiers_section",
  "modifiers"
 ],
 "fields": [
  {
   "fieldname": "group_name",
   "fieldtype": "Data",
   "in_list_view": 1,
   "label": "Group Name",
   "reqd": 1,
   "unique": 1
  },
  {
   "default": "Single",
   "fieldname": "selection_type",
   "fieldtype": "Select",
   "in_list_view": 1,
   "label": "Selection Type",
   "options": "Single\nMultiple"
  },
  {
   "fieldname": "column_break_main",
   "fieldtype": "Column Break"
  },
  {
   "default": "0",
   "fieldname": "is_required",
   "fieldtype": "Check",
   "label": "Is Required"
  },
  {
   "default": "0",
   "depends_on": "eval:doc.selection_type=='Multiple'",
   "fieldname": "min_selection",
   "fieldtype": "Int",
   "label": "Min Selection"
  },
  {
   "default": "0",
   "depends_on": "eval:doc.selection_type=='Multiple'",
   "description": "0 means unlimited.",
   "fieldname": "max_selection",
   "fieldtype": "Int",
   "label": "Max Selection"
  },
  {
   "fieldname": "modifiers_section",
   "fieldtype": "Section Break",
   "label": "Modifiers"
  },
  {
   "fieldname": "modifiers",
   "fieldtype": "Table",
   "label": "Modifiers",
   "options": "Cpro Modifier"
  }
 ],
 "index_web_pages_for_search": 1,
 "links": [],
 "modified": "2026-08-20 00:00:00.000000",
 "modified_by": "Administrator",
 "module": "Cpro",
 "name": "Cpro Modifier Group",
 "naming_rule": "By fieldname",
 "owner": "Administrator",
 "permissions": [
  {
   "create": 1,
   "delete": 1,
   "email": 1,
   "export": 1,
   "print": 1,
   "read": 1,
   "report": 1,
   "role": "System Manager",
   "select": 1,
   "share": 1,
   "write": 1
  },
  {
   "create": 1,
   "delete": 1,
   "email": 1,
   "export": 1,
   "print": 1,
   "read": 1,
   "report": 1,
   "role": "Cpro Manager",
   "select": 1,
   "share": 1,
   "write": 1
  },
  {
   "read": 1,
   "report": 1,
   "role": "Cpro Cashier",
   "select": 1
  },
  {
   "read": 1,
   "report": 1,
   "role": "Cpro Waiter",
   "select": 1
  }
 ],
 "sort_field": "modified",
 "sort_order": "DESC",
 "states": [],
 "track_changes": 1
}

```

### cpro/cpro/doctype/cpro_modifier_group/cpro_modifier_group.py

```python
# Copyright (c) 2026, ahmed hashim and contributors
# For license information, please see license.txt

"""Cpro Modifier Group controller — keeps selection bounds coherent."""

import frappe
from frappe import _
from frappe.model.document import Document


class CproModifierGroup(Document):
	def validate(self):
		if self.selection_type == "Single":
			# Exactly one choice: required → 1, optional → 0..1.
			self.min_selection = 1 if self.is_required else 0
			self.max_selection = 1
			return

		# Multiple selection.
		if self.is_required and not self.min_selection:
			self.min_selection = 1
		if self.min_selection and self.max_selection and self.min_selection > self.max_selection:
			frappe.throw(_("Minimum selection cannot be greater than maximum selection."))

```

### cpro/cpro/doctype/cpro_order_audit_log/__init__.py

```python

```

### cpro/cpro/doctype/cpro_order_audit_log/cpro_order_audit_log.js

```javascript
// Copyright (c) 2026, ahmed hashim and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Cpro Order Audit Log", {
// 	refresh(frm) {

// 	},
// });

```

### cpro/cpro/doctype/cpro_order_audit_log/cpro_order_audit_log.json

```json
{
 "actions": [],
 "allow_bulk_edit": 1,
 "allow_rename": 1,
 "autoname": "format:AUDIT-{YY}-{MM}-{#####}",
 "creation": "2026-08-21 04:10:07.322225",
 "doctype": "DocType",
 "editable_grid": 1,
 "engine": "InnoDB",
 "field_order": [
  "pos_invoice",
  "action",
  "reason",
  "user",
  "timestamp",
  "food_status"
 ],
 "fields": [
  {
   "fieldname": "pos_invoice",
   "fieldtype": "Link",
   "in_list_view": 1,
   "label": "POS Invoice",
   "options": "POS Invoice",
   "reqd": 1
  },
  {
   "fieldname": "action",
   "fieldtype": "Select",
   "in_list_view": 1,
   "label": "Action",
   "options": "Cancelled\nAmended",
   "reqd": 1
  },
  {
   "fieldname": "reason",
   "fieldtype": "Small Text",
   "label": "Reason",
   "reqd": 1
  },
  {
   "fieldname": "user",
   "fieldtype": "Link",
   "in_list_view": 1,
   "label": "User",
   "options": "User",
   "reqd": 1
  },
  {
   "fieldname": "timestamp",
   "fieldtype": "Datetime",
   "in_list_view": 1,
   "label": "Timestamp",
   "reqd": 1
  },
  {
   "fieldname": "food_status",
   "fieldtype": "Data",
   "in_list_view": 1,
   "label": "Food Status"
  }
 ],
 "grid_page_length": 50,
 "index_web_pages_for_search": 1,
 "links": [],
 "modified": "2026-08-21 04:20:50.906662",
 "modified_by": "Administrator",
 "module": "Cpro",
 "name": "Cpro Order Audit Log",
 "naming_rule": "Expression (old style)",
 "owner": "Administrator",
 "permissions": [
  {
   "create": 1,
   "email": 1,
   "export": 1,
   "print": 1,
   "read": 1,
   "report": 1,
   "role": "Cpro Manager",
   "share": 1,
   "write": 1
  },
  {
   "create": 1,
   "email": 1,
   "export": 1,
   "print": 1,
   "read": 1,
   "report": 1,
   "role": "Cpro Cashier",
   "share": 1,
   "write": 1
  },
  {
   "create": 1,
   "delete": 1,
   "email": 1,
   "export": 1,
   "print": 1,
   "read": 1,
   "report": 1,
   "role": "System Manager",
   "share": 1,
   "write": 1
  }
 ],
 "row_format": "Dynamic",
 "rows_threshold_for_grid_search": 20,
 "sort_field": "creation",
 "sort_order": "DESC",
 "states": []
}

```

### cpro/cpro/doctype/cpro_order_audit_log/cpro_order_audit_log.py

```python
# Copyright (c) 2026, ahmed hashim and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class CproOrderAuditLog(Document):
	pass

```

### cpro/cpro/doctype/cpro_order_audit_log/test_cpro_order_audit_log.py

```python
# Copyright (c) 2026, ahmed hashim and Contributors
# See license.txt

# import frappe
from frappe.tests import IntegrationTestCase


# On IntegrationTestCase, the doctype test records and all
# link-field test record dependencies are recursively loaded
# Use these module variables to add/remove to/from that list
EXTRA_TEST_RECORD_DEPENDENCIES = []  # eg. ["User"]
IGNORE_TEST_RECORD_DEPENDENCIES = []  # eg. ["User"]



class IntegrationTestCproOrderAuditLog(IntegrationTestCase):
	"""
	Integration tests for CproOrderAuditLog.
	Use this class for testing interactions between multiple components.
	"""

	pass

```

### cpro/cpro/doctype/cpro_portal_banner/__init__.py

```python

```

### cpro/cpro/doctype/cpro_portal_banner/cpro_portal_banner.json

```json
{
 "actions": [],
 "allow_bulk_edit": 1,
 "allow_rename": 1,
 "creation": "2026-08-21 04:30:21.278731",
 "doctype": "DocType",
 "editable_grid": 1,
 "engine": "InnoDB",
 "field_order": [
  "image"
 ],
 "fields": [
  {
   "fieldname": "image",
   "fieldtype": "Attach Image",
   "in_list_view": 1,
   "label": "Banner Image",
   "reqd": 1
  }
 ],
 "grid_page_length": 50,
 "index_web_pages_for_search": 1,
 "istable": 1,
 "links": [],
 "modified": "2026-08-21 04:30:21.278731",
 "modified_by": "Administrator",
 "module": "Cpro",
 "name": "Cpro Portal Banner",
 "owner": "Administrator",
 "permissions": [],
 "row_format": "Dynamic",
 "rows_threshold_for_grid_search": 20,
 "sort_field": "creation",
 "sort_order": "DESC",
 "states": []
}

```

### cpro/cpro/doctype/cpro_portal_banner/cpro_portal_banner.py

```python
# Copyright (c) 2026, ahmed hashim and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class CproPortalBanner(Document):
	pass

```

### cpro/cpro/doctype/cpro_portal_settings/__init__.py

```python

```

### cpro/cpro/doctype/cpro_portal_settings/cpro_portal_settings.js

```javascript
// Copyright (c) 2026, ahmed hashim and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Cpro Portal Settings", {
// 	refresh(frm) {

// 	},
// });

```

### cpro/cpro/doctype/cpro_portal_settings/cpro_portal_settings.json

```json
{
 "actions": [],
 "allow_bulk_edit": 1,
 "allow_rename": 1,
 "creation": "2026-08-21 04:31:03.515884",
 "doctype": "DocType",
 "editable_grid": 1,
 "engine": "InnoDB",
 "field_order": [
  "enable_online_ordering",
  "banners_section",
  "banners"
 ],
 "fields": [
  {
   "default": "1",
   "fieldname": "enable_online_ordering",
   "fieldtype": "Check",
   "label": "Enable Online Ordering (Add to Cart)"
  },
  {
   "fieldname": "banners_section",
   "fieldtype": "Section Break",
   "label": "Banners"
  },
  {
   "fieldname": "banners",
   "fieldtype": "Table",
   "label": "Banners",
   "options": "Cpro Portal Banner"
  }
 ],
 "grid_page_length": 50,
 "index_web_pages_for_search": 1,
 "issingle": 1,
 "links": [],
 "modified": "2026-08-21 04:31:03.515884",
 "modified_by": "Administrator",
 "module": "Cpro",
 "name": "Cpro Portal Settings",
 "owner": "Administrator",
 "permissions": [
  {
   "create": 1,
   "delete": 1,
   "email": 1,
   "print": 1,
   "read": 1,
   "role": "Cpro Manager",
   "share": 1,
   "write": 1
  }
 ],
 "row_format": "Dynamic",
 "rows_threshold_for_grid_search": 20,
 "sort_field": "creation",
 "sort_order": "DESC",
 "states": []
}

```

### cpro/cpro/doctype/cpro_portal_settings/cpro_portal_settings.py

```python
# Copyright (c) 2026, ahmed hashim and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class CproPortalSettings(Document):
	pass

```

### cpro/cpro/doctype/cpro_portal_settings/test_cpro_portal_settings.py

```python
# Copyright (c) 2026, ahmed hashim and Contributors
# See license.txt

# import frappe
from frappe.tests import IntegrationTestCase


# On IntegrationTestCase, the doctype test records and all
# link-field test record dependencies are recursively loaded
# Use these module variables to add/remove to/from that list
EXTRA_TEST_RECORD_DEPENDENCIES = []  # eg. ["User"]
IGNORE_TEST_RECORD_DEPENDENCIES = []  # eg. ["User"]



class IntegrationTestCproPortalSettings(IntegrationTestCase):
	"""
	Integration tests for CproPortalSettings.
	Use this class for testing interactions between multiple components.
	"""

	pass

```

### cpro/cpro/doctype/cpro_pos_balance_detail/__init__.py

```python

```

### cpro/cpro/doctype/cpro_pos_balance_detail/cpro_pos_balance_detail.json

```json
{
 "actions": [],
 "allow_rename": 1,
 "creation": "2026-08-20 00:00:00.000000",
 "doctype": "DocType",
 "editable_grid": 1,
 "engine": "InnoDB",
 "field_order": [
  "mode_of_payment",
  "opening_amount",
  "expected_amount",
  "closing_amount",
  "difference"
 ],
 "fields": [
  {
   "columns": 3,
   "fieldname": "mode_of_payment",
   "fieldtype": "Link",
   "in_list_view": 1,
   "label": "Mode of Payment",
   "options": "Mode of Payment",
   "reqd": 1
  },
  {
   "columns": 2,
   "default": "0",
   "fieldname": "opening_amount",
   "fieldtype": "Currency",
   "in_list_view": 1,
   "label": "Opening Amount",
   "options": "company:company_currency"
  },
  {
   "columns": 2,
   "fieldname": "expected_amount",
   "fieldtype": "Currency",
   "in_list_view": 1,
   "label": "Expected",
   "options": "company:company_currency",
   "read_only": 1
  },
  {
   "columns": 2,
   "default": "0",
   "fieldname": "closing_amount",
   "fieldtype": "Currency",
   "in_list_view": 1,
   "label": "Counted (Closing)",
   "options": "company:company_currency"
  },
  {
   "columns": 2,
   "fieldname": "difference",
   "fieldtype": "Currency",
   "in_list_view": 1,
   "label": "Difference",
   "options": "company:company_currency",
   "read_only": 1
  }
 ],
 "index_web_pages_for_search": 1,
 "istable": 1,
 "links": [],
 "modified": "2026-08-20 00:00:00.000000",
 "modified_by": "Administrator",
 "module": "Cpro",
 "name": "Cpro POS Balance Detail",
 "owner": "Administrator",
 "permissions": [],
 "sort_field": "modified",
 "sort_order": "DESC",
 "states": [],
 "track_changes": 1
}

```

### cpro/cpro/doctype/cpro_pos_balance_detail/cpro_pos_balance_detail.py

```python
# Copyright (c) 2026, ahmed hashim and contributors
# For license information, please see license.txt

from frappe.model.document import Document


class CproPOSBalanceDetail(Document):
	"""Per-mode-of-payment cash figures, shared by opening and closing shifts.

	Opening shifts fill only ``opening_amount``; closing shifts fill
	``closing_amount`` (counted) while ``expected_amount`` / ``difference`` are
	computed from the shift's POS Invoices.
	"""

	pass

```

### cpro/cpro/doctype/cpro_pos_closing_shift/__init__.py

```python

```

### cpro/cpro/doctype/cpro_pos_closing_shift/cpro_pos_closing_shift.json

```json
{
 "actions": [],
 "allow_rename": 0,
 "autoname": "naming_series:",
 "creation": "2026-08-20 00:00:00.000000",
 "default_view": "List",
 "doctype": "DocType",
 "editable_grid": 1,
 "engine": "InnoDB",
 "field_order": [
  "naming_series",
  "pos_opening_shift",
  "posting_date",
  "column_break_head",
  "period_start_datetime",
  "period_end_datetime",
  "pos_profile",
  "company",
  "user",
  "status",
  "totals_section",
  "pos_invoice_count",
  "total_quantity",
  "column_break_totals",
  "net_total",
  "total_taxes_and_charges",
  "grand_total",
  "reconciliation_section",
  "payment_reconciliation",
  "notes_section",
  "closing_notes"
 ],
 "fields": [
  {
   "default": "CPOS-CLOSE-.YYYY.-",
   "fieldname": "naming_series",
   "fieldtype": "Select",
   "label": "Series",
   "options": "CPOS-CLOSE-.YYYY.-",
   "reqd": 1
  },
  {
   "fieldname": "pos_opening_shift",
   "fieldtype": "Link",
   "in_list_view": 1,
   "label": "Opening Shift",
   "options": "Cpro POS Opening Shift",
   "reqd": 1
  },
  {
   "default": "Today",
   "fieldname": "posting_date",
   "fieldtype": "Date",
   "label": "Posting Date",
   "reqd": 1
  },
  {
   "fieldname": "column_break_head",
   "fieldtype": "Column Break"
  },
  {
   "fetch_from": "pos_opening_shift.period_start_datetime",
   "fieldname": "period_start_datetime",
   "fieldtype": "Datetime",
   "label": "Opened At",
   "read_only": 1
  },
  {
   "default": "Now",
   "fieldname": "period_end_datetime",
   "fieldtype": "Datetime",
   "in_list_view": 1,
   "label": "Closed At",
   "reqd": 1
  },
  {
   "fetch_from": "pos_opening_shift.pos_profile",
   "fieldname": "pos_profile",
   "fieldtype": "Link",
   "in_standard_filter": 1,
   "label": "POS Profile",
   "options": "POS Profile",
   "read_only": 1
  },
  {
   "fetch_from": "pos_opening_shift.company",
   "fieldname": "company",
   "fieldtype": "Link",
   "label": "Company",
   "options": "Company",
   "read_only": 1
  },
  {
   "fetch_from": "pos_opening_shift.user",
   "fieldname": "user",
   "fieldtype": "Link",
   "in_list_view": 1,
   "in_standard_filter": 1,
   "label": "Cashier",
   "options": "User",
   "read_only": 1
  },
  {
   "default": "Draft",
   "fieldname": "status",
   "fieldtype": "Select",
   "in_list_view": 1,
   "in_standard_filter": 1,
   "label": "Status",
   "options": "Draft\nSubmitted",
   "read_only": 1
  },
  {
   "fieldname": "totals_section",
   "fieldtype": "Section Break",
   "label": "Sales Summary"
  },
  {
   "fieldname": "pos_invoice_count",
   "fieldtype": "Int",
   "label": "POS Invoices",
   "read_only": 1
  },
  {
   "fieldname": "total_quantity",
   "fieldtype": "Float",
   "label": "Total Quantity",
   "read_only": 1
  },
  {
   "fieldname": "column_break_totals",
   "fieldtype": "Column Break"
  },
  {
   "fieldname": "net_total",
   "fieldtype": "Currency",
   "label": "Net Total",
   "options": "company:company_currency",
   "read_only": 1
  },
  {
   "fieldname": "total_taxes_and_charges",
   "fieldtype": "Currency",
   "label": "Total Taxes & Charges",
   "options": "company:company_currency",
   "read_only": 1
  },
  {
   "fieldname": "grand_total",
   "fieldtype": "Currency",
   "label": "Grand Total",
   "options": "company:company_currency",
   "read_only": 1
  },
  {
   "fieldname": "reconciliation_section",
   "fieldtype": "Section Break",
   "label": "Payment Reconciliation"
  },
  {
   "description": "Expected is computed from this shift's paid POS Invoices; enter the counted amount to see the difference.",
   "fieldname": "payment_reconciliation",
   "fieldtype": "Table",
   "label": "Payment Reconciliation",
   "options": "Cpro POS Balance Detail"
  },
  {
   "collapsible": 1,
   "fieldname": "notes_section",
   "fieldtype": "Section Break",
   "label": "Notes"
  },
  {
   "fieldname": "closing_notes",
   "fieldtype": "Small Text",
   "label": "Closing Notes"
  }
 ],
 "index_web_pages_for_search": 1,
 "is_submittable": 1,
 "links": [],
 "modified": "2026-08-20 00:00:00.000000",
 "modified_by": "Administrator",
 "module": "Cpro",
 "name": "Cpro POS Closing Shift",
 "naming_rule": "By \"Naming Series\" field",
 "owner": "Administrator",
 "permissions": [
  {
   "cancel": 1,
   "create": 1,
   "delete": 1,
   "email": 1,
   "print": 1,
   "read": 1,
   "report": 1,
   "role": "System Manager",
   "select": 1,
   "share": 1,
   "submit": 1,
   "write": 1
  },
  {
   "cancel": 1,
   "create": 1,
   "delete": 1,
   "email": 1,
   "print": 1,
   "read": 1,
   "report": 1,
   "role": "Cpro Manager",
   "select": 1,
   "share": 1,
   "submit": 1,
   "write": 1
  },
  {
   "create": 1,
   "print": 1,
   "read": 1,
   "report": 1,
   "role": "Cpro Cashier",
   "select": 1,
   "submit": 1,
   "write": 1
  },
  {
   "read": 1,
   "report": 1,
   "role": "Cpro Waiter",
   "select": 1
  }
 ],
 "sort_field": "modified",
 "sort_order": "DESC",
 "states": [],
 "track_changes": 1
}

```

### cpro/cpro/doctype/cpro_pos_closing_shift/cpro_pos_closing_shift.py

```python
# Copyright (c) 2026, ahmed hashim and contributors
# For license information, please see license.txt

"""Cpro POS Closing Shift.

Reconciles a shift at hand-off: pulls the sales totals and expected cash (by
payment mode) from the POS Invoices raised during the shift, compares them
against the cashier's counted amounts, and closes the linked Opening Shift on
submit.
"""

import frappe
from frappe import _
from frappe.model.document import Document
from frappe.utils import flt, now_datetime


class CproPOSClosingShift(Document):
	def validate(self):
		if not self.period_end_datetime:
			self.period_end_datetime = now_datetime()
		self._validate_opening_shift()
		self._pull_aggregates()

	def on_submit(self):
		self.db_set("status", "Submitted")
		frappe.db.set_value("Cpro POS Opening Shift", self.pos_opening_shift, "status", "Closed")

	def on_cancel(self):
		self.db_set("status", "Draft")
		# Re-open the shift so it can be reconciled again.
		frappe.db.set_value("Cpro POS Opening Shift", self.pos_opening_shift, "status", "Open")

	def _validate_opening_shift(self):
		opening = frappe.db.get_value(
			"Cpro POS Opening Shift", self.pos_opening_shift, ["status", "docstatus"], as_dict=True
		)
		if not opening:
			frappe.throw(_("The linked opening shift no longer exists."))
		# On submit the shift must still be Open; allow re-editing a draft closing of
		# an already-closed shift only if this very doc closed it (cancel/amend flow).
		if self.docstatus == 0 and opening.status == "Closed":
			frappe.throw(
				_("Opening shift {0} is already closed.").format(frappe.bold(self.pos_opening_shift)),
				title=_("Shift Already Closed"),
			)

	def _pull_aggregates(self):
		"""Recompute totals + expected cash from the shift's POS Invoices (source of truth)."""
		from cpro.api.shift import compute_shift_aggregates

		agg = compute_shift_aggregates(self.pos_opening_shift)
		self.pos_invoice_count = agg["pos_invoice_count"]
		self.total_quantity = agg["total_quantity"]
		self.net_total = agg["net_total"]
		self.total_taxes_and_charges = agg["total_taxes_and_charges"]
		self.grand_total = agg["grand_total"]

		expected = agg["expected_by_mode"]
		# Update each reconciliation row's expected + difference; keep counted as entered.
		for row in self.payment_reconciliation:
			row.expected_amount = flt(expected.get(row.mode_of_payment, 0))
			row.difference = flt(row.closing_amount) - flt(row.expected_amount)

```

### cpro/cpro/doctype/cpro_pos_opening_shift/__init__.py

```python

```

### cpro/cpro/doctype/cpro_pos_opening_shift/cpro_pos_opening_shift.json

```json
{
 "actions": [],
 "allow_rename": 0,
 "autoname": "naming_series:",
 "creation": "2026-08-20 00:00:00.000000",
 "default_view": "List",
 "doctype": "DocType",
 "editable_grid": 1,
 "engine": "InnoDB",
 "field_order": [
  "naming_series",
  "posting_date",
  "period_start_datetime",
  "column_break_head",
  "pos_profile",
  "company",
  "user",
  "status",
  "balance_section",
  "balance_details"
 ],
 "fields": [
  {
   "default": "CPOS-OPEN-.YYYY.-",
   "fieldname": "naming_series",
   "fieldtype": "Select",
   "label": "Series",
   "options": "CPOS-OPEN-.YYYY.-",
   "reqd": 1
  },
  {
   "default": "Today",
   "fieldname": "posting_date",
   "fieldtype": "Date",
   "label": "Posting Date",
   "reqd": 1
  },
  {
   "default": "Now",
   "fieldname": "period_start_datetime",
   "fieldtype": "Datetime",
   "in_list_view": 1,
   "label": "Opened At",
   "reqd": 1
  },
  {
   "fieldname": "column_break_head",
   "fieldtype": "Column Break"
  },
  {
   "fieldname": "pos_profile",
   "fieldtype": "Link",
   "in_list_view": 1,
   "in_standard_filter": 1,
   "label": "POS Profile",
   "options": "POS Profile",
   "reqd": 1
  },
  {
   "fetch_from": "pos_profile.company",
   "fieldname": "company",
   "fieldtype": "Link",
   "label": "Company",
   "options": "Company",
   "read_only": 1
  },
  {
   "default": "__user",
   "fieldname": "user",
   "fieldtype": "Link",
   "in_list_view": 1,
   "in_standard_filter": 1,
   "label": "Cashier",
   "options": "User",
   "reqd": 1
  },
  {
   "default": "Draft",
   "fieldname": "status",
   "fieldtype": "Select",
   "in_list_view": 1,
   "in_standard_filter": 1,
   "label": "Status",
   "options": "Draft\nOpen\nClosed",
   "read_only": 1
  },
  {
   "fieldname": "balance_section",
   "fieldtype": "Section Break",
   "label": "Opening Balances"
  },
  {
   "description": "Cash counted in the drawer per payment mode at the start of the shift.",
   "fieldname": "balance_details",
   "fieldtype": "Table",
   "label": "Opening Balances",
   "options": "Cpro POS Balance Detail",
   "reqd": 1
  }
 ],
 "index_web_pages_for_search": 1,
 "is_submittable": 1,
 "links": [],
 "modified": "2026-08-20 00:00:00.000000",
 "modified_by": "Administrator",
 "module": "Cpro",
 "name": "Cpro POS Opening Shift",
 "naming_rule": "By \"Naming Series\" field",
 "owner": "Administrator",
 "permissions": [
  {
   "cancel": 1,
   "create": 1,
   "delete": 1,
   "email": 1,
   "print": 1,
   "read": 1,
   "report": 1,
   "role": "System Manager",
   "select": 1,
   "share": 1,
   "submit": 1,
   "write": 1
  },
  {
   "cancel": 1,
   "create": 1,
   "delete": 1,
   "email": 1,
   "print": 1,
   "read": 1,
   "report": 1,
   "role": "Cpro Manager",
   "select": 1,
   "share": 1,
   "submit": 1,
   "write": 1
  },
  {
   "create": 1,
   "print": 1,
   "read": 1,
   "report": 1,
   "role": "Cpro Cashier",
   "select": 1,
   "submit": 1,
   "write": 1
  },
  {
   "read": 1,
   "report": 1,
   "role": "Cpro Waiter",
   "select": 1
  }
 ],
 "sort_field": "modified",
 "sort_order": "DESC",
 "states": [],
 "track_changes": 1
}

```

### cpro/cpro/doctype/cpro_pos_opening_shift/cpro_pos_opening_shift.py

```python
# Copyright (c) 2026, ahmed hashim and contributors
# For license information, please see license.txt

"""Cpro POS Opening Shift.

A cashier opens a shift (declaring the opening cash float per payment mode)
before taking any orders. Submitting the shift flips it to ``Open``; a matching
Closing Shift flips it to ``Closed``. Only one Open shift may exist per
(cashier, POS profile) at a time so reconciliation stays unambiguous.
"""

import frappe
from frappe import _
from frappe.model.document import Document
from frappe.utils import now_datetime


class CproPOSOpeningShift(Document):
	def validate(self):
		if not self.user:
			self.user = frappe.session.user
		if not self.period_start_datetime:
			self.period_start_datetime = now_datetime()
		self._guard_single_open_shift()

	def on_submit(self):
		self.db_set("status", "Open")

	def on_cancel(self):
		self.db_set("status", "Draft")

	def _guard_single_open_shift(self):
		"""Refuse a second concurrent Open shift for the same cashier + profile."""
		existing = frappe.db.exists(
			"Cpro POS Opening Shift",
			{
				"user": self.user,
				"pos_profile": self.pos_profile,
				"status": "Open",
				"docstatus": 1,
				"name": ["!=", self.name or ""],
			},
		)
		if existing:
			frappe.throw(
				_("Cashier {0} already has an open shift ({1}) on this POS profile. Close it first.").format(
					frappe.bold(self.user), frappe.bold(existing)
				),
				title=_("Shift Already Open"),
			)

```

### cpro/cpro/doctype/cpro_room/__init__.py

```python

```

### cpro/cpro/doctype/cpro_room/cpro_room.json

```json
{
 "actions": [],
 "allow_rename": 1,
 "autoname": "field:room_name",
 "creation": "2026-08-20 00:00:00.000000",
 "default_view": "List",
 "doctype": "DocType",
 "editable_grid": 1,
 "engine": "InnoDB",
 "field_order": [
  "room_name",
  "company",
  "column_break_main",
  "is_active",
  "display_order"
 ],
 "fields": [
  {
   "fieldname": "room_name",
   "fieldtype": "Data",
   "in_list_view": 1,
   "label": "Room Name",
   "reqd": 1,
   "unique": 1
  },
  {
   "fieldname": "company",
   "fieldtype": "Link",
   "label": "Company",
   "options": "Company"
  },
  {
   "fieldname": "column_break_main",
   "fieldtype": "Column Break"
  },
  {
   "default": "1",
   "fieldname": "is_active",
   "fieldtype": "Check",
   "in_list_view": 1,
   "label": "Is Active"
  },
  {
   "default": "0",
   "fieldname": "display_order",
   "fieldtype": "Int",
   "label": "Display Order"
  }
 ],
 "index_web_pages_for_search": 1,
 "links": [],
 "modified": "2026-08-20 00:00:00.000000",
 "modified_by": "Administrator",
 "module": "Cpro",
 "name": "Cpro Room",
 "naming_rule": "By fieldname",
 "owner": "Administrator",
 "permissions": [
  {
   "create": 1,
   "delete": 1,
   "email": 1,
   "export": 1,
   "print": 1,
   "read": 1,
   "report": 1,
   "role": "System Manager",
   "select": 1,
   "share": 1,
   "write": 1
  },
  {
   "create": 1,
   "delete": 1,
   "email": 1,
   "export": 1,
   "print": 1,
   "read": 1,
   "report": 1,
   "role": "Cpro Manager",
   "select": 1,
   "share": 1,
   "write": 1
  },
  {
   "read": 1,
   "report": 1,
   "role": "Cpro Cashier",
   "select": 1
  },
  {
   "read": 1,
   "report": 1,
   "role": "Cpro Waiter",
   "select": 1
  }
 ],
 "sort_field": "modified",
 "sort_order": "DESC",
 "states": [],
 "track_changes": 1
}

```

### cpro/cpro/doctype/cpro_room/cpro_room.py

```python
# Copyright (c) 2026, ahmed hashim and contributors
# For license information, please see license.txt

from frappe.model.document import Document


class CproRoom(Document):
	pass

```

### cpro/cpro/doctype/cpro_settings/__init__.py

```python

```

### cpro/cpro/doctype/cpro_settings/cpro_settings.json

```json
{
 "actions": [],
 "allow_rename": 0,
 "creation": "2026-08-20 00:00:00.000000",
 "doctype": "DocType",
 "editable_grid": 1,
 "engine": "InnoDB",
 "field_order": [
  "general_section",
  "company",
  "default_selling_price_list",
  "column_break_gen",
  "currency",
  "ordering_section",
  "allow_guest_orders",
  "enable_call_waiter",
  "column_break_ord",
  "kot_auto_create",
  "taxes_section",
  "enable_vat",
  "vat_rate",
  "column_break_tax",
  "enable_service_charge",
  "service_charge_rate",
  "taxes_template_section",
  "sales_taxes_and_charges_template"
 ],
 "fields": [
  {
   "fieldname": "general_section",
   "fieldtype": "Section Break",
   "label": "General"
  },
  {
   "fieldname": "company",
   "fieldtype": "Link",
   "label": "Company",
   "options": "Company"
  },
  {
   "description": "Fallback price list when a customer has no dedicated price list.",
   "fieldname": "default_selling_price_list",
   "fieldtype": "Link",
   "label": "Default Selling Price List",
   "options": "Price List"
  },
  {
   "fieldname": "column_break_gen",
   "fieldtype": "Column Break"
  },
  {
   "fetch_from": "company.default_currency",
   "fieldname": "currency",
   "fieldtype": "Link",
   "label": "Currency",
   "options": "Currency"
  },
  {
   "fieldname": "ordering_section",
   "fieldtype": "Section Break",
   "label": "Ordering"
  },
  {
   "default": "0",
   "description": "Allow customers to order from the digital menu without an account.",
   "fieldname": "allow_guest_orders",
   "fieldtype": "Check",
   "label": "Allow Guest Orders"
  },
  {
   "default": "1",
   "fieldname": "enable_call_waiter",
   "fieldtype": "Check",
   "label": "Enable Call Waiter"
  },
  {
   "fieldname": "column_break_ord",
   "fieldtype": "Column Break"
  },
  {
   "default": "1",
   "description": "Automatically create a Kitchen Order Ticket when an order is placed.",
   "fieldname": "kot_auto_create",
   "fieldtype": "Check",
   "label": "Auto-create KOT"
  },
  {
   "fieldname": "taxes_section",
   "fieldtype": "Section Break",
   "label": "Taxes & Charges"
  },
  {
   "default": "1",
   "fieldname": "enable_vat",
   "fieldtype": "Check",
   "label": "Enable VAT"
  },
  {
   "default": "14",
   "depends_on": "enable_vat",
   "fieldname": "vat_rate",
   "fieldtype": "Percent",
   "label": "VAT Rate (%)"
  },
  {
   "fieldname": "column_break_tax",
   "fieldtype": "Column Break"
  },
  {
   "default": "0",
   "fieldname": "enable_service_charge",
   "fieldtype": "Check",
   "label": "Enable Service Charge"
  },
  {
   "depends_on": "enable_service_charge",
   "fieldname": "service_charge_rate",
   "fieldtype": "Percent",
   "label": "Service Charge Rate (%)"
  },
  {
   "fieldname": "taxes_template_section",
   "fieldtype": "Section Break",
   "label": "Applied Template"
  },
  {
   "description": "Sales Taxes and Charges Template applied to POS orders. Generated from the toggles above.",
   "fieldname": "sales_taxes_and_charges_template",
   "fieldtype": "Link",
   "label": "Sales Taxes and Charges Template",
   "options": "Sales Taxes and Charges Template"
  }
 ],
 "index_web_pages_for_search": 1,
 "issingle": 1,
 "links": [],
 "modified": "2026-08-20 00:00:00.000000",
 "modified_by": "Administrator",
 "module": "Cpro",
 "name": "Cpro Settings",
 "owner": "Administrator",
 "permissions": [
  {
   "create": 1,
   "delete": 1,
   "email": 1,
   "print": 1,
   "read": 1,
   "report": 1,
   "role": "System Manager",
   "share": 1,
   "write": 1
  },
  {
   "create": 1,
   "delete": 1,
   "email": 1,
   "print": 1,
   "read": 1,
   "report": 1,
   "role": "Cpro Manager",
   "share": 1,
   "write": 1
  }
 ],
 "sort_field": "modified",
 "sort_order": "DESC",
 "states": [],
 "track_changes": 1
}

```

### cpro/cpro/doctype/cpro_settings/cpro_settings.py

```python
# Copyright (c) 2026, ahmed hashim and contributors
# For license information, please see license.txt

"""Cpro Settings controller.

Turns the simple VAT / Service-Charge toggles into a real ERPNext **Sales Taxes
and Charges Template** (requirement #5). The generated template is namespaced
(``CPro Taxes - <abbr>``) so CPro never mutates templates it doesn't own, and
the whole sync is fail-soft: if a tax account can't be resolved it guides the
admin with a graceful message instead of raising.
"""

import frappe
from frappe import _
from frappe.model.document import Document

TEMPLATE_PREFIX = "CPro Taxes"


class CproSettings(Document):
	def on_update(self):
		self.sync_tax_template()

	# -- dynamic taxes -----------------------------------------------------
	def sync_tax_template(self):
		if not self.company:
			return
		if not (self.enable_vat or self.enable_service_charge):
			# Nothing to apply — clear our link but leave any template in place.
			return

		account = _resolve_tax_account(self.company)
		if not account:
			frappe.msgprint(
				_(
					"Enable VAT/Service Charge is on, but no tax account was found for {0}. "
					"Please create a tax account (e.g. VAT) and save again."
				).format(self.company),
				title=_("Tax account needed"),
				indicator="orange",
			)
			return

		abbr = frappe.get_cached_value("Company", self.company, "abbr")
		template_name = f"{TEMPLATE_PREFIX} - {abbr}"

		rows = []
		if self.enable_vat and self.vat_rate:
			rows.append(
				{
					"charge_type": "On Net Total",
					"account_head": account,
					"rate": self.vat_rate,
					"description": _("VAT {0}%").format(self.vat_rate),
				}
			)
		if self.enable_service_charge and self.service_charge_rate:
			rows.append(
				{
					"charge_type": "On Net Total",
					"account_head": account,
					"rate": self.service_charge_rate,
					"description": _("Service Charge {0}%").format(self.service_charge_rate),
				}
			)
		if not rows:
			return

		existing = frappe.db.get_value(
			"Sales Taxes and Charges Template",
			{"title": template_name, "company": self.company},
			"name",
		) or (frappe.db.exists("Sales Taxes and Charges Template", template_name) and template_name)

		if existing:
			template = frappe.get_doc("Sales Taxes and Charges Template", existing)
			template.set("taxes", [])
		else:
			template = frappe.new_doc("Sales Taxes and Charges Template")
			template.title = template_name
			template.company = self.company

		for row in rows:
			template.append("taxes", row)
		template.save(ignore_permissions=True)

		# Point the settings at the generated template (avoid recursive save).
		if self.sales_taxes_and_charges_template != template.name:
			self.db_set("sales_taxes_and_charges_template", template.name, update_modified=False)


def _resolve_tax_account(company: str) -> str | None:
	"""Best-effort: a non-group Tax account for the company, preferring VAT-named ones."""
	accounts = frappe.get_all(
		"Account",
		filters={"company": company, "account_type": "Tax", "is_group": 0, "disabled": 0},
		fields=["name"],
	)
	if not accounts:
		return None
	for a in accounts:
		if "vat" in a.name.lower():
			return a.name
	return accounts[0].name

```

### cpro/cpro/doctype/cpro_table/__init__.py

```python

```

### cpro/cpro/doctype/cpro_table/cpro_table.json

```json
{
 "actions": [],
 "allow_rename": 1,
 "autoname": "format:{room}-{table_number}",
 "creation": "2026-08-20 00:00:00.000000",
 "default_view": "List",
 "doctype": "DocType",
 "editable_grid": 1,
 "engine": "InnoDB",
 "field_order": [
  "table_number",
  "room",
  "company",
  "column_break_main",
  "seating_capacity",
  "status",
  "is_active",
  "portal_section",
  "portal_slug"
 ],
 "fields": [
  {
   "fieldname": "table_number",
   "fieldtype": "Data",
   "in_list_view": 1,
   "label": "Table Number",
   "reqd": 1
  },
  {
   "fieldname": "room",
   "fieldtype": "Link",
   "in_list_view": 1,
   "label": "Room",
   "options": "Cpro Room",
   "reqd": 1
  },
  {
   "fetch_from": "room.company",
   "fieldname": "company",
   "fieldtype": "Link",
   "label": "Company",
   "options": "Company"
  },
  {
   "fieldname": "column_break_main",
   "fieldtype": "Column Break"
  },
  {
   "default": "2",
   "fieldname": "seating_capacity",
   "fieldtype": "Int",
   "label": "Seating Capacity"
  },
  {
   "default": "Available",
   "fieldname": "status",
   "fieldtype": "Select",
   "in_list_view": 1,
   "in_standard_filter": 1,
   "label": "Status",
   "options": "Available\nOccupied\nReserved"
  },
  {
   "default": "1",
   "fieldname": "is_active",
   "fieldtype": "Check",
   "label": "Is Active"
  },
  {
   "collapsible": 1,
   "fieldname": "portal_section",
   "fieldtype": "Section Break",
   "label": "Digital Menu"
  },
  {
   "description": "Unique slug used in the table's QR code / digital-menu URL.",
   "fieldname": "portal_slug",
   "fieldtype": "Data",
   "label": "Portal Slug",
   "unique": 1
  }
 ],
 "index_web_pages_for_search": 1,
 "links": [],
 "modified": "2026-08-20 00:00:00.000000",
 "modified_by": "Administrator",
 "module": "Cpro",
 "name": "Cpro Table",
 "naming_rule": "Expression",
 "owner": "Administrator",
 "permissions": [
  {
   "create": 1,
   "delete": 1,
   "email": 1,
   "export": 1,
   "print": 1,
   "read": 1,
   "report": 1,
   "role": "System Manager",
   "select": 1,
   "share": 1,
   "write": 1
  },
  {
   "create": 1,
   "delete": 1,
   "email": 1,
   "export": 1,
   "print": 1,
   "read": 1,
   "report": 1,
   "role": "Cpro Manager",
   "select": 1,
   "share": 1,
   "write": 1
  },
  {
   "print": 1,
   "read": 1,
   "report": 1,
   "role": "Cpro Cashier",
   "select": 1,
   "write": 1
  },
  {
   "print": 1,
   "read": 1,
   "report": 1,
   "role": "Cpro Waiter",
   "select": 1,
   "write": 1
  }
 ],
 "sort_field": "modified",
 "sort_order": "DESC",
 "states": [],
 "track_changes": 1
}

```

### cpro/cpro/doctype/cpro_table/cpro_table.py

```python
# Copyright (c) 2026, ahmed hashim and contributors
# For license information, please see license.txt

from frappe.model.document import Document


class CproTable(Document):
	pass

```

### cpro/cpro/workspace/__init__.py

```python

```

### cpro/cpro/workspace/restaurant_management/__init__.py

```python

```

### cpro/cpro/workspace/restaurant_management/restaurant_management.json

```json
{
 "app": "cpro",
 "charts": [],
 "content": "[{\"id\":\"hdr_quick\",\"type\":\"header\",\"data\":{\"text\":\"<span class=\\\"h4\\\"><b>Direct Access &amp; Live Apps</b></span>\",\"col\":12}},{\"id\":\"sc_pos\",\"type\":\"shortcut\",\"data\":{\"shortcut_name\":\"POS Terminal\",\"col\":4}},{\"id\":\"sc_kds\",\"type\":\"shortcut\",\"data\":{\"shortcut_name\":\"Kitchen Display (KDS)\",\"col\":4}},{\"id\":\"sc_menu\",\"type\":\"shortcut\",\"data\":{\"shortcut_name\":\"Digital Menu\",\"col\":4}},{\"id\":\"sc_open\",\"type\":\"shortcut\",\"data\":{\"shortcut_name\":\"Open Shift\",\"col\":4}},{\"id\":\"sc_close\",\"type\":\"shortcut\",\"data\":{\"shortcut_name\":\"Close Shift\",\"col\":4}},{\"id\":\"sc_tables\",\"type\":\"shortcut\",\"data\":{\"shortcut_name\":\"Tables & QR\",\"col\":4}},{\"id\":\"sp_1\",\"type\":\"spacer\",\"data\":{\"col\":12}},{\"id\":\"hdr_masters\",\"type\":\"header\",\"data\":{\"text\":\"<span class=\\\"h4\\\"><b>Masters &amp; Reports</b></span>\",\"col\":12}},{\"id\":\"c_setup\",\"type\":\"card\",\"data\":{\"card_name\":\"Restaurant Setup\",\"col\":4}},{\"id\":\"c_menu\",\"type\":\"card\",\"data\":{\"card_name\":\"Menu Management\",\"col\":4}},{\"id\":\"c_floor\",\"type\":\"card\",\"data\":{\"card_name\":\"Floor & Tables\",\"col\":4}},{\"id\":\"c_shifts\",\"type\":\"card\",\"data\":{\"card_name\":\"Shifts & Cash\",\"col\":4}},{\"id\":\"c_ops\",\"type\":\"card\",\"data\":{\"card_name\":\"Operations\",\"col\":4}},{\"id\":\"c_reports\",\"type\":\"card\",\"data\":{\"card_name\":\"Reports & Analytics\",\"col\":4}}]",
 "creation": "2026-08-21 01:13:51.273584",
 "custom_blocks": [],
 "docstatus": 0,
 "doctype": "Workspace",
 "for_user": "",
 "hide_custom": 0,
 "icon": "hand-platter",
 "idx": 1,
 "is_hidden": 0,
 "label": "Restaurant Management",
 "links": [
  {
   "dependencies": "",
   "hidden": 0,
   "is_query_report": 0,
   "label": "Restaurant Setup",
   "link_count": 3,
   "onboard": 0,
   "type": "Card Break"
  },
  {
   "dependencies": "",
   "hidden": 0,
   "is_query_report": 0,
   "label": "Cpro Settings",
   "link_count": 0,
   "link_to": "Cpro Settings",
   "link_type": "DocType",
   "onboard": 1,
   "type": "Link"
  },
  {
   "dependencies": "",
   "hidden": 0,
   "is_query_report": 0,
   "label": "POS Profile",
   "link_count": 0,
   "link_to": "POS Profile",
   "link_type": "DocType",
   "onboard": 1,
   "type": "Link"
  },
  {
   "dependencies": "",
   "hidden": 0,
   "is_query_report": 0,
   "label": "Sales Taxes and Charges Template",
   "link_count": 0,
   "link_to": "Sales Taxes and Charges Template",
   "link_type": "DocType",
   "onboard": 0,
   "type": "Link"
  },
  {
   "dependencies": "",
   "hidden": 0,
   "is_query_report": 0,
   "label": "Menu Management",
   "link_count": 6,
   "onboard": 0,
   "type": "Card Break"
  },
  {
   "dependencies": "",
   "hidden": 0,
   "is_query_report": 0,
   "label": "Cpro Menu",
   "link_count": 0,
   "link_to": "Cpro Menu",
   "link_type": "DocType",
   "onboard": 1,
   "type": "Link"
  },
  {
   "dependencies": "",
   "hidden": 0,
   "is_query_report": 0,
   "label": "Menu Categories",
   "link_count": 0,
   "link_to": "Cpro Menu Category",
   "link_type": "DocType",
   "onboard": 1,
   "type": "Link"
  },
  {
   "dependencies": "",
   "hidden": 0,
   "is_query_report": 0,
   "label": "Items",
   "link_count": 0,
   "link_to": "Item",
   "link_type": "DocType",
   "onboard": 1,
   "type": "Link"
  },
  {
   "dependencies": "",
   "hidden": 0,
   "is_query_report": 0,
   "label": "Modifier Groups",
   "link_count": 0,
   "link_to": "Cpro Modifier Group",
   "link_type": "DocType",
   "onboard": 0,
   "type": "Link"
  },
  {
   "dependencies": "",
   "hidden": 0,
   "is_query_report": 0,
   "label": "Floor & Tables",
   "link_count": 3,
   "onboard": 0,
   "type": "Card Break"
  },
  {
   "dependencies": "",
   "hidden": 0,
   "is_query_report": 0,
   "label": "Rooms / Dining Areas",
   "link_count": 0,
   "link_to": "Cpro Room",
   "link_type": "DocType",
   "onboard": 1,
   "type": "Link"
  },
  {
   "dependencies": "",
   "hidden": 0,
   "is_query_report": 0,
   "label": "Tables & QR Codes",
   "link_count": 0,
   "link_to": "Cpro Table",
   "link_type": "DocType",
   "onboard": 1,
   "type": "Link"
  },
  {
   "dependencies": "",
   "hidden": 0,
   "is_query_report": 0,
   "label": "Kitchen Stations",
   "link_count": 0,
   "link_to": "Cpro Kitchen Station",
   "link_type": "DocType",
   "onboard": 0,
   "type": "Link"
  },
  {
   "dependencies": "",
   "hidden": 0,
   "is_query_report": 0,
   "label": "Shifts & Cash",
   "link_count": 2,
   "onboard": 0,
   "type": "Card Break"
  },
  {
   "dependencies": "",
   "hidden": 0,
   "is_query_report": 0,
   "label": "POS Opening Shift",
   "link_count": 0,
   "link_to": "Cpro POS Opening Shift",
   "link_type": "DocType",
   "onboard": 1,
   "type": "Link"
  },
  {
   "dependencies": "",
   "hidden": 0,
   "is_query_report": 0,
   "label": "POS Closing Shift",
   "link_count": 0,
   "link_to": "Cpro POS Closing Shift",
   "link_type": "DocType",
   "onboard": 1,
   "type": "Link"
  },
  {
   "dependencies": "",
   "hidden": 0,
   "is_query_report": 0,
   "label": "Operations",
   "link_count": 3,
   "onboard": 0,
   "type": "Card Break"
  },
  {
   "dependencies": "",
   "hidden": 0,
   "is_query_report": 0,
   "label": "Kitchen Orders (KOT)",
   "link_count": 0,
   "link_to": "Cpro KOT",
   "link_type": "DocType",
   "onboard": 1,
   "type": "Link"
  },
  {
   "dependencies": "",
   "hidden": 0,
   "is_query_report": 0,
   "label": "POS Invoices",
   "link_count": 0,
   "link_to": "POS Invoice",
   "link_type": "DocType",
   "onboard": 1,
   "type": "Link"
  },
  {
   "dependencies": "",
   "hidden": 0,
   "is_query_report": 0,
   "label": "Customers",
   "link_count": 0,
   "link_to": "Customer",
   "link_type": "DocType",
   "onboard": 0,
   "type": "Link"
  },
  {
   "dependencies": "",
   "hidden": 0,
   "is_query_report": 0,
   "label": "Reports & Analytics",
   "link_count": 3,
   "onboard": 0,
   "type": "Card Break"
  },
  {
   "dependencies": "",
   "hidden": 0,
   "is_query_report": 1,
   "label": "Sales Register",
   "link_count": 0,
   "link_to": "Sales Register",
   "link_type": "Report",
   "onboard": 1,
   "type": "Link"
  },
  {
   "dependencies": "",
   "hidden": 0,
   "is_query_report": 1,
   "label": "POS Register",
   "link_count": 0,
   "link_to": "POS Register",
   "link_type": "Report",
   "onboard": 1,
   "type": "Link"
  },
  {
   "dependencies": "",
   "hidden": 0,
   "is_query_report": 1,
   "label": "Item-wise Sales Register",
   "link_count": 0,
   "link_to": "Item-wise Sales Register",
   "link_type": "Report",
   "onboard": 0,
   "type": "Link"
  },
  {
   "hidden": 0,
   "is_query_report": 0,
   "label": "Portal Settings",
   "link_count": 0,
   "link_to": "Cpro Portal Settings",
   "link_type": "DocType",
   "onboard": 1,
   "type": "Link"
  },
  {
   "hidden": 0,
   "is_query_report": 0,
   "label": "Order Audit Logs",
   "link_count": 0,
   "link_to": "Cpro Order Audit Log",
   "link_type": "DocType",
   "onboard": 0,
   "type": "Link"
  },
  {
   "hidden": 0,
   "is_query_report": 0,
   "label": "Portal Banners",
   "link_count": 0,
   "link_to": "Cpro Portal Banner",
   "link_type": "DocType",
   "onboard": 1,
   "type": "Link"
  },
  {
   "hidden": 0,
   "is_query_report": 0,
   "label": "Portal Requests",
   "link_count": 0,
   "link_to": "Cpro Portal Request",
   "link_type": "DocType",
   "onboard": 1,
   "type": "Link"
  }
 ],
 "modified": "2026-08-21 12:25:33.836823",
 "modified_by": "Administrator",
 "module": "Cpro",
 "name": "Restaurant Management",
 "number_cards": [],
 "owner": "Administrator",
 "parent_page": "",
 "public": 1,
 "quick_lists": [],
 "roles": [],
 "sequence_id": 20.0,
 "shortcuts": [
  {
   "color": "Blue",
   "label": "POS Terminal",
   "type": "URL",
   "url": "/cpro"
  },
  {
   "color": "Orange",
   "label": "Kitchen Display (KDS)",
   "type": "URL",
   "url": "/cpro/kds"
  },
  {
   "color": "Green",
   "label": "Digital Menu",
   "type": "URL",
   "url": "/menu"
  },
  {
   "color": "Cyan",
   "doc_view": "List",
   "label": "Open Shift",
   "link_to": "Cpro POS Opening Shift",
   "stats_filter": "[]",
   "type": "DocType"
  },
  {
   "color": "Yellow",
   "doc_view": "List",
   "label": "Close Shift",
   "link_to": "Cpro POS Closing Shift",
   "stats_filter": "[]",
   "type": "DocType"
  },
  {
   "color": "Purple",
   "doc_view": "List",
   "label": "Tables & QR",
   "link_to": "Cpro Table",
   "stats_filter": "[]",
   "type": "DocType"
  }
 ],
 "title": "Restaurant Management",
 "type": "Workspace"
}

```

### cpro/desktop_icon/cpro.json

```json
{
 "app": "cpro",
 "creation": "2026-08-20 00:00:00.000000",
 "docstatus": 0,
 "doctype": "Desktop Icon",
 "hidden": 1,
 "icon_type": "App",
 "idx": 100,
 "label": "Cpro",
 "link": "/app/restaurant-management",
 "link_type": "External",
 "logo_url": "/assets/cpro/images/cpro-logo.svg",
 "modified": "2026-08-20 00:00:00.000000",
 "modified_by": "Administrator",
 "name": "Cpro",
 "owner": "Administrator",
 "roles": [],
 "standard": 1
}

```

### cpro/desktop_icon/restaurant_management.json

```json
{
 "app": "cpro",
 "creation": "2026-08-20 00:00:00.000000",
 "docstatus": 0,
 "doctype": "Desktop Icon",
 "hidden": 0,
 "icon": "retail",
 "icon_type": "Link",
 "idx": 1,
 "label": "Restaurant Management",
 "link_to": "Restaurant Management",
 "link_type": "Workspace Sidebar",
 "modified": "2026-08-20 00:00:00.000000",
 "modified_by": "Administrator",
 "name": "Restaurant Management",
 "owner": "Administrator",
 "parent_icon": "Cpro",
 "restrict_removal": 0,
 "roles": [],
 "standard": 1
}

```

### cpro/patches/__init__.py

```python

```

### cpro/patches/v0_1/__init__.py

```python

```

### cpro/patches/v0_1/apply_cpro_custom_fields.py

```python
# Copyright (c) 2026, ahmed hashim and contributors
# For license information, please see license.txt

from cpro.custom_fields import apply_cpro_custom_fields


def execute():
	"""Ensure CPro custom fields exist (idempotent) after schema migrations."""
	apply_cpro_custom_fields()

```

### cpro/templates/__init__.py

```python

```

### cpro/templates/pages/__init__.py

```python

```

### cpro/workspace_sidebar/restaurant_management.json

```json
{
 "app": "cpro",
 "creation": "2026-08-20 00:00:00.000000",
 "docstatus": 0,
 "doctype": "Workspace Sidebar",
 "header_icon": "retail",
 "idx": 0,
 "items": [
  {
   "child": 0,
   "collapsible": 1,
   "icon": "home",
   "indent": 0,
   "keep_closed": 0,
   "label": "Home",
   "link_to": "Restaurant Management",
   "link_type": "Workspace",
   "show_arrow": 0,
   "type": "Link"
  },
  {
   "child": 0,
   "collapsible": 1,
   "icon": "monitor",
   "indent": 0,
   "keep_closed": 0,
   "label": "POS Terminal",
   "link_type": "URL",
   "show_arrow": 0,
   "type": "Link",
   "url": "/cpro"
  },
  {
   "child": 0,
   "collapsible": 1,
   "icon": "flame",
   "indent": 0,
   "keep_closed": 0,
   "label": "Kitchen Display (KDS)",
   "link_type": "URL",
   "show_arrow": 0,
   "type": "Link",
   "url": "/cpro/kds"
  },
  {
   "child": 0,
   "collapsible": 1,
   "icon": "book-open",
   "indent": 0,
   "keep_closed": 0,
   "label": "Digital Menu",
   "link_type": "URL",
   "show_arrow": 0,
   "type": "Link",
   "url": "/menu"
  },
  {
   "child": 0,
   "collapsible": 1,
   "icon": "receipt",
   "indent": 0,
   "keep_closed": 0,
   "label": "POS Invoice",
   "link_to": "POS Invoice",
   "link_type": "DocType",
   "show_arrow": 0,
   "type": "Link"
  },
  {
   "child": 0,
   "collapsible": 1,
   "icon": "list-ordered",
   "indent": 0,
   "keep_closed": 0,
   "label": "Kitchen Orders (KOT)",
   "link_to": "Cpro KOT",
   "link_type": "DocType",
   "show_arrow": 0,
   "type": "Link"
  },
  {
   "child": 0,
   "collapsible": 1,
   "icon": "lock-open",
   "indent": 0,
   "keep_closed": 0,
   "label": "POS Opening Shift",
   "link_to": "Cpro POS Opening Shift",
   "link_type": "DocType",
   "show_arrow": 0,
   "type": "Link"
  },
  {
   "child": 0,
   "collapsible": 1,
   "icon": "lock",
   "indent": 0,
   "keep_closed": 0,
   "label": "POS Closing Shift",
   "link_to": "Cpro POS Closing Shift",
   "link_type": "DocType",
   "show_arrow": 0,
   "type": "Link"
  },
  {
   "child": 0,
   "collapsible": 1,
   "icon": "coffee",
   "indent": 1,
   "keep_closed": 0,
   "label": "Menu & Items",
   "link_type": "DocType",
   "show_arrow": 0,
   "type": "Section Break"
  },
  {
   "child": 1,
   "collapsible": 1,
   "icon": "",
   "indent": 0,
   "keep_closed": 0,
   "label": "Cpro Menu",
   "link_to": "Cpro Menu",
   "link_type": "DocType",
   "show_arrow": 0,
   "type": "Link"
  },
  {
   "child": 1,
   "collapsible": 1,
   "icon": "",
   "indent": 0,
   "keep_closed": 0,
   "label": "Menu Categories",
   "link_to": "Cpro Menu Category",
   "link_type": "DocType",
   "show_arrow": 0,
   "type": "Link"
  },
  {
   "child": 1,
   "collapsible": 1,
   "icon": "",
   "indent": 0,
   "keep_closed": 0,
   "label": "Items",
   "link_to": "Item",
   "link_type": "DocType",
   "show_arrow": 0,
   "type": "Link"
  },
  {
   "child": 1,
   "collapsible": 1,
   "icon": "",
   "indent": 0,
   "keep_closed": 0,
   "label": "Item Groups",
   "link_to": "Item Group",
   "link_type": "DocType",
   "show_arrow": 0,
   "type": "Link"
  },
  {
   "child": 1,
   "collapsible": 1,
   "icon": "",
   "indent": 0,
   "keep_closed": 0,
   "label": "Modifiers",
   "link_to": "Cpro Modifier",
   "link_type": "DocType",
   "show_arrow": 0,
   "type": "Link"
  },
  {
   "child": 1,
   "collapsible": 1,
   "icon": "",
   "indent": 0,
   "keep_closed": 0,
   "label": "Modifier Groups",
   "link_to": "Cpro Modifier Group",
   "link_type": "DocType",
   "show_arrow": 0,
   "type": "Link"
  },
  {
   "child": 0,
   "collapsible": 1,
   "icon": "layout",
   "indent": 1,
   "keep_closed": 0,
   "label": "Floor & Tables",
   "link_type": "DocType",
   "show_arrow": 0,
   "type": "Section Break"
  },
  {
   "child": 1,
   "collapsible": 1,
   "icon": "",
   "indent": 0,
   "keep_closed": 0,
   "label": "Rooms / Dining Areas",
   "link_to": "Cpro Room",
   "link_type": "DocType",
   "show_arrow": 0,
   "type": "Link"
  },
  {
   "child": 1,
   "collapsible": 1,
   "icon": "",
   "indent": 0,
   "keep_closed": 0,
   "label": "Tables",
   "link_to": "Cpro Table",
   "link_type": "DocType",
   "show_arrow": 0,
   "type": "Link"
  },
  {
   "child": 1,
   "collapsible": 1,
   "icon": "",
   "indent": 0,
   "keep_closed": 0,
   "label": "Kitchen Stations",
   "link_to": "Cpro Kitchen Station",
   "link_type": "DocType",
   "show_arrow": 0,
   "type": "Link"
  },
  {
   "child": 0,
   "collapsible": 1,
   "icon": "settings",
   "indent": 1,
   "keep_closed": 0,
   "label": "Setup",
   "link_type": "DocType",
   "show_arrow": 0,
   "type": "Section Break"
  },
  {
   "child": 1,
   "collapsible": 1,
   "icon": "",
   "indent": 0,
   "keep_closed": 0,
   "label": "Cpro Settings",
   "link_to": "Cpro Settings",
   "link_type": "DocType",
   "show_arrow": 0,
   "type": "Link"
  },
  {
   "child": 1,
   "collapsible": 1,
   "icon": "",
   "indent": 0,
   "keep_closed": 0,
   "label": "POS Profile",
   "link_to": "POS Profile",
   "link_type": "DocType",
   "show_arrow": 0,
   "type": "Link"
  },
  {
   "child": 1,
   "collapsible": 1,
   "icon": "",
   "indent": 0,
   "keep_closed": 0,
   "label": "Sales Taxes and Charges",
   "link_to": "Sales Taxes and Charges Template",
   "link_type": "DocType",
   "show_arrow": 0,
   "type": "Link"
  },
  {
   "child": 0,
   "collapsible": 1,
   "icon": "sheet",
   "indent": 1,
   "keep_closed": 0,
   "label": "Reports",
   "link_type": "DocType",
   "show_arrow": 0,
   "type": "Section Break"
  },
  {
   "child": 1,
   "collapsible": 1,
   "icon": "",
   "indent": 0,
   "keep_closed": 0,
   "label": "Sales Register",
   "link_to": "Sales Register",
   "link_type": "Report",
   "show_arrow": 0,
   "type": "Link"
  },
  {
   "child": 1,
   "collapsible": 1,
   "icon": "",
   "indent": 0,
   "keep_closed": 0,
   "label": "POS Register",
   "link_to": "POS Register",
   "link_type": "Report",
   "show_arrow": 0,
   "type": "Link"
  },
  {
   "child": 1,
   "collapsible": 1,
   "icon": "",
   "indent": 0,
   "keep_closed": 0,
   "label": "Item-wise Sales Register",
   "link_to": "Item-wise Sales Register",
   "link_type": "Report",
   "show_arrow": 0,
   "type": "Link"
  }
 ],
 "modified": "2026-08-20 00:00:00.000000",
 "modified_by": "Administrator",
 "module": "Cpro",
 "name": "Restaurant Management",
 "owner": "Administrator",
 "standard": 1,
 "title": "Restaurant Management"
}

```

### cpro/www/__init__.py

```python

```

### cpro/www/cpro.html

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CPro - Point of Sale</title>
  <!-- استدعاء خطوط Cairo و Inter -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&family=Inter:wght@400;600;700&display=swap"
    rel="stylesheet">
  <script type="module" crossorigin src="/assets/cpro/spa/assets/index-DhlZyDjq.js"></script>
  <link rel="stylesheet" crossorigin href="/assets/cpro/spa/assets/index-BvTT6IcY.css">
</head>

<body>
  <div id="root"></div>
</body>

</html>
```

### cpro/www/cpro.py

```python
# Copyright (c) 2026, ahmed hashim and contributors
# For license information, please see license.txt

"""Serves the CPro staff SPA at ``/cpro`` (POS) and ``/cpro/kds`` (Kitchen).

Both routes require a logged-in user — Guests are redirected to ``/login`` and
returned here afterwards. The client-side router picks the screen from the path.
"""

from cpro.spa_boot import build_spa_context

no_cache = 1


def get_context(context):
	return build_spa_context(context, require_login=True)

```

### cpro/www/menu.html

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CPro - Point of Sale</title>
  <!-- استدعاء خطوط Cairo و Inter -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&family=Inter:wght@400;600;700&display=swap"
    rel="stylesheet">
  <script type="module" crossorigin src="/assets/cpro/spa/assets/index-DhlZyDjq.js"></script>
  <link rel="stylesheet" crossorigin href="/assets/cpro/spa/assets/index-BvTT6IcY.css">
</head>

<body>
  <div id="root"></div>
</body>

</html>
```

### cpro/www/menu.py

```python
# Copyright (c) 2026, ahmed hashim and contributors
# For license information, please see license.txt

"""Serves the public customer digital menu SPA at ``/menu``.

Guests are allowed — this is the QR-code landing page (``/menu?table=<slug>``).
The React portal calls only ``allow_guest`` endpoints in ``cpro.api.portal``;
ordering and the Call-Waiter button are gated server-side by Cpro Settings.
"""

from cpro.spa_boot import build_spa_context

no_cache = 1


def get_context(context):
	return build_spa_context(context, require_login=False)

```

### frontend/index.html

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CPro - Point of Sale</title>
  <!-- استدعاء خطوط Cairo و Inter -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&family=Inter:wght@400;600;700&display=swap"
    rel="stylesheet">
</head>

<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>

</html>
```

### frontend/jsconfig.json

```json
{
  "compilerOptions": {
    "checkJs": false,
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}

```

### frontend/package.json

```json
{
  "name": "cpro-pos",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build --base=/assets/cpro/spa/ && yarn copy-html-entry",
    "copy-html-entry": "cp ../cpro/public/spa/index.html ../cpro/www/cpro.html && cp ../cpro/public/spa/index.html ../cpro/www/menu.html",
    "preview": "vite preview"
  },
  "dependencies": {
    "frappe-js-sdk": "^1.10.0",
    "frappe-react-sdk": "^1.17.1",
    "lucide-react": "^0.525.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^6.30.1",
    "socket.io-client": "^4.7.5",
    "zustand": "^5.0.6"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.21",
    "postcss": "^8.5.6",
    "tailwindcss": "^3.4.17",
    "vite": "^6.2.0"
  }
}

```

### frontend/postcss.config.js

```javascript
// postcss.config.js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### frontend/tailwind.config.js

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### frontend/vite.config.js

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: '../cpro/public/spa',
    emptyOutDir: true,
  }
});
```

### frontend/src/App.jsx

```javascript
/**
 * ============================================================================
 * File: App.jsx
 * ============================================================================
 * الوصف:
 * مكون التوجيه الرئيسي (Root Router) لتطبيق CPRO POS.
 * يحدد المسارات الرئيسية للنظام:
 * - /login: صفحة تسجيل الدخول
 * - /: التخطيط الرئيسي مع السايدبار للهيدر
 * - /pos: صفحة نقطة البيع (POSPage)
 * - /dashboard: لوحة التحكم الرئيسية (DashboardPage)
 * - /orders: قائمة ومتابعة الطلبات (OrdersPage)
 * - /management: قسم الإدارة والخيارات (ManagementPage)
 * - /kitchen: شاشة المطبخ KDS (KitchenPage)
 * ============================================================================
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import StaffLayout from './layout/StaffLayout';
import DashboardPage from './pages/DashboardPage';
import OrdersPage from './pages/OrdersPage';
import ManagementPage from './pages/ManagementPage';
import ReasonsPage from './pages/ReasonsPage';
import UsersManagementPage from './pages/UsersManagementPage';
import GenericManagementPage from './pages/GenericManagementPage';
import POSPage from './pages/POSPage';
import KitchenPage from './pages/KitchenPage';
import LoginPage from './pages/LoginPage';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* صفحة تسجيل الدخول */}
        <Route path="/login" element={<LoginPage />} />

        {/* الواجهة الرئيسية مع السايدبار والهيدر */}
        <Route path="/" element={<StaffLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="pos" element={<POSPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="customers" element={<div className="p-4 bg-white rounded-lg border border-gray-100">صفحة العملاء</div>} />
          <Route path="reports" element={<div className="p-4 bg-white rounded-lg border border-gray-100">صفحة التقارير</div>} />
          <Route path="inventory" element={<div className="p-4 bg-white rounded-lg border border-gray-100">صفحة المخزون</div>} />
          <Route path="menu" element={<div className="p-4 bg-white rounded-lg border border-gray-100">قائمة المنتجات</div>} />

          {/* مسارات قسم إدارة */}
          <Route path="management" element={<ManagementPage />} />
          <Route path="management/reasons" element={<ReasonsPage />} />
          <Route path="management/users" element={<UsersManagementPage />} />
          <Route path="management/dynamic/:route" element={<GenericManagementPage />} />
          <Route path="management/*" element={<ManagementPage />} />
        </Route>

        {/* شاشة المطبخ (مستقلة ملء الشاشة) */}
        <Route path="/kitchen" element={<KitchenPage />} />

        {/* التوجيه الافتراضي */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}
```

### frontend/src/index.css

```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

*,
::before,
::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  background-color: #f4f5f7;
  color: #1f2937;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  -webkit-font-smoothing: antialiased;
}
```

### frontend/src/main.jsx

```javascript
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

### frontend/src/api/auth.js

```javascript
// src/api/auth.js

import { frappe } from '../lib/frappe';

/**
 * تسجيل الدخول عبر Frappe Session API باستخدام frappe-js-sdk
 */
export async function loginUser(usr, pwd) {
    try {
        // frappe-js-sdk handles login, cookie mapping, and fetches the CSRF token internally
        const auth = frappe.auth();
        const res = await auth.loginWithUsernamePassword({ username: usr, password: pwd });
        
        if (res.message === 'Logged In') {
            return { success: true, user: res.full_name || usr };
        } else {
            return {
                success: false,
                message: res.message || 'بيانات الدخول غير صحيحة، يرجى التأكد وإعادة المحاولة.'
            };
        }
    } catch (error) {
        console.error('Login API Error:', error);
        return {
            success: false,
            message: 'تعذر الاتصال بالسيرفر أو بيانات الدخول غير صحيحة.'
        };
    }
}

/**
 * تسجيل الخروج وإنهاء الجلسة
 */
export async function logoutUser() {
    try {
        const auth = frappe.auth();
        await auth.logout();
    } catch (error) {
        console.error('Logout Error:', error);
    } finally {
        localStorage.removeItem('isLoggedIn');
    }
}
```

### frontend/src/api/orders.js

```javascript
// frontend/src/api/orders.js

// 1️⃣ جلب قائمة الطلبات / الفواتير
export async function fetchFrappeOrders() {
    try {
        const response = await fetch(
            '/api/resource/Sales Invoice?fields=["name","customer","grand_total","status","posting_date","posting_time"]&order_by=creation desc',
            {
                credentials: 'include',
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.exception || data.message || 'فشل جلب الطلبات');
        }

        return data.data || [];
    } catch (error) {
        console.error('Error fetching orders:', error);
        return [];
    }
}

// 2️⃣ جلب تفاصيل طلب محدد
export async function fetchOrderDetail(orderId) {
    try {
        const response = await fetch(
            `/api/resource/Sales Invoice/${encodeURIComponent(orderId)}`,
            {
                credentials: 'include',
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.exception || data.message || 'فشل جلب تفاصيل الطلب');
        }

        return data.data || null;
    } catch (error) {
        console.error('Error fetching order detail:', error);
        return null;
    }
}

/**
 * 3️⃣ إنشاء / تحديث طلب CPro
 *
 * مهم:
 * ممنوع استخدام frappe.client.insert هنا.
 * الـ POS الرسمي في CPro بيستخدم الـ API:
 *
 *     cpro.api.pos.save_order
 *
 * وبالتالي الـ backend هو المسؤول عن:
 * - Price List
 * - الأسعار
 * - Customer
 * - POS Profile
 * - Shift
 * - Taxes
 * - POS Invoice
 * - KOT
 */
export async function createFrappeOrder(orderPayload) {
    try {
        const response = await fetch('/api/method/cpro.api.pos.save_order', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                order: orderPayload,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.exception ||
                data.message ||
                data._server_messages ||
                'فشل إنشاء الطلب من CPro'
            );
        }

        if (data.exc_type || data.exc) {
            throw new Error(
                data.exception ||
                data.message ||
                'فشل إنشاء الطلب من CPro'
            );
        }

        return {
            success: true,
            data: data.message,
        };
    } catch (error) {
        console.error('Error creating CPro order:', error);

        return {
            success: false,
            error: error.message || 'فشل إنشاء الطلب',
        };
    }
}

// 4️⃣ جلب قوائم الأسعار / المنيوهات المُمكّنة فقط
export async function fetchFrappeMenus() {
    try {
        const response = await fetch(
            '/api/resource/Price List?fields=["name","selling","enabled"]&filters=[["selling","=",1],["enabled","=",1]]&order_by=modified desc',
            {
                credentials: 'include',
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.exception ||
                data.message ||
                'فشل جلب قوائم الأسعار'
            );
        }

        return data.data || [];
    } catch (error) {
        console.error('Error fetching menus:', error);
        return [];
    }
}

// 5️⃣ جلب الأصناف مع الأسعار حسب الـ Price List المختارة
export async function fetchFrappeProductsByMenu(priceListName) {
    try {
        if (!priceListName) {
            return [];
        }

        const encodedPriceList = encodeURIComponent(priceListName);

        const priceRes = await fetch(
            `/api/resource/Item Price?fields=["item_code","price_list_rate","price_list","selling"]&filters=[["price_list","=","${priceListName}"],["selling","=",1]]`,
            {
                credentials: 'include',
            }
        );

        const priceData = await priceRes.json();

        if (!priceRes.ok) {
            throw new Error(
                priceData.exception ||
                priceData.message ||
                'فشل جلب أسعار المنيو'
            );
        }

        const prices = priceData.data || [];

        const itemRes = await fetch(
            '/api/resource/Item?fields=["name","item_code","item_name","standard_rate","disabled","is_sales_item"]&filters=[["disabled","=",0],["is_sales_item","=",1]]',
            {
                credentials: 'include',
            }
        );

        const itemData = await itemRes.json();

        if (!itemRes.ok) {
            throw new Error(
                itemData.exception ||
                itemData.message ||
                'فشل جلب الأصناف'
            );
        }

        const items = itemData.data || [];

        const priceMap = new Map(
            prices.map((price) => [
                price.item_code,
                Number(price.price_list_rate || 0),
            ])
        );

        const products = items
            .map((item) => {
                const itemCode = item.item_code || item.name;

                return {
                    ...item,
                    standard_rate:
                        priceMap.get(itemCode) ??
                        Number(item.standard_rate || 0),
                    price_list: priceListName,
                };
            })
            .filter((item) => {
                const itemCode = item.item_code || item.name;

                // لازم يكون له سعر في الـ Price List المختارة.
                return priceMap.has(itemCode);
            });

        return products;
    } catch (error) {
        console.error('Error fetching products by menu:', error);
        return [];
    }
}
```

### frontend/src/api/users.js

```javascript
// src/api/users.js

// 1️⃣ جلب قائمة جميع المستخدمين من فرابي
export async function fetchFrappeUsers() {
    try {
        const response = await fetch(
            '/api/resource/User?fields=["name","email","first_name","last_name","enabled","user_type"]&order_by=creation desc'
        );
        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
}

// 2️⃣ جلب الأدوار (Roles) المتاحة في النظام
export async function fetchFrappeRoles() {
    try {
        const response = await fetch(
            '/api/resource/Role?fields=["name"]&filters=[["disabled","=",0]]'
        );
        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error('Error fetching roles:', error);
        return [];
    }
}

// 3️⃣ جلب تفاصيل مستخدم محدد
export async function fetchUserDetail(email) {
    try {
        const response = await fetch(`/api/resource/User/${email}`);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching user detail:', error);
        return null;
    }
}

// 4️⃣ إنشاء مستخدم جديد في فرابي وتعيين أدواؤه (Roles)
export async function createFrappeUser(userData) {
    try {
        const response = await fetch('/api/resource/User', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                email: userData.email,
                first_name: userData.first_name,
                last_name: userData.last_name || '',
                send_welcome_email: 0,
                new_password: userData.password,
                roles: userData.roles.map((role) => ({ role: role })),
            }),
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.exception || 'فشل إنشاء المستخدم');
        }

        const data = await response.json();
        return { success: true, data: data.data };
    } catch (error) {
        console.error('Error creating user:', error);
        return { success: false, error: error.message };
    }
}

// 5️⃣ تحديث حالة المستخدم (تفعيل / تعطيل)
export async function updateUserStatus(email, enabled) {
    try {
        const response = await fetch(`/api/resource/User/${email}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ enabled: enabled ? 1 : 0 }),
        });

        if (!response.ok) throw new Error('فشل تحديث حالة المستخدم');

        const data = await response.json();
        return { success: true, data: data.data };
    } catch (error) {
        console.error('Error updating user status:', error);
        return { success: false, error: error.message };
    }
}
```

### frontend/src/components/ErrorBoundary.jsx

```javascript
import React from "react";
import { AlertTriangle } from "lucide-react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-full space-y-4 p-8 text-center bg-gray-50">
          <div className="w-16 h-16 bg-red-100 text-red-600 flex items-center justify-center rounded-full mb-2">
            <AlertTriangle size={32} />
          </div>
          <h2 className="text-xl font-bold text-gray-900">حدث خطأ غير متوقع</h2>
          <p className="text-sm text-gray-600 max-w-md">
            {this.state.error?.message || "حدثت مشكلة أثناء عرض هذه الصفحة. يرجى إعادة تحميل الصفحة والمحاولة مرة أخرى."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
          >
            إعادة تحميل الصفحة
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

```

### frontend/src/components/Header.jsx

```javascript
/**
 * ============================================================================
 * Component: Header.jsx
 * ============================================================================
 * الوصف:
 * شريط الهيدر الرئيسي في التطبيق.
 * يحتوي على حقل البحث العام، زر الملف الشخصي (الذي يظهر بيانات المستخدم الحالي
 * ويمكنه من تسجيل الخروج أو تبديل الحساب).
 * ============================================================================
 */

import React, { useState, useEffect, useRef } from 'react';
import { Search, User, LogOut, ChevronDown } from 'lucide-react';
import { call, frappe } from '../lib/frappe';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [userInfo, setUserInfo] = useState({ name: 'جاري التحميل...', email: '' });
    const dropdownRef = useRef(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await call.get('cpro.api.users.get_current_user_info');
                if (res.message) {
                    setUserInfo(res.message);
                }
            } catch (error) {
                console.error("خطأ في جلب بيانات المستخدم:", error);
                setUserInfo({ name: 'مستخدم غير معروف', email: '' });
            }
        };
        fetchUser();
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            await frappe.auth().logout();
            localStorage.removeItem('isLoggedIn');
            navigate('/login');
        } catch (error) {
            console.error("Logout failed:", error);
            // Fallback: force redirect anyway
            localStorage.removeItem('isLoggedIn');
            navigate('/login');
        }
    };

    return (
        <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between z-10 shrink-0">
            {/* User Profile Area */}
            <div className="flex items-center gap-3 relative" ref={dropdownRef}>
                <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 hover:bg-gray-50 px-2 py-1.5 rounded-lg transition-colors border border-transparent hover:border-gray-200"
                >
                    <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center text-purple-700">
                        <User className="w-5 h-5" />
                    </div>
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-bold text-gray-800 leading-tight">{userInfo.name}</p>
                        <p className="text-xs text-gray-500">{userInfo.email}</p>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                    <div className="absolute right-0 top-12 mt-1 w-56 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
                        <div className="p-4 border-b border-gray-50 md:hidden">
                            <p className="text-sm font-bold text-gray-800 truncate">{userInfo.name}</p>
                            <p className="text-xs text-gray-500 truncate">{userInfo.email}</p>
                        </div>
                        <div className="p-2">
                            <button 
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-3 py-2 text-sm font-semibold text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>تسجيل الخروج / تبديل الحساب</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Search Area */}
            <div className="flex items-center gap-4">
                <div className="relative w-80">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="بحث في الطلبات والمنتجات..."
                        className="w-full pl-9 pr-4 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-md text-right text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:bg-white transition-all"
                    />
                </div>
            </div>
        </header>
    );
}
```

### frontend/src/components/Sidebar.jsx

```javascript
/**
 * ============================================================================
 * Component: Sidebar.jsx
 * ============================================================================
 * الوصف:
 * القائمة الجانبية للتنقل بين أجزاء تطبيق CPRO.
 * تشمل أزرار التنقل السريع للـ Dashboard، والطلبات، والعملاء، والتقارير، والمخزون، وقائمة المنتجات،
 * وقسم الإدارة المنسدل، بالإضافة لزر الدخول السريع لنقطة البيع (POS).
 * ============================================================================
 */

import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    ShoppingBag,
    Users,
    BarChart3,
    Boxes,
    UtensilsCrossed,
    Settings,
    ChevronDown,
    ChevronUp,
    Monitor
} from 'lucide-react';

export default function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isManagementOpen, setIsManagementOpen] = useState(true);

    const isPosActive = location.pathname === '/pos';

    const navItems = [
        { name: 'الملخص', path: '/dashboard', icon: LayoutDashboard },
        { name: 'الطلبات', path: '/orders', icon: ShoppingBag },
        { name: 'العملاء', path: '/customers', icon: Users },
        { name: 'التقارير', path: '/reports', icon: BarChart3 },
        { name: 'المخزون', path: '/inventory', icon: Boxes },
        { name: 'قائمة المنتجات', path: '/menu', icon: UtensilsCrossed },
    ];

    const managementSubItems = [
        { name: 'المستخدمين', path: '/management/users' },
        { name: 'الأدوار', path: '/management/roles' },
        { name: 'الفروع', path: '/management/branches' },
        { name: 'الأجهزة', path: '/management/devices' },
        { name: 'الخصومات', path: '/management/discounts' },
        { name: 'الكوبونات', path: '/management/coupons' },
        { name: 'العروض الترويجية', path: '/management/promotions' },
        { name: 'الفعاليات المؤقتة', path: '/management/events' },
        { name: 'المزيد', path: '/management/more' },
    ];

    return (
        <aside className="w-64 bg-white border-l border-gray-200 h-screen flex flex-col font-sans select-none z-20 shrink-0">
            {/* الترويسة مع شعار CPRO */}
            <div className="h-16 flex items-center justify-center border-b border-gray-100 px-6">
                <h1 className="text-2xl font-black tracking-wider text-purple-700 uppercase">
                    CPRO
                </h1>
            </div>

            {/* زر الكاشير المباشر */}
            <div className="p-3 border-b border-gray-100">
                <button
                    onClick={() => navigate('/pos')}
                    className={`w-full flex items-center justify-center gap-2.5 font-bold py-2.5 px-4 rounded-xl shadow-sm transition-all duration-200 text-sm ${
                        isPosActive
                            ? 'bg-purple-800 text-white ring-2 ring-purple-400'
                            : 'bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white hover:shadow-md'
                    }`}
                >
                    <Monitor className="w-5 h-5" />
                    <span>الكاشير (POS)</span>
                </button>
            </div>

            {/* القائمة الجانبية */}
            <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                isActive
                                    ? 'bg-purple-50 text-purple-700 font-semibold border-r-4 border-purple-600'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                        >
                            <Icon className={`w-5 h-5 ${isActive ? 'text-purple-600' : 'text-gray-400'}`} />
                            <span>{item.name}</span>
                        </NavLink>
                    );
                })}

                {/* قائمة إدارة المنسدلة */}
                <div className="pt-2">
                    <button
                        onClick={() => setIsManagementOpen(!isManagementOpen)}
                        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                            location.pathname.startsWith('/management')
                                ? 'text-purple-700 font-semibold'
                                : 'text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            <Settings className={`w-5 h-5 ${location.pathname.startsWith('/management') ? 'text-purple-600' : 'text-gray-400'}`} />
                            <span>إدارة</span>
                        </div>
                        {isManagementOpen ? (
                            <ChevronUp className="w-4 h-4 text-gray-400" />
                        ) : (
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                        )}
                    </button>

                    {isManagementOpen && (
                        <div className="pr-9 pl-4 py-1 space-y-1">
                            {managementSubItems.map((sub) => {
                                const isSubActive = location.pathname === sub.path;
                                return (
                                    <NavLink
                                        key={sub.path}
                                        to={sub.path}
                                        className={`block py-1.5 px-3 rounded-md text-xs font-medium transition-colors ${
                                            isSubActive
                                                ? 'text-purple-700 font-bold bg-purple-50'
                                                : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                                        }`}
                                    >
                                        {sub.name}
                                    </NavLink>
                                );
                            })}
                        </div>
                    )}
                </div>
            </nav>
        </aside>
    );
}
```

### frontend/src/components/StatCard.jsx

```javascript
// src/components/foodics/StatCard.jsx
import React from 'react';

export default function StatCard({ title, value, unit = '' }) {
    return (
        <div style={styles.card}>
            <div style={styles.title}>{title}</div>
            <div style={styles.value}>
                {value} <span style={styles.unit}>{unit}</span>
            </div>
            <div style={styles.chartPlaceholder}>
                <svg viewBox="0 0 100 30" style={{ width: '100%', height: '40px' }}>
                    <path d="M0 25 Q 25 5, 50 20 T 100 5 L 100 30 L 0 30 Z" fill="#bae6fd" opacity="0.4" />
                    <path d="M0 25 Q 25 5, 50 20 T 100 5" fill="none" stroke="#0284c7" strokeWidth="2" />
                </svg>
            </div>
        </div>
    );
}

const styles = {
    card: { backgroundColor: '#ffffff', borderRadius: '10px', padding: '16px', border: '1px solid #bae6fd', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 1px 3px rgba(56, 189, 248, 0.08)' },
    title: { fontSize: '13px', color: '#64748b', fontWeight: '500' },
    value: { fontSize: '22px', fontWeight: 'bold', color: '#0369a1', margin: '8px 0' },
    unit: { fontSize: '11px', color: '#94a3b8', fontWeight: 'normal' },
    chartPlaceholder: { marginTop: '8px' }
};
```

### frontend/src/components/ui.jsx

```javascript
import React from "react";
import { X, Loader2 } from "lucide-react";

export function Spinner({ className = "" }) {
  return <Loader2 className={`animate-spin ${className}`} />;
}

export function LoadingScreen({ message = "جاري التحميل..." }) {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <Spinner className="w-8 h-8 text-purple-600" />
      <p className="text-gray-500 font-medium">{message}</p>
    </div>
  );
}

export function Modal({ open, onClose, title, maxWidth = "max-w-md", footer, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className={`bg-white rounded-2xl w-full ${maxWidth} shadow-xl max-h-[90vh] flex flex-col`}>
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="font-bold text-gray-900 text-lg">{title}</h3>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
        {footer && (
          <div className="px-6 py-4 border-t bg-gray-50 rounded-b-2xl">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

```

### frontend/src/components/dashboard/DashboardStatsGrid.jsx

```javascript
/**
 * ============================================================================
 * Component: DashboardStatsGrid.jsx
 * ============================================================================
 * الوصف:
 * شبكة كروت المؤشرات والاحصائيات السريعة الرئيسية في لوحة التحكم.
 * ============================================================================
 */

import React from 'react';
import MiniAreaChart from './MiniAreaChart';

export default function DashboardStatsGrid({ stats = [] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
                <div key={idx} className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <span className="text-xs font-semibold text-gray-500">{stat.title}</span>
                    </div>
                    <div className="text-xl font-extrabold text-gray-800 mt-2">{stat.value}</div>
                    <MiniAreaChart />
                </div>
            ))}
        </div>
    );
}

```

### frontend/src/components/dashboard/DashboardTopTables.jsx

```javascript
/**
 * ============================================================================
 * Component: DashboardTopTables.jsx
 * ============================================================================
 * الوصف:
 * جداول المبيعات السفلية في لوحة التحكم (أعلى المنتجات، أعلى طرق الدفع، وأعلى الفروع).
 * ============================================================================
 */

import React from 'react';

export default function DashboardTopTables({ topProducts = [], topPayments = [], topBranches = [] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* أعلى المنتجات */}
            <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm space-y-3">
                <h4 className="text-xs font-bold text-gray-700 border-b border-gray-100 pb-2">
                    أعلى المنتجات حسب صافي البيع (SAR)
                </h4>
                <div className="space-y-2">
                    {topProducts.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-xs text-gray-600">
                            <span>{item.name}</span>
                            <span className="font-semibold text-gray-800">{item.amount}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* أعلى المدفوعات */}
            <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm space-y-3">
                <h4 className="text-xs font-bold text-gray-700 border-b border-gray-100 pb-2">
                    أعلى المدفوعات حسب صافي الدخل (SAR)
                </h4>
                <div className="space-y-2">
                    {topPayments.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-xs text-gray-600">
                            <span>{item.name}</span>
                            <span className="font-semibold text-gray-800">{item.amount}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* أعلى الفروع */}
            <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm space-y-3">
                <h4 className="text-xs font-bold text-gray-700 border-b border-gray-100 pb-2">
                    أعلى الفروع حسب صافي المبيعات (SAR)
                </h4>
                <div className="space-y-2">
                    {topBranches.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-xs text-gray-600">
                            <span>{item.name}</span>
                            <span className="font-semibold text-gray-800">{item.amount}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

```

### frontend/src/components/dashboard/HourlySalesChart.jsx

```javascript
/**
 * ============================================================================
 * Component: HourlySalesChart.jsx
 * ============================================================================
 * الوصف:
 * مكون الرسم البياني الرئيسي لمبيعات الساعات في لوحة التحكم (Dashboard).
 * ============================================================================
 */

import React from 'react';

export default function HourlySalesChart() {
    return (
        <div className="h-48 w-full mt-4">
            <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="mainGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.02" />
                    </linearGradient>
                </defs>
                <path
                    d="M 0 130 L 50 125 L 100 128 L 150 120 L 200 122 L 250 125 L 300 20 L 350 100 L 400 60 L 450 110 L 500 80 L 500 150 L 0 150 Z"
                    fill="url(#mainGrad)"
                />
                <path
                    d="M 0 130 L 50 125 L 100 128 L 150 120 L 200 122 L 250 125 L 300 20 L 350 100 L 400 60 L 450 110 L 500 80"
                    fill="none"
                    stroke="#6d28d9"
                    strokeWidth="2.5"
                />
            </svg>
            <div className="flex justify-between text-[10px] text-gray-400 mt-1 px-1">
                <span>PM 04</span>
                <span>PM 06</span>
                <span>PM 08</span>
                <span>PM 10</span>
                <span>AM 12</span>
                <span>AM 02</span>
                <span>AM 04</span>
                <span>AM 06</span>
                <span>AM 08</span>
                <span>AM 10</span>
                <span>PM 12</span>
                <span>PM 02</span>
            </div>
        </div>
    );
}

```

### frontend/src/components/dashboard/MiniAreaChart.jsx

```javascript
/**
 * ============================================================================
 * Component: MiniAreaChart.jsx
 * ============================================================================
 * الوصف:
 * رسم بياني مصغر (Sparkline Area Chart) كـ SVG يعرض في كروت المؤشرات السريعة.
 * ============================================================================
 */

import React from 'react';

export default function MiniAreaChart() {
    return (
        <div className="h-16 w-full mt-2">
            <svg className="w-full h-full stroke-purple-600 fill-purple-100" viewBox="0 0 100 40" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
                    </linearGradient>
                </defs>
                <path
                    d="M 0 30 Q 15 10, 30 25 T 60 15 T 80 35 T 100 5 L 100 40 L 0 40 Z"
                    fill="url(#purpleGrad)"
                />
                <path
                    d="M 0 30 Q 15 10, 30 25 T 60 15 T 80 35 T 100 5"
                    fill="none"
                    stroke="#7c3aed"
                    strokeWidth="2"
                />
            </svg>
        </div>
    );
}

```

### frontend/src/components/orders/OrderDetailModal.jsx

```javascript
/**
 * ============================================================================
 * Component: OrderDetailModal.jsx
 * ============================================================================
 * الوصف:
 * نافذة تفاصيل الفاتورة المنبثقة عند الضغط على زر المعاينة في جدول الطلبات.
 * تعرض تفاصيل المنتجات والأسعار والكميات وطرق الدفع.
 * ============================================================================
 */

import React from 'react';
import { XCircle } from 'lucide-react';

export default function OrderDetailModal({ selectedOrder, onClose }) {
    if (!selectedOrder) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl w-[500px] max-h-[85vh] shadow-xl flex flex-col overflow-hidden" dir="rtl">

                {/* هيدر التفاصيل */}
                <div className="p-5 bg-purple-600 text-white flex justify-between items-center">
                    <div>
                        <h3 className="font-bold text-base">تفاصيل الفاتورة #{selectedOrder.name}</h3>
                        <p className="text-xs opacity-80">العميل: {selectedOrder.customer_name || selectedOrder.customer}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-white/20 rounded-lg transition cursor-pointer"
                    >
                        <XCircle size={22} />
                    </button>
                </div>

                {/* أصناف الفاتورة */}
                <div className="p-5 flex-1 overflow-y-auto space-y-4 text-xs">
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 space-y-1">
                        <p><span className="font-bold text-gray-600">التاريخ:</span> {selectedOrder.posting_date} {selectedOrder.posting_time}</p>
                        <p><span className="font-bold text-gray-600">طريقة الدفع:</span> {selectedOrder.payments?.[0]?.mode_of_payment || 'Cash'}</p>
                        <p><span className="font-bold text-gray-600">بروفايل POS:</span> {selectedOrder.pos_profile}</p>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-800 mb-2 border-b pb-1">الأصناف المطلوبة:</h4>
                        <div className="space-y-2">
                            {selectedOrder.items?.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center p-2.5 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="font-bold text-gray-800">{item.item_name || item.item_code}</p>
                                        <p className="text-[10px] text-gray-500">EGP {item.rate} × {item.qty}</p>
                                    </div>
                                    <span className="font-bold text-purple-700">EGP {item.amount}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
                        <span className="font-bold text-sm text-gray-800">إجمالي الفاتورة:</span>
                        <span className="font-bold text-base text-purple-700">EGP {selectedOrder.grand_total?.toFixed(2)}</span>
                    </div>
                </div>

                {/* فوتر المودال */}
                <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
                    >
                        إغلاق
                    </button>
                </div>

            </div>
        </div>
    );
}

```

### frontend/src/components/orders/OrderStatusBadge.jsx

```javascript
/**
 * ============================================================================
 * Component: OrderStatusBadge.jsx
 * ============================================================================
 * الوصف:
 * شارة مستقلة تعبر عن حالة الفاتورة أو الطلب (مدفوع / مسودة / ملغي).
 * ============================================================================
 */

import React from 'react';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

export default function OrderStatusBadge({ status, docstatus }) {
    if (docstatus === 1 || status === 'Paid') {
        return (
            <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-max">
                <CheckCircle size={12} /> مدفوع / مؤكد
            </span>
        );
    } else if (docstatus === 2 || status === 'Cancelled') {
        return (
            <span className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-max">
                <XCircle size={12} /> ملغي
            </span>
        );
    } else {
        return (
            <span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-max">
                <Clock size={12} /> مسودة
            </span>
        );
    }
}

```

### frontend/src/components/orders/OrdersFilterBar.jsx

```javascript
/**
 * ============================================================================
 * Component: OrdersFilterBar.jsx
 * ============================================================================
 * الوصف:
 * شريط تصفية وحقول بحث قائمة الطلبات والفواتير.
 * ============================================================================
 */

import React from 'react';
import { Search } from 'lucide-react';

export default function OrdersFilterBar({ searchQuery, setSearchQuery, statusFilter, setStatusFilter }) {
    return (
        <div className="p-6 bg-gray-50 flex justify-between items-center gap-4 shrink-0">
            <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                    type="text"
                    placeholder="البحث برقم الفاتورة أو اسم العميل..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 text-right shadow-xs"
                />
            </div>

            <div className="flex gap-2">
                {['All', 'Paid', 'Draft', 'Cancelled'].map((st) => (
                    <button
                        key={st}
                        onClick={() => setStatusFilter(st)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                            statusFilter === st
                                ? 'bg-purple-600 text-white shadow-xs'
                                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                        }`}
                    >
                        {st === 'All' ? 'الكل' : st === 'Paid' ? 'المدفوعة' : st === 'Draft' ? 'المسودات' : 'الملغاة'}
                    </button>
                ))}
            </div>
        </div>
    );
}

```

### frontend/src/components/orders/OrdersTable.jsx

```javascript
/**
 * ============================================================================
 * Component: OrdersTable.jsx
 * ============================================================================
 * الوصف:
 * جدول عرض قائمة الفواتير والطلبات المسجلة في النظام.
 * ============================================================================
 */

import React from 'react';
import { User, Calendar, Eye, RefreshCw, FileText } from 'lucide-react';
import OrderStatusBadge from './OrderStatusBadge';

export default function OrdersTable({ loading, filteredOrders = [], fetchOrderDetails }) {
    if (loading) {
        return (
            <div className="flex justify-center items-center py-24 text-gray-400 gap-2">
                <RefreshCw className="animate-spin text-purple-600" size={24} />
                <span className="text-sm font-semibold">جاري تحميل الفواتير من فرابي...</span>
            </div>
        );
    }

    if (filteredOrders.length === 0) {
        return (
            <div className="text-center text-gray-400 py-20">
                <FileText className="mx-auto mb-2 opacity-30" size={48} />
                <p className="text-sm font-semibold">لا توجد طلبات مطابقة للبحث</p>
            </div>
        );
    }

    return (
        <table className="w-full text-right text-xs">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold">
                <tr>
                    <th className="p-4">رقم الفاتورة (DocType)</th>
                    <th className="p-4">العميل</th>
                    <th className="p-4">تاريخ ووقت الطلب</th>
                    <th className="p-4">نقطة البيع (POS)</th>
                    <th className="p-4">المبلغ الكلي</th>
                    <th className="p-4">الحالة</th>
                    <th className="p-4 text-center">التفاصيل</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
                {filteredOrders.map((ord) => (
                    <tr key={ord.name} className="hover:bg-purple-50/30 transition">
                        <td className="p-4 font-bold text-purple-700">{ord.name}</td>
                        <td className="p-4">
                            <div className="flex items-center gap-1.5 font-semibold text-gray-800">
                                <User size={14} className="text-gray-400" />
                                <span>{ord.customer_name || ord.customer}</span>
                            </div>
                        </td>
                        <td className="p-4 text-gray-500">
                            <div className="flex items-center gap-1">
                                <Calendar size={13} className="text-gray-400" />
                                <span>{ord.posting_date} {ord.posting_time ? `| ${ord.posting_time.slice(0, 5)}` : ''}</span>
                            </div>
                        </td>
                        <td className="p-4 font-medium text-gray-600">{ord.pos_profile || 'Standard'}</td>
                        <td className="p-4 font-bold text-gray-900">EGP {ord.grand_total?.toFixed(2)}</td>
                        <td className="p-4">
                            <OrderStatusBadge status={ord.status} docstatus={ord.docstatus} />
                        </td>
                        <td className="p-4 text-center">
                            <button
                                onClick={() => fetchOrderDetails(ord.name)}
                                className="p-2 bg-purple-50 hover:bg-purple-100 text-purple-600 rounded-lg transition cursor-pointer"
                                title="عرض التفاصيل"
                            >
                                <Eye size={16} />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

```

### frontend/src/components/pos/POSAddCustomerModal.jsx

```javascript
/**
 * ============================================================================
 * Component: POSAddCustomerModal.jsx
 * ============================================================================
 * الوصف:
 * نافذة منبثقة (Modal) لإضافة عميل جديد فوراً في نقطة البيع.
 * تأخذ اسم العميل ورقم الهاتف وتنشئ العميل على السيرفر مباشرة.
 * ============================================================================
 */

import React from 'react';
import { UserPlus, RefreshCw } from 'lucide-react';

export default function POSAddCustomerModal({
    newCustomerName,
    setNewCustomerName,
    newCustomerMobile,
    setNewCustomerMobile,
    handleAddCustomer,
    addingCustomer,
    setShowCustomerModal
}) {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl w-96 shadow-xl space-y-4" dir="rtl">
                <h3 className="font-bold text-gray-800 text-base border-b pb-2 flex items-center gap-2">
                    <UserPlus className="text-purple-600" size={18} /> إضافة / اختيار عميل
                </h3>

                <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">اسم العميل *</label>
                    <input
                        type="text"
                        placeholder="أدخل اسم العميل..."
                        value={newCustomerName}
                        onChange={(e) => setNewCustomerName(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">رقم الهاتف (اختياري)</label>
                    <input
                        type="text"
                        placeholder="أدخل رقم الهاتف..."
                        value={newCustomerMobile}
                        onChange={(e) => setNewCustomerMobile(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                </div>

                <div className="flex gap-2 pt-2">
                    <button
                        onClick={handleAddCustomer}
                        disabled={addingCustomer}
                        className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 text-white py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                    >
                        {addingCustomer ? (
                            <>
                                <RefreshCw className="animate-spin" size={14} />
                                <span>جاري الإضافة...</span>
                            </>
                        ) : (
                            <span>حفظ</span>
                        )}
                    </button>
                    <button
                        onClick={() => setShowCustomerModal(false)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
                    >
                        إلغاء
                    </button>
                </div>
            </div>
        </div>
    );
}

```

### frontend/src/components/pos/POSCart.jsx

```javascript
/**
 * ============================================================================
 * Component: POSCart.jsx
 * ============================================================================
 * الوصف:
 * مكون سلة المبيعات الجانبية في نقطة البيع.
 * يعتمد على الأزرار المنفصلة:
 * - POSClearCartButton
 * - POSAddCustomerButton
 * - POSSubmitOrderButton
 * وعرض عناصر السلة عبر POSCartItem.
 * ============================================================================
 */

import React from 'react';
import { ShoppingCart } from 'lucide-react';
import POSCartItem from './POSCartItem';
import POSClearCartButton from './buttons/POSClearCartButton';
import POSAddCustomerButton from './buttons/POSAddCustomerButton';
import POSSubmitOrderButton from './buttons/POSSubmitOrderButton';

export default function POSCart({
    cart,
    setCart,
    setShowCustomerModal,
    selectedCustomer,
    setSelectedCustomer,
    customers,
    removeFromCart,
    updateQty,
    totalAmount,
    submitOrder,
    submittingOrder,
    currentOpening
}) {
    return (
        <div className="w-1/3 bg-white flex flex-col justify-between shadow-sm h-full overflow-hidden">
            {/* الجزء العلوي: التحكم واختيار العميل */}
            <div className="flex flex-col shrink-0">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-purple-50/50">
                    <div className="flex items-center gap-2">
                        <POSClearCartButton onClick={() => setCart([])} />
                        <POSAddCustomerButton onClick={() => setShowCustomerModal(true)} />
                    </div>

                    <div className="flex items-center gap-2">
                        <h2 className="font-bold text-gray-800 text-base">الطلب الحالي</h2>
                        <ShoppingCart className="text-purple-600" size={20} />
                    </div>
                </div>

                <div className="p-4 border-b border-gray-100 bg-gray-50/30">
                    <label className="block text-xs font-semibold text-gray-600 mb-1">العميل</label>
                    <select
                        value={selectedCustomer}
                        onChange={(e) => setSelectedCustomer(e.target.value)}
                        className="w-full text-xs border border-gray-300 rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        {customers.map(c => (
                            <option key={c.name} value={c.name}>
                                {c.customer_name || c.name} ({c.mobile_no || 'بدون رقم'})
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* قائمة عناصر السلة */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {cart.length === 0 ? (
                    <div className="text-center text-gray-400 py-16 flex flex-col justify-center h-full">
                        <ShoppingCart className="mx-auto mb-2 opacity-30" size={40} />
                        <p className="text-xs">السلة فارغة حالياً</p>
                    </div>
                ) : (
                    cart.map((item) => (
                        <POSCartItem
                            key={item.item_code}
                            item={item}
                            updateQty={updateQty}
                            removeFromCart={removeFromCart}
                        />
                    ))
                )}
            </div>

            {/* الفوتر وزر الدفع المنفصل والمجموع */}
            <div className="p-4 border-t border-gray-200 bg-white shrink-0">
                <div className="flex justify-between items-center mb-3">
                    <span className="text-lg font-bold text-purple-700">EGP {totalAmount.toFixed(2)}</span>
                    <span className="text-xs text-gray-600 font-medium">المجموع الكلي:</span>
                </div>
                <POSSubmitOrderButton
                    onClick={submitOrder}
                    disabled={cart.length === 0 || !currentOpening}
                    submittingOrder={submittingOrder}
                />
            </div>
        </div>
    );
}

```

### frontend/src/components/pos/POSCartItem.jsx

```javascript
/**
 * ============================================================================
 * Component: POSCartItem.jsx
 * ============================================================================
 * الوصف:
 * مكون يمثل عنصراً واحداً داخل السلة.
 * يحتوي على أدوات التحكم بالكمية (+ / -) وحذف العنصر وعرض السعر الإجمالي للعنصر.
 * ============================================================================
 */

import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';

export default function POSCartItem({ item, updateQty, removeFromCart }) {
    return (
        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
            <div className="flex items-center gap-2">
                <button
                    onClick={() => removeFromCart(item.item_code)}
                    className="text-red-400 hover:text-red-600 ml-1 cursor-pointer"
                    title="حذف العنصر"
                >
                    <Trash2 size={14} />
                </button>
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => updateQty(item.item_code, 1)}
                        className="w-6 h-6 bg-white border border-gray-200 rounded-md flex items-center justify-center text-gray-600 hover:bg-gray-100 text-xs cursor-pointer"
                    >
                        <Plus size={12} />
                    </button>
                    <span className="text-xs font-bold w-5 text-center">{item.qty}</span>
                    <button
                        onClick={() => updateQty(item.item_code, -1)}
                        className="w-6 h-6 bg-white border border-gray-200 rounded-md flex items-center justify-center text-gray-600 hover:bg-gray-100 text-xs cursor-pointer"
                    >
                        <Minus size={12} />
                    </button>
                </div>
            </div>
            <div className="text-left">
                <h4 className="font-semibold text-xs text-gray-800">{item.item_name}</h4>
                <span className="text-[10px] text-purple-600 font-medium">
                    EGP {item.rate} × {item.qty} = EGP {(item.rate * item.qty).toFixed(2)}
                </span>
            </div>
        </div>
    );
}

```

### frontend/src/components/pos/POSCategoryTabs.jsx

```javascript
/**
 * ============================================================================
 * Component: POSCategoryTabs.jsx
 * ============================================================================
 * الوصف:
 * مكون شريط تبويبات التصنيفات الأفقية في نقطة البيع.
 * يسمح للمستخدم بالتنقل بين التصنيفات المتاحة لتصفية قائمة المنتجات المعروضة.
 * ============================================================================
 */

import React from 'react';

export default function POSCategoryTabs({ categories = [], selectedCategory = 'All', setSelectedCategory }) {
    return (
        <div className="px-4 py-3 bg-white border-b border-gray-200 flex gap-2 overflow-x-auto items-center shrink-0">
            <button
                onClick={() => setSelectedCategory('All')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                    selectedCategory === 'All'
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
                الكل
            </button>
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                        selectedCategory === cat
                            ? 'bg-purple-600 text-white shadow-sm'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
}

```

### frontend/src/components/pos/POSHeader.jsx

```javascript
/**
 * ============================================================================
 * Component: POSHeader.jsx
 * ============================================================================
 * الوصف:
 * شريط الترويسة العلوي لنقطة البيع.
 * يتيح اختيار قائمة الأسعار، بروفايل نقطة البيع، وعرض حالة الوردية مع استخدام أزرار الوردية المنفصلة:
 * - POSOpenShiftButton
 * - POSCloseShiftButton
 * كما يتيح تبديل المستخدم وتسجيل الخروج.
 * ============================================================================
 */

import React, { useState, useEffect, useRef } from 'react';
import { Tag, User, LogOut, ChevronDown } from 'lucide-react';
import POSOpenShiftButton from './buttons/POSOpenShiftButton';
import POSCloseShiftButton from './buttons/POSCloseShiftButton';
import { call, frappe } from '../../lib/frappe';
import { useNavigate } from 'react-router-dom';

export default function POSHeader({
    currentPriceList,
    setCurrentPriceList,
    priceLists = [],
    selectedProfileName,
    setSelectedProfileName,
    profiles = [],
    currentOpening,
    handleCloseShift,
    openingLoading,
    setShowOpenModal
}) {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [userInfo, setUserInfo] = useState({ name: 'جاري التحميل...', email: '' });
    const dropdownRef = useRef(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await call.get('cpro.api.users.get_current_user_info');
                if (res.message) {
                    setUserInfo(res.message);
                }
            } catch (error) {
                console.error("خطأ في جلب بيانات المستخدم:", error);
                setUserInfo({ name: 'مستخدم غير معروف', email: '' });
            }
        };
        fetchUser();
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            await frappe.auth().logout();
            localStorage.removeItem('isLoggedIn');
            navigate('/login');
        } catch (error) {
            console.error("Logout failed:", error);
            // Fallback: force redirect anyway
            localStorage.removeItem('isLoggedIn');
            navigate('/login');
        }
    };

    return (
        <div className="bg-white border-b border-gray-200 px-6 py-2.5 flex justify-between items-center shadow-xs">
            {/* اختيار قائمة الأسعار */}
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-xl">
                <Tag className="text-purple-600" size={16} />
                <span className="text-xs font-semibold text-gray-500">قائمة الأسعار:</span>
                <select
                    value={currentPriceList}
                    onChange={(e) => setCurrentPriceList(e.target.value)}
                    className="bg-transparent text-xs font-bold text-gray-800 focus:outline-none cursor-pointer border-none pr-1"
                >
                    {priceLists.length > 0 ? (
                        priceLists.map(pl => (
                            <option key={pl.name} value={pl.name}>{pl.name}</option>
                        ))
                    ) : (
                        <option value="">Standard Selling</option>
                    )}
                </select>
            </div>

            {/* حالة الوردية والبروفايل */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-xl">
                    <span className="text-xs font-semibold text-gray-500">البروفايل:</span>
                    <select
                        value={selectedProfileName}
                        onChange={(e) => setSelectedProfileName(e.target.value)}
                        className="bg-transparent text-xs font-bold text-gray-800 focus:outline-none cursor-pointer border-none pr-1"
                    >
                        {profiles.map(p => (
                            <option key={p.name} value={p.name}>{p.name} ({p.company || 'Main'})</option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-xl">
                    {currentOpening ? (
                        <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="text-xs font-bold text-gray-700">وردية مفتوحة: {currentOpening.name}</span>
                            <POSCloseShiftButton onClick={handleCloseShift} disabled={openingLoading} />
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                            <span className="text-xs font-bold text-gray-700">لا توجد وردية مفتوحة</span>
                            <POSOpenShiftButton onClick={() => setShowOpenModal(true)} />
                        </div>
                    )}
                </div>

                {/* User Profile Area */}
                <div className="relative" ref={dropdownRef}>
                    <button 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-2 hover:bg-gray-50 px-2 py-1 rounded-full transition-colors border border-transparent hover:border-gray-200"
                    >
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700">
                            <User className="w-4 h-4" />
                        </div>
                        <div className="text-right hidden md:block">
                            <p className="text-xs font-bold text-gray-800 leading-tight">{userInfo.name}</p>
                        </div>
                        <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute left-0 top-12 mt-1 w-56 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
                            <div className="p-4 border-b border-gray-50">
                                <p className="text-sm font-bold text-gray-800 truncate">{userInfo.name}</p>
                                <p className="text-xs text-gray-500 truncate">{userInfo.email}</p>
                            </div>
                            <div className="p-2">
                                <button 
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-3 py-2 text-sm font-semibold text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span>تسجيل الخروج / تبديل الحساب</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

```

### frontend/src/components/pos/POSItemCard.jsx

```javascript
/**
 * ============================================================================
 * Component: POSItemCard.jsx
 * ============================================================================
 * الوصف:
 * مكون كرت المنتج المكتفي بذاته في شبكة نقطة البيع.
 * يعرض صورة المنتج، الاسم، والسعر، وعند الضغط عليه يضيف المنتج إلى السلة.
 * ============================================================================
 */

import React from 'react';

export default function POSItemCard({ item, addToCart }) {
    const itemName = item.item_name || item.name || '';
    const rate = item.rate || item.standard_rate || 0;

    return (
        <div
            onClick={() => addToCart(item)}
            className="bg-white p-4 rounded-2xl border border-gray-200 hover:border-purple-500 shadow-sm hover:shadow-md cursor-pointer transition flex flex-col justify-between"
        >
            <div className="h-28 bg-purple-50 rounded-xl mb-3 flex items-center justify-center text-purple-600 font-bold text-lg overflow-hidden">
                {item.image ? (
                    <img src={item.image} alt={itemName} className="h-full w-full object-cover rounded-xl" />
                ) : (
                    itemName.slice(0, 2)
                )}
            </div>
            <div>
                <h3 className="font-bold text-sm text-gray-800 line-clamp-1 mb-1 text-center">{itemName}</h3>
                <div className="text-center">
                    <span className="text-xs text-purple-600 font-bold">EGP {rate}</span>
                </div>
            </div>
        </div>
    );
}

```

### frontend/src/components/pos/POSOpenShiftModal.jsx

```javascript
/**
 * ============================================================================
 * Component: POSOpenShiftModal.jsx
 * ============================================================================
 * الوصف:
 * نافذة منبثقة (Modal) لفتح وردية جديدة في الكاشير.
 * تطلب من الكاشير إدخال مبلغ الرصيد النقدى الافتتاحي وتأكيد فتح الوردية.
 * ============================================================================
 */

import React from 'react';
import { Unlock, RefreshCw, CheckCircle } from 'lucide-react';

export default function POSOpenShiftModal({
    selectedProfileName,
    openingBalance,
    setOpeningBalance,
    handleOpenShift,
    openingLoading,
    setShowOpenModal
}) {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl w-96 shadow-xl space-y-4" dir="rtl">
                <h3 className="font-bold text-gray-800 text-base border-b pb-2 flex items-center gap-2">
                    <Unlock className="text-purple-600" size={18} /> فتح وردية جديدة (POS Opening)
                </h3>
                <p className="text-xs text-gray-500">
                    البروفايل المحدد: <span className="font-bold text-gray-700">{selectedProfileName}</span>
                </p>
                <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">الرصيد النقدي الافتتاحي (Opening Amount)</label>
                    <input
                        type="number"
                        value={openingBalance}
                        onChange={(e) => setOpeningBalance(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                </div>
                <div className="flex gap-2 pt-2">
                    <button
                        onClick={handleOpenShift}
                        disabled={openingLoading}
                        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                    >
                        {openingLoading ? <RefreshCw className="animate-spin" size={14} /> : <CheckCircle size={14} />}
                        <span>تأكيد الفتح</span>
                    </button>
                    <button
                        onClick={() => setShowOpenModal(false)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
                    >
                        إلغاء
                    </button>
                </div>
            </div>
        </div>
    );
}

```

### frontend/src/components/pos/POSProductGrid.jsx

```javascript
/**
 * ============================================================================
 * Component: POSProductGrid.jsx
 * ============================================================================
 * الوصف:
 * مكون شبكة المنتجات في نقطة البيع.
 * يشمل حقل البحث، زر التحديث المنفصل (POSRefreshButton)، شريط التصنيفات (POSCategoryTabs)،
 * وعرض كروت المنتجات (POSItemCard).
 * ============================================================================
 */

import React from 'react';
import { Search, RefreshCw, AlertTriangle } from 'lucide-react';
import POSCategoryTabs from './POSCategoryTabs';
import POSItemCard from './POSItemCard';
import POSRefreshButton from './buttons/POSRefreshButton';

export default function POSProductGrid({
    fetchInitialData,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    categories,
    loadingItems,
    filteredItems,
    addToCart
}) {
    return (
        <div className="w-2/3 flex flex-col bg-gray-50 border-l border-gray-200 h-full overflow-hidden">
            {/* شريط البحث وزر التحديث المنفصل */}
            <div className="p-4 bg-white border-b border-gray-200 flex items-center gap-4 shrink-0">
                <POSRefreshButton onClick={fetchInitialData} />
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="البحث عن منتج بالاسم أو الكود..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-right"
                    />
                </div>
            </div>

            {/* تبويبات التصنيفات */}
            <POSCategoryTabs
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />

            {/* شبكة عرض المنتجات */}
            <div className="flex-1 p-4 overflow-y-auto">
                {loadingItems ? (
                    <div className="flex justify-center items-center h-64 text-gray-400">
                        <RefreshCw className="animate-spin ml-2" size={24} />
                        <span>جاري تحميل المنتجات والأسعار...</span>
                    </div>
                ) : filteredItems.length === 0 ? (
                    <div className="text-center text-gray-400 py-20">
                        <AlertTriangle className="mx-auto mb-2 opacity-30" size={48} />
                        <p>لا توجد منتجات مطابقة للبحث</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 gap-4">
                        {filteredItems.map((item) => (
                            <POSItemCard
                                key={item.item_code || item.name}
                                item={item}
                                addToCart={addToCart}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

```

### frontend/src/components/pos/buttons/POSAddCustomerButton.jsx

```javascript
/**
 * ============================================================================
 * Component: POSAddCustomerButton.jsx
 * ============================================================================
 * الوصف:
 * زر مستقل لفتح مودال إضافة عميل جديد في السلة (Add Customer Button).
 * ============================================================================
 */

import React from 'react';
import { UserPlus } from 'lucide-react';

export default function POSAddCustomerButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="text-purple-600 hover:text-purple-800 text-xs flex items-center gap-1 bg-white px-2 py-1 rounded border border-purple-200 font-semibold cursor-pointer"
        >
            <UserPlus size={12} />
            <span>إضافة عميل</span>
        </button>
    );
}

```

### frontend/src/components/pos/buttons/POSClearCartButton.jsx

```javascript
/**
 * ============================================================================
 * Component: POSClearCartButton.jsx
 * ============================================================================
 * الوصف:
 * زر مستقل لتفريغ ومسح عناصر السلة بالكامل (Clear Cart Button).
 * ============================================================================
 */

import React from 'react';
import { Trash2 } from 'lucide-react';

export default function POSClearCartButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="text-red-500 hover:text-red-700 text-xs flex items-center gap-1 bg-white px-2 py-1 rounded border border-red-200 cursor-pointer"
        >
            <Trash2 size={12} />
            <span>مسح الكل</span>
        </button>
    );
}

```

### frontend/src/components/pos/buttons/POSCloseShiftButton.jsx

```javascript
/**
 * ============================================================================
 * Component: POSCloseShiftButton.jsx
 * ============================================================================
 * الوصف:
 * زر مستقل لإغلاق الوردية الحالية في الكاشير (POS Close Shift Button).
 * عند الضغط عليه ينفذ إجراء إغلاق الوردية المفتوحة.
 * ============================================================================
 */

import React from 'react';
import { Lock } from 'lucide-react';

export default function POSCloseShiftButton({ onClick, disabled }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="bg-red-50 hover:bg-red-100 text-red-600 px-2 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 mr-2 cursor-pointer disabled:opacity-50"
        >
            <Lock size={12} />
            <span>إغلاق الوردية</span>
        </button>
    );
}

```

### frontend/src/components/pos/buttons/POSOpenShiftButton.jsx

```javascript
/**
 * ============================================================================
 * Component: POSOpenShiftButton.jsx
 * ============================================================================
 * الوصف:
 * زر مستقل لفتح وردية جديدة في الكاشير (POS Opening Shift Button).
 * عند الضغط عليه يقوم بإظهار نافذة إدخال الرصيد الافتتاحي وفتح الوردية.
 * ============================================================================
 */

import React from 'react';
import { Unlock } from 'lucide-react';

export default function POSOpenShiftButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 mr-2 shadow-xs cursor-pointer"
        >
            <Unlock size={12} />
            <span>فتح وردية جديدة</span>
        </button>
    );
}

```

### frontend/src/components/pos/buttons/POSRefreshButton.jsx

```javascript
/**
 * ============================================================================
 * Component: POSRefreshButton.jsx
 * ============================================================================
 * الوصف:
 * زر تحديث الأصناف والمنتجات المعروضة في شبكة المنتجات (Refresh Products Button).
 * ============================================================================
 */

import React from 'react';
import { RefreshCw } from 'lucide-react';

export default function POSRefreshButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-600 transition flex items-center gap-1 text-sm font-medium cursor-pointer"
            title="تحديث المنتجات"
        >
            <RefreshCw size={18} />
        </button>
    );
}

```

### frontend/src/components/pos/buttons/POSSubmitOrderButton.jsx

```javascript
/**
 * ============================================================================
 * Component: POSSubmitOrderButton.jsx
 * ============================================================================
 * الوصف:
 * زر إتمام الدفع وإصدار الفاتورة الرئيسي أسفل السلة (Submit Order / Checkout Button).
 * يعرض حالة التحميل وإيقاف الزر إذا كانت السلة فارغة أو لا توجد وردية مفتوحة.
 * ============================================================================
 */

import React from 'react';
import { RefreshCw, CheckCircle } from 'lucide-react';

export default function POSSubmitOrderButton({ onClick, disabled, submittingOrder }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled || submittingOrder}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 text-white py-2.5 rounded-xl text-xs font-bold shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
        >
            {submittingOrder ? (
                <>
                    <RefreshCw className="animate-spin" size={16} />
                    <span>جاري الإصدار...</span>
                </>
            ) : (
                <>
                    <CheckCircle size={16} />
                    <span>إتمام الدفع وإصدار الفاتورة</span>
                </>
            )}
        </button>
    );
}

```

### frontend/src/hooks/usePOSLogic.js

```javascript
/**
 * ============================================================================
 * Hook: usePOSLogic.js
 * ============================================================================
 * الوصف:
 * Custom Hook مخصص لإدارة حالة ومنطق نقطة البيع (POS).
 * يقوم بإدارة السلة، المنتجات، الفلترة حسب التصنيف والبحث، الورديات (فتح وإغلاق)،
 * إضافة العملاء، وحفظ الطلبات عبر اتصالات الـ API.
 * ============================================================================
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
    getMenus,
    getMenu,
    getCurrentShift,
    openShift,
    closeShift,
    searchCustomers,
    createCustomer,
    saveOrder
} from '../lib/api';

export default function usePOSLogic() {
    // --- الحالات الخاصة بالمنتجات والتصنيفات ---
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [loadingItems, setLoadingItems] = useState(false);

    // --- الحالات الخاصة بالسلة والطلب ---
    const [cart, setCart] = useState([]);
    const [submittingOrder, setSubmittingOrder] = useState(false);

    // --- الحالات الخاصة بالعملاء ---
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [showCustomerModal, setShowCustomerModal] = useState(false);
    const [newCustomerName, setNewCustomerName] = useState('');
    const [newCustomerMobile, setNewCustomerMobile] = useState('');
    const [addingCustomer, setAddingCustomer] = useState(false);

    // --- الحالات الخاصة بالوردية وقوائم الأسعار ---
    const [profiles, setProfiles] = useState([]);
    const [selectedProfileName, setSelectedProfileName] = useState('');
    const [priceLists, setPriceLists] = useState([]);
    const [currentPriceList, setCurrentPriceList] = useState('');
    const [currentOpening, setCurrentOpening] = useState(null);
    const [openingLoading, setOpeningLoading] = useState(false);
    const [showOpenModal, setShowOpenModal] = useState(false);
    const [openingBalance, setOpeningBalance] = useState(0);

    // --- جلب البيانات الأولية من السيرفر ---
    const fetchInitialData = useCallback(async () => {
        setLoadingItems(true);
        try {
            // جلب قوائم الأسعار (Cpro Menu)
            const menus = await getMenus();
            setPriceLists(menus || []);
            
            // جلب قائمة المنتجات
            const menuData = await getMenu(selectedCustomer, currentPriceList);
            const fetchedItems = menuData?.items || [];
            setItems(fetchedItems);

            // استخراج التصنيفات الفريدة
            const cats = Array.from(new Set(fetchedItems.map(i => i.item_group).filter(Boolean)));
            setCategories(cats);

            // جلب العملاء
            const custList = await searchCustomers("");
            setCustomers(custList || []);
            if (custList?.length > 0 && !selectedCustomer) {
                setSelectedCustomer(custList[0].name);
            }

            // جلب الوردية الحالية والبروفايلات
            const shiftData = await getCurrentShift();
            if (shiftData) {
                setCurrentOpening(shiftData.shift || null);
                setProfiles(shiftData.pos_profiles || []);
                if (shiftData.pos_profiles?.length > 0 && !selectedProfileName) {
                    setSelectedProfileName(shiftData.pos_profiles[0].name);
                }
            }
        } catch (error) {
            console.error('خطأ أثناء جلب بيانات POS:', error);
        } finally {
            setLoadingItems(false);
        }
    }, [currentPriceList, selectedCustomer, selectedProfileName]);

    useEffect(() => {
        fetchInitialData();
    }, [fetchInitialData]);

    // --- تصفية المنتجات حسب البحث والتصنيف ---
    const filteredItems = useMemo(() => {
        return items.filter((item) => {
            const matchesCategory = selectedCategory === 'All' || item.item_group === selectedCategory;
            const q = searchQuery.toLowerCase();
            const matchesSearch = !searchQuery ||
                (item.item_name && item.item_name.toLowerCase().includes(q)) ||
                (item.item_code && item.item_code.toLowerCase().includes(q));
            return matchesCategory && matchesSearch;
        });
    }, [items, selectedCategory, searchQuery]);

    // --- حساب إجمالي السلة ---
    const totalAmount = useMemo(() => {
        return cart.reduce((sum, item) => sum + (item.rate * item.qty), 0);
    }, [cart]);

    // --- العمليات الخاصة بالسلة ---
    const addToCart = (item) => {
        setCart((prevCart) => {
            const existingIndex = prevCart.findIndex(i => i.item_code === (item.item_code || item.name));
            if (existingIndex > -1) {
                const updated = [...prevCart];
                updated[existingIndex].qty += 1;
                return updated;
            }
            return [...prevCart, {
                item_code: item.item_code || item.name,
                item_name: item.item_name || item.name,
                rate: item.rate || item.standard_rate || 0,
                qty: 1,
                image: item.image
            }];
        });
    };

    const updateQty = (itemCode, delta) => {
        setCart((prevCart) => {
            return prevCart.map(i => {
                if (i.item_code === itemCode) {
                    const newQty = i.qty + delta;
                    return newQty > 0 ? { ...i, qty: newQty } : null;
                }
                return i;
            }).filter(Boolean);
        });
    };

    const removeFromCart = (itemCode) => {
        setCart((prevCart) => prevCart.filter(i => i.item_code !== itemCode));
    };

    // --- إضافة عميل جديد ---
    const handleAddCustomer = async () => {
        if (!newCustomerName.trim()) {
            alert('اسم العميل مطلوب');
            return;
        }
        setAddingCustomer(true);
        try {
            const created = await createCustomer(newCustomerName, newCustomerMobile);
            if (created) {
                setCustomers(prev => [created, ...prev]);
                setSelectedCustomer(created.name);
                setShowCustomerModal(false);
                setNewCustomerName('');
                setNewCustomerMobile('');
            }
        } catch (error) {
            console.error('خطأ أثناء إنشاء العميل:', error);
            alert("فشل إنشاء العميل، يرجى المحاولة مرة أخرى.");
        } finally {
            setAddingCustomer(false);
        }
    };

    // --- إتمام وحفظ الطلب ---
    const submitOrder = async () => {
        if (cart.length === 0) return;
        setSubmittingOrder(true);
        try {
            const payload = {
                pos_profile: selectedProfileName,
                customer: selectedCustomer,
                items: cart.map(i => ({
                    item_code: i.item_code,
                    qty: i.qty,
                    rate: i.rate
                }))
            };

            const data = await saveOrder(payload);
            if (data?.status === 'success' || data?.name) {
                alert(`تم تسجيل الطلب بنجاح! رقم الفاتورة: ${data.name || 'مؤكد'}`);
                setCart([]);
            }
        } catch (error) {
            console.error('خطأ أثناء حفظ الطلب:', error);
            alert("فشل حفظ الطلب، تأكد من وجود وردية مفتوحة.");
        } finally {
            setSubmittingOrder(false);
        }
    };

    const handleOpenShift = async () => {
        setOpeningLoading(true);
        try {
            if (!selectedProfileName) {
                alert("لم يتم تحديد بروفايل لنقطة البيع (POS Profile).");
                return;
            }
            const balanceDetails = [{ mode_of_payment: 'Cash', opening_amount: Number(openingBalance) }];
            const shiftData = await openShift(selectedProfileName, balanceDetails);
            if (shiftData) {
                setCurrentOpening(shiftData);
                setShowOpenModal(false);
            }
        } catch (error) {
            console.error('خطأ في فتح الوردية:', error);
            import('../lib/api').then(({ errorMessage }) => {
                alert("تعذر فتح الوردية: " + errorMessage(error));
            });
        } finally {
            setOpeningLoading(false);
        }
    };

    const handleCloseShift = async () => {
        if (!currentOpening) return;
        setOpeningLoading(true);
        try {
            await closeShift(currentOpening.name, [], "Closed from frontend");
            setCurrentOpening(null);
            alert('تم إغلاق الوردية بنجاح');
        } catch (error) {
            console.error('خطأ في إغلاق الوردية:', error);
            alert("تعذر إغلاق الوردية.");
        } finally {
            setOpeningLoading(false);
        }
    };

    return {
        // State
        filteredItems, cart, categories, selectedCategory, searchQuery,
        customers, selectedCustomer, profiles, selectedProfileName,
        priceLists, currentPriceList, currentOpening, openingLoading,
        showOpenModal, openingBalance, showCustomerModal, newCustomerName,
        newCustomerMobile, addingCustomer, loadingItems, submittingOrder, totalAmount,

        // Setters
        setCart, setSelectedCategory, setSearchQuery, setSelectedCustomer,
        setSelectedProfileName, setCurrentPriceList, setShowOpenModal,
        setOpeningBalance, setShowCustomerModal, setNewCustomerName,
        setNewCustomerMobile,

        // Actions
        fetchInitialData, handleOpenShift, handleCloseShift, addToCart,
        updateQty, removeFromCart, submitOrder, handleAddCustomer
    };
}

```

### frontend/src/kds/KdsPage.jsx

```javascript
import { useState, useEffect, useCallback, useRef } from "react";
import { AlertTriangle, ChefHat, RefreshCw, Wifi, Filter } from "lucide-react";
import Header, { StaffNav } from "../components/Header.jsx";
import { LoadingScreen } from "../components/ui.jsx";
import KotCard from "./KotCard.jsx";
import { getActiveKots, setKotStatus, setKotItemStatus, getKitchenStations, errorMessage, getCurrentShift } from "../lib/api.js";
import { onRealtime } from "../lib/socket.js";
import { KOT_UPDATE_EVENT } from "../lib/events.js";
import { __ } from "../lib/frappe.js";

const POLL_MS = 8000; // fallback refresh if the socket is unavailable
const COLUMNS = ["New", "Preparing", "Ready", "Served"];

/**
 * Kitchen Display System. Shows active tickets grouped by status in 4 columns.
 * Filters by current active shift and optionally by kitchen station.
 */
export default function KdsPage() {
  const [kots, setKots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stations, setStations] = useState([]);
  const [station, setStation] = useState("");
  const [shift, setShift] = useState(null);
  const [busy, setBusy] = useState(() => new Set());
  const [lastSync, setLastSync] = useState(null);

  const stationRef = useRef(station);
  stationRef.current = station;

  const shiftRef = useRef(shift);
  shiftRef.current = shift;

  const fetchKots = useCallback(async ({ silent } = {}) => {
    if (!silent) setLoading(true);
    try {
      const activeShift = shiftRef.current || (await getCurrentShift())?.shift;
      if (!shiftRef.current && activeShift) {
        setShift(activeShift);
      }
      
      if (!activeShift) {
        setKots([]);
        setError("");
        return;
      }

      const rows = await getActiveKots(stationRef.current || undefined, activeShift.name);
      setKots(rows);
      setError("");
      setLastSync(new Date());
    } catch (e) {
      if (!silent) setError(__(errorMessage(e)));
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  // Initial load + stations.
  useEffect(() => {
    fetchKots({ silent: false });
    getKitchenStations().then(setStations);
  }, [fetchKots]);

  // Refetch when the station filter changes.
  useEffect(() => {
    // Only refetch if shift is loaded to avoid double fetching on mount.
    if (shiftRef.current) {
      fetchKots({ silent: false });
    }
  }, [station, fetchKots]);

  // Realtime push + polling fallback.
  useEffect(() => {
    const off = onRealtime(KOT_UPDATE_EVENT, () => fetchKots({ silent: true }));
    const timer = setInterval(() => fetchKots({ silent: true }), POLL_MS);
    return () => {
      off();
      clearInterval(timer);
    };
  }, [fetchKots]);

  const withBusy = useCallback(
    async (name, fn) => {
      setBusy((prev) => new Set(prev).add(name));
      try {
        await fn();
        await fetchKots({ silent: true });
      } catch (e) {
        setError(__(errorMessage(e)));
      } finally {
        setBusy((prev) => {
          const next = new Set(prev);
          next.delete(name);
          return next;
        });
      }
    },
    [fetchKots]
  );

  const handleAdvance = useCallback((name, status) => withBusy(name, () => setKotStatus(name, status)), [withBusy]);
  const handleItemStatus = useCallback(
    (name, itemName, status) => withBusy(name, () => setKotItemStatus(name, itemName, status)),
    [withBusy]
  );

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gray-100">
      <Header
        subtitle={__("Kitchen Display")}
        nav={<StaffNav />}
        right={
          <div className="flex items-center gap-2">
            {stations.length > 0 && (
              <div className="relative hidden sm:block">
                <Filter className="pointer-events-none absolute start-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <select
                  value={station}
                  onChange={(e) => setStation(e.target.value)}
                  className="rounded-lg border border-gray-300 bg-white py-1.5 ps-8 pe-3 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                >
                  <option value="">{__("All stations")}</option>
                  {stations.map((s) => (
                    <option key={s.name} value={s.name}>
                      {s.station_name || s.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <button
              onClick={() => fetchKots({ silent: false })}
              className="flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              title={lastSync ? `Last updated ${lastSync.toLocaleTimeString()}` : __("Refresh")}
            >
              <RefreshCw className="h-4 w-4" />
              <span className="hidden md:inline">{__("Refresh")}</span>
            </button>
          </div>
        }
      />

      {/* Info Bar */}
      <div className="flex items-center justify-between gap-3 border-b border-gray-200 bg-white px-4 py-2 sm:px-6">
        <div className="text-sm font-medium text-gray-600">
          {shift ? __("Active Shift: {0}", [shift.name]) : __("No active shift")}
        </div>
        <span className="flex items-center gap-1.5 text-xs font-medium text-gray-400">
          <Wifi className="h-3.5 w-3.5 text-green-500" /> {__("Live")}
        </span>
      </div>

      {loading ? (
        <LoadingScreen label={__("Loading kitchen tickets…")} />
      ) : error ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center text-gray-500">
          <AlertTriangle className="h-10 w-10 text-red-400" />
          <p className="max-w-sm text-sm">{error}</p>
          <button
            onClick={() => fetchKots({ silent: false })}
            className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            {__("Retry")}
          </button>
        </div>
      ) : !shift ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 text-gray-400">
          <ChefHat className="h-12 w-12" />
          <p className="text-sm font-medium">{__("Please open a shift in the POS to view tickets.")}</p>
        </div>
      ) : (
        <div className="flex flex-1 gap-4 overflow-hidden p-4 sm:p-6">
          {COLUMNS.map((colName) => {
            const columnKots = kots.filter((k) => k.status === colName);
            return (
              <div key={colName} className="flex h-full w-1/4 flex-col rounded-2xl bg-brand/5 p-3 ring-1 ring-brand/10">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="font-bold text-brand-dark">{__(colName)}</h2>
                  <span className="rounded-full bg-brand/10 px-2 py-0.5 text-xs font-bold text-brand-dark">
                    {columnKots.length}
                  </span>
                </div>
                
                <div className="scrollbar-thin flex-1 overflow-y-auto space-y-3 pe-1">
                  {columnKots.length === 0 ? (
                    <div className="py-8 text-center text-sm text-gray-400">{__("No {0} tickets", [__(colName)])}</div>
                  ) : (
                    columnKots.map((kot) => (
                      <KotCard
                        key={kot.name}
                        kot={kot}
                        busy={busy.has(kot.name)}
                        onAdvance={handleAdvance}
                        onItemStatus={handleItemStatus}
                      />
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

```

### frontend/src/kds/KotCard.jsx

```javascript
import { Clock, StickyNote, Utensils, Check, ChevronRight, CookingPot, User, PlusCircle } from "lucide-react";
import { __ } from "../lib/frappe.js";

const NEXT_STATUS = { New: "Preparing", Preparing: "Ready", Ready: "Served" };
const ITEM_NEXT = { New: "Preparing", Preparing: "Ready" };

const STATUS_STYLES = {
  New: { pill: "bg-brand/10 text-brand-dark", bar: "bg-brand" },
  Preparing: { pill: "bg-brand/10 text-brand-dark", bar: "bg-brand" },
  Ready: { pill: "bg-brand/10 text-brand-dark", bar: "bg-brand" },
  Served: { pill: "bg-gray-100 text-gray-500", bar: "bg-gray-400" },
};

function minutesSince(dt) {
  if (!dt) return 0;
  const then = new Date(String(dt).replace(" ", "T")).getTime();
  if (Number.isNaN(then)) return 0;
  return Math.max(0, Math.floor((Date.now() - then) / 60000));
}

export default function KotCard({ kot, busy, onAdvance, onItemStatus }) {
  const style = STATUS_STYLES[kot.status] || STATUS_STYLES.New;
  const mins = minutesSince(kot.order_time);
  const ageAccent = "border-brand/20 ring-1 ring-brand/10 shadow-sm";
  const next = NEXT_STATUS[kot.status];

  const NEXT_LABEL = { New: __("Start Preparing"), Preparing: __("Mark Ready"), Ready: __("Bump (Served)") };
  const customerName = kot.customer_name || kot.customer;

  return (
    <div className={`flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm ${ageAccent}`}>
      <div className={`h-1 w-full ${style.bar}`} />

      {/* Header */}
      <div className="flex items-start justify-between gap-2 px-3 pt-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="truncate text-sm font-extrabold text-gray-900">{kot.name}</span>
            <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${style.pill}`}>
              {__(kot.status)}
            </span>
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-gray-500">
            {customerName && (
              <span className="flex items-center gap-1 font-semibold text-gray-800">
                <User className="h-3 w-3 text-brand" /> {customerName}
              </span>
            )}

            {kot.table && (
              <span className="flex items-center gap-1 font-medium text-gray-700">
                <Utensils className="h-3 w-3" /> {kot.table}
              </span>
            )}

            {kot.kitchen_station && <span className="truncate">· {kot.kitchen_station}</span>}
          </div>
        </div>

        <span className="flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-xs font-bold bg-gray-100 text-gray-500">
          <Clock className="h-3 w-3" /> {__("{0}m", [mins])}
        </span>
      </div>

      {/* Ticket note */}
      {kot.order_notes && (
        <div className="mx-3 mt-2 flex items-start gap-1.5 rounded-lg bg-red-50 px-2 py-1.5 text-xs font-medium text-red-600">
          <StickyNote className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span className="min-w-0">{kot.order_notes}</span>
        </div>
      )}

      {/* Items */}
      <div className="mt-2 flex-1 px-3 pb-2">
        {(kot.items || []).map((it, idx, arr) => {
          const itemStyle = STATUS_STYLES[it.status] || STATUS_STYLES.New;
          const itemNext = ITEM_NEXT[it.status];
          const isExtra = it.notes && it.notes.includes("إضافي");
          const prevIsExtra = idx > 0 && arr[idx - 1].notes && arr[idx - 1].notes.includes("إضافي");
          
          const showSeparator = isExtra && !prevIsExtra;

          return (
            <div key={it.name} className="flex flex-col">
              {showSeparator && (
                <div className="my-1 border-t-2 border-dashed border-red-200 pt-1 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-red-500">
                    {__("🔄 Added Items")}
                  </span>
                </div>
              )}
              {idx > 0 && !showSeparator && <div className="border-t border-gray-100" />}
              
              <div className="flex items-start justify-between gap-2 py-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm font-bold text-gray-900">{it.qty}×</span>
                    <span className="text-sm font-medium text-gray-800">{it.item_name || it.item}</span>
                  </div>

                  {it.modifiers_summary && (
                    <div className="mt-0.5 truncate text-xs text-gray-500">{it.modifiers_summary}</div>
                  )}

                  {it.notes && (
                    <div className="mt-1 flex items-center gap-1">
                      {isExtra ? (
                        <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-[11px] font-bold text-amber-700 border border-amber-200">
                          <PlusCircle className="h-3 w-3 text-amber-600" /> {it.notes}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-md bg-red-50 px-2 py-0.5 text-[11px] font-bold text-red-600 border border-red-100">
                          ⚠ {it.notes}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {itemNext ? (
                  <button
                    disabled={busy}
                    onClick={() => onItemStatus(kot.name, it.name, itemNext)}
                    className={`shrink-0 rounded-md px-2 py-1 text-[11px] font-bold transition disabled:opacity-50 ${itemStyle.pill} hover:brightness-95`}
                  >
                    {it.status === "New" ? __("Start") : __("Ready")}
                  </button>
                ) : (
                  <span className="flex shrink-0 items-center gap-0.5 rounded-md bg-brand/10 px-2 py-1 text-[11px] font-bold text-brand-dark">
                    <Check className="h-3 w-3" /> {__("Ready")}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Advance ticket */}
      {next && (
        <div className="p-3">
          <button
            disabled={busy}
            onClick={() => onAdvance(kot.name, next)}
            className={`flex w-full items-center justify-center gap-1.5 rounded-lg py-2.5 text-sm font-bold text-white transition disabled:opacity-50 ${kot.status === "Ready" ? "bg-gray-800 hover:bg-gray-900" : "bg-brand hover:bg-brand-dark"
              }`}
          >
            {kot.status === "New" && <CookingPot className="h-4 w-4" />}
            {NEXT_LABEL[kot.status]}
            {kot.status !== "Ready" && <ChevronRight className="h-4 w-4 rtl:rotate-180" />}
          </button>
        </div>
      )}
    </div>
  );
}
```

### frontend/src/layout/StaffLayout.jsx

```javascript
// src/layout/StaffLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function StaffLayout() {
  return (
    <div dir="rtl" className="flex h-screen bg-[#f4f5f7] font-sans antialiased overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 bg-[#f4f5f7]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
```

### frontend/src/lib/api.js

```javascript
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

```

### frontend/src/lib/events.js

```javascript
// Realtime event names — must match the backend exactly.
// KOT board updates: cpro.api.kitchen.REALTIME_EVENT
// Call-waiter alerts: cpro.api.portal.CALL_WAITER_EVENT
export const KOT_UPDATE_EVENT = "cpro_kot_update";
export const CALL_WAITER_EVENT = "cpro_call_waiter";

```

### frontend/src/lib/format.js

```javascript
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

```

### frontend/src/lib/frappe.js

```javascript
// src/lib/frappe.js

const { protocol, hostname, port } = window.location;
export const frappeUrl = port ? `${protocol}//${hostname}:${port}` : `${protocol}//${hostname}`;

/**
 * Fetch CSRF token directly from the Frappe backend HTML response
 * (Since Frappe injects window.csrf_token into its / template)
 */
export async function getCsrfToken() {
    if (window.csrf_token) return window.csrf_token;
    try {
        const res = await fetch('/', { credentials: 'include' });
        const html = await res.text();
        const match = html.match(/window\.csrf_token\s*=\s*["']([^"']+)["']/);
        if (match) {
            window.csrf_token = match[1];
        }
    } catch (e) {
        console.error("Failed to fetch CSRF Token", e);
    }
    return window.csrf_token || '';
}

export const call = {
    get: async (method, args = {}) => {
        const query = new URLSearchParams(args).toString();
        const res = await fetch(`/api/method/${method}${query ? '?' + query : ''}`, {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
            credentials: 'include' // Guarantees session cookie is sent!
        });
        const data = await res.json();
        if (!res.ok) {
            if (res.status === 403 || res.status === 401) {
                localStorage.removeItem('isLoggedIn');
                window.location.href = '/login';
            }
            throw data;
        }
        return data;
    },
    post: async (method, args = {}) => {
        const csrf = await getCsrfToken();
        const res = await fetch(`/api/method/${method}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Frappe-CSRF-Token': csrf
            },
            credentials: 'include', // Guarantees session cookie is sent!
            body: JSON.stringify(args)
        });
        const data = await res.json();
        if (!res.ok) {
            if (res.status === 403 || res.status === 401) {
                localStorage.removeItem('isLoggedIn');
                window.location.href = '/login';
            }
            throw data;
        }
        return data;
    }
};

export const db = {
    getDocList: async (doctype, { fields, filters, orderBy, limit }) => {
        const params = new URLSearchParams();
        if (fields) params.append('fields', JSON.stringify(fields));
        if (filters) params.append('filters', JSON.stringify(filters));
        if (orderBy) params.append('order_by', `${orderBy.field} ${orderBy.order}`);
        if (limit !== undefined) params.append('limit_page_length', limit);
        
        const res = await fetch(`/api/resource/${doctype}?${params.toString()}`, {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
            credentials: 'include'
        });
        const data = await res.json();
        if (!res.ok) {
            if (res.status === 403 || res.status === 401) {
                localStorage.removeItem('isLoggedIn');
                window.location.href = '/login';
            }
            throw data;
        }
        return data.data; // Frappe REST returns { data: [...] }
    },
    createDoc: async (doctype, payload) => {
        const csrf = await getCsrfToken();
        const res = await fetch(`/api/resource/${doctype}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Frappe-CSRF-Token': csrf
            },
            credentials: 'include',
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (!res.ok) {
            if (res.status === 403 || res.status === 401) {
                localStorage.removeItem('isLoggedIn');
                window.location.href = '/login';
            }
            throw data;
        }
        return data.data;
    }
};

export const frappe = {
    auth: () => ({
        loginWithUsernamePassword: async ({ username, password }) => {
            const res = await fetch('/api/method/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                credentials: 'include', // Guarantees session cookie is saved!
                body: JSON.stringify({ usr: username, pwd: password }),
            });
            const data = await res.json();
            if (!res.ok) throw data;
            // Fetch CSRF token immediately after successful login
            await getCsrfToken();
            return data;
        },
        logout: async () => {
            await fetch('/api/method/logout', {
                method: 'POST',
                credentials: 'include',
            });
            window.csrf_token = null;
        }
    })
};

export function __(text, args) {
  let str = String(text);
  if (args && Array.isArray(args)) {
    args.forEach((arg, i) => {
      str = str.replace(`{${i}}`, String(arg));
    });
  }
  return str;
}

export default frappe;

```

### frontend/src/lib/session.js

```javascript
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

```

### frontend/src/lib/socket.js

```javascript
import { io } from "socket.io-client";
import { getBoot } from "./session.js";

// Best-effort Frappe realtime. Treat this as an *enhancement*, never a
// dependency: the KDS and the POS also poll, so if the socket never connects
// (reverse-proxy quirk, guest context, dev port) the screens still refresh.
// A socket error must never surface in the UI.
let socket = null;
let attempted = false;

export function getSocket() {
  if (attempted) return socket;
  attempted = true;
  try {
    const boot = getBoot();
    // Frappe namespaces realtime per site: io(origin + "/" + sitename).
    const sitename = boot.sitename || window.location.hostname;
    socket = io(`${window.location.origin}/${sitename}`, {
      withCredentials: true,
      path: "/socket.io",
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
      transports: ["websocket", "polling"],
    });
    socket.on("connect_error", () => {}); // swallow — polling is the guarantee
  } catch (e) {
    socket = null;
  }
  return socket;
}

/**
 * Subscribe to a Frappe realtime event. Returns an unsubscribe function that is
 * always safe to call (a no-op when no socket could be established).
 */
export function onRealtime(event, handler) {
  const s = getSocket();
  if (!s) return () => {};
  s.on(event, handler);
  return () => {
    try {
      s.off(event, handler);
    } catch (e) {
      /* ignore */
    }
  };
}

```

### frontend/src/orders/OrdersPage.jsx

```javascript
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

```

### frontend/src/pages/DashboardPage.jsx

```javascript
/**
 * ============================================================================
 * Page: DashboardPage.jsx
 * ============================================================================
 * الوصف:
 * الصفحة الرئيسية للوحة التحكم (Dashboard).
 * تقوم بتجميع المكونات المستقلة وتجلب البيانات بشكل ديناميكي من Frappe Backend.
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import DashboardStatsGrid from '../components/dashboard/DashboardStatsGrid';
import HourlySalesChart from '../components/dashboard/HourlySalesChart';
import DashboardTopTables from '../components/dashboard/DashboardTopTables';
import { call } from '../lib/frappe';

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState('عام');
    const [period, setPeriod] = useState('يوم');
    const [loading, setLoading] = useState(true);

    const [mainStats, setMainStats] = useState([]);
    const [topProducts, setTopProducts] = useState([]);
    const [topPayments, setTopPayments] = useState([]);
    const [topBranches, setTopBranches] = useState([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true);
            try {
                const res = await call.get('cpro.api.dashboard.get_dashboard_stats', { period });
                if (res.message) {
                    setMainStats(res.message.mainStats || []);
                    setTopProducts(res.message.topProducts || []);
                    setTopPayments(res.message.topPayments || []);
                    setTopBranches(res.message.topBranches || []);
                }
            } catch (error) {
                console.error("خطأ في جلب بيانات لوحة التحكم:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [period]);

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* الترويسة والترحيب */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">مرحباً، فواز</h1>
                </div>

                {/* التبويبات الرئيسية */}
                <div className="flex items-center gap-1 bg-gray-200/60 p-1 rounded-lg text-xs font-semibold text-gray-600">
                    {['عام', 'الفروع', 'المخزون', 'مركز الاتصال'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-1.5 rounded-md transition-all ${
                                activeTab === tab
                                    ? 'bg-purple-600 text-white shadow-sm'
                                    : 'hover:text-gray-900'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* الفلتر الزمني */}
            <div className="flex items-center gap-2">
                <div className="flex bg-white rounded-md border border-gray-200 p-0.5 text-xs font-medium text-gray-600">
                    {['يوم', 'الأسبوع', 'الشهر'].map((p) => (
                        <button
                            key={p}
                            onClick={() => setPeriod(p)}
                            className={`px-3 py-1 rounded ${
                                period === p ? 'bg-gray-100 font-bold text-gray-800' : ''
                            }`}
                        >
                            {p}
                        </button>
                    ))}
                </div>
                <input
                    type="date"
                    className="bg-white border border-gray-200 rounded-md text-xs px-3 py-1 text-gray-600 focus:outline-none"
                />
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                </div>
            ) : (
                <>
                    {/* شبكة كروت المؤشرات */}
                    <DashboardStatsGrid stats={mainStats} />

                    {/* رسم بياني: المبيعات لكل ساعة */}
                    <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
                        <h3 className="text-sm font-bold text-gray-700">المبيعات لكل ساعة</h3>
                        <HourlySalesChart />
                    </div>

                    {/* الجداول السفليّة للتصنيفات */}
                    <DashboardTopTables
                        topProducts={topProducts}
                        topPayments={topPayments}
                        topBranches={topBranches}
                    />
                </>
            )}
        </div>
    );
}
```

### frontend/src/pages/GenericManagementPage.jsx

```javascript
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Plus, X, Edit, Trash2 } from 'lucide-react';
import { call } from '../lib/frappe';

export default function GenericManagementPage() {
    const { route } = useParams();
    const location = useLocation();
    
    const [config, setConfig] = useState(null);
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const init = async () => {
            setLoading(true);
            try {
                // 1. Fetch config for this route
                const linksRes = await call.get('cpro.api.management.get_management_links');
                const linkConfig = (linksRes.message || []).find(l => l.route === route);
                
                if (!linkConfig) {
                    console.error("Configuration not found for route:", route);
                    setLoading(false);
                    return;
                }
                
                const fieldsConfig = typeof linkConfig.fields_config === 'string' 
                    ? JSON.parse(linkConfig.fields_config) 
                    : linkConfig.fields_config;
                
                linkConfig.parsedFields = fieldsConfig || [];
                setConfig(linkConfig);
                
                // 2. Fetch records
                const fieldNames = linkConfig.parsedFields.map(f => f.fieldname);
                const recordsRes = await call.get('cpro.api.management.get_dynamic_records', {
                    target_doctype: linkConfig.target_doctype,
                    fields: JSON.stringify(fieldNames)
                });
                
                setRecords(recordsRes.message || []);
            } catch (error) {
                console.error("Error fetching dynamic records:", error);
            } finally {
                setLoading(false);
            }
        };
        init();
    }, [route]);

    const handleOpenModal = (record = null) => {
        if (record) {
            setFormData(record);
            setIsEditing(true);
        } else {
            const defaultData = {};
            config?.parsedFields.forEach(f => {
                if (f.default !== undefined) {
                    defaultData[f.fieldname] = f.default;
                }
            });
            setFormData(defaultData);
            setIsEditing(false);
        }
        setIsModalOpen(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await call.post('cpro.api.management.save_dynamic_record', {
                target_doctype: config.target_doctype,
                data: JSON.stringify(formData)
            });
            
            setIsModalOpen(false);
            // Refresh records
            const fieldNames = config.parsedFields.map(f => f.fieldname);
            const recordsRes = await call.get('cpro.api.management.get_dynamic_records', {
                target_doctype: config.target_doctype,
                fields: JSON.stringify(fieldNames)
            });
            setRecords(recordsRes.message || []);
        } catch (error) {
            console.error("Error saving record:", error);
            alert("حدث خطأ أثناء الحفظ");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (name) => {
        if (!window.confirm("هل أنت متأكد من حذف هذا السجل؟")) return;
        
        try {
            await call.post('cpro.api.management.delete_dynamic_record', {
                target_doctype: config.target_doctype,
                name: name
            });
            setRecords(prev => prev.filter(r => r.name !== name));
        } catch (error) {
            console.error("Error deleting record:", error);
            alert("حدث خطأ أثناء الحذف");
        }
    };

    if (loading) {
        return <div className="flex justify-center p-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div></div>;
    }

    if (!config) {
        return <div className="p-10 text-center text-gray-500">الإعدادات غير متوفرة لهذا القسم.</div>;
    }

    const title = location.state?.title || config.title;

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
                <button 
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    <span>إضافة جديد</span>
                </button>
            </div>

            <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-right text-sm">
                    <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200">
                        <tr>
                            {config.parsedFields.map(field => (
                                <th key={field.fieldname} className="py-3 px-4">{field.label}</th>
                            ))}
                            <th className="py-3 px-4 text-center w-24">التحكم</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-600">
                        {records.length === 0 ? (
                            <tr>
                                <td colSpan={config.parsedFields.length + 1} className="py-6 text-center text-gray-500">لا يوجد بيانات</td>
                            </tr>
                        ) : (
                            records.map((record) => (
                                <tr key={record.name} className="hover:bg-gray-50">
                                    {config.parsedFields.map(field => (
                                        <td key={field.fieldname} className="py-3 px-4">
                                            {field.type === 'Check' 
                                                ? (record[field.fieldname] ? 'نعم' : 'لا')
                                                : record[field.fieldname]
                                            }
                                        </td>
                                    ))}
                                    <td className="py-3 px-4 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <button 
                                                onClick={() => handleOpenModal(record)}
                                                className="text-purple-600 hover:text-purple-800 p-1"
                                                title="تعديل"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(record.name)}
                                                className="text-red-500 hover:text-red-700 p-1"
                                                title="حذف"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Form Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 overflow-hidden flex flex-col">
                        <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-gray-50">
                            <h3 className="font-bold text-lg text-gray-800">{isEditing ? 'تعديل' : 'إضافة جديد'}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSave} className="flex flex-col">
                            <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto">
                                {config.parsedFields.map(field => (
                                    <div key={field.fieldname} className="flex flex-col gap-1">
                                        {field.type === 'Check' ? (
                                            <label className="flex items-center gap-2 font-semibold text-gray-700 cursor-pointer">
                                                <input 
                                                    type="checkbox"
                                                    checked={!!formData[field.fieldname]}
                                                    onChange={e => setFormData({...formData, [field.fieldname]: e.target.checked ? 1 : 0})}
                                                    className="w-4 h-4 text-purple-600 rounded"
                                                />
                                                {field.label}
                                            </label>
                                        ) : (
                                            <>
                                                <label className="font-semibold text-gray-700 text-sm">{field.label}</label>
                                                <input 
                                                    type="text"
                                                    required={field.reqd}
                                                    value={formData[field.fieldname] || ''}
                                                    onChange={e => setFormData({...formData, [field.fieldname]: e.target.value})}
                                                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-600 outline-none text-sm"
                                                />
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                            
                            <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                                <button 
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-sm font-semibold text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    إلغاء
                                </button>
                                <button 
                                    type="submit"
                                    disabled={saving}
                                    className="px-5 py-2 text-sm font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:opacity-50"
                                >
                                    {saving ? 'جاري الحفظ...' : 'حفظ'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

```

### frontend/src/pages/KitchenPage.jsx

```javascript
/**
 * ============================================================================
 * Page: KitchenPage.jsx
 * ============================================================================
 * الوصف:
 * صفحة شاشة المطبخ (Kitchen Display System - KDS).
 * تعرض تذاكر الطلبات للمطبخ وتسمح لموظفي المطبخ بمتابعة وتحديث حالة الطلبات.
 * ============================================================================
 */

import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function KitchenPage() {
    return (
        <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f0f9ff', direction: 'rtl', overflow: 'hidden' }}>
            <Sidebar />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
                <Header />
                <main style={{ padding: '24px' }}>
                    <h2 style={{ color: '#0369a1', margin: 0 }}>👨‍🍳 شاشة المطبخ (KDS)</h2>
                </main>
            </div>
        </div>
    );
}
```

### frontend/src/pages/LoginPage.jsx

```javascript
/**
 * ============================================================================
 * Page: LoginPage.jsx
 * ============================================================================
 * الوصف:
 * صفحة تسجيل الدخول لنظام CPRO POS.
 * تسمح للمستخدم بإدخال بيانات الاعتماد (اسم المستخدم وكلمة السر) وتوثيق الجلسة مع Frappe.
 * ============================================================================
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth';

export default function LoginPage({ onLoginSuccess }) {
    const [usr, setUsr] = useState('Administrator');
    const [pwd, setPwd] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const result = await loginUser(usr, pwd);

        if (result.success) {
            localStorage.setItem('isLoggedIn', 'true');
            if (onLoginSuccess) onLoginSuccess();
            navigate('/pos');
        } else {
            setError(result.message || 'فشل تسجيل الدخول، يرجى التأكد من البيانات');
        }
        setLoading(false);
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <span style={styles.badge}>CPro POS</span>
                    <h2 style={styles.title}>تسجيل الدخول</h2>
                    <p style={styles.subtitle}>أدخل بيانات حسابك للوصول إلى لوحة التحكم</p>
                </div>

                {error && <div style={styles.errorBox}>{error}</div>}

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>اسم المستخدم / البريد الإلكتروني</label>
                        <input
                            type="text"
                            required
                            value={usr}
                            onChange={(e) => setUsr(e.target.value)}
                            placeholder="Administrator"
                            style={styles.input}
                            disabled={loading}
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>كلمة السر</label>
                        <input
                            type="password"
                            required
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                            placeholder="••••••••"
                            style={styles.input}
                            disabled={loading}
                        />
                    </div>

                    <button type="submit" disabled={loading} style={styles.button}>
                        {loading ? 'جاري التحقق...' : 'دخول للنظام'}
                    </button>
                </form>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'var(--bg-main, #0f172a)',
        direction: 'rtl',
    },
    card: {
        backgroundColor: 'var(--bg-card, #1e293b)',
        padding: '40px',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
        border: '1px solid var(--border-color, #334155)',
    },
    header: {
        marginBottom: '24px',
        textAlign: 'center',
    },
    badge: {
        fontSize: '11px',
        fontWeight: 'bold',
        color: 'var(--primary, #3b82f6)',
        letterSpacing: '1px',
        textTransform: 'uppercase',
    },
    title: {
        margin: '8px 0 4px 0',
        color: '#f8fafc',
        fontSize: '22px',
        fontWeight: '700',
    },
    subtitle: {
        margin: 0,
        color: '#94a3b8',
        fontSize: '13px',
    },
    errorBox: {
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        border: '1px solid #ef4444',
        color: '#fca5a5',
        padding: '10px 14px',
        borderRadius: '8px',
        marginBottom: '20px',
        fontSize: '13px',
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
    },
    label: {
        fontSize: '13px',
        color: '#cbd5e1',
        fontWeight: '500',
    },
    input: {
        padding: '12px 14px',
        borderRadius: '8px',
        border: '1px solid #334155',
        backgroundColor: '#0f172a',
        color: '#fff',
        fontSize: '14px',
        outline: 'none',
    },
    button: {
        marginTop: '10px',
        padding: '12px',
        backgroundColor: 'var(--primary, #2563eb)',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontWeight: 'bold',
        fontSize: '14px',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    },
};
```

### frontend/src/pages/ManagementPage.jsx

```javascript
/**
 * ============================================================================
 * Page: ManagementPage.jsx
 * ============================================================================
 * الوصف:
 * الصفحة الرئيسية لقسم الإدارة.
 * تعرض اختصارات سريعة لإعدادات مناطق التوصيل، طرق الدفع، الضرائب، وغيرها بشكل ديناميكي.
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { call } from '../lib/frappe';

export default function ManagementPage() {
    const navigate = useNavigate();
    const [dynamicOptions, setDynamicOptions] = useState([]);
    const [loading, setLoading] = useState(true);

    // Hardcoded special pages that shouldn't be overridden
    const staticOptions = [
        { title: 'المستخدمين', path: '/management/users', icon: 'Users' },
        { title: 'الأسباب', path: '/management/reasons', highlight: true, icon: 'HelpCircle' },
    ];

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const res = await call.get('cpro.api.management.get_management_links');
                if (res.message) {
                    setDynamicOptions(res.message);
                }
            } catch (error) {
                console.error("Error fetching dynamic links:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLinks();
    }, []);

    const renderIcon = (iconName) => {
        const IconComponent = Icons[iconName] || Icons.Settings;
        return <IconComponent className="w-6 h-6 mb-2 text-purple-600" />;
    };

    const allOptions = [
        ...staticOptions,
        ...dynamicOptions.map(link => ({
            title: link.title,
            path: `/management/dynamic/${link.route}`,
            icon: link.icon || 'FileText',
            isDynamic: true
        }))
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex justify-start items-center">
                <h2 className="text-2xl font-bold text-gray-800">إدارة</h2>
            </div>

            {loading ? (
                <div className="flex justify-center p-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {allOptions.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => navigate(item.path, { state: { title: item.title } })}
                            className={`h-28 bg-white rounded-xl shadow-sm flex flex-col items-center justify-center p-4 text-gray-700 font-bold text-sm transition-all hover:shadow-md hover:bg-gray-50 ${
                                item.highlight ? 'ring-2 ring-yellow-400' : 'border border-gray-100'
                            }`}
                        >
                            {renderIcon(item.icon)}
                            <span>{item.title}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
```

### frontend/src/pages/OrdersPage.jsx

```javascript
/**
 * ============================================================================
 * Page: OrdersPage.jsx
 * ============================================================================
 * الوصف:
 * صفحة إدارة ومتابعة الطلبات والفواتير.
 * تجمع بين مكونات المساعدين (OrdersFilterBar, OrdersTable, OrderDetailModal).
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import { ShoppingBag, RefreshCw } from 'lucide-react';
import OrdersFilterBar from '../components/orders/OrdersFilterBar';
import OrdersTable from '../components/orders/OrdersTable';
import OrderDetailModal from '../components/orders/OrderDetailModal';

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    // جلب الفواتير الحقيقية من DocType: POS Invoice في فرابي
    const fetchOrders = async () => {
        try {
            setLoading(true);
            const fields = JSON.stringify([
                "name", "customer", "customer_name", "posting_date",
                "posting_time", "grand_total", "status", "docstatus", "pos_profile"
            ]);

            const res = await fetch(`/api/resource/POS Invoice?fields=${encodeURIComponent(fields)}&order_by=creation desc&limit_page_length=100`);

            if (res.ok) {
                const data = await res.json();
                if (data && data.data) {
                    setOrders(data.data);
                    setFilteredOrders(data.data);
                }
            } else {
                console.error('فشل جلب الطلبات من فرابي');
            }
        } catch (error) {
            console.error('حدث خطأ أثناء الاتصال بالخادم:', error);
        } finally {
            setLoading(false);
        }
    };

    // جلب تفاصيل فاتورة محددة
    const fetchOrderDetails = async (orderName) => {
        try {
            const res = await fetch(`/api/resource/POS Invoice/${encodeURIComponent(orderName)}`);
            if (res.ok) {
                const data = await res.json();
                setSelectedOrder(data.data);
            }
        } catch (e) {
            console.error('خطأ في جلب تفاصيل الطلب:', e);
        }
    };

    // تصفية الطلبات
    useEffect(() => {
        let result = orders;

        if (statusFilter !== 'All') {
            result = result.filter(o => o.status === statusFilter || (statusFilter === 'Paid' && o.docstatus === 1));
        }

        if (searchQuery.trim() !== '') {
            const q = searchQuery.toLowerCase();
            result = result.filter(o =>
                (o.name && o.name.toLowerCase().includes(q)) ||
                (o.customer_name && o.customer_name.toLowerCase().includes(q)) ||
                (o.customer && o.customer.toLowerCase().includes(q))
            );
        }

        setFilteredOrders(result);
    }, [searchQuery, statusFilter, orders]);

    return (
        <div className="flex flex-col h-screen bg-gray-50 text-right overflow-hidden" dir="rtl">
            {/* هيدر الصفحة */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-xs">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
                        <ShoppingBag size={22} />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg text-gray-800">قائمة الطلبات والفواتير</h1>
                        <p className="text-xs text-gray-500">متابعة الفواتير والطلبات المباشرة من نقاط البيع (Frappe POS Invoices)</p>
                    </div>
                </div>

                <button
                    onClick={fetchOrders}
                    className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-700 transition flex items-center gap-2 text-xs font-bold cursor-pointer"
                >
                    <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                    <span>تحديث الطلبات</span>
                </button>
            </div>

            {/* أدوات البحث والتصفية */}
            <OrdersFilterBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
            />

            {/* جدول الفواتير */}
            <div className="flex-1 px-6 pb-6 overflow-y-auto">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
                    <OrdersTable
                        loading={loading}
                        filteredOrders={filteredOrders}
                        fetchOrderDetails={fetchOrderDetails}
                    />
                </div>
            </div>

            {/* تفاصيل الفاتورة عند المعاينة */}
            <OrderDetailModal
                selectedOrder={selectedOrder}
                onClose={() => setSelectedOrder(null)}
            />
        </div>
    );
}
```

### frontend/src/pages/POSPage.jsx

```javascript
/**
 * ============================================================================
 * Page: POSPage.jsx
 * ============================================================================
 * الوصف:
 * الصفحة الرئيسية لنقطة البيع (POS).
 * تلتزم بمبادئ الكود النظيف (Clean Code) عن طريق استدعاء المكونات الصغيرة
 * والمنفصلة (Header, ProductGrid, Cart, Modals) واستخدام usePOSLogic للتحكم بالحالة.
 * ============================================================================
 */

import React from 'react';
import POSHeader from '../components/pos/POSHeader';
import POSProductGrid from '../components/pos/POSProductGrid';
import POSCart from '../components/pos/POSCart';
import POSOpenShiftModal from '../components/pos/POSOpenShiftModal';
import POSAddCustomerModal from '../components/pos/POSAddCustomerModal';
import usePOSLogic from '../hooks/usePOSLogic';

export default function POSPage() {
    const {
        // State
        filteredItems, cart, categories, selectedCategory, searchQuery,
        customers, selectedCustomer, profiles, selectedProfileName,
        priceLists, currentPriceList, currentOpening, openingLoading,
        showOpenModal, openingBalance, showCustomerModal, newCustomerName,
        newCustomerMobile, addingCustomer, loadingItems, submittingOrder, totalAmount,

        // Setters
        setCart, setSelectedCategory, setSearchQuery, setSelectedCustomer,
        setSelectedProfileName, setCurrentPriceList, setShowOpenModal,
        setOpeningBalance, setShowCustomerModal, setNewCustomerName,
        setNewCustomerMobile,

        // Actions
        fetchInitialData, handleOpenShift, handleCloseShift, addToCart,
        updateQty, removeFromCart, submitOrder, handleAddCustomer
    } = usePOSLogic();

    return (
        <div className="flex flex-col h-screen bg-gray-50 text-right overflow-hidden" dir="rtl">
            {/* شريط الترويسة العلوي */}
            <POSHeader
                currentPriceList={currentPriceList}
                setCurrentPriceList={setCurrentPriceList}
                priceLists={priceLists}
                selectedProfileName={selectedProfileName}
                setSelectedProfileName={setSelectedProfileName}
                profiles={profiles}
                currentOpening={currentOpening}
                handleCloseShift={handleCloseShift}
                openingLoading={openingLoading}
                setShowOpenModal={setShowOpenModal}
            />

            {/* منطقة شبكة المنتجات وسلة الشراء */}
            <div className="flex flex-1 overflow-hidden h-[calc(100vh-57px)]">
                <POSProductGrid
                    fetchInitialData={fetchInitialData}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    categories={categories}
                    loadingItems={loadingItems}
                    filteredItems={filteredItems}
                    addToCart={addToCart}
                />

                <POSCart
                    cart={cart}
                    setCart={setCart}
                    setShowCustomerModal={setShowCustomerModal}
                    selectedCustomer={selectedCustomer}
                    setSelectedCustomer={setSelectedCustomer}
                    customers={customers}
                    removeFromCart={removeFromCart}
                    updateQty={updateQty}
                    totalAmount={totalAmount}
                    submitOrder={submitOrder}
                    submittingOrder={submittingOrder}
                    currentOpening={currentOpening}
                />
            </div>

            {/* مودال فتح الوردية */}
            {showOpenModal && (
                <POSOpenShiftModal
                    selectedProfileName={selectedProfileName}
                    openingBalance={openingBalance}
                    setOpeningBalance={setOpeningBalance}
                    handleOpenShift={handleOpenShift}
                    openingLoading={openingLoading}
                    setShowOpenModal={setShowOpenModal}
                />
            )}

            {/* مودال إضافة عميل جديد */}
            {showCustomerModal && (
                <POSAddCustomerModal
                    newCustomerName={newCustomerName}
                    setNewCustomerName={setNewCustomerName}
                    newCustomerMobile={newCustomerMobile}
                    setNewCustomerMobile={setNewCustomerMobile}
                    handleAddCustomer={handleAddCustomer}
                    addingCustomer={addingCustomer}
                    setShowCustomerModal={setShowCustomerModal}
                />
            )}
        </div>
    );
}
```

### frontend/src/pages/ReasonsPage.jsx

```javascript
/**
 * ============================================================================
 * Page: ReasonsPage.jsx
 * ============================================================================
 * الوصف:
 * صفحة أسباب الإلغاء والإرجاع وتعديل الكميات وعمليات الصندوق في قسم الإدارة.
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { call } from '../lib/frappe';

export default function ReasonsPage() {
    const navigate = useNavigate();

    const [voidReasons, setVoidReasons] = useState([]);
    const [qtyReasons, setQtyReasons] = useState([]);
    const [tillReasons, setTillReasons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReasons = async () => {
            setLoading(true);
            try {
                const res = await call.get('cpro.api.management.get_reasons');
                if (res.message) {
                    setVoidReasons(res.message.voidReasons || []);
                    setQtyReasons(res.message.qtyReasons || []);
                    setTillReasons(res.message.tillReasons || []);
                }
            } catch (error) {
                console.error("خطأ في جلب الأسباب:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReasons();
    }, []);

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div
                className="flex items-center gap-2 text-gray-500 hover:text-gray-800 cursor-pointer text-sm"
                onClick={() => navigate('/management')}
            >
                <ChevronRight className="w-4 h-4" />
                <span>رجوع</span>
            </div>

            <h2 className="text-2xl font-bold text-gray-800">الأسباب</h2>

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                </div>
            ) : (
                <>
                    {/* أسباب الإلغاء والإرجاع */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 space-y-4">
                        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                            <h3 className="font-bold text-gray-700">أسباب الإلغاء والإرجاع</h3>
                            <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-md text-xs font-semibold">
                                إنشاء سبب
                            </button>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {voidReasons.map((reason, idx) => (
                                <div key={idx} className="py-3 text-left text-sm font-medium text-gray-600">
                                    {reason}
                                </div>
                            ))}
                            {voidReasons.length === 0 && <div className="py-3 text-gray-400 text-sm">لا توجد أسباب مضافة</div>}
                        </div>
                    </div>

                    {/* أسباب تعديل الكمية */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 space-y-4">
                        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                            <h3 className="font-bold text-gray-700">أسباب تعديل الكمية</h3>
                            <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-md text-xs font-semibold">
                                إنشاء سبب
                            </button>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {qtyReasons.map((reason, idx) => (
                                <div key={idx} className="py-3 text-left text-sm font-medium text-gray-600">
                                    {reason}
                                </div>
                            ))}
                            {qtyReasons.length === 0 && <div className="py-3 text-gray-400 text-sm">لا توجد أسباب مضافة</div>}
                        </div>
                    </div>

                    {/* أسباب عمليات الصندوق */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 space-y-4">
                        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                            <h3 className="font-bold text-gray-700">أسباب عمليات الصندوق</h3>
                            <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-md text-xs font-semibold">
                                إنشاء سبب
                            </button>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {tillReasons.map((reason, idx) => (
                                <div key={idx} className="py-3 text-left text-sm font-medium text-gray-600">
                                    {reason}
                                </div>
                            ))}
                            {tillReasons.length === 0 && <div className="py-3 text-gray-400 text-sm">لا توجد أسباب مضافة</div>}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
```

### frontend/src/pages/UsersManagementPage.jsx

```javascript
/**
 * ============================================================================
 * Page: UsersManagementPage.jsx
 * ============================================================================
 * الوصف:
 * صفحة إدارة المستخدمين والأدوار والفروع في CPRO.
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import { UserPlus, Shield, Mail, X, Check } from 'lucide-react';
import { call } from '../lib/frappe';

export default function UsersManagementPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [accessDenied, setAccessDenied] = useState(false);
    
    // Edit Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [allRoles, setAllRoles] = useState([]);
    const [userRoles, setUserRoles] = useState([]);
    const [savingRoles, setSavingRoles] = useState(false);
    
    // Add User Modal states
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [savingNewUser, setSavingNewUser] = useState(false);
    const [newUserForm, setNewUserForm] = useState({
        first_name: '',
        email: '',
        password: ''
    });

    const fetchUsers = async () => {
        setLoading(true);
        setAccessDenied(false);
        try {
            const res = await call.get('cpro.api.users.get_users');
            if (res.message) {
                setUsers(res.message);
            }
        } catch (error) {
            console.error("خطأ في جلب المستخدمين:", error);
            if (error.exc_type === "PermissionError" || error.message?.includes("لا تمتلك صلاحيه") || error.status === 403) {
                setAccessDenied(true);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // ----------------------------------------------------
    // Edit Roles Logic
    // ----------------------------------------------------
    const handleEditClick = async (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
        setAllRoles([]);
        setUserRoles([]);
        
        try {
            const [rolesRes, userRolesRes] = await Promise.all([
                call.get('cpro.api.users.get_roles'),
                call.get('cpro.api.users.get_user_roles', { user_email: user.email })
            ]);
            
            if (rolesRes.message) setAllRoles(rolesRes.message);
            if (userRolesRes.message) setUserRoles(userRolesRes.message);
        } catch (error) {
            console.error("خطأ في جلب الصلاحيات:", error);
        }
    };

    const toggleRole = (roleName) => {
        setUserRoles(prev => 
            prev.includes(roleName) 
                ? prev.filter(r => r !== roleName)
                : [...prev, roleName]
        );
    };

    const handleSaveRoles = async () => {
        if (!selectedUser) return;
        
        setSavingRoles(true);
        try {
            await call.post('cpro.api.users.update_user_roles', {
                user_email: selectedUser.email,
                roles: JSON.stringify(userRoles)
            });
            setIsModalOpen(false);
            fetchUsers(); // Refresh table
        } catch (error) {
            console.error("خطأ في تحديث الصلاحيات:", error);
            alert("حدث خطأ أثناء حفظ الصلاحيات");
        } finally {
            setSavingRoles(false);
        }
    };

    // ----------------------------------------------------
    // Add User Logic
    // ----------------------------------------------------
    const handleOpenAddModal = async () => {
        setNewUserForm({ first_name: '', email: '', password: '' });
        setUserRoles([]);
        setAllRoles([]);
        setIsAddModalOpen(true);
        
        try {
            const rolesRes = await call.get('cpro.api.users.get_roles');
            if (rolesRes.message) setAllRoles(rolesRes.message);
        } catch (error) {
            console.error("خطأ في جلب الصلاحيات:", error);
        }
    };

    const handleSaveNewUser = async (e) => {
        e.preventDefault();
        setSavingNewUser(true);
        try {
            await call.post('cpro.api.users.create_user', {
                email: newUserForm.email,
                first_name: newUserForm.first_name,
                password: newUserForm.password,
                roles: JSON.stringify(userRoles)
            });
            setIsAddModalOpen(false);
            fetchUsers(); // Refresh table
        } catch (error) {
            console.error("خطأ في إضافة المستخدم:", error);
            alert(error.message || "حدث خطأ أثناء إضافة المستخدم");
        } finally {
            setSavingNewUser(false);
        }
    };

    if (accessDenied) {
        return (
            <div className="flex flex-col items-center justify-center h-[70vh] space-y-4">
                <div className="bg-red-50 text-red-500 p-6 rounded-full">
                    <Shield className="w-16 h-16" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">عذراً، الوصول مقيد</h2>
                <p className="text-gray-500">أنت لا تمتلك صلاحية لفتح هذه الصفحة. هذه الصفحة مخصصة للمدير (System Manager) فقط.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-7xl mx-auto relative">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">المستخدمين</h1>
                <button 
                    onClick={handleOpenAddModal}
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                >
                    <UserPlus className="w-4 h-4" />
                    <span>إضافة مستخدم جديد</span>
                </button>
            </div>

            <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-right text-sm">
                    <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200">
                        <tr>
                            <th className="py-3 px-4">الاسم</th>
                            <th className="py-3 px-4">البريد الإلكتروني</th>
                            <th className="py-3 px-4">الدور الوظيفي</th>
                            <th className="py-3 px-4">الفرع</th>
                            <th className="py-3 px-4 text-center">التحكم</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-600">
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="py-10 text-center">
                                    <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                                </td>
                            </tr>
                        ) : users.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="py-6 text-center text-gray-500">لا يوجد مستخدمين</td>
                            </tr>
                        ) : (
                            users.map((u) => (
                                <tr key={u.id} className="hover:bg-gray-50">
                                    <td className="py-3 px-4 font-bold text-gray-800">{u.name}</td>
                                    <td className="py-3 px-4 flex items-center gap-2 text-gray-500">
                                        <Mail className="w-3.5 h-3.5" />
                                        <span>{u.email}</span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                                            <Shield className="w-3 h-3" />
                                            {u.role}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">{u.branch}</td>
                                    <td className="py-3 px-4 text-center">
                                        <button 
                                            onClick={() => handleEditClick(u)}
                                            className="text-xs text-purple-600 font-semibold hover:underline bg-purple-50 px-3 py-1 rounded-full hover:bg-purple-100 transition-colors"
                                        >
                                            تعديل
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Edit User Roles Modal */}
            {isModalOpen && selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-gray-50">
                            <h3 className="font-bold text-lg text-gray-800">تعديل صلاحيات: {selectedUser.name}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 bg-white p-1 rounded-full shadow-sm">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-5 overflow-y-auto flex-1">
                            <p className="text-sm text-gray-500 mb-4">اختر الصلاحيات (Roles) التي ترغب بإسنادها لهذا المستخدم:</p>
                            {allRoles.length === 0 ? (
                                <div className="py-8 flex justify-center">
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {allRoles.map(role => {
                                        const isSelected = userRoles.includes(role);
                                        return (
                                            <label 
                                                key={role} 
                                                className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${isSelected ? 'border-purple-600 bg-purple-50' : 'border-gray-200 hover:bg-gray-50'}`}
                                            >
                                                <span className={`font-semibold text-sm ${isSelected ? 'text-purple-700' : 'text-gray-700'}`}>
                                                    {role}
                                                </span>
                                                <div className={`w-5 h-5 rounded flex items-center justify-center border ${isSelected ? 'bg-purple-600 border-purple-600' : 'bg-white border-gray-300'}`}>
                                                    {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                                                </div>
                                                <input 
                                                    type="checkbox" 
                                                    className="hidden" 
                                                    checked={isSelected}
                                                    onChange={() => toggleRole(role)}
                                                />
                                            </label>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                        <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 text-sm font-semibold text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                إلغاء
                            </button>
                            <button 
                                onClick={handleSaveRoles}
                                disabled={savingRoles || allRoles.length === 0}
                                className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:opacity-50"
                            >
                                {savingRoles ? 'جاري الحفظ...' : 'حفظ الصلاحيات'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add User Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-gray-50">
                            <h3 className="font-bold text-lg text-gray-800">إضافة مستخدم جديد</h3>
                            <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600 bg-white p-1 rounded-full shadow-sm">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSaveNewUser} className="flex flex-col flex-1 overflow-hidden">
                            <div className="p-5 overflow-y-auto space-y-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-gray-700">الاسم الأول *</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={newUserForm.first_name}
                                        onChange={e => setNewUserForm({...newUserForm, first_name: e.target.value})}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
                                        placeholder="محمد"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-gray-700">البريد الإلكتروني *</label>
                                    <input 
                                        type="email" 
                                        required
                                        value={newUserForm.email}
                                        onChange={e => setNewUserForm({...newUserForm, email: e.target.value})}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-600 outline-none text-left"
                                        dir="ltr"
                                        placeholder="user@example.com"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-gray-700">كلمة المرور *</label>
                                    <input 
                                        type="password" 
                                        required
                                        value={newUserForm.password}
                                        onChange={e => setNewUserForm({...newUserForm, password: e.target.value})}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-600 outline-none text-left"
                                        dir="ltr"
                                        placeholder="••••••••"
                                    />
                                </div>

                                <div className="pt-4 border-t border-gray-100">
                                    <p className="text-sm font-semibold text-gray-700 mb-2">تعيين الصلاحيات (اختياري)</p>
                                    {allRoles.length === 0 ? (
                                        <p className="text-xs text-gray-500">جاري تحميل الصلاحيات...</p>
                                    ) : (
                                        <div className="grid grid-cols-2 gap-2">
                                            {allRoles.map(role => {
                                                const isSelected = userRoles.includes(role);
                                                return (
                                                    <label 
                                                        key={role} 
                                                        className={`flex items-center justify-between p-2 rounded-lg border cursor-pointer transition-colors ${isSelected ? 'border-purple-600 bg-purple-50' : 'border-gray-200 hover:bg-gray-50'}`}
                                                    >
                                                        <span className={`font-semibold text-xs ${isSelected ? 'text-purple-700' : 'text-gray-700'}`}>
                                                            {role}
                                                        </span>
                                                        <input 
                                                            type="checkbox" 
                                                            className="hidden" 
                                                            checked={isSelected}
                                                            onChange={() => toggleRole(role)}
                                                        />
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 mt-auto">
                                <button 
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="px-4 py-2 text-sm font-semibold text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    إلغاء
                                </button>
                                <button 
                                    type="submit"
                                    disabled={savingNewUser}
                                    className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:opacity-50"
                                >
                                    {savingNewUser ? 'جاري الإضافة...' : 'إضافة المستخدم'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
```

### frontend/src/portal/PortalPage.jsx

```javascript
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

```

### frontend/src/pos/CartPanel.jsx

```javascript
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
```

### frontend/src/pos/CloseShiftModal.jsx

```javascript
import { useState, useEffect, useMemo } from "react";
import { AlertTriangle, TrendingUp, TrendingDown, CheckCircle2 } from "lucide-react";
import { Modal, Spinner } from "../components/ui.jsx";
import { getShiftSummary, closeShift, errorMessage } from "../lib/api.js";
import { formatMoney } from "../lib/format.js";
import { __ } from "../lib/frappe.js";

/**
 * Close-out modal: pulls the shift's server-computed sales + expected cash per
 * payment mode, lets the cashier enter the counted amount, shows the live
 * over/short difference, then submits a Cpro POS Closing Shift.
 */
export default function CloseShiftModal({ shift, currency, onClose, onClosed }) {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [counted, setCounted] = useState({}); // { [mode]: string }
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    getShiftSummary(shift.name)
      .then((data) => {
        if (!active) return;
        setSummary(data);
        setCounted(Object.fromEntries((data.reconciliation || []).map((r) => [r.mode_of_payment, ""])));
      })
      .catch((e) => active && setError(__(errorMessage(e))))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [shift.name]);

  const rows = summary?.reconciliation || [];
  const totalDifference = useMemo(
    () => rows.reduce((s, r) => s + (Number(counted[r.mode_of_payment] || 0) - Number(r.expected_amount || 0)), 0),
    [rows, counted]
  );

  async function handleClose() {
    setError("");
    setSubmitting(true);
    try {
      const reconciliation = rows.map((r) => ({
        mode_of_payment: r.mode_of_payment,
        opening_amount: r.opening_amount,
        closing_amount: Number(counted[r.mode_of_payment] || 0),
      }));
      const result = await closeShift(shift.name, reconciliation, notes.trim());
      onClosed(result);
    } catch (e) {
      setError(__(errorMessage(e)));
      setSubmitting(false);
    }
  }

  return (
    <Modal
      open
      onClose={onClose}
      title={__("Close Shift & Reconcile")}
      maxWidth="max-w-lg"
      footer={
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {__("Cancel")}
          </button>
          <button
            onClick={handleClose}
            disabled={loading || submitting}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-brand py-2.5 text-sm font-semibold text-white hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {submitting && <Spinner className="h-4 w-4 text-white" />}
            {__("Confirm & Close Shift")}
          </button>
        </div>
      }
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2 py-10 text-gray-500">
          <Spinner className="h-5 w-5 text-brand" /> {__("Loading shift totals…")}
        </div>
      ) : (
        <div className="space-y-5">
          {/* Sales summary */}
          <div className="grid grid-cols-2 gap-3">
            <Stat label={__("Paid Invoices")} value={summary.pos_invoice_count} />
            <Stat label={__("Open Tabs")} value={summary.open_order_count} warn={summary.open_order_count > 0} />
            <Stat label={__("Items Sold")} value={Number(summary.total_quantity || 0)} />
            <Stat label={__("Grand Total")} value={formatMoney(summary.grand_total, currency)} />
          </div>

          {summary.open_order_count > 0 && (
            <div className="flex items-start gap-2 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                {__("{0} order(s) are still open (unpaid). They are not counted in the totals above. Settle or park them before closing.", [summary.open_order_count])}
              </span>
            </div>
          )}

          {/* Reconciliation */}
          <div>
            <h4 className="mb-2 text-sm font-semibold text-gray-900">{__("Cash Reconciliation")}</h4>
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    <th className="px-3 py-2 text-start">{__("Mode")}</th>
                    <th className="px-3 py-2 text-end">{__("Expected")}</th>
                    <th className="px-3 py-2 text-end">{__("Counted")}</th>
                    <th className="px-3 py-2 text-end">{__("Diff")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {rows.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-3 py-4 text-center text-gray-400">
                        {__("No takings recorded this shift.")}
                      </td>
                    </tr>
                  ) : (
                    rows.map((r) => {
                      const diff = Number(counted[r.mode_of_payment] || 0) - Number(r.expected_amount || 0);
                      return (
                        <tr key={r.mode_of_payment}>
                          <td className="px-3 py-2 font-medium text-gray-700">{r.mode_of_payment}</td>
                          <td className="px-3 py-2 text-end text-gray-500">
                            {formatMoney(r.expected_amount, currency)}
                          </td>
                          <td className="px-3 py-2 text-end">
                            <input
                              type="number"
                              inputMode="decimal"
                              min="0"
                              step="0.01"
                              value={counted[r.mode_of_payment] ?? ""}
                              onChange={(e) =>
                                setCounted((c) => ({ ...c, [r.mode_of_payment]: e.target.value }))
                              }
                              placeholder="0.00"
                              className="w-24 rounded-md border border-gray-300 px-2 py-1 text-end focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                            />
                          </td>
                          <td
                            className={`px-3 py-2 text-end font-semibold ${
                              diff === 0 ? "text-gray-400" : diff > 0 ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {formatMoney(diff, currency)}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {rows.length > 0 && (
              <div
                className={`mt-2 flex items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold ${
                  totalDifference === 0
                    ? "bg-gray-50 text-gray-600"
                    : totalDifference > 0
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-600"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  {totalDifference > 0 ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : totalDifference < 0 ? (
                    <TrendingDown className="h-4 w-4" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4" />
                  )}
                  {totalDifference === 0 ? __("Balanced") : totalDifference > 0 ? __("Over") : __("Short")}
                </span>
                <span>{formatMoney(totalDifference, currency)}</span>
              </div>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">
              {__("Closing notes")} <span className="font-normal text-gray-400">({__("optional")})</span>
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder={__("Explain any variance, hand-over notes…")}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}

function Stat({ label, value, warn }) {
  return (
    <div className={`rounded-lg border px-3 py-2 ${warn ? "border-amber-200 bg-amber-50" : "border-gray-200 bg-gray-50"}`}>
      <div className="text-[11px] font-medium uppercase tracking-wide text-gray-400">{label}</div>
      <div className={`mt-0.5 text-lg font-bold ${warn ? "text-amber-700" : "text-gray-900"}`}>{value}</div>
    </div>
  );
}

```

### frontend/src/pos/ItemCard.jsx

```javascript
import { Plus, Minus, PackageX, SlidersHorizontal } from "lucide-react";
import { useCart } from "../store/cart.js";
import { formatMoney, itemInitials, imagePath } from "../lib/format.js";
import { __ } from "../lib/frappe.js";

export default function ItemCard({ item, currency, onConfigure }) {
  const addLine = useCart((s) => s.addLine);
  // Derive from items so the card re-renders when the cart changes.
  const qtyInCart = useCart((s) =>
    s.items.reduce((n, l) => (l.item_code === item.item_code ? n + l.qty : n), 0)
  );

  const hasModifiers = (item.modifier_groups || []).length > 0;
  const available = item.available !== false;
  const img = imagePath(item.image);

  const handleClick = () => {
    if (!available) return;
    if (hasModifiers) {
      onConfigure(item);
    } else {
      addLine(item);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition text-start ${
        available ? "hover:shadow-md active:scale-95" : "opacity-60 cursor-not-allowed"
      }`}
    >
      {/* Image / initials fallback */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
        {img ? (
          <img
            src={img}
            alt={item.item_name}
            className={`h-full w-full object-cover ${available ? "" : "grayscale"}`}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-brand-light/10">
            <span className="text-3xl font-bold text-brand-light/70">
              {itemInitials(item.item_name)}
            </span>
          </div>
        )}

        {!available && (
          <div className="absolute start-2 top-2 flex items-center gap-1 rounded-full bg-gray-900/80 px-2 py-1 text-[11px] font-semibold text-white">
            <PackageX className="h-3 w-3" /> {__("Out of stock")}
          </div>
        )}
        {hasModifiers && available && (
          <div className="absolute end-2 top-2 flex items-center gap-1 rounded-full bg-brand/90 px-2 py-1 text-[11px] font-semibold text-white">
            <SlidersHorizontal className="h-3 w-3" /> {__("Options")}
          </div>
        )}
        {qtyInCart > 0 && (
          <div className="absolute bottom-2 end-2 flex h-7 min-w-7 items-center justify-center rounded-full bg-brand-dark px-2 text-sm font-bold text-white shadow">
            {qtyInCart}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-2">
        <h3 className="line-clamp-2 text-xs font-semibold text-gray-800">{item.item_name}</h3>
        <div className="mt-1 text-xs font-bold text-brand-dark">
          {formatMoney(item.rate, currency)}
        </div>
      </div>
    </button>
  );
}

```

### frontend/src/pos/MenuPanel.jsx

```javascript
import { useState, useMemo } from "react";
import { Search, UtensilsCrossed } from "lucide-react";
import ItemCard from "./ItemCard.jsx";
import { __ } from "../lib/frappe.js";

export default function MenuPanel({ menu, currency, onConfigure, menus, activeMenu, onSelectMenu }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [term, setTerm] = useState("");

  const categories = (menu.categories || []).filter(c => c.name !== "Uncategorized" && c.name !== __("Uncategorized"));
  const totalCount = (menu.items || []).length;

  const filtered = useMemo(() => {
    const q = term.trim().toLowerCase();
    return (menu.items || []).filter((it) => {
      const inCategory = activeCategory === "All" || it.category === activeCategory;
      if (!inCategory) return false;
      if (!q) return true;
      return (
        (it.item_name || "").toLowerCase().includes(q) ||
        (it.item_code || "").toLowerCase().includes(q)
      );
    });
  }, [menu.items, activeCategory, term]);

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col">
      {/* Search */}
      <div className="shrink-0 border-b border-gray-200 bg-gray-50 px-4 py-3 sm:px-6">
        <div className="relative">
          <Search className="pointer-events-none absolute start-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder={__("Search items…")}
            autoCapitalize="none"
            className="w-full rounded-lg border border-gray-300 bg-white py-2.5 ps-10 pe-3 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>

        {/* Category tabs and Price List */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 pb-1">
          <div className="scrollbar-thin flex flex-1 gap-2 overflow-x-auto">
            <CategoryChip
              label={__("All")}
              count={totalCount}
              active={activeCategory === "All"}
              onClick={() => setActiveCategory("All")}
            />
            {categories.map((c) => (
              <CategoryChip
                key={c.name}
                label={__(c.name)}
                count={c.item_count}
                active={activeCategory === c.name}
                onClick={() => setActiveCategory(c.name)}
              />
            ))}
          </div>
          {menus && menus.length > 0 && (
            <select
              value={activeMenu || ""}
              onChange={(e) => onSelectMenu(e.target.value || null)}
              className="shrink-0 rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-xs font-semibold text-gray-700 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            >
              <option value="">{__("Default Menu")}</option>
              {menus.map((m) => (
                <option key={m.name} value={m.name}>
                  {m.name}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="scrollbar-thin min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6">
        {filtered.length === 0 ? (
          <div className="flex h-[50vh] flex-col items-center justify-center gap-2 text-gray-400">
            <UtensilsCrossed className="h-10 w-10" />
            <p className="text-sm">
              {totalCount === 0 ? __("No menu items configured yet.") : __("No items match your search.")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {filtered.map((item) => (
              <ItemCard
                key={item.item_code}
                item={item}
                currency={currency}
                onConfigure={onConfigure}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CategoryChip({ label, count, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
        active
          ? "border-brand bg-brand text-white"
          : "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
      }`}
    >
      {label}
      <span
        className={`rounded-full px-1.5 text-xs ${
          active ? "bg-white/25 text-white" : "bg-gray-100 text-gray-500"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

```

### frontend/src/pos/ModifierModal.jsx

```javascript
import { useState, useEffect, useMemo } from "react";
import { Plus, Minus, AlertTriangle, Check } from "lucide-react";
import { Modal } from "../components/ui.jsx";
import { formatMoney } from "../lib/format.js";
import { __ } from "../lib/frappe.js";

// Normalize a group's selection constraints (backend already normalizes these:
// Single => max 1, required => min 1; Multiple => min<=max, 0 max = unlimited).
function constraints(group) {
  const single = group.selection_type === "Single";
  const required = !!group.is_required;
  const min = single ? (required ? 1 : 0) : Number(group.min_selection || 0);
  const max = single ? 1 : Number(group.max_selection || 0); // 0 = unlimited
  return { single, required, min, max };
}

function hint({ single, required, min, max }) {
  if (single) return required ? __("Choose 1 (required)") : __("Choose 1 (optional)");
  if (min > 0 && max > 0) return min === max ? __("Choose {0}", [max]) : __("Choose {0}–{1}", [min, max]);
  if (max > 0) return __("Choose up to {0}", [max]);
  if (min > 0) return __("Choose at least {0}", [min]);
  return __("Optional");
}

export default function ModifierModal({ open, item, modifierGroups, currency, onClose, onConfirm }) {
  const [selections, setSelections] = useState({}); // { [groupName]: string[] }
  const [qty, setQty] = useState(1);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const groups = useMemo(() => {
    if (!item) return [];
    return (item.modifier_groups || [])
      .map((name) => ({ name, config: modifierGroups[name] }))
      .filter((g) => g.config);
  }, [item, modifierGroups]);

  // Seed defaults whenever a new item opens.
  useEffect(() => {
    if (!open || !item) return;
    const seed = {};
    groups.forEach(({ name, config }) => {
      const defaults = (config.modifiers || [])
        .filter((m) => m.default_selected && m.is_available !== 0)
        .map((m) => m.modifier_name);
      const { single } = constraints(config);
      seed[name] = single ? defaults.slice(0, 1) : defaults;
    });
    setSelections(seed);
    setQty(1);
    setNotes("");
    setError("");
  }, [open, item, groups]);

  function toggle(groupName, config, modifierName) {
    setError("");
    const c = constraints(config);
    setSelections((prev) => {
      const cur = prev[groupName] || [];
      const has = cur.includes(modifierName);
      if (c.single) {
        // Radio: select this one; allow clearing only when optional.
        if (has) return { ...prev, [groupName]: c.required ? cur : [] };
        return { ...prev, [groupName]: [modifierName] };
      }
      // Multiple checkbox.
      if (has) return { ...prev, [groupName]: cur.filter((n) => n !== modifierName) };
      if (c.max > 0 && cur.length >= c.max) {
        setError(__(`You can choose up to {0} in "{1}".`, [c.max, groupName]));
        return prev;
      }
      return { ...prev, [groupName]: [...cur, modifierName] };
    });
  }

  // Flatten selected modifiers into {modifier_name, rate, item, group} objects.
  const selectedModifiers = useMemo(() => {
    const out = [];
    groups.forEach(({ name, config }) => {
      (selections[name] || []).forEach((mn) => {
        const m = (config.modifiers || []).find((x) => x.modifier_name === mn);
        if (m) out.push({ modifier_name: m.modifier_name, rate: Number(m.rate || 0), item: m.item || null, group: name });
      });
    });
    return out;
  }, [groups, selections]);

  const unitPrice =
    Number((item && item.rate) || 0) + selectedModifiers.reduce((s, m) => s + m.rate, 0);
  const lineTotal = unitPrice * qty;

  function confirm() {
    for (const { name, config } of groups) {
      const c = constraints(config);
      const count = (selections[name] || []).length;
      if (count < c.min) {
        setError(__(`Please make a selection for "{0}".`, [name]));
        return;
      }
      if (c.max > 0 && count > c.max) {
        setError(__(`Too many selected for "{0}".`, [name]));
        return;
      }
    }
    onConfirm({ modifiers: selectedModifiers, qty, notes: notes.trim() });
  }

  if (!item) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={item.item_name}
      footer={
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {__("Cancel")}
          </button>
          <button
            onClick={confirm}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-brand py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            {__("Add to order · {0}", [formatMoney(lineTotal, currency)])}
          </button>
        </div>
      }
    >
      {groups.map(({ name, config }) => {
        const c = constraints(config);
        const chosen = selections[name] || [];
        return (
          <div key={name} className="mb-5">
            <div className="mb-2 flex items-baseline justify-between">
              <h4 className="text-sm font-semibold text-gray-900">{name}</h4>
              <span className="text-xs font-medium text-gray-400">{hint(c)}</span>
            </div>
            <div className="space-y-2">
              {(config.modifiers || []).map((m) => {
                const disabled = m.is_available === 0;
                const active = chosen.includes(m.modifier_name);
                return (
                  <button
                    key={m.modifier_name}
                    disabled={disabled}
                    onClick={() => toggle(name, config, m.modifier_name)}
                    className={`flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-start text-sm transition ${
                      disabled
                        ? "cursor-not-allowed border-gray-100 bg-gray-50 text-gray-300"
                        : active
                          ? "border-brand bg-brand/5 text-gray-900"
                          : "border-gray-200 text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                          active ? "border-brand bg-brand text-white" : "border-gray-300"
                        } ${c.single ? "rounded-full" : "rounded"}`}
                      >
                        {active && <Check className="h-3.5 w-3.5" />}
                      </span>
                      {m.modifier_name}
                      {disabled && <span className="text-xs">({__("unavailable")})</span>}
                    </span>
                    {Number(m.rate || 0) > 0 && (
                      <span className="font-medium text-gray-500">
                        + {formatMoney(m.rate, currency)}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Quantity */}
      <div className="mb-5 flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-900">{__("Quantity")}</span>
        <div className="flex items-center rounded-lg border border-gray-200">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="flex h-9 w-10 items-center justify-center text-gray-600 hover:bg-gray-50"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="min-w-8 text-center text-sm font-bold">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="flex h-9 w-10 items-center justify-center text-gray-600 hover:bg-gray-50"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Critical prep note — intentionally RED (allergies / special prep) */}
      <div>
        <label className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-red-600">
          <AlertTriangle className="h-4 w-4" /> {__("Critical note")}
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          placeholder={__("e.g. No onions, peanut allergy…")}
          className="w-full rounded-lg border border-red-200 bg-red-50/40 px-3 py-2 text-sm text-red-700 placeholder-red-300 focus:border-red-400 focus:outline-none focus:ring-1 focus:ring-red-400"
        />
      </div>

      {error && (
        <div className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600">
          {error}
        </div>
      )}
    </Modal>
  );
}

```

### frontend/src/pos/OpenShiftScreen.jsx

```javascript
import { useState, useMemo, useEffect } from "react";
import { LockKeyhole, AlertTriangle, Wallet } from "lucide-react";
import Header from "../components/Header.jsx";
import { Spinner } from "../components/ui.jsx";
import { openShift, errorMessage } from "../lib/api.js";
import { formatMoney } from "../lib/format.js";
import { __ } from "../lib/frappe.js";

/**
 * Blocking screen shown when the cashier has no open shift. They pick a POS
 * profile and declare the opening cash float per payment mode; on success the
 * resolved shift is handed back so the POS can load.
 */
export default function OpenShiftScreen({ profiles = [], onOpened }) {
  const [profileName, setProfileName] = useState(profiles[0]?.name || "");
  const [floats, setFloats] = useState({}); // { [mode]: string }
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const profile = useMemo(
    () => profiles.find((p) => p.name === profileName) || null,
    [profiles, profileName]
  );
  const modes = profile?.payment_modes || [];

  // Reset the float inputs whenever the selected profile changes.
  useEffect(() => {
    setFloats(Object.fromEntries((profile?.payment_modes || []).map((m) => [m, ""])));
  }, [profile]);

  async function handleOpen() {
    setError("");
    if (!profileName) {
      setError(__("Select a POS profile to continue."));
      return;
    }
    setSubmitting(true);
    try {
      const balanceDetails = modes.map((m) => ({
        mode_of_payment: m,
        opening_amount: Number(floats[m] || 0),
      }));
      const shift = await openShift(profileName, balanceDetails);
      onOpened(shift);
    } catch (e) {
      setError(__(errorMessage(e)));
      setSubmitting(false);
    }
  }

  const noProfiles = profiles.length === 0;

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gray-50">
      <Header subtitle={__("Open Shift")} />

      <div className="flex flex-1 items-center justify-center overflow-y-auto p-4">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex flex-col items-center text-center">
            <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10">
              <LockKeyhole className="h-7 w-7 text-brand" />
            </span>
            <h1 className="text-xl font-extrabold text-gray-900">{__("Open your POS shift")}</h1>
            <p className="mt-1 text-sm text-gray-500">
              {__("Declare the starting cash in the drawer before taking any orders.")}
            </p>
          </div>

          {noProfiles ? (
            <div className="flex items-start gap-2 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-700">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                {__("No POS Profile is available to you. Ask an administrator to create one and grant you access under")} <b>{__("POS Profile → Applicable for Users")}</b>.
              </span>
            </div>
          ) : (
            <div className="space-y-5">
              {/* POS profile */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700">{__("POS Profile")}</label>
                <select
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                >
                  {profiles.map((p) => (
                    <option key={p.name} value={p.name}>
                      {p.name}
                      {p.company ? ` — ${p.company}` : ""}
                    </option>
                  ))}
                </select>
              </div>

              {/* Opening floats */}
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                  <Wallet className="h-4 w-4 text-brand" /> {__("Opening balance")}
                </label>
                <div className="space-y-2">
                  {modes.length === 0 ? (
                    <p className="rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-400">
                      {__("This profile has no payment modes configured.")}
                    </p>
                  ) : (
                    modes.map((m) => (
                      <div
                        key={m}
                        className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2"
                      >
                        <span className="text-sm font-medium text-gray-700">{m}</span>
                        <input
                          type="number"
                          inputMode="decimal"
                          min="0"
                          step="0.01"
                          value={floats[m] ?? ""}
                          onChange={(e) => setFloats((f) => ({ ...f, [m]: e.target.value }))}
                          placeholder="0.00"
                          className="w-32 rounded-lg border border-gray-300 px-3 py-1.5 text-end text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                        />
                      </div>
                    ))
                  )}
                </div>
                {profile?.currency && (
                  <p className="mt-1.5 text-end text-xs text-gray-400">
                    {__("Amounts in {0} · e.g. {1}", [profile.currency, formatMoney(0, profile.currency)])}
                  </p>
                )}
              </div>

              {error && (
                <div className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  {error}
                </div>
              )}

              <button
                onClick={handleOpen}
                disabled={submitting || modes.length === 0}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3 text-sm font-bold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {submitting && <Spinner className="h-4 w-4 text-white" />}
                {__("Open Shift & Start Selling")}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

```

### frontend/src/pos/PaymentModal.jsx

```javascript
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

```

### frontend/src/pos/PosBoard.jsx

```javascript
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

```

### frontend/src/pos/PosPage.jsx

```javascript
import { useState, useEffect, useCallback } from "react";
import { AlertTriangle, LockKeyhole, CheckCircle2 } from "lucide-react";
import Header, { StaffNav } from "../components/Header.jsx";
import { LoadingScreen } from "../components/ui.jsx";
import { ErrorBoundary } from "../components/ErrorBoundary.jsx";
import OpenShiftScreen from "./OpenShiftScreen.jsx";
import PosBoard from "./PosBoard.jsx";
import { getCurrentShift, errorMessage } from "../lib/api.js";
import { useCart } from "../store/cart.js";
import { __ } from "../lib/frappe.js";

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
    return (
      <>
        <OpenShiftScreen profiles={state.profiles} onOpened={handleOpened} />
        {closedNotice && <ClosedToast notice={closedNotice} onDismiss={() => setClosedNotice(null)} />}
      </>
    );
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
}

function ClosedToast({ notice, onDismiss }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 8000);
    return () => clearTimeout(t);
  }, [onDismiss]);
  return (
    <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-medium text-white shadow-xl">
        <CheckCircle2 className="h-5 w-5 text-green-400" />
        {__("Shift {0} closed.", [notice.name])}
      </div>
    </div>
  );
}

```

### frontend/src/pos/ReceiptModal.jsx

```javascript
import { useEffect, useRef } from "react";
import { Printer, X } from "lucide-react";
import { __ } from "../lib/frappe.js";

export default function ReceiptModal({ order, paymentResult, onClose }) {
  const printRef = useRef(null);

  const handlePrint = () => {
    const printContent = printRef.current;
    const windowPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    
    // Inject thermal receipt styles
    const dir = document.documentElement.dir || "ltr";
    windowPrint.document.write(`
      <html dir="${dir}">
        <head>
          <title>${__("Print Receipt")}</title>
          <style>
            @page { margin: 0; size: 80mm 297mm; }
            body { 
              font-family: monospace; 
              width: 80mm; 
              padding: 5mm; 
              margin: 0 auto; 
              font-size: 12px;
              color: #000;
            }
            .text-center { text-align: center; }
            .font-bold { font-weight: bold; }
            .text-xl { font-size: 16px; }
            .mb-2 { margin-bottom: 8px; }
            .mb-4 { margin-bottom: 16px; }
            .mt-4 { margin-top: 16px; }
            .flex { display: flex; justify-content: space-between; }
            .border-b { border-bottom: 1px dashed #000; padding-bottom: 4px; margin-bottom: 4px; }
            .border-t { border-top: 1px dashed #000; padding-top: 4px; margin-top: 4px; }
            * { box-sizing: border-box; }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    
    windowPrint.document.close();
    windowPrint.focus();
    setTimeout(() => {
      windowPrint.print();
      windowPrint.close();
    }, 250);
  };

  useEffect(() => {
    // Automatically prompt print on load
    handlePrint();
  }, []);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4">
      <div className="flex max-h-full w-full max-w-sm flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 p-4">
          <h2 className="font-bold text-gray-900">{__("Print Receipt")}</h2>
          <button onClick={onClose} className="rounded-full p-2 text-gray-400 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto bg-gray-100 p-6 flex justify-center">
          {/* Printable Area - We style it inline for the preview, but real print styles are injected above */}
          <div 
            ref={printRef}
            className="w-full max-w-[80mm] bg-white p-4 shadow-sm"
            style={{ fontFamily: 'monospace', fontSize: '12px', color: '#000' }}
          >
            <div className="text-center mb-4">
              <h1 className="font-bold text-xl mb-2">CPro POS</h1>
              <div>{__("Order: {0}", [paymentResult?.name || order.name])}</div>
              <div>{__("Date: {0}", [new Date().toLocaleString()])}</div>
              <div>{__("Customer: {0}", [order.customer_name || __("Guest")])}</div>
              {order.cpro_table && <div>{__("Table: {0}", [order.cpro_table])}</div>}
            </div>

            <div className="border-b" style={{ borderBottom: '1px dashed #000', marginBottom: '8px', paddingBottom: '8px' }}>
              <div className="flex" style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                <span>{__("Item")}</span>
                <span>{__("Total")}</span>
              </div>
            </div>

            {/* In a real scenario we'd loop over order.items. 
                Since OrdersPage only fetches summary, we just show the summary here. */}
            <div className="flex mb-2" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{__("Order Total")}</span>
              <span>{Number(order.grand_total).toFixed(2)}</span>
            </div>

            <div className="border-t mt-4" style={{ borderTop: '1px dashed #000', marginTop: '8px', paddingTop: '8px' }}>
              <div className="flex font-bold" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span>{__("Grand Total")}</span>
                <span>{Number(order.grand_total).toFixed(2)}</span>
              </div>
              <div className="flex" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                <span>{__("Paid Amount")}</span>
                <span>{Number(paymentResult?.paid_amount || order.grand_total).toFixed(2)}</span>
              </div>
              <div className="flex" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{__("Change")}</span>
                <span>{Number(paymentResult?.change_amount || 0).toFixed(2)}</span>
              </div>
            </div>

            <div className="text-center mt-4 pt-4 border-t" style={{ borderTop: '1px dashed #000', marginTop: '16px', paddingTop: '16px' }}>
              <div>{__("Thank you for your visit!")}</div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 p-4 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-gray-200 bg-white py-3 font-semibold text-gray-700 hover:bg-gray-50"
          >
            {__("Close")}
          </button>
          <button
            onClick={handlePrint}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-brand py-3 font-semibold text-white hover:bg-brand-dark"
          >
            <Printer className="h-5 w-5" />
            {__("Print Again")}
          </button>
        </div>
      </div>
    </div>
  );
}

```

### frontend/src/store/cart.js

```javascript
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
```

### translations/ar.csv

```
Cash,نقدي
Card,بطاقة
Transfer,حوالة
Search orders, tables, customers…,البحث عن الطلبات، الطاولات، العملاء...
Dine In,محلي
Take Away,سفري
Delivery,توصيل
Guest,ضيف
No Dine In orders,لا يوجد طلبات محلي
No Take Away orders,لا يوجد طلبات سفري
No Delivery orders,لا يوجد طلبات توصيل
Edit,تعديل
Pay,دفع
Orders,الطلبات
Loading active orders…,جارٍ تحميل الطلبات النشطة...
No active shift found. Please open a shift in the POS terminal.,لا يوجد وردية نشطة. يرجى فتح وردية في شاشة نقطة البيع.
Active Orders,الطلبات النشطة
Kitchen Display,شاشة المطبخ
All stations,جميع المحطات
Refresh,تحديث
Live,مباشر
Loading kitchen tickets…,جارٍ تحميل تذاكر المطبخ...
Retry,إعادة المحاولة
Please open a shift in the POS to view tickets.,يرجى فتح وردية في نقطة البيع لعرض التذاكر.
Start Preparing,بدء التحضير
Mark Ready,تحديد كجاهز
Bump (Served),تم التقديم
Start,بدء
Ready,جاهز
New,جديد
Preparing,قيد التحضير
Served,مقدم
No New tickets,لا يوجد تذاكر جديدة
No Preparing tickets,لا يوجد تذاكر قيد التحضير
No Ready tickets,لا يوجد تذاكر جاهزة
No Served tickets,لا يوجد تذاكر مقدمة
Active Shift: {0},وردية نشطة: {0}
Print Receipt,طباعة الفاتورة
Order: {0},الطلب: {0}
Date: {0},التاريخ: {0}
Customer: {0},العميل: {0}
Table: {0},الطاولة: {0}
Item,الصنف
Total,المجموع
Order Total,مجموع الطلب
Grand Total,المجموع الكلي
Paid Amount,المبلغ المدفوع
Change,الباقي
Thank you for your visit!,شكرا لزيارتكم!
Close,إغلاق
Print Again,طباعة مرة أخرى
Close Shift & Reconcile,إغلاق الوردية والمطابقة
Cancel,إلغاء
Confirm & Close Shift,تأكيد وإغلاق الوردية
Loading shift totals…,جارٍ تحميل إجماليات الوردية...
Paid Invoices,الفواتير المدفوعة
Open Tabs,الطلبات المفتوحة
Items Sold,العناصر المباعة
"{0} order(s) are still open (unpaid). They are not counted in the totals above. Settle or park them before closing.","{0} طلب (طلبات) لا تزال مفتوحة (غير مدفوعة). لم يتم احتسابها في الإجماليات أعلاه. قم بتسويتها أو تعليقها قبل الإغلاق."
Cash Reconciliation,مطابقة النقدية
Mode,النوع
Expected,المتوقع
Counted,المعدود
Diff,الفرق
No takings recorded this shift.,لم يتم تسجيل أي مقبوضات لهذه الوردية.
Balanced,متوازن
Over,زيادة
Short,عجز
Closing notes,ملاحظات الإغلاق
optional,اختياري
Explain any variance, hand-over notes…,اشرح أي اختلاف، ملاحظات التسليم...
Choose 1 (required),اختر 1 (مطلوب)
Choose 1 (optional),اختر 1 (اختياري)
Choose {0},اختر {0}
Choose {0}–{1},اختر {0}–{1}
Choose up to {0},اختر حتى {0}
Choose at least {0},اختر على الأقل {0}
Optional,اختياري
"You can choose up to {0} in ""{1}"".","يمكنك اختيار ما يصل إلى {0} في ""{1}""."
"Please make a selection for ""{0}"".","يرجى الاختيار لـ ""{0}""."
"Too many selected for ""{0}"".","تم اختيار الكثير لـ ""{0}""."
Add to order · {0},إضافة للطلب · {0}
unavailable,غير متوفر
Quantity,الكمية
Critical note,ملاحظة هامة
e.g. No onions, peanut allergy…,مثال: بدون بصل، حساسية فول سوداني...
Customer,العميل
Table,الطاولة
Order Type,نوع الطلب
Add Customer,إضافة عميل
Pay {0},دفع {0}
Search items…,البحث عن الأصناف...
Categories,الأقسام
All Items,جميع الأصناف
Cart is empty,السلة فارغة
Subtotal,المجموع الفرعي
Discount,الخصم
Discount %,نسبة الخصم %
Discount Amount,قيمة الخصم
Checkout,الدفع
Add Note,إضافة ملاحظة
Order Notes,ملاحظات الطلب
Done,تم
Open Shift,فتح وردية
Start Shift,بدء الوردية
Cash in hand,النقدية في الدرج
Opening notes,ملاحظات الافتتاح
"Please enter opening cash, or 0 if starting empty.","يرجى إدخال النقدية الافتتاحية، أو 0 إذا كان الدرج فارغاً."
Payment,الدفع
Amount Due,المبلغ المطلوب
Remaining,المتبقي
Submit Order,تأكيد الطلب
Notes,ملاحظات
Add Discount,إضافة خصم
Settings,الإعدادات
Menu,القائمة
POS,نقطة البيع
cpro,سي برو
CPro POS,نظام نقاط البيع
Select customer,اختر العميل
New Customer,عميل جديد
Customer Name,اسم العميل
Phone,الهاتف
Add,إضافة
Cash,كاش
Price List,قائمة الأسعار
Walk-in customer — search to apply pricing,عميل زائر - ابحث لتطبيق التسعير
Table number / name,رقم / اسم الطاولة
Current Order,الطلب الحالي
No items yet. Tap a menu item to add it.,لا توجد أصناف. اضغط على صنف لإضافته.
Net total,الصافي
Taxes (VAT / Service),الضرائب (قيمة مضافة / خدمة)
VAT / Service charges are calculated and confirmed when you save the order.,يتم احتساب وتأكيد الضرائب / رسوم الخدمة عند حفظ الطلب.
Update Order,تحديث الطلب
Save Order,حفظ الطلب
each,للحبة
Smart price: {0},السعر الذكي: {0}
Standard pricing,التسعير الافتراضي
Error adding customer: {0},خطأ في إضافة العميل: {0}
Searching…,جارٍ البحث...
No customers found.,لم يتم العثور على عملاء.
Customer Name *,اسم العميل *
Mobile Number,رقم الجوال
Add & Apply,إضافة وتطبيق
Type to search customers...,اكتب للبحث عن العملاء...
Critical note (e.g. no onions, allergy),ملاحظة هامة (مثال: بدون بصل، حساسية)
New order,طلب جديد
Default Pricing,التسعير الافتراضي
No menu items configured yet.,لم يتم تكوين أي أصناف في القائمة بعد.
No items match your search.,لا توجد أصناف تطابق بحثك.
All,الكل
Shift open,الوردية مفتوحة
Waiter requested,طلب النادل
Table {0},الطاولة {0}
Start order for this table,بدء الطلب لهذه الطاولة

```

