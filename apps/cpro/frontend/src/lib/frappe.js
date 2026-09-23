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
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login';
                }
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
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login';
                }
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
