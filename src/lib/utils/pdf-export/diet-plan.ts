
import { Student } from '@/components/students/StudentTypes';
import { TrainerProfile, TableCellContent } from './types';
import { toPersianDigits, preprocessPersianText } from './pdf-fonts';
import { getDayName } from '@/lib/utils';
import { getMealName, getMealType } from './data-helpers';

// ایجاد برنامه غذایی با ترتیب ستون‌های جدید
export function createDietPlan(student: Student, trainerProfile: TrainerProfile): any[] {
  const content: any[] = [];
  
  // جدول با ترتیب: شماره، روز هفته، وعده غذایی، نام غذا
  const tableData: (TableCellContent | { text: string; style: string })[][] = [
    [
      { text: 'شماره', style: 'tableHeader', direction: 'rtl' },
      { text: 'روز هفته', style: 'tableHeader', direction: 'rtl' },
      { text: 'وعده غذایی', style: 'tableHeader', direction: 'rtl' },
      { text: 'نام غذا', style: 'tableHeader', direction: 'rtl' }
    ]
  ];
  
  let hasAnyMeal = false;
  let rowNumber = 1;
  
  // برای هر روز هفته (1-7 به جای 1-5)
  for (let day = 1; day <= 7; day++) {
    const dayKey = `mealsDay${day}` as keyof Student;
    const meals = student[dayKey] as number[] || [];
    
    console.log(`بررسی روز ${day}: ${dayKey}`, meals);
    
    if (meals && meals.length > 0) {
      hasAnyMeal = true;
      const dayName = getDayName(day);
      
      meals.forEach((mealId) => {
        const mealName = getMealName(mealId) || `غذای ناشناخته (${mealId})`;
        const mealType = getMealType(mealId) || 'نامشخص';
        
        tableData.push([
          { text: toPersianDigits(rowNumber.toString()), style: 'tableCell', alignment: 'center', direction: 'rtl' },
          { text: preprocessPersianText(dayName), style: 'tableCell', direction: 'rtl' },
          { text: preprocessPersianText(mealType), style: 'tableCell', direction: 'rtl' },
          { text: preprocessPersianText(mealName), style: 'tableCell', direction: 'rtl' }
        ]);
        
        rowNumber++;
      });
    }
  }
  
  // اگر هیچ برنامه روزانه‌ای نبود، برنامه کلی را بررسی کن
  if (!hasAnyMeal && student.meals && student.meals.length > 0) {
    hasAnyMeal = true;
    student.meals.forEach((mealId) => {
      const mealName = getMealName(mealId) || `غذای ناشناخته (${mealId})`;
      const mealType = getMealType(mealId) || 'نامشخص';
      
      tableData.push([
        { text: toPersianDigits(rowNumber.toString()), style: 'tableCell', alignment: 'center', direction: 'rtl' },
        { text: 'برنامه کلی', style: 'tableCell', direction: 'rtl' },
        { text: preprocessPersianText(mealType), style: 'tableCell', direction: 'rtl' },
        { text: preprocessPersianText(mealName), style: 'tableCell', direction: 'rtl' }
      ]);
      
      rowNumber++;
    });
  }
  
  if (hasAnyMeal) {
    content.push({
      table: {
        widths: ['10%', '20%', '30%', '40%'],
        body: tableData,
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
      margin: [0, 0, 0, 15]
    });
  } else {
    console.log('هیچ برنامه غذایی برای این شاگرد یافت نشد');
    content.push({
      text: 'برنامه غذایی تعیین نشده است.',
      style: 'notes',
      alignment: 'center',
      direction: 'rtl'
    });
  }
  
  // نکات تغذیه‌ای (اگر وجود داشت)
  if (student.mealNotes) {
    content.push({
      text: 'نکات تغذیه‌ای:',
      style: 'sectionTitle',
      margin: [0, 15, 0, 5],
      direction: 'rtl'
    });
    content.push({
      text: preprocessPersianText(student.mealNotes),
      style: 'notes',
      direction: 'rtl'
    });
  }
  
  return content;
}
