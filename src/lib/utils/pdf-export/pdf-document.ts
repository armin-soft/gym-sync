
import { PDFDocumentOptions } from './types';
import { printPageSettings, modernPdfStyles } from './modern-styles';

// تنظیمات مدرن PDF برای چاپ حرفه‌ای
export const PDF_OPTIONS: PDFDocumentOptions = {
  ...printPageSettings,
  defaultStyle: {
    ...printPageSettings.defaultStyle,
    font: 'Vazir',
    bidi: false
  }
};

// ایجاد سند PDF مدرن و حرفه‌ای
export function createPdfDocument(content: any[]): any {
  return {
    content,
    ...PDF_OPTIONS,
    styles: {
      ...modernPdfStyles,
      tableHeader: {
        bold: false,
        fontSize: 11,
        color: 'white',
        alignment: 'center',
        font: 'Vazir'
      },
      tableCell: {
        fontSize: 10,
        margin: [2, 4, 2, 4],
        font: 'Vazir'
      }
    },
    background: function(currentPage: number) {
      return {
        text: 'GymSync Pro',
        fontSize: 60,
        color: '#f8fafc',
        opacity: 0.03,
        alignment: 'center',
        margin: [0, 300, 0, 0],
        direction: 'rtl',
        font: 'Vazir'
      };
    }
  };
}
