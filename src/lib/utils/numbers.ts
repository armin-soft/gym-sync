
export function toPersianNumbers(number: number | string | null | undefined): string {
  if (number === null || number === undefined) {
    return '';
  }
  
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return number.toString().replace(/\d/g, (digit: string) => persianDigits[parseInt(digit)]);
}

// Format numbers with thousands separator
export function formatNumber(number: number | string): string {
  if (!number) return '';
  
  const numberString = number.toString();
  return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Format price with Toman currency
export function formatPrice(price: number | string): string {
  if (!price) return '';
  
  const formattedPrice = formatNumber(price);
  return `${formattedPrice} تومان`;
}
