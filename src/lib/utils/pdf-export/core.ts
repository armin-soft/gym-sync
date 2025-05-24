import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { PDFDocumentOptions } from './types';
import { toPersianDigits, preprocessPersianText, createRTLText } from './pdf-fonts';

// تنظیم فونت‌های پیش‌فرض
pdfMake.vfs = (pdfFonts as any).pdfMake?.vfs || pdfFonts;

// فونت‌های فارسی مدرن
const persianFonts = {
  Vazir: {
    normal: 'https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/Vazir-Regular.ttf',
    bold: 'https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/Vazir-Bold.ttf',
    italics: 'https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/Vazir-Regular.ttf',
    bolditalics: 'https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/Vazir-Bold.ttf'
  }
};

// اضافه کردن فونت‌ها به pdfMake
pdfMake.fonts = {
  ...(pdfMake.fonts || {}),
  Vazir: persianFonts.Vazir
};

// تنظیمات مدرن PDF با طراحی حرفه‌ای
export const PDF_OPTIONS: PDFDocumentOptions = {
  pageSize: 'A4',
  pageOrientation: 'portrait',
  pageMargins: [50, 80, 50, 80],
  defaultStyle: {
    font: 'Vazir',
    fontSize: 11,
    alignment: 'right',
    direction: 'rtl'
  },
};

// ایجاد سند PDF با استایل‌های مدرن و حرفه‌ای
export function createPdfDocument(content: any[]): any {
  return {
    content,
    ...PDF_OPTIONS,
    fonts: persianFonts,
    styles: {
      documentTitle: {
        fontSize: 24,
        bold: true,
        alignment: 'center',
        margin: [0, 0, 0, 30],
        color: '#2563eb',
        direction: 'rtl'
      },
      header: {
        fontSize: 20,
        bold: true,
        alignment: 'center',
        margin: [0, 0, 0, 25],
        color: '#1e40af',
        direction: 'rtl'
      },
      subheader: {
        fontSize: 16,
        bold: true,
        alignment: 'right',
        margin: [0, 15, 0, 12],
        color: '#374151',
        direction: 'rtl'
      },
      sectionTitle: {
        fontSize: 14,
        bold: true,
        alignment: 'right',
        margin: [0, 12, 0, 8],
        color: '#4f46e5',
        direction: 'rtl'
      },
      tableHeader: {
        bold: true,
        fontSize: 12,
        color: 'white',
        fillColor: '#4f46e5',
        alignment: 'center',
        direction: 'rtl',
        margin: [5, 8, 5, 8]
      },
      tableCell: {
        fontSize: 11,
        alignment: 'right',
        direction: 'rtl',
        margin: [5, 6, 5, 6]
      },
      tableSubHeader: {
        fontSize: 11,
        bold: true,
        fillColor: '#f1f5f9',
        color: '#475569',
        alignment: 'right',
        direction: 'rtl',
        margin: [5, 6, 5, 6]
      },
      notes: {
        fontSize: 10,
        alignment: 'right',
        margin: [0, 12, 0, 0],
        direction: 'rtl',
        color: '#64748b'
      },
      footer: {
        fontSize: 9,
        alignment: 'center',
        color: '#94a3b8',
        direction: 'rtl'
      },
      highlight: {
        fillColor: '#fef3c7',
        color: '#92400e',
        bold: true
      },
      success: {
        color: '#059669',
        bold: true
      },
      warning: {
        color: '#d97706',
        bold: true
      },
      danger: {
        color: '#dc2626',
        bold: true
      }
    }
  };
}

// تولید و دانلود PDF با نمایش پیشرفت
export function generatePDF(docDefinition: any, filename: string): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      console.log(`در حال تولید PDF: ${filename}`);
      const pdfDoc = pdfMake.createPdf(docDefinition);
      
      pdfDoc.download(filename);
      console.log(`PDF با موفقیت دانلود شد: ${filename}`);
      resolve();
    } catch (error) {
      console.error('خطا در تولید PDF:', error);
      reject(error);
    }
  });
}

// تولید URL پیش‌نمایش PDF با کیفیت بالا
export function generatePDFPreview(docDefinition: any): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      console.log('در حال تولید پیش‌نمایش PDF...');
      const pdfDoc = pdfMake.createPdf(docDefinition);
      
      pdfDoc.getDataUrl((dataUrl) => {
        console.log('پیش‌نمایش PDF با موفقیت تولید شد');
        resolve(dataUrl);
      });
    } catch (error) {
      console.error('خطا در تولید پیش‌نمایش PDF:', error);
      reject(error);
    }
  });
}

// تولید بلاب PDF برای عملیات پیشرفته
export function generatePDFBlob(docDefinition: any): Promise<Blob> {
  return new Promise((resolve, reject) => {
    try {
      const pdfDoc = pdfMake.createPdf(docDefinition);
      
      pdfDoc.getBlob((blob) => {
        resolve(blob);
      });
    } catch (error) {
      reject(error);
    }
  });
}

// صادر کردن توابع کمکی
export { toPersianDigits, preprocessPersianText, createRTLText } from './pdf-fonts';
export { createDocumentHeader, addPageFooter } from '../pdf-layout';
export { configureTableStyles, createSectionHeader } from './pdf-styling';
