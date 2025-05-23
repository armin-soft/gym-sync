
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
};

// Setup PDF with appropriate fonts and RTL support
export function setupPdfDocument(): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    putOnlyUsedFonts: true,
    hotfixes: ["px_scaling"],
    compress: true
  });
  
  // Setup font and RTL mode
  addFontToPdf(doc);
  
  return doc;
}
