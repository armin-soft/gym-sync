
import { useMemo } from 'react';
import { Student } from '@/components/students/StudentTypes';

export const useActiveStudentsData = (students: Student[]) => {
  return useMemo(() => {
    const activeStudentsCount = students.filter(student => {
      const hasExercises = student.exercises && Object.keys(student.exercises).length > 0;
      const hasDiet = student.meals && student.meals.length > 0;
      const hasSupplements = student.supplements && student.supplements.length > 0;
      return hasExercises || hasDiet || hasSupplements;
    }).length;

    const withExercisePrograms = students.filter(student => 
      student.exercises && Object.keys(student.exercises).length > 0
    ).length;

    const withNutritionPrograms = students.filter(student => 
      student.meals && student.meals.length > 0
    ).length;

    const withSupplementPrograms = students.filter(student => 
      student.supplements && student.supplements.length > 0
    ).length;

    return {
      activeStudentsCount,
      totalStudents: students.length,
      withExercisePrograms,
      withNutritionPrograms,
      withSupplementPrograms,
      activePercentage: students.length > 0 ? Math.round((activeStudentsCount / students.length) * 100) : 0
    };
  }, [students]);
};
