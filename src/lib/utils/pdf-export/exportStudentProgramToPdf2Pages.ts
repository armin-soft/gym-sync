
import { Student } from '@/components/students/StudentTypes';
import { TrainerProfile } from './types';
import { createPdfDocument, generatePDF } from './core';
import { createExerciseProgramPageOne, createExerciseProgramPageOneBack } from './exercise-program-page-one';
import { createDietProgramPageTwo, createSupplementProgramPageTwoBack } from './diet-program-page-two';
import { createSharedHeader, createSharedFooter } from './shared-header';
import { getCurrentPersianDate } from '../persianDate';

// صادر کردن PDF با 2 برگه (4 صفحه)
export const exportStudentProgramToPdf2Pages = async (student: Student): Promise<void> => {
  try {
    console.log(`شروع صدور PDF دو برگه‌ای (۴ صفحه) برای ${student.name}`);
    const trainerProfileStr = localStorage.getItem('trainerProfile');
    const trainerProfile = trainerProfileStr ? JSON.parse(trainerProfileStr) : {} as TrainerProfile;
    const content: any[] = [];

    // بررسی وجود داده‌های واقعی شاگرد
    const hasExerciseData = student.exercisesDay1?.length || student.exercisesDay2?.length || 
                           student.exercisesDay3?.length || student.exercisesDay4?.length || 
                           student.exercisesDay5?.length || student.exercisesDay6?.length;

    const hasDietData = student.mealsDay1?.length || student.mealsDay2?.length || 
                       student.mealsDay3?.length || student.mealsDay4?.length || 
                       student.mealsDay5?.length || student.mealsDay6?.length || 
                       student.mealsDay7?.length;

    const hasSupplementData = student.supplements?.length || student.vitamins?.length;

    // هدر مشترک فقط یکبار در ابتدا
    content.push(...createSharedHeader(student, trainerProfile));

    // صفحه ۱: برنامه تمرینی روزهای ۱ تا ۴
    content.push(...createExerciseProgramPageOne(student, trainerProfile));

    // شکست صفحه برای پشت صفحه اول
    content.push({ text: '', pageBreak: 'before' });

    // صفحه ۲ (پشت صفحه ۱): برنامه تمرینی روزهای ۵ و ۶
    content.push(...createExerciseProgramPageOneBack(student, trainerProfile));

    // شکست صفحه برای برگه دوم
    content.push({ text: '', pageBreak: 'before' });

    // صفحه ۳ (روی برگه ۲): برنامه غذایی ۷ روز
    content.push(...createDietProgramPageTwo(student, trainerProfile));

    // شکست صفحه برای پشت برگه دوم
    content.push({ text: '', pageBreak: 'before' });

    // صفحه ۴ (پشت برگه ۲): مکمل‌ها و ویتامین‌ها
    content.push(...createSupplementProgramPageTwoBack(student, trainerProfile));

    // ایجاد سند PDF با هدر و پاورقی مشترک
    const docDefinition = {
      ...createPdfDocument(content),
      footer: createSharedFooter(trainerProfile)
    };

    // نام فایل
    const currentDate = getCurrentPersianDate().replace(/\s/g, '_').replace(/\//g, '-');
    const fileName = `برنامه_کامل_${student.name?.replace(/\s/g, '_')}_${currentDate}.pdf`;

    // دانلود PDF
    await generatePDF(docDefinition, fileName);
    console.log(`PDF دو برگه‌ای (۴ صفحه) با موفقیت صادر شد: ${fileName}`);
  } catch (error) {
    console.error("خطا در صدور PDF دو برگه‌ای:", error);
    throw new Error("خطا در صدور فایل - لطفاً مجدداً تلاش کنید");
  }
};
