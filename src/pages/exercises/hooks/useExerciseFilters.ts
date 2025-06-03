
import { useState, useMemo } from "react";

export const useExerciseFilters = (exercises: any[], categories: any[], exerciseTypes: string[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("name");

  const filteredExercises = useMemo(() => {
    let filtered = [...exercises];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(exercise =>
        exercise.name.toLowerCase().includes(query) ||
        exercise.description?.toLowerCase().includes(query) ||
        exercise.targetMuscle?.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(exercise => 
        exercise.categoryId === parseInt(selectedCategory)
      );
    }

    // Type filter
    if (selectedType) {
      const typeCategories = categories.filter(cat => cat.type === selectedType);
      const typeCategoryIds = typeCategories.map(cat => cat.id);
      filtered = filtered.filter(exercise => 
        typeCategoryIds.includes(exercise.categoryId)
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name, 'fa');
        case "category":
          const catA = categories.find(c => c.id === a.categoryId)?.name || "";
          const catB = categories.find(c => c.id === b.categoryId)?.name || "";
          return catA.localeCompare(catB, 'fa');
        case "recent":
          return b.id - a.id;
        default:
          return 0;
      }
    });

    return filtered;
  }, [exercises, categories, searchQuery, selectedCategory, selectedType, sortBy]);

  return {
    filteredExercises,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedType,
    setSelectedType,
    viewMode,
    setViewMode,
    sortBy,
    setSortBy
  };
};
