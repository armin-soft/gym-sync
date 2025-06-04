
import { useQuery } from "@tanstack/react-query";
import { Exercise, ExerciseCategory } from "@/types/exercise";

export const useExerciseData = () => {
  // Exercise Types Query
  const { data: exerciseTypes = [], isLoading: isTypesLoading } = useQuery({
    queryKey: ["exerciseTypes"],
    queryFn: () => {
      const stored = localStorage.getItem("exerciseTypes");
      return stored ? JSON.parse(stored) : ["قدرتی", "استقامتی", "انعطاف‌پذیری", "تعادلی"];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Categories Query
  const { data: categories = [], isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["exerciseCategories"],
    queryFn: () => {
      const stored = localStorage.getItem("exerciseCategories");
      return stored ? JSON.parse(stored) : [
        { id: 1, name: "سینه", type: "قدرتی" },
        { id: 2, name: "پشت", type: "قدرتی" },
        { id: 3, name: "پا", type: "قدرتی" },
        { id: 4, name: "بازو", type: "قدرتی" },
        { id: 5, name: "شانه", type: "قدرتی" },
        { id: 6, name: "شکم", type: "قدرتی" },
        { id: 7, name: "کاردیو", type: "استقامتی" },
        { id: 8, name: "کشش", type: "انعطاف‌پذیری" }
      ];
    },
    staleTime: 5 * 60 * 1000,
  });

  // Exercises Query
  const { data: exercises = [], isLoading: isExercisesLoading } = useQuery({
    queryKey: ["exercises"],
    queryFn: () => {
      const stored = localStorage.getItem("exercises");
      return stored ? JSON.parse(stored) : [
        { id: 1, name: "پرس سینه", categoryId: 1 },
        { id: 2, name: "کراس‌اور", categoryId: 1 },
        { id: 3, name: "پولاپ", categoryId: 2 },
        { id: 4, name: "حرکت T", categoryId: 2 },
        { id: 5, name: "اسکوات", categoryId: 3 },
        { id: 6, name: "لانگ", categoryId: 3 },
        { id: 7, name: "جلو بازو", categoryId: 4 },
        { id: 8, name: "پشت بازو", categoryId: 4 },
        { id: 9, name: "سرشانه", categoryId: 5 },
        { id: 10, name: "کرانچ", categoryId: 6 },
        { id: 11, name: "دو", categoryId: 7 },
        { id: 12, name: "کشش همسترینگ", categoryId: 8 }
      ];
    },
    staleTime: 5 * 60 * 1000,
  });

  return {
    exerciseTypes,
    categories,
    exercises,
    isLoading: isTypesLoading || isCategoriesLoading || isExercisesLoading,
  };
};
