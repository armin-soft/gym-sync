
import React from "react";
import { useExercisesStage } from "../../hooks/useExercisesStage";
import ExerciseHeader from "./ExerciseHeader";
import ExercisesList from "./ExercisesList";
import QuickSpeechAdd from "./QuickSpeechAdd";
import ExerciseDialogs from "./ExerciseDialogs";
import { Exercise } from "@/types/exercise";

interface ExercisesStageProps {
  categoryId: string;
  typeId: string;
}

const ExercisesStage = ({ categoryId, typeId }: ExercisesStageProps) => {
  const {
    isLoading,
    filteredExercises,
    selectedCategory,
    selectedExerciseIds,
    setSelectedExerciseIds,
    viewMode,
    setViewMode,
    handleEditExercise,
    handleDeleteExercise,
    isAddDialogOpen,
    setIsAddDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    selectedExercise,
    formData,
    setFormData,
    handleSubmit,
    quickSpeechText,
    setQuickSpeechText,
    handleQuickAdd,
    showQuickSpeech,
    setShowQuickSpeech
  } = useExercisesStage({ categoryId, typeId });

  return (
    <div className="flex flex-col h-full">
      <ExerciseHeader
        exerciseCount={filteredExercises.length}
        selectedExerciseIds={selectedExerciseIds}
        onDeleteClick={() => setIsDeleteDialogOpen(true)}
        onAddExercise={() => setIsAddDialogOpen(true)}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      <ExercisesList
        filteredExercises={filteredExercises}
        selectedCategory={selectedCategory}
        selectedExerciseIds={selectedExerciseIds}
        setSelectedExerciseIds={setSelectedExerciseIds}
        viewMode={viewMode}
        onEditExercise={handleEditExercise}
        onDeleteExercise={handleDeleteExercise}
        onAddExercise={() => setIsAddDialogOpen(true)}
      />

      {showQuickSpeech && (
        <QuickSpeechAdd
          onQuickAdd={handleQuickAdd}
          quickSpeechText={quickSpeechText}
          setQuickSpeechText={setQuickSpeechText}
        />
      )}

      <ExerciseDialogs
        isAddDialogOpen={isAddDialogOpen}
        setIsAddDialogOpen={setIsAddDialogOpen}
        selectedExercise={selectedExercise}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSubmit}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        onDelete={handleDeleteExercise}
        selectedExerciseIds={selectedExerciseIds}
      />
    </div>
  );
};

export default ExercisesStage;
