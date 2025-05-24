
import { Student } from '@/components/students/StudentTypes';
import { TrainerProfile } from './types';
import { toPersianDigits, preprocessPersianText } from './pdf-fonts';
import { getCurrentPersianDate } from '../persianDate';

// دریافت نسخه از Manifest.json
async function getAppVersion(): Promise<string> {
  try {
    const response = await fetch('./Manifest.json');
    const manifest = await response.json();
    return manifest.version;
  } catch (error) {
    console.error('خطا در بارگیری نسخه:', error);
    return '';
  }
}

// ایجاد هدر سند
export function createDocumentHeader(student: Student, trainerProfile: TrainerProfile, pageTitle: string): any[] {
  return [
    // هدر اصلی
    {
      table: {
        widths: ['*'],
        body: [
          [
            {
              text: preprocessPersianText(trainerProfile.gymName || "باشگاه بدنسازی"),
              style: 'header',
              fillColor: '#7c3aed',
              color: 'white',
              margin: [0, 10, 0, 10]
            }
          ],
          [
            {
              text: preprocessPersianText(`مربی: ${trainerProfile.name || "-"}`),
              alignment: 'center',
              fontSize: 14,
              color: '#666666',
              margin: [0, 5, 0, 10]
            }
          ]
        ]
      },
      layout: 'noBorders'
    },
    
    // عنوان صفحه
    {
      text: preprocessPersianText(pageTitle),
      style: 'subheader',
      alignment: 'center',
      margin: [0, 20, 0, 20]
    },
    
    // اطلاعات دانش‌آموز
    {
      table: {
        widths: ['25%', '25%', '25%', '25%'],
        body: [
          [
            { text: preprocessPersianText(`نام: ${student.name || "-"}`), style: 'tableCell' },
            { text: preprocessPersianText(`جنسیت: ${student.gender === 'male' ? 'مرد' : student.gender === 'female' ? 'زن' : '-'}`), style: 'tableCell' },
            { text: preprocessPersianText(`قد: ${toPersianDigits(student.height || 0)} سانتی‌متر`), style: 'tableCell' },
            { text: preprocessPersianText(`وزن: ${toPersianDigits(student.weight || 0)} کیلوگرم`), style: 'tableCell' }
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
    },
    
    // تاریخ
    {
      text: preprocessPersianText(`تاریخ: ${getCurrentPersianDate()}`),
      alignment: 'left',
      fontSize: 10,
      margin: [0, 0, 0, 30]
    }
  ];
}

// افزودن پاورقی
export async function addPageFooter(trainerProfile: TrainerProfile): Promise<any> {
  const appVersion = await getAppVersion();
  
  return {
    text: [
      { text: preprocessPersianText(`تهیه شده توسط نرم‌افزار GymSync نسخه ${toPersianDigits(appVersion)}`), fontSize: 8, alignment: 'center' },
      trainerProfile.phone ? { text: preprocessPersianText(` | شماره تماس: ${toPersianDigits(trainerProfile.phone)}`), fontSize: 8 } : ''
    ],
    alignment: 'center',
    margin: [0, 20, 0, 0]
  };
}
