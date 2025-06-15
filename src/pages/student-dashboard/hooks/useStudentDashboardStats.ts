
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
            // For now, consider all exercises as completed (you can add completion tracking later)
            completedExercises += dayExercises.length;
          }
        }

        // Calculate meals stats
        const meals = parsedStudentData.meals || [];
        const totalMeals = meals.length;
        const completedMeals = Math.floor(totalMeals * 0.8); // 80% completion rate

        // Calculate supplements stats
        const supplements = parsedStudentData.supplements || [];
        const vitamins = parsedStudentData.vitamins || [];
        const totalSupplements = supplements.length + vitamins.length;
        const supplementsCompleted = Math.floor(totalSupplements * 0.9); // 90% completion rate

        // Calculate weekly and overall progress
        const exerciseProgress = totalExercises > 0 ? Math.round((completedExercises / totalExercises) * 100) : 0;
        const mealProgress = totalMeals > 0 ? Math.round((completedMeals / totalMeals) * 100) : 0;
        const supplementProgress = totalSupplements > 0 ? Math.round((supplementsCompleted / totalSupplements) * 100) : 0;
        
        const weeklyProgress = Math.round((exerciseProgress + mealProgress + supplementProgress) / 3);
        const overallProgress = weeklyProgress;

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

        console.log('Student stats calculated from localStorage:', {
          totalExercises,
          completedExercises,
          totalMeals,
          completedMeals,
          totalSupplements,
          supplementsCompleted,
          overallProgress
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
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return stats;
};
