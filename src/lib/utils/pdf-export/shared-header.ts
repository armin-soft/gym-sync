
import { Student } from '@/components/students/StudentTypes';
import { TrainerProfile } from './types';
import { getCurrentPersianDate } from '../persianDate';
import { toPersianDigits, preprocessPersianText } from './pdf-fonts';

// ایجاد هدر مشترک که فقط یکبار در ابتدای PDF نمایش داده می‌شود
export function createSharedHeader(student: Student, trainerProfile: TrainerProfile): any[] {
  return [
    // نام باشگاه
    {
      text: preprocessPersianText(trainerProfile.gymName || "باشگاه بدنسازی"),
      style: 'documentTitle',
      alignment: 'center',
      margin: [0, 0, 0, 15],
      color: '#7c3aed'
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
              alignment: 'right'
            },
            { 
              text: preprocessPersianText(`نام شاگرد: ${student.name || "-"}`), 
              style: 'tableCell',
              alignment: 'right'
            },
            { 
              text: preprocessPersianText(`موبایل: ${toPersianDigits(student.phone || "-")}`), 
              style: 'tableCell',
              alignment: 'right'
            },
            { 
              text: preprocessPersianText(`قد: ${toPersianDigits(student.height || 0)} سانتی‌متر`), 
              style: 'tableCell',
              alignment: 'right'
            },
            { 
              text: preprocessPersianText(`وزن: ${toPersianDigits(student.weight || 0)} کیلوگرم`), 
              style: 'tableCell',
              alignment: 'right'
            },
            { 
              text: preprocessPersianText(`تاریخ: ${getCurrentPersianDate()}`), 
              style: 'tableCell',
              alignment: 'right'
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
      margin: [0, 0, 0, 30]
    }
  ];
}

// ایجاد پاورقی مشترک
export function createSharedFooter(trainerProfile: TrainerProfile): any {
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
      color: '#636363'
    };
  };
}
