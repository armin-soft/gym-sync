
import { useEffect, useState } from "react";
import type { DashboardStats } from "@/types/dashboard";

export const useDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats>({
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
  });

  useEffect(() => {
    const calculateStats = () => {
      // دریافت اطلاعات از localStorage
      const cachedStudents = localStorage.getItem('students');
      const cachedMeals = localStorage.getItem('meals');
      const cachedSupplements = localStorage.getItem('supplements');
      const cachedExercises = localStorage.getItem('exercises');
      const cachedTrainerProfile = localStorage.getItem('trainerProfile');

      // پردازش داده‌ها
      const students = cachedStudents ? JSON.parse(cachedStudents) : [];
      const meals = cachedMeals ? JSON.parse(cachedMeals) : [];
      const supplements = cachedSupplements ? JSON.parse(cachedSupplements) : [];
      const exercises = cachedExercises ? JSON.parse(cachedExercises) : [];
      const trainerProfile = cachedTrainerProfile ? JSON.parse(cachedTrainerProfile) : {};
      
      // محاسبه دقیق آمار
      let totalProgress = 0;
      let studentsWithMeals = 0;
      let studentsWithSupplements = 0;
      let totalExercisesCount = 0;

      students.forEach((student: any) => {
        totalProgress += (student.progress || 0);
        
        // بررسی دقیق دانش‌آموزان دارای برنامه غذایی
        const studentMeals = meals.filter((meal: any) => meal.studentId === student.id);
        if (studentMeals.length > 0) {
          studentsWithMeals++;
        }
        
        // بررسی دقیق دانش‌آموزان دارای مکمل و ویتامین
        const studentSupplements = supplements.filter((supplement: any) => supplement.studentId === student.id);
        if (studentSupplements.length > 0) {
          studentsWithSupplements++;
        }
        
        // محاسبه دقیق تعداد تمرین‌های اختصاص داده شده
        const studentExercises = exercises.filter((exercise: any) => exercise.studentId === student.id);
        totalExercisesCount += studentExercises.length;
        
        // بررسی تمرین‌های روزانه
        if (Array.isArray(student.exercisesDay1)) {
          totalExercisesCount += student.exercisesDay1.length;
        }
        if (Array.isArray(student.exercisesDay2)) {
          totalExercisesCount += student.exercisesDay2.length;
        }
        if (Array.isArray(student.exercisesDay3)) {
          totalExercisesCount += student.exercisesDay3.length;
        }
        if (Array.isArray(student.exercisesDay4)) {
          totalExercisesCount += student.exercisesDay4.length;
        }
      });

      const averageProgress = students.length ? Math.round(totalProgress / students.length) : 0;
      const mealCompletionRate = students.length ? (studentsWithMeals / students.length) * 100 : 0;
      const supplementCompletionRate = students.length ? (studentsWithSupplements / students.length) * 100 : 0;

      // محاسبه نرخ رشد
      const prevStudents = JSON.parse(localStorage.getItem('prevMonthStudents') || '[]');
      const prevMeals = JSON.parse(localStorage.getItem('prevMonthMeals') || '[]');
      const prevSupplements = JSON.parse(localStorage.getItem('prevMonthSupplements') || '[]');

      const calculateGrowth = (current: number, previous: number) => {
        if (!previous) return 0;
        return Math.round(((current - previous) / previous) * 100);
      };

      setStats({
        totalStudents: students.length,
        totalMeals: meals.length,
        totalSupplements: supplements.length,
        studentsProgress: averageProgress,
        studentGrowth: calculateGrowth(students.length, prevStudents.length),
        mealGrowth: calculateGrowth(meals.length, prevMeals.length),
        supplementGrowth: calculateGrowth(supplements.length, prevSupplements.length),
        maxCapacity: 50,
        mealCompletionRate,
        supplementCompletionRate
      });
    };

    calculateStats();

    // آپدیت خودکار آمار
    const storageHandler = () => {
      requestAnimationFrame(calculateStats);
    };

    window.addEventListener('storage', storageHandler);
    const updateInterval = setInterval(calculateStats, 2000);

    return () => {
      window.removeEventListener('storage', storageHandler);
      clearInterval(updateInterval);
    };
  }, []);

  return stats;
};
