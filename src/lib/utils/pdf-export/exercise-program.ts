
import { Student } from '@/components/students/StudentTypes';
import { TrainerProfile, TableCellContent } from './types';
import { toPersianDigits, preprocessPersianText } from './pdf-fonts';
import { getDayName } from '@/lib/utils';
import { getExerciseName } from './data-helpers';

// ایجاد برنامه تمرینی کامپکت - فقط با داده‌های واقعی شاگرد
export function createExerciseProgram(student: Student, trainerProfile: TrainerProfile): any[] {
  const content: any[] = [];
  
  // جدول کامپکت همه تمرینات
  const tableData: (TableCellContent | { text: string; style: string })[][] = [
    [
      { text: 'روز', style: 'tableHeader', direction: 'rtl' },
      { text: 'تمرین', style: 'tableHeader', direction: 'rtl' },
      { text: 'ست', style: 'tableHeader', direction: 'rtl' },
      { text: 'تکرار', style: 'tableHeader', direction: 'rtl' }
    ]
  ];
  
  let hasAnyExercise = false;
  
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
      hasAnyExercise = true;
      const dayName = getDayName(day);
      
      exercises.forEach((exerciseId, index) => {
        const exerciseName = getExerciseName(exerciseId) || `تمرین ناشناخته (${exerciseId})`;
        const setCount = sets[exerciseId] ? toPersianDigits(sets[exerciseId]) : '-';
        const repInfo = reps[exerciseId] || '-';
        
        tableData.push([
          { 
            text: index === 0 ? preprocessPersianText(dayName) : '', 
            style: 'tableCell', 
            direction: 'rtl' 
          },
          { text: preprocessPersianText(exerciseName), style: 'tableCell', direction: 'rtl' },
          { text: setCount, style: 'tableCell', alignment: 'center', direction: 'rtl' },
          { text: preprocessPersianText(repInfo), style: 'tableCell', alignment: 'center', direction: 'rtl' }
        ]);
      });
    }
  }
  
  // اگر هیچ برنامه روزانه‌ای نبود، برنامه کلی را بررسی کن
  if (!hasAnyExercise && student.exercises && student.exercises.length > 0) {
    hasAnyExercise = true;
    const sets = student.exerciseSets || {};
    const reps = student.exerciseReps || {};
    
    student.exercises.forEach((exerciseId, index) => {
      const exerciseName = getExerciseName(exerciseId) || `تمرین ناشناخته (${exerciseId})`;
      const setCount = sets[exerciseId] ? toPersianDigits(sets[exerciseId]) : '-';
      const repInfo = reps[exerciseId] || '-';
      
      tableData.push([
        { 
          text: index === 0 ? 'برنامه کلی' : '', 
          style: 'tableCell', 
          direction: 'rtl' 
        },
        { text: preprocessPersianText(exerciseName), style: 'tableCell', direction: 'rtl' },
        { text: setCount, style: 'tableCell', alignment: 'center', direction: 'rtl' },
        { text: preprocessPersianText(repInfo), style: 'tableCell', alignment: 'center', direction: 'rtl' }
      ]);
    });
  }
  
  if (hasAnyExercise) {
    content.push({
      table: {
        widths: ['20%', '50%', '15%', '15%'],
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
