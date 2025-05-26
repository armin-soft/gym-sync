
import { Student } from '@/components/students/StudentTypes';
import { TrainerProfile, TableCellContent } from './types';
import { toPersianDigits, preprocessPersianText } from './pdf-fonts';
import { getExerciseName } from './data-helpers';

// تابع دریافت نام روز برای برنامه تمرینی (روز اول تا روز ششم)
function getExerciseDayName(day: number): string {
  const dayNames: Record<number, string> = {
    1: 'روز اول',
    2: 'روز دوم', 
    3: 'روز سوم',
    4: 'روز چهارم',
    5: 'روز پنجم',
    6: 'روز ششم'
  };
  return dayNames[day] || `روز ${day}`;
}

// ایجاد صفحه اول: فقط برنامه تمرینی
export function createExerciseProgramPageOne(student: Student, trainerProfile: TrainerProfile): any[] {
  const content: any[] = [];
  
  // عنوان صفحه اول
  content.push({
    text: 'برنامه تمرینی',
    style: 'sectionTitle',
    margin: [0, 20, 0, 15],
    color: '#7c3aed',
    direction: 'rtl',
    fontSize: 18,
    bold: true,
    alignment: 'center'
  });
  
  // جدول تمرینات با ترتیب: شماره، روز، نام تمرین، ست، تکرار
  const tableData: (TableCellContent | { text: string; style: string })[][] = [
    [
      { text: 'ردیف', style: 'tableHeader', alignment: 'center' },
      { text: 'روز تمرین', style: 'tableHeader', alignment: 'center' },
      { text: 'نام تمرین', style: 'tableHeader', alignment: 'right' },
      { text: 'تعداد ست', style: 'tableHeader', alignment: 'center' },
      { text: 'تعداد تکرار', style: 'tableHeader', alignment: 'center' }
    ]
  ];
  
  let hasAnyExercise = false;
  let rowNumber = 1;
  const allExerciseRows: any[] = [];
  
  // برای هر روز تمرینی (تا 6 روز) - روزهای 1-4 اجباری، 5-6 اختیاری
  for (let day = 1; day <= 6; day++) {
    const dayKey = `exercisesDay${day}` as keyof Student;
    const daySetKey = `exerciseSetsDay${day}` as keyof Student;
    const dayRepsKey = `exerciseRepsDay${day}` as keyof Student;
    
    const exercises = student[dayKey] as number[] || [];
    const sets = student[daySetKey] as Record<number, number> || {};
    const reps = student[dayRepsKey] as Record<number, string> || {};
    
    console.log(`بررسی روز ${day}: ${dayKey}`, exercises);
    console.log(`ست‌های روز ${day}:`, sets);
    console.log(`تکرارهای روز ${day}:`, reps);
    
    if (exercises && exercises.length > 0) {
      hasAnyExercise = true;
      const dayName = getExerciseDayName(day);
      
      exercises.forEach((exerciseId) => {
        const exerciseName = getExerciseName(exerciseId);
        
        // فقط اگر نام تمرین موجود باشد آن را اضافه کن
        if (exerciseName) {
          const setCount = sets[exerciseId] ? toPersianDigits(sets[exerciseId].toString()) : '۳';
          const repInfo = reps[exerciseId] ? preprocessPersianText(reps[exerciseId]) : '۸-۱۲';
          
          allExerciseRows.push([
            { text: toPersianDigits(rowNumber.toString()), style: 'tableCell', alignment: 'center' },
            { text: preprocessPersianText(dayName), style: 'tableCell', alignment: 'center' },
            { text: preprocessPersianText(exerciseName), style: 'tableCell', alignment: 'right' },
            { text: setCount, style: 'tableCell', alignment: 'center' },
            { text: repInfo, style: 'tableCell', alignment: 'center' }
          ]);
          
          rowNumber++;
        }
      });
    }
  }
  
  // اضافه کردن ردیف‌ها به جدول
  tableData.push(...allExerciseRows);
  
  if (hasAnyExercise) {
    content.push({
      table: {
        widths: ['8%', '22%', '45%', '12%', '13%'],
        body: tableData,
        headerRows: 1
      },
      layout: {
        fillColor: function(rowIndex: number) {
          return (rowIndex === 0) ? '#7c3aed' : (rowIndex % 2 === 0 ? '#f8fafc' : null);
        },
        hLineWidth: () => 1,
        vLineWidth: () => 1,
        hLineColor: () => '#e2e8f0',
        vLineColor: () => '#e2e8f0'
      },
      margin: [0, 0, 0, 20]
    });
  } else {
    console.log('هیچ برنامه تمرینی برای این شاگرد یافت نشد');
    content.push({
      text: 'برنامه تمرینی تعیین نشده است.',
      style: 'notes',
      alignment: 'center',
      margin: [0, 50, 0, 50]
    });
  }
  
  // نکات تمرینی (اگر وجود داشت)
  if (student.notes) {
    content.push({
      text: 'نکات تمرینی:',
      style: 'sectionTitle',
      margin: [0, 30, 0, 10],
      alignment: 'right',
      fontSize: 14
    });
    content.push({
      text: preprocessPersianText(student.notes),
      style: 'notes',
      alignment: 'right',
      fontSize: 11,
      margin: [0, 0, 0, 20]
    });
  }
  
  return content;
}
