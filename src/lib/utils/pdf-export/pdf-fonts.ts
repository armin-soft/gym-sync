
import jsPDF from 'jspdf';
import { toPersianNumbers } from '../numbers';

// اضافه کردن فونت فارسی به PDF
export function addFontToPdf(doc: jsPDF): void {
  try {
    // استفاده از فونت پیش‌فرض که از قبل در jsPDF موجود است
    doc.setFont('Helvetica');
    
    // تنظیم راست به چپ برای نمایش صحیح متن فارسی
    doc.setR2L(true);
    
    console.log("تنظیمات راست به چپ با موفقیت انجام شد");
  } catch (error) {
    console.error("خطا در تنظیم فونت:", error);
    
    // در صورت خطا، از فونت پیش‌فرض استفاده می‌کنیم
    try {
      doc.setFont('Helvetica', 'normal');
      console.log("استفاده از فونت پیش‌فرض به دلیل خطا");
    } catch (secondError) {
      console.error("خطا در تنظیم فونت پیش‌فرض:", secondError);
    }
  }
}

// تبدیل اعداد انگلیسی به فارسی در PDF
export function pdfPersianText(doc: jsPDF, text: string, x: number, y: number, options?: any): void {
  try {
    // تبدیل اعداد به فارسی
    const persianText = toPersianNumbers(text);
    
    // نمایش متن در PDF
    doc.text(persianText, x, y, options || {});
  } catch (error) {
    console.error("خطا در نمایش متن فارسی:", error);
    // در صورت خطا، متن اصلی را نمایش می‌دهیم
    doc.text(text, x, y, options || {});
  }
}

// بهبود تابع تبدیل اعداد به فارسی برای PDF
export function pdfPersianNumber(doc: jsPDF, number: number | string, x: number, y: number, options?: any): void {
  try {
    const persianNumber = toPersianNumbers(number);
    doc.text(persianNumber, x, y, options || {});
  } catch (error) {
    console.error("خطا در نمایش اعداد فارسی:", error);
    doc.text(String(number), x, y, options || {});
  }
}
