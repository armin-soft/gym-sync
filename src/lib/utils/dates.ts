
import { formatToLocaleString } from '@/lib/utils/numbers';

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    
    // Return if invalid date
    if (isNaN(date.getTime())) {
      return 'تاریخ نامعتبر';
    }
    
    // Format the date in Persian style
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth is 0-indexed
    const day = date.getDate();
    
    // Return the formatted date
    return `${formatToLocaleString(year)}/${formatToLocaleString(month)}/${formatToLocaleString(day)}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'خطا در تاریخ';
  }
}
