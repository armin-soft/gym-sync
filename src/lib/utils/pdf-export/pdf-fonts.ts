
import jsPDF from 'jspdf';
import { getVazirFontData } from './vazir-font-base64';

// برای پشتیبانی از فونت فارسی در PDF
export function addFontToPdf(doc: jsPDF): void {
  try {
    console.log("شروع تنظیم فونت فارسی...");
    
    // بارگیری فونت Vazir
    const vazirFontData = getVazirFontData();
    
    if (vazirFontData) {
      // اضافه کردن فونت Vazir به PDF
      doc.addFileToVFS("Vazir-Regular.ttf", vazirFontData);
      doc.addFont("Vazir-Regular.ttf", "Vazir", "normal");
      
      // تنظیم فونت پیش‌فرض به Vazir
      doc.setFont("Vazir", "normal");
      console.log("فونت Vazir با موفقیت لود شد");
    } else {
      // fallback به Helvetica
      doc.setFont("Helvetica", "normal");
      console.warn("عدم دسترسی به فونت Vazir، استفاده از Helvetica");
    }
    
    // تنظیم جهت متن راست به چپ
    doc.setR2L(true);
    
    // فعال کردن پشتیبانی از یونیکد برای متن فارسی
    doc.setLanguage("fa");
    
    // تضمین اینکه تراز متن برای زبان‌های RTL به صورت پیش‌فرض راست است
    doc.setTextColor(0, 0, 0);
    
    console.log("تنظیمات فونت فارسی با موفقیت انجام شد");
  } catch (error) {
    console.error("خطا در تنظیم فونت فارسی:", error);
    
    // fallback به تنظیمات پایه
    try {
      doc.setFont("Helvetica", "normal");
      doc.setR2L(true);
    } catch (fallbackError) {
      console.error("خطا در تنظیمات fallback:", fallbackError);
    }
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
    
    // حذف تابع معکوس کردن متن که باعث مشکل می‌شد
    // بجای آن از پشتیبانی داخلی jsPDF برای RTL استفاده می‌کنیم
    
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
