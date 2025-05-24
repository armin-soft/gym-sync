
import { Student } from '@/components/students/StudentTypes';
import { TrainerProfile, TableCellContent } from './types';
import { toPersianDigits, preprocessPersianText } from './pdf-fonts';
import { getSupplementName, getSupplementType } from './data-helpers';

// ایجاد برنامه مکمل و ویتامین کامپکت - فقط با داده‌های واقعی شاگرد
export function createSupplementPlan(student: Student, trainerProfile: TrainerProfile): any[] {
  const content: any[] = [];
  
  // جدول کامپکت مکمل‌ها و ویتامین‌ها
  const tableData: (TableCellContent | { text: string; style: string })[][] = [
    [
      { text: 'نام مکمل یا ویتامین', style: 'tableHeader', direction: 'rtl' },
      { text: 'زمان مصرف', style: 'tableHeader', direction: 'rtl' },
      { text: 'دوز مصرف', style: 'tableHeader', direction: 'rtl' },
      { text: 'روز', style: 'tableHeader', direction: 'rtl' },
      { text: 'شماره', style: 'tableHeader', direction: 'rtl' }
    ]
  ];
  
  let rowNumber = 1;
  let hasAnyItem = false;
  
  console.log('بررسی مکمل‌های شاگرد:', student.supplements);
  console.log('بررسی ویتامین‌های شاگرد:', student.vitamins);
  
  // پردازش مکمل‌ها
  if (student.supplements && student.supplements.length > 0) {
    student.supplements.forEach((suppId) => {
      hasAnyItem = true;
      const name = getSupplementName(suppId) || `مکمل ناشناخته (${suppId})`;
      
      tableData.push([
        { text: preprocessPersianText(name), style: 'tableCell', direction: 'rtl' },
        { text: 'بعد از تمرین', style: 'tableCell', direction: 'rtl' },
        { text: '۱ عدد', style: 'tableCell', direction: 'rtl' },
        { text: 'روزانه', style: 'tableCell', direction: 'rtl' },
        { text: toPersianDigits(rowNumber.toString()), style: 'tableCell', alignment: 'center', direction: 'rtl' }
      ]);
      
      rowNumber++;
    });
  }
  
  // پردازش ویتامین‌ها
  if (student.vitamins && student.vitamins.length > 0) {
    student.vitamins.forEach((vitaminId) => {
      hasAnyItem = true;
      const name = getSupplementName(vitaminId) || `ویتامین ناشناخته (${vitaminId})`;
      
      tableData.push([
        { text: preprocessPersianText(name), style: 'tableCell', direction: 'rtl' },
        { text: 'صبح ناشتا', style: 'tableCell', direction: 'rtl' },
        { text: '۱ عدد', style: 'tableCell', direction: 'rtl' },
        { text: 'روزانه', style: 'tableCell', direction: 'rtl' },
        { text: toPersianDigits(rowNumber.toString()), style: 'tableCell', alignment: 'center', direction: 'rtl' }
      ]);
      
      rowNumber++;
    });
  }
  
  if (hasAnyItem) {
    content.push({
      table: {
        widths: ['40%', '20%', '15%', '15%', '10%'],
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
    console.log('هیچ مکمل یا ویتامینی برای این شاگرد یافت نشد');
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
