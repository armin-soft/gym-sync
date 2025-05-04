
import React from "react";
import { useHierarchicalView } from "./hooks/useHierarchicalView";
import { HierarchicalViewContainer } from "./components/HierarchicalViewContainer";
import { PageContainer } from "@/components/ui/page-container";

const HierarchicalExercisesView = () => {
  const {
    currentStage,
    selectedTypeId,
    selectedTypeName,
    selectedCategoryId,
    selectedCategoryName,
    handleTypeSelect,
    handleCategorySelect,
    handleBackToTypes,
    handleBackToCategories,
    handleExerciseSelect,
    handleEditCategory,
    handleEditType,
    handleDeleteType
  } = useHierarchicalView();

  return (
    <HierarchicalViewContainer
      currentStage={currentStage}
      selectedTypeName={selectedTypeName}
      selectedCategoryName={selectedCategoryName}
      selectedTypeId={selectedTypeId}
      selectedCategoryId={selectedCategoryId}
      handleTypeSelect={handleTypeSelect}
      handleCategorySelect={handleCategorySelect}
      handleBackToTypes={handleBackToTypes}
      handleBackToCategories={handleBackToCategories}
      handleExerciseSelect={handleExerciseSelect}
      handleEditType={handleEditType}
      handleDeleteType={handleDeleteType}
      handleEditCategory={handleEditCategory}
    />
  );
};

export default HierarchicalExercisesView;
