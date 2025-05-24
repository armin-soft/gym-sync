
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
export function setupPdfDocument(): jsPDF {
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
    addFontToPdf(doc);
    
    // تنظیم پیش‌فرض برای RTL
    doc.setR2L(true);
    
    console.log("PDF document setup completed with Persian font support");
  } catch (error) {
    console.error("Error setting up PDF document:", error);
    
    // fallback to default settings
    doc.setFont("helvetica", "normal");
    doc.setR2L(true);
  }
  
  return doc;
}
