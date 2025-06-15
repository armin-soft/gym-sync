
import { useQuery } from "@tanstack/react-query";
import { Exercise, ExerciseCategory } from "@/types/exercise";
import { useToast } from "@/hooks/use-toast";
import { getLocalStorageItem } from "@/utils/localStorage";

/**
 * Hook to fetch exercises data from localStorage without automatic refresh
 */
export const useExerciseData = () => {
  const { toast } = useToast();

  // Get exercises data - no automatic refresh
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
    staleTime: Infinity, // Never consider data stale
    refetchOnWindowFocus: false,
    refetchOnMount: false
  });

  // Get categories data - no automatic refresh
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
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  });

  // Get exercise types data - no automatic refresh
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
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false
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
