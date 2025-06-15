
import { useState, useEffect } from "react";

interface StudentDashboardStats {
  weeklyProgress: number;
  completedExercises: number;
  totalExercises: number;
  completedMeals: number;
  totalMeals: number;
  supplementsCompleted: number;
  totalSupplements: number;
  overallProgress: number;
}

export const useStudentDashboardStats = (): StudentDashboardStats => {
  const [stats, setStats] = useState<StudentDashboardStats>({
    weeklyProgress: 0,
    completedExercises: 0,
    totalExercises: 0,
    completedMeals: 0,
    totalMeals: 0,
    supplementsCompleted: 0,
    totalSupplements: 0,
    overallProgress: 0
  });

  useEffect(() => {
    const calculateStatsFromLocalStorage = () => {
      try {
        const loggedInStudentId = localStorage.getItem("loggedInStudentId");
        if (!loggedInStudentId) {
          console.log('No logged in student found');
          return;
        }

        // Get student data from localStorage
        const studentData = localStorage.getItem('studentData');
        const parsedStudentData = studentData ? JSON.parse(studentData) : null;

        if (!parsedStudentData) {
          console.log('No student data found in localStorage');
          return;
        }

        // Calculate exercises stats
        let totalExercises = 0;
        let completedExercises = 0;
        
        for (let day = 1; day <= 7; day++) {
          const dayExercises = parsedStudentData[`exercisesDay${day}`];
          if (dayExercises && Array.isArray(dayExercises)) {
            totalExercises += dayExercises.length;
          }
        }
        
        // برای محاسبه تمرینات تکمیل شده، از progress شاگرد استفاده می‌کنیم
        const studentProgress = parsedStudentData.progress || 0;
        completedExercises = Math.floor((totalExercises * studentProgress) / 100);

        // Calculate meals stats - واقعی از localStorage
        const meals = parsedStudentData.meals || [];
        const totalMeals = meals.length;
        
        // محاسبه واقعی وعده‌های تکمیل شده بر اساس روز جاری
        const today = new Date().getDay();
        const currentDayMeals = parsedStudentData[`mealsDay${today === 0 ? 7 : today}`] || [];
        const completedMeals = currentDayMeals.length;

        // Calculate supplements stats - واقعی از localStorage
        const supplements = parsedStudentData.supplements || [];
        const vitamins = parsedStudentData.vitamins || [];
        const totalSupplements = supplements.length + vitamins.length;
        
        // محاسبه واقعی مکمل‌های مصرف شده
        const today_supplements = parsedStudentData[`supplementsDay${today === 0 ? 7 : today}`] || [];
        const today_vitamins = parsedStudentData[`vitaminsDay${today === 0 ? 7 : today}`] || [];
        const supplementsCompleted = today_supplements.length + today_vitamins.length;

        // Calculate weekly and overall progress based on real data
        const exerciseProgress = totalExercises > 0 ? Math.round((completedExercises / totalExercises) * 100) : 0;
        const mealProgress = totalMeals > 0 ? Math.round((completedMeals / totalMeals) * 100) : 0;
        const supplementProgress = totalSupplements > 0 ? Math.round((supplementsCompleted / totalSupplements) * 100) : 0;
        
        // محاسبه پیشرفت کلی واقعی
        const weeklyProgress = Math.round((exerciseProgress + mealProgress + supplementProgress) / 3);
        const overallProgress = parsedStudentData.progress || weeklyProgress;

        setStats({
          weeklyProgress,
          completedExercises,
          totalExercises,
          completedMeals,
          totalMeals,
          supplementsCompleted,
          totalSupplements,
          overallProgress
        });

        console.log('محاسبه آمار واقعی شاگرد از localStorage:', {
          totalExercises,
          completedExercises,
          totalMeals,
          completedMeals,
          totalSupplements,
          supplementsCompleted,
          overallProgress,
          exerciseProgress,
          mealProgress,
          supplementProgress
        });

      } catch (error) {
        console.error('Error calculating student stats from localStorage:', error);
      }
    };

    calculateStatsFromLocalStorage();

    // Listen for storage changes
    const handleStorageChange = () => {
      calculateStatsFromLocalStorage();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('studentDataUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('studentDataUpdated', handleStorageChange);
    };
  }, []);

  return stats;
};
