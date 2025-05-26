
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

// بررسی بهتر وجود داده‌های غذایی
function hasAnyDietData(student: Student): boolean {
  // بررسی غذاهای روزانه
  const dailyMeals = [
    student.mealsDay1,
    student.mealsDay2,
    student.mealsDay3,
    student.mealsDay4,
    student.mealsDay5,
    student.mealsDay6,
    student.mealsDay7
  ];
  
  const hasDailyMeals = dailyMeals.some(meals => meals && meals.length > 0);
  
  // بررسی غذاهای کلی
  const hasGeneralMeals = student.meals && student.meals.length > 0;
  
  console.log('بررسی داده‌های غذایی شاگرد:', {
    name: student.name,
    hasGeneralMeals,
    hasDailyMeals,
    meals: student.meals,
    mealsDay1: student.mealsDay1,
    mealsDay2: student.mealsDay2,
    mealsDay3: student.mealsDay3,
    mealsDay4: student.mealsDay4,
    mealsDay5: student.mealsDay5,
    mealsDay6: student.mealsDay6,
    mealsDay7: student.mealsDay7
  });
  
  return hasGeneralMeals || hasDailyMeals;
}

// ایجاد برنامه غذایی فقط برای روزهایی که داده دارند
export function createDietPlan(student: Student, trainerProfile: TrainerProfile): any[] {
  const content: any[] = [];
  
  console.log('شروع ایجاد برنامه غذایی برای:', student.name);
  
  // بررسی وجود هرگونه داده غذایی
  if (!hasAnyDietData(student)) {
    console.log('هیچ داده غذایی برای این شاگرد یافت نشد');
    content.push({
      text: 'برنامه غذایی تعیین نشده است.',
      style: 'notes',
      alignment: 'center',
      margin: [0, 10, 0, 10]
    });
    return content;
  }
  
  // جدول با ترتیب صحیح: شماره، روز هفته، وعده غذایی، نام غذا
  const tableData: (TableCellContent | { text: string; style: string })[][] = [
    [
      { text: 'شماره', style: 'tableHeader', alignment: 'center' },
      { text: 'روز هفته', style: 'tableHeader', alignment: 'center' },
      { text: 'وعده غذایی', style: 'tableHeader', alignment: 'center' },
      { text: 'نام غذا', style: 'tableHeader', alignment: 'right' }
    ]
  ];
  
  let rowNumber = 1;
  const allMealRows: any[] = [];
  
  // ابتدا غذاهای کلی را بررسی کن
  if (student.meals && student.meals.length > 0) {
    console.log('غذاهای کلی یافت شد:', student.meals);
    student.meals.forEach((mealId) => {
      const mealName = getMealName(mealId);
      const mealType = getMealType(mealId);
      
      if (mealName) {
        allMealRows.push([
          { text: toPersianDigits(rowNumber.toString()), style: 'tableCell', alignment: 'center' },
          { text: preprocessPersianText('کلی'), style: 'tableCell', alignment: 'center' },
          { text: preprocessPersianText(mealType || 'نامشخص'), style: 'tableCell', alignment: 'center' },
          { text: preprocessPersianText(mealName), style: 'tableCell', alignment: 'right' }
        ]);
        rowNumber++;
      }
    });
  }
  
  // سپس برای هر روز هفته (1-7) - فقط روزهایی که داده دارند
  for (let day = 1; day <= 7; day++) {
    const dayKey = `mealsDay${day}` as keyof Student;
    const meals = student[dayKey] as number[] || [];
    
    console.log(`بررسی روز ${day}: ${dayKey}`, meals);
    
    // فقط اگر این روز غذا داشت نمایش بده
    if (meals && meals.length > 0) {
      const dayName = getDietDayName(day);
      
      meals.forEach((mealId) => {
        const mealName = getMealName(mealId);
        const mealType = getMealType(mealId);
        
        // فقط اگر نام غذا موجود باشد آن را اضافه کن
        if (mealName) {
          allMealRows.push([
            { text: toPersianDigits(rowNumber.toString()), style: 'tableCell', alignment: 'center' },
            { text: preprocessPersianText(dayName), style: 'tableCell', alignment: 'center' },
            { text: preprocessPersianText(mealType || 'نامشخص'), style: 'tableCell', alignment: 'center' },
            { text: preprocessPersianText(mealName), style: 'tableCell', alignment: 'right' }
          ]);
          
          rowNumber++;
        }
      });
    }
  }
  
  // اضافه کردن ردیف‌ها به جدول
  tableData.push(...allMealRows);
  
  if (allMealRows.length > 0) {
    console.log(`${allMealRows.length} ردیف غذا به جدول اضافه شد`);
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
    console.log('هیچ ردیف غذا برای نمایش یافت نشد');
    content.push({
      text: 'غذاها یافت شد اما نمی‌توان نام آن‌ها را تشخیص داد.',
      style: 'notes',
      alignment: 'center',
      margin: [0, 10, 0, 10]
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
