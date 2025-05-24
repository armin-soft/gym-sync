
import jsPDF from 'jspdf';
import { PDFOptions } from './types';
import autoTable from 'jspdf-autotable';
import { addFontToPdf } from './pdf-fonts';

// Export the reusable functions from our new modules
export { addFontToPdf, writeRTLText, toPersianDigits } from './pdf-fonts';
export { createDocumentHeader, addPageFooter } from './pdf-layout';
export { configureTableStyles, createSectionHeader } from './pdf-styling';

// Configure jsPDF options
export const PDF_OPTIONS: PDFOptions = {
  orientation: 'portrait',
  unit: 'mm',
  format: 'a4',
  hotfixes: ["px_scaling"],
  compress: true,
  putOnlyUsedFonts: true,
  floatPrecision: 16,
};

// Setup PDF with appropriate fonts and RTL support
export async function setupPdfDocument(): Promise<jsPDF> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    putOnlyUsedFonts: true,
    hotfixes: ["px_scaling"],
    compress: true,
    floatPrecision: 16
  });
  
  try {
    // Setup Persian font support and RTL mode
    await addFontToPdf(doc);
    
    // تنظیمات اضافی برای بهبود نمایش فارسی
    doc.setR2L(true);
    doc.setFontSize(12);
    
    // تنظیم خصوصیات پیش‌فرض برای متن
    doc.setTextColor(0, 0, 0);
    
    console.log("PDF document setup completed with Persian font support");
  } catch (error) {
    console.error("Error setting up PDF document:", error);
    
    // fallback to default settings
    doc.setFont("helvetica", "normal");
    doc.setR2L(true);
    doc.setFontSize(12);
  }
  
  return doc;
}
