
import { Student } from '@/components/students/StudentTypes';
import { TrainerProfile } from './types';
import { createPdfDocument, generatePDFPreview } from './core';
import { createAccurateExerciseProgram } from './exercise-program-updated';
import { createAccurateDietProgram } from './diet-program-updated';
import { createAccurateSupplementProgram } from './supplement-program-updated';
import { createSharedHeader, createSharedFooter } from './shared-header';

// تولید پیش‌نمایش PDF دقیق بر اساس داده‌های شاگرد
export const previewStudentProgramPDF = async (student: Student): Promise<string> => {
  try {
    console.log(`در حال ایجاد پیش‌نمایش PDF دقیق برای ${student.name}`);
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

    // تولید URL پیش‌نمایش
    const previewUrl = await generatePDFPreview(docDefinition);
    console.log(`پیش‌نمایش PDF دقیق با موفقیت ایجاد شد`);

    return previewUrl;
  } catch (error) {
    console.error("خطا در ایجاد پیش‌نمایش PDF دقیق:", error);
    throw new Error("خطا در تولید پیش‌نمایش - لطفاً مجدداً تلاش کنید");
  }
};
