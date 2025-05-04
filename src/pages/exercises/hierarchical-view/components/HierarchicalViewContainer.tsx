
import React from "react";
import { Card } from "@/components/ui/card";
import { useHierarchicalView } from "../hooks/useHierarchicalView";
import { ContentStages } from "./ContentStages";
import TypeSelectionStage from "./TypeSelectionStage";
import CategoriesStage from "./CategoriesStage";
import ExercisesStage from "./ExercisesStage";
import { PageContainer } from "@/components/ui/page-container";

interface HierarchicalViewContainerProps {
  currentStage: 'types' | 'categories' | 'exercises';
  selectedTypeName?: string;
  selectedCategoryName?: string;
  selectedTypeId: string | null;
  selectedCategoryId: string | null;
  handleTypeSelect: (typeId: string) => void;
  handleCategorySelect: (categoryId: string) => void;
  handleBackToTypes: () => void;
  handleBackToCategories: () => void;
  handleExerciseSelect: (exerciseId: string) => void;
  // حذف پراپ handleAddClick که مربوط به افزودن تمرین بود
  handleEditType?: (type: string) => void;
  handleDeleteType?: (type: string) => void;
  handleEditCategory: (category: any) => void;
}

export const HierarchicalViewContainer: React.FC<HierarchicalViewContainerProps> = ({
  currentStage,
  selectedTypeName,
  selectedCategoryName,
  selectedTypeId,
  selectedCategoryId,
  handleTypeSelect,
  handleCategorySelect,
  handleBackToTypes,
  handleBackToCategories,
  handleExerciseSelect,
  // حذف پراپ handleAddClick که مربوط به افزودن تمرین بود
  handleEditType,
  handleDeleteType,
  handleEditCategory
}) => {

  return (
    <PageContainer fullWidth>
      <div className="h-full flex flex-col p-4 md:p-6">
        {/* Content stages display - حذف پراپ onAddClick از این کامپوننت */}
        <ContentStages 
          currentStage={currentStage} 
          selectedTypeName={selectedTypeName} 
          selectedCategoryName={selectedCategoryName} 
        />
        
        <Card className="flex-1 overflow-hidden border-none shadow-md bg-gradient-to-br from-white to-indigo-50/30">
          <div className="h-full p-4 md:p-6 overflow-y-auto">
            {/* Render the appropriate stage based on the current state */}
            {currentStage === 'types' && (
              <TypeSelectionStage 
                onTypeSelect={handleTypeSelect} 
                onEditType={handleEditType}
                onDeleteType={handleDeleteType}
              />
            )}
            
            {currentStage === 'categories' && selectedTypeId && (
              <CategoriesStage 
                typeId={selectedTypeId} 
                onCategorySelect={handleCategorySelect} 
                onBack={handleBackToTypes} 
                onEditCategory={handleEditCategory}
              />
            )}
            
            {currentStage === 'exercises' && selectedTypeId && selectedCategoryId && (
              <ExercisesStage 
                typeId={selectedTypeId} 
                categoryId={selectedCategoryId} 
                onBack={handleBackToCategories} 
                onExerciseSelect={handleExerciseSelect} 
              />
            )}
          </div>
        </Card>
      </div>
    </PageContainer>
  );
};
