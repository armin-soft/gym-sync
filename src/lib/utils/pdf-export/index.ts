
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
      // ایجاد یک سند PDF جدید با پشتیبانی راست به چپ
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        putOnlyUsedFonts: true,
        hotfixes: ["px_scaling"],
        compress: true
      });
      
      // افزودن فونت فارسی
      addFontToPdf(doc);
      
      // تنظیم حالت راست به چپ بعد از مقداردهی اولیه
      doc.setR2L(true);
      
      // دریافت پروفایل مربی از localStorage
      const trainerProfileStr = localStorage.getItem('trainerProfile');
      const trainerProfile = trainerProfileStr ? JSON.parse(trainerProfileStr) : {} as TrainerProfile;
      
      console.log("Creating PDF with RTL support");
      console.log("Trainer profile:", trainerProfile);
      console.log("Student:", student.name);
      
      // صفحه 1: برنامه تمرینی
      createExerciseProgram(doc, student, trainerProfile);
      
      // صفحه 2: برنامه غذایی
      doc.addPage();
      createDietPlan(doc, student, trainerProfile);
      
      // صفحه 3: مکمل‌ها و ویتامین‌ها
      doc.addPage();
      createSupplementPlan(doc, student, trainerProfile);
      
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
