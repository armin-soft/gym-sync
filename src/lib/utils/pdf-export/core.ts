
// Re-export all functionality from the refactored modules
export { initializePdfMake, ensurePdfMakeAvailable } from './pdf-initialization';
export { PDF_OPTIONS, createPdfDocument } from './pdf-document';
export { generatePDF, generatePDFPreview, generatePDFBlob } from './pdf-generation';

// Re-export utility functions
export { toPersianDigits, preprocessPersianText, createRTLText } from './pdf-fonts';
export { createDocumentHeader, addPageFooter } from './pdf-layout';
export { configureTableStyles, createSectionHeader } from './pdf-styling';

// Re-export new page builders and utilities
export { createExercisePage, createDietPage, createSupplementPage, createExercisePageContent } from './pdf-page-builders';
export { createPageHeader, createFooter } from './pdf-header-footer';
