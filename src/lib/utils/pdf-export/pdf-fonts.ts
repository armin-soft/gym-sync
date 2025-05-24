
// تبدیل اعداد انگلیسی به فارسی
export function toPersianDigits(text: string | number): string {
  if (text === undefined || text === null) return '';
  
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(text).replace(/\d/g, match => persianDigits[parseInt(match)]);
}

// پردازش متن فارسی برای PDF
export function preprocessPersianText(text: string): string {
  if (!text) return '';
  return text;
}

// ایجاد متن RTL
export function createRTLText(text: string): string {
  return preprocessPersianText(text);
}
