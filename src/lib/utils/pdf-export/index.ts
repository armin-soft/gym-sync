
import { Student } from '@/components/students/StudentTypes';
import { TrainerProfile } from './types';
import { createPdfDocument, generatePDF, generatePDFPreview } from './core';
import { createDocumentHeader, addPageFooter } from '../pdf-layout';
import { createExerciseProgram } from './exercise-program';
import { createDietPlan } from './diet-plan';
import { createSupplementPlan } from './supplement-plan';
import { getCurrentPersianDate } from '../persianDate';
import { toPersianDigits } from './pdf-fonts';

// تولید پیش‌نمایش PDF با UI مدرن
export const previewStudentProgramPDF = async (student: Student): Promise<string> => {
  try {
    console.log(`🔄 در حال ایجاد پیش‌نمایش PDF برای ${student.name}`);
    
    // دریافت پروفایل مربی
    const trainerProfileStr = localStorage.getItem('trainerProfile');
    const trainerProfile = trainerProfileStr ? JSON.parse(trainerProfileStr) : {} as TrainerProfile;
    
    // ایجاد محتوای PDF با طراحی مدرن
    const content: any[] = [];
    
    // عنوان اصلی سند
    content.push({
      text: `برنامه جامع تمرینی و تغذیه‌ای ${student.name}`,
      style: 'documentTitle',
      margin: [0, 0, 0, 40]
    });
    
    // صفحه ۱: برنامه تمرینی
    content.push(...createDocumentHeader(student, trainerProfile, "💪 برنامه تمرینی"));
    content.push(...createExerciseProgram(student, trainerProfile));
    
    // صفحه ۲: برنامه غذایی
    content.push({ text: '', pageBreak: 'before' });
    content.push(...createDocumentHeader(student, trainerProfile, "🍎 برنامه غذایی"));
    content.push(...createDietPlan(student, trainerProfile));
    
    // صفحه ۳: برنامه مکمل
    content.push({ text: '', pageBreak: 'before' });
    content.push(...createDocumentHeader(student, trainerProfile, "💊 برنامه مکمل و ویتامین"));
    content.push(...createSupplementPlan(student, trainerProfile));
    
    // پاورقی مدرن
    const footer = await addPageFooter(trainerProfile);
    
    // ایجاد سند PDF
    const docDefinition = createPdfDocument(content);
    docDefinition.footer = footer;
    
    // تولید URL پیش‌نمایش
    const previewUrl = await generatePDFPreview(docDefinition);
    console.log(`✅ پیش‌نمایش PDF با موفقیت ایجاد شد`);
    
    return previewUrl;
    
  } catch (error) {
    console.error("❌ خطا در ایجاد پیش‌نمایش PDF:", error);
    throw new Error("خطا در تولید پیش‌نمایش - لطفاً مجدداً تلاش کنید");
  }
};

// صادر کردن PDF با نمایش پیشرفت
export const exportStudentProgramToPdf = async (student: Student): Promise<void> => {
  try {
    console.log(`🚀 شروع صدور PDF برای ${student.name}`);
    
    // دریافت پروفایل مربی
    const trainerProfileStr = localStorage.getItem('trainerProfile');
    const trainerProfile = trainerProfileStr ? JSON.parse(trainerProfileStr) : {} as TrainerProfile;
    
    // ایجاد محتوای PDF
    const content: any[] = [];
    
    // عنوان اصلی سند
    content.push({
      text: `برنامه جامع تمرینی و تغذیه‌ای ${student.name}`,
      style: 'documentTitle',
      margin: [0, 0, 0, 40]
    });
    
    // اطلاعات خلاصه
    content.push({
      table: {
        widths: ['*'],
        body: [
          [{
            text: '📋 خلاصه اطلاعات',
            style: 'sectionTitle',
            fillColor: '#eff6ff',
            border: [false, false, false, false],
            margin: [10, 10, 10, 10]
          }],
          [{
            table: {
              widths: ['25%', '25%', '25%', '25%'],
              body: [
                [
                  { text: `👤 نام: ${student.name}`, style: 'tableCell' },
                  { text: `📏 قد: ${toPersianDigits(student.height || 0)} سانتی‌متر`, style: 'tableCell' },
                  { text: `⚖️ وزن: ${toPersianDigits(student.weight || 0)} کیلوگرم`, style: 'tableCell' },
                  { text: `📅 تاریخ: ${getCurrentPersianDate()}`, style: 'tableCell' }
                ]
              ]
            },
            border: [false, false, false, false]
          }]
        ]
      },
      margin: [0, 0, 0, 30]
    });
    
    // صفحه ۱: برنامه تمرینی
    content.push(...createExerciseProgram(student, trainerProfile));
    
    // صفحه ۲: برنامه غذایی
    content.push({ text: '', pageBreak: 'before' });
    content.push(...createDietPlan(student, trainerProfile));
    
    // صفحه ۳: برنامه مکمل
    content.push({ text: '', pageBreak: 'before' });
    content.push(...createSupplementPlan(student, trainerProfile));
    
    // پاورقی
    const footer = await addPageFooter(trainerProfile);
    
    // ایجاد سند PDF
    const docDefinition = createPdfDocument(content);
    docDefinition.footer = footer;
    
    // نام فایل مدرن
    const currentDate = getCurrentPersianDate().replace(/\s/g, '_').replace(/\//g, '-');
    const fileName = `برنامه_جامع_${student.name?.replace(/\s/g, '_')}_${currentDate}.pdf`;
    
    // دانلود PDF
    await generatePDF(docDefinition, fileName);
    console.log(`✅ PDF با موفقیت صادر شد: ${fileName}`);
    
  } catch (error) {
    console.error("❌ خطا در صدور PDF:", error);
    throw new Error("خطا در صدور فایل - لطفاً مجدداً تلاش کنید");
  }
};

// تولید گزارش کامل PDF
export const generateComprehensiveReport = async (student: Student): Promise<void> => {
  try {
    console.log(`📊 در حال تولید گزارش کامل برای ${student.name}`);
    
    const trainerProfileStr = localStorage.getItem('trainerProfile');
    const trainerProfile = trainerProfileStr ? JSON.parse(trainerProfileStr) : {} as TrainerProfile;
    
    const content: any[] = [];
    
    // جلد گزارش
    content.push({
      text: '📈 گزارش جامع پیشرفت و برنامه‌ریزی',
      style: 'documentTitle',
      margin: [0, 100, 0, 50]
    });
    
    content.push({
      text: `آماده شده برای: ${student.name}`,
      style: 'header',
      margin: [0, 0, 0, 20]
    });
    
    content.push({
      text: getCurrentPersianDate(),
      style: 'subheader',
      alignment: 'center',
      margin: [0, 0, 0, 100]
    });
    
    // محتوای گزارش در صفحات بعدی
    content.push({ text: '', pageBreak: 'before' });
    content.push(...createDocumentHeader(student, trainerProfile, "گزارش کامل"));
    content.push(...createExerciseProgram(student, trainerProfile));
    content.push({ text: '', pageBreak: 'before' });
    content.push(...createDietPlan(student, trainerProfile));
    content.push({ text: '', pageBreak: 'before' });
    content.push(...createSupplementPlan(student, trainerProfile));
    
    const footer = await addPageFooter(trainerProfile);
    const docDefinition = createPdfDocument(content);
    docDefinition.footer = footer;
    
    const fileName = `گزارش_کامل_${student.name?.replace(/\s/g, '_')}_${getCurrentPersianDate().replace(/\s/g, '_')}.pdf`;
    await generatePDF(docDefinition, fileName);
    
    console.log(`✅ گزارش کامل با موفقیت تولید شد`);
    
  } catch (error) {
    console.error("❌ خطا در تولید گزارش کامل:", error);
    throw error;
  }
};

// صادر کردن همه ماژول‌ها
export * from './types';
export * from './core';
export * from './data-helpers';
