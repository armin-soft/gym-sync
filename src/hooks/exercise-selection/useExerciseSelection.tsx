
import { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { ExerciseWithSets } from './types';

export const useExerciseSelection = (initialExercises: ExerciseWithSets[] = []) => {
  const [selectedExercises, setSelectedExercises] = useState<ExerciseWithSets[]>(initialExercises);
  const [currentDayExercises, setCurrentDayExercises] = useState<ExerciseWithSets[]>([]);
  const [activeDay, setActiveDay] = useState<string>('saturday');

  // Initialize current day's exercises based on activeDay
  useEffect(() => {
    const dayExercises = selectedExercises.filter(ex => ex.day === activeDay);
    setCurrentDayExercises(dayExercises);
  }, [activeDay, selectedExercises]);

  // Add exercise to the selected list
  const addExercise = useCallback((exercise: ExerciseWithSets) => {
    const newExercise = {
      ...exercise,
      id: exercise.id || uuidv4(),
      day: activeDay,
    };

    setSelectedExercises(prev => [...prev, newExercise]);
  }, [activeDay]);

  // Remove exercise from the selected list
  const removeExercise = useCallback((exerciseId: string) => {
    setSelectedExercises(prev => prev.filter(ex => ex.id !== exerciseId));
  }, []);

  // Update exercise details
  const updateExercise = useCallback((exerciseId: string, updatedData: Partial<ExerciseWithSets>) => {
    setSelectedExercises(prev => 
      prev.map(ex => ex.id === exerciseId ? { ...ex, ...updatedData } : ex)
    );
  }, []);

  // Update sets for an exercise
  const updateExerciseSets = useCallback((exerciseId: string, sets: number, reps: number) => {
    setSelectedExercises(prev => 
      prev.map(ex => ex.id === exerciseId ? { ...ex, sets, reps } : ex)
    );
  }, []);

  // Change active day
  const changeDay = useCallback((day: string) => {
    setActiveDay(day);
  }, []);

  // Check if exercise is already selected
  const isExerciseSelected = useCallback((exerciseId: string) => {
    return selectedExercises.some(ex => ex.id === exerciseId && ex.day === activeDay);
  }, [selectedExercises, activeDay]);

  // Get exercise count for each day
  const getDayExercisesCount = useCallback((day: string) => {
    return selectedExercises.filter(ex => ex.day === day).length;
  }, [selectedExercises]);

  return {
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
  };
};
