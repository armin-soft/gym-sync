
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
      const students = JSON.parse(localStorage.getItem('students') || '[]');
      const meals = JSON.parse(localStorage.getItem('meals') || '[]');
      const supplements = JSON.parse(localStorage.getItem('supplements') || '[]');
      const exercises = JSON.parse(localStorage.getItem('exercises') || '[]');
      const trainerProfile = JSON.parse(localStorage.getItem('trainerProfile') || '{}');
      
      // Calculate actual sessions based on active students and their session frequency
      const totalSessions = students.reduce((acc: number, student: any) => {
        return acc + (student.sessionsPerWeek || 3) * 4;
      }, 0);

      // Calculate income from trainer's price per session
      const pricePerSession = trainerProfile.price || "0";
      const monthlyIncome = isValidPrice(pricePerSession) ? 
        totalSessions * parseInt(pricePerSession.replace(/[^0-9]/g, '')) : 0;

      // Calculate student progress
      const totalProgress = students.reduce((acc: number, student: any) => {
        return acc + (student.progress || 0);
      }, 0);
      const averageProgress = students.length ? Math.round(totalProgress / students.length) : 0;

      // Calculate growth rates
      const prevStudents = JSON.parse(localStorage.getItem('prevMonthStudents') || '[]');
      const prevMeals = JSON.parse(localStorage.getItem('prevMonthMeals') || '[]');
      const prevSupplements = JSON.parse(localStorage.getItem('prevMonthSupplements') || '[]');
      const prevSessions = prevStudents.length * 12;

      const calculateGrowth = (current: number, previous: number) => {
        if (!previous) return 0;
        return Math.round(((current - previous) / previous) * 100);
      };

      // Calculate completion rates
      const studentsWithMeals = students.filter((student: any) => 
        meals.some((meal: any) => meal.studentId === student.id)
      ).length;
      const mealCompletionRate = students.length ? (studentsWithMeals / students.length) * 100 : 0;

      const studentsWithSupplements = students.filter((student: any) => 
        supplements.some((supplement: any) => supplement.studentId === student.id)
      ).length;
      const supplementCompletionRate = students.length ? (studentsWithSupplements / students.length) * 100 : 0;

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
      calculateStats();
    };

    window.addEventListener('storage', storageHandler);
    const quickInterval = setInterval(calculateStats, 1000);

    return () => {
      window.removeEventListener('storage', storageHandler);
      clearInterval(quickInterval);
    };
  }, []);

  return stats;
};
