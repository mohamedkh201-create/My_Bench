/**
 * ============================================================================
 * Component: POSCart.jsx
 * ============================================================================
 * الوصف:
 * مكون سلة المبيعات الجانبية في نقطة البيع.
 * يعتمد على الأزرار المنفصلة:
 * - POSClearCartButton
 * - POSAddCustomerButton
 * - POSSubmitOrderButton
 * وعرض عناصر السلة عبر POSCartItem.
 * ============================================================================
 */

import React from 'react';
import { ShoppingCart } from 'lucide-react';
import POSCartItem from './POSCartItem';
import POSClearCartButton from './buttons/POSClearCartButton';
import POSAddCustomerButton from './buttons/POSAddCustomerButton';
import POSSubmitOrderButton from './buttons/POSSubmitOrderButton';
import POSOrderTypeSelector from './POSOrderTypeSelector';

export default function POSCart({
    cart,
    setCart,
    setShowCustomerModal,
    selectedCustomer,
    setSelectedCustomer,
    customers,
    removeFromCart,
    updateQty,
    totalAmount,
    submitOrder,
    submittingOrder,
    currentOpening,
    lastInvoice,
    printingInvoice,
    printInvoice,
    orderType,
    setOrderType,
    tables,
    selectedTable,
    setSelectedTable,
    subtotalAmount,
    taxAmount,
    taxRate,
    grandTotal
}) {
    return (
        <div className="cart-col">
            <div className="cart-top">
                <div className="cart-top-row">
                    <div className="cart-title">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                        الطلب الحالي
                    </div>
                    <div className="cart-icon-actions">
                        <div className="mini-btn" onClick={() => setShowCustomerModal(true)} title="إضافة عميل">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
                        </div>
                        <div className="mini-btn danger" onClick={() => setCart([])} title="إفراغ السلة">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                        </div>
                    </div>
                </div>
                
                <div className="customer-box relative">
                    <select
                        value={selectedCustomer}
                        onChange={(e) => setSelectedCustomer(e.target.value)}
                        className="absolute opacity-0 inset-0 w-full h-full cursor-pointer"
                    >
                        {customers.map(c => (
                            <option key={c.name} value={c.name}>
                                {c.customer_name || c.name} ({c.mobile_no || 'بدون رقم'})
                            </option>
                        ))}
                    </select>
                    <span>
                        {selectedCustomer ? (() => {
                            const c = customers.find(x => x.name === selectedCustomer);
                            return c ? `${c.customer_name || c.name} (${c.mobile_no || 'بدون رقم'})` : selectedCustomer;
                        })() : 'اختر العميل'}
                    </span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
            </div>

            <div className={`cart-body ${cart.length > 0 ? 'has-items' : ''}`}>
                {cart.length === 0 ? (
                    <>
                        <div className="empty-badge">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold-dark)" strokeWidth="1.8"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                        </div>
                        <span>السلة فارغة حالياً</span>
                    </>
                ) : (
                    cart.map((item) => (
                        <POSCartItem
                            key={item.item_code}
                            item={item}
                            updateQty={updateQty}
                            removeFromCart={removeFromCart}
                        />
                    ))
                )}
            </div>

            <POSOrderTypeSelector
                orderType={orderType}
                setOrderType={setOrderType}
                tables={tables}
                selectedTable={selectedTable}
                setSelectedTable={setSelectedTable}
            />

            <div className="cart-summary">
                <div className="sum-row"><span>عدد الأصناف</span><span>{cart.reduce((sum, item) => sum + item.qty, 0)}</span></div>
                {taxRate > 0 && (
                    <>
                        <div className="sum-row"><span>الإجمالي الفرعي</span><span>EGP {subtotalAmount?.toFixed(2) || "0.00"}</span></div>
                        <div className="sum-row"><span>الضريبة ({taxRate}%)</span><span>EGP {taxAmount?.toFixed(2) || "0.00"}</span></div>
                    </>
                )}
                <div className="sum-row total"><span>الإجمالي الكلي</span><b>EGP {grandTotal?.toFixed(2) || totalAmount?.toFixed(2) || "0.00"}</b></div>
            </div>

            <POSSubmitOrderButton
                onConfirmOrder={submitOrder}
                onPrintInvoice={printInvoice}
                disabledConfirm={cart.length === 0 || !currentOpening}
                submittingOrder={submittingOrder}
                printingInvoice={printingInvoice}
                lastInvoice={lastInvoice}
                hasItems={cart.length > 0}
            />
        </div>
    );
}
