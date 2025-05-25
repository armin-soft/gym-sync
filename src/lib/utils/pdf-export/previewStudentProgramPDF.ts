
import { Student } from '@/components/students/StudentTypes';
import { TrainerProfile } from './types';
import { createPdfDocument, generatePDFPreview } from './core';
import { createExerciseProgram } from './exercise-program';
import { createDietPlan } from './diet-plan';
import { createSupplementPlan } from './supplement-plan';
import { getCurrentPersianDate } from '../persianDate';
import { toPersianDigits, preprocessPersianText } from './pdf-fonts';
import { createDocumentHeader } from '../pdf-layout';

// تولید پیش‌نمایش PDF با داده‌های واقعی شاگرد - بدون داده پیش‌فرض
export const previewStudentProgramPDF = async (student: Student): Promise<string> => {
  try {
    console.log(`در حال ایجاد پیش‌نمایش PDF برای ${student.name} با داده‌های واقعی`);
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

    const hasSupplementData = student.supplements?.length || student.vitamins?.length ||
                             student.supplementsDay1?.length || student.vitaminsDay1?.length;

    // هدر کامل باشگاه + مربی + شاگرد
    content.push(
      ...createDocumentHeader(
        student,
        trainerProfile,
        'برنامه تمرینی و غذایی'
      )
    );

    // صفحه ۱: برنامه تمرینی (فقط در صورت وجود داده)
    if (hasExerciseData) {
      content.push({
        text: 'برنامه تمرینی',
        style: 'documentTitle',
        margin: [0, 0, 0, 20],
        color: '#7c3aed'
      });
      content.push(...createExerciseProgram(student, trainerProfile));
    } else {
      content.push({
        text: 'برنامه تمرینی',
        style: 'documentTitle',
        margin: [0, 0, 0, 20],
        color: '#7c3aed'
      });
      content.push({
        text: 'هیچ برنامه تمرینی برای این شاگرد تعیین نشده است.',
        style: 'notes',
        alignment: 'center',
        direction: 'rtl',
        margin: [0, 20, 0, 20]
      });
    }

    // صفحه ۲: برنامه غذایی (فقط در صورت وجود داده)
    content.push({ text: '', pageBreak: 'before' });
    if (hasDietData) {
      content.push({
        text: 'برنامه غذایی',
        style: 'documentTitle',
        margin: [0, 0, 0, 20],
        color: '#27ae60'
      });
      content.push(...createDietPlan(student, trainerProfile));
    } else {
      content.push({
        text: 'برنامه غذایی',
        style: 'documentTitle',
        margin: [0, 0, 0, 20],
        color: '#27ae60'
      });
      content.push({
        text: 'هیچ برنامه غذایی برای این شاگرد تعیین نشده است.',
        style: 'notes',
        alignment: 'center',
        direction: 'rtl',
        margin: [0, 20, 0, 20]
      });
    }

    // صفحه ۳: برنامه مکمل (فقط در صورت وجود داده)
    content.push({ text: '', pageBreak: 'before' });
    if (hasSupplementData) {
      content.push({
        text: 'برنامه مکمل و ویتامین',
        style: 'documentTitle',
        margin: [0, 0, 0, 20],
        color: '#e67e22'
      });
      content.push(...createSupplementPlan(student, trainerProfile));
    } else {
      content.push({
        text: 'برنامه مکمل و ویتامین',
        style: 'documentTitle',
        margin: [0, 0, 0, 20],
        color: '#e67e22'
      });
      content.push({
        text: 'هیچ برنامه مکمل یا ویتامینی برای این شاگرد تعیین نشده است.',
        style: 'notes',
        alignment: 'center',
        direction: 'rtl',
        margin: [0, 20, 0, 20]
      });
    }

    // پاورقی سفارشی فقط: شماره موبایل، سایت، اینستاگرام
    const footer = function(currentPage: number, pageCount: number) {
      const footerParts = [];

      // شماره تماس
      if (trainerProfile.phone) {
        footerParts.push({
          text: preprocessPersianText(`شماره تماس: ${toPersianDigits(trainerProfile.phone)}`),
          fontSize: 8,
          margin: [5, 0, 5, 0],
          direction: 'rtl'
        });
      }
      // سایت
      if (trainerProfile.website) {
        footerParts.push({
          text: preprocessPersianText(`وب‌سایت: ${trainerProfile.website}`),
          fontSize: 8,
          margin: [5, 0, 5, 0],
          direction: 'rtl'
        });
      }
      // اینستاگرام
      if (trainerProfile.instagram) {
        footerParts.push({
          text: preprocessPersianText(`اینستاگرام: ${trainerProfile.instagram}`),
          fontSize: 8,
          margin: [5, 0, 5, 0],
          direction: 'rtl'
        });
      }
      // چینش افقی پاورقی
      return {
        columns: [
          {
            text: footerParts.map(part => part.text).join('  |  '),
            fontSize: 8,
            alignment: 'center',
            margin: [0, 10, 0, 0],
            direction: 'rtl',
            color: '#636363'
          }
        ]
      };
    };

    // ایجاد سند PDF با هدر کامل و پاورقی سفارشی
    const docDefinition = {
      ...createPdfDocument(content),
      footer
    };
    // تولید URL پیش‌نمایش
    const previewUrl = await generatePDFPreview(docDefinition);
    console.log(`پیش‌نمایش PDF با داده‌های واقعی شاگرد با موفقیت ایجاد شد`);

    return previewUrl;
  } catch (error) {
    console.error("خطا در ایجاد پیش‌نمایش PDF:", error);
    throw new Error("خطا در تولید پیش‌نمایش - لطفاً مجدداً تلاش کنید");
  }
};
