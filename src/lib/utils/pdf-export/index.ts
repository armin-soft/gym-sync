
import jsPDF from 'jspdf';
import { Student } from '@/components/students/StudentTypes';
import { PDF_OPTIONS, setupPdfDocument } from './core';
import { createExerciseProgram } from './exercise-program';
import { createDietPlan } from './diet-plan';
import { createSupplementPlan } from './supplement-plan';
import { TrainerProfile } from './types';
import { toPersianNumbers } from '../numbers';
import { getCurrentPersianDate } from '../persianDate';
import { createDocumentHeader } from './pdf-layout';
import { addFontToPdf, writeRTLText } from './pdf-fonts';

// دریافت نسخه برنامه از فایل manifest
const getAppVersionFromManifest = async (): Promise<string> => {
  try {
    const response = await fetch('./Manifest.json');
    const manifest = await response.json();
    return manifest.version || '';
  } catch (error) {
    console.error('خطا در بارگیری نسخه از manifest:', error);
    
    // تلاش برای دریافت از localStorage در صورت دسترسی
    const cachedVersion = localStorage.getItem('app_version');
    if (cachedVersion) {
      return cachedVersion;
    }
    
    return '';
  }
};

// تابع برای پیش‌نمایش PDF
export const previewStudentProgramPDF = async (student: Student): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      // ایجاد یک سند PDF جدید با پشتیبانی RTL
      const doc = await setupPdfDocument();
      
      console.log("در حال ایجاد پیش‌نمایش PDF");
      
      // دریافت پروفایل مربی از localStorage
      const trainerProfileStr = localStorage.getItem('trainerProfile');
      const trainerProfile = trainerProfileStr ? JSON.parse(trainerProfileStr) : {} as TrainerProfile;
      
      console.log("در حال ایجاد PDF با پشتیبانی RTL");
      console.log("پروفایل مربی:", trainerProfile);
      console.log("شاگرد:", student.name);
      
      // اطلاعات عمومی فقط در صفحه اول نمایش داده می‌شود
      await createDocumentHeader(doc, student, trainerProfile, "برنامه جامع");
      
      // صفحه 1: برنامه تمرینی به صورت یک صفحه با چهار بخش
      await createExerciseProgram(doc, student, trainerProfile, false);
      
      // صفحه 2: برنامه غذایی هفتگی
      doc.addPage();
      await createDietPlan(doc, student, trainerProfile, false);
      
      // صفحه 3: مکمل‌ها و ویتامین‌ها
      doc.addPage();
      await createSupplementPlan(doc, student, trainerProfile, false);
      
      // بازگرداندن URL داده برای پیش‌نمایش
      const pdfDataUrl = doc.output('dataurlstring');
      resolve(pdfDataUrl);
      
    } catch (error) {
      console.error("خطا در ایجاد پیش‌نمایش PDF:", error);
      reject(error);
    }
  });
};

export const exportStudentProgramToPdf = async (student: Student): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      // ایجاد یک سند PDF جدید با پشتیبانی RTL
      const doc = await setupPdfDocument();
      
      console.log("در حال ایجاد سند PDF");
      
      // دریافت پروفایل مربی از localStorage
      const trainerProfileStr = localStorage.getItem('trainerProfile');
      const trainerProfile = trainerProfileStr ? JSON.parse(trainerProfileStr) : {} as TrainerProfile;
      
      console.log("در حال ایجاد PDF با پشتیبانی RTL");
      console.log("پروفایل مربی:", trainerProfile);
      console.log("شاگرد:", student.name);
      
      // اطلاعات عمومی فقط در صفحه اول نمایش داده می‌شود
      await createDocumentHeader(doc, student, trainerProfile, "برنامه جامع");
      
      // صفحه 1: برنامه تمرینی به صورت یک صفحه با چهار بخش
      await createExerciseProgram(doc, student, trainerProfile, false);
      
      // صفحه 2: برنامه غذایی هفتگی
      doc.addPage();
      await createDietPlan(doc, student, trainerProfile, false);
      
      // صفحه 3: مکمل‌ها و ویتامین‌ها
      doc.addPage();
      await createSupplementPlan(doc, student, trainerProfile, false);
      
      // ذخیره PDF با نامی بر اساس نام دانش‌آموز و تاریخ فعلی
      const currentDate = getCurrentPersianDate().replace(/\s/g, '_');
      const fileName = `برنامه_${student.name || 'بدون_نام'}_${currentDate}.pdf`;
      
      doc.save(fileName);
      
      resolve();
    } catch (error) {
      console.error("خطا در ایجاد PDF:", error);
      reject(error);
    }
  });
};

// صادر کردن تمام ماژول‌ها برای واردات آسان‌تر
export * from './types';
export * from './core';
export * from './data-helpers';
export * from './exercise-program';
export * from './diet-plan';
export * from './supplement-plan';
