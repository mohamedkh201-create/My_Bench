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
