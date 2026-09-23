import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
    ChefHat, 
    Flame, 
    CheckCircle2, 
    Clock, 
    RefreshCw, 
    ArrowLeft, 
    ArrowRight, 
    Utensils, 
    Filter,
    User,
    AlertCircle
} from 'lucide-react';
import { getKitchenBoardTickets, setKotStatus, getKitchenStations } from '../../lib/api';

/**
 * ============================================================================
 * Component: POSKitchenBoard.jsx
 * ============================================================================
 * شاشة متابعة المطبخ مقسمة بالطول إلى 3 أعمدة رئيسية:
 * 1. اتأكد (Confirmed / New): الطلبات المؤكدة حديثاً من الكاشير وفي انتظار البدء.
 * 2. في المطبخ (In Kitchen / Preparing): الطلبات قيد الطهي والتحضير بالمطبخ.
 * 3. تم التقديم (Served): الطلبات التي انتهت وتم تقديمها وتسليمها للعميل.
 * ============================================================================
 */
export default function POSKitchenBoard({ currentOpening }) {
    const [tickets, setTickets] = useState({ confirmed: [], in_kitchen: [], served: [] });
    const [loading, setLoading] = useState(true);
    const [updatingTicket, setUpdatingTicket] = useState(null);
    const [stations, setStations] = useState([]);
    const [selectedStation, setSelectedStation] = useState('');

    // جلب محطات المطبخ المتاحة (للتصفية إن وجدت)
    useEffect(() => {
        const fetchStations = async () => {
            try {
                const list = await getKitchenStations();
                setStations(list || []);
            } catch (e) {
                console.error('Error fetching kitchen stations:', e);
            }
        };
        fetchStations();
    }, []);

    // جلب التذاكر من الباك إند
    const fetchTickets = useCallback(async (isSilent = false) => {
        if (!isSilent) setLoading(true);
        try {
            const shiftName = currentOpening?.name || null;
            const res = await getKitchenBoardTickets(selectedStation || null, shiftName);
            setTickets({
                confirmed: res.confirmed || [],
                in_kitchen: res.in_kitchen || [],
                served: res.served || []
            });
        } catch (err) {
            console.error('خطأ في جلب تذاكر المطبخ:', err);
        } finally {
            if (!isSilent) setLoading(false);
        }
    }, [selectedStation, currentOpening]);

    // جلب أولي مع تحديث دوري كل 8 ثواني
    useEffect(() => {
        fetchTickets(false);
        const interval = setInterval(() => {
            fetchTickets(true);
        }, 8000);
        return () => clearInterval(interval);
    }, [fetchTickets]);

    // تغيير حالة التذكرة
    const handleMoveStatus = async (ticketName, newStatus) => {
        setUpdatingTicket(ticketName);
        try {
            await setKotStatus(ticketName, newStatus);
            // إعادة جلب فوري
            await fetchTickets(true);
        } catch (error) {
            console.error('فشل تحديث حالة التذكرة:', error);
            alert('تعذر تحديث حالة التذكرة: ' + (error.message || ''));
        } finally {
            setUpdatingTicket(null);
        }
    };

    // حساب الوقت المنقضي
    const formatElapsedMinutes = (creationTime) => {
        if (!creationTime) return 'الآن';
        try {
            const created = new Date(creationTime.replace(' ', 'T'));
            const now = new Date();
            const diffMs = now - created;
            const diffMins = Math.max(0, Math.floor(diffMs / 60000));
            if (diffMins === 0) return 'الآن';
            if (diffMins < 60) return `${diffMins} د`;
            const diffHours = Math.floor(diffMins / 60);
            return `${diffHours} س ${diffMins % 60} د`;
        } catch (e) {
            return '';
        }
    };

    const getElapsedBadgeColor = (creationTime) => {
        if (!creationTime) return 'bg-gray-100 text-gray-700';
        try {
            const created = new Date(creationTime.replace(' ', 'T'));
            const diffMins = Math.floor((new Date() - created) / 60000);
            if (diffMins < 10) return 'bg-[#FFFDF8] text-[#16332B] border-[#16332B]';
            if (diffMins < 20) return 'bg-[#F3EBDA] text-[#B4863B] border-[#B4863B]';
            return 'bg-red-50 text-red-700 border-red-200 animate-pulse';
        } catch (e) {
            return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="flex flex-col h-full w-full bg-[#FAF5EA] text-[#16332B]" dir="rtl">
            {/* شريط الأدوات العلوي */}
            <div className="bg-[#FFFDF8] border-b border-[#E6DCC5] rounded-t-xl px-6 py-3 flex flex-wrap items-center justify-between gap-4 shadow-xs">
                {/* تصفية المحطة */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-gray-50 border border-[#E6DCC5] px-3 py-1.5 rounded-xl">
                        <Filter size={15} className="text-[#8A7F6D]" />
                        <span className="text-xs font-semibold text-[#8A7F6D]">محطة المطبخ:</span>
                        <select
                            value={selectedStation}
                            onChange={(e) => setSelectedStation(e.target.value)}
                            className="bg-transparent text-xs font-bold text-gray-800 focus:outline-none cursor-pointer border-none"
                        >
                            <option value="">جميع المحطات</option>
                            {stations.map(st => (
                                <option key={st.name} value={st.name}>
                                    {st.station_name || st.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="text-xs font-medium text-[#8A7F6D] hidden sm:block">
                        شاشة متابعة دورة تشغيل وتحضير الطلبات بالمطعم
                    </div>
                </div>

                {/* إحصائيات سريعة وزر التحديث */}
                <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                        إجمالي التذاكر: {tickets.confirmed.length + tickets.in_kitchen.length + tickets.served.length}
                    </span>

                    <button
                        type="button"
                        onClick={() => fetchTickets(false)}
                        disabled={loading}
                        className="flex items-center gap-2 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                        title="تحديث تذاكر المطبخ"
                    >
                        <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                        <span>تحديث</span>
                    </button>
                </div>
            </div>

            {/* منطقة الأعمدة الثلاثة المقسمة بالطول */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 md:p-6 overflow-hidden">
                {/* العمود 1: اتأكد (Confirmed / New) */}
                <div className="flex flex-col bg-[#FFFDF8] rounded-2xl border-2 border-[#B4863B] shadow-xs overflow-hidden">
                    {/* رأس العمود */}
                    <div className="px-4 py-3 bg-gradient-to-r from-blue-500/15 via-blue-500/5 to-transparent border-b border-[#B4863B] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-blue-600 shadow-xs shadow-blue-500/50"></span>
                            <h2 className="text-sm font-bold text-slate-900">١. اتأكد (جديد)</h2>
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full font-bold">
                                {tickets.confirmed.length}
                            </span>
                        </div>
                        <span className="text-[11px] font-medium text-blue-700">في انتظار البدء</span>
                    </div>

                    {/* قائمة التذاكر */}
                    <div className="flex-1 p-3.5 overflow-y-auto space-y-3">
                        {loading && tickets.confirmed.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-40 text-[#8A7F6D] gap-2">
                                <RefreshCw className="animate-spin text-blue-500" size={24} />
                                <span className="text-xs">جاري التحميل...</span>
                            </div>
                        ) : tickets.confirmed.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-48 text-[#8A7F6D] gap-2 border border-dashed border-[#E6DCC5] rounded-xl p-4 text-center">
                                <Utensils size={28} className="text-gray-300" />
                                <span className="text-xs font-semibold text-[#8A7F6D]">لا توجد طلبات جديدة معلقة</span>
                            </div>
                        ) : (
                            tickets.confirmed.map((ticket) => {
                                const isUpdating = updatingTicket === ticket.name;

                                return (
                                    <div 
                                        key={ticket.name}
                                        className="bg-[#FFFDF8] rounded-xl border border-[#B4863B] shadow-xs hover:shadow-md transition-all duration-200 p-3.5 space-y-2.5"
                                    >
                                        {/* الترويسة */}
                                        <div className="flex items-center justify-between pb-2 border-b border-[#E6DCC5]">
                                            <span className="text-xs font-mono font-bold bg-[#FFFDF8] text-[#B4863B] px-2 py-0.5 rounded border border-[#B4863B]">
                                                {ticket.name}
                                            </span>
                                            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border flex items-center gap-1 ${getElapsedBadgeColor(ticket.order_time || ticket.creation)}`}>
                                                <Clock size={11} />
                                                {formatElapsedMinutes(ticket.order_time || ticket.creation)}
                                            </span>
                                        </div>

                                        {/* بيانات الطاولة والعميل */}
                                        <div className="flex items-center justify-between text-xs text-[#2B2620]">
                                            <span className="font-bold text-[#16332B] bg-gray-100 px-2 py-0.5 rounded text-[11px]">
                                                {ticket.table || 'سفري / تيك أواي'}
                                            </span>
                                            <span className="truncate max-w-[120px] text-[#8A7F6D] text-[11px]">
                                                {ticket.customer_name || 'عميل'}
                                            </span>
                                        </div>

                                        {/* الأصناف */}
                                        <div className="bg-slate-50 rounded-lg p-2 border border-slate-100 space-y-1 text-xs">
                                            {ticket.items?.map((it, idx) => (
                                                <div key={idx} className="flex items-center justify-between text-[#16332B]">
                                                    <span className="truncate font-medium">{it.item_name || it.item}</span>
                                                    <span className="font-black bg-[#FFFDF8] px-1.5 py-0.5 rounded border border-slate-200 text-xs text-blue-700 mr-2">
                                                        {it.qty}×
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* زر الانتقال إلى المرحلة التالية */}
                                        <button
                                            type="button"
                                            disabled={isUpdating}
                                            onClick={() => handleMoveStatus(ticket.name, 'Preparing')}
                                            className="w-full flex items-center justify-center gap-2 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer disabled:opacity-50 active:scale-98"
                                        >
                                            {isUpdating ? <RefreshCw size={14} className="animate-spin" /> : <Flame size={15} />}
                                            <span>بدء التحضير بالمطبخ 👨‍🍳</span>
                                        </button>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* العمود 2: في المطبخ (In Kitchen / Preparing) */}
                <div className="flex flex-col bg-[#FFFDF8] rounded-2xl border-2 border-[#B4863B] shadow-xs overflow-hidden">
                    {/* رأس العمود */}
                    <div className="px-4 py-3 bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-transparent border-b border-[#B4863B] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-[#B4863B] shadow-xs shadow-amber-500/50"></span>
                            <h2 className="text-sm font-bold text-slate-900">٢. في المطبخ (قيد الطهي)</h2>
                            <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full font-bold">
                                {tickets.in_kitchen.length}
                            </span>
                        </div>
                        <span className="text-[11px] font-medium text-[#B4863B]">جاري الإعداد</span>
                    </div>

                    {/* قائمة التذاكر */}
                    <div className="flex-1 p-3.5 overflow-y-auto space-y-3">
                        {loading && tickets.in_kitchen.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-40 text-[#8A7F6D] gap-2">
                                <RefreshCw className="animate-spin text-amber-500" size={24} />
                                <span className="text-xs">جاري التحميل...</span>
                            </div>
                        ) : tickets.in_kitchen.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-48 text-[#8A7F6D] gap-2 border border-dashed border-[#E6DCC5] rounded-xl p-4 text-center">
                                <ChefHat size={28} className="text-gray-300" />
                                <span className="text-xs font-semibold text-[#8A7F6D]">لا توجد طلبات قيد التحضير</span>
                            </div>
                        ) : (
                            tickets.in_kitchen.map((ticket) => {
                                const isUpdating = updatingTicket === ticket.name;

                                return (
                                    <div 
                                        key={ticket.name}
                                        className="bg-[#FFFDF8] rounded-xl border border-[#B4863B] shadow-xs hover:shadow-md transition-all duration-200 p-3.5 space-y-2.5"
                                    >
                                        {/* الترويسة */}
                                        <div className="flex items-center justify-between pb-2 border-b border-[#E6DCC5]">
                                            <span className="text-xs font-mono font-bold bg-[#F3EBDA] text-[#16332B] px-2 py-0.5 rounded border border-[#B4863B]">
                                                {ticket.name}
                                            </span>
                                            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border flex items-center gap-1 ${getElapsedBadgeColor(ticket.order_time || ticket.creation)}`}>
                                                <Clock size={11} />
                                                {formatElapsedMinutes(ticket.order_time || ticket.creation)}
                                            </span>
                                        </div>

                                        {/* بيانات الطاولة والعميل */}
                                        <div className="flex items-center justify-between text-xs text-[#2B2620]">
                                            <span className="font-bold text-[#16332B] bg-[#F3EBDA] text-[#16332B] border border-[#B4863B] px-2 py-0.5 rounded text-[11px]">
                                                {ticket.table || 'سفري / تيك أواي'}
                                            </span>
                                            <span className="truncate max-w-[120px] text-[#8A7F6D] text-[11px]">
                                                {ticket.customer_name || 'عميل'}
                                            </span>
                                        </div>

                                        {/* الأصناف */}
                                        <div className="bg-[#F3EBDA]/50 rounded-lg p-2 border border-amber-100 space-y-1 text-xs">
                                            {ticket.items?.map((it, idx) => (
                                                <div key={idx} className="flex items-center justify-between text-[#16332B]">
                                                    <span className="truncate font-medium">{it.item_name || it.item}</span>
                                                    <span className="font-black bg-[#FFFDF8] px-1.5 py-0.5 rounded border border-[#B4863B] text-xs text-amber-800 mr-2">
                                                        {it.qty}×
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* زر الانتقال إلى Served */}
                                        <div className="flex items-center gap-2 pt-1">
                                            <button
                                                type="button"
                                                disabled={isUpdating}
                                                onClick={() => handleMoveStatus(ticket.name, 'Served')}
                                                className="flex-1 flex items-center justify-center gap-2 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer disabled:opacity-50 active:scale-98"
                                            >
                                                {isUpdating ? <RefreshCw size={14} className="animate-spin" /> : <CheckCircle2 size={15} />}
                                                <span>تم التقديم (Served) ✅</span>
                                            </button>

                                            <button
                                                type="button"
                                                disabled={isUpdating}
                                                onClick={() => handleMoveStatus(ticket.name, 'New')}
                                                className="px-2.5 py-2 bg-gray-100 hover:bg-gray-200 text-[#2B2620] rounded-xl text-xs font-semibold transition-colors"
                                                title="إرجاع إلى طلب جديد"
                                            >
                                                تراجع
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* العمود 3: تم التقديم (Served) */}
                <div className="flex flex-col bg-[#FFFDF8] rounded-2xl border-2 border-[#16332B] shadow-xs overflow-hidden">
                    {/* رأس العمود */}
                    <div className="px-4 py-3 bg-gradient-to-r from-emerald-500/15 via-emerald-500/5 to-transparent border-b border-[#16332B] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-[#16332B] shadow-xs shadow-emerald-500/50"></span>
                            <h2 className="text-sm font-bold text-slate-900">٣. تم التقديم (Served)</h2>
                            <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full font-bold">
                                {tickets.served.length}
                            </span>
                        </div>
                        <span className="text-[11px] font-medium text-[#16332B]">مكتمل ومسلّم</span>
                    </div>

                    {/* قائمة التذاكر */}
                    <div className="flex-1 p-3.5 overflow-y-auto space-y-3">
                        {loading && tickets.served.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-40 text-[#8A7F6D] gap-2">
                                <RefreshCw className="animate-spin text-emerald-500" size={24} />
                                <span className="text-xs">جاري التحميل...</span>
                            </div>
                        ) : tickets.served.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-48 text-[#8A7F6D] gap-2 border border-dashed border-[#E6DCC5] rounded-xl p-4 text-center">
                                <CheckCircle2 size={28} className="text-gray-300" />
                                <span className="text-xs font-semibold text-[#8A7F6D]">لا توجد طلبات تم تقديمها حتى الآن</span>
                            </div>
                        ) : (
                            tickets.served.map((ticket) => {
                                const isUpdating = updatingTicket === ticket.name;

                                return (
                                    <div 
                                        key={ticket.name}
                                        className="bg-[#FFFDF8] rounded-xl border border-[#16332B] shadow-xs hover:shadow-md transition-all duration-200 p-3.5 space-y-2.5 opacity-90 hover:opacity-100"
                                    >
                                        {/* الترويسة */}
                                        <div className="flex items-center justify-between pb-2 border-b border-[#E6DCC5]">
                                            <span className="text-xs font-mono font-bold bg-gray-50 text-[#16332B] px-2 py-0.5 rounded border border-[#E6DCC5]">
                                                {ticket.name}
                                            </span>
                                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#16332B] bg-[#FFFDF8] px-2 py-0.5 rounded border border-[#16332B]">
                                                <CheckCircle2 size={11} />
                                                جاهز ومسلّم
                                            </span>
                                        </div>

                                        {/* بيانات الطاولة والعميل */}
                                        <div className="flex items-center justify-between text-xs text-[#2B2620]">
                                            <span className="font-bold text-[#16332B] bg-gray-100 px-2 py-0.5 rounded text-[11px]">
                                                {ticket.table || 'سفري / تيك أواي'}
                                            </span>
                                            <span className="truncate max-w-[120px] text-[#8A7F6D] text-[11px]">
                                                {ticket.customer_name || 'عميل'}
                                            </span>
                                        </div>

                                        {/* الأصناف */}
                                        <div className="bg-slate-50 rounded-lg p-2 border border-slate-100 space-y-1 text-xs">
                                            {ticket.items?.map((it, idx) => (
                                                <div key={idx} className="flex items-center justify-between text-slate-700">
                                                    <span className="truncate font-medium">{it.item_name || it.item}</span>
                                                    <span className="font-bold bg-[#FFFDF8] px-1.5 py-0.5 rounded border border-slate-200 text-xs text-[#16332B] mr-2">
                                                        {it.qty}×
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* زر إعادة الفتح عند الحاجة */}
                                        <div className="pt-1">
                                            <button
                                                type="button"
                                                disabled={isUpdating}
                                                onClick={() => handleMoveStatus(ticket.name, 'Preparing')}
                                                className="w-full flex items-center justify-center gap-1.5 py-1.5 bg-gray-50 hover:bg-gray-100 text-[#2B2620] rounded-lg text-[11px] font-semibold transition-colors"
                                            >
                                                {isUpdating ? <RefreshCw size={12} className="animate-spin" /> : null}
                                                <span>إعادة إلى قيد التحضير</span>
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
