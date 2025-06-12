
import { useState } from "react";

export interface ExerciseWithSets {
  exerciseId: number;
  sets: number;
  reps: string;
}

export const useExerciseSelection = () => {
  const [selectedExercises, setSelectedExercises] = useState<ExerciseWithSets[]>([]);

  const toggleExercise = (exerciseId: number) => {
    setSelectedExercises(prev => {
      const exists = prev.find(ex => ex.exerciseId === exerciseId);
      if (exists) {
        return prev.filter(ex => ex.exerciseId !== exerciseId);
      } else {
        return [...prev, { exerciseId, sets: 3, reps: "10" }];
      }
    });
  };

  const updateExerciseSets = (exerciseId: number, sets: number) => {
    setSelectedExercises(prev => 
      prev.map(ex => 
        ex.exerciseId === exerciseId ? { ...ex, sets } : ex
      )
    );
  };

  const updateExerciseReps = (exerciseId: number, reps: string) => {
    setSelectedExercises(prev => 
      prev.map(ex => 
        ex.exerciseId === exerciseId ? { ...ex, reps } : ex
      )
    );
  };

  return {
    selectedExercises,
    setSelectedExercises,
    toggleExercise,
    updateExerciseSets,
    updateExerciseReps
  };
};
