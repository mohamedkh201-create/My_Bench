/**
 * ============================================================================
 * Component: POSCategoryTabs.jsx
 * ============================================================================
 * الوصف:
 * مكون شريط تبويبات التصنيفات الأفقية في نقطة البيع.
 * يسمح للمستخدم بالتنقل بين التصنيفات المتاحة لتصفية قائمة المنتجات المعروضة.
 * ============================================================================
 */

import React from 'react';

export default function POSCategoryTabs({ categories = [], selectedCategory = 'All', setSelectedCategory }) {
    return (
        <div className="cat-tabs">
            <div
                onClick={() => setSelectedCategory('All')}
                className={`cat-tab ${selectedCategory === 'All' ? 'active' : ''}`}
            >
                الكل
            </div>
            {categories.map((cat) => (
                <div
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`cat-tab ${selectedCategory === cat ? 'active' : ''}`}
                >
                    {cat}
                </div>
            ))}
        </div>
    );
}
