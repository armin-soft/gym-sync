
import { Student } from '@/components/students/StudentTypes';
import { TrainerProfile } from './types';
import { getDayName } from '@/lib/utils';
import { getExerciseName, getMealName, getMealType, getSupplementName } from './data-helpers';
import { createHTMLTemplate } from './html-template';

// تبدیل اعداد انگلیسی به فارسی
function toPersianDigits(text: string | number): string {
  if (text === undefined || text === null) return '';
  
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(text).replace(/\d/g, match => persianDigits[parseInt(match)]);
}

// تولید HTML برای پیش‌نمایش و صدور
export const generateHTMLExport = (student: Student): string => {
  try {
    console.log("در حال ایجاد HTML Export");
    
    // دریافت پروفایل مربی
    const trainerProfileStr = localStorage.getItem('trainerProfile');
    const trainerProfile = trainerProfileStr ? JSON.parse(trainerProfileStr) : {} as TrainerProfile;
    
    // آماده‌سازی داده‌های تمرینات
    const exercises: Array<{
      index: number;
      name: string;
      sets: string;
      reps: string;
    }> = [];
    
    let exerciseIndex = 1;
    
    // حداکثر تعداد روزهای تمرینی
    const maxDays = 5;
    
    for (let day = 1; day <= maxDays; day++) {
      const dayKey = `exercisesDay${day}` as keyof Student;
      const daySetKey = `exerciseSetsDay${day}` as keyof Student;
      const dayRepsKey = `exerciseRepsDay${day}` as keyof Student;
      
      const exercisesList = student[dayKey] as number[] || [];
      const sets = student[daySetKey] as Record<number, number> || {};
      const reps = student[dayRepsKey] as Record<number, string> || {};
      
      if (exercisesList && exercisesList.length > 0) {
        exercisesList.forEach((exerciseId) => {
          const exerciseName = getExerciseName(exerciseId) || `تمرین ${toPersianDigits(exerciseIndex)}`;
          const setCount = sets[exerciseId] ? toPersianDigits(sets[exerciseId]) : '-';
          const repInfo = reps[exerciseId] || '-';
          
          exercises.push({
            index: exerciseIndex,
            name: exerciseName,
            sets: setCount,
            reps: toPersianDigits(repInfo)
          });
          
          exerciseIndex++;
        });
      }
    }
    
    // آماده‌سازی داده‌های غذایی
    const meals: Array<{
      index: number;
      day: string;
      mealType: string;
      name: string;
    }> = [];
    
    let mealIndex = 1;
    
    for (let day = 1; day <= 7; day++) {
      const dayKey = `mealsDay${day}` as keyof Student;
      const mealsList = student[dayKey] as number[] || [];
      
      if (mealsList && mealsList.length > 0) {
        const dayName = getDayName(day);
        
        mealsList.forEach((mealId) => {
          const mealName = getMealName(mealId) || '-';
          const mealType = getMealType(mealId) || '-';
          
          meals.push({
            index: mealIndex,
            day: dayName,
            mealType: mealType,
            name: mealName
          });
          
          mealIndex++;
        });
      }
    }
    
    // آماده‌سازی داده‌های مکمل‌ها
    const supplements: Array<{
      index: number;
      name: string;
      dosage: string;
      timing: string;
    }> = [];
    
    let supplementIndex = 1;
    
    // پردازش مکمل‌ها
    if (student.supplements && student.supplements.length > 0) {
      student.supplements.forEach((suppId) => {
        const supplementName = getSupplementName(suppId) || `مکمل ${toPersianDigits(supplementIndex)}`;
        
        supplements.push({
          index: supplementIndex,
          name: supplementName,
          dosage: '1 عدد',
          timing: 'بعد از تمرین'
        });
        
        supplementIndex++;
      });
    }
    
    // پردازش ویتامین‌ها
    if (student.vitamins && student.vitamins.length > 0) {
      student.vitamins.forEach((vitaminId) => {
        const vitaminName = getSupplementName(vitaminId) || `ویتامین ${toPersianDigits(supplementIndex)}`;
        
        supplements.push({
          index: supplementIndex,
          name: vitaminName,
          dosage: '1 عدد',
          timing: 'صبح'
        });
        
        supplementIndex++;
      });
    }
    
    // تولید HTML
    const htmlContent = createHTMLTemplate({
      gymName: trainerProfile.gymName || "باشگاه بدنسازی",
      gymAddress: trainerProfile.address,
      trainerName: trainerProfile.name || "-",
      trainerPhone: toPersianDigits(trainerProfile.phone || ""),
      studentName: student.name || "-",
      studentPhone: toPersianDigits(student.phone || ""),
      studentHeight: Number(toPersianDigits(student.height || 0)),
      studentWeight: Number(toPersianDigits(student.weight || 0)),
      instagram: trainerProfile.instagram,
      website: trainerProfile.website,
      exercises: exercises.map(ex => ({
        ...ex,
        index: Number(toPersianDigits(ex.index))
      })),
      meals: meals.map(meal => ({
        ...meal,
        index: Number(toPersianDigits(meal.index))
      })),
      supplements: supplements.map(supp => ({
        ...supp,
        index: Number(toPersianDigits(supp.index))
      }))
    });
    
    return htmlContent;
    
  } catch (error) {
    console.error("خطا در ایجاد HTML Export:", error);
    throw error;
  }
};

// صدور HTML به فایل
export const exportStudentProgramToHTML = (student: Student): void => {
  try {
    const htmlContent = generateHTMLExport(student);
    
    // ایجاد Blob
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    
    // ایجاد لینک دانلود
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `برنامه_${student.name || 'بدون_نام'}.html`;
    
    // کلیک خودکار برای دانلود
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // پاک کردن URL
    URL.revokeObjectURL(link.href);
    
  } catch (error) {
    console.error("خطا در صدور HTML:", error);
    throw error;
  }
};
