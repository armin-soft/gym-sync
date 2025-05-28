
import { Student } from '@/components/students/StudentTypes';
import { TrainerProfile } from './types';
import { createPdfDocument, generatePDF } from './core';
import { createAccurateExerciseProgram } from './exercise-program-updated';
import { createAccurateDietProgram } from './diet-program-updated';
import { createAccurateSupplementProgram } from './supplement-program-updated';
import { createSharedHeader, createSharedFooter } from './shared-header';
import { getCurrentPersianDate } from '../persianDate';

// صادر کردن PDF دقیق بر اساس داده‌های شاگرد
export const exportStudentProgramToPdf = async (student: Student): Promise<void> => {
  try {
    console.log(`شروع صدور PDF دقیق برای ${student.name}`);
    const trainerProfileStr = localStorage.getItem('trainerProfile');
    const trainerProfile = trainerProfileStr ? JSON.parse(trainerProfileStr) : {} as TrainerProfile;
    const content: any[] = [];

    // هدر مشترک
    content.push(...createSharedHeader(student, trainerProfile));

    // بخش برنامه تمرینی
    content.push({
      text: 'برنامه تمرینی',
      style: 'sectionTitle',
      margin: [0, 20, 0, 15],
      color: '#7c3aed',
      direction: 'rtl'
    });
    content.push(...createAccurateExerciseProgram(student, trainerProfile));

    // بخش برنامه غذایی
    content.push({
      text: 'برنامه غذایی',
      style: 'sectionTitle',
      margin: [0, 20, 0, 15],
      color: '#27ae60',
      direction: 'rtl'
    });
    content.push(...createAccurateDietProgram(student, trainerProfile));

    // بخش برنامه مکمل و ویتامین
    content.push({
      text: 'برنامه مکمل و ویتامین',
      style: 'sectionTitle',
      margin: [0, 20, 0, 15],
      color: '#e67e22',
      direction: 'rtl'
    });
    content.push(...createAccurateSupplementProgram(student, trainerProfile));

    // ایجاد سند PDF
    const docDefinition = {
      ...createPdfDocument(content),
      footer: createSharedFooter(trainerProfile)
    };

    // نام فایل
    const currentDate = getCurrentPersianDate().replace(/\s/g, '_').replace(/\//g, '-');
    const fileName = `برنامه_${student.name?.replace(/\s/g, '_')}_${currentDate}.pdf`;

    // دانلود PDF
    await generatePDF(docDefinition, fileName);
    console.log(`PDF دقیق با موفقیت صادر شد: ${fileName}`);
  } catch (error) {
    console.error("خطا در صدور PDF دقیق:", error);
    throw new Error("خطا در صدور فایل - لطفاً مجدداً تلاش کنید");
  }
};
