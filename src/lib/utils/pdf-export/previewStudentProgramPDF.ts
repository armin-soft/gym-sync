
import { Student } from '@/components/students/StudentTypes';
import { TrainerProfile } from './types';
import { createPdfDocument, generatePDFPreview } from './core';
import { createExerciseProgram } from './exercise-program';
import { createDietPlan } from './diet-plan';
import { createSupplementPlan } from './supplement-plan';
import { getCurrentPersianDate } from '../persianDate';
import { toPersianDigits } from './pdf-fonts';

// تولید پیش‌نمایش PDF با UI مدرن - فقط 3 صفحه
export const previewStudentProgramPDF = async (student: Student): Promise<string> => {
  try {
    console.log(`در حال ایجاد پیش‌نمایش PDF برای ${student.name}`);
    const trainerProfileStr = localStorage.getItem('trainerProfile');
    const trainerProfile = trainerProfileStr ? JSON.parse(trainerProfileStr) : {} as TrainerProfile;
    const content: any[] = [];

    // صفحه ۱: برنامه تمرینی (بدون صفحه جداگانه برای هدر)
    content.push({
      text: 'برنامه تمرینی',
      style: 'documentTitle',
      margin: [0, 0, 0, 20],
      color: '#7c3aed'
    });

    content.push(...createExerciseProgram(student, trainerProfile));

    // صفحه ۲: برنامه غذایی
    content.push({ text: '', pageBreak: 'before' });
    content.push({
      text: 'برنامه غذایی',
      style: 'documentTitle',
      margin: [0, 0, 0, 20],
      color: '#27ae60'
    });
    content.push(...createDietPlan(student, trainerProfile));

    // صفحه ۳: برنامه مکمل
    content.push({ text: '', pageBreak: 'before' });
    content.push({
      text: 'برنامه مکمل و ویتامین',
      style: 'documentTitle',
      margin: [0, 0, 0, 20],
      color: '#e67e22'
    });
    content.push(...createSupplementPlan(student, trainerProfile));

    // ایجاد سند PDF
    const docDefinition = createPdfDocument(content);
    // تولید URL پیش‌نمایش
    const previewUrl = await generatePDFPreview(docDefinition);
    console.log(`پیش‌نمایش PDF با موفقیت ایجاد شد`);

    return previewUrl;

  } catch (error) {
    console.error("خطا در ایجاد پیش‌نمایش PDF:", error);
    throw new Error("خطا در تولید پیش‌نمایش - لطفاً مجدداً تلاش کنید");
  }
};
