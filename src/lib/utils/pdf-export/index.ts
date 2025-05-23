
import jsPDF from 'jspdf';
import { Student } from '@/components/students/StudentTypes';
import { PDF_OPTIONS, addFontToPdf } from './core';
import { createExerciseProgram } from './exercise-program';
import { createDietPlan } from './diet-plan';
import { createSupplementPlan } from './supplement-plan';
import { TrainerProfile } from './types';

export const exportStudentProgramToPdf = async (student: Student): Promise<void> => {
  // Create a new PDF document
  const doc = new jsPDF(PDF_OPTIONS);
  
  // Add Persian font (simplified for this example)
  addFontToPdf(doc);
  
  try {
    // Get trainer profile from localStorage
    const trainerProfileStr = localStorage.getItem('trainerProfile');
    const trainerProfile = trainerProfileStr ? JSON.parse(trainerProfileStr) : {} as TrainerProfile;
    
    // Page 1: Exercise Program
    createExerciseProgram(doc, student, trainerProfile);
    
    // Page 2: Diet Plan
    doc.addPage();
    createDietPlan(doc, student, trainerProfile);
    
    // Page 3: Supplements and Vitamins
    doc.addPage();
    createSupplementPlan(doc, student, trainerProfile);
    
    // Save the PDF with a filename based on the student's name
    const currentDate = new Date().toISOString().split('T')[0];
    const fileName = `برنامه_${student.name}_${currentDate}.pdf`;
    
    doc.save(fileName);
    
    return Promise.resolve();
  } catch (error) {
    console.error("Error generating PDF:", error);
    return Promise.reject(error);
  }
};

// Re-export all the modules for easier imports
export * from './types';
export * from './core';
export * from './data-helpers';
export * from './exercise-program';
export * from './diet-plan';
export * from './supplement-plan';
