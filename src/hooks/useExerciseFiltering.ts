
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
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Update view mode when screen size changes
  useEffect(() => {
    if (isMobile) {
      setViewMode("grid");
    }
  }, [isMobile]);

  // Force reset category when exercise type changes 
  useEffect(() => {
    console.log("Exercise type changed to:", selectedExerciseType);
    // Always reset category when exercise type changes
    setSelectedCategoryId(null);
  }, [selectedExerciseType]);

  // Get filtered categories based on exercise type
  const filteredCategories = useMemo(() => {
    console.log("Filtering categories based on type:", selectedExerciseType);
    const filtered = categories.filter(category => 
      selectedExerciseType ? category.type === selectedExerciseType : true
    );
    console.log("Filtered categories result:", filtered);
    return filtered;
  }, [categories, selectedExerciseType]);
  
  // Filter exercises based on selected type, category and search query
  const filteredExercises = useMemo(() => {
    console.log("Filtering exercises with type:", selectedExerciseType, "category:", selectedCategoryId);
    
    if (!selectedExerciseType && !selectedCategoryId && !searchQuery) {
      console.log("No filters applied, returning empty array");
      return [];
    }

    let filtered = [...exercises];

    // Filter by exercise type if selected
    if (selectedExerciseType) {
      const categoriesOfType = categories.filter(cat => cat.type === selectedExerciseType)
                                        .map(cat => cat.id);
      filtered = filtered.filter(exercise => categoriesOfType.includes(exercise.categoryId));
      console.log(`After type filter (${selectedExerciseType}):`, filtered.length);
    }

    // Filter by category if selected
    if (selectedCategoryId) {
      filtered = filtered.filter(exercise => exercise.categoryId === selectedCategoryId);
      console.log(`After category filter (${selectedCategoryId}):`, filtered.length);
    }

    // Filter by search query if provided
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(exercise => 
        exercise.name.toLowerCase().includes(query)
      );
      console.log(`After search filter (${searchQuery}):`, filtered.length);
    }
    
    console.log("Final filtered exercises:", filtered);
    return filtered;
  }, [exercises, selectedExerciseType, selectedCategoryId, categories, searchQuery]);

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === "asc" ? "desc" : "asc");
  };

  const handleClearSearch = () => {
    console.log("Clearing search filters");
    setSelectedCategoryId(null);
    setSelectedExerciseType(null);
    setSearchQuery("");
  };

  // Function to specifically handle exercise type change
  const handleExerciseTypeChange = (type: string | null) => {
    console.log("Handling exercise type change to:", type);
    setSelectedExerciseType(type);
    // Reset category selection when changing exercise type
    setSelectedCategoryId(null);
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedCategoryId,
    setSelectedCategoryId,
    selectedExerciseType,
    setSelectedExerciseType: handleExerciseTypeChange, // Use the new handler
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
