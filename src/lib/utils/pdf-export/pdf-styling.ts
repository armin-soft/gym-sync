
// ایجاد هدر بخش
export function createSectionHeader(title: string, color: string): any {
  return {
    text: title,
    style: 'subheader',
    margin: [0, 20, 0, 10],
    color: color,
    direction: 'rtl'
  };
}

// استایل‌های PDF
export const pdfStyles = {
  header: {
    fontSize: 22,
    bold: true,
    alignment: 'center',
    margin: [0, 0, 0, 20],
    direction: 'rtl'
  },
  subheader: {
    fontSize: 16,
    bold: true,
    alignment: 'center',
    margin: [0, 10, 0, 5],
    direction: 'rtl'
  },
  tableHeader: {
    bold: true,
    fillColor: '#f0f0f0',
    alignment: 'center',
    direction: 'rtl'
  },
  tableCell: {
    alignment: 'center',
    direction: 'rtl'
  }
};
