
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import ExerciseHeader from "./ExerciseHeader";
import ExercisesList from "./ExercisesList";
import ExerciseDialogs from "./ExerciseDialogs";
import { useExercisesStage } from "../../hooks/useExercisesStage";

interface ExercisesStageProps {
  categoryId: string;
  typeId: string;
  onBack: () => void;
  onExerciseSelect: (exerciseId: string) => void;
}

const ExercisesStage: React.FC<ExercisesStageProps> = ({
  categoryId,
  onBack,
}) => {
  // Use the custom hook to separate business logic
  const {
    isLoading,
    filteredExercises,
    selectedCategory,
    selectedExerciseIds,
    setSelectedExerciseIds,
    viewMode,
    setViewMode,
    isAddDialogOpen,
    setIsAddDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    selectedExercise,
    formData,
    setFormData,
    handleDeleteExercises,
    handleSaveExercise,
    handleEditExercise,
    handleAddExercise,
    isVoiceRecognitionOpen,
    setIsVoiceRecognitionOpen,
  } = useExercisesStage({ categoryId });
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">در حال بارگذاری تمرین‌ها...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="h-full flex flex-col gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={onBack}>
          بازگشت به دسته‌بندی‌ها
        </Button>
      </div>

      <ExerciseHeader 
        exerciseCount={filteredExercises.length}
        selectedExerciseIds={selectedExerciseIds}
        onDeleteClick={() => setIsDeleteDialogOpen(true)}
        onAddExercise={handleAddExercise}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onVoiceAdd={() => setIsVoiceRecognitionOpen(true)}
      />

      {/* Exercise list component */}
      <ExercisesList
        filteredExercises={filteredExercises}
        selectedCategory={selectedCategory}
        selectedExerciseIds={selectedExerciseIds}
        setSelectedExerciseIds={setSelectedExerciseIds}
        viewMode={viewMode}
        onEditExercise={handleEditExercise}
        onDeleteExercise={(exerciseId) => {
          setSelectedExerciseIds([exerciseId]);
          setIsDeleteDialogOpen(true);
        }}
        onAddExercise={handleAddExercise}
      />

      {/* Dialogs */}
      <ExerciseDialogs
        isAddDialogOpen={isAddDialogOpen}
        setIsAddDialogOpen={setIsAddDialogOpen}
        selectedExercise={selectedExercise}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSaveExercise}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        onDelete={handleDeleteExercises}
        selectedExerciseIds={selectedExerciseIds}
        isVoiceRecognitionOpen={isVoiceRecognitionOpen}
        setIsVoiceRecognitionOpen={setIsVoiceRecognitionOpen}
      />
    </motion.div>
  );
};

export default ExercisesStage;
