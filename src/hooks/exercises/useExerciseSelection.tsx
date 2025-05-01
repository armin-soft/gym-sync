
import { useState } from "react";

/**
 * Hook to manage exercise selection and view mode
 */
export const useExerciseSelection = () => {
  const [selectedExerciseIds, setSelectedExerciseIds] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  const toggleExerciseSelection = (exerciseId: number) => {
    setSelectedExerciseIds(prev => 
      prev.includes(exerciseId)
        ? prev.filter(id => id !== exerciseId)
        : [...prev, exerciseId]
    );
  };

  return {
    selectedExerciseIds,
    setSelectedExerciseIds,
    viewMode,
    setViewMode,
    toggleExerciseSelection
  };
};

export default useExerciseSelection;
