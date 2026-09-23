/**
 * ============================================================================
 * Component: POSItemCard.jsx
 * ============================================================================
 * الوصف:
 * مكون كرت المنتج المكتفي بذاته في شبكة نقطة البيع.
 * يعرض صورة المنتج، الاسم، والسعر، وعند الضغط عليه يضيف المنتج إلى السلة.
 * ============================================================================
 */

import React from 'react';

export default function POSItemCard({ item, addToCart }) {
    const itemName = item.item_name || item.name || '';
    const rate = item.rate || item.standard_rate || 0;

    return (
        <div className="p-card" onClick={() => addToCart(item)}>
            <div className="p-thumb">
                {item.image ? (
                    <img src={item.image} alt={itemName} />
                ) : (
                    itemName.slice(0, 2)
                )}
            </div>
            <div className="p-info">
                <div className="p-name">{itemName}</div>
                <div className="p-leader">
                    <span className="dots"></span>
                    <span className="p-price">EGP {rate}</span>
                </div>
            </div>
        </div>
    );
}
