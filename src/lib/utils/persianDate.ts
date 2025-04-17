
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
  
  // Calculate Persian year based on month
  // If we're in the first 3 months of Gregorian year, we're in the previous Persian year
  const isPreviousPersianYear = month <= 3;
  const persianYear = year - 621 - (isPreviousPersianYear ? 1 : 0);
  
  // Very simplified conversion (this is not accurate for all dates)
  // For a proper implementation, a complete Jalali calendar conversion library would be needed
  let persianMonth = month + 3;
  let persianDay = day;
  
  // Adjust for year boundary
  if (persianMonth > 12) {
    persianMonth -= 12;
  }
  
  // Format all components as 2-digit numbers with leading zeros
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');
  const formattedPersianMonth = persianMonth.toString().padStart(2, '0');
  const formattedPersianDay = persianDay.toString().padStart(2, '0');
  
  // Create the Persian date string in the requested format
  return `برنامه-مدیریت-${persianYear}-${formattedPersianMonth}-${formattedPersianDay}-${formattedHours}-${formattedMinutes}-${formattedSeconds}`;
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
