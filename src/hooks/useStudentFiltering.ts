
import { useState, useEffect, useMemo } from "react";
import { Student } from "@/components/students/StudentTypes";

export const useStudentFiltering = (students: Student[], exercises: any[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<"name" | "weight" | "height">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const toggleSort = (field: "name" | "weight" | "height") => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSelectedCategory(null);
  };

  // کوئری جستجو و مرتب‌سازی دانشجویان
  const sortedAndFilteredStudents = useMemo(() => {
    // ابتدا دانشجویان را بر اساس دسته‌بندی فیلتر می‌کنیم
    let filtered = [...students];

    // اگر فیلتر دسته‌بندی انتخاب شده باشد
    if (selectedCategory !== null) {
      // دریافت شناسه‌های تمرین مطابق با فیلترها
      let filteredExerciseIds: number[] = [];
      
      if (exercises && exercises.length > 0) {
        // اگر دسته‌بندی انتخاب شده باشد، فقط تمرین‌های آن دسته را گرفته
        if (selectedCategory !== null) {
          filteredExerciseIds = exercises
            .filter(ex => ex.categoryId === selectedCategory)
            .map(ex => ex.id);
        }
      }

      // فیلتر دانشجویان بر اساس شناسه‌های تمرین (همه روزها چک شوند)
      filtered = filtered.filter(student => {
        // اگر شناسه‌های تمرین وجود داشته باشد، بررسی می‌کنیم
        if (filteredExerciseIds.length > 0) {
          const hasMatchingExercises = 
            // چک کردن تمرین‌های عمومی
            (student.exercises && student.exercises.some(id => filteredExerciseIds.includes(id))) ||
            // چک کردن تمرین‌های روز اول
            (student.exercisesDay1 && student.exercisesDay1.some(id => filteredExerciseIds.includes(id))) ||
            // چک کردن تمرین‌های روز دوم
            (student.exercisesDay2 && student.exercisesDay2.some(id => filteredExerciseIds.includes(id))) ||
            // چک کردن تمرین‌های روز سوم
            (student.exercisesDay3 && student.exercisesDay3.some(id => filteredExerciseIds.includes(id))) ||
            // چک کردن تمرین‌های روز چهارم
            (student.exercisesDay4 && student.exercisesDay4.some(id => filteredExerciseIds.includes(id)));
          
          return hasMatchingExercises;
        }
        return true;
      });
    }

    // سپس بر اساس عبارت جستجو فیلتر می‌کنیم
    if (searchQuery.trim()) {
      const normalizedQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (student) =>
          student.name.toLowerCase().includes(normalizedQuery) ||
          student.phone.toLowerCase().includes(normalizedQuery)
      );
    }

    // در نهایت دانش‌آموزان را مرتب می‌کنیم
    return filtered.sort((a, b) => {
      let aValue: string | number = a[sortField];
      let bValue: string | number = b[sortField];

      // اگر مقدار وزن یا قد باشد، آن را به عدد تبدیل می‌کنیم
      if (sortField === "weight" || sortField === "height") {
        aValue = parseFloat(aValue as string) || 0;
        bValue = parseFloat(bValue as string) || 0;
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [
    students,
    exercises,
    searchQuery,
    sortField,
    sortOrder,
    selectedCategory
  ]);

  return {
    searchQuery,
    setSearchQuery,
    sortField,
    sortOrder,
    toggleSort,
    selectedCategory,
    setSelectedCategory,
    sortedAndFilteredStudents,
    handleClearSearch
  };
};
