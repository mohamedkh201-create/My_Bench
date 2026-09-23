// src/components/foodics/StatCard.jsx
import React from 'react';

export default function StatCard({ title, value, unit = '' }) {
    return (
        <div style={styles.card}>
            <div style={styles.title}>{title}</div>
            <div style={styles.value}>
                {value} <span style={styles.unit}>{unit}</span>
            </div>
            <div style={styles.chartPlaceholder}>
                <svg viewBox="0 0 100 30" style={{ width: '100%', height: '40px' }}>
                    <path d="M0 25 Q 25 5, 50 20 T 100 5 L 100 30 L 0 30 Z" fill="#bae6fd" opacity="0.4" />
                    <path d="M0 25 Q 25 5, 50 20 T 100 5" fill="none" stroke="#0284c7" strokeWidth="2" />
                </svg>
            </div>
        </div>
    );
}

const styles = {
    card: { backgroundColor: '#ffffff', borderRadius: '10px', padding: '16px', border: '1px solid #bae6fd', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 1px 3px rgba(56, 189, 248, 0.08)' },
    title: { fontSize: '13px', color: '#64748b', fontWeight: '500' },
    value: { fontSize: '22px', fontWeight: 'bold', color: '#0369a1', margin: '8px 0' },
    unit: { fontSize: '11px', color: '#94a3b8', fontWeight: 'normal' },
    chartPlaceholder: { marginTop: '8px' }
};