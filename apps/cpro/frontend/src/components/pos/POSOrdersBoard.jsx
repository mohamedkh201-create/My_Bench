import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
    CreditCard, 
    Printer, 
    RefreshCw, 
    Search, 
    CheckCircle2, 
    Clock, 
    AlertCircle, 
    Banknote, 
    User, 
    ShoppingBag,
    ChevronDown,
    ChevronUp,
    Check
} from 'lucide-react';
import { getPosBoardOrders, payOrder, getInvoicePrint } from '../../lib/api';
import { printInvoiceHtml } from '../../lib/printUtils';

/**
 * ============================================================================
 * Component: POSOrdersBoard.jsx
 * ============================================================================
 * شاشة الطلبات مقسمة بالطول (عمودين):
 * 1. الطلبات غير المدفوعة (Unpaid): إمكانية استعراض الأصناف والضغط على "دفع" لتسديد الأوردر.
 *    عند الدفع، ينتقل الأوردر تلقائياً إلى قائمة "المدفوعة" مع طباعة الفاتورة مباشرة.
 * 2. الطلبات المدفوعة (Paid): قائمة الأوردرات المسددة مع زر "طباعة الفاتورة" الديناميكي.
 * ============================================================================
 */
export default function POSOrdersBoard({ currentOpening }) {
    const [unpaidOrders, setUnpaidOrders] = useState([]);
    const [paidOrders, setPaidOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedOrder, setExpandedOrder] = useState(null);

    // حالة عملية الدفع
    const [payingInvoice, setPayingInvoice] = useState(null); // اسم الفاتورة التي يتم دفعها حالياً
    const [paymentModalOrder, setPaymentModalOrder] = useState(null); // الأوردر المحدد للدفع
    const [selectedPaymentMode, setSelectedPaymentMode] = useState('Cash'); // Cash or Card
    const [autoPrintAfterPay, setAutoPrintAfterPay] = useState(true);

    // حالة الطباعة
    const [printingInvoice, setPrintingInvoice] = useState(null);

    // جلب الطلبات من الباك إند
    const fetchOrders = useCallback(async (isSilent = false) => {
        if (!isSilent) setLoading(true);
        try {
            const shiftName = currentOpening?.name || null;
            const res = await getPosBoardOrders(shiftName);
            setUnpaidOrders(res.unpaid || []);
            setPaidOrders(res.paid || []);
        } catch (err) {
            console.error('خطأ في جلب طلبات POS:', err);
        } finally {
            if (!isSilent) setLoading(false);
        }
    }, [currentOpening]);

    // جلب أولي مع تحديث دوري كل 12 ثانية
    useEffect(() => {
        fetchOrders(false);
        const interval = setInterval(() => {
            fetchOrders(true);
        }, 12000);
        return () => clearInterval(interval);
    }, [fetchOrders]);

    // تصفية الطلبات بناءً على نص البحث
    const filterList = (list) => {
        if (!searchQuery.trim()) return list;
        const q = searchQuery.toLowerCase().trim();
        return list.filter(order => 
            (order.name && order.name.toLowerCase().includes(q)) ||
            (order.customer_name && order.customer_name.toLowerCase().includes(q)) ||
            (order.customer && order.customer.toLowerCase().includes(q))
        );
    };

    const filteredUnpaid = useMemo(() => filterList(unpaidOrders), [unpaidOrders, searchQuery]);
    const filteredPaid = useMemo(() => filterList(paidOrders), [paidOrders, searchQuery]);

    // حساب إجماليات كل عمود
    const unpaidTotalSum = useMemo(() => {
        return unpaidOrders.reduce((acc, o) => acc + (parseFloat(o.grand_total) || 0), 0);
    }, [unpaidOrders]);

    const paidTotalSum = useMemo(() => {
        return paidOrders.reduce((acc, o) => acc + (parseFloat(o.grand_total) || 0), 0);
    }, [paidOrders]);

    // تنفيذ عملية الدفع
    const handleConfirmPayment = async () => {
        if (!paymentModalOrder) return;
        const orderName = paymentModalOrder.name;
        setPayingInvoice(orderName);

        try {
            const res = await payOrder(orderName, selectedPaymentMode);
            
            // تحديث محلي فوري (Instant UI Optimistic Shift):
            // ننقل الأوردر من قائمة غير المدفوع إلى قائمة المدفوع
            const movedOrder = {
                ...paymentModalOrder,
                is_paid: true,
                docstatus: 1,
                status: 'Paid',
                payment_mode: selectedPaymentMode
            };

            setUnpaidOrders(prev => prev.filter(o => o.name !== orderName));
            setPaidOrders(prev => [movedOrder, ...prev]);
            setPaymentModalOrder(null);

            // طباعة فورية إن تم تفعيل الخيار
            if (autoPrintAfterPay) {
                if (res?.print_html) {
                    printInvoiceHtml(res.print_html);
                } else {
                    // جلب الطباعة ديناميكياً
                    handlePrint(orderName);
                }
            }
        } catch (error) {
            console.error('فشل في دفع الأوردر:', error);
            alert('حدث خطأ أثناء تسجيل الدفع: ' + (error.message || 'يرجى المحاولة مرة أخرى'));
        } finally {
            setPayingInvoice(null);
        }
    };

    // طباعة الفاتورة
    const handlePrint = async (invoiceName) => {
        setPrintingInvoice(invoiceName);
        try {
            const printHtml = await getInvoicePrint(invoiceName);
            if (printHtml) {
                printInvoiceHtml(printHtml);
            } else {
                alert('لم يتم العثور على قالب طباعة للفاتورة');
            }
        } catch (err) {
            console.error('فشل جلب الطباعة:', err);
            alert('حدث خطأ أثناء جلب قالب الطباعة: ' + (err.message || ''));
        } finally {
            setPrintingInvoice(null);
        }
    };

    const toggleExpand = (orderName) => {
        setExpandedOrder(prev => prev === orderName ? null : orderName);
    };

    return (
        <div className="flex flex-col h-full w-full bg-[#FAF5EA] text-[#16332B]" dir="rtl">
            {/* شريط الأدوات العلوي */}
            <div className="bg-[#FFFDF8] border-b border-[#E6DCC5] rounded-t-xl px-6 py-3 flex flex-wrap items-center justify-between gap-4 shadow-xs">
                {/* البحث */}
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8A7F6D]" size={18} />
                    <input
                        type="text"
                        placeholder="بحث برقم الأوردر أو اسم العميل..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-4 pr-10 py-2 bg-gray-50 border border-[#E6DCC5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>

                {/* الإحصائيات السريعة وزر التحديث */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-[#F3EBDA] border border-[#B4863B]/80 px-3 py-1.5 rounded-xl text-xs font-semibold text-[#16332B]">
                        <span className="w-2 h-2 rounded-full bg-[#B4863B] animate-pulse"></span>
                        <span>معلق: {unpaidOrders.length} طلب</span>
                        <span className="text-[#B4863B] font-mono">({unpaidTotalSum.toLocaleString('en-US', { minimumFractionDigits: 2 })} ج.م)</span>
                    </div>

                    <div className="flex items-center gap-2 bg-[#FFFDF8] border border-[#16332B]/80 px-3 py-1.5 rounded-xl text-xs font-semibold text-[#16332B]">
                        <span className="w-2 h-2 rounded-full bg-[#16332B]"></span>
                        <span>مدفوع: {paidOrders.length} طلب</span>
                        <span className="text-[#16332B] font-mono">({paidTotalSum.toLocaleString('en-US', { minimumFractionDigits: 2 })} ج.م)</span>
                    </div>

                    <button
                        type="button"
                        onClick={() => fetchOrders(false)}
                        disabled={loading}
                        className="flex items-center gap-2 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                        title="تحديث القائمة الآن"
                    >
                        <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                        <span>تحديث</span>
                    </button>
                </div>
            </div>

            {/* منطقة العمودين المقسمة بالطول */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:p-6 overflow-hidden">
                {/* العمود 1: أوردرات غير مدفوعة (Unpaid Orders) */}
                <div className="flex flex-col bg-[#FFFDF8] rounded-2xl border border-[#B4863B]/70 shadow-xs overflow-hidden">
                    {/* ترويسة العمود */}
                    <div className="px-5 py-3.5 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-b border-[#B4863B]/60 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <span className="w-3 h-3 rounded-full bg-[#B4863B] shadow-xs shadow-amber-500/50"></span>
                            <h2 className="text-base font-bold text-[#16332B]">أوردرات غير مدفوعة (معلقة)</h2>
                            <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full font-bold">
                                {filteredUnpaid.length}
                            </span>
                        </div>
                        <span className="text-xs font-medium text-[#B4863B]">تحتاج إلى تحصيل ودفع</span>
                    </div>

                    {/* قائمة الكروت */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-3.5 divide-y-0">
                        {loading && unpaidOrders.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-48 text-[#8A7F6D] gap-2">
                                <RefreshCw className="animate-spin text-amber-500" size={28} />
                                <span className="text-sm">جاري تحميل الأوردرات غير المدفوعة...</span>
                            </div>
                        ) : filteredUnpaid.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-64 text-[#8A7F6D] gap-3 border-2 border-dashed border-[#E6DCC5] rounded-xl p-6">
                                <div className="w-12 h-12 rounded-full bg-[#F3EBDA] flex items-center justify-center text-amber-500">
                                    <CheckCircle2 size={26} />
                                </div>
                                <p className="text-sm font-semibold text-[#2B2620]">لا توجد طلبات معلقة غير مدفوعة حالياً</p>
                                <p className="text-xs text-[#8A7F6D] text-center">أي أوردر جديد يتم حفظه من الكاشير يظهر هنا تلقائياً للدفع</p>
                            </div>
                        ) : (
                            filteredUnpaid.map((order) => {
                                const isExpanded = expandedOrder === order.name;
                                const isPaying = payingInvoice === order.name;

                                return (
                                    <div 
                                        key={order.name}
                                        className="bg-[#FFFDF8] rounded-xl border-2 border-[#B4863B] hover:border-[#8C6A2C] transition-all duration-200 shadow-xs hover:shadow-md overflow-hidden"
                                    >
                                        <div className="p-4">
                                            {/* الجزء العلوي للكارت: رقم الأوردر والوقت */}
                                            <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-[#E6DCC5]">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-mono font-bold bg-[#F3EBDA] text-[#16332B] px-2.5 py-1 rounded-lg border border-[#B4863B]">
                                                        {order.name}
                                                    </span>
                                                    <span className="text-[11px] text-[#8A7F6D] flex items-center gap-1 font-mono">
                                                        <Clock size={12} className="text-[#8A7F6D]" />
                                                        {order.posting_time ? order.posting_time.substring(0, 5) : ''}
                                                    </span>
                                                </div>

                                                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#B4863B] bg-[#F3EBDA] px-2 py-0.5 rounded-md">
                                                    <AlertCircle size={12} />
                                                    غير مدفوع
                                                </span>
                                            </div>

                                            {/* بيانات العميل */}
                                            <div className="py-2 flex items-center justify-between text-xs text-[#2B2620]">
                                                <div className="flex items-center gap-1.5 font-medium">
                                                    <User size={13} className="text-[#8A7F6D]" />
                                                    <span className="truncate max-w-[180px]">
                                                        {order.customer_name || order.customer || 'عميل عام'}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1 text-[#8A7F6D]">
                                                    <ShoppingBag size={13} />
                                                    <span>{order.items?.length || 0} أصناف</span>
                                                </div>
                                            </div>

                                            {/* استعراض الأصناف (Collapsible) */}
                                            {order.items && order.items.length > 0 && (
                                                <div className="mt-1">
                                                    <button
                                                        type="button"
                                                        onClick={() => toggleExpand(order.name)}
                                                        className="w-full flex items-center justify-between text-[11px] text-blue-600 hover:text-blue-800 py-1 font-semibold transition-colors"
                                                    >
                                                        <span>{isExpanded ? 'إخفاء تفاصيل الأصناف' : 'عرض الأصناف المطلوبة'}</span>
                                                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                                    </button>

                                                    {isExpanded && (
                                                        <div className="mt-2 bg-gray-50 rounded-lg p-2.5 border border-[#E6DCC5] text-xs space-y-1.5">
                                                            {order.items.map((it, idx) => (
                                                                <div key={idx} className="flex justify-between items-center text-gray-700">
                                                                    <div className="flex items-center gap-1.5 truncate">
                                                                        <span className="font-bold text-gray-900 bg-[#FFFDF8] px-1.5 py-0.5 rounded border border-[#E6DCC5] text-[11px]">
                                                                            {it.qty}×
                                                                        </span>
                                                                        <span className="truncate">{it.item_name || it.item_code}</span>
                                                                    </div>
                                                                    <span className="font-mono text-gray-800 font-semibold text-[11px]">
                                                                        {(parseFloat(it.amount) || (it.qty * it.rate)).toFixed(2)}
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {/* إجمالي المبلغ وزر الدفع */}
                                            <div className="mt-3 pt-3 border-t border-[#E6DCC5] flex items-center justify-between gap-3">
                                                <div>
                                                    <span className="text-[11px] text-[#8A7F6D] block font-medium">المبلغ المستحق:</span>
                                                    <div className="text-lg font-black text-slate-900 font-mono tracking-tight">
                                                        {parseFloat(order.grand_total || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                        <span className="text-xs font-normal text-[#8A7F6D] mr-1">ج.م</span>
                                                    </div>
                                                </div>

                                                {/* زر الدفع السحري */}
                                                <button
                                                    type="button"
                                                    disabled={isPaying}
                                                    onClick={() => setPaymentModalOrder(order)}
                                                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-bold text-xs md:text-sm shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/40 transition-all transform active:scale-95 cursor-pointer disabled:opacity-50"
                                                >
                                                    <Banknote size={18} />
                                                    <span>{isPaying ? 'جاري الدفع...' : 'دفع الآن'}</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* العمود 2: أوردرات مدفوعة (Paid Orders) */}
                <div className="flex flex-col bg-[#FFFDF8] rounded-2xl border border-[#16332B]/70 shadow-xs overflow-hidden">
                    {/* ترويسة العمود */}
                    <div className="px-5 py-3.5 bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border-b border-[#16332B]/60 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <span className="w-3 h-3 rounded-full bg-[#16332B] shadow-xs shadow-emerald-500/50"></span>
                            <h2 className="text-base font-bold text-[#16332B]">أوردرات مدفوعة ومؤكدة</h2>
                            <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full font-bold">
                                {filteredPaid.length}
                            </span>
                        </div>
                        <span className="text-xs font-medium text-[#16332B]">تم السداد وطباعة الفاتورة</span>
                    </div>

                    {/* قائمة الكروت */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-3.5 divide-y-0">
                        {loading && paidOrders.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-48 text-[#8A7F6D] gap-2">
                                <RefreshCw className="animate-spin text-emerald-500" size={28} />
                                <span className="text-sm">جاري تحميل الأوردرات المدفوعة...</span>
                            </div>
                        ) : filteredPaid.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-64 text-[#8A7F6D] gap-3 border-2 border-dashed border-[#E6DCC5] rounded-xl p-6">
                                <div className="w-12 h-12 rounded-full bg-[#FFFDF8] flex items-center justify-center text-emerald-500">
                                    <Banknote size={26} />
                                </div>
                                <p className="text-sm font-semibold text-[#2B2620]">لا توجد طلبات مدفوعة في هذه الوردية حتى الآن</p>
                                <p className="text-xs text-[#8A7F6D] text-center">الطلبات المسددة تظهر هنا مع خيار طباعة الفاتورة الرسمية</p>
                            </div>
                        ) : (
                            filteredPaid.map((order) => {
                                const isExpanded = expandedOrder === order.name;
                                const isPrinting = printingInvoice === order.name;

                                return (
                                    <div 
                                        key={order.name}
                                        className="bg-[#FFFDF8] rounded-xl border border-[#16332B] hover:border-[#1E4038] transition-all duration-200 shadow-xs hover:shadow-md overflow-hidden"
                                    >
                                        <div className="p-4">
                                            {/* الجزء العلوي للكارت: رقم الأوردر والحالة */}
                                            <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-[#E6DCC5]">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-mono font-bold bg-gray-50 text-[#16332B] px-2.5 py-1 rounded-lg border border-[#E6DCC5]">
                                                        {order.name}
                                                    </span>
                                                    <span className="text-[11px] text-[#8A7F6D] flex items-center gap-1 font-mono">
                                                        <Clock size={12} className="text-[#8A7F6D]" />
                                                        {order.posting_time ? order.posting_time.substring(0, 5) : ''}
                                                    </span>
                                                </div>

                                                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#16332B] bg-[#1E4038] text-white px-2 py-0.5 rounded-md">
                                                    <CheckCircle2 size={12} />
                                                    مدفوع بالكامل
                                                </span>
                                            </div>

                                            {/* بيانات العميل */}
                                            <div className="py-2 flex items-center justify-between text-xs text-[#2B2620]">
                                                <div className="flex items-center gap-1.5 font-medium">
                                                    <User size={13} className="text-[#8A7F6D]" />
                                                    <span className="truncate max-w-[180px]">
                                                        {order.customer_name || order.customer || 'عميل عام'}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1 text-[#8A7F6D]">
                                                    <ShoppingBag size={13} />
                                                    <span>{order.items?.length || 0} أصناف</span>
                                                </div>
                                            </div>

                                            {/* استعراض الأصناف (Collapsible) */}
                                            {order.items && order.items.length > 0 && (
                                                <div className="mt-1">
                                                    <button
                                                        type="button"
                                                        onClick={() => toggleExpand(order.name)}
                                                        className="w-full flex items-center justify-between text-[11px] text-slate-600 hover:text-[#16332B] py-1 font-semibold transition-colors"
                                                    >
                                                        <span>{isExpanded ? 'إخفاء التفاصيل' : 'عرض الأصناف'}</span>
                                                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                                    </button>

                                                    {isExpanded && (
                                                        <div className="mt-2 bg-gray-50 rounded-lg p-2.5 border border-[#E6DCC5] text-xs space-y-1.5">
                                                            {order.items.map((it, idx) => (
                                                                <div key={idx} className="flex justify-between items-center text-gray-700">
                                                                    <div className="flex items-center gap-1.5 truncate">
                                                                        <span className="font-bold text-gray-900 bg-[#FFFDF8] px-1.5 py-0.5 rounded border border-[#E6DCC5] text-[11px]">
                                                                            {it.qty}×
                                                                        </span>
                                                                        <span className="truncate">{it.item_name || it.item_code}</span>
                                                                    </div>
                                                                    <span className="font-mono text-gray-800 font-semibold text-[11px]">
                                                                        {(parseFloat(it.amount) || (it.qty * it.rate)).toFixed(2)}
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {/* إجمالي المبلغ وزر طباعة الفاتورة */}
                                            <div className="mt-3 pt-3 border-t border-[#E6DCC5] flex items-center justify-between gap-3">
                                                <div>
                                                    <span className="text-[11px] text-[#8A7F6D] block font-medium">المبلغ المدفوع:</span>
                                                    <div className="text-lg font-black text-[#16332B] font-mono tracking-tight">
                                                        {parseFloat(order.grand_total || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                        <span className="text-xs font-normal text-[#8A7F6D] mr-1">ج.م</span>
                                                    </div>
                                                </div>

                                                {/* زر طباعة الفاتورة الديناميكي */}
                                                <button
                                                    type="button"
                                                    disabled={isPrinting}
                                                    onClick={() => handlePrint(order.name)}
                                                    className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs md:text-sm shadow-sm transition-all transform active:scale-95 cursor-pointer disabled:opacity-50"
                                                    title="طباعة فاتورة POS الرسمية"
                                                >
                                                    <Printer size={16} className={isPrinting ? 'animate-bounce' : ''} />
                                                    <span>{isPrinting ? 'جاري التجهيز...' : 'طباعة الفاتورة'}</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>

            {/* مودال تأكيد الدفع السريع */}
            {paymentModalOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fade-in" dir="rtl">
                    <div className="bg-[#FFFDF8] rounded-2xl shadow-2xl border border-[#E6DCC5] w-full max-w-md overflow-hidden">
                        {/* ترويسة المودال */}
                        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <Banknote className="text-emerald-400" size={20} />
                                <h3 className="text-base font-bold">تسجيل دفع الأوردر</h3>
                            </div>
                            <span className="text-xs font-mono bg-slate-800 px-2 py-1 rounded text-slate-300">
                                {paymentModalOrder.name}
                            </span>
                        </div>

                        <div className="p-6 space-y-5">
                            {/* ملخص المبلغ والعميل */}
                            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 text-center">
                                <span className="text-xs text-[#8A7F6D] font-medium block">المبلغ الإجمالي المطلوب</span>
                                <div className="text-3xl font-black text-slate-900 font-mono mt-1">
                                    {parseFloat(paymentModalOrder.grand_total || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                    <span className="text-sm font-normal text-[#8A7F6D] mr-1.5">ج.م</span>
                                </div>
                                <div className="text-xs text-[#8A7F6D] mt-2">
                                    العميل: <span className="font-bold text-gray-800">{paymentModalOrder.customer_name || paymentModalOrder.customer || 'عميل عام'}</span>
                                </div>
                            </div>

                            {/* اختيار طريقة الدفع */}
                            <div>
                                <label className="text-xs font-bold text-gray-700 block mb-2">طريقة السداد:</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setSelectedPaymentMode('Cash')}
                                        className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 font-bold text-xs transition-all cursor-pointer ${
                                            selectedPaymentMode === 'Cash'
                                                ? 'border-emerald-600 bg-[#FFFDF8] text-emerald-800 shadow-xs'
                                                : 'border-[#E6DCC5] bg-[#FFFDF8] text-[#2B2620] hover:border-gray-300'
                                        }`}
                                    >
                                        <Banknote size={18} />
                                        <span>نقدًا (Cash)</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setSelectedPaymentMode('Card')}
                                        className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 font-bold text-xs transition-all cursor-pointer ${
                                            selectedPaymentMode === 'Card'
                                                ? 'border-blue-600 bg-[#FFFDF8] text-blue-800 shadow-xs'
                                                : 'border-[#E6DCC5] bg-[#FFFDF8] text-[#2B2620] hover:border-gray-300'
                                        }`}
                                    >
                                        <CreditCard size={18} />
                                        <span>بطاقة / فيزا (Card)</span>
                                    </button>
                                </div>
                            </div>

                            {/* خيار الطباعة التلقائية */}
                            <label className="flex items-center gap-2 cursor-pointer select-none bg-gray-50 p-3 rounded-xl border border-[#E6DCC5]">
                                <input
                                    type="checkbox"
                                    checked={autoPrintAfterPay}
                                    onChange={(e) => setAutoPrintAfterPay(e.target.checked)}
                                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer"
                                />
                                <span className="text-xs font-semibold text-gray-700">
                                    طباعة فاتورة العميل تلقائياً بمجرد إتمام الدفع
                                </span>
                            </label>

                            {/* أزرار الإجراء */}
                            <div className="flex items-center gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={handleConfirmPayment}
                                    disabled={payingInvoice !== null}
                                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer disabled:opacity-50"
                                >
                                    {payingInvoice ? (
                                        <RefreshCw size={18} className="animate-spin" />
                                    ) : (
                                        <Check size={18} />
                                    )}
                                    <span>تأكيد الدفع ونقل للقائمة المدفوعة</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setPaymentModalOrder(null)}
                                    disabled={payingInvoice !== null}
                                    className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold text-sm transition-colors cursor-pointer"
                                >
                                    إلغاء
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
