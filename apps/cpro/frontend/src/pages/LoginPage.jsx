/**
 * ============================================================================
 * Page: LoginPage.jsx
 * ============================================================================
 * الوصف:
 * صفحة تسجيل الدخول لنظام CPRO POS.
 * تسمح للمستخدم بإدخال بيانات الاعتماد (اسم المستخدم وكلمة السر) وتوثيق الجلسة مع Frappe.
 * ============================================================================
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth';

export default function LoginPage({ onLoginSuccess }) {
    const [usr, setUsr] = useState('Administrator');
    const [pwd, setPwd] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const result = await loginUser(usr, pwd);

        if (result.success) {
            localStorage.setItem('isLoggedIn', 'true');
            if (onLoginSuccess) onLoginSuccess();
            window.location.href = '/pos';
        } else {
            setError(result.message || 'فشل تسجيل الدخول، يرجى التأكد من البيانات');
        }
        setLoading(false);
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <span style={styles.badge}>CPro POS</span>
                    <h2 style={styles.title}>تسجيل الدخول</h2>
                    <p style={styles.subtitle}>أدخل بيانات حسابك للوصول إلى لوحة التحكم</p>
                </div>

                {error && <div style={styles.errorBox}>{error}</div>}

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>اسم المستخدم / البريد الإلكتروني</label>
                        <input
                            type="text"
                            required
                            value={usr}
                            onChange={(e) => setUsr(e.target.value)}
                            placeholder="Administrator"
                            style={styles.input}
                            disabled={loading}
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>كلمة السر</label>
                        <input
                            type="password"
                            required
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                            placeholder="••••••••"
                            style={styles.input}
                            disabled={loading}
                        />
                    </div>

                    <button type="submit" disabled={loading} style={styles.button}>
                        {loading ? 'جاري التحقق...' : 'دخول للنظام'}
                    </button>
                </form>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'var(--bg-main, #0f172a)',
        direction: 'rtl',
    },
    card: {
        backgroundColor: 'var(--bg-card, #1e293b)',
        padding: '40px',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
        border: '1px solid var(--border-color, #334155)',
    },
    header: {
        marginBottom: '24px',
        textAlign: 'center',
    },
    badge: {
        fontSize: '11px',
        fontWeight: 'bold',
        color: 'var(--primary, #3b82f6)',
        letterSpacing: '1px',
        textTransform: 'uppercase',
    },
    title: {
        margin: '8px 0 4px 0',
        color: '#f8fafc',
        fontSize: '22px',
        fontWeight: '700',
    },
    subtitle: {
        margin: 0,
        color: '#94a3b8',
        fontSize: '13px',
    },
    errorBox: {
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        border: '1px solid #ef4444',
        color: '#fca5a5',
        padding: '10px 14px',
        borderRadius: '8px',
        marginBottom: '20px',
        fontSize: '13px',
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
    },
    label: {
        fontSize: '13px',
        color: '#cbd5e1',
        fontWeight: '500',
    },
    input: {
        padding: '12px 14px',
        borderRadius: '8px',
        border: '1px solid #334155',
        backgroundColor: '#0f172a',
        color: '#fff',
        fontSize: '14px',
        outline: 'none',
    },
    button: {
        marginTop: '10px',
        padding: '12px',
        backgroundColor: 'var(--primary, #2563eb)',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontWeight: 'bold',
        fontSize: '14px',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    },
};