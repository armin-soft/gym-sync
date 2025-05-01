
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Exercise, ExerciseCategory } from "@/types/exercise";

/**
 * Hook to fetch and manage exercise data for the exercise dialog
 */
export const useExerciseDialogData = () => {
  // Get exercises data
  const { data: exercises = [], isLoading: exercisesLoading } = useQuery({
    queryKey: ["exercises"],
    queryFn: () => {
      const exercisesData = localStorage.getItem("exercises");
      if (!exercisesData) {
        return [];
      }
      return JSON.parse(exercisesData);
    },
  });

  // Get categories data
  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ["exerciseCategories"],
    queryFn: () => {
      const categoriesData = localStorage.getItem("exerciseCategories");
      if (!categoriesData) {
        return [];
      }
      return JSON.parse(categoriesData);
    },
  });

  // Get exercise types data
  const { data: exerciseTypes = [], isLoading: typesLoading } = useQuery({
    queryKey: ["exerciseTypes"],
    queryFn: () => {
      const typesData = localStorage.getItem("exerciseTypes");
      if (!typesData) {
        return [];
      }
      return JSON.parse(typesData);
    },
  });

  const isLoading = exercisesLoading || categoriesLoading || typesLoading;

  return {
    exercises,
    categories,
    exerciseTypes,
    isLoading
  };
};

export default useExerciseDialogData;
