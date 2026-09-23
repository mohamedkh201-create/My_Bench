/**
 * ============================================================================
 * Utility: printUtils.js
 * ============================================================================
 * الوصف:
 * دالة مساعدة لطباعة فواتير POS بشكل ديناميكي ومباشر.
 * تقوم بإنشاء iframe خفي وحقن كود HTML المستلم من Frappe وتشغيل نافذة الطباعة
 * المتوافقة مع طابعات الفواتير الحرارية (80mm) والطابعات العادية (A4).
 * ============================================================================
 */

export function printInvoiceHtml(html) {
    if (!html) {
        console.error("No HTML provided for printing.");
        return;
    }

    try {
        // إنشاء iframe مخفي
        const iframe = document.createElement('iframe');
        iframe.style.position = 'fixed';
        iframe.style.right = '0';
        iframe.style.bottom = '0';
        iframe.style.width = '0';
        iframe.style.height = '0';
        iframe.style.border = 'none';
        iframe.id = 'pos-print-iframe';

        document.body.appendChild(iframe);

        const doc = iframe.contentWindow.document;
        doc.open();
        doc.write(html);
        doc.close();

        // الانتظار حتى اكتمال تحميل المستند ثم تشغيل الطباعة
        iframe.contentWindow.focus();
        setTimeout(() => {
            try {
                iframe.contentWindow.print();
            } catch (err) {
                console.error("iframe print error:", err);
            } finally {
                // إزالة الـ iframe بعد إتمام عملية الطباعة
                setTimeout(() => {
                    if (document.body.contains(iframe)) {
                        document.body.removeChild(iframe);
                    }
                }, 2000);
            }
        }, 500);
    } catch (e) {
        console.warn("Iframe print failed, falling back to popup window:", e);
        // Fallback: نافذة منبثقة للطباعة
        const printWindow = window.open('', '_blank', 'width=800,height=900');
        if (printWindow) {
            printWindow.document.open();
            printWindow.document.write(html);
            printWindow.document.close();
            printWindow.focus();
            setTimeout(() => {
                printWindow.print();
                printWindow.close();
            }, 500);
        }
    }
}
