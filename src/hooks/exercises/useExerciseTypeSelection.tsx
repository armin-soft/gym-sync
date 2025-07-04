
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

  const handleSelectType = (type: string | null) => {
    console.log("Selecting exercise type:", type);
    // Force re-render by setting to null first, then the new value
    setSelectedType(null);
    setTimeout(() => {
      setSelectedType(type);
    }, 10);
  };

  return {
    selectedType,
    setSelectedType: handleSelectType
  };
};
