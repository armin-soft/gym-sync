
import { toPersianNumbers } from './numbers';

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
  
  // Convert to Persian year (approximately)
  const persianYear = year - 621;
  
  // Very simplified conversion (this is not accurate for all dates)
  // For a proper implementation, a complete Jalali calendar conversion library would be needed
  let persianMonth = month + 3;
  let persianDay = day;
  
  // Adjust for year boundary
  if (persianMonth > 12) {
    persianMonth -= 12;
  } else {
    // If we're in the first 3 months of Gregorian year, we're in the previous Persian year
    persianYear -= 1;
  }
  
  // Format all components as 2-digit numbers with leading zeros
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');
  const formattedPersianMonth = persianMonth.toString().padStart(2, '0');
  const formattedPersianDay = persianDay.toString().padStart(2, '0');
  
  // Create the Persian date string in the requested format
  return `Program-Management-${persianYear}-${formattedPersianMonth}-${formattedPersianDay}-${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
