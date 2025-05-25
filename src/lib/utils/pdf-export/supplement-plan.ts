
import { Student } from '@/components/students/StudentTypes';
import { TrainerProfile, TableCellContent } from './types';
import { toPersianDigits, preprocessPersianText } from './pdf-fonts';
import { getSupplementName } from './data-helpers';

// ایجاد برنامه مکمل و ویتامین با اطلاعات کامل
export function createSupplementPlan(student: Student, trainerProfile: TrainerProfile): any[] {
  const content: any[] = [];
  
  // جدول مکمل‌ها و ویتامین‌ها
  const tableData: (TableCellContent | { text: string; style: string })[][] = [
    [
      { text: 'شماره', style: 'tableHeader', alignment: 'center' },
      { text: 'نوع', style: 'tableHeader', alignment: 'center' },
      { text: 'زمان مصرف', style: 'tableHeader', alignment: 'center' },
      { text: 'دوز مصرف', style: 'tableHeader', alignment: 'center' },
      { text: 'نام مکمل یا ویتامین', style: 'tableHeader', alignment: 'right' }
    ]
  ];
  
  let rowNumber = 1;
  let hasAnyItem = false;
  const allSupplementRows: any[] = [];
  
  console.log('بررسی مکمل‌های شاگرد:', student.supplements);
  console.log('بررسی ویتامین‌های شاگرد:', student.vitamins);
  
  // دریافت داده‌های مکمل‌ها از دیتابیس
  const supplementsData = JSON.parse(localStorage.getItem('supplements') || '[]');
  console.log('داده‌های مکمل از دیتابیس:', supplementsData);
  
  // پردازش مکمل‌ها
  if (student.supplements && student.supplements.length > 0) {
    student.supplements.forEach((suppId) => {
      const supplementInfo = supplementsData.find((supp: any) => supp.id === suppId);
      
      if (supplementInfo) {
        hasAnyItem = true;
        const name = supplementInfo.name || `مکمل ناشناخته (${suppId})`;
        const dosage = supplementInfo.dosage || '';
        const timing = supplementInfo.timing || '';
        
        allSupplementRows.push([
          { text: toPersianDigits(rowNumber.toString()), style: 'tableCell', alignment: 'center' },
          { text: 'مکمل', style: 'tableCell', alignment: 'center' },
          { text: preprocessPersianText(timing), style: 'tableCell', alignment: 'center' },
          { text: preprocessPersianText(dosage), style: 'tableCell', alignment: 'center' },
          { text: preprocessPersianText(name), style: 'tableCell', alignment: 'right' }
        ]);
        
        rowNumber++;
      }
    });
  }
  
  // پردازش ویتامین‌ها
  if (student.vitamins && student.vitamins.length > 0) {
    student.vitamins.forEach((vitaminId) => {
      const vitaminInfo = supplementsData.find((supp: any) => supp.id === vitaminId);
      
      if (vitaminInfo) {
        hasAnyItem = true;
        const name = vitaminInfo.name || `ویتامین ناشناخته (${vitaminId})`;
        const dosage = vitaminInfo.dosage || '';
        const timing = vitaminInfo.timing || '';
        
        allSupplementRows.push([
          { text: toPersianDigits(rowNumber.toString()), style: 'tableCell', alignment: 'center' },
          { text: 'ویتامین', style: 'tableCell', alignment: 'center' },
          { text: preprocessPersianText(timing), style: 'tableCell', alignment: 'center' },
          { text: preprocessPersianText(dosage), style: 'tableCell', alignment: 'center' },
          { text: preprocessPersianText(name), style: 'tableCell', alignment: 'right' }
        ]);
        
        rowNumber++;
      }
    });
  }
  
  // اضافه کردن ردیف‌ها به جدول
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
      alignment: 'center'
    });
  }
  
  // نکات مصرف مکمل (اگر وجود داشت)
  if (student.supplementNotes) {
    content.push({
      text: 'نکات مصرف مکمل:',
      style: 'sectionTitle',
      margin: [0, 15, 0, 5],
      alignment: 'right'
    });
    content.push({
      text: preprocessPersianText(student.supplementNotes),
      style: 'notes',
      alignment: 'right'
    });
  }
  
  return content;
}
