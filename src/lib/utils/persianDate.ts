
import { toPersianNumbers } from './numbers';

function getPersianMonth(month: number): string {
  const persianMonths = [
    'فروردین', 'اردیبهشت', 'خرداد', 
    'تیر', 'مرداد', 'شهریور', 
    'مهر', 'آبان', 'آذر', 
    'دی', 'بهمن', 'اسفند'
  ];
  
  return persianMonths[month - 1] || '';
}

// Utility function to convert Gregorian to Jalali (Persian) calendar
function gregorianToJalali(year: number, month: number, day: number): { jYear: number, jMonth: number, jDay: number } {
  const persianMonthOffset = 621;
  
  const g_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const j_days_in_month = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 30];

  // Adjust for leap years
  if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
    g_days_in_month[1] = 29;
  }

  let gy = year - 1600;
  let gm = month - 1;
  let gd = day - 1;

  let g_days = 365 * gy + Math.floor((gy + 3) / 4) - Math.floor((gy + 99) / 100) + Math.floor((gy + 399) / 400);

  for (let i = 0; i < gm; ++i) {
    g_days += g_days_in_month[i];
  }
  g_days += gd;

  let j_days = g_days - 79;

  let j_np = Math.floor(j_days / 12053);
  j_days %= 12053;

  let jalaliYear = 979 + 33 * j_np + 4 * Math.floor(j_days / 1461);
  j_days %= 1461;

  if (j_days >= 366) {
    jalaliYear += Math.floor((j_days - 366) / 365);
    j_days = (j_days - 366) % 365;
  }

  let jalaliMonth = 0;
  for (let i = 0; i < 11 && j_days >= j_days_in_month[i]; ++i) {
    j_days -= j_days_in_month[i];
    jalaliMonth++;
  }
  jalaliMonth++;

  let jalaliDay = j_days + 1;

  return {
    jYear: jalaliYear,
    jMonth: jalaliMonth,
    jDay: jalaliDay
  };
}

export function formatPersianDateForFilename(): string {
  // Get current date
  const now = new Date();
  
  // Get Gregorian date components
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // 0-indexed to 1-indexed
  const day = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  
  // Convert to Jalali calendar
  const { jYear, jMonth, jDay } = gregorianToJalali(year, month, day);
  
  // Format all components as 2-digit numbers with leading zeros
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');
  const formattedPersianMonth = jMonth.toString().padStart(2, '0');
  const formattedPersianDay = jDay.toString().padStart(2, '0');
  
  // Create the Persian date string in the requested format
  return `Gym-Sync-${jYear}-${formattedPersianMonth}-${formattedPersianDay}-${formattedHours}-${formattedMinutes}-${formattedSeconds}`;
}

export function getCurrentPersianDate(withTime: boolean = false): string {
  try {
    // Try to use Intl.DateTimeFormat if available
    if (typeof Intl !== 'undefined' && Intl.DateTimeFormat) {
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        calendar: 'persian'
      };
      
      if (withTime) {
        options.hour = '2-digit';
        options.minute = '2-digit';
        options.second = '2-digit';
      }
      
      const persianDate = new Intl.DateTimeFormat('fa-IR', options).format(new Date());
      return persianDate;
    }
  } catch (error) {
    console.error('Error formatting Persian date:', error);
  }
  
  // Fallback to manual conversion if Intl isn't available or fails
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  
  // Calculate Persian year (simplified)
  const isPreviousPersianYear = month <= 3;
  const persianYear = year - 621 - (isPreviousPersianYear ? 1 : 0);
  
  // Convert month (simplified)
  let persianMonth = month + 3;
  if (persianMonth > 12) {
    persianMonth -= 12;
  }
  
  // Get Persian month name
  const persianMonthName = getPersianMonth(persianMonth);
  
  // Format date
  let result = `${toPersianNumbers(day)} ${persianMonthName} ${toPersianNumbers(persianYear)}`;
  
  // Add time if requested
  if (withTime) {
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    result += ` ${toPersianNumbers(hours)}:${toPersianNumbers(minutes.toString().padStart(2, '0'))}:${toPersianNumbers(seconds.toString().padStart(2, '0'))}`;
  }
  
  return result;
}
