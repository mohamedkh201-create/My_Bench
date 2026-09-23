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
