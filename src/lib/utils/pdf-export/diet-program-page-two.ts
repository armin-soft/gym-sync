
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

  // محتوای ۷ روز هفته
  const weekContent = [];
  let hasAnyMeal = false;

  for (let day = 1; day <= 7; day++) {
    const dayKey = `mealsDay${day}` as keyof Student;
    const meals = student[dayKey] as number[] || [];
    
    const dayContent: any = {
      text: [
        {
          text: preprocessPersianText(getDayName(day)),
          bold: true,
          fontSize: 12,
          color: '#27ae60',
          direction: 'rtl'
        },
        '\n'
      ],
      margin: [0, 0, 0, 15]
    };

    if (meals && meals.length > 0) {
      hasAnyMeal = true;
      const mealList: any[] = [];
      meals.forEach((mealId, index) => {
        const mealName = getMealName(mealId);
        mealList.push({
          text: `${toPersianDigits((index + 1).toString())}. ${preprocessPersianText(mealName)}\n`,
          fontSize: 10,
          direction: 'rtl',
          alignment: 'right',
          margin: [0, 1, 0, 1]
        });
      });
      dayContent.text = dayContent.text.concat(mealList);
    } else {
      dayContent.text.push({
        text: preprocessPersianText('وعده‌ای تعیین نشده'),
        fontSize: 9,
        color: '#64748b',
        direction: 'rtl',
        style: 'italic'
      });
    }
    
    weekContent.push(dayContent);
  }

  if (hasAnyMeal || weekContent.some(day => day.text.length > 1)) {
    // تقسیم هفته به دو ستون (۴ روز اول و ۳ روز آخر)
    content.push({
      columns: [
        {
          width: '48%',
          stack: weekContent.slice(4, 7) // پنج‌شنبه تا جمعه
        },
        {
          width: '4%',
          text: ''
        },
        {
          width: '48%',
          stack: weekContent.slice(0, 4) // شنبه تا چهارشنبه
        }
      ],
      direction: 'rtl',
      margin: [0, 0, 0, 25]
    });
  } else {
    content.push({
      text: preprocessPersianText('برنامه غذایی تعیین نشده است.'),
      style: 'notes',
      alignment: 'center',
      margin: [0, 60, 0, 60],
      fontSize: 14,
      color: '#64748b'
    });
  }

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
  
  let hasAnyItem = false;
  const supplementContent = [];
  const vitaminContent = [];

  // پردازش مکمل‌ها
  if (student.supplements && student.supplements.length > 0) {
    hasAnyItem = true;
    const suppList: any[] = [{
      text: preprocessPersianText('مکمل‌ها:'),
      bold: true,
      fontSize: 14,
      color: '#e67e22',
      direction: 'rtl',
      margin: [0, 0, 0, 10]
    }];

    student.supplements.forEach((suppId, index) => {
      const supplementInfo = supplementsData.find((supp: any) => supp.id === suppId);
      if (supplementInfo) {
        const name = supplementInfo.name || `مکمل ناشناخته (${suppId})`;
        const dosage = supplementInfo.dosage || '';
        const timing = supplementInfo.timing || '';
        
        suppList.push({
          text: `${toPersianDigits((index + 1).toString())}. ${preprocessPersianText(name)}${dosage ? ` - ${preprocessPersianText(dosage)}` : ''}${timing ? ` - ${preprocessPersianText(timing)}` : ''}\n`,
          fontSize: 11,
          direction: 'rtl',
          alignment: 'right',
          margin: [0, 2, 0, 2]
        });
      }
    });
    
    supplementContent.push({
      text: suppList,
      margin: [0, 0, 0, 20]
    });
  }

  // پردازش ویتامین‌ها
  if (student.vitamins && student.vitamins.length > 0) {
    hasAnyItem = true;
    const vitList: any[] = [{
      text: preprocessPersianText('ویتامین‌ها:'),
      bold: true,
      fontSize: 14,
      color: '#e67e22',
      direction: 'rtl',
      margin: [0, 0, 0, 10]
    }];

    student.vitamins.forEach((vitaminId, index) => {
      const vitaminInfo = supplementsData.find((supp: any) => supp.id === vitaminId);
      if (vitaminInfo) {
        const name = vitaminInfo.name || `ویتامین ناشناخته (${vitaminId})`;
        const dosage = vitaminInfo.dosage || '';
        const timing = vitaminInfo.timing || '';
        
        vitList.push({
          text: `${toPersianDigits((index + 1).toString())}. ${preprocessPersianText(name)}${dosage ? ` - ${preprocessPersianText(dosage)}` : ''}${timing ? ` - ${preprocessPersianText(timing)}` : ''}\n`,
          fontSize: 11,
          direction: 'rtl',
          alignment: 'right',
          margin: [0, 2, 0, 2]
        });
      }
    });
    
    vitaminContent.push({
      text: vitList,
      margin: [0, 0, 0, 20]
    });
  }

  if (hasAnyItem) {
    // تقسیم به دو ستون برای مکمل‌ها و ویتامین‌ها
    content.push({
      columns: [
        {
          width: '48%',
          stack: vitaminContent
        },
        {
          width: '4%',
          text: ''
        },
        {
          width: '48%',
          stack: supplementContent
        }
      ],
      direction: 'rtl',
      margin: [0, 0, 0, 25]
    });
  } else {
    content.push({
      text: preprocessPersianText('برنامه مکمل و ویتامین تعیین نشده است.'),
      style: 'notes',
      alignment: 'center',
      margin: [0, 60, 0, 60],
      fontSize: 14,
      color: '#64748b'
    });
  }

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
