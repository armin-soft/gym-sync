
import React from 'react';
import ExerciseDialogs from "./ExerciseDialogs";
import ExercisesList from "./ExercisesList";
import ExerciseHeader from "./ExerciseHeader";
import QuickSpeechAdd from "./QuickSpeechAdd";

// Component that displays exercises for a selected type and category
const ExercisesStage: React.FC<{
  typeId: string;
  categoryId: string;
  onBack: () => void;
  onExerciseSelect: (exerciseId: string) => void;
}> = ({ typeId, categoryId, onBack, onExerciseSelect }) => {
  // Use the hook to get all the state and handlers
  const {
    isLoading,
    filteredExercises,
    selectedCategory,
    selectedExerciseIds,
    setSelectedExerciseIds,
    handleAddExercise,
    handleEditExercise,
    handleExerciseDialogOpen,
    handleExerciseDialogClose,
    isAddExerciseDialogOpen,
    isEditExerciseDialogOpen,
    activeExercise,
    handleSubmit,
    handleViewExercise,
    searchQuery,
    setSearchQuery,
    handleQuickAdd,
    handleDeleteExercise
  } = useExercisesStage({ typeId, categoryId });

  return (
    <div className="space-y-4">
      <ExerciseHeader 
        title={selectedCategory?.name} 
        onBack={onBack}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        exerciseCount={filteredExercises.length}
      />
      
      <ExercisesList 
        exercises={filteredExercises}
        selectedIds={selectedExerciseIds}
        onSelect={setSelectedExerciseIds}
        onEdit={handleEditExercise}
        onView={handleViewExercise}
        onDelete={handleDeleteExercise}
        isLoading={isLoading}
      />
      
      <QuickSpeechAdd onQuickAdd={handleQuickAdd} />
      
      <ExerciseDialogs 
        isAddOpen={isAddExerciseDialogOpen}
        isEditOpen={isEditExerciseDialogOpen}
        onAddClose={handleExerciseDialogClose}
        onEditClose={handleExerciseDialogClose}
        onSubmit={handleSubmit}
        activeExercise={activeExercise}
        categoryId={categoryId}
        typeId={typeId}
      />
    </div>
  );
};

// Import this at the end to avoid circular dependencies
import { useExercisesStage } from '../../hooks/useExercisesStage';

export default ExercisesStage;
