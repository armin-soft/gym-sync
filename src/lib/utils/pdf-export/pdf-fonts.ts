
// تبدیل اعداد انگلیسی به فارسی
export function toPersianDigits(text: string | number): string {
  if (text === undefined || text === null) return '';
  
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(text).replace(/\d/g, match => persianDigits[parseInt(match)]);
}

// پیش‌پردازش متن فارسی
export function preprocessPersianText(text: string): string {
  if (!text) return '';
  
  try {
    // تبدیل اعداد انگلیسی به فارسی
    let processedText = toPersianDigits(text);
    
    // نرمال‌سازی متن
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

// تابع کمکی برای نوشتن متن RTL
export function createRTLText(text: string): any {
  return {
    text: preprocessPersianText(text),
    alignment: 'right',
    direction: 'rtl'
  };
}
