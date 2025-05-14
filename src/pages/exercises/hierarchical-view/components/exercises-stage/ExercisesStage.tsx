
import React from "react";
import { useExercisesStage } from "../../hooks/useExercisesStage";
import ExerciseHeader from "./ExerciseHeader";
import ExercisesList from "./ExercisesList";
import QuickSpeechAdd from "./QuickSpeechAdd";
import ExerciseDialogs from "./ExerciseDialogs";
import { Exercise } from "@/types/exercise";

interface ExerciseHeaderProps {
  onBack: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  exerciseCount: number;
}

interface ExercisesListProps {
  isLoading: boolean;
  selectedIds: number[];
  onSelect: React.Dispatch<React.SetStateAction<number[]>>;
  onEdit: (exercise: Exercise) => void;
  onView: (exercise: Exercise) => void;
  onDelete: (id: number) => void;
  exercises: Exercise[];
}

interface QuickSpeechAddProps {
  onQuickAdd: () => void;
  quickSpeechText: string;
  setQuickSpeechText: (text: string) => void;
}

interface ExerciseDialogsProps {
  isAddOpen: boolean;
  isEditOpen: boolean;
  onAddClose: () => void;
  onEditClose: () => void;
  onSubmit: (data: any) => void;
  activeExercise: Exercise | null;
  categoryId: string;
  typeId: string;
}

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
    activeExercise,
    handleSubmit,
    handleViewExercise,
    searchQuery,
    setSearchQuery,
    quickSpeechText,
    setQuickSpeechText,
    handleDeleteExercise
  } = useExercisesStage({ categoryId, typeId });

  return (
    <div className="flex flex-col h-full">
      <ExerciseHeader
        onBack={handleBack}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        exerciseCount={exerciseCount}
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

      <QuickSpeechAdd
        onQuickAdd={handleQuickAdd}
        quickSpeechText={quickSpeechText}
        setQuickSpeechText={setQuickSpeechText}
      />

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

export default ExercisesStage;
