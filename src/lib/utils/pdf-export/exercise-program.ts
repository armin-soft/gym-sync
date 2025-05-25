
import { Student } from '@/components/students/StudentTypes';
import { TrainerProfile, TableCellContent } from './types';
import { toPersianDigits, preprocessPersianText } from './pdf-fonts';
import { getExerciseName } from './data-helpers';

// تابع دریافت نام روز برای برنامه تمرینی (روز اول تا روز پنجم)
function getExerciseDayName(day: number): string {
  const dayNames: Record<number, string> = {
    1: 'روز اول',
    2: 'روز دوم', 
    3: 'روز سوم',
    4: 'روز چهارم',
    5: 'روز پنجم'
  };
  return dayNames[day] || `روز ${day}`;
}

// ایجاد برنامه تمرینی با ترتیب درست
export function createExerciseProgram(student: Student, trainerProfile: TrainerProfile): any[] {
  const content: any[] = [];
  
  // جدول با ترتیب صحیح: شماره، روز، ست، تکرار، نام تمرین
  const tableData: (TableCellContent | { text: string; style: string })[][] = [
    [
      { text: 'شماره', style: 'tableHeader', alignment: 'center' },
      { text: 'روز', style: 'tableHeader', alignment: 'center' },
      { text: 'ست', style: 'tableHeader', alignment: 'center' },
      { text: 'تکرار', style: 'tableHeader', alignment: 'center' },
      { text: 'نام تمرین', style: 'tableHeader', alignment: 'right' }
    ]
  ];
  
  let hasAnyExercise = false;
  let rowNumber = 1;
  const allExerciseRows: any[] = [];
  
  // برای هر روز تمرینی (5 روز) - فقط روزهای روزانه
  for (let day = 1; day <= 5; day++) {
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
          const setCount = sets[exerciseId] ? toPersianDigits(sets[exerciseId].toString()) : '۰';
          const repInfo = reps[exerciseId] ? preprocessPersianText(reps[exerciseId]) : '۰';
          
          allExerciseRows.push([
            { text: toPersianDigits(rowNumber.toString()), style: 'tableCell', alignment: 'center' },
            { text: preprocessPersianText(dayName), style: 'tableCell', alignment: 'center' },
            { text: setCount, style: 'tableCell', alignment: 'center' },
            { text: repInfo, style: 'tableCell', alignment: 'center' },
            { text: preprocessPersianText(exerciseName), style: 'tableCell', alignment: 'right' }
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
        widths: ['10%', '20%', '15%', '15%', '40%'],
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
      margin: [0, 0, 0, 15]
    });
  } else {
    console.log('هیچ برنامه تمرینی برای این شاگرد یافت نشد');
    content.push({
      text: 'برنامه تمرینی تعیین نشده است.',
      style: 'notes',
      alignment: 'center'
    });
  }
  
  // نکات تمرینی (اگر وجود داشت)
  if (student.notes) {
    content.push({
      text: 'نکات تمرینی:',
      style: 'sectionTitle',
      margin: [0, 15, 0, 5],
      alignment: 'right'
    });
    content.push({
      text: preprocessPersianText(student.notes),
      style: 'notes',
      alignment: 'right'
    });
  }
  
  return content;
}
