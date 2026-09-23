// frontend/src/api/orders.js

// 1️⃣ جلب قائمة الطلبات / الفواتير
export async function fetchFrappeOrders() {
    try {
        const response = await fetch(
            '/api/resource/Sales Invoice?fields=["name","customer","grand_total","status","posting_date","posting_time"]&order_by=creation desc',
            {
                credentials: 'include',
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.exception || data.message || 'فشل جلب الطلبات');
        }

        return data.data || [];
    } catch (error) {
        console.error('Error fetching orders:', error);
        return [];
    }
}

// 2️⃣ جلب تفاصيل طلب محدد
export async function fetchOrderDetail(orderId) {
    try {
        const response = await fetch(
            `/api/resource/Sales Invoice/${encodeURIComponent(orderId)}`,
            {
                credentials: 'include',
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.exception || data.message || 'فشل جلب تفاصيل الطلب');
        }

        return data.data || null;
    } catch (error) {
        console.error('Error fetching order detail:', error);
        return null;
    }
}

/**
 * 3️⃣ إنشاء / تحديث طلب CPro
 *
 * مهم:
 * ممنوع استخدام frappe.client.insert هنا.
 * الـ POS الرسمي في CPro بيستخدم الـ API:
 *
 *     cpro.api.pos.save_order
 *
 * وبالتالي الـ backend هو المسؤول عن:
 * - Price List
 * - الأسعار
 * - Customer
 * - POS Profile
 * - Shift
 * - Taxes
 * - POS Invoice
 * - KOT
 */
export async function createFrappeOrder(orderPayload) {
    try {
        const response = await fetch('/api/method/cpro.api.pos.save_order', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                order: orderPayload,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.exception ||
                data.message ||
                data._server_messages ||
                'فشل إنشاء الطلب من CPro'
            );
        }

        if (data.exc_type || data.exc) {
            throw new Error(
                data.exception ||
                data.message ||
                'فشل إنشاء الطلب من CPro'
            );
        }

        return {
            success: true,
            data: data.message,
        };
    } catch (error) {
        console.error('Error creating CPro order:', error);

        return {
            success: false,
            error: error.message || 'فشل إنشاء الطلب',
        };
    }
}

// 4️⃣ جلب قوائم الأسعار / المنيوهات المُمكّنة فقط
export async function fetchFrappeMenus() {
    try {
        const response = await fetch(
            '/api/resource/Price List?fields=["name","selling","enabled"]&filters=[["selling","=",1],["enabled","=",1]]&order_by=modified desc',
            {
                credentials: 'include',
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.exception ||
                data.message ||
                'فشل جلب قوائم الأسعار'
            );
        }

        return data.data || [];
    } catch (error) {
        console.error('Error fetching menus:', error);
        return [];
    }
}

// 5️⃣ جلب الأصناف مع الأسعار حسب الـ Price List المختارة
export async function fetchFrappeProductsByMenu(priceListName) {
    try {
        if (!priceListName) {
            return [];
        }

        const encodedPriceList = encodeURIComponent(priceListName);

        const priceRes = await fetch(
            `/api/resource/Item Price?fields=["item_code","price_list_rate","price_list","selling"]&filters=[["price_list","=","${priceListName}"],["selling","=",1]]`,
            {
                credentials: 'include',
            }
        );

        const priceData = await priceRes.json();

        if (!priceRes.ok) {
            throw new Error(
                priceData.exception ||
                priceData.message ||
                'فشل جلب أسعار المنيو'
            );
        }

        const prices = priceData.data || [];

        const itemRes = await fetch(
            '/api/resource/Item?fields=["name","item_code","item_name","standard_rate","disabled","is_sales_item"]&filters=[["disabled","=",0],["is_sales_item","=",1]]',
            {
                credentials: 'include',
            }
        );

        const itemData = await itemRes.json();

        if (!itemRes.ok) {
            throw new Error(
                itemData.exception ||
                itemData.message ||
                'فشل جلب الأصناف'
            );
        }

        const items = itemData.data || [];

        const priceMap = new Map(
            prices.map((price) => [
                price.item_code,
                Number(price.price_list_rate || 0),
            ])
        );

        const products = items
            .map((item) => {
                const itemCode = item.item_code || item.name;

                return {
                    ...item,
                    standard_rate:
                        priceMap.get(itemCode) ??
                        Number(item.standard_rate || 0),
                    price_list: priceListName,
                };
            })
            .filter((item) => {
                const itemCode = item.item_code || item.name;

                // لازم يكون له سعر في الـ Price List المختارة.
                return priceMap.has(itemCode);
            });

        return products;
    } catch (error) {
        console.error('Error fetching products by menu:', error);
        return [];
    }
}