
import { useState, useEffect } from 'react';

interface UseExerciseSelectionProps {
  initialExercises?: number[];
  initialExercisesDay1?: number[];
  initialExercisesDay2?: number[];
  initialExercisesDay3?: number[];
  initialExercisesDay4?: number[];
}

export function useExerciseSelection(initialProps: UseExerciseSelectionProps = {}) {
  const {
    initialExercises = [],
    initialExercisesDay1 = [],
    initialExercisesDay2 = [],
    initialExercisesDay3 = [],
    initialExercisesDay4 = [],
  } = initialProps;

  const [selectedExercises, setSelectedExercises] = useState<number[]>([]);
  const [selectedExercisesDay1, setSelectedExercisesDay1] = useState<number[]>([]);
  const [selectedExercisesDay2, setSelectedExercisesDay2] = useState<number[]>([]);
  const [selectedExercisesDay3, setSelectedExercisesDay3] = useState<number[]>([]);
  const [selectedExercisesDay4, setSelectedExercisesDay4] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState("day1");

  useEffect(() => {
    setSelectedExercises(initialExercises);
    setSelectedExercisesDay1(initialExercisesDay1);
    setSelectedExercisesDay2(initialExercisesDay2);
    setSelectedExercisesDay3(initialExercisesDay3);
    setSelectedExercisesDay4(initialExercisesDay4);
  }, [initialExercises, initialExercisesDay1, initialExercisesDay2, initialExercisesDay3, initialExercisesDay4]);

  const handleSelectExercise = (exerciseId: number) => {
    switch (activeTab) {
      case "day1":
        setSelectedExercisesDay1((prev) => 
          prev.includes(exerciseId) 
            ? prev.filter(id => id !== exerciseId) 
            : [...prev, exerciseId]
        );
        break;
      case "day2":
        setSelectedExercisesDay2((prev) => 
          prev.includes(exerciseId) 
            ? prev.filter(id => id !== exerciseId) 
            : [...prev, exerciseId]
        );
        break;
      case "day3":
        setSelectedExercisesDay3((prev) => 
          prev.includes(exerciseId) 
            ? prev.filter(id => id !== exerciseId) 
            : [...prev, exerciseId]
        );
        break;
      case "day4":
        setSelectedExercisesDay4((prev) => 
          prev.includes(exerciseId) 
            ? prev.filter(id => id !== exerciseId) 
            : [...prev, exerciseId]
        );
        break;
      default:
        setSelectedExercises((prev) => 
          prev.includes(exerciseId) 
            ? prev.filter(id => id !== exerciseId) 
            : [...prev, exerciseId]
        );
    }
  };

  const isExerciseSelected = (exerciseId: number) => {
    switch (activeTab) {
      case "day1":
        return selectedExercisesDay1.includes(exerciseId);
      case "day2":
        return selectedExercisesDay2.includes(exerciseId);
      case "day3":
        return selectedExercisesDay3.includes(exerciseId);
      case "day4":
        return selectedExercisesDay4.includes(exerciseId);
      default:
        return selectedExercises.includes(exerciseId);
    }
  };

  const getCurrentSelectedExercises = () => {
    switch (activeTab) {
      case "day1":
        return selectedExercisesDay1;
      case "day2":
        return selectedExercisesDay2;
      case "day3":
        return selectedExercisesDay3;
      case "day4":
        return selectedExercisesDay4;
      default:
        return selectedExercises;
    }
  };

  return {
    selectedExercises,
    selectedExercisesDay1,
    selectedExercisesDay2,
    selectedExercisesDay3,
    selectedExercisesDay4,
    activeTab,
    setActiveTab,
    handleSelectExercise,
    isExerciseSelected,
    getCurrentSelectedExercises
  };
}
