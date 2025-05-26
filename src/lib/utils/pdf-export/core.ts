
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

    // Initialize VFS fonts with proper type handling
    try {
      // Cast pdfFonts to any to handle the dynamic structure
      const fontsModule = pdfFonts as any;
      
      // Try different possible VFS structures
      if (fontsModule.vfs) {
        pdfMake.vfs = fontsModule.vfs;
      } else if (typeof fontsModule === 'object' && Object.keys(fontsModule).length > 0) {
        // If pdfFonts is the vfs object itself
        pdfMake.vfs = fontsModule;
      } else {
        console.warn('No VFS fonts found, using empty VFS');
        pdfMake.vfs = {};
      }
    } catch (fontError) {
      console.warn('Could not load custom fonts, using defaults:', fontError);
      // Set empty VFS as fallback
      pdfMake.vfs = {};
    }

    // Set up fonts - use only Roboto to avoid font errors
    pdfMake.fonts = {
      Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-MediumItalic.ttf'
      }
    };

    // Ensure global pdfMake availability
    if (typeof window !== 'undefined') {
      if (!window.pdfMake) {
        window.pdfMake = pdfMake;
      }
      if (window.pdfMake && !window.pdfMake.createPdf) {
        window.pdfMake.createPdf = pdfMake.createPdf;
      }
    }

    pdfMakeInitialized = true;
    console.log('pdfMake initialized successfully with Roboto font support');
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
    font: 'Roboto', // Use Roboto instead of Vazir
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
      // Override any Vazir font references with Roboto
      header: {
        ...modernPdfStyles.header,
        font: 'Roboto'
      },
      subheader: {
        ...modernPdfStyles.subheader,
        font: 'Roboto'
      }
    },
    // اضافه کردن واترمارک نرم‌افزار
    background: function(currentPage: number) {
      return {
        text: 'GymSync Pro',
        fontSize: 60,
        color: '#f8fafc',
        opacity: 0.03,
        alignment: 'center',
        margin: [0, 300, 0, 0],
        font: 'Roboto'
      };
    }
  };
}

// Safe pdfMake access with initialization
function ensurePdfMakeAvailable() {
  if (!initializePdfMake()) {
    throw new Error('pdfMake initialization failed');
  }

  // Get the appropriate pdfMake reference
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
export function generatePDF(docDefinition: any, filename: string): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const pdfMakeInstance = ensurePdfMakeAvailable();
      
      console.log(`در حال تولید PDF حرفه‌ای: ${filename}`);
      const pdfDoc = pdfMakeInstance.createPdf(docDefinition);
      
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
      const pdfMakeInstance = ensurePdfMakeAvailable();
      
      console.log('در حال تولید پیش‌نمایش PDF مدرن...');
      const pdfDoc = pdfMakeInstance.createPdf(docDefinition);
      
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
      const pdfMakeInstance = ensurePdfMakeAvailable();
      
      const pdfDoc = pdfMakeInstance.createPdf(docDefinition);
      
      pdfDoc.getBlob((blob) => {
        resolve(blob);
      });
    } catch (error) {
      reject(error);
    }
  });
}

// Initialize on module load with delayed initialization for better reliability
if (typeof window !== 'undefined') {
  // Delay initialization to ensure all dependencies are loaded
  setTimeout(() => {
    try {
      initializePdfMake();
    } catch (error) {
      console.warn('Could not initialize pdfMake on module load:', error);
    }
  }, 100);
}

// صادر کردن توابع کمکی
export { toPersianDigits, preprocessPersianText, createRTLText } from './pdf-fonts';
export { createDocumentHeader, addPageFooter } from '../pdf-layout';
export { configureTableStyles, createSectionHeader } from './pdf-styling';
