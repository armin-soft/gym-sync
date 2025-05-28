
import React from 'react';
import pdfMake from 'pdfmake/build/pdfmake';

// بهبود سیستم initialization
let pdfMakeInitialized = false;
let initializationPromise: Promise<boolean> | null = null;

export async function initializePdfMake(): Promise<boolean> {
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
      
      // استفاده از فونت وزیر فارسی فقط - بدون bold variant
      pdfMake.fonts = {
        Vazir: {
          normal: 'Vazir',
          bold: 'Vazir', // استفاده از همان فونت عادی برای bold
          italics: 'Vazir',
          bolditalics: 'Vazir'
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

// دسترسی امن به pdfMake
export async function ensurePdfMakeAvailable() {
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
