
export function toPersianNumbers(number: number | string | null | undefined): string {
  if (number === null || number === undefined) {
    return '';
  }
  
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return number.toString().replace(/\d/g, (digit: string) => persianDigits[parseInt(digit)]);
}
