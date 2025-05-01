
import React from "react";
import { TypeSelectionStage } from "./TypeSelectionStage";
import { CategorySelectionStage } from "./CategorySelectionStage";
import { ExercisesStage } from "./ExercisesStage";
import { ExerciseCategory } from "@/types/exercise";

interface ContentStagesProps {
  selectionStage: "type" | "category" | "exercises";
  exerciseTypes: string[];
  setSelectedExerciseType: (type: string | null) => void;
  filteredCategories: ExerciseCategory[];
  setSelectedCategoryId: (id: number | null) => void;
  selectedExerciseType: string | null;
  handleOpenCategoryDialog: () => any;
  handleEditCategoryDialog: (category: ExerciseCategory) => any;
  confirmDelete: (type: "category" | "type", value: any) => void;
  filteredExercises: any[];
  categories: ExerciseCategory[];
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  handleOpenExerciseDialog: () => any;
  handleEditExercise: (exercise: any) => any;
  handleDeleteExercises: (ids: number[]) => void;
}

export const ContentStages: React.FC<ContentStagesProps> = ({
  selectionStage,
  exerciseTypes,
  setSelectedExerciseType,
  filteredCategories,
  setSelectedCategoryId,
  selectedExerciseType,
  handleOpenCategoryDialog,
  handleEditCategoryDialog,
  confirmDelete,
  filteredExercises,
  categories,
  viewMode,
  setViewMode,
  handleOpenExerciseDialog,
  handleEditExercise,
  handleDeleteExercises
}) => {
  return (
    <div className="flex-1 min-h-0 overflow-hidden">
      {selectionStage === "type" && (
        <TypeSelectionStage 
          exerciseTypes={exerciseTypes}
          setSelectedExerciseType={(type) => {
            console.log("Setting exercise type from TypeSelectionStage:", type);
            setSelectedExerciseType(type);
          }}
        />
      )}

      {selectionStage === "category" && (
        <CategorySelectionStage 
          categories={filteredCategories}
          setSelectedCategoryId={(id) => {
            console.log("Setting category ID from CategorySelectionStage:", id);
            setSelectedCategoryId(id);
          }}
          selectedExerciseType={selectedExerciseType}
          onAddCategory={() => {
            handleOpenCategoryDialog();
          }}
          onEditCategory={(category) => {
            handleEditCategoryDialog(category);
          }}
          onDeleteCategory={(category) => confirmDelete("category", category)}
        />
      )}

      {selectionStage === "exercises" && (
        <ExercisesStage 
          exercises={filteredExercises}
          categories={categories}
          viewMode={viewMode}
          setViewMode={setViewMode}
          onAddExercise={() => {
            handleOpenExerciseDialog();
          }}
          onEditExercise={(exercise) => {
            handleEditExercise(exercise);
          }}
          onDeleteExercises={handleDeleteExercises}
        />
      )}
    </div>
  );
};
