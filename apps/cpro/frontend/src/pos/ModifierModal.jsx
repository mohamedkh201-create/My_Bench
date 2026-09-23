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
