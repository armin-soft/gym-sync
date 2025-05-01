
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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedExerciseType, setSelectedExerciseType] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  // Default to grid view on mobile
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Update view mode when screen size changes
  useEffect(() => {
    if (isMobile) {
      setViewMode("grid");
    }
  }, [isMobile]);

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

  // Filter and sort exercises
  const filteredExercises = useMemo(() => {
    console.log("Filtering and sorting exercises");
    const filtered = exercises
      .filter((exercise) => {
        const matchesSearch = !searchQuery || 
          exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (exercise.description && exercise.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (exercise.targetMuscle && exercise.targetMuscle.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (exercise.equipment && exercise.equipment.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesCategory = !selectedCategoryId || exercise.categoryId === selectedCategoryId;
        
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortOrder === "asc") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
    
    console.log("Filtered exercises result:", filtered);
    return filtered;
  }, [exercises, searchQuery, selectedCategoryId, sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    console.log("Sort order toggled to:", sortOrder === "asc" ? "desc" : "asc");
  };

  const handleClearSearch = () => {
    console.log("Clearing search filters");
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
    handleClearSearch,
  };
};

export default useExerciseFiltering;
