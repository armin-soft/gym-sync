
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
import { addFontToPdf } from './pdf-fonts';

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
      // ایجاد یک سند PDF جدید با پشتیبانی راست به چپ
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        putOnlyUsedFonts: true,
        hotfixes: ["px_scaling"],
        compress: true
      });
      
      console.log("Creating PDF document");
      
      // افزودن فونت و تنظیم راست به چپ
      addFontToPdf(doc);
      
      // دریافت پروفایل مربی از localStorage
      const trainerProfileStr = localStorage.getItem('trainerProfile');
      const trainerProfile = trainerProfileStr ? JSON.parse(trainerProfileStr) : {} as TrainerProfile;
      
      console.log("Creating PDF with RTL support");
      console.log("Trainer profile:", trainerProfile);
      console.log("Student:", student.name);
      
      // اطلاعات کلی فقط در صفحه اول نمایش داده می‌شود
      createDocumentHeader(doc, student, trainerProfile, "برنامه جامع");
      
      // صفحه 1: برنامه تمرینی به صورت یک صفحه با چهار قسمت
      await createExerciseProgram(doc, student, trainerProfile, false);
      
      // صفحه 2: برنامه غذایی هفتگی
      doc.addPage();
      await createDietPlan(doc, student, trainerProfile, false);
      
      // صفحه 3: مکمل‌ها و ویتامین‌ها
      doc.addPage();
      await createSupplementPlan(doc, student, trainerProfile, false);
      
      // ذخیره PDF با نامی بر اساس نام شاگرد و تاریخ فعلی
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

// صادر کردن مجدد همه ماژول‌ها برای واردات آسان‌تر
export * from './types';
export * from './core';
export * from './data-helpers';
export * from './exercise-program';
export * from './diet-plan';
export * from './supplement-plan';
