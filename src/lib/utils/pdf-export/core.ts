import React from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import { PDFDocumentOptions } from './types';
import { toPersianDigits, preprocessPersianText, createRTLText } from './pdf-fonts';
import { modernPdfStyles, printPageSettings } from './modern-styles';

// بهبود سیستم initialization
let pdfMakeInitialized = false;
let initializationPromise: Promise<boolean> | null = null;

async function initializePdfMake(): Promise<boolean> {
  if (pdfMakeInitialized) return true;
  
  if (initializationPromise) {
    return initializationPromise;
  }
  
  initializationPromise = new Promise((resolve) => {
    try {
      // بررسی دسترسی به React hooks
      if (typeof window !== 'undefined' && !window.React) {
        console.warn('React not found in window, setting up...');
        window.React = React;
      }
      
      // بررسی pdfMake
      if (typeof pdfMake === 'undefined' || !pdfMake) {
        console.error('pdfMake is not available');
        resolve(false);
        return;
      }

      // تنظیم VFS و فونت وزیر فقط
      pdfMake.vfs = pdfMake.vfs || {};
      
      // استفاده از فونت وزیر فارسی فقط
      pdfMake.fonts = {
        Vazir: {
          normal: 'Vazir',
          bold: 'Vazir-Bold',
          italics: 'Vazir',
          bolditalics: 'Vazir-Bold'
        }
      };

      // تنظیم global pdfMake
      if (typeof window !== 'undefined') {
        if (!window.pdfMake) {
          window.pdfMake = pdfMake;
        }
        if (window.pdfMake && !window.pdfMake.createPdf) {
          window.pdfMake.createPdf = pdfMake.createPdf;
        }
      }

      pdfMakeInitialized = true;
      console.log('pdfMake initialized successfully with Vazir font');
      resolve(true);
    } catch (error) {
      console.error('Error initializing pdfMake:', error);
      resolve(false);
    }
  });
  
  return initializationPromise;
}

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

// دسترسی امن به pdfMake
async function ensurePdfMakeAvailable() {
  const initialized = await initializePdfMake();
  if (!initialized) {
    throw new Error('pdfMake initialization failed');
  }

  let pdfMakeInstance = pdfMake;
  if (typeof window !== 'undefined' && window.pdfMake) {
    pdfMakeInstance = window.pdfMake;
  }

  if (!pdfMakeInstance || typeof pdfMakeInstance.createPdf !== 'function') {
    throw new Error('pdfMake.createPdf is not available');
  }

  return pdfMakeInstance;
}

// تولید و دانلود PDF با کیفیت بالا
export async function generatePDF(docDefinition: any, filename: string): Promise<void> {
  try {
    const pdfMakeInstance = await ensurePdfMakeAvailable();
    
    console.log(`در حال تولید PDF حرفه‌ای: ${filename}`);
    const pdfDoc = pdfMakeInstance.createPdf(docDefinition);
    
    return new Promise((resolve, reject) => {
      try {
        pdfDoc.download(filename);
        console.log(`PDF حرفه‌ای با موفقیت دانلود شد: ${filename}`);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  } catch (error) {
    console.error('خطا در تولید PDF:', error);
    throw error;
  }
}

// تولید URL پیش‌نمایش PDF با کیفیت بالا
export async function generatePDFPreview(docDefinition: any): Promise<string> {
  try {
    const pdfMakeInstance = await ensurePdfMakeAvailable();
    
    console.log('در حال تولید پیش‌نمایش PDF مدرن...');
    const pdfDoc = pdfMakeInstance.createPdf(docDefinition);
    
    return new Promise((resolve, reject) => {
      try {
        pdfDoc.getDataUrl((dataUrl) => {
          console.log('پیش‌نمایش PDF مدرن با موفقیت تولید شد');
          resolve(dataUrl);
        });
      } catch (error) {
        console.error('خطا در تولید داده URL:', error);
        reject(error);
      }
    });
  } catch (error) {
    console.error('خطا در تولید پیش‌نمایش PDF:', error);
    throw error;
  }
}

// تولید بلاب PDF برای عملیات پیشرفته
export async function generatePDFBlob(docDefinition: any): Promise<Blob> {
  try {
    const pdfMakeInstance = await ensurePdfMakeAvailable();
    
    const pdfDoc = pdfMakeInstance.createPdf(docDefinition);
    
    return new Promise((resolve, reject) => {
      try {
        pdfDoc.getBlob((blob) => {
          resolve(blob);
        });
      } catch (error) {
        reject(error);
      }
    });
  } catch (error) {
    throw error;
  }
}

// راه‌اندازی تاخیری بهبود یافته
if (typeof window !== 'undefined') {
  setTimeout(async () => {
    try {
      await initializePdfMake();
    } catch (error) {
      console.warn('Could not initialize pdfMake on module load:', error);
    }
  }, 200);
}

// صادر کردن توابع کمکی
export { toPersianDigits, preprocessPersianText, createRTLText } from './pdf-fonts';
export { createDocumentHeader, addPageFooter } from '../pdf-layout';
export { configureTableStyles, createSectionHeader } from './pdf-styling';
