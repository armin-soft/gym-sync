
import React from "react";
import { useExercisesStage } from "../../hooks/useExercisesStage";
import ExerciseHeader from "./ExerciseHeader";
import ExercisesList from "./ExercisesList";
import QuickSpeechAdd from "./QuickSpeechAdd";
import ExerciseDialogs from "./ExerciseDialogs";
import BackNavigation from "./BackNavigation";
import { useDataRefresh } from "@/hooks/useDataRefresh";

interface ExercisesStageProps {
  categoryId: string;
  typeId: string;
  onBackToCategories?: () => void;
  onBackToTypes?: () => void;
}

const ExercisesStage = React.memo(({ 
  categoryId, 
  typeId, 
  onBackToCategories, 
  onBackToTypes 
}: ExercisesStageProps) => {
  // Auto-refresh data for exercises
  useDataRefresh({
    keys: ['exercises', 'exerciseCategories']
  });

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
    <div className="flex flex-col h-full w-full bg-gradient-to-br from-emerald-50/30 to-sky-50/30 dark:from-emerald-900/10 dark:to-sky-900/10">
      {/* Back Navigation */}
      <div className="flex-shrink-0 mb-4">
        <BackNavigation
          onBackToCategories={onBackToCategories}
          onBackToTypes={onBackToTypes}
          selectedCategory={selectedCategory}
        />
      </div>

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
        <div className="flex-shrink-0 border-t bg-background border-emerald-200 dark:border-emerald-800">
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
