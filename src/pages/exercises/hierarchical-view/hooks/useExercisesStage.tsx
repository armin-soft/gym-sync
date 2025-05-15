
import { useState, useEffect } from "react";
import { useExerciseData } from "@/hooks/exercises/useExerciseData";

export const useExercisesStage = (typeId: string, categoryId: string) => {
  const { exercises: allExercises, categories } = useExerciseData();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [showFilters, setShowFilters] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);

  // Filter exercises by type and category
  const categoryExercises = allExercises.filter(
    (exercise) => 
      exercise.categoryId.toString() === categoryId
  );

  // Filter exercises by search query and active category
  const filteredExercises = categoryExercises.filter((exercise) => {
    const matchesSearch = 
      !searchQuery || 
      exercise.name.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = 
      !activeCategory || 
      exercise.categoryId.toString() === activeCategory;
      
    return matchesSearch && matchesCategory;
  });

  // Sort exercises based on sortOrder
  const sortedExercises = [...filteredExercises].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  // Handle exercise selection
  const handleExerciseSelect = (exerciseId: string) => {
    setSelectedExercises((prev) => {
      if (prev.includes(exerciseId)) {
        return prev.filter((id) => id !== exerciseId);
      } else {
        // If max selection reached, don't add
        if (prev.length >= 5) return prev;
        return [...prev, exerciseId];
      }
    });
  };

  // Clear selection
  const clearSelection = () => {
    setSelectedExercises([]);
  };

  // Confirm selection
  const confirmSelection = () => {
    // This would be implemented based on your app's requirements
    console.log("Selected exercises:", selectedExercises);
  };

  // Get relevant categories for the current type
  const relevantCategories = categories.filter(
    (category) => category.type === typeId
  );

  return {
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    showFilters,
    setShowFilters,
    activeCategory,
    setActiveCategory,
    sortOrder,
    toggleSortOrder,
    exercises: sortedExercises,
    categories: relevantCategories,
    selectedExercises,
    handleExerciseSelect,
    clearSelection,
    confirmSelection
  };
};
