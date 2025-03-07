
import { useState, useMemo } from "react";
import { Student } from "@/components/students/StudentTypes";
import { ExerciseCategory } from "@/types/exercise";

export const useStudentFiltering = (
  students: Student[],
  exercises: any[],
  categories: ExerciseCategory[] = []
) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortField, setSortField] = useState<"name" | "weight" | "height">("name");
  const [selectedExerciseType, setSelectedExerciseType] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const sortedAndFilteredStudents = useMemo(() => {
    let filteredStudents = students.filter((student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      student.phone.includes(searchQuery)
    );

    if (selectedExerciseType || selectedCategory) {
      filteredStudents = filteredStudents.filter(student => {
        const allStudentExercises = [
          ...(student.exercises || []),
          ...(student.exercisesDay1 || []),
          ...(student.exercisesDay2 || []),
          ...(student.exercisesDay3 || []),
          ...(student.exercisesDay4 || [])
        ];

        if (selectedCategory) {
          return allStudentExercises.some(exerciseId => {
            const exercise = exercises.find(e => e.id === exerciseId);
            return exercise && exercise.categoryId === selectedCategory;
          });
        }
        
        if (selectedExerciseType) {
          const categoryIds = categories
            .filter(cat => cat.type === selectedExerciseType)
            .map(cat => cat.id);
          
          return allStudentExercises.some(exerciseId => {
            const exercise = exercises.find(e => e.id === exerciseId);
            return exercise && categoryIds.includes(exercise.categoryId);
          });
        }

        return true;
      });
    }

    return filteredStudents.sort((a, b) => {
      if (sortField === "name") {
        return sortOrder === "asc" 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      }
      const aValue = Number(a[sortField]);
      const bValue = Number(b[sortField]);
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    });
  }, [students, searchQuery, sortField, sortOrder, selectedExerciseType, selectedCategory, exercises, categories]);

  const toggleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSelectedExerciseType(null);
    setSelectedCategory(null);
  };

  return {
    searchQuery,
    setSearchQuery,
    sortOrder,
    sortField,
    toggleSort,
    selectedExerciseType,
    setSelectedExerciseType,
    selectedCategory,
    setSelectedCategory,
    sortedAndFilteredStudents,
    handleClearSearch
  };
};
