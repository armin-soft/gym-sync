
import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { PDFDocumentOptions } from './types';
import { toPersianDigits, preprocessPersianText, createRTLText } from './pdf-fonts';
import { modernPdfStyles, printPageSettings } from './modern-styles';

// Initialize pdfMake with fonts immediately
try {
  const fonts = pdfFonts as any;
  if (fonts && fonts.pdfMake && fonts.pdfMake.vfs) {
    pdfMake.vfs = fonts.pdfMake.vfs;
  } else if (fonts && fonts.vfs) {
    pdfMake.vfs = fonts.vfs;
  } else {
    pdfMake.vfs = fonts;
  }
} catch (error) {
  console.error('Error setting up pdfMake vfs:', error);
}

// فونت‌های فارسی مدرن و بهینه شده
const persianFonts = {
  Vazir: {
    normal: 'https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/Vazir-Regular.ttf',
    bold: 'https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/Vazir-Bold.ttf',
    italics: 'https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/Vazir-Regular.ttf',
    bolditalics: 'https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/Vazir-Bold.ttf'
  }
};

// Initialize fonts safely
try {
  pdfMake.fonts = {
    Roboto: {
      normal: 'Roboto-Regular.ttf',
      bold: 'Roboto-Medium.ttf',
      italics: 'Roboto-Italic.ttf',
      bolditalics: 'Roboto-MediumItalic.ttf'
    },
    ...persianFonts
  };
  console.log('pdfMake fonts initialized successfully');
} catch (error) {
  console.error('Error initializing pdfMake fonts:', error);
}

// تنظیمات مدرن PDF برای چاپ حرفه‌ای
export const PDF_OPTIONS: PDFDocumentOptions = {
  ...printPageSettings,
  defaultStyle: {
    ...printPageSettings.defaultStyle,
    bidi: false
  }
};

// ایجاد سند PDF مدرن و حرفه‌ای
export function createPdfDocument(content: any[]): any {
  return {
    content,
    ...PDF_OPTIONS,
    fonts: persianFonts,
    styles: modernPdfStyles,
    // اضافه کردن واترمارک نرم‌افزار
    background: function(currentPage: number) {
      return {
        text: 'GymSync Pro',
        fontSize: 60,
        color: '#f8fafc',
        opacity: 0.03,
        alignment: 'center',
        margin: [0, 300, 0, 0],
        direction: 'rtl'
      };
    }
  };
}

// تولید و دانلود PDF با کیفیت بالا
export function generatePDF(docDefinition: any, filename: string): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      if (!pdfMake || typeof pdfMake.createPdf !== 'function') {
        throw new Error('pdfMake is not properly initialized');
      }
      
      console.log(`در حال تولید PDF حرفه‌ای: ${filename}`);
      const pdfDoc = pdfMake.createPdf(docDefinition);
      
      pdfDoc.download(filename);
      console.log(`PDF حرفه‌ای با موفقیت دانلود شد: ${filename}`);
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
      if (!pdfMake || typeof pdfMake.createPdf !== 'function') {
        throw new Error('pdfMake is not properly initialized');
      }
      
      console.log('در حال تولید پیش‌نمایش PDF مدرن...');
      const pdfDoc = pdfMake.createPdf(docDefinition);
      
      pdfDoc.getDataUrl((dataUrl) => {
        console.log('پیش‌نمایش PDF مدرن با موفقیت تولید شد');
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
      if (!pdfMake || typeof pdfMake.createPdf !== 'function') {
        throw new Error('pdfMake is not properly initialized');
      }
      
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
