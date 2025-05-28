
import { ensurePdfMakeAvailable } from './pdf-initialization';

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
