import { useState, useCallback, useEffect } from "react";
import { StudentSidebarStats } from "../types/studentSidebarTypes";

export const useStudentStatsData = () => {
  const [stats, setStats] = useState<StudentSidebarStats>({
    totalWorkouts: 0,
    completedDays: 0,
    achievedGoals: 0,
    progressPercent: 0
  });

  const loadStats = useCallback(() => {
    try {
      // Get logged in student data
      const loggedInStudentId = localStorage.getItem('loggedInStudentId');
      const studentData = localStorage.getItem('studentData');
      
      if (loggedInStudentId && studentData) {
        const student = JSON.parse(studentData);
        
        // Calculate stats from actual student data
        const totalWorkouts = calculateTotalWorkouts(student);
        const completedDays = calculateCompletedDays(student);
        const achievedGoals = calculateAchievedGoals(student);
        const progressPercent = calculateProgressPercent(student);
        
        setStats({
          totalWorkouts,
          completedDays,
          achievedGoals,
          progressPercent
        });
      } else {
        // Keep empty stats if no student data
        setStats({
          totalWorkouts: 0,
          completedDays: 0,
          achievedGoals: 0,
          progressPercent: 0
        });
      }
    } catch (error) {
      console.error('خطا در بارگذاری آمار شاگرد:', error);
      // Reset to empty on error
      setStats({
        totalWorkouts: 0,
        completedDays: 0,
        achievedGoals: 0,
        progressPercent: 0
      });
    }
  }, []);

  // Auto-load stats on mount
  useEffect(() => {
    loadStats();
  }, [loadStats]);

  return { stats, loadStats };
};

// Helper functions to calculate real stats from student data
const calculateTotalWorkouts = (student: any): number => {
  let total = 0;
  for (let day = 1; day <= 7; day++) {
    const exercises = student[`exercisesDay${day}`];
    if (exercises && Array.isArray(exercises)) {
      total += exercises.length;
    }
  }
  return total;
};

const calculateCompletedDays = (student: any): number => {
  let completedDays = 0;
  for (let day = 1; day <= 7; day++) {
    const exercises = student[`exercisesDay${day}`];
    if (exercises && Array.isArray(exercises) && exercises.length > 0) {
      completedDays++;
    }
  }
  return completedDays;
};

const calculateAchievedGoals = (student: any): number => {
  let goals = 0;
  
  // Count if has exercise program
  if (calculateTotalWorkouts(student) > 0) goals++;
  
  // Count if has diet program
  if (student.meals && Array.isArray(student.meals) && student.meals.length > 0) goals++;
  
  // Count if has supplement program
  if (student.supplements && Array.isArray(student.supplements) && student.supplements.length > 0) goals++;
  
  return goals;
};

const calculateProgressPercent = (student: any): number => {
  const totalPossibleGoals = 3; // Exercise, Diet, Supplements
  const achievedGoals = calculateAchievedGoals(student);
  return Math.round((achievedGoals / totalPossibleGoals) * 100);
};
