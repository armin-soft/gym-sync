
import { preprocessPersianText } from './pdf-fonts';

// تنظیم استایل‌های جدول
export function configureTableStyles(headerColor: string = '#7c3aed'): any {
  return {
    tableHeader: {
      bold: true,
      fontSize: 12,
      color: 'white',
      fillColor: headerColor,
      alignment: 'center',
      direction: 'rtl'
    },
    tableCell: {
      fontSize: 10,
      alignment: 'right',
      direction: 'rtl'
    },
    alternateRow: {
      fillColor: '#f8fafc'
    }
  };
}

// ایجاد هدر بخش
export function createSectionHeader(title: string, iconName?: string): any {
  return {
    stack: [
      {
        text: preprocessPersianText(title),
        style: 'subheader',
        color: '#4a5568',
        alignment: 'right',
        margin: [0, 10, 0, 10],
        direction: 'rtl'
      },
      {
        canvas: [
          {
            type: 'line',
            x1: 0, y1: 5, 
            x2: 515, y2: 5,
            lineWidth: 1,
            lineColor: '#e2e8f0'
          }
        ]
      }
    ],
    margin: [0, 10, 0, 15]
  };
}
