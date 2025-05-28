
export const toPersianDigits = (str: string): string => {
  const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
  const englishDigits = '0123456789';
  
  return str.replace(/[0-9]/g, (digit) => {
    const index = englishDigits.indexOf(digit);
    return index !== -1 ? persianDigits[index] : digit;
  });
};

export const preprocessPersianText = (text: string): string => {
  if (!text) return '';
  
  // Convert numbers to Persian digits
  return toPersianDigits(text.toString());
};

export const createTextStyle = (options: {
  fontSize?: number;
  bold?: boolean;
  color?: string;
  alignment?: string;
}) => {
  return {
    fontSize: options.fontSize || 11,
    bold: options.bold || false,
    color: options.color || '#000000',
    alignment: options.alignment || 'right'
  };
};
