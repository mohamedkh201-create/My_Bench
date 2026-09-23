import { useState } from 'react';
import { RefreshCw, AlertTriangle, Monitor, LogOut, CheckCircle2 } from 'lucide-react';
import { Button, Input } from './ui';
import { t, getActiveLanguage } from '../i18n';
import { usePOSStore } from '../store/pos-store';
import { createOpeningVoucher } from '../lib/pos-opening-api';
import { showToast } from './ui/toast';
import { logout } from '../lib/auth-api';

interface POSOpeningDialogProps {
  onReload: () => void;
  type: 'opening' | 'closing';
}

const POSOpeningDialog = ({ onReload, type }: POSOpeningDialogProps) => {
  const isOpeningIssue = type === 'opening';
  const { posProfile } = usePOSStore();
  
  const [openingAmount, setOpeningAmount] = useState<string>('0');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const lang = getActiveLanguage();
  const isArabic = ['ar', 'he', 'fa', 'ur', 'ku'].includes(lang);
  
  const handleSwitchToDesk = () => {
    const currentDomain = window.location.origin;
    window.open(`${currentDomain}/app`, '_blank');
  };
  
  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/login?redirect-to=%2Fpos';
    } catch (error) {
      showToast.error(t('errors.failed_logout'));
    }
  };

  const handleOpenShift = async () => {
    if (!posProfile) {
      showToast.error("POS Profile is missing.");
      return;
    }
    
    const amount = parseFloat(openingAmount);
    if (isNaN(amount) || amount < 0) {
      showToast.error(isArabic ? "الرجاء إدخال مبلغ صحيح" : "Please enter a valid amount");
      return;
    }

    try {
      setIsSubmitting(true);
      await createOpeningVoucher(posProfile.name, posProfile.company, amount);
      showToast.success(isArabic ? "تم فتح اليومية بنجاح!" : "Shift opened successfully!");
      onReload(); // Reload to initialize POS
    } catch (error: any) {
      showToast.error(error?.message || "Failed to open shift");
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-xl">
        <div className="text-center">
          {/* Icon */}
          <div className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-6 ${
            isOpeningIssue ? 'bg-blue-100' : 'bg-orange-100'
          }`}>
            {isOpeningIssue ? (
              <CheckCircle2 className="h-8 w-8 text-blue-600" />
            ) : (
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            )}
          </div>
          
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {isOpeningIssue 
              ? (isArabic ? "مرحباً! دعنا نفتح اليومية" : "Welcome! Let's open your shift") 
              : t('pos.not_closed_title')}
          </h2>

          {/* Message */}
          <p className="text-gray-600 mb-6 text-lg">
            {isOpeningIssue 
              ? (isArabic ? "كم المبلغ المتوفر معك حالياً في درج الكاشير؟ (العهدة الافتتاحية)" : "How much cash is currently in your drawer? (Opening Amount)") 
              : t('pos.not_closed_message')}
          </p>

          {isOpeningIssue && (
            <div className="mb-8 text-left">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isArabic ? "المبلغ في الدرج" : "Cash in Drawer"}
              </label>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={openingAmount}
                onChange={(e) => setOpeningAmount(e.target.value)}
                className="w-full text-lg h-12 text-center font-bold"
                placeholder="0.00"
                disabled={isSubmitting}
              />
            </div>
          )}

          {/* Buttons */}
          <div className="space-y-3">
            {isOpeningIssue ? (
              <>
                <Button
                  onClick={handleOpenShift}
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 h-12"
                >
                  {isSubmitting ? (
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                  ) : (
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                  )}
                  {isArabic ? "تأكيد وفتح اليومية" : "Confirm and Open Shift"}
                </Button>
                
                <Button
                  onClick={handleLogout}
                  disabled={isSubmitting}
                  variant="outline"
                  className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3 px-6 rounded-lg transition-colors duration-200 h-12"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  {isArabic ? "تسجيل الخروج" : "Logout"}
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={onReload}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
                  {t('pos.reload_page')}
                </Button>

                <Button
                  onClick={handleSwitchToDesk}
                  variant="outline"
                  className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  <Monitor className="w-5 h-5 mr-2" />
                  {t('pos.switch_to_desk')}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default POSOpeningDialog; 