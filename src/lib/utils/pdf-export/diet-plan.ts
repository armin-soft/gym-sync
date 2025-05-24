
import { Student } from '@/components/students/StudentTypes';
import { TrainerProfile, TableCellContent } from './types';
import { toPersianDigits, preprocessPersianText } from './pdf-fonts';
import { getDayName } from '@/lib/utils';
import { getMealName, getMealType } from './data-helpers';

// ایجاد برنامه غذایی کامپکت
export function createDietPlan(student: Student, trainerProfile: TrainerProfile): any[] {
  const content: any[] = [];
  
  // جدول کامپکت همه وعده‌های غذایی
  const tableData: (TableCellContent | { text: string; style: string })[][] = [
    [
      { text: 'روز', style: 'tableHeader', direction: 'rtl' },
      { text: 'وعده غذایی', style: 'tableHeader', direction: 'rtl' },
      { text: 'غذا', style: 'tableHeader', direction: 'rtl' }
    ]
  ];
  
  let hasAnyMeal = false;
  
  // برای هر روز هفته
  for (let day = 1; day <= 7; day++) {
    const dayKey = `mealsDay${day}` as keyof Student;
    const meals = student[dayKey] as number[] || [];
    
    if (meals && meals.length > 0) {
      hasAnyMeal = true;
      const dayName = getDayName(day);
      
      meals.forEach((mealId, index) => {
        const mealName = getMealName(mealId) || '-';
        const mealType = getMealType(mealId) || '-';
        
        tableData.push([
          { 
            text: index === 0 ? preprocessPersianText(dayName) : '', 
            style: 'tableCell',
            direction: 'rtl' 
          },
          { 
            text: preprocessPersianText(mealType), 
            style: 'tableCell',
            direction: 'rtl' 
          },
          { 
            text: preprocessPersianText(mealName), 
            style: 'tableCell',
            direction: 'rtl' 
          }
        ]);
      });
    }
  }
  
  if (hasAnyMeal) {
    content.push({
      table: {
        widths: ['20%', '30%', '50%'],
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
