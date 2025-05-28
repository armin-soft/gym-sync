
import { Student } from '@/components/students/StudentTypes';
import { TrainerProfile } from './types';
import { preprocessPersianText, toPersianDigits } from './pdf-fonts';

export function createCustomHeader(student: Student, trainerProfile: TrainerProfile): any[] {
  // سبک مدرن: اطلاعات شاگرد در یک ستون و باشگاه کنار آن در ستون دیگر
  return [
    {
      table: {
        widths: ['55%', '45%'],
        body: [[
          {
            stack: [
              { text: preprocessPersianText(`شاگرد: ${student.name ?? '-'}`), style: 'tableCell', fontSize: 14, margin: [0, 0, 0, 5] },
              { text: preprocessPersianText(`شماره موبایل: ${toPersianDigits(student.phone ?? '-')}`), style: 'tableCell', fontSize: 12 },
              { text: preprocessPersianText(`قد: ${toPersianDigits(student.height ?? 0)} سانتی متر`), style: 'tableCell', fontSize: 12 },
              { text: preprocessPersianText(`وزن: ${toPersianDigits(student.weight ?? 0)} کیلوگرم`), style: 'tableCell', fontSize: 12 }
            ],
            alignment: 'right',
            border: [false, false, false, false]
          },
          {
            stack: [
              { text: preprocessPersianText(`باشگاه: ${trainerProfile.gymName ?? '-'}`), style: 'tableCell', fontSize: 14, margin: [0, 0, 0, 8] },
              { text: preprocessPersianText(`مربی: ${trainerProfile.name ?? '-'}`), style: 'tableCell', fontSize: 12 }
            ],
            alignment: 'left',
            border: [false, false, false, false]
          }
        ]]
      },
      layout: 'noBorders',
      margin: [20, 8, 20, 25]
    }
  ];
}
