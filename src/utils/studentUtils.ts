
import { Student } from "@/components/students/StudentTypes";

export const filterStudents = (students: Student[], query: string): Student[] => {
  if (!query.trim()) return students;
  
  const lowercasedQuery = query.toLowerCase();
  
  return students.filter(student => 
    student.name.toLowerCase().includes(lowercasedQuery) ||
    student.phone.toLowerCase().includes(lowercasedQuery)
  );
};

export const sortStudents = (
  students: Student[],
  sortField: "name" | "weight" | "height",
  sortOrder: "asc" | "desc"
): Student[] => {
  return [...students].sort((a, b) => {
    let valueA, valueB;
    
    switch (sortField) {
      case "name":
        valueA = a.name.toLowerCase();
        valueB = b.name.toLowerCase();
        break;
      case "weight":
        valueA = Number(a.weight) || 0;
        valueB = Number(b.weight) || 0;
        break;
      case "height":
        valueA = Number(a.height) || 0;
        valueB = Number(b.height) || 0;
        break;
      default:
        valueA = a.name.toLowerCase();
        valueB = b.name.toLowerCase();
    }
    
    if (sortOrder === "asc") {
      return valueA > valueB ? 1 : -1;
    } else {
      return valueA < valueB ? 1 : -1;
    }
  });
};

export const getStudentStatus = (student: Student): "complete" | "inProgress" | "new" => {
  const hasExercises = student.exercises?.length || 
                      student.exercisesDay1?.length || 
                      student.exercisesDay2?.length || 
                      student.exercisesDay3?.length || 
                      student.exercisesDay4?.length;
  const hasMeals = student.meals?.length;
  const hasSupplements = student.supplements?.length || student.vitamins?.length;
  
  if (hasExercises && hasMeals && hasSupplements) {
    return "complete";
  } else if (hasExercises || hasMeals || hasSupplements) {
    return "inProgress";
  } else {
    return "new";
  }
};

export const getProgressPercentage = (student: Student): number => {
  if (typeof student.progress === 'number') {
    return student.progress;
  }
  
  let total = 0;
  let completed = 0;
  
  // Check exercises
  total += 1;
  if (student.exercises?.length || student.exercisesDay1?.length || 
      student.exercisesDay2?.length || student.exercisesDay3?.length || 
      student.exercisesDay4?.length) {
    completed += 1;
  }
  
  // Check meals
  total += 1;
  if (student.meals?.length) completed += 1;
  
  // Check supplements
  total += 1;
  if (student.supplements?.length || student.vitamins?.length) completed += 1;
  
  return Math.round((completed / total) * 100);
};
