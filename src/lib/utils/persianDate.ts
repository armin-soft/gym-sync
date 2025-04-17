
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
  // Conversion constants
  const PERSIAN_EPOCH = 1948320.5; // Julian day of 1 Farvardin 1
  
  // Convert Gregorian date to Julian day number
  let julianDay = gregorianToJd(year, month, day);
  
  // Convert Julian day to Persian date
  return jdToPersian(julianDay);
}

// Convert Gregorian date to Julian day number
function gregorianToJd(year: number, month: number, day: number): number {
  let julianDay = 
    (365.25 * (year + 4716)) +
    (30.6001 * (month + 1)) +
    day - 1524.5;
    
  if (year > 1582 || (year === 1582 && month > 10) || (year === 1582 && month === 10 && day > 4)) {
    const a = Math.floor(year / 100);
    julianDay = julianDay + 2 - a + Math.floor(a / 4);
  }
  
  return julianDay;
}

// Convert Julian day to Persian date
function jdToPersian(julianDay: number): { jYear: number, jMonth: number, jDay: number } {
  julianDay = Math.floor(julianDay) + 0.5;
  
  // Find the number of days since the Persian epoch
  const depoch = julianDay - PERSIAN_EPOCH;
  
  // Calculate Persian year
  const cycle = Math.floor(depoch / 1029983);
  const cyear = depoch % 1029983;
  
  let ycycle, aux1, aux2;
  if (cyear === 1029982) {
    ycycle = 2820;
  } else {
    aux1 = Math.floor(cyear / 366);
    aux2 = cyear % 366;
    ycycle = Math.floor(((2134 * aux1) + (2816 * aux2) + 2815) / 1028522) + aux1 + 1;
  }
  
  let pYear = ycycle + (2820 * cycle) + 474;
  
  // Adjust for the Persian epoch
  if (pYear <= 0) {
    pYear--;
  }
  
  // Find the Persian month and day
  const yday = julianDay - gregorianToJd(year(julianDay), 3, 20); // Persian new year is on March 20/21
  const pMonth = (yday <= 186) ? Math.ceil(yday / 31) : Math.ceil((yday - 6) / 30);
  const pDay = julianDay - jdFromPersian(pYear, pMonth, 1) + 1;
  
  return {
    jYear: pYear,
    jMonth: pMonth,
    jDay: pDay
  };
}

// Convert Persian date to Julian day
function jdFromPersian(year: number, month: number, day: number): number {
  // Convert Persian date to Julian day number
  const epbase = year - 474;
  const epyear = 474 + (epbase % 2820);
  
  let mdays;
  if (month <= 7) {
    mdays = (month - 1) * 31;
  } else {
    mdays = (month - 1) * 30 + 6;
  }
  
  return day + mdays + Math.floor(((epyear * 682) - 110) / 2816) + 
         (epyear - 1) * 365 + Math.floor(epbase / 2820) * 1029983 + PERSIAN_EPOCH - 1;
}

// Calculate the Gregorian year from Julian day
function year(jd: number): number {
  let year = Math.floor((jd - 1867216.25) / 365.25);
  
  if (jd < gregorianToJd(year, 1, 1)) {
    year--;
  }
  
  return year;
}

// Define PERSIAN_EPOCH constant
const PERSIAN_EPOCH = 1948320.5;

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
