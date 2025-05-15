
import { useState, useCallback } from "react";
import { ExerciseWithSets } from "./types";

interface UseExerciseSelectionProps {
  initialExercises?: number[];
  initialExercisesDay1?: number[];
  initialExercisesDay2?: number[];
  initialExercisesDay3?: number[];
  initialExercisesDay4?: number[];
}

export const useExerciseSelection = ({
  initialExercises = [],
  initialExercisesDay1 = [],
  initialExercisesDay2 = [],
  initialExercisesDay3 = [],
  initialExercisesDay4 = []
}: UseExerciseSelectionProps) => {
  // State for selected exercises for each day
  const [selectedExercisesDay1, setSelectedExercisesDay1] = useState<number[]>(initialExercisesDay1);
  const [selectedExercisesDay2, setSelectedExercisesDay2] = useState<number[]>(initialExercisesDay2);
  const [selectedExercisesDay3, setSelectedExercisesDay3] = useState<number[]>(initialExercisesDay3);
  const [selectedExercisesDay4, setSelectedExercisesDay4] = useState<number[]>(initialExercisesDay4);
  
  // State for sets for each day
  const [exerciseSetsDay1, setExerciseSetsDay1] = useState<Record<number, number>>({});
  const [exerciseSetsDay2, setExerciseSetsDay2] = useState<Record<number, number>>({});
  const [exerciseSetsDay3, setExerciseSetsDay3] = useState<Record<number, number>>({});
  const [exerciseSetsDay4, setExerciseSetsDay4] = useState<Record<number, number>>({});
  
  // State for reps for each day
  const [exerciseRepsDay1, setExerciseRepsDay1] = useState<Record<number, string>>({});
  const [exerciseRepsDay2, setExerciseRepsDay2] = useState<Record<number, string>>({});
  const [exerciseRepsDay3, setExerciseRepsDay3] = useState<Record<number, string>>({});
  const [exerciseRepsDay4, setExerciseRepsDay4] = useState<Record<number, string>>({});
  
  // Toggle exercise selection for each day
  const toggleExerciseDay1 = useCallback((id: number) => {
    setSelectedExercisesDay1(prev => 
      prev.includes(id) 
        ? prev.filter(exerciseId => exerciseId !== id) 
        : [...prev, id]
    );
    
    // Initialize sets to default value (3) when adding
    setExerciseSetsDay1(prev => {
      if (!prev[id]) {
        return { ...prev, [id]: 3 };
      }
      return prev;
    });
    
    // Initialize reps to default value when adding
    setExerciseRepsDay1(prev => {
      if (!prev[id]) {
        return { ...prev, [id]: "10" };
      }
      return prev;
    });
  }, []);
  
  const toggleExerciseDay2 = useCallback((id: number) => {
    setSelectedExercisesDay2(prev => 
      prev.includes(id) 
        ? prev.filter(exerciseId => exerciseId !== id) 
        : [...prev, id]
    );
    
    setExerciseSetsDay2(prev => {
      if (!prev[id]) {
        return { ...prev, [id]: 3 };
      }
      return prev;
    });
    
    setExerciseRepsDay2(prev => {
      if (!prev[id]) {
        return { ...prev, [id]: "10" };
      }
      return prev;
    });
  }, []);
  
  const toggleExerciseDay3 = useCallback((id: number) => {
    setSelectedExercisesDay3(prev => 
      prev.includes(id) 
        ? prev.filter(exerciseId => exerciseId !== id) 
        : [...prev, id]
    );
    
    setExerciseSetsDay3(prev => {
      if (!prev[id]) {
        return { ...prev, [id]: 3 };
      }
      return prev;
    });
    
    setExerciseRepsDay3(prev => {
      if (!prev[id]) {
        return { ...prev, [id]: "10" };
      }
      return prev;
    });
  }, []);
  
  const toggleExerciseDay4 = useCallback((id: number) => {
    setSelectedExercisesDay4(prev => 
      prev.includes(id) 
        ? prev.filter(exerciseId => exerciseId !== id) 
        : [...prev, id]
    );
    
    setExerciseSetsDay4(prev => {
      if (!prev[id]) {
        return { ...prev, [id]: 3 };
      }
      return prev;
    });
    
    setExerciseRepsDay4(prev => {
      if (!prev[id]) {
        return { ...prev, [id]: "10" };
      }
      return prev;
    });
  }, []);
  
  // Handle sets change for each day
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
  
  // Handle reps change for each day
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
  
  // Get selected exercises with sets and reps for each day
  const getSelectedExercisesWithSetsDay1 = useCallback(() => {
    return selectedExercisesDay1.map(id => ({
      id,
      sets: exerciseSetsDay1[id] || 3,
      reps: exerciseRepsDay1[id] || "10"
    }));
  }, [selectedExercisesDay1, exerciseSetsDay1, exerciseRepsDay1]);
  
  const getSelectedExercisesWithSetsDay2 = useCallback(() => {
    return selectedExercisesDay2.map(id => ({
      id,
      sets: exerciseSetsDay2[id] || 3,
      reps: exerciseRepsDay2[id] || "10"
    }));
  }, [selectedExercisesDay2, exerciseSetsDay2, exerciseRepsDay2]);
  
  const getSelectedExercisesWithSetsDay3 = useCallback(() => {
    return selectedExercisesDay3.map(id => ({
      id,
      sets: exerciseSetsDay3[id] || 3,
      reps: exerciseRepsDay3[id] || "10"
    }));
  }, [selectedExercisesDay3, exerciseSetsDay3, exerciseRepsDay3]);
  
  const getSelectedExercisesWithSetsDay4 = useCallback(() => {
    return selectedExercisesDay4.map(id => ({
      id,
      sets: exerciseSetsDay4[id] || 3,
      reps: exerciseRepsDay4[id] || "10"
    }));
  }, [selectedExercisesDay4, exerciseSetsDay4, exerciseRepsDay4]);
  
  return {
    // Day 1
    selectedExercisesDay1,
    toggleExerciseDay1,
    exerciseSetsDay1,
    handleSetsChangeDay1,
    exerciseRepsDay1,
    handleRepsChangeDay1,
    getSelectedExercisesWithSetsDay1,
    
    // Day 2
    selectedExercisesDay2,
    toggleExerciseDay2,
    exerciseSetsDay2,
    handleSetsChangeDay2,
    exerciseRepsDay2,
    handleRepsChangeDay2,
    getSelectedExercisesWithSetsDay2,
    
    // Day 3
    selectedExercisesDay3,
    toggleExerciseDay3,
    exerciseSetsDay3,
    handleSetsChangeDay3,
    exerciseRepsDay3,
    handleRepsChangeDay3,
    getSelectedExercisesWithSetsDay3,
    
    // Day 4
    selectedExercisesDay4,
    toggleExerciseDay4,
    exerciseSetsDay4,
    handleSetsChangeDay4,
    exerciseRepsDay4,
    handleRepsChangeDay4,
    getSelectedExercisesWithSetsDay4
  };
};
