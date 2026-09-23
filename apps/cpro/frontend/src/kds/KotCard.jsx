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