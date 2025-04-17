
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
  // This algorithm is a standard conversion from Gregorian to Jalali (Persian) calendar
  const gregorianMonths = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  const gregorianLeapYears = year > 1600 ? 
    Math.floor((year - 1600) / 4) - Math.floor((year - 1600) / 100) + Math.floor((year - 1600) / 400) : 
    0;
    
  const gregorianLeapDays = year > 1583 ? gregorianLeapYears : 0;
  const daysDiff = (365 * (year - 1600)) + gregorianLeapDays + gregorianMonths[month - 1] + day - 1;
  
  let jalaliYear, jalaliMonth, jalaliDay;
  
  if (daysDiff <= 79) {
    jalaliYear = 982;
    jalaliMonth = ((daysDiff + 7) / 31) + 1;
    jalaliDay = ((daysDiff + 7) % 31) + 1;
  } else {
    jalaliYear = 983 + 33 * Math.floor(daysDiff / 12053);
    let remaining = daysDiff % 12053;
    
    jalaliYear += 4 * Math.floor(remaining / 1461);
    remaining %= 1461;
    
    if (remaining > 365) {
      jalaliYear += Math.floor((remaining - 1) / 365);
      remaining = (remaining - 1) % 365;
    }
    
    if (remaining < 186) {
      jalaliMonth = Math.floor(remaining / 31) + 1;
      jalaliDay = (remaining % 31) + 1;
    } else {
      jalaliMonth = Math.floor((remaining - 186) / 30) + 7;
      jalaliDay = ((remaining - 186) % 30) + 1;
    }
  }
  
  return {
    jYear: jalaliYear,
    jMonth: Math.floor(jalaliMonth),
    jDay: Math.floor(jalaliDay)
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
  
  // Convert to Persian date using our custom function
  const { jYear, jMonth, jDay } = gregorianToJalali(year, month, day);
  
  // Get Persian month name
  const persianMonthName = getPersianMonth(jMonth);
  
  // Format date
  let result = `${toPersianNumbers(jDay)} ${persianMonthName} ${toPersianNumbers(jYear)}`;
  
  // Add time if requested
  if (withTime) {
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    result += ` ${toPersianNumbers(hours)}:${toPersianNumbers(minutes.toString().padStart(2, '0'))}:${toPersianNumbers(seconds.toString().padStart(2, '0'))}`;
  }
  
  return result;
}
