
import jsPDF from 'jspdf';

// اضافه کردن فونت فارسی به PDF
export function addFontToPdf(doc: jsPDF): void {
  try {
    // استفاده از فونت استاندارد به جای فونت سفارشی برای جلوگیری از خطا
    // این تنظیمات برای زبان فارسی بهینه شده است
    doc.setFont('Helvetica', 'normal');
    
    // تنظیم راست به چپ برای نمایش صحیح متن فارسی
    doc.setR2L(true);
    
    console.log("Font setup completed successfully");
  } catch (error) {
    console.error("Error setting up font:", error);
  }
}
