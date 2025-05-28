
// Main export for PDF functionality
export { exportStudentProgramToPdf2Pages } from './exportStudentProgramToPdf2Pages';

// Simple fallback export function for backwards compatibility
export const exportStudentProgramToPdf = async (student: any): Promise<void> => {
  const { exportStudentProgramToPdf2Pages } = await import('./exportStudentProgramToPdf2Pages');
  return exportStudentProgramToPdf2Pages(student);
};
