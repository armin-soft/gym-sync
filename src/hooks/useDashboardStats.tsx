
import { useEffect, useState, useCallback, useMemo } from "react";
import type { DashboardStats } from "@/types/dashboard";

// Initial empty stats to prevent repeated object creation
const initialStats: DashboardStats = {
  totalStudents: 0,
  totalMeals: 0,
  totalSupplements: 0,
  studentsProgress: 0,
  studentGrowth: 0,
  mealGrowth: 0,
  supplementGrowth: 0,
  maxCapacity: 50,
  mealCompletionRate: 0,
  supplementCompletionRate: 0
};

export const useDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats>(initialStats);

  // Memoize calculation function to prevent recreating on each render
  const calculateStats = useCallback(() => {
    try {
      // دریافت اطلاعات از localStorage - فقط خواندن داده‌های مورد نیاز
      const students = JSON.parse(localStorage.getItem('students') || '[]');
      const meals = JSON.parse(localStorage.getItem('meals') || '[]');
      const supplements = JSON.parse(localStorage.getItem('supplements') || '[]');
      const exercises = JSON.parse(localStorage.getItem('exercises') || '[]');
      
      // محاسبه دقیق آمار - با بهینه‌سازی محاسبات
      let totalProgress = 0;
      let studentsWithMeals = 0;
      let studentsWithSupplements = 0;
      let studentsWithExercises = 0;

      // فقط یکبار چک شود که آیا آرایه‌ها خالی هستند
      const studentsExist = Array.isArray(students) && students.length > 0;
      
      if (studentsExist) {
        // استفاده از map و reduce برای بهبود عملکرد
        const progressValues = students.map((student: any) => {
          // بررسی دانش‌آموزان دارای برنامه غذایی
          if ((Array.isArray(student.meals) && student.meals.length > 0) ||
              (Array.isArray(student.mealsDay1) && student.mealsDay1.length > 0) ||
              (Array.isArray(student.mealsDay2) && student.mealsDay2.length > 0) ||
              (Array.isArray(student.mealsDay3) && student.mealsDay3.length > 0) ||
              (Array.isArray(student.mealsDay4) && student.mealsDay4.length > 0) ||
              (Array.isArray(student.mealsDay5) && student.mealsDay5.length > 0) ||
              (Array.isArray(student.mealsDay6) && student.mealsDay6.length > 0) ||
              (Array.isArray(student.mealsDay7) && student.mealsDay7.length > 0)) {
            studentsWithMeals++;
          }
          
          // بررسی دانش‌آموزان دارای مکمل و ویتامین
          if ((Array.isArray(student.supplements) && student.supplements.length > 0) || 
              (Array.isArray(student.vitamins) && student.vitamins.length > 0)) {
            studentsWithSupplements++;
          }

          // بررسی دانش‌آموزان دارای برنامه تمرینی
          if ((Array.isArray(student.exercises) && student.exercises.length > 0) ||
              (Array.isArray(student.exercisesDay1) && student.exercisesDay1.length > 0) ||
              (Array.isArray(student.exercisesDay2) && student.exercisesDay2.length > 0) ||
              (Array.isArray(student.exercisesDay3) && student.exercisesDay3.length > 0) ||
              (Array.isArray(student.exercisesDay4) && student.exercisesDay4.length > 0) ||
              (Array.isArray(student.exercisesDay5) && student.exercisesDay5.length > 0) ||
              (Array.isArray(student.exercisesDay6) && student.exercisesDay6.length > 0) ||
              (Array.isArray(student.exercisesDay7) && student.exercisesDay7.length > 0)) {
            studentsWithExercises++;
          }
          
          return student.progress || 0;
        });
        
        // محاسبه مجموع پیشرفت
        totalProgress = progressValues.reduce((sum: number, val: number) => sum + val, 0);
      }

      // محاسبه میانگین و درصدها
      const studentsLength = studentsExist ? students.length : 0;
      const averageProgress = studentsLength ? Math.round(totalProgress / studentsLength) : 0;
      const mealCompletionRate = studentsLength ? Math.round((studentsWithMeals / studentsLength) * 100) : 0;
      const supplementCompletionRate = studentsLength ? Math.round((studentsWithSupplements / studentsLength) * 100) : 0;

      // محاسبه آمار واقعی بر اساس داده‌های موجود
      const actualMealsCount = Array.isArray(meals) ? meals.length : 0;
      const actualSupplementsCount = Array.isArray(supplements) ? supplements.length : 0;
      const actualExercisesCount = Array.isArray(exercises) ? exercises.length : 0;

      setStats({
        totalStudents: studentsLength,
        totalMeals: actualMealsCount,
        totalSupplements: actualSupplementsCount,
        studentsProgress: averageProgress,
        studentGrowth: 0, // این مقدار نیازمند داده‌های تاریخی است
        mealGrowth: 0, // این مقدار نیازمند داده‌های تاریخی است
        supplementGrowth: 0, // این مقدار نیازمند داده‌های تاریخی است
        maxCapacity: 50, // ثابت
        mealCompletionRate,
        supplementCompletionRate
      });
    } catch (error) {
      console.error('Error calculating dashboard stats:', error);
      // در صورت خطا، آمار خالی برگرداند
      setStats(initialStats);
    }
  }, []);

  useEffect(() => {
    // محاسبه اولیه آمار
    calculateStats();

    // استفاده از ترکیبی از رویدادها برای بروزرسانی آمار
    const storageHandler = (e: StorageEvent) => {
      // بهینه‌سازی: فقط وقتی کلیدهای مرتبط تغییر می‌کنند، محاسبه مجدد انجام شود
      if (['students', 'meals', 'supplements', 'exercises'].includes(e.key || '')) {
        calculateStats();
      }
    };

    // گوش دادن به تغییرات localStorage
    window.addEventListener('storage', storageHandler);
    
    // گوش دادن به رویداد سفارشی برای بروزرسانی آمار
    const handleCustomUpdate = () => calculateStats();
    window.addEventListener('studentsUpdated', handleCustomUpdate);
    
    // بروزرسانی با فاصله زمانی مناسب برای بهبود عملکرد
    const updateInterval = setInterval(calculateStats, 10000); // هر 10 ثانیه

    return () => {
      window.removeEventListener('storage', storageHandler);
      window.removeEventListener('studentsUpdated', handleCustomUpdate);
      clearInterval(updateInterval);
    };
  }, [calculateStats]);

  return stats;
};
