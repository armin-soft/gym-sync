
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Exercise, ExerciseCategory, defaultExercises, defaultCategories, defaultExerciseTypes } from "@/types/exercise";

/**
 * Hook to fetch and manage exercise data for the exercise dialog
 */
export const useExerciseDialogData = () => {
  // Get exercises data
  const { data: exercises = [], isLoading: exercisesLoading } = useQuery({
    queryKey: ["exercises"],
    queryFn: () => {
      const exercisesData = localStorage.getItem("exercises");
      // اگر داده‌ای در localStorage نبود، از داده‌های پیش‌فرض استفاده کن
      if (!exercisesData || exercisesData === "[]") {
        // ذخیره داده‌های پیش‌فرض در localStorage
        localStorage.setItem("exercises", JSON.stringify(defaultExercises));
        return defaultExercises;
      }
      return JSON.parse(exercisesData);
    },
  });

  // Get categories data
  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ["exerciseCategories"],
    queryFn: () => {
      const categoriesData = localStorage.getItem("exerciseCategories");
      // اگر داده‌ای در localStorage نبود، از داده‌های پیش‌فرض استفاده کن
      if (!categoriesData || categoriesData === "[]") {
        // ذخیره داده‌های پیش‌فرض در localStorage
        localStorage.setItem("exerciseCategories", JSON.stringify(defaultCategories));
        return defaultCategories;
      }
      return JSON.parse(categoriesData);
    },
  });

  // Get exercise types data
  const { data: exerciseTypes = [], isLoading: typesLoading } = useQuery({
    queryKey: ["exerciseTypes"],
    queryFn: () => {
      const typesData = localStorage.getItem("exerciseTypes");
      // اگر داده‌ای در localStorage نبود، از داده‌های پیش‌فرض استفاده کن
      if (!typesData || typesData === "[]") {
        // ذخیره داده‌های پیش‌فرض در localStorage
        localStorage.setItem("exerciseTypes", JSON.stringify(defaultExerciseTypes));
        return defaultExerciseTypes;
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
