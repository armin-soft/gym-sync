
import { Student } from '@/components/students/StudentTypes';
import { TrainerProfile, TableCellContent } from './types';
import { toPersianDigits, preprocessPersianText } from './pdf-fonts';
import { getSupplementName, getSupplementType } from './data-helpers';

// ایجاد برنامه مکمل و ویتامین
export function createSupplementPlan(student: Student, trainerProfile: TrainerProfile): any[] {
  const content: any[] = [];
  
  // جدول مکمل‌ها و ویتامین‌ها
  const tableData: (TableCellContent | { text: string; style: string })[][] = [
    [
      { text: 'شماره', style: 'tableHeader', direction: 'rtl' },
      { text: 'نوع', style: 'tableHeader', direction: 'rtl' },
      { text: 'زمان مصرف', style: 'tableHeader', direction: 'rtl' },
      { text: 'دوز مصرف', style: 'tableHeader', direction: 'rtl' },
      { text: 'نام مکمل یا ویتامین', style: 'tableHeader', direction: 'rtl' }
    ]
  ];
  
  let rowNumber = 1;
  let hasAnyItem = false;
  const allSupplementRows: any[] = [];
  
  console.log('بررسی مکمل‌های شاگرد:', student.supplements);
  console.log('بررسی ویتامین‌های شاگرد:', student.vitamins);
  
  // پردازش مکمل‌ها
  if (student.supplements && student.supplements.length > 0) {
    student.supplements.forEach((suppId) => {
      hasAnyItem = true;
      const name = getSupplementName(suppId) || `مکمل ناشناخته (${suppId})`;
      
      // دریافت اطلاعات دوز و زمان مصرف از دیتابیس
      const supplementsData = JSON.parse(localStorage.getItem('supplements') || '[]');
      const supplementInfo = supplementsData.find((supp: any) => supp.id === suppId);
      
      const dosage = supplementInfo?.dosage || '';
      const timing = supplementInfo?.timing || '';
      
      allSupplementRows.push([
        { text: toPersianDigits(rowNumber.toString()), style: 'tableCell', alignment: 'center', direction: 'rtl' },
        { text: 'مکمل', style: 'tableCell', direction: 'rtl' },
        { text: preprocessPersianText(timing), style: 'tableCell', direction: 'rtl' },
        { text: preprocessPersianText(dosage), style: 'tableCell', direction: 'rtl' },
        { text: preprocessPersianText(name), style: 'tableCell', direction: 'rtl' }
      ]);
      
      rowNumber++;
    });
  }
  
  // پردازش ویتامین‌ها
  if (student.vitamins && student.vitamins.length > 0) {
    student.vitamins.forEach((vitaminId) => {
      hasAnyItem = true;
      const name = getSupplementName(vitaminId) || `ویتامین ناشناخته (${vitaminId})`;
      
      // دریافت اطلاعات دوز و زمان مصرف از دیتابیس
      const supplementsData = JSON.parse(localStorage.getItem('supplements') || '[]');
      const vitaminInfo = supplementsData.find((supp: any) => supp.id === vitaminId);
      
      const dosage = vitaminInfo?.dosage || '';
      const timing = vitaminInfo?.timing || '';
      
      allSupplementRows.push([
        { text: toPersianDigits(rowNumber.toString()), style: 'tableCell', alignment: 'center', direction: 'rtl' },
        { text: 'ویتامین', style: 'tableCell', direction: 'rtl' },
        { text: preprocessPersianText(timing), style: 'tableCell', direction: 'rtl' },
        { text: preprocessPersianText(dosage), style: 'tableCell', direction: 'rtl' },
        { text: preprocessPersianText(name), style: 'tableCell', direction: 'rtl' }
      ]);
      
      rowNumber++;
    });
  }
  
  // اضافه کردن ردیف‌ها به جدول (بدون تغییر ترتیب)
  tableData.push(...allSupplementRows);
  
  if (hasAnyItem) {
    content.push({
      table: {
        widths: ['10%', '15%', '20%', '15%', '40%'],
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
