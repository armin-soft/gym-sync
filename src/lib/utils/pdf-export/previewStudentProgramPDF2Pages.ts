
import { Student } from '@/components/students/StudentTypes';
import { TrainerProfile } from './types';
import { createPdfDocument, generatePDFPreview } from './core';
import { createExerciseProgramPageOne, createExerciseProgramPageOneBack } from './exercise-program-page-one';
import { createDietProgramPageTwo, createSupplementProgramPageTwoBack } from './diet-program-page-two';
import { createSharedHeader, createSharedFooter } from './shared-header';

// تولید پیش‌نمایش PDF با 2 برگه (4 صفحه)
export const previewStudentProgramPDF2Pages = async (student: Student): Promise<string> => {
  try {
    console.log(`در حال ایجاد پیش‌نمایش PDF دو برگه‌ای (۴ صفحه) برای ${student.name}`);
    const trainerProfileStr = localStorage.getItem('trainerProfile');
    const trainerProfile = trainerProfileStr ? JSON.parse(trainerProfileStr) : {} as TrainerProfile;
    const content: any[] = [];

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

    // تولید URL پیش‌نمایش
    const previewUrl = await generatePDFPreview(docDefinition);
    console.log(`پیش‌نمایش PDF دو برگه‌ای (۴ صفحه) با موفقیت ایجاد شد`);

    return previewUrl;
  } catch (error) {
    console.error("خطا در ایجاد پیش‌نمایش PDF دو برگه‌ای:", error);
    throw new Error("خطا در تولید پیش‌نمایش - لطفاً مجدداً تلاش کنید");
  }
};
