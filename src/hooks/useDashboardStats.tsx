import { useState, useEffect } from "react";
import type { DashboardStats } from "@/types/dashboard";

export const useDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    activeStudents: 0,
    newStudentsThisWeek: 0,
    newStudentsThisMonth: 0,
    studentGrowth: 0,
    mealCompletionRate: 0,
    exerciseCompletionRate: 0,
    supplementCompletionRate: 0,
    studentsProgress: 0,
    averageStudentRating: 0,
    totalMeals: 0,
    mealGrowth: 0,
    totalExercises: 0,
    exerciseGrowth: 0,
    totalSupplements: 0,
    supplementGrowth: 0,
    maxCapacity: 100,
    totalDaysActive: 0
  });

  useEffect(() => {
    try {
      // Calculate total students
      const savedStudents = localStorage.getItem('students');
      let students = [];
      let totalStudents = 0;
      
      if (savedStudents) {
        students = JSON.parse(savedStudents);
        if (Array.isArray(students)) {
          totalStudents = students.length;
        }
      }
      
      // Calculate meals data
      const savedMeals = localStorage.getItem('meals');
      let meals = [];
      let totalMeals = 0;
      
      if (savedMeals) {
        meals = JSON.parse(savedMeals);
        if (Array.isArray(meals)) {
          totalMeals = meals.length;
        }
      }
      
      // Calculate supplements data
      const savedSupplements = localStorage.getItem('supplements');
      let supplements = [];
      let totalSupplements = 0;
      
      if (savedSupplements) {
        supplements = JSON.parse(savedSupplements);
        if (Array.isArray(supplements)) {
          totalSupplements = supplements.length;
        }
      }
      
      // Calculate student progress
      const studentsProgress = totalStudents > 0 
        ? Math.min(Math.round(Math.random() * 100), 100) // Placeholder random progress
        : 0;

      // Get first launch date
      let firstLaunchDate = localStorage.getItem('firstLaunchDate');
      if (!firstLaunchDate) {
        firstLaunchDate = new Date().toISOString();
        localStorage.setItem('firstLaunchDate', firstLaunchDate);
      }
      
      // Calculate days active
      const daysSinceFirstLaunch = Math.ceil(
        (new Date().getTime() - new Date(firstLaunchDate).getTime()) / (1000 * 60 * 60 * 24)
      );
      const totalDaysActive = Math.max(1, daysSinceFirstLaunch);

      // Update all stats
      setStats({
        totalStudents,
        activeStudents: Math.round(totalStudents * 0.8), // Assume 80% are active
        newStudentsThisWeek: Math.min(Math.round(totalStudents * 0.2), 10), // Random placeholder
        newStudentsThisMonth: Math.min(Math.round(totalStudents * 0.4), 20), // Random placeholder
        studentGrowth: totalStudents > 0 ? Math.min(Math.round(Math.random() * 40), 40) : 0, // Random placeholder
        mealCompletionRate: totalStudents > 0 ? Math.min(Math.round((totalMeals / totalStudents) * 100), 100) : 0,
        exerciseCompletionRate: totalStudents > 0 ? Math.min(Math.round(Math.random() * 100), 100) : 0, // Random placeholder
        supplementCompletionRate: totalStudents > 0 ? Math.min(Math.round((totalSupplements / totalStudents) * 100), 100) : 0,
        studentsProgress,
        averageStudentRating: Math.round((3.5 + Math.random() * 1.5) * 10) / 10, // Random between 3.5 and 5
        totalMeals,
        mealGrowth: totalMeals > 0 ? Math.min(Math.round(Math.random() * 30), 30) : 0, // Random placeholder
        totalExercises: totalStudents * 5, // Assuming 5 exercises per student
        exerciseGrowth: Math.min(Math.round(Math.random() * 25), 25), // Random placeholder
        totalSupplements,
        supplementGrowth: totalSupplements > 0 ? Math.min(Math.round(Math.random() * 20), 20) : 0, // Random placeholder
        maxCapacity: 100, // Placeholder max capacity
        totalDaysActive
      });
    } catch (error) {
      console.error('Error calculating dashboard stats:', error);
    }
  }, []);

  return stats;
};

export default useDashboardStats;
