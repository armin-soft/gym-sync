
import { Student } from '@/components/students/StudentTypes';
import { TrainerProfile } from './types';
import { createPdfDocument, generatePDFPreview } from './core';
import { createExercisePage, createDietPage, createSupplementPage } from './pdf-page-builders';
import { createPageHeader, createFooter } from './pdf-header-footer';

// پیش‌نمایش PDF با 2 برگه (4 صفحه)
export const previewStudentProgramPDF2Pages = async (student: Student): Promise<string> => {
  try {
    console.log(`شروع پیش‌نمایش PDF برای ${student.name}`);
    const trainerProfileStr = localStorage.getItem('trainerProfile');
    const trainerProfile = trainerProfileStr ? JSON.parse(trainerProfileStr) : {} as TrainerProfile;
    
    const content: any[] = [];
    
    // هدر مشترک
    content.push(createPageHeader(student, trainerProfile));
    
    // صفحه اول - برنامه تمرینی
    content.push(...createExercisePage(student));
    
    // شکست صفحه برای صفحه دوم
    content.push({ text: '', pageBreak: 'before' });
    
    // هدر برای صفحه دوم
    content.push(createPageHeader(student, trainerProfile));
    
    // صفحه دوم - برنامه غذایی
    content.push(createDietPage(student));
    
    // شکست صفحه برای صفحه سوم
    content.push({ text: '', pageBreak: 'before' });
    
    // هدر برای صفحه سوم
    content.push(createPageHeader(student, trainerProfile));
    
    // صفحه سوم - مکمل‌ها و ویتامین‌ها
    content.push(createSupplementPage(student));
    
    // ایجاد سند PDF
    const docDefinition = {
      ...createPdfDocument(content),
      footer: createFooter(),
      defaultStyle: {
        font: 'Vazir',
        fontSize: 11,
        direction: 'rtl',
        alignment: 'right'
      },
      styles: {
        tableHeader: {
          bold: false, // غیرفعال کردن bold
          fontSize: 11,
          color: 'white',
          alignment: 'center',
          font: 'Vazir'
        },
        tableCell: {
          fontSize: 10,
          margin: [2, 4, 2, 4],
          font: 'Vazir'
        }
      }
    };
    
    // تولید پیش‌نمایش
    const previewUrl = await generatePDFPreview(docDefinition);
    console.log('پیش‌نمایش PDF با موفقیت تولید شد');
    return previewUrl;
  } catch (error) {
    console.error("خطا در تولید پیش‌نمایش PDF:", error);
    throw new Error("خطا در تولید پیش‌نمایش - لطفاً مجدداً تلاش کنید");
  }
};
