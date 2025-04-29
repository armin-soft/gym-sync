
import { useState, useEffect } from 'react';

interface ExerciseWithSets {
  id: number;
  sets: number;
  reps?: string; // اضافه کردن اطلاعات تکرار به عنوان یک فیلد اختیاری
}

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
  
  // Track sets for each exercise
  const [exerciseSets, setExerciseSets] = useState<Record<number, number>>({});
  const [exerciseSetsDay1, setExerciseSetsDay1] = useState<Record<number, number>>({});
  const [exerciseSetsDay2, setExerciseSetsDay2] = useState<Record<number, number>>({});
  const [exerciseSetsDay3, setExerciseSetsDay3] = useState<Record<number, number>>({});
  const [exerciseSetsDay4, setExerciseSetsDay4] = useState<Record<number, number>>({});
  
  // Track reps for each exercise
  const [exerciseReps, setExerciseReps] = useState<Record<number, string>>({});
  const [exerciseRepsDay1, setExerciseRepsDay1] = useState<Record<number, string>>({});
  const [exerciseRepsDay2, setExerciseRepsDay2] = useState<Record<number, string>>({});
  const [exerciseRepsDay3, setExerciseRepsDay3] = useState<Record<number, string>>({});
  const [exerciseRepsDay4, setExerciseRepsDay4] = useState<Record<number, string>>({});
  
  useEffect(() => {
    setSelectedExercises(initialExercises);
    setSelectedExercisesDay1(initialExercisesDay1);
    setSelectedExercisesDay2(initialExercisesDay2);
    setSelectedExercisesDay3(initialExercisesDay3);
    setSelectedExercisesDay4(initialExercisesDay4);
    
    // Initialize sets with default value of 3
    const initSets = (ids: number[]) => {
      return ids.reduce((acc, id) => ({ ...acc, [id]: 3 }), {});
    };
    
    // Initialize reps with empty string
    const initReps = (ids: number[]) => {
      return ids.reduce((acc, id) => ({ ...acc, [id]: '12-15' }), {});
    };
    
    setExerciseSets(initSets(initialExercises));
    setExerciseSetsDay1(initSets(initialExercisesDay1));
    setExerciseSetsDay2(initSets(initialExercisesDay2));
    setExerciseSetsDay3(initSets(initialExercisesDay3));
    setExerciseSetsDay4(initSets(initialExercisesDay4));
    
    setExerciseReps(initReps(initialExercises));
    setExerciseRepsDay1(initReps(initialExercisesDay1));
    setExerciseRepsDay2(initReps(initialExercisesDay2));
    setExerciseRepsDay3(initReps(initialExercisesDay3));
    setExerciseRepsDay4(initReps(initialExercisesDay4));
  }, [initialExercises, initialExercisesDay1, initialExercisesDay2, initialExercisesDay3, initialExercisesDay4]);

  const toggleExercise = (exerciseId: number) => {
    setSelectedExercises((prev) => {
      const isSelected = prev.includes(exerciseId);
      if (isSelected) {
        // Remove exercise and its sets/reps
        const newSets = { ...exerciseSets };
        const newReps = { ...exerciseReps };
        delete newSets[exerciseId];
        delete newReps[exerciseId];
        setExerciseSets(newSets);
        setExerciseReps(newReps);
        return prev.filter(id => id !== exerciseId);
      } else {
        // Add exercise with default sets and reps
        setExerciseSets(prev => ({ ...prev, [exerciseId]: 3 }));
        setExerciseReps(prev => ({ ...prev, [exerciseId]: '12-15' }));
        return [...prev, exerciseId];
      }
    });
  };

  const toggleExerciseDay1 = (exerciseId: number) => {
    setSelectedExercisesDay1((prev) => {
      const isSelected = prev.includes(exerciseId);
      if (isSelected) {
        const newSets = { ...exerciseSetsDay1 };
        const newReps = { ...exerciseRepsDay1 };
        delete newSets[exerciseId];
        delete newReps[exerciseId];
        setExerciseSetsDay1(newSets);
        setExerciseRepsDay1(newReps);
        return prev.filter(id => id !== exerciseId);
      } else {
        setExerciseSetsDay1(prev => ({ ...prev, [exerciseId]: 3 }));
        setExerciseRepsDay1(prev => ({ ...prev, [exerciseId]: '12-15' }));
        return [...prev, exerciseId];
      }
    });
  };

  const toggleExerciseDay2 = (exerciseId: number) => {
    setSelectedExercisesDay2((prev) => {
      const isSelected = prev.includes(exerciseId);
      if (isSelected) {
        const newSets = { ...exerciseSetsDay2 };
        const newReps = { ...exerciseRepsDay2 };
        delete newSets[exerciseId];
        delete newReps[exerciseId];
        setExerciseSetsDay2(newSets);
        setExerciseRepsDay2(newReps);
        return prev.filter(id => id !== exerciseId);
      } else {
        setExerciseSetsDay2(prev => ({ ...prev, [exerciseId]: 3 }));
        setExerciseRepsDay2(prev => ({ ...prev, [exerciseId]: '12-15' }));
        return [...prev, exerciseId];
      }
    });
  };

  const toggleExerciseDay3 = (exerciseId: number) => {
    setSelectedExercisesDay3((prev) => {
      const isSelected = prev.includes(exerciseId);
      if (isSelected) {
        const newSets = { ...exerciseSetsDay3 };
        const newReps = { ...exerciseRepsDay3 };
        delete newSets[exerciseId];
        delete newReps[exerciseId];
        setExerciseSetsDay3(newSets);
        setExerciseRepsDay3(newReps);
        return prev.filter(id => id !== exerciseId);
      } else {
        setExerciseSetsDay3(prev => ({ ...prev, [exerciseId]: 3 }));
        setExerciseRepsDay3(prev => ({ ...prev, [exerciseId]: '12-15' }));
        return [...prev, exerciseId];
      }
    });
  };

  const toggleExerciseDay4 = (exerciseId: number) => {
    setSelectedExercisesDay4((prev) => {
      const isSelected = prev.includes(exerciseId);
      if (isSelected) {
        const newSets = { ...exerciseSetsDay4 };
        const newReps = { ...exerciseRepsDay4 };
        delete newSets[exerciseId];
        delete newReps[exerciseId];
        setExerciseSetsDay4(newSets);
        setExerciseRepsDay4(newReps);
        return prev.filter(id => id !== exerciseId);
      } else {
        setExerciseSetsDay4(prev => ({ ...prev, [exerciseId]: 3 }));
        setExerciseRepsDay4(prev => ({ ...prev, [exerciseId]: '12-15' }));
        return [...prev, exerciseId];
      }
    });
  };

  // Handle sets change for each day
  const handleSetsChange = (exerciseId: number, sets: number) => {
    setExerciseSets(prev => ({ ...prev, [exerciseId]: sets }));
  };

  const handleSetsChangeDay1 = (exerciseId: number, sets: number) => {
    setExerciseSetsDay1(prev => ({ ...prev, [exerciseId]: sets }));
  };

  const handleSetsChangeDay2 = (exerciseId: number, sets: number) => {
    setExerciseSetsDay2(prev => ({ ...prev, [exerciseId]: sets }));
  };

  const handleSetsChangeDay3 = (exerciseId: number, sets: number) => {
    setExerciseSetsDay3(prev => ({ ...prev, [exerciseId]: sets }));
  };

  const handleSetsChangeDay4 = (exerciseId: number, sets: number) => {
    setExerciseSetsDay4(prev => ({ ...prev, [exerciseId]: sets }));
  };
  
  // Handle reps change for each day
  const handleRepsChange = (exerciseId: number, reps: string) => {
    setExerciseReps(prev => ({ ...prev, [exerciseId]: reps }));
  };

  const handleRepsChangeDay1 = (exerciseId: number, reps: string) => {
    setExerciseRepsDay1(prev => ({ ...prev, [exerciseId]: reps }));
  };

  const handleRepsChangeDay2 = (exerciseId: number, reps: string) => {
    setExerciseRepsDay2(prev => ({ ...prev, [exerciseId]: reps }));
  };

  const handleRepsChangeDay3 = (exerciseId: number, reps: string) => {
    setExerciseRepsDay3(prev => ({ ...prev, [exerciseId]: reps }));
  };

  const handleRepsChangeDay4 = (exerciseId: number, reps: string) => {
    setExerciseRepsDay4(prev => ({ ...prev, [exerciseId]: reps }));
  };

  // Get selected exercises with their sets and reps
  const getSelectedExercisesWithSets = () => {
    return selectedExercises.map(id => ({
      id,
      sets: exerciseSets[id] || 3,
      reps: exerciseReps[id] || '12-15'
    }));
  };

  const getSelectedExercisesWithSetsDay1 = () => {
    return selectedExercisesDay1.map(id => ({
      id,
      sets: exerciseSetsDay1[id] || 3,
      reps: exerciseRepsDay1[id] || '12-15'
    }));
  };

  const getSelectedExercisesWithSetsDay2 = () => {
    return selectedExercisesDay2.map(id => ({
      id,
      sets: exerciseSetsDay2[id] || 3,
      reps: exerciseRepsDay2[id] || '12-15'
    }));
  };

  const getSelectedExercisesWithSetsDay3 = () => {
    return selectedExercisesDay3.map(id => ({
      id,
      sets: exerciseSetsDay3[id] || 3,
      reps: exerciseRepsDay3[id] || '12-15'
    }));
  };

  const getSelectedExercisesWithSetsDay4 = () => {
    return selectedExercisesDay4.map(id => ({
      id,
      sets: exerciseSetsDay4[id] || 3,
      reps: exerciseRepsDay4[id] || '12-15'
    }));
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
    toggleExerciseDay4,
    exerciseSets,
    exerciseSetsDay1,
    exerciseSetsDay2,
    exerciseSetsDay3,
    exerciseSetsDay4,
    exerciseReps,
    exerciseRepsDay1,
    exerciseRepsDay2,
    exerciseRepsDay3,
    exerciseRepsDay4,
    handleSetsChange,
    handleSetsChangeDay1,
    handleSetsChangeDay2,
    handleSetsChangeDay3,
    handleSetsChangeDay4,
    handleRepsChange,
    handleRepsChangeDay1,
    handleRepsChangeDay2,
    handleRepsChangeDay3,
    handleRepsChangeDay4,
    getSelectedExercisesWithSets,
    getSelectedExercisesWithSetsDay1,
    getSelectedExercisesWithSetsDay2,
    getSelectedExercisesWithSetsDay3,
    getSelectedExercisesWithSetsDay4
  };
}
