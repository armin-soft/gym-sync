
import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { PDFDocumentOptions } from './types';
import { toPersianDigits, preprocessPersianText, createRTLText } from './pdf-fonts';

// تنظیم فونت‌های پیش‌فرض
pdfMake.vfs = (pdfFonts as any).pdfMake?.vfs || pdfFonts;

// فونت‌های فارسی
const persianFonts = {
  Vazir: {
    normal: 'https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/Vazir-Regular.ttf',
    bold: 'https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/Vazir-Bold.ttf',
  }
};

// اضافه کردن فونت‌ها به pdfMake
pdfMake.fonts = {
  ...(pdfMake.fonts || {}),
  Vazir: persianFonts.Vazir
};

// تنظیمات پیش‌فرض PDF
export const PDF_OPTIONS: PDFDocumentOptions = {
  pageSize: 'A4',
  pageOrientation: 'portrait',
  pageMargins: [40, 60, 40, 60],
  defaultStyle: {
    font: 'Vazir',
    fontSize: 12,
    alignment: 'right',
    direction: 'rtl', // اضافه کردن جهت RTL به صورت پیش‌فرض
  },
};

// ایجاد سند PDF با تنظیمات فارسی
export function createPdfDocument(content: any[]): any {
  return {
    content,
    ...PDF_OPTIONS,
    fonts: persianFonts,
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        alignment: 'center',
        margin: [0, 0, 0, 20],
        color: '#7c3aed',
        direction: 'rtl', // اضافه کردن جهت RTL
      },
      subheader: {
        fontSize: 14,
        bold: true,
        alignment: 'right',
        margin: [0, 10, 0, 10],
        color: '#4a5568',
        direction: 'rtl', // اضافه کردن جهت RTL
      },
      tableHeader: {
        bold: true,
        fontSize: 12,
        color: 'white',
        fillColor: '#7c3aed',
        alignment: 'center',
        direction: 'rtl', // اضافه کردن جهت RTL
      },
      tableCell: {
        fontSize: 10,
        alignment: 'right',
        direction: 'rtl', // اضافه کردن جهت RTL
      },
      notes: {
        fontSize: 11,
        italics: true,
        alignment: 'right',
        margin: [0, 10, 0, 0],
        direction: 'rtl', // اضافه کردن جهت RTL
      }
    }
  };
}

// تولید و دانلود PDF
export function generatePDF(docDefinition: any, filename: string): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const pdfDoc = pdfMake.createPdf(docDefinition);
      pdfDoc.download(filename);
      resolve();
    } catch (error) {
      console.error('خطا در تولید PDF:', error);
      reject(error);
    }
  });
}

// تولید URL پیش‌نمایش PDF
export function generatePDFPreview(docDefinition: any): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const pdfDoc = pdfMake.createPdf(docDefinition);
      pdfDoc.getDataUrl((dataUrl) => {
        resolve(dataUrl);
      });
    } catch (error) {
      console.error('خطا در تولید پیش‌نمایش PDF:', error);
      reject(error);
    }
  });
}

// صادر کردن توابع کمکی
export { toPersianDigits, preprocessPersianText, createRTLText } from './pdf-fonts';
export { createDocumentHeader, addPageFooter } from './pdf-layout';
export { configureTableStyles, createSectionHeader } from './pdf-styling';
