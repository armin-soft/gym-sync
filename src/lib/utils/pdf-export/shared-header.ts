
import { Student } from '@/components/students/StudentTypes';
import { TrainerProfile } from './types';
import { getCurrentPersianDate } from '../persianDate';
import { toPersianDigits, preprocessPersianText } from './pdf-fonts';
import { modernTableLayout } from './modern-styles';

// ایجاد هدر مشترک مدرن
export function createSharedHeader(student: Student, trainerProfile: TrainerProfile): any[] {
  return [
    // نام باشگاه با طراحی مدرن
    {
      text: preprocessPersianText(trainerProfile.gymName || "باشگاه بدنسازی"),
      style: 'documentTitle',
      alignment: 'center',
      margin: [0, 0, 0, 20],
      color: '#1a365d',
      fontSize: 24,
      bold: true
    },
    
    // جدول اطلاعات با طراحی مدرن
    {
      table: {
        widths: ['16.66%', '16.66%', '16.66%', '16.66%', '16.66%', '16.67%'],
        body: [
          [
            { 
              text: preprocessPersianText(`نام مربی: ${trainerProfile.name || "-"}`), 
              style: 'tableCell',
              alignment: 'right',
              fontSize: 11,
              bold: true
            },
            { 
              text: preprocessPersianText(`نام شاگرد: ${student.name || "-"}`), 
              style: 'tableCell',
              alignment: 'right',
              fontSize: 11,
              bold: true
            },
            { 
              text: preprocessPersianText(`موبایل: ${toPersianDigits(student.phone || "-")}`), 
              style: 'tableCell',
              alignment: 'right',
              fontSize: 11
            },
            { 
              text: preprocessPersianText(`قد: ${toPersianDigits(student.height || 0)} سانتی‌متر`), 
              style: 'tableCell',
              alignment: 'right',
              fontSize: 11
            },
            { 
              text: preprocessPersianText(`وزن: ${toPersianDigits(student.weight || 0)} کیلوگرم`), 
              style: 'tableCell',
              alignment: 'right',
              fontSize: 11
            },
            { 
              text: preprocessPersianText(`تاریخ: ${getCurrentPersianDate()}`), 
              style: 'tableCell',
              alignment: 'right',
              fontSize: 11,
              bold: true
            }
          ]
        ]
      },
      layout: {
        fillColor: '#f7fafc',
        hLineWidth: () => 1.5,
        vLineWidth: () => 1,
        hLineColor: () => '#cbd5e0',
        vLineColor: () => '#cbd5e0',
        paddingLeft: () => 10,
        paddingRight: () => 10,
        paddingTop: () => 8,
        paddingBottom: () => 8
      },
      margin: [0, 0, 0, 35]
    }
  ];
}

// ایجاد پاورقی مدرن و حرفه‌ای
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

    // اضافه کردن شماره صفحه
    footerParts.push(`صفحه ${toPersianDigits(currentPage)} از ${toPersianDigits(pageCount)}`);

    return [
      // خط جداکننده
      {
        canvas: [
          {
            type: 'line',
            x1: 40, y1: 0,
            x2: 555, y2: 0,
            lineWidth: 1,
            lineColor: '#e2e8f0'
          }
        ],
        margin: [0, 10, 0, 5]
      },
      // متن پاورقی
      {
        text: preprocessPersianText(footerParts.join('  |  ')),
        alignment: 'center',
        fontSize: 9,
        margin: [0, 5, 0, 0],
        color: '#636363',
        direction: 'rtl'
      }
    ];
  };
}
