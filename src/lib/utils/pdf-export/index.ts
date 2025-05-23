
import jsPDF from 'jspdf';
import { Student } from '@/components/students/StudentTypes';
import { PDF_OPTIONS, addFontToPdf } from './core';
import { createExerciseProgram } from './exercise-program';
import { createDietPlan } from './diet-plan';
import { createSupplementPlan } from './supplement-plan';
import { TrainerProfile } from './types';
import { toPersianNumbers } from '../numbers';
import { getCurrentPersianDate } from '../persianDate';

export const exportStudentProgramToPdf = async (student: Student): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      // Create a new PDF document with right-to-left support
      const doc = new jsPDF({
        ...PDF_OPTIONS,
        putOnlyUsedFonts: true,
        direction: 'rtl'
      });
      
      // Add Persian font
      addFontToPdf(doc);
      
      // Explicitly set right-to-left for entire document
      doc.setR2L(true);
      
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
      
      // Save the PDF with a filename based on the student's name and current date
      const currentDate = getCurrentPersianDate().replace(/\s/g, '_');
      const fileName = `برنامه_${student.name || 'بدون_نام'}_${currentDate}.pdf`;
      
      doc.save(fileName);
      
      resolve();
    } catch (error) {
      console.error("Error generating PDF:", error);
      reject(error);
    }
  });
};

// Re-export all the modules for easier imports
export * from './types';
export * from './core';
export * from './data-helpers';
export * from './exercise-program';
export * from './diet-plan';
export * from './supplement-plan';
