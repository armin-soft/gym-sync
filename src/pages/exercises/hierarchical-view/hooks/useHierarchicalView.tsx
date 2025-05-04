
import { useState, useCallback } from "react";
import { useExerciseData } from '@/hooks/exercises/useExerciseData';

export type ViewStage = 'types' | 'categories' | 'exercises';

export const useHierarchicalView = () => {
  // تغییر مرحله اول به انواع تمرین
  const [currentStage, setCurrentStage] = useState<ViewStage>('types');
  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  
  const { exerciseTypes, categories } = useExerciseData();
  
  // یافتن نام نوع و دسته‌بندی انتخاب شده بر اساس آیدی
  const selectedTypeName = selectedTypeId ? 
    exerciseTypes.find(type => type.id.toString() === selectedTypeId)?.name : '';
    
  const selectedCategoryName = selectedCategoryId ? 
    categories.find(cat => cat.id.toString() === selectedCategoryId)?.name : '';
  
  const handleTypeSelect = useCallback((typeId: string) => {
    setSelectedTypeId(typeId);
    setCurrentStage('categories');
  }, []);
  
  const handleCategorySelect = useCallback((categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setCurrentStage('exercises');
  }, []);
  
  const handleBackToTypes = useCallback(() => {
    setSelectedTypeId(null);
    setSelectedCategoryId(null);
    setCurrentStage('types');
  }, []);
  
  const handleBackToCategories = useCallback(() => {
    setSelectedCategoryId(null);
    setCurrentStage('categories');
  }, []);
  
  const handleExerciseSelect = useCallback((exerciseId: string) => {
    console.log("Selected exercise:", exerciseId);
    // Additional handling can be added here
  }, []);
  
  const handleEditType = useCallback((typeId: string) => {
    console.log("Edit type:", typeId);
    // منطق ویرایش نوع تمرین
  }, []);
  
  const handleDeleteType = useCallback((typeId: string) => {
    console.log("Delete type:", typeId);
    // منطق حذف نوع تمرین
  }, []);
  
  const handleEditCategory = useCallback((category: any) => {
    console.log("Edit category:", category);
    // منطق ویرایش دسته‌بندی
  }, []);
  
  return {
    currentStage,
    selectedTypeId,
    selectedCategoryId,
    selectedTypeName,
    selectedCategoryName,
    handleTypeSelect,
    handleCategorySelect,
    handleBackToTypes,
    handleBackToCategories,
    handleExerciseSelect,
    handleEditType,
    handleDeleteType,
    handleEditCategory
  };
};

export default useHierarchicalView;
