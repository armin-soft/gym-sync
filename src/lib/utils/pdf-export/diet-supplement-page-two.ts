
import { Student } from '@/components/students/StudentTypes';
import { TrainerProfile, TableCellContent } from './types';
import { toPersianDigits, preprocessPersianText } from './pdf-fonts';
import { getMealName, getMealType, getSupplementName } from './data-helpers';

// تابع دریافت نام روز برای برنامه غذایی (شنبه تا جمعه)
function getDietDayName(day: number): string {
  const dayNames: Record<number, string> = {
    1: 'شنبه',
    2: 'یکشنبه', 
    3: 'دوشنبه',
    4: 'سه شنبه',
    5: 'چهارشنبه',
    6: 'پنج شنبه',
    7: 'جمعه'
  };
  return dayNames[day] || `روز ${day}`;
}

// ایجاد صفحه دوم: برنامه غذایی و مکمل/ویتامین
export function createDietAndSupplementPageTwo(student: Student, trainerProfile: TrainerProfile): any[] {
  const content: any[] = [];
  
  // بخش برنامه غذایی
  content.push({
    text: 'برنامه غذایی',
    style: 'sectionTitle',
    margin: [0, 0, 0, 15],
    color: '#27ae60',
    direction: 'rtl',
    fontSize: 16,
    bold: true,
    alignment: 'center'
  });
  
  // جدول برنامه غذایی
  const dietTableData: (TableCellContent | { text: string; style: string })[][] = [
    [
      { text: 'ردیف', style: 'tableHeader', alignment: 'center' },
      { text: 'روز هفته', style: 'tableHeader', alignment: 'center' },
      { text: 'وعده غذایی', style: 'tableHeader', alignment: 'center' },
      { text: 'نام غذا', style: 'tableHeader', alignment: 'right' }
    ]
  ];
  
  let hasDietData = false;
  let dietRowNumber = 1;
  const allDietRows: any[] = [];
  
  // برای هر روز هفته (1-7)
  for (let day = 1; day <= 7; day++) {
    const dayKey = `mealsDay${day}` as keyof Student;
    const meals = student[dayKey] as number[] || [];
    
    if (meals && meals.length > 0) {
      hasDietData = true;
      const dayName = getDietDayName(day);
      
      meals.forEach((mealId) => {
        const mealName = getMealName(mealId);
        const mealType = getMealType(mealId);
        
        if (mealName) {
          allDietRows.push([
            { text: toPersianDigits(dietRowNumber.toString()), style: 'tableCell', alignment: 'center' },
            { text: preprocessPersianText(dayName), style: 'tableCell', alignment: 'center' },
            { text: preprocessPersianText(mealType || ''), style: 'tableCell', alignment: 'center' },
            { text: preprocessPersianText(mealName), style: 'tableCell', alignment: 'right' }
          ]);
          dietRowNumber++;
        }
      });
    }
  }
  
  dietTableData.push(...allDietRows);
  
  if (hasDietData) {
    content.push({
      table: {
        widths: ['8%', '22%', '25%', '45%'],
        body: dietTableData,
        headerRows: 1
      },
      layout: {
        fillColor: function(rowIndex: number) {
          return (rowIndex === 0) ? '#27ae60' : (rowIndex % 2 === 0 ? '#f0fff4' : null);
        },
        hLineWidth: () => 1,
        vLineWidth: () => 1,
        hLineColor: () => '#e2e8f0',
        vLineColor: () => '#e2e8f0'
      },
      margin: [0, 0, 0, 30]
    });
  } else {
    content.push({
      text: 'برنامه غذایی تعیین نشده است.',
      style: 'notes',
      alignment: 'center',
      margin: [0, 20, 0, 30]
    });
  }

  // نکات تغذیه‌ای (اگر وجود داشت)
  if (student.mealNotes) {
    content.push({
      text: 'نکات تغذیه‌ای:',
      style: 'sectionTitle',
      margin: [0, 0, 0, 8],
      alignment: 'right',
      fontSize: 12
    });
    content.push({
      text: preprocessPersianText(student.mealNotes),
      style: 'notes',
      alignment: 'right',
      fontSize: 10,
      margin: [0, 0, 0, 25]
    });
  }
  
  // بخش مکمل و ویتامین
  content.push({
    text: 'برنامه مکمل و ویتامین',
    style: 'sectionTitle',
    margin: [0, 15, 0, 15],
    color: '#e67e22',
    direction: 'rtl',
    fontSize: 16,
    bold: true,
    alignment: 'center'
  });
  
  // جدول مکمل‌ها و ویتامین‌ها
  const supplementTableData: (TableCellContent | { text: string; style: string })[][] = [
    [
      { text: 'ردیف', style: 'tableHeader', alignment: 'center' },
      { text: 'نوع', style: 'tableHeader', alignment: 'center' },
      { text: 'نام مکمل یا ویتامین', style: 'tableHeader', alignment: 'right' },
      { text: 'زمان مصرف', style: 'tableHeader', alignment: 'center' },
      { text: 'دوز مصرف', style: 'tableHeader', alignment: 'center' }
    ]
  ];
  
  let supplementRowNumber = 1;
  let hasSupplementData = false;
  const allSupplementRows: any[] = [];
  
  // دریافت داده‌های مکمل‌ها از دیتابیس
  const supplementsData = JSON.parse(localStorage.getItem('supplements') || '[]');
  
  // پردازش مکمل‌ها
  if (student.supplements && student.supplements.length > 0) {
    student.supplements.forEach((suppId) => {
      const supplementInfo = supplementsData.find((supp: any) => supp.id === suppId);
      
      if (supplementInfo) {
        hasSupplementData = true;
        const name = supplementInfo.name || `مکمل ناشناخته (${suppId})`;
        const dosage = supplementInfo.dosage || 'طبق دستور پزشک';
        const timing = supplementInfo.timing || 'هر روز';
        
        allSupplementRows.push([
          { text: toPersianDigits(supplementRowNumber.toString()), style: 'tableCell', alignment: 'center' },
          { text: 'مکمل', style: 'tableCell', alignment: 'center' },
          { text: preprocessPersianText(name), style: 'tableCell', alignment: 'right' },
          { text: preprocessPersianText(timing), style: 'tableCell', alignment: 'center' },
          { text: preprocessPersianText(dosage), style: 'tableCell', alignment: 'center' }
        ]);
        
        supplementRowNumber++;
      }
    });
  }
  
  // پردازش ویتامین‌ها
  if (student.vitamins && student.vitamins.length > 0) {
    student.vitamins.forEach((vitaminId) => {
      const vitaminInfo = supplementsData.find((supp: any) => supp.id === vitaminId);
      
      if (vitaminInfo) {
        hasSupplementData = true;
        const name = vitaminInfo.name || `ویتامین ناشناخته (${vitaminId})`;
        const dosage = vitaminInfo.dosage || 'طبق دستور پزشک';
        const timing = vitaminInfo.timing || 'هر روز';
        
        allSupplementRows.push([
          { text: toPersianDigits(supplementRowNumber.toString()), style: 'tableCell', alignment: 'center' },
          { text: 'ویتامین', style: 'tableCell', alignment: 'center' },
          { text: preprocessPersianText(name), style: 'tableCell', alignment: 'right' },
          { text: preprocessPersianText(timing), style: 'tableCell', alignment: 'center' },
          { text: preprocessPersianText(dosage), style: 'tableCell', alignment: 'center' }
        ]);
        
        supplementRowNumber++;
      }
    });
  }
  
  supplementTableData.push(...allSupplementRows);
  
  if (hasSupplementData) {
    content.push({
      table: {
        widths: ['8%', '15%', '42%', '20%', '15%'],
        body: supplementTableData,
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
      margin: [0, 20, 0, 20]
    });
  }
  
  // نکات مصرف مکمل (اگر وجود داشت)
  if (student.supplementNotes) {
    content.push({
      text: 'نکات مصرف مکمل:',
      style: 'sectionTitle',
      margin: [0, 15, 0, 8],
      alignment: 'right',
      fontSize: 12
    });
    content.push({
      text: preprocessPersianText(student.supplementNotes),
      style: 'notes',
      alignment: 'right',
      fontSize: 10
    });
  }
  
  return content;
}
