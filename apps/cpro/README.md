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
