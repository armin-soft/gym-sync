
import { useState, useEffect } from 'react';

export function useExerciseSelection(
  initialExercises: number[] = [],
  initialExercisesDay1: number[] = [],
  initialExercisesDay2: number[] = [],
  initialExercisesDay3: number[] = [],
  initialExercisesDay4: number[] = []
) {
  const [selectedExercises, setSelectedExercises] = useState<number[]>([]);
  const [selectedExercisesDay1, setSelectedExercisesDay1] = useState<number[]>([]);
  const [selectedExercisesDay2, setSelectedExercisesDay2] = useState<number[]>([]);
  const [selectedExercisesDay3, setSelectedExercisesDay3] = useState<number[]>([]);
  const [selectedExercisesDay4, setSelectedExercisesDay4] = useState<number[]>([]);
  
  useEffect(() => {
    setSelectedExercises(initialExercises);
    setSelectedExercisesDay1(initialExercisesDay1);
    setSelectedExercisesDay2(initialExercisesDay2);
    setSelectedExercisesDay3(initialExercisesDay3);
    setSelectedExercisesDay4(initialExercisesDay4);
  }, [initialExercises, initialExercisesDay1, initialExercisesDay2, initialExercisesDay3, initialExercisesDay4]);

  const toggleExercise = (exerciseId: number) => {
    setSelectedExercises((prev) => 
      prev.includes(exerciseId) 
        ? prev.filter(id => id !== exerciseId) 
        : [...prev, exerciseId]
    );
  };

  const toggleExerciseDay1 = (exerciseId: number) => {
    setSelectedExercisesDay1((prev) => 
      prev.includes(exerciseId) 
        ? prev.filter(id => id !== exerciseId) 
        : [...prev, exerciseId]
    );
  };

  const toggleExerciseDay2 = (exerciseId: number) => {
    setSelectedExercisesDay2((prev) => 
      prev.includes(exerciseId) 
        ? prev.filter(id => id !== exerciseId) 
        : [...prev, exerciseId]
    );
  };

  const toggleExerciseDay3 = (exerciseId: number) => {
    setSelectedExercisesDay3((prev) => 
      prev.includes(exerciseId) 
        ? prev.filter(id => id !== exerciseId) 
        : [...prev, exerciseId]
    );
  };

  const toggleExerciseDay4 = (exerciseId: number) => {
    setSelectedExercisesDay4((prev) => 
      prev.includes(exerciseId) 
        ? prev.filter(id => id !== exerciseId) 
        : [...prev, exerciseId]
    );
  };

  return {
    selectedExercises,
    selectedExercisesDay1,
    selectedExercisesDay2,
    selectedExercisesDay3,
    selectedExercisesDay4,
    toggleExercise,
    toggleExerciseDay1,
    toggleExerciseDay2,
    toggleExerciseDay3,
    toggleExerciseDay4
  };
}
