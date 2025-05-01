
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
    });
  }, [exercises, searchQuery, selectedCategoryId, selectedType, filteredCategories]);

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return {
    searchQuery,
    setSearchQuery,
    filteredCategories,
    filteredExercises,
    handleClearSearch
  };
};

export default useExerciseFilters;
