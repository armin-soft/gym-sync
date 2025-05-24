
import { Student } from '@/components/students/StudentTypes';
import { TrainerProfile } from './types';
import { createPdfDocument, generatePDFPreview } from './core';
import { createExerciseProgram } from './exercise-program';
import { createDietPlan } from './diet-plan';
import { createSupplementPlan } from './supplement-plan';
import { getCurrentPersianDate } from '../persianDate';
import { toPersianDigits, preprocessPersianText } from './pdf-fonts';
import { createDocumentHeader } from '../pdf-layout';

// تولید پیش‌نمایش PDF با UI مدرن - فقط 3 صفحه، همراه با هدر کامل و پاورقی سفارشی
export const previewStudentProgramPDF = async (student: Student): Promise<string> => {
  try {
    console.log(`در حال ایجاد پیش‌نمایش PDF برای ${student.name}`);
    const trainerProfileStr = localStorage.getItem('trainerProfile');
    const trainerProfile = trainerProfileStr ? JSON.parse(trainerProfileStr) : {} as TrainerProfile;
    const content: any[] = [];

    // هدر کامل باشگاه + مربی + شاگرد
    content.push(
      ...createDocumentHeader(
        student,
        trainerProfile,
        'برنامه تمرینی و غذایی'
      )
    );

    // صفحه ۱: برنامه تمرینی
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
    console.log(`پیش‌نمایش PDF با موفقیت ایجاد شد`);

    return previewUrl;
  } catch (error) {
    console.error("خطا در ایجاد پیش‌نمایش PDF:", error);
    throw new Error("خطا در تولید پیش‌نمایش - لطفاً مجدداً تلاش کنید");
  }
};

