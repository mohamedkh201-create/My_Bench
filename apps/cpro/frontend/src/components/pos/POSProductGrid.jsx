/**
 * ============================================================================
 * Component: POSProductGrid.jsx
 * ============================================================================
 * الوصف:
 * مكون شبكة المنتجات في نقطة البيع.
 * يشمل حقل البحث، زر التحديث المنفصل (POSRefreshButton)، شريط التصنيفات (POSCategoryTabs)،
 * وعرض كروت المنتجات (POSItemCard).
 * ============================================================================
 */

import React from 'react';
import { Search, RefreshCw, AlertTriangle } from 'lucide-react';
import POSCategoryTabs from './POSCategoryTabs';
import POSItemCard from './POSItemCard';
import POSRefreshButton from './buttons/POSRefreshButton';

export default function POSProductGrid({
    fetchInitialData,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    categories,
    loadingItems,
    filteredItems,
    addToCart
}) {
    return (
        <div className="products-col">
            <div className="section-eyebrow flex justify-between items-center">
                <span>قائمة اليوم</span>
                <POSRefreshButton onClick={fetchInitialData} />
            </div>

            {/* تبويبات التصنيفات */}
            <POSCategoryTabs
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />

            {/* شبكة عرض المنتجات */}
            <div className="flex-1 overflow-y-auto">
                {loadingItems ? (
                    <div className="flex justify-center items-center h-64 text-gray-400">
                        <RefreshCw className="animate-spin ml-2" size={24} />
                        <span>جاري تحميل المنتجات والأسعار...</span>
                    </div>
                ) : filteredItems.length === 0 ? (
                    <div className="text-center text-gray-400 py-20">
                        <AlertTriangle className="mx-auto mb-2 opacity-30" size={48} />
                        <p>لا توجد منتجات مطابقة للبحث</p>
                    </div>
                ) : (
                    <div className="product-grid">
                        {filteredItems.map((item) => (
                            <POSItemCard
                                key={item.item_code || item.name}
                                item={item}
                                addToCart={addToCart}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
