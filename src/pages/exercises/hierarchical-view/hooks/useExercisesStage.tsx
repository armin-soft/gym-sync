
import { useState, useEffect, useMemo } from "react";
import { useExerciseData } from "@/hooks/exercises/useExerciseData";
import { useExerciseManagement } from "@/hooks/useExerciseManagement";
import { Exercise } from "@/types/exercise";

interface UseExercisesStageProps {
  categoryId: string;
  typeId: string;
}

export const useExercisesStage = ({ categoryId, typeId }: UseExercisesStageProps) => {
  const { exercises, categories, isLoading } = useExerciseData();
  const {
    selectedExercise,
    setSelectedExercise,
    exerciseFormData,
    setExerciseFormData,
    isExerciseDialogOpen,
    setIsExerciseDialogOpen,
    handleExerciseSave,
    handleDeleteExercises
  } = useExerciseManagement();

  const [selectedExerciseIds, setSelectedExerciseIds] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [quickSpeechText, setQuickSpeechText] = useState("");
  const [showQuickSpeech, setShowQuickSpeech] = useState(false);

  // Filter exercises by category and type
  const filteredExercises = useMemo(() => {
    return exercises.filter(exercise => {
      const exerciseCategory = categories.find(cat => cat.id === exercise.categoryId);
      return exerciseCategory?.id.toString() === categoryId && exerciseCategory?.type === typeId;
    });
  }, [exercises, categories, categoryId, typeId]);

  // Get selected category data
  const selectedCategory = useMemo(() => {
    return categories.find(cat => cat.id.toString() === categoryId);
  }, [categories, categoryId]);

  // Get preselected category ID for new exercises
  const preselectedCategoryId = useMemo(() => {
    return selectedCategory ? selectedCategory.id : undefined;
  }, [selectedCategory]);

  const handleEditExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setExerciseFormData({ name: exercise.name, categoryId: exercise.categoryId });
    setIsExerciseDialogOpen(true);
  };

  const handleDeleteExercise = (id?: number) => {
    const idsToDelete = id ? [id] : selectedExerciseIds;
    handleDeleteExercises(idsToDelete);
    setSelectedExerciseIds([]);
    setIsDeleteDialogOpen(false);
  };

  const handleSubmit = async (formData: { name: string; categoryId: number }) => {
    await handleExerciseSave(formData);
    setSelectedExercise(undefined);
  };

  const handleQuickAdd = async (text: string) => {
    if (!text.trim()) return;
    
    try {
      await handleExerciseSave({ 
        name: text.trim(), 
        categoryId: preselectedCategoryId || (categories.length > 0 ? categories[0].id : 0)
      });
      setQuickSpeechText("");
    } catch (error) {
      console.error("Error in quick add:", error);
    }
  };

  // Reset form when adding new exercise
  useEffect(() => {
    if (isExerciseDialogOpen && !selectedExercise && preselectedCategoryId) {
      setExerciseFormData({ 
        name: "", 
        categoryId: preselectedCategoryId 
      });
    }
  }, [isExerciseDialogOpen, selectedExercise, preselectedCategoryId, setExerciseFormData]);

  return {
    isLoading,
    filteredExercises,
    selectedCategory,
    selectedExerciseIds,
    setSelectedExerciseIds,
    viewMode,
    setViewMode,
    handleEditExercise,
    handleDeleteExercise,
    isAddDialogOpen: isExerciseDialogOpen,
    setIsAddDialogOpen: setIsExerciseDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    selectedExercise,
    formData: exerciseFormData,
    setFormData: setExerciseFormData,
    handleSubmit,
    quickSpeechText,
    setQuickSpeechText,
    handleQuickAdd,
    showQuickSpeech,
    setShowQuickSpeech,
    preselectedCategoryId
  };
};

export default useExercisesStage;
