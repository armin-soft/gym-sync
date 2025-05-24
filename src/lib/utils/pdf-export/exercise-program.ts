
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
  content.push(createSectionHeader("برنامه تمرینی هفتگی", '#7c3aed'));
  
  // حداکثر تعداد روزهای تمرینی
  const maxDays = 5;
  
  // برای هر روز تمرینی (5 روز)
  for (let day = 1; day <= maxDays; day++) {
    const dayKey = `exercisesDay${day}` as keyof Student;
    const daySetKey = `exerciseSetsDay${day}` as keyof Student;
    const dayRepsKey = `exerciseRepsDay${day}` as keyof Student;
    
    const exercises = student[dayKey] as number[] || [];
    const sets = student[daySetKey] as Record<number, number> || {};
    const reps = student[dayRepsKey] as Record<number, string> || {};
    
    // اگر تمرینی برای این روز وجود دارد نمایش بده
    if (exercises && exercises.length > 0) {
      // نام روز
      const dayName = getDayName(day);
      content.push({
        text: preprocessPersianText(`روز ${toPersianDigits(day)}: ${dayName}`),
        style: 'subheader',
        fontSize: 15,
        margin: [0, 15, 0, 5],
        color: '#7c3aed',
        direction: 'rtl'
      });
      
      // جدول تمرینات
      const tableData: (TableCellContent | { text: string; style: string })[][] = [
        [
          { text: 'شماره', style: 'tableHeader', direction: 'rtl' },
          { text: 'تمرین', style: 'tableHeader', direction: 'rtl' },
          { text: 'ست', style: 'tableHeader', direction: 'rtl' },
          { text: 'تکرار', style: 'tableHeader', direction: 'rtl' }
        ]
      ];
      
      exercises.forEach((exerciseId, index) => {
        const exerciseName = getExerciseName(exerciseId) || `تمرین ${toPersianDigits(index + 1)}`;
        const setCount = sets[exerciseId] ? toPersianDigits(sets[exerciseId]) : '-';
        const repInfo = reps[exerciseId] || '-';
        
        tableData.push([
          { text: toPersianDigits(index + 1), style: 'tableCell', alignment: 'center', direction: 'rtl' },
          { text: preprocessPersianText(exerciseName), style: 'tableCell', direction: 'rtl' },
          { text: setCount, style: 'tableCell', alignment: 'center', direction: 'rtl' },
          { text: preprocessPersianText(repInfo), style: 'tableCell', alignment: 'center', direction: 'rtl' }
        ]);
      });
      
      content.push({
        table: {
          widths: ['10%', '50%', '20%', '20%'],
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
    }
  }
  
  // نکات تمرینی
  if (student.notes) {
    content.push(createSectionHeader("نکات تمرینی", '#7c3aed'));
    content.push({
      text: preprocessPersianText(student.notes),
      style: 'notes',
      direction: 'rtl'
    });
  }
  
  return content;
}
