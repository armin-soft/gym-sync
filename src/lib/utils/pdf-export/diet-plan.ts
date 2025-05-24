
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
  
  // جدول غذایی برای همه روزهای هفته
  const tableData: (TableCellContent | { text: string; style: string })[][] = [
    [
      { text: 'شماره', style: 'tableHeader', direction: 'rtl' },
      { text: 'هفته', style: 'tableHeader', direction: 'rtl' },
      { text: 'وعده غذایی', style: 'tableHeader', direction: 'rtl' },
      { text: 'غذا', style: 'tableHeader', direction: 'rtl' }
    ]
  ];
  
  let rowIndex = 1;
  
  // برای هر روز هفته
  for (let day = 1; day <= 7; day++) {
    const dayKey = `mealsDay${day}` as keyof Student;
    const meals = student[dayKey] as number[] || [];
    
    if (meals && meals.length > 0) {
      const dayName = getDayName(day);
      
      meals.forEach((mealId) => {
        const mealName = getMealName(mealId) || '-';
        const mealType = getMealType(mealId) || '-';
        
        tableData.push([
          { 
            text: toPersianDigits(rowIndex), 
            style: 'tableCell', 
            alignment: 'center',
            direction: 'rtl'
          },
          { 
            text: preprocessPersianText(dayName), 
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
        
        rowIndex++;
      });
    }
  }
  
  // اگر غذایی وجود داشت، جدول را نمایش بده
  if (tableData.length > 1) {
    content.push({
      table: {
        widths: ['10%', '20%', '25%', '45%'],
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
    // اگر هیچ غذایی وجود نداشت
    content.push({
      text: 'برنامه غذایی تعیین نشده است.',
      style: 'notes',
      alignment: 'center',
      direction: 'rtl'
    });
  }
  
  // نکات تغذیه‌ای
  if (student.mealNotes) {
    content.push(createSectionHeader("نکات تغذیه‌ای", '#27ae60'));
    content.push({
      text: preprocessPersianText(student.mealNotes),
      style: {
        fontSize: 11,
        alignment: 'right',
        margin: [0, 10, 0, 0],
        direction: 'rtl'
      }
    });
  }
  
  return content;
}
