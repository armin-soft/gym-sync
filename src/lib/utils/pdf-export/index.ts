
import jsPDF from 'jspdf';
import { Student } from '@/components/students/StudentTypes';
import { PDF_OPTIONS } from './core';
import { createExerciseProgram } from './exercise-program';
import { createDietPlan } from './diet-plan';
import { createSupplementPlan } from './supplement-plan';
import { TrainerProfile } from './types';
import { toPersianNumbers } from '../numbers';
import { getCurrentPersianDate } from '../persianDate';
import { createDocumentHeader } from './pdf-layout';
import { addFontToPdf, writeRTLText } from './pdf-fonts';

// Fetch application version from manifest
const getAppVersionFromManifest = async (): Promise<string> => {
  try {
    const response = await fetch('./Manifest.json');
    const manifest = await response.json();
    return manifest.version || '';
  } catch (error) {
    console.error('Error loading version from manifest:', error);
    
    // Try to get from localStorage if available
    const cachedVersion = localStorage.getItem('app_version');
    if (cachedVersion) {
      return cachedVersion;
    }
    
    return '';
  }
};

export const exportStudentProgramToPdf = async (student: Student): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      // Create a new PDF document with RTL support
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        putOnlyUsedFonts: true,
        hotfixes: ["px_scaling"],
        compress: true
      });
      
      console.log("Creating PDF document");
      
      // Add font and set RTL support - this is critical for Persian text
      addFontToPdf(doc);
      
      // Get trainer profile from localStorage
      const trainerProfileStr = localStorage.getItem('trainerProfile');
      const trainerProfile = trainerProfileStr ? JSON.parse(trainerProfileStr) : {} as TrainerProfile;
      
      console.log("Creating PDF with RTL support");
      console.log("Trainer profile:", trainerProfile);
      console.log("Student:", student.name);
      
      // General information is only shown on first page
      createDocumentHeader(doc, student, trainerProfile, "برنامه جامع");
      
      // Page 1: Exercise program as one page with four sections
      await createExerciseProgram(doc, student, trainerProfile, false);
      
      // Page 2: Weekly diet plan
      doc.addPage();
      await createDietPlan(doc, student, trainerProfile, false);
      
      // Page 3: Supplements and vitamins
      doc.addPage();
      await createSupplementPlan(doc, student, trainerProfile, false);
      
      // Save PDF with a name based on student name and current date
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

// Re-export all modules for easier imports
export * from './types';
export * from './core';
export * from './data-helpers';
export * from './exercise-program';
export * from './diet-plan';
export * from './supplement-plan';
