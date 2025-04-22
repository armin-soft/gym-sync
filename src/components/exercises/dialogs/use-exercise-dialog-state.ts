
import { useState, useEffect } from "react";

export const useExerciseDialogState = (
  open: boolean,
  initialExercisesDay1: number[] = [],
  initialExercisesDay2: number[] = [],
  initialExercisesDay3: number[] = [],
  initialExercisesDay4: number[] = []
) => {
  const [activeTab, setActiveTab] = useState<string>("day1");
  const [savedState, setSavedState] = useState({
    day1: false,
    day2: false,
    day3: false,
    day4: false
  });

  useEffect(() => {
    if (open) {
      setSavedState({
        day1: false,
        day2: false,
        day3: false,
        day4: false
      });
    }
  }, [open]);

  const getActiveTabSelectedExercises = (
    selectedExercisesDay1: number[],
    selectedExercisesDay2: number[],
    selectedExercisesDay3: number[],
    selectedExercisesDay4: number[]
  ) => {
    switch(activeTab) {
      case "day1": return selectedExercisesDay1;
      case "day2": return selectedExercisesDay2;
      case "day3": return selectedExercisesDay3;
      case "day4": return selectedExercisesDay4;
      default: return [];
    }
  };

  return {
    activeTab,
    setActiveTab,
    savedState,
    setSavedState,
    getActiveTabSelectedExercises
  };
};
