
import { Student } from '@/components/students/StudentTypes';
import { TrainerProfile } from './types';
import { toPersianDigits, preprocessPersianText } from './pdf-fonts';
import { 
  getStudentExerciseData, 
  getExerciseNameFromStorage 
} from './student-data-helper';

// نام‌های روزهای هفته
const getDayName = (day: number): string => {
  const dayNames: Record<number, string> = {
    1: 'شنبه',
    2: 'یکشنبه', 
    3: 'دوشنبه',
    4: 'سه‌شنبه',
    5: 'چهارشنبه',
    6: 'پنج‌شنبه'
  };
  return dayNames[day] || `روز ${toPersianDigits(day.toString())}`;
};

// ایجاد برنامه تمرینی دقیق بر اساس داده‌های شاگرد
export function createAccurateExerciseProgram(student: Student, trainerProfile: TrainerProfile): any[] {
  const content: any[] = [];
  const exerciseData = getStudentExerciseData(student);
  
  if (exerciseData.length === 0) {
    content.push({
      text: 'هیچ برنامه تمرینی برای این شاگرد تعیین نشده است.',
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
      { text: 'ست', style: 'tableHeader', alignment: 'center' },
      { text: 'تکرار', style: 'tableHeader', alignment: 'center' },
      { text: 'نام تمرین', style: 'tableHeader', alignment: 'right' }
    ]
  ];

  let rowNumber = 1;

  // اضافه کردن داده‌های تمرینی
  exerciseData.forEach(dayData => {
    const dayName = getDayName(dayData.day);
    
    dayData.exercises.forEach((exercise: any) => {
      const exerciseName = getExerciseNameFromStorage(exercise.id);
      const sets = toPersianDigits(exercise.sets.toString());
      const reps = toPersianDigits(exercise.reps);
      
      tableData.push([
        { text: toPersianDigits(rowNumber.toString()), style: 'tableCell', alignment: 'center' },
        { text: preprocessPersianText(dayName), style: 'tableCell', alignment: 'center' },
        { text: sets, style: 'tableCell', alignment: 'center' },
        { text: reps, style: 'tableCell', alignment: 'center' },
        { text: preprocessPersianText(exerciseName), style: 'tableCell', alignment: 'right' }
      ]);
      
      rowNumber++;
    });
  });

  // جدول برنامه تمرینی
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
    margin: [0, 0, 0, 15],
    direction: 'rtl'
  });

  return content;
}
