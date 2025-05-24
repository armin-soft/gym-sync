
import { Student } from '@/components/students/StudentTypes';
import { TrainerProfile, TableCellContent } from './types';
import { toPersianDigits, preprocessPersianText } from './pdf-fonts';
import { getSupplementName, getSupplementType } from './data-helpers';

// ایجاد برنامه مکمل و ویتامین کامپکت
export function createSupplementPlan(student: Student, trainerProfile: TrainerProfile): any[] {
  const content: any[] = [];
  
  // جدول کامپکت مکمل‌ها و ویتامین‌ها
  const tableData: (TableCellContent | { text: string; style: string })[][] = [
    [
      { text: 'ردیف', style: 'tableHeader', direction: 'rtl' },
      { text: 'نوع', style: 'tableHeader', direction: 'rtl' },
      { text: 'نام مکمل/ویتامین', style: 'tableHeader', direction: 'rtl' },
      { text: 'زمان مصرف', style: 'tableHeader', direction: 'rtl' }
    ]
  ];
  
  let rowIndex = 1;
  let hasAnyItem = false;
  
  // پردازش مکمل‌ها
  if (student.supplements && student.supplements.length > 0) {
    student.supplements.forEach((suppId) => {
      hasAnyItem = true;
      const name = getSupplementName(suppId) || `مکمل ${toPersianDigits(rowIndex)}`;
      
      tableData.push([
        { text: toPersianDigits(rowIndex), style: 'tableCell', alignment: 'center', direction: 'rtl' },
        { text: 'مکمل', style: 'tableCell', direction: 'rtl' },
        { text: preprocessPersianText(name), style: 'tableCell', direction: 'rtl' },
        { text: 'بعد از تمرین', style: 'tableCell', direction: 'rtl' }
      ]);
      
      rowIndex++;
    });
  }
  
  // پردازش ویتامین‌ها
  if (student.vitamins && student.vitamins.length > 0) {
    student.vitamins.forEach((vitaminId) => {
      hasAnyItem = true;
      const name = getSupplementName(vitaminId) || `ویتامین ${toPersianDigits(rowIndex)}`;
      
      tableData.push([
        { text: toPersianDigits(rowIndex), style: 'tableCell', alignment: 'center', direction: 'rtl' },
        { text: 'ویتامین', style: 'tableCell', direction: 'rtl' },
        { text: preprocessPersianText(name), style: 'tableCell', direction: 'rtl' },
        { text: 'صبح ناشتا', style: 'tableCell', direction: 'rtl' }
      ]);
      
      rowIndex++;
    });
  }
  
  if (hasAnyItem) {
    content.push({
      table: {
        widths: ['10%', '20%', '50%', '20%'],
        body: tableData,
        headerRows: 1
      },
      layout: {
        fillColor: function(rowIndex: number) {
          return (rowIndex === 0) ? '#e67e22' : (rowIndex % 2 === 0 ? '#fff5eb' : null);
        },
        hLineWidth: () => 1,
        vLineWidth: () => 1,
        hLineColor: () => '#e2e8f0',
        vLineColor: () => '#e2e8f0'
      },
      margin: [0, 0, 0, 15]
    });
  } else {
    content.push({
      text: 'برنامه مکمل و ویتامین تعیین نشده است.',
      style: 'notes',
      alignment: 'center',
      direction: 'rtl'
    });
  }
  
  // نکات مصرف مکمل (اگر وجود داشت)
  if (student.supplementNotes) {
    content.push({
      text: 'نکات مصرف مکمل:',
      style: 'sectionTitle',
      margin: [0, 15, 0, 5],
      direction: 'rtl'
    });
    content.push({
      text: preprocessPersianText(student.supplementNotes),
      style: 'notes',
      direction: 'rtl'
    });
  }
  
  return content;
}
