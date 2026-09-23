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
