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
