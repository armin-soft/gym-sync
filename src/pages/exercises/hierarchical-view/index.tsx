
import React, { useState } from "react";
import { HierarchicalViewContainer } from "./components/HierarchicalViewContainer";
import { TypeDialogManager } from "./components/dialogs/TypeDialogManager";
import { CategoryDialogManager } from "./components/dialogs/CategoryDialogManager";
import { DeleteTypeConfirmation } from "./components/dialogs/DeleteTypeConfirmation";
import { useHierarchicalView } from "./hooks/useHierarchicalView";
import { useExerciseData } from "@/hooks/exercises/useExerciseData";
import { ExerciseCategory } from "@/types/exercise";

const HierarchicalExercisesView = () => {
  const { 
    currentStage, 
    selectedTypeId, 
    selectedCategoryId,
    handleTypeSelect,
    handleCategorySelect,
    handleBackToTypes,
    handleBackToCategories,
    handleExerciseSelect
  } = useHierarchicalView();
  
  const { exerciseTypes, categories } = useExerciseData();
  
  // State for dialog management
  const [isTypeDialogOpen, setIsTypeDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [editingType, setEditingType] = useState<string | null>(null);
  const [editingCategory, setEditingCategory] = useState<ExerciseCategory | null>(null);
  const [typeToDelete, setTypeToDelete] = useState<string | null>(null);
  const [isDeleteTypeDialogOpen, setIsDeleteTypeDialogOpen] = useState(false);

  // Selected type and category data
  const selectedTypeName = selectedTypeId ? selectedTypeId : undefined;
  const selectedCategory = selectedCategoryId ? categories.find(cat => cat.id.toString() === selectedCategoryId) : undefined;
  
  // Handle add button click based on the current stage
  const handleAddClick = () => {
    if (currentStage === 'types') {
      setEditingType(null);
      setIsTypeDialogOpen(true);
    } else if (currentStage === 'categories' && selectedTypeId) {
      setEditingCategory(null);
      setIsCategoryDialogOpen(true);
    }
  };
  
  // Function to handle editing a type
  const handleEditType = (type: string) => {
    setEditingType(type);
    setIsTypeDialogOpen(true);
  };
  
  // Function to handle deleting a type
  const handleDeleteType = (type: string) => {
    setTypeToDelete(type);
    setIsDeleteTypeDialogOpen(true);
  };
  
  // Function to handle editing a category
  const handleEditCategory = (category: ExerciseCategory) => {
    setEditingCategory(category);
    setIsCategoryDialogOpen(true);
  };

  // Function to handle completion of type operations
  const handleTypeOperationComplete = () => {
    setEditingType(null);
    setTypeToDelete(null);
    // If the deleted type was selected, go back to types list
    if (typeToDelete === selectedTypeId) {
      handleBackToTypes();
    }
  };
  
  // Function to handle completion of category operations
  const handleCategoryOperationComplete = () => {
    setEditingCategory(null);
  };
  
  return (
    <>
      <HierarchicalViewContainer 
        currentStage={currentStage}
        selectedTypeName={selectedTypeName}
        selectedCategoryName={selectedCategory?.name}
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
      
      {/* Dialog components */}
      <TypeDialogManager
        isOpen={isTypeDialogOpen}
        onOpenChange={setIsTypeDialogOpen}
        editingType={editingType}
        onComplete={handleTypeOperationComplete}
      />
      
      <CategoryDialogManager
        isOpen={isCategoryDialogOpen}
        onOpenChange={setIsCategoryDialogOpen}
        editingCategory={editingCategory}
        selectedTypeId={selectedTypeId}
        onComplete={handleCategoryOperationComplete}
      />
      
      <DeleteTypeConfirmation
        isOpen={isDeleteTypeDialogOpen}
        onOpenChange={setIsDeleteTypeDialogOpen}
        typeToDelete={typeToDelete}
        onComplete={handleTypeOperationComplete}
      />
    </>
  );
};

export default HierarchicalExercisesView;
