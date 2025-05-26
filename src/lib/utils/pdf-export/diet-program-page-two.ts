
import { Student } from '@/components/students/StudentTypes';
import { TrainerProfile } from './types';
import { toPersianDigits, preprocessPersianText } from './pdf-fonts';
import { modernTableLayout } from './modern-styles';

// دریافت نام وعده‌های غذایی از دیتابیس
function getMealName(mealId: number): string {
  try {
    const mealsData = JSON.parse(localStorage.getItem('meals') || '[]');
    const meal = mealsData.find((m: any) => m.id === mealId);
    return meal ? meal.name : `وعده ناشناخته (${mealId})`;
  } catch {
    return `وعده ناشناخته (${mealId})`;
  }
}

// دریافت نوع وعده غذایی از دیتابیس
function getMealType(mealId: number): string {
  try {
    const mealsData = JSON.parse(localStorage.getItem('meals') || '[]');
    const meal = mealsData.find((m: any) => m.id === mealId);
    return meal ? meal.type : 'نامشخص';
  } catch {
    return 'نامشخص';
  }
}

// نام روزهای هفته
function getDayName(day: number): string {
  const dayNames: Record<number, string> = {
    1: 'شنبه',
    2: 'یکشنبه', 
    3: 'دوشنبه',
    4: 'سه‌شنبه',
    5: 'چهارشنبه',
    6: 'پنج‌شنبه',
    7: 'جمعه'
  };
  return dayNames[day] || `روز ${toPersianDigits(day)}`;
}

// ایجاد صفحه دوم: برنامه غذایی ۷ روز
export function createDietProgramPageTwo(student: Student, trainerProfile: TrainerProfile): any[] {
  const content: any[] = [];
  
  // عنوان صفحه دوم
  content.push({
    text: preprocessPersianText('برنامه غذایی هفتگی'),
    style: 'sectionTitle',
    margin: [0, 25, 0, 20],
    color: '#27ae60',
    direction: 'rtl',
    fontSize: 18,
    bold: true,
    alignment: 'center'
  });

  // جمع‌آوری تمام وعده‌های غذایی از ۷ روز هفته
  const tableBody = [];
  
  // هدر جدول
  tableBody.push([
    {
      text: preprocessPersianText('شماره'),
      style: 'tableHeader',
      alignment: 'center'
    },
    {
      text: preprocessPersianText('هفته'),
      style: 'tableHeader',
      alignment: 'center'
    },
    {
      text: preprocessPersianText('وعده غذایی'),
      style: 'tableHeader',
      alignment: 'center'
    },
    {
      text: preprocessPersianText('غذا'),
      style: 'tableHeader',
      alignment: 'right'
    }
  ]);

  let mealNumber = 1;
  let hasAnyMeal = false;

  for (let day = 1; day <= 7; day++) {
    const dayKey = `mealsDay${day}` as keyof Student;
    const meals = student[dayKey] as number[] || [];
    
    if (meals && meals.length > 0) {
      hasAnyMeal = true;
      meals.forEach((mealId) => {
        const mealName = getMealName(mealId);
        const mealType = getMealType(mealId);
        
        tableBody.push([
          {
            text: toPersianDigits(mealNumber.toString()),
            style: 'tableCellCenter',
            alignment: 'center'
          },
          {
            text: preprocessPersianText(getDayName(day)),
            style: 'tableCellCenter',
            alignment: 'center'
          },
          {
            text: preprocessPersianText(mealType),
            style: 'tableCellCenter',
            alignment: 'center'
          },
          {
            text: preprocessPersianText(mealName),
            style: 'tableCell',
            alignment: 'right'
          }
        ]);
        mealNumber++;
      });
    }
  }

  // اگر هیچ وعده‌ای وجود نداشت
  if (!hasAnyMeal || tableBody.length === 1) {
    tableBody.push([
      {
        text: preprocessPersianText('-'),
        style: 'tableCellCenter',
        alignment: 'center'
      },
      {
        text: preprocessPersianText('-'),
        style: 'tableCellCenter',
        alignment: 'center'
      },
      {
        text: preprocessPersianText('-'),
        style: 'tableCellCenter',
        alignment: 'center'
      },
      {
        text: preprocessPersianText('برنامه غذایی تعیین نشده است'),
        style: 'tableCell',
        alignment: 'right',
        color: '#64748b'
      }
    ]);
  }

  // اضافه کردن جدول به محتوا
  content.push({
    table: {
      widths: ['10%', '20%', '25%', '45%'],
      body: tableBody
    },
    layout: modernTableLayout,
    margin: [0, 0, 0, 25],
    direction: 'rtl'
  });

  return content;
}

// ایجاد پشت صفحه دوم: مکمل‌ها و ویتامین‌ها
export function createSupplementProgramPageTwoBack(student: Student, trainerProfile: TrainerProfile): any[] {
  const content: any[] = [];
  
  // عنوان پشت صفحه دوم
  content.push({
    text: preprocessPersianText('برنامه مکمل و ویتامین'),
    style: 'sectionTitle',
    margin: [0, 25, 0, 20],
    color: '#e67e22',
    direction: 'rtl',
    fontSize: 18,
    bold: true,
    alignment: 'center'
  });

  // دریافت داده‌های مکمل‌ها از دیتابیس
  const supplementsData = JSON.parse(localStorage.getItem('supplements') || '[]');
  
  // جمع‌آوری تمام مکمل‌ها و ویتامین‌ها
  const tableBody = [];
  
  // هدر جدول
  tableBody.push([
    {
      text: preprocessPersianText('شماره'),
      style: 'tableHeader',
      alignment: 'center'
    },
    {
      text: preprocessPersianText('دوز مصرف'),
      style: 'tableHeader',
      alignment: 'center'
    },
    {
      text: preprocessPersianText('زمان مصرف'),
      style: 'tableHeader',
      alignment: 'center'
    },
    {
      text: preprocessPersianText('مکمل یا ویتامین'),
      style: 'tableHeader',
      alignment: 'right'
    }
  ]);

  let supplementNumber = 1;
  let hasAnyItem = false;

  // پردازش مکمل‌ها
  if (student.supplements && student.supplements.length > 0) {
    hasAnyItem = true;
    student.supplements.forEach((suppId) => {
      const supplementInfo = supplementsData.find((supp: any) => supp.id === suppId);
      if (supplementInfo) {
        const name = supplementInfo.name || `مکمل ناشناخته (${suppId})`;
        const dosage = supplementInfo.dosage || toPersianDigits('1') + ' عدد';
        const timing = supplementInfo.timing || 'بعد از تمرین';
        
        tableBody.push([
          {
            text: toPersianDigits(supplementNumber.toString()),
            style: 'tableCellCenter',
            alignment: 'center'
          },
          {
            text: preprocessPersianText(dosage),
            style: 'tableCellCenter',
            alignment: 'center'
          },
          {
            text: preprocessPersianText(timing),
            style: 'tableCellCenter',
            alignment: 'center'
          },
          {
            text: preprocessPersianText(name),
            style: 'tableCell',
            alignment: 'right'
          }
        ]);
        supplementNumber++;
      }
    });
  }

  // پردازش ویتامین‌ها
  if (student.vitamins && student.vitamins.length > 0) {
    hasAnyItem = true;
    student.vitamins.forEach((vitaminId) => {
      const vitaminInfo = supplementsData.find((supp: any) => supp.id === vitaminId);
      if (vitaminInfo) {
        const name = vitaminInfo.name || `ویتامین ناشناخته (${vitaminId})`;
        const dosage = vitaminInfo.dosage || toPersianDigits('1') + ' عدد';
        const timing = vitaminInfo.timing || 'با وعده غذایی';
        
        tableBody.push([
          {
            text: toPersianDigits(supplementNumber.toString()),
            style: 'tableCellCenter',
            alignment: 'center'
          },
          {
            text: preprocessPersianText(dosage),
            style: 'tableCellCenter',
            alignment: 'center'
          },
          {
            text: preprocessPersianText(timing),
            style: 'tableCellCenter',
            alignment: 'center'
          },
          {
            text: preprocessPersianText(name),
            style: 'tableCell',
            alignment: 'right'
          }
        ]);
        supplementNumber++;
      }
    });
  }

  // اگر هیچ مکمل یا ویتامینی وجود نداشت
  if (!hasAnyItem || tableBody.length === 1) {
    tableBody.push([
      {
        text: preprocessPersianText('-'),
        style: 'tableCellCenter',
        alignment: 'center'
      },
      {
        text: preprocessPersianText('-'),
        style: 'tableCellCenter',
        alignment: 'center'
      },
      {
        text: preprocessPersianText('-'),
        style: 'tableCellCenter',
        alignment: 'center'
      },
      {
        text: preprocessPersianText('برنامه مکمل و ویتامین تعیین نشده است'),
        style: 'tableCell',
        alignment: 'right',
        color: '#64748b'
      }
    ]);
  }

  // اضافه کردن جدول به محتوا
  content.push({
    table: {
      widths: ['10%', '20%', '25%', '45%'],
      body: tableBody
    },
    layout: modernTableLayout,
    margin: [0, 0, 0, 25],
    direction: 'rtl'
  });

  // نکات مکمل (اگر وجود داشت)
  if (student.supplementNotes) {
    content.push({
      text: preprocessPersianText('نکات مصرف:'),
      style: 'sectionTitle',
      margin: [0, 35, 0, 15],
      alignment: 'right',
      fontSize: 14,
      color: '#e67e22'
    });
    
    content.push({
      text: preprocessPersianText(student.supplementNotes),
      style: 'notes',
      alignment: 'right',
      fontSize: 11,
      margin: [15, 15, 15, 15],
      direction: 'rtl'
    });
  }

  return content;
}
