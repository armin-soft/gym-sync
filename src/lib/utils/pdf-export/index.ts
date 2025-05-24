
import { Student } from '@/components/students/StudentTypes';
import { TrainerProfile } from './types';
import { createPdfDocument, generatePDF, generatePDFPreview } from './core';
import { createDocumentHeader, addPageFooter } from '../pdf-layout';
import { createExerciseProgram } from './exercise-program';
import { createDietPlan } from './diet-plan';
import { createSupplementPlan } from './supplement-plan';
import { getCurrentPersianDate } from '../persianDate';

// تولید پیش‌نمایش PDF
export const previewStudentProgramPDF = async (student: Student): Promise<string> => {
  try {
    console.log("در حال ایجاد پیش‌نمایش PDF با pdfmake");
    
    // دریافت پروفایل مربی
    const trainerProfileStr = localStorage.getItem('trainerProfile');
    const trainerProfile = trainerProfileStr ? JSON.parse(trainerProfileStr) : {} as TrainerProfile;
    
    // ایجاد محتوای PDF
    const content: any[] = [];
    
    // صفحه 1: برنامه تمرینی
    // هدر سند
    content.push(...createDocumentHeader(student, trainerProfile, "برنامه تمرینی"));
    
    // برنامه تمرینی
    content.push(...createExerciseProgram(student, trainerProfile));
    
    // صفحه 2: برنامه غذایی
    content.push({ text: '', pageBreak: 'before' });
    content.push(...createDocumentHeader(student, trainerProfile, "برنامه غذایی"));
    content.push(...createDietPlan(student, trainerProfile));
    
    // صفحه 3: برنامه مکمل
    content.push({ text: '', pageBreak: 'before' });
    content.push(...createDocumentHeader(student, trainerProfile, "برنامه مکمل و ویتامین"));
    content.push(...createSupplementPlan(student, trainerProfile));
    
    // پاورقی
    const footer = await addPageFooter(trainerProfile);
    
    // ایجاد سند PDF
    const docDefinition = createPdfDocument(content);
    docDefinition.footer = footer;
    
    // تولید URL پیش‌نمایش
    return await generatePDFPreview(docDefinition);
    
  } catch (error) {
    console.error("خطا در ایجاد پیش‌نمایش PDF:", error);
    throw error;
  }
};

// صادر کردن PDF
export const exportStudentProgramToPdf = async (student: Student): Promise<void> => {
  try {
    console.log("در حال ایجاد PDF با pdfmake");
    
    // دریافت پروفایل مربی
    const trainerProfileStr = localStorage.getItem('trainerProfile');
    const trainerProfile = trainerProfileStr ? JSON.parse(trainerProfileStr) : {} as TrainerProfile;
    
    // ایجاد محتوای PDF
    const content: any[] = [];
    
    // صفحه 1: برنامه تمرینی
    // هدر سند
    content.push(...createDocumentHeader(student, trainerProfile, "برنامه تمرینی"));
    
    // برنامه تمرینی
    content.push(...createExerciseProgram(student, trainerProfile));
    
    // صفحه 2: برنامه غذایی
    content.push({ text: '', pageBreak: 'before' });
    content.push(...createDocumentHeader(student, trainerProfile, "برنامه غذایی"));
    content.push(...createDietPlan(student, trainerProfile));
    
    // صفحه 3: برنامه مکمل
    content.push({ text: '', pageBreak: 'before' });
    content.push(...createDocumentHeader(student, trainerProfile, "برنامه مکمل و ویتامین"));
    content.push(...createSupplementPlan(student, trainerProfile));
    
    // پاورقی
    const footer = await addPageFooter(trainerProfile);
    
    // ایجاد سند PDF
    const docDefinition = createPdfDocument(content);
    docDefinition.footer = footer;
    
    // نام فایل
    const currentDate = getCurrentPersianDate().replace(/\s/g, '_');
    const fileName = `برنامه_${student.name || 'بدون_نام'}_${currentDate}.pdf`;
    
    // دانلود PDF
    await generatePDF(docDefinition, fileName);
    
  } catch (error) {
    console.error("خطا در ایجاد PDF:", error);
    throw error;
  }
};

// صادر کردن همه ماژول‌ها
export * from './types';
export * from './core';
export * from './data-helpers';
