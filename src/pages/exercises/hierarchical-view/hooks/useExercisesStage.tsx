
import { useState, useEffect, useCallback } from "react";
import { Exercise, ExerciseCategory } from "@/types/exercise";
import { useToast } from "@/hooks/use-toast";
import { useExerciseData } from "@/hooks/exercises/useExerciseData";
import { useExerciseManagement } from "@/hooks/useExerciseManagement";

interface UseExercisesStageProps {
  categoryId: string;
}

export const useExercisesStage = ({ categoryId }: UseExercisesStageProps) => {
  const { toast } = useToast();
  const { categories, exercises, isLoading } = useExerciseData();
  const { handleExerciseSave, handleDeleteExercises } = useExerciseManagement();
  
  const [selectedCategory, setSelectedCategory] = useState<ExerciseCategory | null>(null);
  const [selectedExerciseIds, setSelectedExerciseIds] = useState<number[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isVoiceRecognitionOpen, setIsVoiceRecognitionOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | undefined>();
  const [formData, setFormData] = useState({ name: "", categoryId: Number(categoryId) || 0 });

  // Load selected category and filter exercises on mount or when categoryId changes
  useEffect(() => {
    if (!isLoading) {
      const category = categories.find(c => c.id === Number(categoryId));
      setSelectedCategory(category || null);
      
      if (category) {
        const filtered = exercises.filter(ex => ex.categoryId === category.id);
        setFilteredExercises(filtered);
      } else {
        setFilteredExercises([]);
        toast({
          variant: "destructive",
          title: "خطا",
          description: "دسته‌بندی مورد نظر یافت نشد."
        });
      }
    }
  }, [categoryId, categories, exercises, isLoading, toast]);

  // Set default category ID in formData when selectedCategory changes
  useEffect(() => {
    if (selectedCategory) {
      setFormData(prev => ({
        ...prev,
        categoryId: selectedCategory.id
      }));
    }
  }, [selectedCategory]);

  // Handler for adding a new exercise
  const handleAddExercise = useCallback(() => {
    setSelectedExercise(undefined);
    setFormData({ name: "", categoryId: selectedCategory?.id || 0 });
    setIsAddDialogOpen(true);
  }, [selectedCategory]);

  // Handler for editing an existing exercise
  const handleEditExercise = useCallback((exercise: Exercise) => {
    setSelectedExercise(exercise);
    setFormData({
      name: exercise.name,
      categoryId: exercise.categoryId
    });
    setIsAddDialogOpen(true);
  }, []);

  // Handler for deleting selected exercises
  const handleDeleteSelectedExercises = useCallback(() => {
    if (selectedExerciseIds.length > 0) {
      handleDeleteExercises(selectedExerciseIds);
      setSelectedExerciseIds([]);
      setIsDeleteDialogOpen(false);
    }
  }, [selectedExerciseIds, handleDeleteExercises]);

  // Handler for saving an exercise
  const handleSaveExercise = useCallback(async () => {
    try {
      await handleExerciseSave(formData);
      setIsAddDialogOpen(false);
      setIsVoiceRecognitionOpen(false);
      setFormData({ name: "", categoryId: selectedCategory?.id || 0 });
    } catch (error) {
      console.error("Error saving exercise:", error);
    }
  }, [formData, handleExerciseSave, selectedCategory?.id]);

  return {
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
    setSelectedExercise,
    formData,
    setFormData,
    handleDeleteExercises: handleDeleteSelectedExercises,
    handleSaveExercise,
    handleEditExercise,
    handleAddExercise,
    isVoiceRecognitionOpen,
    setIsVoiceRecognitionOpen,
  };
};
