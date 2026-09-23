import React, { useState, useEffect, useMemo } from "react";
import { AlertTriangle, TrendingUp, TrendingDown, CheckCircle2 } from "lucide-react";
import { Modal, Spinner } from "../ui.jsx";
import { getShiftSummary, errorMessage } from "../../lib/api.js";
import { formatMoney } from "../../lib/format.js";

export default function POSCloseShiftModal({ shift, onClose, onConfirm }) {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [counted, setCounted] = useState({});
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
      .catch((e) => active && setError(errorMessage(e)))
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
      await onConfirm(reconciliation, notes.trim());
    } catch (e) {
      setError(errorMessage(e));
      setSubmitting(false);
    }
  }

  return (
    <Modal
      open
      onClose={onClose}
      title="إغلاق وتسوية الوردية"
      maxWidth="max-w-lg"
      footer={
        <div className="flex items-center gap-3 w-full" dir="rtl">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            إلغاء
          </button>
          <button
            onClick={handleClose}
            disabled={loading || submitting}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#1E4038] py-2.5 text-sm font-semibold text-white hover:bg-[#152e28] disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {submitting && <Spinner className="h-4 w-4 text-white" />}
            تأكيد وإغلاق الوردية
          </button>
        </div>
      }
    >
      <div dir="rtl">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-10 text-gray-500">
            <Spinner className="h-5 w-5 text-[#1E4038]" /> جاري تحميل بيانات الوردية...
          </div>
        ) : (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-3">
              <Stat label="الفواتير المدفوعة" value={summary.pos_invoice_count} />
              <Stat label="الطلبات المفتوحة" value={summary.open_order_count} warn={summary.open_order_count > 0} />
              <Stat label="العناصر المباعة" value={Number(summary.total_quantity || 0)} />
              <Stat label="الإجمالي" value={formatMoney(summary.grand_total)} />
            </div>

            {summary.open_order_count > 0 && (
              <div className="flex items-start gap-2 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  يوجد {summary.open_order_count} طلب(ات) غير مدفوعة ومفتوحة. لا يتم احتسابها في المبالغ أعلاه. يجب إغلاقها أو تسويتها أولاً.
                </span>
              </div>
            )}

            <div>
              <h4 className="mb-2 text-sm font-semibold text-gray-900">تسوية النقدية</h4>
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      <th className="px-3 py-2 text-start">طريقة الدفع</th>
                      <th className="px-3 py-2 text-end">المتوقع</th>
                      <th className="px-3 py-2 text-end">الفعلي (تم عده)</th>
                      <th className="px-3 py-2 text-end">الفرق</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {rows.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-3 py-4 text-center text-gray-400">
                          لا يوجد مبالغ مسجلة لهذه الوردية.
                        </td>
                      </tr>
                    ) : (
                      rows.map((r) => {
                        const diff = Number(counted[r.mode_of_payment] || 0) - Number(r.expected_amount || 0);
                        return (
                          <tr key={r.mode_of_payment}>
                            <td className="px-3 py-2 font-medium text-gray-700 text-start">{r.mode_of_payment}</td>
                            <td className="px-3 py-2 text-end text-gray-500">
                              {formatMoney(r.expected_amount)}
                            </td>
                            <td className="px-3 py-2 text-end flex justify-end">
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
                                className="w-24 rounded-md border border-gray-300 px-2 py-1 text-end focus:border-[#1E4038] focus:outline-none focus:ring-1 focus:ring-[#1E4038]"
                              />
                            </td>
                            <td
                              className={`px-3 py-2 text-end font-semibold ${
                                diff === 0 ? "text-gray-400" : diff > 0 ? "text-green-600" : "text-red-600"
                              }`}
                            >
                              {formatMoney(diff)}
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
                    {totalDifference === 0 ? "متطابق" : totalDifference > 0 ? "زيادة" : "عجز"}
                  </span>
                  <span>{formatMoney(totalDifference)}</span>
                </div>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-gray-700 text-start">
                ملاحظات الإغلاق <span className="font-normal text-gray-400">(اختياري)</span>
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="وضح أسباب العجز أو الزيادة..."
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#1E4038] focus:outline-none focus:ring-1 focus:ring-[#1E4038]"
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
      </div>
    </Modal>
  );
}

function Stat({ label, value, warn }) {
  return (
    <div className={`rounded-lg border px-3 py-2 text-center ${warn ? "border-amber-200 bg-amber-50" : "border-gray-200 bg-gray-50"}`}>
      <div className="text-[11px] font-medium uppercase tracking-wide text-gray-400">{label}</div>
      <div className={`mt-0.5 text-lg font-bold ${warn ? "text-amber-700" : "text-gray-900"}`}>{value}</div>
    </div>
  );
}
