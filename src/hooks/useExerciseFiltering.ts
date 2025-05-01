
import { useState, useMemo, useEffect } from "react";
import { Exercise, ExerciseCategory } from "@/types/exercise";
import { useIsMobile } from "@/hooks/use-mobile";

export const useExerciseFiltering = (
  exercises: Exercise[],
  categories: ExerciseCategory[] = []
) => {
  console.log("useExerciseFiltering received exercises:", exercises);
  console.log("useExerciseFiltering received categories:", categories);
  
  const isMobile = useIsMobile();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedExerciseType, setSelectedExerciseType] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Update view mode when screen size changes
  useEffect(() => {
    if (isMobile) {
      setViewMode("grid");
    }
  }, [isMobile]);

  // Reset category selection when exercise type changes
  useEffect(() => {
    setSelectedCategoryId(null);
  }, [selectedExerciseType]);

  // Get filtered categories based on exercise type
  const filteredCategories = useMemo(() => {
    const filtered = categories.filter(category => 
      selectedExerciseType ? category.type === selectedExerciseType : true
    );
    console.log("Filtered categories:", filtered, "based on selectedExerciseType:", selectedExerciseType);
    return filtered;
  }, [categories, selectedExerciseType]);
  
  // Ensure selected category is valid when exercise type changes
  useEffect(() => {
    if (selectedCategoryId && filteredCategories.length > 0) {
      const categoryExists = filteredCategories.some(cat => cat.id === selectedCategoryId);
      if (!categoryExists) {
        console.log("Selected category no longer exists after filter, resetting selection");
        setSelectedCategoryId(null);
      }
    }
  }, [selectedExerciseType, filteredCategories, selectedCategoryId]);

  // Filter exercises based on selected type and category
  const filteredExercises = useMemo(() => {
    console.log("Filtering exercises");
    
    // Must have an exercise type selected to proceed
    if (!selectedExerciseType) {
      console.log("No exercise type selected, returning empty array");
      return [];
    }

    // Must have a category selected if categories are available for the selected type
    if (filteredCategories.length > 0 && !selectedCategoryId) {
      console.log("Exercise type selected but no category selected, returning empty array");
      return [];
    }

    const filtered = exercises
      .filter((exercise) => {
        const matchesCategory = !selectedCategoryId || exercise.categoryId === selectedCategoryId;
        return matchesCategory;
      });
    
    console.log("Filtered exercises result:", filtered);
    return filtered;
  }, [exercises, selectedCategoryId, selectedExerciseType, filteredCategories]);

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === "asc" ? "desc" : "asc");
  };

  const handleClearSearch = () => {
    console.log("Clearing search filters");
    setSelectedCategoryId(null);
    setSelectedExerciseType(null);
  };

  return {
    searchQuery: "", // Empty string since we removed search
    setSearchQuery: () => {}, // No-op function
    selectedCategoryId,
    setSelectedCategoryId,
    selectedExerciseType,
    setSelectedExerciseType,
    viewMode,
    setViewMode,
    sortOrder,
    toggleSortOrder,
    filteredExercises,
    filteredCategories,
    handleClearSearch,
  };
};

export default useExerciseFiltering;
