
// Export the main functions
export { exportStudentProgramToPdf2Pages as exportStudentProgramToPdf } from './exportStudentProgramToPdf2Pages';
export { previewStudentProgramPDF2Pages as previewStudentProgramPDF } from './previewStudentProgramPDF2Pages';

// Keep the old exports for backward compatibility
export { exportStudentProgramToPdf as exportStudentProgramToPdfOld } from './exportStudentProgramToPdf';
export { previewStudentProgramPDF as previewStudentProgramPDFOld } from './previewStudentProgramPDF';

// Export comprehensive report function
export { generateComprehensiveReport } from './generateComprehensiveReport';

// Export other utility functions
export * from './core';
export * from './types';
