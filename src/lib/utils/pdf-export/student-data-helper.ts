
import { Student } from '@/components/students/StudentTypes';
import { toPersianNumbers } from '@/lib/utils/numbers';

// تابع دریافت داده‌های تمرینی شاگرد
export function getStudentExerciseData(student: Student) {
  const exerciseData: any[] = [];
  
  // بررسی تمرین‌های روزانه
  for (let day = 1; day <= 6; day++) {
    const exercisesKey = `exercisesDay${day}` as keyof Student;
    const setsKey = `exerciseSetsDay${day}` as keyof Student;
    const repsKey = `exerciseRepsDay${day}` as keyof Student;
    
    const exercises = student[exercisesKey] as number[] || [];
    const sets = student[setsKey] as Record<number, number> || {};
    const reps = student[repsKey] as Record<number, string> || {};
    
    if (exercises && exercises.length > 0) {
      exerciseData.push({
        day,
        exercises: exercises.map(exerciseId => ({
          id: exerciseId,
          sets: sets[exerciseId] || 0,
          reps: reps[exerciseId] || '0'
        }))
      });
    }
  }
  
  return exerciseData;
}

// تابع دریافت داده‌های غذایی شاگرد
export function getStudentDietData(student: Student) {
  const dietData: any[] = [];
  
  // بررسی وعده‌های غذایی روزانه
  for (let day = 1; day <= 7; day++) {
    const mealsKey = `mealsDay${day}` as keyof Student;
    const meals = student[mealsKey] as number[] || [];
    
    if (meals && meals.length > 0) {
      dietData.push({
        day,
        meals: meals
      });
    }
  }
  
  return dietData;
}

// تابع دریافت داده‌های مکمل و ویتامین شاگرد
export function getStudentSupplementData(student: Student) {
  return {
    supplements: student.supplements || [],
    vitamins: student.vitamins || []
  };
}

// تابع دریافت نام تمرین از localStorage
export function getExerciseNameFromStorage(exerciseId: number): string {
  try {
    const exercises = JSON.parse(localStorage.getItem('exercises') || '[]');
    const exercise = exercises.find((ex: any) => ex.id === exerciseId);
    return exercise?.name || `تمرین ${toPersianNumbers(exerciseId.toString())}`;
  } catch {
    return `تمرین ${toPersianNumbers(exerciseId.toString())}`;
  }
}

// تابع دریافت نام غذا از localStorage
export function getMealNameFromStorage(mealId: number): string {
  try {
    const meals = JSON.parse(localStorage.getItem('meals') || '[]');
    const meal = meals.find((m: any) => m.id === mealId);
    return meal?.name || `غذای ${toPersianNumbers(mealId.toString())}`;
  } catch {
    return `غذای ${toPersianNumbers(mealId.toString())}`;
  }
}

// تابع دریافت نوع غذا از localStorage
export function getMealTypeFromStorage(mealId: number): string {
  try {
    const meals = JSON.parse(localStorage.getItem('meals') || '[]');
    const meal = meals.find((m: any) => m.id === mealId);
    return meal?.type || 'وعده غذایی';
  } catch {
    return 'وعده غذایی';
  }
}

// تابع دریافت نام مکمل از localStorage
export function getSupplementNameFromStorage(suppId: number): string {
  try {
    const supplements = JSON.parse(localStorage.getItem('supplements') || '[]');
    const supplement = supplements.find((s: any) => s.id === suppId);
    return supplement?.name || `مکمل ${toPersianNumbers(suppId.toString())}`;
  } catch {
    return `مکمل ${toPersianNumbers(suppId.toString())}`;
  }
}

// تابع دریافت دوز مکمل از localStorage
export function getSupplementDosageFromStorage(suppId: number): string {
  try {
    const supplements = JSON.parse(localStorage.getItem('supplements') || '[]');
    const supplement = supplements.find((s: any) => s.id === suppId);
    return supplement?.dosage ? toPersianNumbers(supplement.dosage) : 'تعریف نشده';
  } catch {
    return 'تعریف نشده';
  }
}

// تابع دریافت زمان مصرف مکمل از localStorage
export function getSupplementTimingFromStorage(suppId: number): string {
  try {
    const supplements = JSON.parse(localStorage.getItem('supplements') || '[]');
    const supplement = supplements.find((s: any) => s.id === suppId);
    return supplement?.timing ? toPersianNumbers(supplement.timing) : 'تعریف نشده';
  } catch {
    return 'تعریف نشده';
  }
}

// تابع دریافت نوع مکمل از localStorage
export function getSupplementTypeFromStorage(suppId: number): string {
  try {
    const supplements = JSON.parse(localStorage.getItem('supplements') || '[]');
    const supplement = supplements.find((s: any) => s.id === suppId);
    return supplement?.type || 'مکمل';
  } catch {
    return 'مکمل';
  }
}
