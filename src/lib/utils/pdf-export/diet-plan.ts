
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
  
  console.log('=== شروع ایجاد برنامه غذایی ===');
  console.log('نام شاگرد:', student.name);
  console.log('همه داده‌های غذایی شاگرد:', {
    meals: student.meals,
    mealsDay1: student.mealsDay1,
    mealsDay2: student.mealsDay2,
    mealsDay3: student.mealsDay3,
    mealsDay4: student.mealsDay4,
    mealsDay5: student.mealsDay5,
    mealsDay6: student.mealsDay6,
    mealsDay7: student.mealsDay7
  });
  
  // بررسی وجود داده‌های غذایی در localStorage
  const mealsDataStr = localStorage.getItem('meals');
  if (!mealsDataStr) {
    console.warn('❌ هیچ داده غذایی در localStorage یافت نشد');
    content.push({
      text: 'داده‌های غذایی یافت نشد. لطفاً ابتدا برنامه غذایی را در سیستم تعریف کنید.',
      style: 'notes',
      alignment: 'center',
      margin: [0, 20, 0, 20]
    });
    return content;
  }

  const mealsData = JSON.parse(mealsDataStr);
  console.log(`✅ تعداد غذاهای موجود در سیستم: ${mealsData.length}`);
  
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
  
  // ابتدا برنامه غذایی کلی را بررسی کنیم (اگر وجود داشت)
  if (student.meals && student.meals.length > 0) {
    console.log('✅ برنامه غذایی کلی یافت شد:', student.meals);
    hasAnyMeal = true;
    
    student.meals.forEach((mealId) => {
      const mealName = getMealName(mealId);
      const mealType = getMealType(mealId) || 'نامشخص';
      
      console.log(`غذای کلی - ID: ${mealId}, نام: ${mealName}, نوع: ${mealType}`);
      
      if (mealName) {
        allMealRows.push([
          { text: toPersianDigits(rowNumber.toString()), style: 'tableCell', alignment: 'center' },
          { text: preprocessPersianText('کلی'), style: 'tableCell', alignment: 'center' },
          { text: preprocessPersianText(mealType), style: 'tableCell', alignment: 'center' },
          { text: preprocessPersianText(mealName), style: 'tableCell', alignment: 'right' }
        ]);
        rowNumber++;
      } else {
        console.warn(`⚠️ نام غذا برای ID ${mealId} یافت نشد`);
      }
    });
  }
  
  // برای هر روز هفته (1-7) - فقط روزهایی که داده دارند
  for (let day = 1; day <= 7; day++) {
    const dayKey = `mealsDay${day}` as keyof Student;
    const meals = student[dayKey] as number[] || [];
    
    console.log(`🗓️ بررسی روز ${day} (${getDietDayName(day)}):`, meals);
    
    // فقط اگر این روز غذا داشت نمایش بده
    if (meals && meals.length > 0) {
      hasAnyMeal = true;
      const dayName = getDietDayName(day);
      
      meals.forEach((mealId) => {
        const mealName = getMealName(mealId);
        const mealType = getMealType(mealId) || 'نامشخص';
        
        console.log(`روز ${day} - غذای ID: ${mealId}, نام: ${mealName}, نوع: ${mealType}`);
        
        // فقط اگر نام غذا موجود باشد آن را اضافه کن
        if (mealName) {
          allMealRows.push([
            { text: toPersianDigits(rowNumber.toString()), style: 'tableCell', alignment: 'center' },
            { text: preprocessPersianText(dayName), style: 'tableCell', alignment: 'center' },
            { text: preprocessPersianText(mealType), style: 'tableCell', alignment: 'center' },
            { text: preprocessPersianText(mealName), style: 'tableCell', alignment: 'right' }
          ]);
          
          rowNumber++;
        } else {
          console.warn(`⚠️ نام غذا برای ID ${mealId} در روز ${day} یافت نشد`);
        }
      });
    }
  }
  
  console.log(`📊 خلاصه: تعداد کل ردیف‌های غذایی: ${allMealRows.length}`);
  console.log('آیا هیچ وعده‌ای یافت شد؟', hasAnyMeal);
  
  // اضافه کردن ردیف‌ها به جدول
  tableData.push(...allMealRows);
  
  if (hasAnyMeal && allMealRows.length > 0) {
    console.log('✅ جدول برنامه غذایی ایجاد شد');
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
    console.log('❌ هیچ برنامه غذایی معتبر برای این شاگرد یافت نشد');
    content.push({
      text: 'برنامه غذایی تعیین نشده است.',
      style: 'notes',
      alignment: 'center',
      margin: [0, 20, 0, 20]
    });
  }
  
  // نکات تغذیه‌ای (اگر وجود داشت)
  if (student.mealNotes) {
    console.log('✅ نکات تغذیه‌ای یافت شد');
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
  
  console.log('=== پایان ایجاد برنامه غذایی ===');
  return content;
}
