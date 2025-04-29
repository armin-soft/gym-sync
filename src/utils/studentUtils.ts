
import { Student } from "@/components/students/StudentTypes";

export const filterStudents = (students: Student[], query: string): Student[] => {
  if (!query.trim()) return students;
  
  const lowercasedQuery = query.toLowerCase();
  
  return students.filter(student => 
    student.name.toLowerCase().includes(lowercasedQuery) ||
    student.phone.toLowerCase().includes(lowercasedQuery) ||
    (student.payment && student.payment.toLowerCase().includes(lowercasedQuery))
  );
};

export const sortStudents = (
  students: Student[],
  sortField: "name" | "weight" | "height" | "progress",
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
      case "progress":
        valueA = a.progress || 0;
        valueB = b.progress || 0;
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

// Helper function to calculate completion percentage for a student
export const getStudentProgress = (student: Student): number => {
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

// Get color based on progress percentage
export const getProgressColor = (percentage: number): string => {
  if (percentage >= 100) return "bg-emerald-500";
  if (percentage >= 70) return "bg-green-500";
  if (percentage >= 30) return "bg-amber-500";
  return "bg-blue-500";
};

// Get gradient class based on progress percentage
export const getProgressGradient = (percentage: number): string => {
  if (percentage >= 100) return "from-emerald-500 to-teal-400";
  if (percentage >= 70) return "from-green-500 to-emerald-400";
  if (percentage >= 30) return "from-amber-500 to-yellow-400";
  return "from-blue-500 to-indigo-400";
};

// Get text color based on progress percentage
export const getProgressTextColor = (percentage: number): string => {
  if (percentage >= 100) return "text-emerald-600 dark:text-emerald-400";
  if (percentage >= 70) return "text-green-600 dark:text-green-400";
  if (percentage >= 30) return "text-amber-600 dark:text-amber-400";
  return "text-blue-600 dark:text-blue-400";
};
