
import { useState, useMemo, useEffect } from "react";
import { ExerciseWithSets } from "@/types/exercise";

interface UseExerciseSelectorProps {
  exercises: any[];
  categories: any[];
  exerciseTypes: string[];
  selectedExercises: ExerciseWithSets[];
  setSelectedExercises: React.Dispatch<React.SetStateAction<ExerciseWithSets[]>>;
  dayNumber: number;
}

export const useExerciseSelector = ({
  exercises,
  categories,
  exerciseTypes,
  selectedExercises,
  setSelectedExercises,
  dayNumber
}: UseExerciseSelectorProps) => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  
  // Auto-select type and category if a student has existing exercises - trigger on day change as well
  useEffect(() => {
    if (selectedExercises.length > 0) {
      const firstExercise = selectedExercises[0];
      const exercise = exercises.find(ex => ex.id === firstExercise.id);
      
      if (exercise) {
        const category = categories.find(cat => cat.id === exercise.categoryId);
        if (category) {
          setSelectedType(category.type);
          setSelectedCategoryId(exercise.categoryId);
        }
      }
    }
  }, [selectedExercises, exercises, categories, dayNumber]);

  // Filter categories by type
  const filteredCategories = useMemo(() => {
    if (!selectedType) return [];
    
    return categories.filter(cat => cat.type === selectedType);
  }, [categories, selectedType]);
  
  // Filter exercises by type and category
  const filteredExercises = useMemo(() => {
    if (!selectedType || !selectedCategoryId) return [];
    
    return exercises.filter(exercise => {
      const category = categories.find(cat => cat.id === exercise.categoryId);
      return category?.type === selectedType && exercise.categoryId === selectedCategoryId;
    });
  }, [exercises, categories, selectedType, selectedCategoryId]);

  const toggleExercise = (exerciseId: number) => {
    if (selectedExercises.some(ex => ex.id === exerciseId)) {
      setSelectedExercises(prev => prev.filter(ex => ex.id !== exerciseId));
    } else {
      setSelectedExercises(prev => [
        ...prev, 
        { 
          id: exerciseId, 
          sets: 3, 
          reps: "12", 
          day: dayNumber
        }
      ]);
    }
  };

  const updateExerciseDetails = (exerciseId: number, field: keyof ExerciseWithSets, value: any) => {
    console.log(`Updating exercise ${exerciseId} field ${field} with value ${value}`);
    setSelectedExercises(prev => 
      prev.map(ex => 
        ex.id === exerciseId ? { ...ex, [field]: value } : ex
      )
    );
  };
  
  const handleSetsChange = (exerciseId: number, sets: number) => {
    console.log(`Sets changing for exercise ${exerciseId} to ${sets}`);
    updateExerciseDetails(exerciseId, 'sets', sets);
  };

  const handleRepsChange = (exerciseId: number, reps: string) => {
    updateExerciseDetails(exerciseId, 'reps', reps);
  };

  const clearFilters = () => {
    setSelectedType(null);
    setSelectedCategoryId(null);
  };

  return {
    selectedType,
    setSelectedType,
    selectedCategoryId,
    setSelectedCategoryId,
    viewMode,
    setViewMode,
    filteredCategories,
    filteredExercises,
    toggleExercise,
    handleSetsChange,
    handleRepsChange,
    clearFilters
  };
};
