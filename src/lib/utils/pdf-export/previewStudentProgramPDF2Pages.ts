
import { Student } from '@/components/students/StudentTypes';
import { TrainerProfile } from './types';
import { createPdfDocument, generatePDFPreview } from './core';
import { createExerciseProgramPageOne } from './exercise-program-page-one';
import { createDietAndSupplementPageTwo } from './diet-supplement-page-two';
import { createSharedHeader, createSharedFooter } from './shared-header';

// تولید پیش‌نمایش PDF با 2 صفحه مجزا
export const previewStudentProgramPDF2Pages = async (student: Student): Promise<string> => {
  try {
    console.log(`در حال ایجاد پیش‌نمایش PDF دو صفحه‌ای برای ${student.name}`);
    const trainerProfileStr = localStorage.getItem('trainerProfile');
    const trainerProfile = trainerProfileStr ? JSON.parse(trainerProfileStr) : {} as TrainerProfile;
    const content: any[] = [];

    // بررسی وجود داده‌های واقعی شاگرد
    const hasExerciseData = student.exercisesDay1?.length || student.exercisesDay2?.length || 
                           student.exercisesDay3?.length || student.exercisesDay4?.length || 
                           student.exercisesDay5?.length || student.exercisesDay6?.length || 
                           student.exercises?.length;

    const hasDietData = student.mealsDay1?.length || student.mealsDay2?.length || 
                       student.mealsDay3?.length || student.mealsDay4?.length || 
                       student.mealsDay5?.length || student.mealsDay6?.length || 
                       student.mealsDay7?.length || student.meals?.length;

    const hasSupplementData = student.supplements?.length || student.vitamins?.length;

    // هدر مشترک فقط یکبار در ابتدا
    content.push(...createSharedHeader(student, trainerProfile));

    // صفحه اول: فقط برنامه تمرینی
    if (hasExerciseData) {
      content.push(...createExerciseProgramPageOne(student, trainerProfile));
    } else {
      content.push({
        text: 'برنامه تمرینی',
        style: 'sectionTitle',
        margin: [0, 20, 0, 15],
        color: '#7c3aed',
        direction: 'rtl'
      });
      content.push({
        text: 'هیچ برنامه تمرینی برای این شاگرد تعیین نشده است.',
        style: 'notes',
        alignment: 'center',
        direction: 'rtl',
        margin: [0, 20, 0, 40]
      });
    }

    // شکست صفحه قبل از صفحه دوم
    content.push({ text: '', pageBreak: 'before' });

    // صفحه دوم: برنامه غذایی و مکمل/ویتامین
    if (hasDietData || hasSupplementData) {
      content.push(...createDietAndSupplementPageTwo(student, trainerProfile));
    } else {
      content.push({
        text: 'برنامه غذایی و مکمل',
        style: 'sectionTitle',
        margin: [0, 20, 0, 15],
        color: '#27ae60',
        direction: 'rtl'
      });
      content.push({
        text: 'هیچ برنامه غذایی یا مکملی برای این شاگرد تعیین نشده است.',
        style: 'notes',
        alignment: 'center',
        direction: 'rtl',
        margin: [0, 20, 0, 20]
      });
    }

    // ایجاد سند PDF با هدر و پاورقی مشترک
    const docDefinition = {
      ...createPdfDocument(content),
      footer: createSharedFooter(trainerProfile)
    };

    // تولید URL پیش‌نمایش
    const previewUrl = await generatePDFPreview(docDefinition);
    console.log(`پیش‌نمایش PDF دو صفحه‌ای با موفقیت ایجاد شد`);

    return previewUrl;
  } catch (error) {
    console.error("خطا در ایجاد پیش‌نمایش PDF دو صفحه‌ای:", error);
    throw new Error("خطا در تولید پیش‌نمایش - لطفاً مجدداً تلاش کنید");
  }
};
