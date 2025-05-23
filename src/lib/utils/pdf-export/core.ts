
import jsPDF from 'jspdf';
import { PDFOptions } from './types';
import autoTable from 'jspdf-autotable';

// Export the reusable functions from our new modules
export { addFontToPdf } from './pdf-fonts';
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
