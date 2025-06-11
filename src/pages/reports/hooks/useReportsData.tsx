
import { useStudents } from "@/hooks/useStudents";

export const useReportsData = () => {
  const { students } = useStudents();
  
  // Calculate real statistics
  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.name && s.phone).length;
  const studentsWithPrograms = students.filter(student => {
    const hasExercises = student.exercises && Object.keys(student.exercises).length > 0;
    const hasMeals = student.meals && Array.isArray(student.meals) && student.meals.length > 0;
    const hasSupplements = student.supplements && Array.isArray(student.supplements) && student.supplements.length > 0;
    return hasExercises || hasMeals || hasSupplements;
  }).length;
  
  const completionRate = totalStudents > 0 ? Math.round((studentsWithPrograms / totalStudents) * 100) : 0;
  const averageProgress = totalStudents > 0 ? Math.round((activeStudents / totalStudents) * 100) : 0;

  // Gender distribution
  const maleStudents = students.filter(s => s.gender === 'male').length;
  const femaleStudents = students.filter(s => s.gender === 'female').length;

  return {
    totalStudents,
    activeStudents,
    studentsWithPrograms,
    completionRate,
    averageProgress,
    maleStudents,
    femaleStudents,
    students
  };
};
