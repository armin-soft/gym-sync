
import { toPersianNumbers, formatNumber } from "@/lib/utils/numbers";

/**
 * Format payment with thousand separator
 */
export function formatPayment(payment: string | number | undefined): string {
  if (!payment) return '';
  
  const paymentString = payment.toString().replace(/[^\d]/g, '');
  
  try {
    // Format with thousands separator
    const formattedNumber = formatNumber(paymentString);
    return formattedNumber;
  } catch (error) {
    console.error("Error formatting payment:", error);
    return toPersianNumbers(paymentString);
  }
}

/**
 * Format measurements with Persian numbers
 */
export function formatMeasurement(value: string | number | undefined, unit: string): string {
  if (!value) return '';
  
  try {
    const persianValue = toPersianNumbers(value);
    return `${persianValue} ${unit}`;
  } catch (error) {
    console.error("Error formatting measurement:", error);
    return `${value} ${unit}`;
  }
}

/**
 * Calculate BMI
 */
export function calculateBMI(weight: string | number, height: string | number): number | null {
  if (!weight || !height) return null;
  
  const weightValue = parseFloat(weight.toString());
  const heightValue = parseFloat(height.toString()) / 100; // Convert to meters
  
  if (isNaN(weightValue) || isNaN(heightValue) || heightValue <= 0) return null;
  
  const bmi = weightValue / (heightValue * heightValue);
  return Math.round(bmi * 10) / 10; // Round to 1 decimal place
}

/**
 * Get BMI category in Persian
 */
export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return 'کمبود وزن';
  if (bmi < 25) return 'وزن طبیعی';
  if (bmi < 30) return 'اضافه وزن';
  if (bmi < 35) return 'چاقی درجه ۱';
  if (bmi < 40) return 'چاقی درجه ۲';
  return 'چاقی شدید';
}
