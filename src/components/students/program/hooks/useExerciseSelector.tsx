
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
  
  // Debug logs
  useEffect(() => {
    console.log("Exercise selector data:");
    console.log("Exercise types:", exerciseTypes);
    console.log("Categories:", categories);
    console.log("Exercises:", exercises);
  }, [exerciseTypes, categories, exercises]);
  
  // Auto-select type and category if a student has existing exercises
  useEffect(() => {
    if (selectedExercises.length > 0 && !selectedType) {
      const firstExercise = selectedExercises[0];
      const exercise = exercises.find(ex => ex.id === firstExercise.id);
      
      if (exercise) {
        const category = categories.find(cat => cat.id === exercise.categoryId);
        if (category) {
          console.log("Auto-selecting type and category based on existing exercises");
          setSelectedType(category.type);
          setSelectedCategoryId(exercise.categoryId);
        }
      }
    }
  }, [selectedExercises, exercises, categories, selectedType]);

  // Filter categories by selected type
  const filteredCategories = useMemo(() => {
    if (!selectedType) {
      console.log("No type selected, returning empty categories");
      return [];
    }
    
    const filtered = categories.filter(cat => cat.type === selectedType);
    console.log(`Filtered categories for type ${selectedType}:`, filtered);
    return filtered;
  }, [categories, selectedType]);
  
  // Filter exercises by selected type and category
  const filteredExercises = useMemo(() => {
    if (!selectedType) {
      console.log("No type selected, returning empty exercises");
      return [];
    }
    
    if (!selectedCategoryId) {
      console.log("No category selected, returning empty exercises");
      return [];
    }
    
    const filtered = exercises.filter(exercise => {
      const category = categories.find(cat => cat.id === exercise.categoryId);
      const matches = category?.type === selectedType && exercise.categoryId === selectedCategoryId;
      return matches;
    });
    
    console.log(`Filtered exercises for type ${selectedType} and category ${selectedCategoryId}:`, filtered);
    return filtered;
  }, [exercises, categories, selectedType, selectedCategoryId]);

  const toggleExercise = (exerciseId: number) => {
    console.log(`Toggling exercise ${exerciseId} for day ${dayNumber}`);
    
    if (selectedExercises.some(ex => ex.id === exerciseId)) {
      console.log(`Removing exercise ${exerciseId}`);
      setSelectedExercises(prev => prev.filter(ex => ex.id !== exerciseId));
    } else {
      console.log(`Adding exercise ${exerciseId} with default values`);
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
    console.log(`Reps changing for exercise ${exerciseId} to ${reps}`);
    updateExerciseDetails(exerciseId, 'reps', reps);
  };

  const clearFilters = () => {
    console.log("Clearing all filters");
    setSelectedType(null);
    setSelectedCategoryId(null);
  };

  // Handle type selection with proper reset
  const handleTypeSelection = (type: string | null) => {
    console.log(`Setting type to: ${type}`);
    setSelectedType(type);
    setSelectedCategoryId(null); // Always reset category when type changes
  };

  // Handle category selection
  const handleCategorySelection = (categoryId: number | null) => {
    console.log(`Setting category to: ${categoryId}`);
    setSelectedCategoryId(categoryId);
  };

  return {
    selectedType,
    setSelectedType: handleTypeSelection,
    selectedCategoryId,
    setSelectedCategoryId: handleCategorySelection,
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
