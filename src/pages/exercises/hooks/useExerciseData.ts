
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

export const useExerciseData = () => {
  // Get exercises from localStorage
  const { data: exercises = [] } = useQuery({
    queryKey: ['exercises'],
    queryFn: () => {
      const stored = localStorage.getItem('exercises');
      return stored ? JSON.parse(stored) : [];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Get categories from localStorage  
  const { data: categories = [] } = useQuery({
    queryKey: ['exerciseCategories'],
    queryFn: () => {
      const stored = localStorage.getItem('exerciseCategories');
      return stored ? JSON.parse(stored) : [];
    },
    staleTime: 1000 * 60 * 5,
  });

  // Get exercise types from localStorage
  const { data: exerciseTypes = [] } = useQuery({
    queryKey: ['exerciseTypes'],
    queryFn: () => {
      const stored = localStorage.getItem('exerciseTypes');
      return stored ? JSON.parse(stored) : [];
    },
    staleTime: 1000 * 60 * 5,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  return {
    exercises,
    categories,
    exerciseTypes,
    isLoading
  };
};
