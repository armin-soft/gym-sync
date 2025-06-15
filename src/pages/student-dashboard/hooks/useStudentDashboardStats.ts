
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
    weeklyProgress: 75,
    completedExercises: 8,
    totalExercises: 12,
    completedMeals: 15,
    totalMeals: 21,
    supplementsCompleted: 5,
    totalSupplements: 7,
    overallProgress: 72
  });

  useEffect(() => {
    // در اینجا می‌توان داده‌های واقعی از localStorage یا API بارگذاری کرد
    const calculateStats = () => {
      try {
        // محاسبه آمار بر اساس داده‌های شاگرد
        const exerciseProgress = Math.round((stats.completedExercises / stats.totalExercises) * 100);
        const mealProgress = Math.round((stats.completedMeals / stats.totalMeals) * 100);
        const supplementProgress = Math.round((stats.supplementsCompleted / stats.totalSupplements) * 100);
        
        const overallProgress = Math.round((exerciseProgress + mealProgress + supplementProgress) / 3);
        
        setStats(prev => ({
          ...prev,
          overallProgress
        }));
      } catch (error) {
        console.error('Error calculating student stats:', error);
      }
    };

    calculateStats();
  }, []);

  return stats;
};
