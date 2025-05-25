
import { Student } from '@/components/students/StudentTypes';
import { TrainerProfile, TableCellContent } from './types';
import { toPersianDigits, preprocessPersianText } from './pdf-fonts';
import { getMealName, getMealType } from './data-helpers';

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

// ایجاد برنامه غذایی فقط برای روزهایی که داده دارند
export function createDietPlan(student: Student, trainerProfile: TrainerProfile): any[] {
  const content: any[] = [];
  
  // جدول با ترتیب صحیح: شماره، روز هفته، وعده غذایی، نام غذا
  const tableData: (TableCellContent | { text: string; style: string })[][] = [
    [
      { text: 'شماره', style: 'tableHeader', alignment: 'center' },
      { text: 'روز هفته', style: 'tableHeader', alignment: 'center' },
      { text: 'وعده غذایی', style: 'tableHeader', alignment: 'center' },
      { text: 'نام غذا', style: 'tableHeader', alignment: 'right' }
    ]
  ];
  
  let hasAnyMeal = false;
  let rowNumber = 1;
  const allMealRows: any[] = [];
  
  // برای هر روز هفته (1-7) - فقط روزهایی که داده دارند
  for (let day = 1; day <= 7; day++) {
    const dayKey = `mealsDay${day}` as keyof Student;
    const meals = student[dayKey] as number[] || [];
    
    console.log(`بررسی روز ${day}: ${dayKey}`, meals);
    
    // فقط اگر این روز غذا داشت نمایش بده
    if (meals && meals.length > 0) {
      hasAnyMeal = true;
      const dayName = getDietDayName(day);
      
      meals.forEach((mealId) => {
        const mealName = getMealName(mealId);
        const mealType = getMealType(mealId);
        
        // فقط اگر نام غذا موجود باشد آن را اضافه کن
        if (mealName) {
          allMealRows.push([
            { text: toPersianDigits(rowNumber.toString()), style: 'tableCell', alignment: 'center' },
            { text: preprocessPersianText(dayName), style: 'tableCell', alignment: 'center' },
            { text: preprocessPersianText(mealType || ''), style: 'tableCell', alignment: 'center' },
            { text: preprocessPersianText(mealName), style: 'tableCell', alignment: 'right' }
          ]);
          
          rowNumber++;
        }
      });
    }
  }
  
  // اضافه کردن ردیف‌ها به جدول
  tableData.push(...allMealRows);
  
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
      alignment: 'center'
    });
  }
  
  // نکات تغذیه‌ای (اگر وجود داشت)
  if (student.mealNotes) {
    content.push({
      text: 'نکات تغذیه‌ای:',
      style: 'sectionTitle',
      margin: [0, 15, 0, 5],
      alignment: 'right'
    });
    content.push({
      text: preprocessPersianText(student.mealNotes),
      style: 'notes',
      alignment: 'right'
    });
  }
  
  return content;
}
