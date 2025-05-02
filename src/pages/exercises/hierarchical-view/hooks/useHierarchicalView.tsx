
import { useState, useCallback } from "react";

export type ViewStage = 'categories' | 'types' | 'exercises';

export const useHierarchicalView = () => {
  const [currentStage, setCurrentStage] = useState<ViewStage>('categories');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null);
  
  const handleCategorySelect = useCallback((categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setCurrentStage('types');
  }, []);
  
  const handleTypeSelect = useCallback((typeId: string) => {
    setSelectedTypeId(typeId);
    setCurrentStage('exercises');
  }, []);
  
  const handleBackToCategories = useCallback(() => {
    setSelectedCategoryId(null);
    setSelectedTypeId(null);
    setCurrentStage('categories');
  }, []);
  
  const handleBackToTypes = useCallback(() => {
    setSelectedTypeId(null);
    setCurrentStage('types');
  }, []);
  
  const handleExerciseSelect = useCallback((exerciseId: string) => {
    console.log("Selected exercise:", exerciseId);
    // Additional handling can be added here
  }, []);
  
  return {
    currentStage,
    selectedCategoryId,
    selectedTypeId,
    handleCategorySelect,
    handleTypeSelect,
    handleBackToCategories,
    handleBackToTypes,
    handleExerciseSelect
  };
};

export default useHierarchicalView;
