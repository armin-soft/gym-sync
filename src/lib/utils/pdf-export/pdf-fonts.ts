
import jsPDF from 'jspdf';
import { toPersianNumbers } from '../numbers';

// اضافه کردن فونت فارسی به PDF
export function addFontToPdf(doc: jsPDF): void {
  try {
    // بارگذاری و تنظیم فونت استاندارد برای متن فارسی
    doc.addFileToVFS('Amiri-Regular.ttf', getAmiriFont());
    doc.addFont('Amiri-Regular.ttf', 'Amiri', 'normal');
    doc.setFont('Amiri');
    
    // تنظیم راست به چپ برای نمایش صحیح متن فارسی
    doc.setR2L(true);
    
    console.log("تنظیمات فونت با موفقیت انجام شد");
  } catch (error) {
    console.error("خطا در تنظیم فونت:", error);
    
    // در صورت خطا، از فونت پیش‌فرض استفاده می‌کنیم
    try {
      doc.setFont('Helvetica', 'normal');
      doc.setR2L(true);
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

// فایل فونت Amiri به صورت Base64
function getAmiriFont(): string {
  // بخشی از فونت Amiri به صورت Base64 (کوتاه شده برای نمونه)
  // در اینجا از فونت Amiri استفاده می‌کنیم که برای متن عربی و فارسی مناسب است
  return 'AAEAAAASAQAABAAgR0RFRgBOAAkAAAHcAAAAKEdQT1MF...';
  // فونت کامل خیلی بزرگ است و باید به صورت کامل اضافه شود
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
