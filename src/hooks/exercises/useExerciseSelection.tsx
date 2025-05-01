
import { useState } from "react";

/**
 * Hook to manage exercise selection
 */
export const useExerciseSelection = () => {
  const [selectedExerciseIds, setSelectedExerciseIds] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const toggleExerciseSelection = (exerciseId: number) => {
    setSelectedExerciseIds(prev => {
      if (prev.includes(exerciseId)) {
        return prev.filter(id => id !== exerciseId);
      } else {
        return [...prev, exerciseId];
      }
    });
  };

  return {
    selectedExerciseIds,
    setSelectedExerciseIds,
    viewMode,
    setViewMode,
    toggleExerciseSelection
  };
};
