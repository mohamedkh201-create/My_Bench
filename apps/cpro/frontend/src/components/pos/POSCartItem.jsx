/**
 * ============================================================================
 * Component: POSCartItem.jsx
 * ============================================================================
 * الوصف:
 * مكون يمثل عنصراً واحداً داخل السلة.
 * يحتوي على أدوات التحكم بالكمية (+ / -) وحذف العنصر وعرض السعر الإجمالي للعنصر.
 * ============================================================================
 */

import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';

export default function POSCartItem({ item, updateQty, removeFromCart }) {
    return (
        <div className="custom-cart-item">
            <div className="cci-details">
                <div className="cci-name">{item.item_name}</div>
                <div className="cci-price">EGP {(item.rate * item.qty).toFixed(2)}</div>
            </div>
            
            <div className="cci-qty-controls">
                <button
                    onClick={() => updateQty(item.item_code, 1)}
                    className="cci-qty-btn"
                >
                    +
                </button>
                <div className="cci-qty-val">{item.qty}</div>
                <button
                    onClick={() => {
                        if (item.qty <= 1) {
                            removeFromCart(item.item_code);
                        } else {
                            updateQty(item.item_code, -1);
                        }
                    }}
                    className="cci-qty-btn"
                >
                    -
                </button>
            </div>
        </div>
    );
}
