
import { useState, useEffect, useMemo } from 'react';
import { Exercise, ExerciseCategory } from '@/types/exercise';

export function useExerciseFiltering(exercises: Exercise[], categories: ExerciseCategory[]) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedExerciseType, setSelectedExerciseType] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter categories based on selected exercise type
  const filteredCategories = useMemo(() => {
    if (!selectedExerciseType) return categories;
    return categories.filter(category => category.type === selectedExerciseType);
  }, [categories, selectedExerciseType]);

  // Filter and sort exercises based on search query, selected category, and sort order
  const filteredExercises = useMemo(() => {
    let result = [...exercises];
    
    // Filter by search query
    if (searchQuery) {
      result = result.filter(exercise => 
        exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategoryId) {
      result = result.filter(exercise => exercise.categoryId === selectedCategoryId);
    } else if (selectedExerciseType) {
      // If no specific category selected but exercise type selected, filter by categories of that type
      const categoryIds = filteredCategories.map(cat => cat.id);
      result = result.filter(exercise => categoryIds.includes(exercise.categoryId));
    }
    
    // Sort results
    result.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    
    return result;
  }, [exercises, searchQuery, selectedCategoryId, selectedExerciseType, filteredCategories, sortOrder]);

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(prev => prev === "asc" ? "desc" : "asc");
  };

  // Clear all filters and search
  const handleClearSearch = () => {
    setSearchQuery("");
    setSelectedCategoryId(null);
    setSelectedExerciseType(null);
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedCategoryId,
    setSelectedCategoryId,
    selectedExerciseType,
    setSelectedExerciseType,
    sortOrder,
    toggleSortOrder,
    viewMode,
    setViewMode,
    filteredExercises,
    filteredCategories,
    handleClearSearch
  };
}

export default useExerciseFiltering;
