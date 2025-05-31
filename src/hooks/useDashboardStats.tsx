
import { useEffect, useState, useCallback } from "react";
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
  // Always call hooks at the top level
  const [stats, setStats] = useState<DashboardStats>(initialStats);

  // Memoize calculation function to prevent recreating on each render
  const calculateStats = useCallback(() => {
    try {
      // دریافت اطلاعات از localStorage - فقط خواندن داده‌های مورد نیاز
      const students = JSON.parse(localStorage.getItem('students') || '[]');
      const meals = JSON.parse(localStorage.getItem('meals') || '[]');
      const supplements = JSON.parse(localStorage.getItem('supplements') || '[]');
      const prevStudents = JSON.parse(localStorage.getItem('prevMonthStudents') || '[]');
      const prevMeals = JSON.parse(localStorage.getItem('prevMonthMeals') || '[]');
      const prevSupplements = JSON.parse(localStorage.getItem('prevMonthSupplements') || '[]');
      
      // محاسبه دقیق آمار - با بهینه‌سازی محاسبات
      let totalProgress = 0;
      let studentsWithMeals = 0;
      let studentsWithSupplements = 0;

      // فقط یکبار چک شود که آیا آرایه‌ها خالی هستند
      const studentsExist = Array.isArray(students) && students.length > 0;
      
      if (studentsExist) {
        // استفاده از map و reduce برای بهبود عملکرد
        const progressValues = students.map((student: any) => {
          // بررسی دانش‌آموزان دارای برنامه غذایی
          if (Array.isArray(student.meals) && student.meals.length > 0) {
            studentsWithMeals++;
          }
          
          // بررسی دانش‌آموزان دارای مکمل و ویتامین
          if ((Array.isArray(student.supplements) && student.supplements.length > 0) || 
              (Array.isArray(student.vitamins) && student.vitamins.length > 0)) {
            studentsWithSupplements++;
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

      // محاسبه نرخ رشد - فقط اگر آرایه‌های قبلی وجود داشته باشند
      const calculateGrowth = (current: number, previous: number) => {
        return previous > 0 ? Math.round(((current - previous) / previous) * 100) : 0;
      };

      const newStats = {
        totalStudents: studentsLength,
        totalMeals: Array.isArray(meals) ? meals.length : 0,
        totalSupplements: Array.isArray(supplements) ? supplements.length : 0,
        studentsProgress: averageProgress,
        studentGrowth: calculateGrowth(studentsLength, Array.isArray(prevStudents) ? prevStudents.length : 0),
        mealGrowth: calculateGrowth(
          Array.isArray(meals) ? meals.length : 0, 
          Array.isArray(prevMeals) ? prevMeals.length : 0
        ),
        supplementGrowth: calculateGrowth(
          Array.isArray(supplements) ? supplements.length : 0, 
          Array.isArray(prevSupplements) ? prevSupplements.length : 0
        ),
        maxCapacity: 50, // ثابت
        mealCompletionRate,
        supplementCompletionRate
      };

      setStats(newStats);
    } catch (error) {
      console.error('Error calculating stats:', error);
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
      if (['students', 'meals', 'supplements', 'prevMonthStudents', 
           'prevMonthMeals', 'prevMonthSupplements'].includes(e.key || '')) {
        calculateStats();
      }
    };

    window.addEventListener('storage', storageHandler);
    
    // بروزرسانی با فاصله زمانی مناسب برای بهبود عملکرد
    const updateInterval = setInterval(calculateStats, 5000); // کاهش فرکانس آپدیت به 5 ثانیه

    return () => {
      window.removeEventListener('storage', storageHandler);
      clearInterval(updateInterval);
    };
  }, [calculateStats]);

  // Always return stats - never return conditionally
  return stats;
};
