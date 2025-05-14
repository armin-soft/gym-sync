
import React from "react";
import { ExerciseDialogs } from "./ExerciseDialogs";
import { ExercisesList } from "./ExercisesList";
import { ExerciseHeader } from "./ExerciseHeader";
import { useExercisesStage } from "../../hooks/useExercisesStage";
import { QuickSpeechAdd } from "./QuickSpeechAdd";

export function ExercisesStage() {
  const {
    selectedExercise,
    isAddDialogOpen,
    setIsAddDialogOpen,
    formData,
    setFormData,
    handleSaveExercise,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    handleDeleteExercise,
    selectedExerciseIds,
  } = useExercisesStage();

  return (
    <div className="container px-4 py-4 mx-auto space-y-6">
      <ExerciseHeader
        onAddExercise={() => setIsAddDialogOpen(true)}
        onDeleteSelected={() => setIsDeleteDialogOpen(true)}
        selectedCount={selectedExerciseIds.length}
      />

      <QuickSpeechAdd onAddExercise={handleSaveExercise} />

      <ExercisesList />

      <ExerciseDialogs
        isAddDialogOpen={isAddDialogOpen}
        setIsAddDialogOpen={setIsAddDialogOpen}
        selectedExercise={selectedExercise}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSaveExercise}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        onDelete={handleDeleteExercise}
        selectedExerciseIds={selectedExerciseIds}
      />
    </div>
  );
}

export default ExercisesStage;
