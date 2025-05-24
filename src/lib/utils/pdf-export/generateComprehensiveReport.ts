
import { Student } from '@/components/students/StudentTypes';
import { TrainerProfile } from './types';
import { createPdfDocument, generatePDF } from './core';
import { createExerciseProgram } from './exercise-program';
import { createDietPlan } from './diet-plan';
import { createSupplementPlan } from './supplement-plan';
import { getCurrentPersianDate } from '../persianDate';

// تولید گزارش کامل PDF - فقط با داده‌های واقعی شاگرد
export const generateComprehensiveReport = async (student: Student): Promise<void> => {
  try {
    console.log(`در حال تولید گزارش کامل برای ${student.name} با داده‌های واقعی`);
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

    // صفحه ۱: عنوان گزارش
    content.push({
      text: `گزارش جامع ${student.name}`,
      style: 'documentTitle',
      margin: [0, 0, 0, 20],
      color: '#4f46e5'
    });

    content.push({
      text: getCurrentPersianDate(),
      style: 'subheader',
      alignment: 'center',
      margin: [0, 0, 0, 20]
    });

    // برنامه تمرینی (در صورت وجود)
    if (hasExerciseData) {
      content.push(...createExerciseProgram(student, trainerProfile));
    } else {
      content.push({
        text: 'برنامه تمرینی تعیین نشده است.',
        style: 'notes',
        alignment: 'center',
        direction: 'rtl',
        margin: [0, 20, 0, 20]
      });
    }

    // صفحه ۲: برنامه غذایی (در صورت وجود)
    if (hasDietData) {
      content.push({ text: '', pageBreak: 'before' });
      content.push(...createDietPlan(student, trainerProfile));
    } else {
      content.push({ text: '', pageBreak: 'before' });
      content.push({
        text: 'برنامه غذایی تعیین نشده است.',
        style: 'notes',
        alignment: 'center',
        direction: 'rtl',
        margin: [0, 20, 0, 20]
      });
    }

    // صفحه ۳: برنامه مکمل (در صورت وجود)
    if (hasSupplementData) {
      content.push({ text: '', pageBreak: 'before' });
      content.push(...createSupplementPlan(student, trainerProfile));
    } else {
      content.push({ text: '', pageBreak: 'before' });
      content.push({
        text: 'برنامه مکمل و ویتامین تعیین نشده است.',
        style: 'notes',
        alignment: 'center',
        direction: 'rtl',
        margin: [0, 20, 0, 20]
      });
    }

    const docDefinition = createPdfDocument(content);
    const fileName = `گزارش_کامل_${student.name?.replace(/\s/g, '_')}_${getCurrentPersianDate().replace(/\s/g, '_')}.pdf`;
    await generatePDF(docDefinition, fileName);

    console.log(`گزارش کامل با موفقیت تولید شد`);
  } catch (error) {
    console.error("خطا در تولید گزارش کامل:", error);
    throw error;
  }
};
