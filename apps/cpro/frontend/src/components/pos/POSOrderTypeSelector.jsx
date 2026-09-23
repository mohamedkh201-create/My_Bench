import React from 'react';
import { ShoppingBag, Bike, UtensilsCrossed, Armchair } from 'lucide-react';

/**
 * ============================================================================
 * Component: POSOrderTypeSelector.jsx
 * ============================================================================
 * أزرار اختيار نوع الأوردر (تيك أواي / ديليفري / صالة)
 * مع قائمة منسدلة ديناميكية لاختيار الطاولة في حالة الصالة (Dine In).
 * ============================================================================
 */
export default function POSOrderTypeSelector({
    orderType = 'Take Away',
    setOrderType,
    tables = [],
    selectedTable,
    setSelectedTable
}) {
    const types = [
        {
            id: 'Take Away',
            label: 'تيك أواي',
            subLabel: 'Takeaway',
            icon: ShoppingBag
        },
        {
            id: 'Delivery',
            label: 'ديليفري',
            subLabel: 'Delivery',
            icon: Bike
        },
        {
            id: 'Dine In',
            label: 'صالة',
            subLabel: 'Dine In',
            icon: UtensilsCrossed
        }
    ];

    return (
        <div className="order-type-block">
            <div className="order-type-label">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
                نوع الطلب: {orderType === 'Take Away' ? 'تيك أواي' : (orderType === 'Delivery' ? 'ديليفري' : 'صالة')}
            </div>
            <div className="order-type-grid">
                <div className={`ot-btn ${orderType === 'Dine In' ? 'active' : ''}`} onClick={() => setOrderType('Dine In')}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 2v7c0 1.1.9 2 2 2h1a2 2 0 0 0 2-2V2"/><path d="M6 11v11"/><path d="M18 2c-2.5 0-4 2-4 6 0 3 1.5 4 3 4v9"/></svg>
                    صالة
                </div>
                <div className={`ot-btn ${orderType === 'Delivery' ? 'active' : ''}`} onClick={() => setOrderType('Delivery')}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6a1 1 0 0 0 1 1h3l2 5"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/></svg>
                    ديليفري
                </div>
                <div className={`ot-btn ${orderType === 'Take Away' ? 'active' : ''}`} onClick={() => setOrderType('Take Away')}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                    تيك أواي
                </div>
            </div>

            {/* القائمة المنسدلة للطاولات في حال اختيار Dine In */}
            {orderType === 'Dine In' && (
                <div className="mt-3 p-2.5 bg-gray-50 border border-gray-200 rounded-xl space-y-1.5">
                    <label className="flex items-center gap-1.5 text-xs font-bold text-gray-700">
                        <Armchair size={15} />
                        <span>اختر الطاولة (Table):</span>
                    </label>

                    <select
                        value={selectedTable}
                        onChange={(e) => setSelectedTable(e.target.value)}
                        className="w-full text-xs font-bold border border-gray-300 rounded-lg p-2 bg-white text-gray-800 focus:outline-none focus:border-gray-400 cursor-pointer"
                    >
                        {tables.length > 0 ? (
                            tables.map((tbl) => (
                                <option key={tbl.name} value={tbl.name}>
                                    {tbl.table_number ? `طاولة رقم ${tbl.table_number}` : tbl.name} 
                                    {tbl.room ? ` (${tbl.room})` : ''} 
                                    {tbl.seating_capacity ? ` - ${tbl.seating_capacity} كراسي` : ''}
                                </option>
                            ))
                        ) : (
                            <>
                                <option value="طاولة 1">طاولة 1 (الصالة الرئيسية)</option>
                                <option value="طاولة 2">طاولة 2 (الصالة الرئيسية)</option>
                                <option value="طاولة 3">طاولة 3 (الصالة الرئيسية)</option>
                            </>
                        )}
                    </select>
                </div>
            )}
        </div>
    );
}
