
import React from "react";
import { PageContainer } from "@/components/ui/page-container";
import { useHierarchicalView } from "./hooks/useHierarchicalView";
import { HierarchicalViewContainer } from "./components/HierarchicalViewContainer";

const HierarchicalExercisesView = () => {
  const {
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
    handleAddClick,
    handleEditType,
    handleDeleteType,
    handleEditCategory
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
      handleAddClick={handleAddClick}
      handleEditType={handleEditType}
      handleDeleteType={handleDeleteType}
      handleEditCategory={handleEditCategory}
    />
  );
};

export default HierarchicalExercisesView;
