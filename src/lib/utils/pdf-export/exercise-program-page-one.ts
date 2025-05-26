
import { Student } from '@/components/students/StudentTypes';
import { TrainerProfile, TableCellContent } from './types';
import { toPersianDigits, preprocessPersianText } from './pdf-fonts';
import { getExerciseName } from './data-helpers';
import { modernTableLayout } from './modern-styles';

// تابع دریافت نام روز برای برنامه تمرینی
function getExerciseDayName(day: number): string {
  const dayNames: Record<number, string> = {
    1: 'روز اول',
    2: 'روز دوم', 
    3: 'روز سوم',
    4: 'روز چهارم',
    5: 'روز پنجم',
    6: 'روز ششم'
  };
  return dayNames[day] || `روز ${toPersianDigits(day)}`;
}

// ایجاد صفحه اول مدرن: برنامه تمرینی
export function createExerciseProgramPageOne(student: Student, trainerProfile: TrainerProfile): any[] {
  const content: any[] = [];
  
  // عنوان مدرن صفحه اول
  content.push({
    text: preprocessPersianText('برنامه تمرینی'),
    style: 'sectionTitle',
    margin: [0, 25, 0, 20],
    color: '#7c3aed',
    direction: 'rtl',
    fontSize: 20,
    bold: true,
    alignment: 'center'
  });
  
  // جدول تمرینات با طراحی مدرن
  const tableData: (TableCellContent | { text: string; style: string; alignment?: string })[][] = [
    [
      { text: preprocessPersianText('ردیف'), style: 'tableHeader', alignment: 'center' },
      { text: preprocessPersianText('روز تمرین'), style: 'tableHeader', alignment: 'center' },
      { text: preprocessPersianText('نام تمرین'), style: 'tableHeader', alignment: 'right' },
      { text: preprocessPersianText('تعداد ست'), style: 'tableHeader', alignment: 'center' },
      { text: preprocessPersianText('تعداد تکرار'), style: 'tableHeader', alignment: 'center' }
    ]
  ];
  
  let hasAnyExercise = false;
  let rowNumber = 1;
  const allExerciseRows: any[] = [];
  
  // برای هر روز تمرینی (تا 6 روز)
  for (let day = 1; day <= 6; day++) {
    const dayKey = `exercisesDay${day}` as keyof Student;
    const daySetKey = `exerciseSetsDay${day}` as keyof Student;
    const dayRepsKey = `exerciseRepsDay${day}` as keyof Student;
    
    const exercises = student[dayKey] as number[] || [];
    const sets = student[daySetKey] as Record<number, number> || {};
    const reps = student[dayRepsKey] as Record<number, string> || {};
    
    if (exercises && exercises.length > 0) {
      hasAnyExercise = true;
      const dayName = getExerciseDayName(day);
      
      exercises.forEach((exerciseId) => {
        const exerciseName = getExerciseName(exerciseId);
        
        if (exerciseName) {
          const setCount = sets[exerciseId] ? toPersianDigits(sets[exerciseId].toString()) : toPersianDigits('3');
          const repInfo = reps[exerciseId] ? preprocessPersianText(reps[exerciseId]) : preprocessPersianText('۸-۱۲');
          
          allExerciseRows.push([
            { 
              text: toPersianDigits(rowNumber.toString()), 
              style: 'tableCellCenter', 
              alignment: 'center' 
            },
            { 
              text: preprocessPersianText(dayName), 
              style: 'tableCellCenter', 
              alignment: 'center' 
            },
            { 
              text: preprocessPersianText(exerciseName), 
              style: 'tableCell', 
              alignment: 'right' 
            },
            { 
              text: setCount, 
              style: 'tableCellCenter', 
              alignment: 'center' 
            },
            { 
              text: repInfo, 
              style: 'tableCellCenter', 
              alignment: 'center' 
            }
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
        widths: ['10%', '20%', '45%', '12%', '13%'],
        body: tableData,
        headerRows: 1
      },
      layout: modernTableLayout,
      margin: [0, 0, 0, 25]
    });
  } else {
    content.push({
      text: preprocessPersianText('برنامه تمرینی تعیین نشده است.'),
      style: 'notes',
      alignment: 'center',
      margin: [0, 60, 0, 60],
      fontSize: 14,
      color: '#64748b'
    });
  }
  
  // نکات تمرینی با طراحی مدرن
  if (student.notes) {
    content.push({
      text: preprocessPersianText('نکات تمرینی:'),
      style: 'sectionTitle',
      margin: [0, 35, 0, 15],
      alignment: 'right',
      fontSize: 16,
      color: '#4f46e5'
    });
    
    content.push({
      table: {
        widths: ['*'],
        body: [
          [
            {
              text: preprocessPersianText(student.notes),
              style: 'notes',
              alignment: 'right',
              fontSize: 12,
              margin: [15, 15, 15, 15],
              direction: 'rtl'
            }
          ]
        ]
      },
      layout: {
        fillColor: '#f8fafc',
        hLineWidth: () => 1,
        vLineWidth: () => 1,
        hLineColor: () => '#e2e8f0',
        vLineColor: () => '#e2e8f0'
      },
      margin: [0, 0, 0, 25]
    });
  }
  
  return content;
}
