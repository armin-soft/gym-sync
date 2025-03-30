
import { Student } from "@/components/Students/StudentTypes";

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
