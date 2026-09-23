// src/api/auth.js

import { frappe } from '../lib/frappe';

/**
 * تسجيل الدخول عبر Frappe Session API باستخدام frappe-js-sdk
 */
export async function loginUser(usr, pwd) {
    try {
        // frappe-js-sdk handles login, cookie mapping, and fetches the CSRF token internally
        const auth = frappe.auth();
        const res = await auth.loginWithUsernamePassword({ username: usr, password: pwd });
        
        if (res.message === 'Logged In') {
            return { success: true, user: res.full_name || usr };
        } else {
            return {
                success: false,
                message: res.message || 'بيانات الدخول غير صحيحة، يرجى التأكد وإعادة المحاولة.'
            };
        }
    } catch (error) {
        console.error('Login API Error:', error);
        return {
            success: false,
            message: 'تعذر الاتصال بالسيرفر أو بيانات الدخول غير صحيحة.'
        };
    }
}

/**
 * تسجيل الخروج وإنهاء الجلسة
 */
export async function logoutUser() {
    try {
        const auth = frappe.auth();
        await auth.logout();
    } catch (error) {
        console.error('Logout Error:', error);
    } finally {
        localStorage.removeItem('isLoggedIn');
    }
}