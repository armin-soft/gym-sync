
import React from "react";
import { useExercisesStage } from "../../hooks/useExercisesStage";
import ExerciseHeader from "./ExerciseHeader";
import ExercisesList from "./ExercisesList";
import QuickSpeechAdd from "./QuickSpeechAdd";
import ExerciseDialogs from "./ExerciseDialogs";

interface ExercisesStageProps {
  categoryId: string;
  typeId: string;
}

const ExercisesStage = React.memo(({ categoryId, typeId }: ExercisesStageProps) => {
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
    <div className="flex flex-col h-full w-full">
      <div className="flex-shrink-0">
        <ExerciseHeader
          exerciseCount={filteredExercises.length}
          selectedExerciseIds={selectedExerciseIds}
          onDeleteClick={() => setIsDeleteDialogOpen(true)}
          onAddExercise={() => setIsAddDialogOpen(true)}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
      </div>

      <div className="flex-1 min-h-0 overflow-hidden">
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
      </div>

      {showQuickSpeech && (
        <div className="flex-shrink-0 border-t bg-background">
          <QuickSpeechAdd
            onQuickAdd={handleQuickAdd}
            quickSpeechText={quickSpeechText}
            setQuickSpeechText={setQuickSpeechText}
          />
        </div>
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
});

ExercisesStage.displayName = "ExercisesStage";

export default ExercisesStage;
