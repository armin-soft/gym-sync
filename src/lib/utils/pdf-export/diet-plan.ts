
import { Student } from '@/components/students/StudentTypes';
import { TrainerProfile, TableCellContent } from './types';
import { toPersianDigits, preprocessPersianText } from './pdf-fonts';
import { getDayName } from '@/lib/utils';
import { createSectionHeader, configureTableStyles } from './pdf-styling';
import { getMealName, getMealType } from './data-helpers';

// ایجاد برنامه غذایی
export function createDietPlan(student: Student, trainerProfile: TrainerProfile): any[] {
  const content: any[] = [];
  
  // هدر بخش
  content.push(createSectionHeader("برنامه غذایی هفتگی", '#27ae60'));
  
  // برای هر روز هفته
  for (let day = 1; day <= 7; day++) {
    const dayKey = `mealsDay${day}` as keyof Student;
    const meals = student[dayKey] as number[] || [];
    
    if (meals && meals.length > 0) {
      // نام روز
      const dayName = getDayName(day);
      content.push({
        text: preprocessPersianText(`روز ${toPersianDigits(day)}: ${dayName}`),
        style: 'subheader',
        color: '#27ae60',
        margin: [0, 15, 0, 5]
      });
      
      // جدول وعده‌های غذایی
      const tableData: (TableCellContent | { text: string; style: string })[][] = [
        [
          { text: 'ردیف', style: 'tableHeader' },
          { text: 'نام وعده', style: 'tableHeader' },
          { text: 'نوع', style: 'tableHeader' }
        ]
      ];
      
      meals.forEach((mealId, index) => {
        const mealName = getMealName(mealId) || `وعده ${toPersianDigits(index + 1)}`;
        const mealType = getMealType(mealId) || '-';
        
        tableData.push([
          { text: toPersianDigits(index + 1), style: 'tableCell', alignment: 'center' },
          { text: preprocessPersianText(mealName), style: 'tableCell' },
          { text: preprocessPersianText(mealType), style: 'tableCell', alignment: 'center' }
        ]);
      });
      
      content.push({
        table: {
          widths: ['15%', '60%', '25%'],
          body: tableData
        },
        layout: configureTableStyles('success'),
        margin: [0, 0, 0, 10]
      });
    }
  }
  
  // نکات تغذیه‌ای
  if (student.mealNotes) {
    content.push(createSectionHeader("نکات تغذیه‌ای", '#27ae60'));
    content.push({
      text: preprocessPersianText(student.mealNotes),
      style: 'notes'
    });
  }
  
  return content;
}
