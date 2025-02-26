
import { useEffect, useState } from "react";
import type { DashboardStats } from "@/types/dashboard";
import { isValidPrice } from "@/utils/validation";

export const useDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    totalSessions: 0,
    totalMeals: 0,
    totalSupplements: 0,
    studentsProgress: 0,
    studentGrowth: 0,
    sessionGrowth: 0,
    mealGrowth: 0,
    supplementGrowth: 0,
    maxCapacity: 50,
    maxSessionsPerMonth: 120,
    mealCompletionRate: 0,
    supplementCompletionRate: 0
  });

  useEffect(() => {
    const calculateStats = () => {
      const cachedStudents = localStorage.getItem('students');
      const cachedMeals = localStorage.getItem('meals');
      const cachedSupplements = localStorage.getItem('supplements');
      const cachedExercises = localStorage.getItem('exercises');
      const cachedTrainerProfile = localStorage.getItem('trainerProfile');

      // Parse all data at once to improve performance
      const students = cachedStudents ? JSON.parse(cachedStudents) : [];
      const meals = cachedMeals ? JSON.parse(cachedMeals) : [];
      const supplements = cachedSupplements ? JSON.parse(cachedSupplements) : [];
      const exercises = cachedExercises ? JSON.parse(cachedExercises) : [];
      const trainerProfile = cachedTrainerProfile ? JSON.parse(cachedTrainerProfile) : {};
      
      // Optimize calculations by doing them in a single pass where possible
      let totalSessions = 0;
      let totalProgress = 0;
      let studentsWithMeals = 0;
      let studentsWithSupplements = 0;

      // Single pass through students array
      students.forEach((student: any) => {
        totalSessions += (student.sessionsPerWeek || 3) * 4;
        totalProgress += (student.progress || 0);
        
        if (meals.some((meal: any) => meal.studentId === student.id)) {
          studentsWithMeals++;
        }
        if (supplements.some((supplement: any) => supplement.studentId === student.id)) {
          studentsWithSupplements++;
        }
      });

      const averageProgress = students.length ? Math.round(totalProgress / students.length) : 0;
      const mealCompletionRate = students.length ? (studentsWithMeals / students.length) * 100 : 0;
      const supplementCompletionRate = students.length ? (studentsWithSupplements / students.length) * 100 : 0;

      // Calculate monthly income
      const pricePerSession = trainerProfile.price || "0";
      const monthlyIncome = isValidPrice(pricePerSession) ? 
        totalSessions * parseInt(pricePerSession.replace(/[^0-9]/g, '')) : 0;

      // Calculate growth rates
      const prevStudents = JSON.parse(localStorage.getItem('prevMonthStudents') || '[]');
      const prevMeals = JSON.parse(localStorage.getItem('prevMonthMeals') || '[]');
      const prevSupplements = JSON.parse(localStorage.getItem('prevMonthSupplements') || '[]');
      const prevSessions = prevStudents.length * 12;

      const calculateGrowth = (current: number, previous: number) => {
        if (!previous) return 0;
        return Math.round(((current - previous) / previous) * 100);
      };

      setStats({
        totalStudents: students.length,
        totalSessions,
        totalMeals: meals.length,
        totalSupplements: supplements.length,
        studentsProgress: averageProgress,
        studentGrowth: calculateGrowth(students.length, prevStudents.length),
        sessionGrowth: calculateGrowth(totalSessions, prevSessions),
        mealGrowth: calculateGrowth(meals.length, prevMeals.length),
        supplementGrowth: calculateGrowth(supplements.length, prevSupplements.length),
        maxCapacity: 50,
        maxSessionsPerMonth: 120,
        mealCompletionRate,
        supplementCompletionRate
      });
    };

    calculateStats();

    const storageHandler = () => {
      requestAnimationFrame(calculateStats);
    };

    window.addEventListener('storage', storageHandler);
    const updateInterval = setInterval(calculateStats, 2000); // Reduced frequency

    return () => {
      window.removeEventListener('storage', storageHandler);
      clearInterval(updateInterval);
    };
  }, []);

  return stats;
};
