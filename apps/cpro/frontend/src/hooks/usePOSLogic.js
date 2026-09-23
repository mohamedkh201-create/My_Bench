/**
 * ============================================================================
 * Hook: usePOSLogic.js
 * ============================================================================
 * الوصف:
 * Custom Hook مخصص لإدارة حالة ومنطق نقطة البيع (POS).
 * يقوم بإدارة السلة، المنتجات، الفلترة حسب التصنيف والبحث، الورديات (فتح وإغلاق)،
 * إضافة العملاء، وحفظ الطلبات عبر اتصالات الـ API.
 * ============================================================================
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
    getMenus,
    getMenu,
    getCurrentShift,
    openShift,
    closeShift,
    searchCustomers,
    createCustomer,
    saveOrder,
    getInvoicePrint,
    getTables,
    getPosTaxRate
} from '../lib/api';
import { printInvoiceHtml } from '../lib/printUtils';

export default function usePOSLogic() {
    // --- الحالات الخاصة بالمنتجات والتصنيفات ---
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [loadingItems, setLoadingItems] = useState(false);

    // --- الحالات الخاصة بالسلة والطلب ---
    const [cart, setCart] = useState([]);
    const [submittingOrder, setSubmittingOrder] = useState(false);
    const [lastInvoice, setLastInvoice] = useState(null);
    const [printingInvoice, setPrintingInvoice] = useState(false);

    // --- الحالات الخاصة بنوع الطلب والطاولات ---
    const [orderType, setOrderType] = useState('Take Away'); // 'Take Away' | 'Delivery' | 'Dine In'
    const [tables, setTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState('');

    // --- الحالات الخاصة بالعملاء ---
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [showCustomerModal, setShowCustomerModal] = useState(false);
    const [newCustomerName, setNewCustomerName] = useState('');
    const [newCustomerMobile, setNewCustomerMobile] = useState('');
    const [addingCustomer, setAddingCustomer] = useState(false);

    // --- الحالات الخاصة بالوردية وقوائم الأسعار ---
    const [profiles, setProfiles] = useState([]);
    const [selectedProfileName, setSelectedProfileName] = useState('');
    const [priceLists, setPriceLists] = useState([]);
    const [currentPriceList, setCurrentPriceList] = useState('');
    const [currentOpening, setCurrentOpening] = useState(null);
    const [openingLoading, setOpeningLoading] = useState(false);
    const [showOpenModal, setShowOpenModal] = useState(false);
    const [openingBalance, setOpeningBalance] = useState(0);
    const [taxRate, setTaxRate] = useState(0);

    // --- جلب البيانات الأولية من السيرفر ---
    const fetchInitialData = useCallback(async () => {
        setLoadingItems(true);
        try {
            // جلب قوائم الأسعار (Cpro Menu)
            const menus = await getMenus();
            setPriceLists(menus || []);
            
            // جلب قائمة المنتجات
            const menuData = await getMenu(selectedCustomer, currentPriceList);
            const fetchedItems = menuData?.items || [];
            setItems(fetchedItems);

            // استخراج التصنيفات الفريدة
            const cats = Array.from(new Set(fetchedItems.map(i => i.item_group).filter(Boolean)));
            setCategories(cats);

            // جلب العملاء
            const custList = await searchCustomers("");
            setCustomers(custList || []);
            if (custList?.length > 0 && !selectedCustomer) {
                setSelectedCustomer(custList[0].name);
            }

            // جلب الطاولات المتاحة
            try {
                const tbls = await getTables();
                setTables(tbls || []);
                if (tbls?.length > 0) {
                    setSelectedTable(prev => prev || tbls[0].name);
                }
            } catch (tErr) {
                console.warn('تعذر جلب الطاولات:', tErr);
            }

            // جلب الوردية الحالية والبروفايلات
            const shiftData = await getCurrentShift();
            if (shiftData) {
                setCurrentOpening(shiftData.shift || null);
                setProfiles(shiftData.pos_profiles || []);
                if (shiftData.pos_profiles?.length > 0 && !selectedProfileName) {
                    setSelectedProfileName(shiftData.pos_profiles[0].name);
                }
            }
        } catch (error) {
            console.error('خطأ أثناء جلب بيانات POS:', error);
        } finally {
            setLoadingItems(false);
        }
    }, [currentPriceList, selectedCustomer, selectedProfileName]);

    useEffect(() => {
        fetchInitialData();
    }, [fetchInitialData]);

    useEffect(() => {
        if (selectedProfileName) {
            getPosTaxRate(selectedProfileName)
                .then(rate => setTaxRate(Number(rate) || 0))
                .catch(err => console.error("Error fetching tax rate:", err));
        }
    }, [selectedProfileName]);

    // --- تصفية المنتجات حسب البحث والتصنيف ---
    const filteredItems = useMemo(() => {
        return items.filter((item) => {
            const matchesCategory = selectedCategory === 'All' || item.item_group === selectedCategory;
            const q = searchQuery.toLowerCase();
            const matchesSearch = !searchQuery ||
                (item.item_name && item.item_name.toLowerCase().includes(q)) ||
                (item.item_code && item.item_code.toLowerCase().includes(q));
            return matchesCategory && matchesSearch;
        });
    }, [items, selectedCategory, searchQuery]);

    // --- حساب إجمالي السلة ---
    const subtotalAmount = useMemo(() => {
        return cart.reduce((sum, item) => sum + (item.rate * item.qty), 0);
    }, [cart]);

    const taxAmount = useMemo(() => {
        return subtotalAmount * (taxRate / 100);
    }, [subtotalAmount, taxRate]);

    const grandTotal = useMemo(() => {
        return subtotalAmount + taxAmount;
    }, [subtotalAmount, taxAmount]);

    // لضمان التوافق مع الكود القديم، سنجعل totalAmount هو grandTotal، لكننا سنصدر القيم الجديدة أيضاً
    const totalAmount = grandTotal;

    // --- العمليات الخاصة بالسلة ---
    const addToCart = (item) => {
        setCart((prevCart) => {
            const itemCode = item.item_code || item.name;
            const existingIndex = prevCart.findIndex(i => i.item_code === itemCode);
            
            if (existingIndex > -1) {
                return prevCart.map((cartItem, index) => {
                    if (index === existingIndex) {
                        return { ...cartItem, qty: cartItem.qty + 1 };
                    }
                    return cartItem;
                });
            }
            
            return [...prevCart, {
                item_code: itemCode,
                item_name: item.item_name || item.name,
                rate: item.rate || item.standard_rate || 0,
                qty: 1,
                image: item.image
            }];
        });
    };

    const updateQty = (itemCode, delta) => {
        setCart((prevCart) => {
            return prevCart.map(i => {
                if (i.item_code === itemCode) {
                    const newQty = i.qty + delta;
                    return newQty > 0 ? { ...i, qty: newQty } : null;
                }
                return i;
            }).filter(Boolean);
        });
    };

    const removeFromCart = (itemCode) => {
        setCart((prevCart) => prevCart.filter(i => i.item_code !== itemCode));
    };

    // --- إضافة عميل جديد ---
    const handleAddCustomer = async () => {
        if (!newCustomerName.trim()) {
            alert('اسم العميل مطلوب');
            return;
        }
        setAddingCustomer(true);
        try {
            const created = await createCustomer(newCustomerName, newCustomerMobile);
            if (created) {
                setCustomers(prev => [created, ...prev]);
                setSelectedCustomer(created.name);
                setShowCustomerModal(false);
                setNewCustomerName('');
                setNewCustomerMobile('');
            }
        } catch (error) {
            console.error('خطأ أثناء إنشاء العميل:', error);
            alert("فشل إنشاء العميل، يرجى المحاولة مرة أخرى.");
        } finally {
            setAddingCustomer(false);
        }
    };

    // --- تأكيد وحفظ الطلب منفصلاً ---
    const submitOrder = async () => {
        if (cart.length === 0) return;
        setSubmittingOrder(true);
        try {
            const payload = {
                pos_profile: selectedProfileName,
                customer: selectedCustomer,
                order_type: orderType,
                table: orderType === 'Dine In' ? selectedTable : '',
                print_invoice: 1, // طلب HTML الطباعة مقدماً لتكون جاهزة لزر الطباعة فوراً
                grand_total: grandTotal || totalAmount,
                items: cart.map(i => ({
                    item_code: i.item_code,
                    qty: i.qty,
                    rate: i.rate
                }))
            };

            const data = await saveOrder(payload);
            if (data?.status === 'success' || data?.name) {
                setLastInvoice({
                    name: data.name,
                    print_html: data.print_html
                });
                alert(`تم تأكيد الطلب بنجاح! رقم الفاتورة: ${data.name || 'مؤكد'}`);
                setCart([]);
            }
        } catch (error) {
            console.error('خطأ أثناء حفظ الطلب:', error);
            alert("فشل حفظ الطلب، تأكد من وجود وردية مفتوحة.");
        } finally {
            setSubmittingOrder(false);
        }
    };

    // --- طباعة الفاتورة منفصلة (لآخر فاتورة أو فاتورة محددة) ---
    const printInvoice = async (invoiceName = null) => {
        const targetInvoice = invoiceName ? { name: invoiceName } : lastInvoice;

        if (!targetInvoice?.name) {
            if (cart.length > 0) {
                alert("يرجى الضغط على 'تأكيد الأوردر' أولاً لحفظ الفاتورة ثم طباعتها.");
            } else {
                alert("لا توجد فاتورة حديثة لطباعتها. يرجى تأكيد طلب أولاً.");
            }
            return;
        }

        setPrintingInvoice(true);
        try {
            if (targetInvoice.print_html) {
                printInvoiceHtml(targetInvoice.print_html);
            } else {
                const data = await getInvoicePrint(targetInvoice.name);
                if (data?.print_html) {
                    printInvoiceHtml(data.print_html);
                } else {
                    alert("تعذر جلب قالب الطباعة للفاتورة.");
                }
            }
        } catch (error) {
            console.error("خطأ أثناء طباعة الفاتورة:", error);
            alert("حدث خطأ أثناء محاولة الطباعة.");
        } finally {
            setPrintingInvoice(false);
        }
    };

    const handleOpenShift = async () => {
        setOpeningLoading(true);
        try {
            if (!selectedProfileName) {
                alert("لم يتم تحديد بروفايل لنقطة البيع (POS Profile).");
                return;
            }
            const balanceDetails = [{ mode_of_payment: 'Cash', opening_amount: Number(openingBalance) }];
            const shiftData = await openShift(selectedProfileName, balanceDetails);
            if (shiftData) {
                setCurrentOpening(shiftData);
                setShowOpenModal(false);
            }
        } catch (error) {
            console.error('خطأ في فتح الوردية:', error);
            import('../lib/api').then(({ errorMessage }) => {
                alert("تعذر فتح الوردية: " + errorMessage(error));
            });
        } finally {
            setOpeningLoading(false);
        }
    };

    const [closedShiftSummary, setClosedShiftSummary] = useState(null);
    const [showCloseModal, setShowCloseModal] = useState(false);

    const handleCloseShift = () => {
        if (!currentOpening) return;
        setShowCloseModal(true);
    };

    const handleConfirmCloseShift = async (reconciliation, notes) => {
        setOpeningLoading(true);
        try {
            const result = await closeShift(currentOpening.name, reconciliation, notes);
            setCurrentOpening(null);
            setShowCloseModal(false);
            setClosedShiftSummary(result);
        } catch (error) {
            console.error('خطأ في إغلاق الوردية:', error);
            alert("تعذر إغلاق الوردية.");
        } finally {
            setOpeningLoading(false);
        }
    };

    return {
        // State
        filteredItems, cart, categories, selectedCategory, searchQuery,
        customers, selectedCustomer, profiles, selectedProfileName,
        priceLists, currentPriceList, currentOpening, openingLoading,
        showOpenModal, openingBalance, showCustomerModal, newCustomerName,
        newCustomerMobile, addingCustomer, loadingItems, submittingOrder, totalAmount,
        taxRate, subtotalAmount, taxAmount, grandTotal,
        lastInvoice, printingInvoice,
        closedShiftSummary, showCloseModal,

        // Setters
        setCart, setSelectedCategory, setSearchQuery, setSelectedCustomer,
        setSelectedProfileName, setCurrentPriceList, setShowOpenModal,
        setOpeningBalance, setShowCustomerModal, setNewCustomerName,
        setNewCustomerMobile, setClosedShiftSummary, setShowCloseModal,

        // Order type & tables
        orderType, setOrderType, tables, selectedTable, setSelectedTable,

        // Actions
        fetchInitialData, handleOpenShift, handleCloseShift, handleConfirmCloseShift, addToCart,
        updateQty, removeFromCart, submitOrder, printInvoice, handleAddCustomer
    };
}
