
import { useQuery } from "@tanstack/react-query";
import { Exercise, ExerciseCategory } from "@/types/exercise";
import { useToast } from "@/hooks/use-toast";
import { getLocalStorageItem } from "@/utils/localStorage";
import { useDataRefresh } from "@/hooks/useDataRefresh";

/**
 * Hook to fetch exercises data from localStorage with automatic refresh
 */
export const useExerciseData = () => {
  const { toast } = useToast();

  // Setup automatic refresh for exercise-related data
  useDataRefresh({
    keys: ['exercises', 'exerciseCategories', 'exerciseTypes'],
    interval: 10000, // Refresh every 10 seconds
    onStorageChange: true
  });

  // Get exercises data
  const { data: exercises = [], isLoading: exercisesLoading, error: exercisesError } = useQuery({
    queryKey: ["exercises"],
    queryFn: () => {
      try {
        console.log("Loading exercises from localStorage");
        return getLocalStorageItem<Exercise[]>("exercises", []);
      } catch (error) {
        console.error("Error loading exercises:", error);
        toast({
          variant: "destructive", 
          title: "خطا در بارگیری", 
          description: "اطلاعات تمرین‌ها بارگیری نشد"
        });
        return [];
      }
    },
    staleTime: 5000, // Consider data stale after 5 seconds
    refetchOnWindowFocus: true,
    refetchOnMount: true
  });

  // Get categories data
  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ["exerciseCategories"],
    queryFn: () => {
      try {
        console.log("Loading categories from localStorage");
        return getLocalStorageItem<ExerciseCategory[]>("exerciseCategories", []);
      } catch (error) {
        console.error("Error loading categories:", error);
        toast({
          variant: "destructive", 
          title: "خطا در بارگیری", 
          description: "اطلاعات دسته‌بندی‌ها بارگیری نشد"
        });
        return [];
      }
    },
    staleTime: 5000,
    refetchOnWindowFocus: true,
    refetchOnMount: true
  });

  // Get exercise types data
  const { data: exerciseTypes = [], isLoading: typesLoading } = useQuery({
    queryKey: ["exerciseTypes"],
    queryFn: () => {
      try {
        console.log("Loading exercise types from localStorage");
        return getLocalStorageItem<any[]>("exerciseTypes", []);
      } catch (error) {
        console.error("Error loading exercise types:", error);
        toast({
          variant: "destructive", 
          title: "خطا در بارگیری", 
          description: "اطلاعات انواع تمرین بارگیری نشد"
        });
        return [];
      }
    },
    staleTime: 5000,
    refetchOnWindowFocus: true,
    refetchOnMount: true
  });

  const isLoading = exercisesLoading || categoriesLoading || typesLoading;

  return {
    exercises,
    categories,
    exerciseTypes,
    isLoading,
    exercisesError
  };
};
