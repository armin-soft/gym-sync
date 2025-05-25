
import { Student } from '@/components/students/StudentTypes';
import { TrainerProfile } from './types';
import { createPdfDocument, generatePDF } from './core';
import { createExerciseProgram } from './exercise-program';
import { createDietPlan } from './diet-plan';
import { createSupplementPlan } from './supplement-plan';
import { getCurrentPersianDate } from '../persianDate';
import { toPersianDigits, preprocessPersianText } from './pdf-fonts';

// ایجاد هدر یکسان برای همه صفحات
function createUniformHeader(student: Student, trainerProfile: TrainerProfile): any[] {
  return [
    // نام باشگاه
    {
      text: preprocessPersianText(trainerProfile.gymName || "باشگاه بدنسازی"),
      style: 'documentTitle',
      alignment: 'center',
      margin: [0, 0, 0, 15],
      color: '#7c3aed',
      direction: 'rtl'
    },
    
    // اطلاعات کامل در یک جدول
    {
      table: {
        widths: ['16.66%', '16.66%', '16.66%', '16.66%', '16.66%', '16.67%'],
        body: [
          [
            { 
              text: preprocessPersianText(`نام مربی: ${trainerProfile.name || "-"}`), 
              style: 'tableCell',
              direction: 'rtl'
            },
            { 
              text: preprocessPersianText(`نام شاگرد: ${student.name || "-"}`), 
              style: 'tableCell',
              direction: 'rtl'
            },
            { 
              text: preprocessPersianText(`موبایل: ${toPersianDigits(student.phone || "-")}`), 
              style: 'tableCell',
              direction: 'rtl'
            },
            { 
              text: preprocessPersianText(`قد: ${toPersianDigits(student.height || 0)} سانتی‌متر`), 
              style: 'tableCell',
              direction: 'rtl'
            },
            { 
              text: preprocessPersianText(`وزن: ${toPersianDigits(student.weight || 0)} کیلوگرم`), 
              style: 'tableCell',
              direction: 'rtl'
            },
            { 
              text: preprocessPersianText(`تاریخ: ${getCurrentPersianDate()}`), 
              style: 'tableCell',
              direction: 'rtl'
            }
          ]
        ]
      },
      layout: {
        fillColor: '#f7fafc',
        hLineWidth: () => 1,
        vLineWidth: () => 1,
        hLineColor: () => '#e2e8f0',
        vLineColor: () => '#e2e8f0'
      },
      margin: [0, 0, 0, 20]
    }
  ];
}

// ایجاد پاورقی یکسان
function createUniformFooter(trainerProfile: TrainerProfile): any {
  return function(currentPage: number, pageCount: number) {
    const footerParts = [];

    // شماره تماس
    if (trainerProfile.phone) {
      footerParts.push(`شماره تماس: ${toPersianDigits(trainerProfile.phone)}`);
    }
    // وب‌سایت
    if (trainerProfile.website) {
      footerParts.push(`وب‌سایت: ${trainerProfile.website}`);
    }
    // اینستاگرام
    if (trainerProfile.instagram) {
      footerParts.push(`اینستاگرام: ${trainerProfile.instagram}`);
    }

    return {
      text: preprocessPersianText(footerParts.join('  |  ')),
      alignment: 'center',
      fontSize: 8,
      margin: [0, 10, 0, 0],
      direction: 'rtl',
      color: '#636363'
    };
  };
}

// صادر کردن PDF با ساختار جدید
export const exportStudentProgramToPdf = async (student: Student): Promise<void> => {
  try {
    console.log(`شروع صدور PDF برای ${student.name} با ساختار جدید`);
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
    content.push(...createUniformHeader(student, trainerProfile));
    
    if (hasExerciseData) {
      content.push({
        text: 'برنامه تمرینی',
        style: 'sectionTitle',
        margin: [0, 10, 0, 15],
        color: '#7c3aed',
        direction: 'rtl'
      });
      content.push(...createExerciseProgram(student, trainerProfile));
    } else {
      content.push({
        text: 'برنامه تمرینی',
        style: 'sectionTitle',
        margin: [0, 10, 0, 15],
        color: '#7c3aed',
        direction: 'rtl'
      });
      content.push({
        text: 'هیچ برنامه تمرینی برای این شاگرد تعیین نشده است.',
        style: 'notes',
        alignment: 'center',
        direction: 'rtl',
        margin: [0, 20, 0, 20]
      });
    }

    // صفحه ۲: برنامه غذایی
    content.push({ text: '', pageBreak: 'before' });
    content.push(...createUniformHeader(student, trainerProfile));
    
    if (hasDietData) {
      content.push({
        text: 'برنامه غذایی',
        style: 'sectionTitle',
        margin: [0, 10, 0, 15],
        color: '#27ae60',
        direction: 'rtl'
      });
      content.push(...createDietPlan(student, trainerProfile));
    } else {
      content.push({
        text: 'برنامه غذایی',
        style: 'sectionTitle',
        margin: [0, 10, 0, 15],
        color: '#27ae60',
        direction: 'rtl'
      });
      content.push({
        text: 'هیچ برنامه غذایی برای این شاگرد تعیین نشده است.',
        style: 'notes',
        alignment: 'center',
        direction: 'rtl',
        margin: [0, 20, 0, 20]
      });
    }

    // صفحه ۳: برنامه مکمل و ویتامین
    content.push({ text: '', pageBreak: 'before' });
    content.push(...createUniformHeader(student, trainerProfile));
    
    if (hasSupplementData) {
      content.push({
        text: 'برنامه مکمل و ویتامین',
        style: 'sectionTitle',
        margin: [0, 10, 0, 15],
        color: '#e67e22',
        direction: 'rtl'
      });
      content.push(...createSupplementPlan(student, trainerProfile));
    } else {
      content.push({
        text: 'برنامه مکمل و ویتامین',
        style: 'sectionTitle',
        margin: [0, 10, 0, 15],
        color: '#e67e22',
        direction: 'rtl'
      });
      content.push({
        text: 'هیچ برنامه مکمل یا ویتامینی برای این شاگرد تعیین نشده است.',
        style: 'notes',
        alignment: 'center',
        direction: 'rtl',
        margin: [0, 20, 0, 20]
      });
    }

    // ایجاد سند PDF با هدر و پاورقی یکسان
    const docDefinition = {
      ...createPdfDocument(content),
      footer: createUniformFooter(trainerProfile)
    };

    // نام فایل
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
