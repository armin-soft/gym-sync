
// Re-export all functionality from the refactored modules
export { initializePdfMake, ensurePdfMakeAvailable } from './pdf-initialization';
export { PDF_OPTIONS, createPdfDocument } from './pdf-document';
export { generatePDF, generatePDFPreview, generatePDFBlob } from './pdf-generation';

// Re-export utility functions
export { toPersianDigits, preprocessPersianText, createRTLText } from './pdf-fonts';
export { createDocumentHeader, addPageFooter } from './pdf-layout';
export { configureTableStyles, createSectionHeader } from './pdf-styling';
