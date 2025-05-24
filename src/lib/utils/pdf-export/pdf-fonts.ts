
import jsPDF from 'jspdf';

// برای پشتیبانی از فونت فارسی در PDF
export function addFontToPdf(doc: jsPDF): void {
  try {
    // استفاده از فونت‌های پیش‌فرض که از یونیکد پشتیبانی می‌کنند
    doc.setFont("helvetica", "normal");
    
    // تنظیم جهت متن راست به چپ
    doc.setR2L(true);
    
    // فعال کردن پشتیبانی از یونیکد برای متن فارسی
    doc.setLanguage("fa");
    
    // تضمین اینکه تراز متن برای زبان‌های RTL به صورت پیش‌فرض راست است
    doc.setTextColor(0, 0, 0);
    
    console.log("تنظیمات فونت فارسی با موفقیت انجام شد");
  } catch (error) {
    console.error("خطا در تنظیم فونت فارسی:", error);
    // بازگشت به فونت پیش‌فرض در صورت خرابی
    doc.setFont("helvetica", "normal");
    doc.setR2L(true);
  }
}

// تابع کمکی برای اطمینان از نمایش صحیح متن RTL
export function writeRTLText(doc: jsPDF, text: string, x: number, y: number, options: any = {}): void {
  try {
    if (!text) return;
    
    // تبدیل متن فارسی به فرمت قابل نمایش
    const processedText = preprocessPersianText(text);
    
    // ذخیره وضعیت قبلی
    const previousR2L = doc.getR2L();
    
    // فعال‌سازی RTL
    doc.setR2L(true);
    
    // تنظیم گزینه‌های پیش‌فرض برای متن RTL - تراز راست برای فارسی مهم است
    const defaultOptions = { align: 'right', ...options };
    
    // اطمینان از اینکه متن به صورت یونیکد صحیح پردازش می‌شود
    doc.text(processedText, x, y, defaultOptions);
    
    // بازگرداندن وضعیت قبلی
    doc.setR2L(previousR2L);
  } catch (error) {
    console.error("خطا در نوشتن متن RTL:", error);
    // استفاده از متن استاندارد در صورت خرابی RTL
    try {
      doc.text(text || "", x, y, options);
    } catch (fallbackError) {
      console.error("خطا در fallback متن:", fallbackError);
    }
  }
}

// تابع پیش‌پردازش متن فارسی
function preprocessPersianText(text: string): string {
  if (!text) return '';
  
  try {
    // تبدیل اعداد انگلیسی به فارسی
    let processedText = toPersianDigits(text);
    
    // حل مشکل encoding برای کاراکترهای فارسی
    processedText = processedText.normalize('NFKC');
    
    // تبدیل کاراکترهای مشکل‌ساز
    processedText = processedText
      .replace(/ی/g, 'ی')
      .replace(/ک/g, 'ک')
      .replace(/‌/g, ' '); // تبدیل نیم‌فاصله به فاصله
    
    return processedText;
  } catch (error) {
    console.error("خطا در پیش‌پردازش متن فارسی:", error);
    return text;
  }
}

// تبدیل اعداد استاندارد به اعداد فارسی
export function toPersianDigits(text: string | number): string {
  if (text === undefined || text === null) return '';
  
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(text).replace(/\d/g, match => persianDigits[parseInt(match)]);
}
