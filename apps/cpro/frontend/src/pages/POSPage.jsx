/**
 * ============================================================================
 * Page: POSPage.jsx
 * ============================================================================
 * الوصف:
 * الصفحة الرئيسية لنقطة البيع (POS).
 * تلتزم بمبادئ الكود النظيف (Clean Code) عن طريق استدعاء المكونات الصغيرة
 * والمنفصلة (Header, ProductGrid, Cart, Modals) واستخدام usePOSLogic للتحكم بالحالة.
 * ============================================================================
 */

import React, { useState } from 'react';
import { CheckCircle2, TrendingUp, TrendingDown } from 'lucide-react';
import { Modal } from '../components/ui';
import { formatMoney } from '../lib/format';
import POSHeader from '../components/pos/POSHeader';
import POSProductGrid from '../components/pos/POSProductGrid';
import POSCart from '../components/pos/POSCart';
import POSOrdersBoard from '../components/pos/POSOrdersBoard';
import POSKitchenBoard from '../components/pos/POSKitchenBoard';
import POSOpenShiftModal from '../components/pos/POSOpenShiftModal';
import POSCloseShiftModal from '../components/pos/POSCloseShiftModal';
import POSAddCustomerModal from '../components/pos/POSAddCustomerModal';
import usePOSLogic from '../hooks/usePOSLogic';

export default function POSPage() {
    const [activeTab, setActiveTab] = useState('pos'); // 'pos' | 'orders' | 'kitchen'

    const {
        // State
        filteredItems, cart, categories, selectedCategory, searchQuery,
        customers, selectedCustomer, profiles, selectedProfileName,
        priceLists, currentPriceList, currentOpening, openingLoading,
        showOpenModal, openingBalance, showCustomerModal, newCustomerName,
        newCustomerMobile, addingCustomer, loadingItems, submittingOrder, totalAmount,
        taxRate, subtotalAmount, taxAmount, grandTotal,
        lastInvoice, printingInvoice,
        orderType, setOrderType, tables, selectedTable, setSelectedTable,
        closedShiftSummary, showCloseModal,

        // Setters
        setCart, setSelectedCategory, setSearchQuery, setSelectedCustomer,
        setSelectedProfileName, setCurrentPriceList, setShowOpenModal,
        setOpeningBalance, setShowCustomerModal, setNewCustomerName,
        setNewCustomerMobile, setClosedShiftSummary, setShowCloseModal,

        // Actions
        fetchInitialData, handleOpenShift, handleCloseShift, handleConfirmCloseShift, addToCart,
        updateQty, removeFromCart, submitOrder, printInvoice, handleAddCustomer
    } = usePOSLogic();

    return (
        <>
            {/* شريط الترويسة العلوي */}
            <POSHeader
                currentPriceList={currentPriceList}
                setCurrentPriceList={setCurrentPriceList}
                priceLists={priceLists}
                selectedProfileName={selectedProfileName}
                setSelectedProfileName={setSelectedProfileName}
                profiles={profiles}
                currentOpening={currentOpening}
                handleCloseShift={handleCloseShift}
                openingLoading={openingLoading}
                setShowOpenModal={setShowOpenModal}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            {/* عرض الشاشة المحددة: POS أو Orders أو Kitchen */}
            {activeTab === 'pos' && (
                <div className="body">
                    <POSProductGrid
                        fetchInitialData={fetchInitialData}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        categories={categories}
                        loadingItems={loadingItems}
                        filteredItems={filteredItems}
                        addToCart={addToCart}
                    />

                    <POSCart
                        cart={cart}
                        setCart={setCart}
                        setShowCustomerModal={setShowCustomerModal}
                        selectedCustomer={selectedCustomer}
                        setSelectedCustomer={setSelectedCustomer}
                        customers={customers}
                        removeFromCart={removeFromCart}
                        updateQty={updateQty}
                        totalAmount={totalAmount}
                        subtotalAmount={subtotalAmount}
                        taxAmount={taxAmount}
                        taxRate={taxRate}
                        grandTotal={grandTotal}
                        submitOrder={submitOrder}
                        submittingOrder={submittingOrder}
                        currentOpening={currentOpening}
                        lastInvoice={lastInvoice}
                        printingInvoice={printingInvoice}
                        printInvoice={printInvoice}
                        orderType={orderType}
                        setOrderType={setOrderType}
                        tables={tables}
                        selectedTable={selectedTable}
                        setSelectedTable={setSelectedTable}
                    />
                </div>
            )}

            {activeTab === 'orders' && (
                <div className="body">
                    <POSOrdersBoard currentOpening={currentOpening} />
                </div>
            )}

            {activeTab === 'kitchen' && (
                <div className="body">
                    <POSKitchenBoard currentOpening={currentOpening} />
                </div>
            )}

            {/* مودال فتح الوردية */}
            {showOpenModal && (
                <POSOpenShiftModal
                    selectedProfileName={selectedProfileName}
                    openingBalance={openingBalance}
                    setOpeningBalance={setOpeningBalance}
                    handleOpenShift={handleOpenShift}
                    openingLoading={openingLoading}
                    setShowOpenModal={setShowOpenModal}
                />
            )}

            {/* مودال إغلاق الوردية الفعلي (إدخال المبالغ) */}
            {showCloseModal && currentOpening && (
                <POSCloseShiftModal
                    shift={currentOpening}
                    onClose={() => setShowCloseModal(false)}
                    onConfirm={handleConfirmCloseShift}
                />
            )}

            {/* مودال إضافة عميل جديد */}
            {showCustomerModal && (
                <POSAddCustomerModal
                    newCustomerName={newCustomerName}
                    setNewCustomerName={setNewCustomerName}
                    newCustomerMobile={newCustomerMobile}
                    setNewCustomerMobile={setNewCustomerMobile}
                    handleAddCustomer={handleAddCustomer}
                    addingCustomer={addingCustomer}
                    setShowCustomerModal={setShowCustomerModal}
                />
            )}

            {/* مودال ملخص إغلاق الوردية */}
            {closedShiftSummary && (
                <Modal
                  open={!!closedShiftSummary}
                  onClose={() => setClosedShiftSummary(null)}
                  title="ملخص الوردية - تم الإغلاق بنجاح"
                  maxWidth="max-w-md"
                  footer={
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setClosedShiftSummary(null)}
                        className="flex-1 rounded-lg bg-[#1E4038] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#152e28]"
                      >
                        تم / إغلاق
                      </button>
                    </div>
                  }
                >
                  <div className="space-y-4">
                    <div className="flex flex-col items-center justify-center gap-2 py-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">الوردية: {closedShiftSummary.name}</h3>
                      <p className="text-sm text-gray-500">تم إغلاق وتسوية الوردية بنجاح.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-center">
                        <div className="text-[11px] font-medium uppercase tracking-wide text-gray-400">الصافي</div>
                        <div className="mt-0.5 text-lg font-bold text-gray-900">{formatMoney(closedShiftSummary.net_total)}</div>
                      </div>
                      <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-center">
                        <div className="text-[11px] font-medium uppercase tracking-wide text-gray-400">الإجمالي</div>
                        <div className="mt-0.5 text-lg font-bold text-gray-900">{formatMoney(closedShiftSummary.grand_total)}</div>
                      </div>
                    </div>

                    {closedShiftSummary.payments && closedShiftSummary.payments.length > 0 && (
                      <div dir="rtl">
                        <h4 className="mb-2 text-sm font-semibold text-gray-900">تفاصيل الدفع</h4>
                        <div className="overflow-hidden rounded-lg border border-gray-200">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                <th className="px-3 py-2 text-start">طريقة الدفع</th>
                                <th className="px-3 py-2 text-end">المتوقع</th>
                                <th className="px-3 py-2 text-end">تم استلامه</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                              {closedShiftSummary.payments.map((p) => (
                                <tr key={p.mode_of_payment}>
                                  <td className="px-3 py-2 font-medium text-gray-700 text-start">{p.mode_of_payment}</td>
                                  <td className="px-3 py-2 text-end text-gray-500">{formatMoney(p.expected_amount)}</td>
                                  <td className="px-3 py-2 text-end font-semibold text-gray-900">{formatMoney(p.closing_amount)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    <div
                      dir="rtl"
                      className={`flex items-center justify-between rounded-lg px-3 py-3 text-sm font-semibold ${
                        (closedShiftSummary.difference_total || 0) === 0
                          ? "bg-gray-50 text-gray-600"
                          : (closedShiftSummary.difference_total || 0) > 0
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-600"
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        {(closedShiftSummary.difference_total || 0) > 0 ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (closedShiftSummary.difference_total || 0) < 0 ? (
                          <TrendingDown className="h-4 w-4" />
                        ) : (
                          <CheckCircle2 className="h-4 w-4" />
                        )}
                        {(closedShiftSummary.difference_total || 0) === 0 ? "متطابق" : (closedShiftSummary.difference_total || 0) > 0 ? "زيادة" : "عجز"}
                      </span>
                      <span>{formatMoney(closedShiftSummary.difference_total || 0)}</span>
                    </div>
                  </div>
                </Modal>
            )}
        </>
    );
}