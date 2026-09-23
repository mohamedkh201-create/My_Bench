import { useState, useEffect } from 'react';
import { RefreshCw, CheckCircle2, X } from 'lucide-react';
import { Button, Input } from './ui';
import { getActiveLanguage } from '../i18n';
import { getOpenShift, getClosingEntryDetails, submitClosingEntry } from '../lib/pos-opening-api';
import { showToast } from './ui/toast';
import { useRootStore } from '../store/root-store';

interface POSClosingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const POSClosingDialog = ({ isOpen, onClose, onSuccess }: POSClosingDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [closingDoc, setClosingDoc] = useState<any>(null);
  
  const user = useRootStore(state => state.user);
  
  const lang = getActiveLanguage();
  const isArabic = ['ar', 'he', 'fa', 'ur', 'ku'].includes(lang);

  useEffect(() => {
    if (isOpen) {
      fetchClosingDetails();
    } else {
      setClosingDoc(null);
    }
  }, [isOpen]);

  const fetchClosingDetails = async () => {
    if (!user?.name) return;
    try {
      setIsLoading(true);
      
      // 1. Get POS Opening Entry
      const openShiftResp = await getOpenShift(user.name);
      if (!openShiftResp.message || openShiftResp.message.length === 0) {
        showToast.error(isArabic ? "لا توجد يومية مفتوحة" : "No open shift found");
        onClose();
        return;
      }
      const openingEntryName = openShiftResp.message[0].name;

      // 2. Get Closing Entry Details
      const closingResp = await getClosingEntryDetails(openingEntryName);
      if (closingResp && closingResp.message) {
        const doc = closingResp.message;
        // Initialize closing_amount equal to expected_amount initially
        if (doc.payment_reconciliation) {
          doc.payment_reconciliation = doc.payment_reconciliation.map((p: any) => ({
            ...p,
            closing_amount: p.expected_amount || 0
          }));
        }
        setClosingDoc(doc);
      } else {
        showToast.error(isArabic ? "فشل في جلب تفاصيل التقفيل" : "Failed to fetch closing details");
        onClose();
      }
    } catch (error: any) {
      showToast.error(error?.message || "Error fetching closing details");
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  const handleAmountChange = (modeOfPayment: string, value: string) => {
    if (!closingDoc) return;
    
    const newDoc = { ...closingDoc };
    const pIndex = newDoc.payment_reconciliation.findIndex((p: any) => p.mode_of_payment === modeOfPayment);
    if (pIndex > -1) {
      newDoc.payment_reconciliation[pIndex].closing_amount = parseFloat(value) || 0;
    }
    setClosingDoc(newDoc);
  };

  const handleSubmit = async () => {
    if (!closingDoc) return;
    try {
      setIsSubmitting(true);
      await submitClosingEntry(closingDoc);
      showToast.success(isArabic ? "تم تقفيل اليومية بنجاح" : "Shift closed successfully");
      onSuccess();
    } catch (error: any) {
      showToast.error(error?.message || "Error closing shift");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {isArabic ? "تقفيل اليومية (POS Closing)" : "Close Shift"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mb-4" />
              <p className="text-gray-500">{isArabic ? "جاري حساب الإجماليات..." : "Calculating totals..."}</p>
            </div>
          ) : closingDoc ? (
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <p className="text-sm text-gray-500 mb-1">{isArabic ? "إجمالي المبيعات" : "Grand Total"}</p>
                <p className="text-2xl font-bold text-gray-900">{closingDoc.grand_total}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {isArabic ? "مطابقة النقدية وطرق الدفع" : "Payment Reconciliation"}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  {isArabic 
                    ? "أدخل المبلغ الفعلي المتوفر لديك في الدرج لكل طريقة دفع للمطابقة." 
                    : "Enter the actual amount you have in your drawer for each payment mode to reconcile."}
                </p>

                <div className="space-y-4">
                  {closingDoc.payment_reconciliation?.map((p: any) => (
                    <div key={p.mode_of_payment} className="bg-white border border-gray-200 p-4 rounded-lg flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{p.mode_of_payment}</p>
                        <p className="text-sm text-gray-500">
                          {isArabic ? "المتوقع:" : "Expected:"} <span className="font-semibold text-gray-700">{p.expected_amount}</span>
                        </p>
                      </div>
                      <div className="w-1/3">
                        <label className="block text-xs font-medium text-gray-500 mb-1">
                          {isArabic ? "المبلغ الفعلي" : "Actual Amount"}
                        </label>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={p.closing_amount}
                          onChange={(e) => handleAmountChange(p.mode_of_payment, e.target.value)}
                          className="w-full text-center font-bold"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 flex gap-3 justify-end rounded-b-lg">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            {isArabic ? "إلغاء" : "Cancel"}
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || isLoading || !closingDoc}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isSubmitting ? (
              <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
            ) : (
              <CheckCircle2 className="w-5 h-5 mr-2" />
            )}
            {isArabic ? "تأكيد التقفيل" : "Confirm Closing"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default POSClosingDialog;
