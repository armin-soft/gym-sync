
import { Student } from '@/components/students/StudentTypes';
import { TrainerProfile } from './types';
import { createPdfDocument, generatePDF } from './core';
import { createExerciseProgram } from './exercise-program';
import { createDietPlan } from './diet-plan';
import { createSupplementPlan } from './supplement-plan';
import { getCurrentPersianDate } from '../persianDate';
import { toPersianDigits } from './pdf-fonts';

// صادر کردن PDF کامپکت - فقط با داده‌های واقعی شاگرد
export const exportStudentProgramToPdf = async (student: Student): Promise<void> => {
  try {
    console.log(`شروع صدور PDF برای ${student.name} با داده‌های واقعی`);
    const trainerProfileStr = localStorage.getItem('trainerProfile');
    const trainerProfile = trainerProfileStr ? JSON.parse(trainerProfileStr) : {} as TrainerProfile;
    const content: any[] = [];

    // بررسی وجود داده‌های واقعی شاگرد
    const hasExerciseData = student.exercisesDay1?.length || student.exercisesDay2?.length || 
                           student.exercisesDay3?.length || student.exercisesDay4?.length || 
                           student.exercisesDay5?.length || student.exercises?.length;

    const hasDietData = student.mealsDay1?.length || student.mealsDay2?.length || 
                       student.mealsDay3?.length || student.mealsDay4?.length || 
                       student.mealsDay5?.length || student.mealsDay6?.length || 
                       student.mealsDay7?.length || student.meals?.length;

    const hasSupplementData = student.supplements?.length || student.vitamins?.length;

    // صفحه ۱: برنامه تمرینی
    if (hasExerciseData) {
      content.push({
        text: `برنامه تمرینی ${student.name}`,
        style: 'documentTitle',
        margin: [0, 0, 0, 20],
        color: '#7c3aed'
      });

      // اطلاعات خلاصه در همین صفحه
      content.push({
        table: {
          widths: ['25%', '25%', '25%', '25%'],
          body: [
            [
              { text: `نام: ${student.name}`, style: 'tableCell' },
              { text: `قد: ${toPersianDigits(student.height || 0)} سانتی‌متر`, style: 'tableCell' },
              { text: `وزن: ${toPersianDigits(student.weight || 0)} کیلوگرم`, style: 'tableCell' },
              { text: `تاریخ: ${getCurrentPersianDate()}`, style: 'tableCell' }
            ]
          ]
        },
        layout: {
          fillColor: '#f8fafc',
          hLineWidth: () => 1,
          vLineWidth: () => 1,
          hLineColor: () => '#e2e8f0',
          vLineColor: () => '#e2e8f0'
        },
        margin: [0, 0, 0, 20]
      });

      content.push(...createExerciseProgram(student, trainerProfile));
    }

    // صفحه ۲: برنامه غذایی
    if (hasDietData) {
      if (hasExerciseData) content.push({ text: '', pageBreak: 'before' });
      content.push({
        text: 'برنامه غذایی',
        style: 'documentTitle',
        margin: [0, 0, 0, 20],
        color: '#27ae60'
      });
      content.push(...createDietPlan(student, trainerProfile));
    }

    // صفحه ۳: برنامه مکمل
    if (hasSupplementData) {
      if (hasExerciseData || hasDietData) content.push({ text: '', pageBreak: 'before' });
      content.push({
        text: 'برنامه مکمل و ویتامین',
        style: 'documentTitle',
        margin: [0, 0, 0, 20],
        color: '#e67e22'
      });
      content.push(...createSupplementPlan(student, trainerProfile));
    }

    // اگر هیچ داده‌ای نبود، یک صفحه خالی با پیام نمایش بده
    if (!hasExerciseData && !hasDietData && !hasSupplementData) {
      content.push({
        text: `برنامه ${student.name}`,
        style: 'documentTitle',
        margin: [0, 0, 0, 40],
        color: '#4f46e5'
      });
      content.push({
        text: 'هیچ برنامه‌ای برای این شاگرد تعیین نشده است.',
        style: 'notes',
        alignment: 'center',
        direction: 'rtl',
        margin: [0, 50, 0, 50]
      });
    }

    // ایجاد سند PDF
    const docDefinition = createPdfDocument(content);

    // نام فایل مدرن
    const currentDate = getCurrentPersianDate().replace(/\s/g, '_').replace(/\//g, '-');
    const fileName = `برنامه_${student.name?.replace(/\s/g, '_')}_${currentDate}.pdf`;

    // دانلود PDF
    await generatePDF(docDefinition, fileName);
    console.log(`PDF با موفقیت صادر شد: ${fileName}`);
  } catch (error) {
    console.error("خطا در صدور PDF:", error);
    throw new Error("خطا در صدور فایل - لطفاً مجدداً تلاش کنید");
  }
};
