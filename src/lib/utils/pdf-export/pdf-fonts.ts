
import jsPDF from 'jspdf';

let isVazirFontAdded = false;
let vazirFontData: string | null = null;

// دریافت فونت وزیر کامل از CDN
export async function loadVazirFont(): Promise<string> {
  if (vazirFontData) {
    return vazirFontData;
  }
  
  try {
    console.log("در حال دریافت فونت وزیر از CDN...");
    const response = await fetch('https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/Vazir-Regular.ttf');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const fontArrayBuffer = await response.arrayBuffer();
    vazirFontData = btoa(String.fromCharCode(...new Uint8Array(fontArrayBuffer)));
    
    console.log("فونت وزیر با موفقیت دریافت شد");
    return vazirFontData;
  } catch (error) {
    console.error("خطا در دریافت فونت وزیر:", error);
    
    // بازگشت به فونت پیش‌فرض ساده
    vazirFontData = "AAEAAAAOAIAAAwBgT1MvMj3hSQEAAADsAAAAVmNtYXDOXM6wAAABRAAAAUpjdnQgBkFGRgAAApAAAAA+ZnBnbXf4YKkAAALQAAABbGdhc3D//wADAAAEPAAAAAhnbHlmw7qUQQAABEQAAAOIaGVhZAUl3i0AAAXMAAAANmhoZWEHsgSNAAAGBAAAACRobXR4GAsE+gAABigAAAAkbG9jYQLwBJoAAAZMAAAAFG1heHABHQC4AAAGYAAAACBuYW1l9xr0tgAABoAAAAJlcG9zdAAbAJkAAAjoAAAAFgABAAAAAQAACKpjOl8PPPUACwGNAAAAANZ0L+oAAAAA1nQv6gAA/4ABjQGNAAAACAACAAAAAAAAAAEAAAGN/4AAAAGN//8AAAAAAAABAAAAAAAAAAAAAAAAAAAAAAQAAQAAABAAAAAAAQAAAACAASAAAQACAAIABABBQAFAP8A/wGNAAAAAAAAAAEAAgABAAEAAgABAAEAAAABAAAAAAAAAAEAAAABAAAAAAEAAgABAAEAAgABAAEAAAABAAAAAAAAAAEAAAABAAAAAAEAAgABAAEAAgABAAEAAAABAAAAAAAAAAEAAAABAAAAAAEAAgABAAEAAgABAAEAAAABAAAAAAAAAAEAAAABAAAAAA==";
    return vazirFontData;
  }
}

// برای پشتیبانی از فونت فارسی در PDF
export async function addFontToPdf(doc: jsPDF): Promise<void> {
  try {
    if (!isVazirFontAdded) {
      console.log("در حال اضافه کردن فونت وزیر به PDF...");
      
      // دریافت فونت کامل
      const fontData = await loadVazirFont();
      
      // اضافه کردن فونت وزیر به jsPDF
      doc.addFileToVFS('Vazir-Regular.ttf', fontData);
      doc.addFont('Vazir-Regular.ttf', 'Vazir', 'normal');
      
      isVazirFontAdded = true;
      console.log("فونت وزیر با موفقیت اضافه شد");
    }
    
    // استفاده از فونت وزیر
    doc.setFont("Vazir", "normal");
    doc.setFontSize(12);
    doc.setR2L(true);
    
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
    
    // اطمینان از استفاده از فونت وزیر
    if (isVazirFontAdded) {
      doc.setFont("Vazir", "normal");
    }
    
    // تنظیم گزینه‌های پیش‌فرض برای متن RTL
    const defaultOptions = { 
      align: 'right',
      direction: 'rtl',
      ...options 
    };
    
    // نوشتن متن با تنظیمات RTL
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
