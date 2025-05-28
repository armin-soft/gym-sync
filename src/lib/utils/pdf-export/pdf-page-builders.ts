
import { Student } from '@/components/students/StudentTypes';
import { toPersianDigits, preprocessPersianText } from './pdf-fonts';
import { 
  getExerciseNameFromStorage,
  getMealNameFromStorage,
  getSupplementNameFromStorage,
  getSupplementDosageFromStorage,
  getSupplementTimingFromStorage
} from './student-data-helper';

// ایجاد صفحه اول - برنامه تمرینی (پشت و رو)
export function createExercisePage(student: Student): any[] {
  const content: any[] = [];
  
  // صفحه اول (روی) - روزهای 1 تا 3
  content.push(createExercisePageContent(student, [1, 2, 3]));
  
  // شکست صفحه
  content.push({ text: '', pageBreak: 'before' });
  
  // صفحه اول (پشت) - روزهای 4 تا 6
  content.push(createExercisePageContent(student, [4, 5, 6]));
  
  return content;
}

// ایجاد محتوای برنامه تمرینی
export function createExercisePageContent(student: Student, days: number[]): any {
  const exerciseRows: any[] = [];
  let rowNumber = 1;
  
  // افزودن هدر جدول
  exerciseRows.push([
    { text: 'شماره', style: 'tableHeader', alignment: 'center' },
    { text: 'روز', style: 'tableHeader', alignment: 'center' },
    { text: 'ست', style: 'tableHeader', alignment: 'center' },
    { text: 'تکرار', style: 'tableHeader', alignment: 'center' },
    { text: 'نام تمرین', style: 'tableHeader', alignment: 'right' }
  ]);
  
  // افزودن تمرینات برای روزهای انتخابی
  days.forEach(day => {
    const exercisesKey = `exercisesDay${day}` as keyof Student;
    const setsKey = `exerciseSetsDay${day}` as keyof Student;
    const repsKey = `exerciseRepsDay${day}` as keyof Student;
    
    const exercises = student[exercisesKey] as number[] || [];
    const sets = student[setsKey] as Record<number, number> || {};
    const reps = student[repsKey] as Record<number, string> || {};
    
    if (exercises.length > 0) {
      exercises.forEach(exerciseId => {
        exerciseRows.push([
          { text: toPersianDigits(rowNumber.toString()), style: 'tableCell', alignment: 'center' },
          { text: toPersianDigits(day.toString()), style: 'tableCell', alignment: 'center' },
          { text: toPersianDigits((sets[exerciseId] || 0).toString()), style: 'tableCell', alignment: 'center' },
          { text: toPersianDigits(reps[exerciseId] || '0'), style: 'tableCell', alignment: 'center' },
          { text: preprocessPersianText(getExerciseNameFromStorage(exerciseId)), style: 'tableCell', alignment: 'right' }
        ]);
        rowNumber++;
      });
    }
  });
  
  return {
    table: {
      headerRows: 1,
      widths: ['10%', '15%', '15%', '15%', '45%'],
      body: exerciseRows
    },
    layout: {
      fillColor: function (rowIndex: number) {
        return (rowIndex === 0) ? '#4a5568' : (rowIndex % 2 === 0 ? '#f7fafc' : null);
      },
      hLineWidth: () => 1,
      vLineWidth: () => 1,
      hLineColor: () => '#e2e8f0',
      vLineColor: () => '#e2e8f0'
    },
    margin: [0, 20, 0, 0]
  };
}

// ایجاد صفحه دوم - برنامه غذایی
export function createDietPage(student: Student): any {
  const dietRows: any[] = [];
  let rowNumber = 1;
  
  // افزودن هدر جدول
  dietRows.push([
    { text: 'شماره', style: 'tableHeader', alignment: 'center' },
    { text: 'روز', style: 'tableHeader', alignment: 'center' },
    { text: 'وعده غذایی', style: 'tableHeader', alignment: 'center' },
    { text: 'غذا', style: 'tableHeader', alignment: 'right' }
  ]);
  
  // افزودن وعده‌های غذایی برای 7 روز
  for (let day = 1; day <= 7; day++) {
    const mealsKey = `mealsDay${day}` as keyof Student;
    const meals = student[mealsKey] as number[] || [];
    
    if (meals.length > 0) {
      meals.forEach(mealId => {
        const mealName = getMealNameFromStorage(mealId);
        const mealType = getMealTypeFromStorage(mealId);
        
        dietRows.push([
          { text: toPersianDigits(rowNumber.toString()), style: 'tableCell', alignment: 'center' },
          { text: toPersianDigits(day.toString()), style: 'tableCell', alignment: 'center' },
          { text: preprocessPersianText(mealType), style: 'tableCell', alignment: 'center' },
          { text: preprocessPersianText(mealName), style: 'tableCell', alignment: 'right' }
        ]);
        rowNumber++;
      });
    }
  }
  
  return {
    table: {
      headerRows: 1,
      widths: ['15%', '15%', '25%', '45%'],
      body: dietRows
    },
    layout: {
      fillColor: function (rowIndex: number) {
        return (rowIndex === 0) ? '#4a5568' : (rowIndex % 2 === 0 ? '#f7fafc' : null);
      },
      hLineWidth: () => 1,
      vLineWidth: () => 1,
      hLineColor: () => '#e2e8f0',
      vLineColor: () => '#e2e8f0'
    },
    margin: [0, 20, 0, 0]
  };
}

// ایجاد صفحه سوم - مکمل‌ها و ویتامین‌ها
export function createSupplementPage(student: Student): any {
  const supplementRows: any[] = [];
  let rowNumber = 1;
  
  // افزودن هدر جدول
  supplementRows.push([
    { text: 'شماره', style: 'tableHeader', alignment: 'center' },
    { text: 'روز', style: 'tableHeader', alignment: 'center' },
    { text: 'دوز مصرف', style: 'tableHeader', alignment: 'center' },
    { text: 'زمان مصرف', style: 'tableHeader', alignment: 'center' },
    { text: 'مکمل یا ویتامین', style: 'tableHeader', alignment: 'right' }
  ]);
  
  // افزودن مکمل‌ها
  const supplements = student.supplements || [];
  supplements.forEach(suppId => {
    const name = getSupplementNameFromStorage(suppId);
    const dosage = getSupplementDosageFromStorage(suppId);
    const timing = getSupplementTimingFromStorage(suppId);
    
    supplementRows.push([
      { text: toPersianDigits(rowNumber.toString()), style: 'tableCell', alignment: 'center' },
      { text: 'روزانه', style: 'tableCell', alignment: 'center' },
      { text: preprocessPersianText(dosage), style: 'tableCell', alignment: 'center' },
      { text: preprocessPersianText(timing), style: 'tableCell', alignment: 'center' },
      { text: preprocessPersianText(name), style: 'tableCell', alignment: 'right' }
    ]);
    rowNumber++;
  });
  
  // افزودن ویتامین‌ها
  const vitamins = student.vitamins || [];
  vitamins.forEach(vitId => {
    const name = getSupplementNameFromStorage(vitId);
    const dosage = getSupplementDosageFromStorage(vitId);
    const timing = getSupplementTimingFromStorage(vitId);
    
    supplementRows.push([
      { text: toPersianDigits(rowNumber.toString()), style: 'tableCell', alignment: 'center' },
      { text: 'روزانه', style: 'tableCell', alignment: 'center' },
      { text: preprocessPersianText(dosage), style: 'tableCell', alignment: 'center' },
      { text: preprocessPersianText(timing), style: 'tableCell', alignment: 'center' },
      { text: preprocessPersianText(name), style: 'tableCell', alignment: 'right' }
    ]);
    rowNumber++;
  });
  
  return {
    table: {
      headerRows: 1,
      widths: ['10%', '15%', '20%', '20%', '35%'],
      body: supplementRows
    },
    layout: {
      fillColor: function (rowIndex: number) {
        return (rowIndex === 0) ? '#4a5568' : (rowIndex % 2 === 0 ? '#f7fafc' : null);
      },
      hLineWidth: () => 1,
      vLineWidth: () => 1,
      hLineColor: () => '#e2e8f0',
      vLineColor: () => '#e2e8f0'
    },
    margin: [0, 20, 0, 0]
  };
}

// تابع کمکی برای دریافت نوع وعده غذایی
function getMealTypeFromStorage(mealId: number): string {
  try {
    const meals = JSON.parse(localStorage.getItem('meals') || '[]');
    const meal = meals.find((m: any) => m.id === mealId);
    return meal?.type || 'وعده غذایی';
  } catch {
    return 'وعده غذایی';
  }
}
