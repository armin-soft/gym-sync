
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

// ایجاد برنامه تمرینی با ترتیب ستون‌های جدید
export function createExerciseProgram(student: Student, trainerProfile: TrainerProfile): any[] {
  const content: any[] = [];
  
  // جدول با ترتیب: شماره، روز، ست، تکرار، نام تمرین
  const tableData: (TableCellContent | { text: string; style: string })[][] = [
    [
      { text: 'شماره', style: 'tableHeader', direction: 'rtl' },
      { text: 'روز', style: 'tableHeader', direction: 'rtl' },
      { text: 'ست', style: 'tableHeader', direction: 'rtl' },
      { text: 'تکرار', style: 'tableHeader', direction: 'rtl' },
      { text: 'نام تمرین', style: 'tableHeader', direction: 'rtl' }
    ]
  ];
  
  let hasAnyExercise = false;
  let rowNumber = 1;
  
  // برای هر روز تمرینی (5 روز)
  for (let day = 1; day <= 5; day++) {
    const dayKey = `exercisesDay${day}` as keyof Student;
    const daySetKey = `exerciseSetsDay${day}` as keyof Student;
    const dayRepsKey = `exerciseRepsDay${day}` as keyof Student;
    
    const exercises = student[dayKey] as number[] || [];
    const sets = student[daySetKey] as Record<number, number> || {};
    const reps = student[dayRepsKey] as Record<number, string> || {};
    
    console.log(`بررسی روز ${day}: ${dayKey}`, exercises);
    
    if (exercises && exercises.length > 0) {
      const dayName = getExerciseDayName(day);
      
      exercises.forEach((exerciseId) => {
        const exerciseName = getExerciseName(exerciseId);
        
        // فقط اگر نام تمرین موجود باشد آن را اضافه کن
        if (exerciseName) {
          hasAnyExercise = true;
          const setCount = sets[exerciseId] ? toPersianDigits(sets[exerciseId].toString()) : '';
          const repInfo = reps[exerciseId] || '';
          
          tableData.push([
            { text: toPersianDigits(rowNumber.toString()), style: 'tableCell', alignment: 'center', direction: 'rtl' },
            { text: preprocessPersianText(dayName), style: 'tableCell', direction: 'rtl' },
            { text: setCount, style: 'tableCell', alignment: 'center', direction: 'rtl' },
            { text: preprocessPersianText(repInfo), style: 'tableCell', alignment: 'center', direction: 'rtl' },
            { text: preprocessPersianText(exerciseName), style: 'tableCell', direction: 'rtl' }
          ]);
          
          rowNumber++;
        }
      });
    }
  }
  
  // اگر هیچ برنامه روزانه‌ای نبود، برنامه کلی را بررسی کن
  if (!hasAnyExercise && student.exercises && student.exercises.length > 0) {
    const sets = student.exerciseSets || {};
    const reps = student.exerciseReps || {};
    
    student.exercises.forEach((exerciseId) => {
      const exerciseName = getExerciseName(exerciseId);
      
      // فقط اگر نام تمرین موجود باشد آن را اضافه کن
      if (exerciseName) {
        hasAnyExercise = true;
        const setCount = sets[exerciseId] ? toPersianDigits(sets[exerciseId].toString()) : '';
        const repInfo = reps[exerciseId] || '';
        
        tableData.push([
          { text: toPersianDigits(rowNumber.toString()), style: 'tableCell', alignment: 'center', direction: 'rtl' },
          { text: 'برنامه کلی', style: 'tableCell', direction: 'rtl' },
          { text: setCount, style: 'tableCell', alignment: 'center', direction: 'rtl' },
          { text: preprocessPersianText(repInfo), style: 'tableCell', alignment: 'center', direction: 'rtl' },
          { text: preprocessPersianText(exerciseName), style: 'tableCell', direction: 'rtl' }
        ]);
        
        rowNumber++;
      }
    });
  }
  
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
      alignment: 'center',
      direction: 'rtl'
    });
  }
  
  // نکات تمرینی (اگر وجود داشت)
  if (student.notes) {
    content.push({
      text: 'نکات تمرینی:',
      style: 'sectionTitle',
      margin: [0, 15, 0, 5],
      direction: 'rtl'
    });
    content.push({
      text: preprocessPersianText(student.notes),
      style: 'notes',
      direction: 'rtl'
    });
  }
  
  return content;
}
