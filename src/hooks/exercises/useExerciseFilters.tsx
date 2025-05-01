
import { useState, useMemo } from "react";
import { Exercise, ExerciseCategory } from "@/types/exercise";

/**
 * Hook to manage exercise filters
 */
export const useExerciseFilters = (
  exercises: Exercise[], 
  categories: ExerciseCategory[],
  selectedType: string | null,
  selectedCategoryId: number | null
) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  
  // Get filtered categories based on exercise type
  const filteredCategories = useMemo(() => {
    return categories.filter(category => 
      selectedType ? category.type === selectedType : true
    );
  }, [categories, selectedType]);

  // Filter exercises based on search query, type, and category
  const filteredExercises = useMemo(() => {
    // Must have an exercise type selected to proceed
    if (!selectedType) {
      return [];
    }

    // Must have a category selected if categories are available for the selected type
    if (filteredCategories.length > 0 && !selectedCategoryId) {
      return [];
    }

    return exercises.filter(exercise => {
      const matchesSearch = !searchQuery || 
        exercise.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = !selectedCategoryId || exercise.categoryId === selectedCategoryId;
      
      return matchesSearch && matchesCategory;
    }).sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
  }, [exercises, searchQuery, selectedCategoryId, selectedType, filteredCategories, sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === "asc" ? "desc" : "asc");
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return {
    searchQuery,
    setSearchQuery,
    sortOrder,
    toggleSortOrder,
    filteredCategories,
    filteredExercises,
    handleClearSearch
  };
};

export default useExerciseFilters;
