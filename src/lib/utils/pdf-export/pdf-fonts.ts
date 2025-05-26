
// تبدیل اعداد انگلیسی به فارسی
export function toPersianDigits(text: string | number): string {
  if (text === undefined || text === null) return '';
  
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(text).replace(/\d/g, match => persianDigits[parseInt(match)]);
}

// پیش‌پردازش متن فارسی با حل مشکل RTL
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
    
    // اضافه کردن مارکر RTL برای درست کردن جهت متن
    processedText = '\u202B' + processedText + '\u202C';
    
    return processedText;
  } catch (error) {
    console.error("خطا در پیش‌پردازش متن فارسی:", error);
    return '\u202B' + text + '\u202C';
  }
}

// تابع بهبودیافته برای نوشتن متن RTL
export function createRTLText(text: string): any {
  if (!text) return { text: '' };
  
  return {
    text: preprocessPersianText(text),
    alignment: 'right',
    direction: 'rtl',
    bidi: false // غیرفعال کردن پردازش خودکار دوجهته
  };
}

// تابع کمکی برای ایجاد متن‌های چندبخشی RTL
export function createRTLTextArray(parts: { text: string, style?: any }[]): any {
  return {
    text: parts.map(part => ({
      text: preprocessPersianText(part.text),
      ...part.style
    })),
    alignment: 'right',
    direction: 'rtl',
    bidi: false
  };
}
