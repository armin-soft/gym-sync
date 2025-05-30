
/**
 * Convert English numbers to Persian numbers
 */
export const toPersianNumbers = (input: string | number): string => {
  if (input === null || input === undefined) return '';
  
  const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  
  let result = String(input);
  
  for (let i = 0; i < englishNumbers.length; i++) {
    result = result.replace(new RegExp(englishNumbers[i], 'g'), persianNumbers[i]);
  }
  
  return result;
};

/**
 * Convert Persian numbers to English numbers
 */
export const toEnglishNumbers = (input: string): string => {
  if (!input) return '';
  
  const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  
  let result = input;
  
  for (let i = 0; i < persianNumbers.length; i++) {
    result = result.replace(new RegExp(persianNumbers[i], 'g'), englishNumbers[i]);
  }
  
  return result;
};

/**
 * Format number with Persian separators
 */
export const formatPersianNumber = (num: number | string): string => {
  const number = typeof num === 'string' ? parseFloat(num) : num;
  if (isNaN(number)) return '';
  
  return toPersianNumbers(number.toLocaleString('en-US'));
};

/**
 * Format currency in Persian
 */
export const formatPersianCurrency = (amount: number | string, currency: string = 'تومان'): string => {
  const formattedNumber = formatPersianNumber(amount);
  return `${formattedNumber} ${currency}`;
};
