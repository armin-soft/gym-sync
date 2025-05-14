
import { useState, useCallback, useEffect } from 'react';
import type { ExerciseWithSets, ExerciseSets, ExerciseReps } from './types';

interface UseExerciseSelectionProps {
  initialExercises?: number[];
  initialExercisesDay1?: number[];
  initialExercisesDay2?: number[];
  initialExercisesDay3?: number[];
  initialExercisesDay4?: number[];
}

export const useExerciseSelection = (props?: UseExerciseSelectionProps) => {
  const {
    initialExercises = [],
    initialExercisesDay1 = [],
    initialExercisesDay2 = [],
    initialExercisesDay3 = [],
    initialExercisesDay4 = []
  } = props || {};
  
  // Core state for exercise management
  const [selectedExercises, setSelectedExercises] = useState<ExerciseWithSets[]>([]);
  const [currentDayExercises, setCurrentDayExercises] = useState<ExerciseWithSets[]>([]);
  const [activeDay, setActiveDay] = useState<string>('saturday');
  
  // Day-specific states for exercises
  const [selectedExercisesDay1, setSelectedExercisesDay1] = useState<number[]>(initialExercisesDay1);
  const [selectedExercisesDay2, setSelectedExercisesDay2] = useState<number[]>(initialExercisesDay2); 
  const [selectedExercisesDay3, setSelectedExercisesDay3] = useState<number[]>(initialExercisesDay3);
  const [selectedExercisesDay4, setSelectedExercisesDay4] = useState<number[]>(initialExercisesDay4);
  
  // Sets and reps states for each day
  const [exerciseSetsDay1, setExerciseSetsDay1] = useState<ExerciseSets>({});
  const [exerciseSetsDay2, setExerciseSetsDay2] = useState<ExerciseSets>({});
  const [exerciseSetsDay3, setExerciseSetsDay3] = useState<ExerciseSets>({});
  const [exerciseSetsDay4, setExerciseSetsDay4] = useState<ExerciseSets>({});
  
  const [exerciseRepsDay1, setExerciseRepsDay1] = useState<ExerciseReps>({});
  const [exerciseRepsDay2, setExerciseRepsDay2] = useState<ExerciseReps>({});
  const [exerciseRepsDay3, setExerciseRepsDay3] = useState<ExerciseReps>({});
  const [exerciseRepsDay4, setExerciseRepsDay4] = useState<ExerciseReps>({});

  // Initialize current day's exercises based on activeDay
  useEffect(() => {
    const dayExercises = selectedExercises.filter(ex => ex.day === Number(activeDay));
    setCurrentDayExercises(dayExercises);
  }, [activeDay, selectedExercises]);

  // Add exercise to the selected list
  const addExercise = useCallback((exercise: ExerciseWithSets) => {
    const newExercise: ExerciseWithSets = {
      ...exercise,
      id: exercise.id,
      day: Number(activeDay), // Convert to number for consistency
      sets: exercise.sets,
      reps: exercise.reps
    };

    setSelectedExercises(prev => [...prev, newExercise]);
  }, [activeDay]);

  // Remove exercise from the selected list
  const removeExercise = useCallback((exerciseId: number) => {
    setSelectedExercises(prev => prev.filter(ex => ex.id !== exerciseId));
  }, []);

  // Update exercise details
  const updateExercise = useCallback((exerciseId: number, updatedData: Partial<ExerciseWithSets>) => {
    setSelectedExercises(prev => 
      prev.map(ex => ex.id === exerciseId ? { ...ex, ...updatedData } : ex)
    );
  }, []);

  // Update sets for an exercise
  const updateExerciseSets = useCallback((exerciseId: number, sets: number, reps: string) => {
    setSelectedExercises(prev => 
      prev.map(ex => ex.id === exerciseId ? { ...ex, sets, reps } : ex)
    );
  }, []);

  // Toggle exercise selection for each day
  const toggleExerciseDay1 = useCallback((id: number) => {
    setSelectedExercisesDay1(prev => 
      prev.includes(id) ? prev.filter(exId => exId !== id) : [...prev, id]
    );
  }, []);

  const toggleExerciseDay2 = useCallback((id: number) => {
    setSelectedExercisesDay2(prev => 
      prev.includes(id) ? prev.filter(exId => exId !== id) : [...prev, id]
    );
  }, []);

  const toggleExerciseDay3 = useCallback((id: number) => {
    setSelectedExercisesDay3(prev => 
      prev.includes(id) ? prev.filter(exId => exId !== id) : [...prev, id]
    );
  }, []);

  const toggleExerciseDay4 = useCallback((id: number) => {
    setSelectedExercisesDay4(prev => 
      prev.includes(id) ? prev.filter(exId => exId !== id) : [...prev, id]
    );
  }, []);

  // Set management for each day
  const handleSetsChangeDay1 = useCallback((exerciseId: number, sets: number) => {
    setExerciseSetsDay1(prev => ({ ...prev, [exerciseId]: sets }));
  }, []);

  const handleSetsChangeDay2 = useCallback((exerciseId: number, sets: number) => {
    setExerciseSetsDay2(prev => ({ ...prev, [exerciseId]: sets }));
  }, []);

  const handleSetsChangeDay3 = useCallback((exerciseId: number, sets: number) => {
    setExerciseSetsDay3(prev => ({ ...prev, [exerciseId]: sets }));
  }, []);

  const handleSetsChangeDay4 = useCallback((exerciseId: number, sets: number) => {
    setExerciseSetsDay4(prev => ({ ...prev, [exerciseId]: sets }));
  }, []);

  // Reps management for each day
  const handleRepsChangeDay1 = useCallback((exerciseId: number, reps: string) => {
    setExerciseRepsDay1(prev => ({ ...prev, [exerciseId]: reps }));
  }, []);

  const handleRepsChangeDay2 = useCallback((exerciseId: number, reps: string) => {
    setExerciseRepsDay2(prev => ({ ...prev, [exerciseId]: reps }));
  }, []);

  const handleRepsChangeDay3 = useCallback((exerciseId: number, reps: string) => {
    setExerciseRepsDay3(prev => ({ ...prev, [exerciseId]: reps }));
  }, []);

  const handleRepsChangeDay4 = useCallback((exerciseId: number, reps: string) => {
    setExerciseRepsDay4(prev => ({ ...prev, [exerciseId]: reps }));
  }, []);

  // Change active day
  const changeDay = useCallback((day: string) => {
    setActiveDay(day);
  }, []);

  // Check if exercise is already selected
  const isExerciseSelected = useCallback((exerciseId: number) => {
    return selectedExercises.some(ex => ex.id === exerciseId && Number(ex.day) === Number(activeDay));
  }, [selectedExercises, activeDay]);

  // Get exercise count for each day
  const getDayExercisesCount = useCallback((day: string) => {
    return selectedExercises.filter(ex => Number(ex.day) === Number(day)).length;
  }, [selectedExercises]);

  // Helper functions to get selected exercises with sets and reps information
  const getSelectedExercisesWithSetsDay1 = useCallback(() => {
    return selectedExercisesDay1.map(id => ({
      id,
      sets: exerciseSetsDay1[id] || 3,
      reps: exerciseRepsDay1[id] || "8-12",
      day: 1 // Explicitly set the day as a number
    }));
  }, [selectedExercisesDay1, exerciseSetsDay1, exerciseRepsDay1]);

  const getSelectedExercisesWithSetsDay2 = useCallback(() => {
    return selectedExercisesDay2.map(id => ({
      id,
      sets: exerciseSetsDay2[id] || 3,
      reps: exerciseRepsDay2[id] || "8-12",
      day: 2 // Explicitly set the day as a number
    }));
  }, [selectedExercisesDay2, exerciseSetsDay2, exerciseRepsDay2]);

  const getSelectedExercisesWithSetsDay3 = useCallback(() => {
    return selectedExercisesDay3.map(id => ({
      id,
      sets: exerciseSetsDay3[id] || 3,
      reps: exerciseRepsDay3[id] || "8-12",
      day: 3 // Explicitly set the day as a number
    }));
  }, [selectedExercisesDay3, exerciseSetsDay3, exerciseRepsDay3]);

  const getSelectedExercisesWithSetsDay4 = useCallback(() => {
    return selectedExercisesDay4.map(id => ({
      id,
      sets: exerciseSetsDay4[id] || 3,
      reps: exerciseRepsDay4[id] || "8-12",
      day: 4 // Explicitly set the day as a number
    }));
  }, [selectedExercisesDay4, exerciseSetsDay4, exerciseRepsDay4]);

  return {
    // Original exercise selection API
    selectedExercises,
    currentDayExercises,
    activeDay,
    addExercise,
    removeExercise,
    updateExercise,
    updateExerciseSets,
    changeDay,
    isExerciseSelected,
    getDayExercisesCount,
    
    // Day 1 
    selectedExercisesDay1,
    toggleExerciseDay1,
    exerciseSetsDay1,
    handleSetsChangeDay1,
    exerciseRepsDay1,
    handleRepsChangeDay1,
    
    // Day 2
    selectedExercisesDay2,
    toggleExerciseDay2,
    exerciseSetsDay2,
    handleSetsChangeDay2,
    exerciseRepsDay2,
    handleRepsChangeDay2,
    
    // Day 3
    selectedExercisesDay3,
    toggleExerciseDay3,
    exerciseSetsDay3,
    handleSetsChangeDay3,
    exerciseRepsDay3,
    handleRepsChangeDay3,
    
    // Day 4
    selectedExercisesDay4,
    toggleExerciseDay4,
    exerciseSetsDay4,
    handleSetsChangeDay4,
    exerciseRepsDay4,
    handleRepsChangeDay4,
    
    // Helper functions for getting exercises with sets and reps
    getSelectedExercisesWithSetsDay1,
    getSelectedExercisesWithSetsDay2,
    getSelectedExercisesWithSetsDay3,
    getSelectedExercisesWithSetsDay4
  };
};
