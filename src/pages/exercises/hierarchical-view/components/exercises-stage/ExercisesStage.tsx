
import React from "react";
import { useExercisesStage } from "../../hooks/useExercisesStage";
import ExerciseHeader from "./ExerciseHeader";
import ExercisesList from "./ExercisesList";
import QuickSpeechAdd from "./QuickSpeechAdd";
import ExerciseDialogs from "./ExerciseDialogs";
import { Exercise } from "@/types/exercise";

const ExercisesStage = ({ categoryId, typeId }: { categoryId: string; typeId: string }) => {
  const {
    isLoading,
    filteredExercises,
    selectedCategory,
    selectedExerciseIds,
    setSelectedExerciseIds,
    selectedType,
    handleBack,
    exerciseCount,
    handleEditExercise,
    handleQuickAdd,
    handleExerciseDialogOpen,
    handleExerciseDialogClose,
    isAddExerciseDialogOpen,
    isEditExerciseDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    activeExercise,
    handleSubmit,
    handleViewExercise,
    searchQuery,
    setSearchQuery,
    quickSpeechText,
    setQuickSpeechText,
    handleDeleteExercise,
    viewMode,
    setViewMode,
    formData,
    setFormData
  } = useExercisesStage({ categoryId, typeId });

  return (
    <div className="flex flex-col h-full">
      <ExerciseHeader
        exerciseCount={exerciseCount}
        selectedExerciseIds={selectedExerciseIds}
        onDeleteClick={() => setIsDeleteDialogOpen(true)}
        onAddExercise={handleExerciseDialogOpen}
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
        onAddExercise={handleExerciseDialogOpen}
      />

      <QuickSpeechAdd
        onQuickAdd={handleQuickAdd}
        quickSpeechText={quickSpeechText}
        setQuickSpeechText={setQuickSpeechText}
      />

      <ExerciseDialogs
        isAddDialogOpen={isAddExerciseDialogOpen}
        setIsAddDialogOpen={handleExerciseDialogOpen}
        selectedExercise={activeExercise}
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
