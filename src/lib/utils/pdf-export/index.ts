
import { Student } from '@/components/students/StudentTypes';
import { TrainerProfile } from './types';
import { createPdfDocument, generatePDF, generatePDFPreview } from './core';
import { createExerciseProgram } from './exercise-program';
import { createDietPlan } from './diet-plan';
import { createSupplementPlan } from './supplement-plan';
import { getCurrentPersianDate } from '../persianDate';
import { toPersianDigits } from './pdf-fonts';

// تولید پیش‌نمایش PDF با UI مدرن - فقط 3 صفحه
export const previewStudentProgramPDF = async (student: Student): Promise<string> => {
  try {
    console.log(`در حال ایجاد پیش‌نمایش PDF برای ${student.name}`);
    
    // دریافت پروفایل مربی
    const trainerProfileStr = localStorage.getItem('trainerProfile');
    const trainerProfile = trainerProfileStr ? JSON.parse(trainerProfileStr) : {} as TrainerProfile;
    
    // ایجاد محتوای PDF کامپکت
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

// صادر کردن PDF کامپکت - فقط 3 صفحه
export const exportStudentProgramToPdf = async (student: Student): Promise<void> => {
  try {
    console.log(`شروع صدور PDF برای ${student.name}`);
    
    // دریافت پروفایل مربی
    const trainerProfileStr = localStorage.getItem('trainerProfile');
    const trainerProfile = trainerProfileStr ? JSON.parse(trainerProfileStr) : {} as TrainerProfile;
    
    // ایجاد محتوای PDF کامپکت
    const content: any[] = [];
    
    // صفحه ۱: برنامه تمرینی
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

// تولید گزارش کامل PDF - فقط 3 صفحه
export const generateComprehensiveReport = async (student: Student): Promise<void> => {
  try {
    console.log(`در حال تولید گزارش کامل برای ${student.name}`);
    
    const trainerProfileStr = localStorage.getItem('trainerProfile');
    const trainerProfile = trainerProfileStr ? JSON.parse(trainerProfileStr) : {} as TrainerProfile;
    
    const content: any[] = [];
    
    // صفحه ۱: برنامه تمرینی
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
    
    content.push(...createExerciseProgram(student, trainerProfile));
    
    // صفحه ۲: برنامه غذایی
    content.push({ text: '', pageBreak: 'before' });
    content.push(...createDietPlan(student, trainerProfile));
    
    // صفحه ۳: برنامه مکمل
    content.push({ text: '', pageBreak: 'before' });
    content.push(...createSupplementPlan(student, trainerProfile));
    
    const docDefinition = createPdfDocument(content);
    
    const fileName = `گزارش_کامل_${student.name?.replace(/\s/g, '_')}_${getCurrentPersianDate().replace(/\s/g, '_')}.pdf`;
    await generatePDF(docDefinition, fileName);
    
    console.log(`گزارش کامل با موفقیت تولید شد`);
    
  } catch (error) {
    console.error("خطا در تولید گزارش کامل:", error);
    throw error;
  }
};

// صادر کردن همه ماژول‌ها
export * from './types';
export * from './core';
export * from './data-helpers';
