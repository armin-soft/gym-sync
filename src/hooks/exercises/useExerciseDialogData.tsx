
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Exercise, ExerciseCategory } from "@/types/exercise";

/**
 * Hook to fetch and manage exercise data for the exercise dialog
 */
export const useExerciseDialogData = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  
  // Get exercises data
  const { data: exercises = [], isLoading: exercisesLoading } = useQuery({
    queryKey: ["exercises"],
    queryFn: () => {
      try {
        console.log("Loading exercises from localStorage");
        const exercisesData = localStorage.getItem("exercises");
        if (!exercisesData) {
          console.log("No exercises data found in localStorage");
          return [];
        }
        const parsedData = JSON.parse(exercisesData);
        console.log("Loaded exercises:", parsedData);
        return parsedData;
      } catch (error) {
        console.error("Error loading exercises:", error);
        return [];
      }
    },
  });

  // Get categories data
  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ["exerciseCategories"],
    queryFn: () => {
      try {
        console.log("Loading categories from localStorage");
        const categoriesData = localStorage.getItem("exerciseCategories");
        if (!categoriesData) {
          console.log("No categories data found in localStorage");
          return [];
        }
        const parsedData = JSON.parse(categoriesData);
        console.log("Loaded categories:", parsedData);
        return parsedData;
      } catch (error) {
        console.error("Error loading categories:", error);
        return [];
      }
    },
  });

  // Get exercise types data
  const { data: exerciseTypes = [], isLoading: typesLoading } = useQuery({
    queryKey: ["exerciseTypes"],
    queryFn: () => {
      try {
        console.log("Loading exercise types from localStorage");
        const typesData = localStorage.getItem("exerciseTypes");
        if (!typesData) {
          console.log("No exercise types data found in localStorage");
          return [];
        }
        const parsedData = JSON.parse(typesData);
        console.log("Loaded exercise types:", parsedData);
        return parsedData;
      } catch (error) {
        console.error("Error loading exercise types:", error);
        return [];
      }
    },
  });

  // Set initial selected type when data loads
  useEffect(() => {
    if (exerciseTypes.length > 0 && !selectedType) {
      setSelectedType(exerciseTypes[0]);
    }
  }, [exerciseTypes, selectedType]);

  // Reset category selection when exercise type changes
  useEffect(() => {
    setSelectedCategoryId(null);
  }, [selectedType]);

  // Filter categories based on selected type
  const filteredCategories = selectedType 
    ? categories.filter(cat => cat.type === selectedType)
    : [];

  // Get filtered exercises based on selection
  const filteredExercises = useMemo(() => {
    if (!selectedType) return [];
    if (filteredCategories.length > 0 && !selectedCategoryId) return [];
    
    return exercises.filter(exercise => {
      const matchesCategory = !selectedCategoryId || exercise.categoryId === selectedCategoryId;
      return matchesCategory;
    });
  }, [exercises, selectedType, selectedCategoryId, filteredCategories]);

  const isLoading = exercisesLoading || categoriesLoading || typesLoading;

  return {
    exercises,
    categories,
    exerciseTypes,
    selectedType,
    setSelectedType,
    selectedCategoryId,
    setSelectedCategoryId,
    filteredCategories,
    filteredExercises,
    isLoading
  };
};

export default useExerciseDialogData;
