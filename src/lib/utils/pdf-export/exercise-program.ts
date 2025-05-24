
import { Student } from '@/components/students/StudentTypes';
import { TrainerProfile, TableCellContent } from './types';
import { toPersianDigits, preprocessPersianText } from './pdf-fonts';
import { getDayName } from '@/lib/utils';
import { createSectionHeader, configureTableStyles } from './pdf-styling';
import { getExerciseName } from './data-helpers';

// ایجاد برنامه تمرینی
export function createExerciseProgram(student: Student, trainerProfile: TrainerProfile): any[] {
  const content: any[] = [];
  
  // هدر بخش
  content.push(createSectionHeader("برنامه تمرینی هفتگی"));
  
  // برای هر روز تمرینی (5 روز)
  for (let day = 1; day <= 5; day++) {
    const dayKey = `exercisesDay${day}` as keyof Student;
    const daySetKey = `exerciseSetsDay${day}` as keyof Student;
    const dayRepsKey = `exerciseRepsDay${day}` as keyof Student;
    
    const exercises = student[dayKey] as number[] || [];
    const sets = student[daySetKey] as Record<number, number> || {};
    const reps = student[dayRepsKey] as Record<number, string> || {};
    
    if (exercises && exercises.length > 0) {
      // نام روز
      const dayName = getDayName(day);
      content.push({
        text: preprocessPersianText(`روز ${toPersianDigits(day)}: ${dayName}`),
        style: 'subheader',
        margin: [0, 15, 0, 5]
      });
      
      // جدول تمرینات
      const tableData: (TableCellContent | { text: string; style: string })[][] = [
        [
          { text: '#', style: 'tableHeader' },
          { text: 'تمرین', style: 'tableHeader' },
          { text: 'ست', style: 'tableHeader' },
          { text: 'تکرار', style: 'tableHeader' }
        ]
      ];
      
      exercises.forEach((exerciseId, index) => {
        const exerciseName = getExerciseName(exerciseId) || `تمرین ${toPersianDigits(index + 1)}`;
        const setCount = sets[exerciseId] ? toPersianDigits(sets[exerciseId]) : '-';
        const repInfo = reps[exerciseId] || '-';
        
        tableData.push([
          { text: toPersianDigits(index + 1), style: 'tableCell', alignment: 'center' },
          { text: preprocessPersianText(exerciseName), style: 'tableCell' },
          { text: setCount, style: 'tableCell', alignment: 'center' },
          { text: preprocessPersianText(repInfo), style: 'tableCell', alignment: 'center' }
        ]);
      });
      
      content.push({
        table: {
          widths: ['8%', '52%', '20%', '20%'],
          body: tableData
        },
        layout: configureTableStyles('primary'),
        margin: [0, 0, 0, 10]
      });
    }
  }
  
  // نکات تمرینی
  if (student.notes) {
    content.push(createSectionHeader("نکات تمرینی"));
    content.push({
      text: preprocessPersianText(student.notes),
      style: 'notes'
    });
  }
  
  return content;
}
