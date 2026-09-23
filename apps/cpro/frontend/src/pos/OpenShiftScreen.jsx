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
