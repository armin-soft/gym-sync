
import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { PDFDocumentOptions } from './types';
import { toPersianDigits, preprocessPersianText, createRTLText } from './pdf-fonts';
import { modernPdfStyles, printPageSettings } from './modern-styles';

// Safe pdfMake initialization with better error handling
let pdfMakeInitialized = false;

function initializePdfMake() {
  if (pdfMakeInitialized) return true;
  
  try {
    // Check if pdfMake is available
    if (typeof pdfMake === 'undefined' || !pdfMake) {
      console.error('pdfMake is not available');
      return false;
    }

    // Initialize VFS fonts with multiple fallback strategies
    let fonts;
    try {
      fonts = pdfFonts;
      if (fonts && typeof fonts === 'object') {
        if (fonts.pdfMake && fonts.pdfMake.vfs) {
          pdfMake.vfs = fonts.pdfMake.vfs;
        } else if (fonts.vfs) {
          pdfMake.vfs = fonts.vfs;
        } else {
          // If fonts is the vfs object itself
          pdfMake.vfs = fonts;
        }
      }
    } catch (fontError) {
      console.warn('Could not load custom fonts, using defaults:', fontError);
      pdfMake.vfs = {};
    }

    // Set up fonts with fallback
    pdfMake.fonts = {
      Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-MediumItalic.ttf'
      }
    };

    pdfMakeInitialized = true;
    console.log('pdfMake initialized successfully');
    return true;
  } catch (error) {
    console.error('Error initializing pdfMake:', error);
    return false;
  }
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
      if (!initializePdfMake()) {
        throw new Error('pdfMake initialization failed');
      }

      if (typeof pdfMake?.createPdf !== 'function') {
        throw new Error('pdfMake.createPdf is not available');
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
      if (!initializePdfMake()) {
        throw new Error('pdfMake initialization failed');
      }

      if (typeof pdfMake?.createPdf !== 'function') {
        throw new Error('pdfMake.createPdf is not available');
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
      if (!initializePdfMake()) {
        throw new Error('pdfMake initialization failed');
      }

      if (typeof pdfMake?.createPdf !== 'function') {
        throw new Error('pdfMake.createPdf is not available');
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

// Initialize on module load
try {
  initializePdfMake();
} catch (error) {
  console.warn('Could not initialize pdfMake on module load:', error);
}

// صادر کردن توابع کمکی
export { toPersianDigits, preprocessPersianText, createRTLText } from './pdf-fonts';
export { createDocumentHeader, addPageFooter } from '../pdf-layout';
export { configureTableStyles, createSectionHeader } from './pdf-styling';
