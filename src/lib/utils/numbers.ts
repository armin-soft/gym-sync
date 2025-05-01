
import { format } from 'date-fns-tz';
import { faIR } from 'date-fns/locale';

// Function to convert English numbers to Persian
export const toPersianNumbers = (num: number | string): string => {
  if (num === undefined || num === null) return '';
  
  const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num.toString().replace(/[0-9]/g, (match) => persianNumbers[parseInt(match)]);
};

// Format date based on Persian locale
export const formatPersianDate = (date: Date): string => {
  try {
    return format(date, 'EEEE، d MMMM yyyy', { locale: faIR });
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

// Format currency (Toman)
export const formatCurrency = (amount: number): string => {
  return toPersianNumbers(amount.toLocaleString()) + ' تومان';
};

// Format percentage
export const formatPercentage = (value: number): string => {
  return toPersianNumbers(value) + '٪';
};

// Convert numbers to Persian words (for small numbers)
export const numberToPersianWords = (num: number): string => {
  const units = ['صفر', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه', 'ده'];
  const teens = ['یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده'];
  const tens = ['', 'ده', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'];
  
  if (num < 0) return `منفی ${numberToPersianWords(Math.abs(num))}`;
  if (num < 11) return units[num];
  if (num < 20) return teens[num - 11];
  if (num < 100) {
    const ten = Math.floor(num / 10);
    const unit = num % 10;
    return unit ? `${tens[ten]} و ${units[unit]}` : tens[ten];
  }
  
  return toPersianNumbers(num);
};
