
import { useState, useEffect } from "react";

/**
 * Hook to manage exercise type selection
 */
export const useExerciseTypeSelection = (exerciseTypes: string[]) => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  
  // Set initial selected type when data loads
  useEffect(() => {
    if (exerciseTypes.length > 0 && !selectedType) {
      console.log("Setting initial exercise type:", exerciseTypes[0]);
      setSelectedType(exerciseTypes[0]);
    }
  }, [exerciseTypes, selectedType]);

  return {
    selectedType,
    setSelectedType
  };
};
