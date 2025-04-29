
import { useState, useMemo, useEffect } from "react";
import { Exercise, ExerciseCategory } from "@/types/exercise";
import { useIsMobile } from "@/hooks/use-mobile";

export const useExerciseFiltering = (
  exercises: Exercise[],
  categories: ExerciseCategory[] = []
) => {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedExerciseType, setSelectedExerciseType] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  // Default to list view on mobile, grid on larger screens
  const [viewMode, setViewMode] = useState<"grid" | "list">(isMobile ? "list" : "grid");

  // Update view mode when screen size changes
  useEffect(() => {
    if (isMobile) {
      setViewMode("list");
    }
  }, [isMobile]);

  // Get filtered categories based on exercise type
  const filteredCategories = useMemo(() => {
    return categories.filter(category => 
      selectedExerciseType ? category.type === selectedExerciseType : true
    );
  }, [categories, selectedExerciseType]);
  
  // Ensure selected category is valid when exercise type changes
  useMemo(() => {
    if (selectedCategoryId && filteredCategories.length > 0) {
      const categoryExists = filteredCategories.some(cat => cat.id === selectedCategoryId);
      if (!categoryExists) {
        setSelectedCategoryId(null);
      }
    }
  }, [selectedExerciseType, filteredCategories, selectedCategoryId]);

  // Filter and sort exercises
  const filteredExercises = useMemo(() => {
    return exercises
      .filter((exercise) => 
        exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        (selectedCategoryId ? exercise.categoryId === selectedCategoryId : false)
      )
      .sort((a, b) => {
        if (sortOrder === "asc") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
  }, [exercises, searchQuery, selectedCategoryId, sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

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
    handleClearSearch,
  };
};
