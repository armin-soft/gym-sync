
import { useState, useCallback } from "react";
import { SidebarStats } from "../../modern-sidebar/types";

export const useStatsData = () => {
  const [stats, setStats] = useState<SidebarStats>({
    totalStudents: 0,
    activePrograms: 0,
    completedSessions: 0,
    rating: 5
  });

  const loadStats = useCallback(() => {
    try {
      const savedStudents = localStorage.getItem('students');
      let studentsCount = 0;
      let activeProgramsCount = 0;
      
      if (savedStudents) {
        const students = JSON.parse(savedStudents);
        if (Array.isArray(students)) {
          studentsCount = students.length;
          
          activeProgramsCount = students.filter(student => {
            const hasExercises = student.exercises && Object.keys(student.exercises).length > 0;
            const hasDiet = student.diet && Array.isArray(student.diet) && student.diet.length > 0;
            const hasSupplements = student.supplements && Array.isArray(student.supplements) && student.supplements.length > 0;
            return hasExercises || hasDiet || hasSupplements;
          }).length;
        }
      }

      let totalSessions = 0;
      if (savedStudents) {
        const students = JSON.parse(savedStudents);
        if (Array.isArray(students)) {
          students.forEach(student => {
            if (student.exercises) {
              Object.keys(student.exercises).forEach(day => {
                if (Array.isArray(student.exercises[day])) {
                  totalSessions += student.exercises[day].length;
                }
              });
            }
          });
        }
      }

      setStats({
        totalStudents: studentsCount,
        activePrograms: activeProgramsCount,
        completedSessions: totalSessions,
        rating: 5
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  }, []);

  return {
    stats,
    loadStats
  };
};
