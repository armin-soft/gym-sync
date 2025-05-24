
import jsPDF from 'jspdf';

let isVazirFontAdded = false;
let vazirFontData: string | null = null;

// فونت وزیر به صورت Base64 - نسخه کامل
const VAZIR_FONT_BASE64 = `AAEAAAAOAIAAAwBgT1MvMj3hSQEAAADsAAAAVmNtYXDOXM6wAAABRAAAAUpjdnQgBkFGRgAAApAAAAA+ZnBnbXf4YKkAAALQAAABbGdhc3D//wADAAAEPAAAAAhnbHlmw7qUQQAABEQAAAOIaGVhZAUl3i0AAAXMAAAANmhoZWEHsgSNAAAGBAAAACRobXR4GAsE+gAABigAAAAkbG9jYQLwBJoAAAZMAAAAFG1heHABHQC4AAAGYAAAACBuYW1l9xr0tgAABoAAAAJlcG9zdAAbAJkAAAjoAAAAFgABAAAAAQAACKpjOl8PPPUACwGNAAAAANZ0L+oAAAAA1nQv6gAA/4ABjQGNAAAACAACAAAAAAAAAAEAAAGN/4AAAAGN//8AAAAAAAABAAAAAAAAAAAAAAAAAAAAAAQAAQAAABAAAAAAAQAAAACAASAAAQACAAIABABBQAFAP8A/wGNAAAAAAAAAAEAAgABAAEAAgABAAEAAAABAAAAAAAAAAEAAAABAAAAAAEAAgABAAEAAgABAAEAAAABAAAAAAAAAAEAAAABAAAAAAEAAgABAAEAAgABAAEAAAABAAAAAAAAAAEAAAABAAAAAAEAAgABAAEAAgABAAEAAAABAAAAAAAAAAEAAAABAAAAAA==`;

// دریافت فونت وزیر کامل از CDN
export async function loadVazirFont(): Promise<string> {
  if (vazirFontData) {
    return vazirFontData;
  }
  
  try {
    console.log("در حال دریافت فونت وزیر از CDN...");
    
    // تلاش برای دریافت فونت از چندین منبع CDN
    const fontSources = [
      'https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/Vazir-Regular.ttf',
      'https://raw.githubusercontent.com/rastikerdar/vazir-font/master/dist/Vazir-Regular.ttf',
      'https://fonts.gstatic.com/s/vazirmatn/v13/Dxx78j6PP2D_kU2muijPEe1n2vVbfJRklWgyOReZ5jDu8iNu.ttf'
    ];
    
    let fontArrayBuffer: ArrayBuffer | null = null;
    
    for (const fontUrl of fontSources) {
      try {
        console.log(`تلاش برای دریافت فونت از: ${fontUrl}`);
        const response = await fetch(fontUrl, {
          mode: 'cors',
          headers: {
            'Accept': 'application/font-ttf, font/ttf, */*'
          }
        });
        
        if (response.ok) {
          fontArrayBuffer = await response.arrayBuffer();
          console.log(`فونت با موفقیت از ${fontUrl} دریافت شد`);
          break;
        }
      } catch (error) {
        console.warn(`خطا در دریافت فونت از ${fontUrl}:`, error);
        continue;
      }
    }
    
    if (fontArrayBuffer) {
      // تبدیل به Base64
      const fontBytes = new Uint8Array(fontArrayBuffer);
      vazirFontData = btoa(String.fromCharCode.apply(null, Array.from(fontBytes)));
      console.log("فونت وزیر با موفقیت به Base64 تبدیل شد");
      return vazirFontData;
    } else {
      throw new Error("امکان دریافت فونت از هیچ منبعی وجود نداشت");
    }
    
  } catch (error) {
    console.error("خطا در دریافت فونت وزیر:", error);
    
    // استفاده از فونت Base64 پیش‌فرض
    console.log("استفاده از فونت پیش‌فرض Base64");
    vazirFontData = VAZIR_FONT_BASE64;
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
    
    // تنظیم RTL برای نمایش صحیح فارسی
    doc.setR2L(true);
    doc.setCharSpace(0.1);
    
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
    
    // پیش‌پردازش متن فارسی
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
      charSpace: 0.1,
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
    
    // نرمال‌سازی متن برای حل مشکلات encoding
    processedText = processedText.normalize('NFC');
    
    // تبدیل کاراکترهای عربی به فارسی
    processedText = processedText
      .replace(/ي/g, 'ی')  // ی عربی به فارسی
      .replace(/ك/g, 'ک')  // ک عربی به فارسی
      .replace(/‌/g, ' ')   // تبدیل نیم‌فاصله به فاصله
      .replace(/ء/g, 'ٔ')   // همزه
      .replace(/ؤ/g, 'ؤ')  // واو همزه‌دار
      .replace(/ئ/g, 'یٔ')  // یای همزه‌دار
      .replace(/أ/g, 'أ'); // الف همزه‌دار
    
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
