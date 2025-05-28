
import { Student } from '@/components/students/StudentTypes';
import { TrainerProfile } from './types';
import { toPersianDigits, preprocessPersianText } from './pdf-fonts';
import { 
  getStudentDietData, 
  getMealNameFromStorage,
  getMealTypeFromStorage 
} from './student-data-helper';

// نام‌های روزهای هفته برای برنامه غذایی
const getDietDayName = (day: number): string => {
  const dayNames: Record<number, string> = {
    1: 'شنبه',
    2: 'یکشنبه',
    3: 'دوشنبه', 
    4: 'سه‌شنبه',
    5: 'چهارشنبه',
    6: 'پنج‌شنبه',
    7: 'جمعه'
  };
  return dayNames[day] || `روز ${toPersianDigits(day.toString())}`;
};

// ایجاد برنامه غذایی دقیق بر اساس داده‌های شاگرد
export function createAccurateDietProgram(student: Student, trainerProfile: TrainerProfile): any[] {
  const content: any[] = [];
  const dietData = getStudentDietData(student);
  
  if (dietData.length === 0) {
    content.push({
      text: 'هیچ برنامه غذایی برای این شاگرد تعیین نشده است.',
      style: 'notes',
      alignment: 'center',
      direction: 'rtl',
      margin: [0, 20, 0, 20]
    });
    return content;
  }

  // عنوان جدول
  const tableData: any[][] = [
    [
      { text: 'شماره', style: 'tableHeader', alignment: 'center' },
      { text: 'روز', style: 'tableHeader', alignment: 'center' },
      { text: 'نوع وعده', style: 'tableHeader', alignment: 'center' },
      { text: 'نام غذا', style: 'tableHeader', alignment: 'right' }
    ]
  ];

  let rowNumber = 1;

  // اضافه کردن داده‌های غذایی
  dietData.forEach(dayData => {
    const dayName = getDietDayName(dayData.day);
    
    dayData.meals.forEach((mealId: number) => {
      const mealName = getMealNameFromStorage(mealId);
      const mealType = getMealTypeFromStorage(mealId);
      
      tableData.push([
        { text: toPersianDigits(rowNumber.toString()), style: 'tableCell', alignment: 'center' },
        { text: preprocessPersianText(dayName), style: 'tableCell', alignment: 'center' },
        { text: preprocessPersianText(mealType), style: 'tableCell', alignment: 'center' },
        { text: preprocessPersianText(mealName), style: 'tableCell', alignment: 'right' }
      ]);
      
      rowNumber++;
    });
  });

  // جدول برنامه غذایی
  content.push({
    table: {
      widths: ['10%', '25%', '25%', '40%'],
      body: tableData,
      headerRows: 1
    },
    layout: {
      fillColor: function(rowIndex: number) {
        return (rowIndex === 0) ? '#27ae60' : (rowIndex % 2 === 0 ? '#f8fafc' : null);
      },
      hLineWidth: () => 1,
      vLineWidth: () => 1,
      hLineColor: () => '#e2e8f0',
      vLineColor: () => '#e2e8f0'
    },
    margin: [0, 0, 0, 15],
    direction: 'rtl'
  });

  return content;
}
