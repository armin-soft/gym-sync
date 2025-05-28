
import { Student } from '@/components/students/StudentTypes';
import { TrainerProfile } from './types';
import { toPersianDigits, preprocessPersianText } from './pdf-fonts';

// ایجاد هدر صفحه
export function createPageHeader(student: Student, trainerProfile: TrainerProfile): any {
  return {
    table: {
      widths: ['50%', '50%'],
      body: [
        [
          {
            stack: [
              { text: preprocessPersianText(`شاگرد: ${student.name || '-'}`), fontSize: 12, bold: false, margin: [0, 0, 0, 3] },
              { text: preprocessPersianText(`شماره موبایل: ${toPersianDigits(student.phone || '-')}`), fontSize: 10, margin: [0, 0, 0, 3] },
              { text: preprocessPersianText(`قد: ${toPersianDigits(student.height || '0')} سانتی‌متر`), fontSize: 10, margin: [0, 0, 0, 3] },
              { text: preprocessPersianText(`وزن: ${toPersianDigits(student.weight || '0')} کیلوگرم`), fontSize: 10 }
            ],
            alignment: 'right'
          },
          {
            stack: [
              { text: preprocessPersianText(`باشگاه: ${trainerProfile.gymName || 'فیکس'}`), fontSize: 12, bold: false, margin: [0, 0, 0, 3] },
              { text: preprocessPersianText(`مربی: ${trainerProfile.name || 'محمد عباسی'}`), fontSize: 10 }
            ],
            alignment: 'right'
          }
        ]
      ]
    },
    layout: 'noBorders',
    margin: [0, 0, 0, 30]
  };
}

// ایجاد پاورقی
export function createFooter(): any {
  return function(currentPage: number, pageCount: number) {
    return [
      {
        text: preprocessPersianText(`@mohamadabasi_fix - ${toPersianDigits('09123823886')} - gym-fix.ir`),
        alignment: 'center',
        fontSize: 9,
        margin: [0, 10, 0, 0],
        color: '#666666'
      }
    ];
  };
}
