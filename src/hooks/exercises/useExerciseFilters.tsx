
import { useState, useMemo } from "react";
import { Exercise, ExerciseCategory } from "@/types/exercise";

/**
 * Hook to manage exercise filtering and search
 */
export const useExerciseFilters = (
  exercises: Exercise[],
  categories: ExerciseCategory[],
  selectedType: string | null,
  selectedCategoryId: number | null
) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  
  // Filter categories based on selected type
  const filteredCategories = useMemo(() => {
    if (!selectedType) return [];
    
    const filtered = categories.filter(cat => cat.type === selectedType);
    console.log(`Filtered categories for type '${selectedType}':`, filtered);
    return filtered;
  }, [categories, selectedType]);

  // Get filtered exercises based on selection and search
  const filteredExercises = useMemo(() => {
    // Must have an exercise type selected to proceed
    if (!selectedType) {
      console.log("No exercise type selected, returning empty array");
      return [];
    }
    
    // Must have a category selected if categories are available for the selected type
    if (filteredCategories.length > 0 && !selectedCategoryId) {
      console.log("Exercise type selected but no category selected, returning empty array");
      return [];
    }
    
    return exercises
      .filter(exercise => {
        // Filter by category if selected
        const matchesCategory = !selectedCategoryId || exercise.categoryId === selectedCategoryId;
        
        // Filter by search query if provided
        const matchesSearch = !searchQuery || 
          exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (exercise.description && exercise.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (exercise.targetMuscle && exercise.targetMuscle.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (exercise.equipment && exercise.equipment.toLowerCase().includes(searchQuery.toLowerCase()));
        
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortOrder === "asc") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
  }, [exercises, selectedType, selectedCategoryId, filteredCategories, searchQuery, sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === "asc" ? "desc" : "asc");
    console.log(`Sort order toggled to: ${sortOrder === "asc" ? "desc" : "asc"}`);
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
