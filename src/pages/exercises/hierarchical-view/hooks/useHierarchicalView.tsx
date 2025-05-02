
import { useState, useMemo, useCallback, useEffect } from "react";
import { Exercise, ExerciseCategory } from "@/types/exercise";

export type ViewStage = 'types' | 'categories' | 'exercises';

const useHierarchicalView = (exercises: Exercise[], categories: ExerciseCategory[]) => {
  // Current view stage
  const [activeStage, setActiveStage] = useState<ViewStage>('types');
  
  // Selected type and category
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ExerciseCategory | null>(null);
  
  // View mode for exercise display
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  // Navigate between stages
  const navigateToStage = useCallback((stage: ViewStage) => {
    setActiveStage(stage);
  }, []);
  
  // Handle type selection
  const handleTypeSelection = useCallback((type: string) => {
    setSelectedType(type);
    setSelectedCategory(null);
    navigateToStage('categories');
  }, [navigateToStage]);
  
  // Handle category selection
  const handleCategorySelection = useCallback((category: ExerciseCategory) => {
    setSelectedCategory(category);
    navigateToStage('exercises');
  }, [navigateToStage]);
  
  // Filter exercises by selected category
  const exercisesByCategory = useMemo(() => {
    if (!selectedCategory) return [];
    return exercises.filter(exercise => exercise.categoryId === selectedCategory.id);
  }, [exercises, selectedCategory]);
  
  // Set default type if available
  useEffect(() => {
    const types = [...new Set(categories.map(cat => cat.type))];
    if (types.length > 0 && !selectedType) {
      setSelectedType(types[0]);
    }
  }, [categories, selectedType]);
  
  return {
    activeStage,
    selectedType,
    setSelectedType,
    selectedCategory,
    setSelectedCategory,
    viewMode,
    setViewMode,
    exercisesByCategory,
    navigateToStage,
    handleTypeSelection,
    handleCategorySelection
  };
};

export default useHierarchicalView;
