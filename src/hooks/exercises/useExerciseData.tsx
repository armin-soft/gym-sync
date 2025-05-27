
import { useQuery } from "@tanstack/react-query";
import { Exercise, ExerciseCategory } from "@/types/exercise";
import { useToast } from "@/hooks/use-toast";
import { safeJSONParse } from "@/utils/database";

/**
 * Hook to fetch exercises data from localStorage with improved performance
 */
export const useExerciseData = () => {
  const { toast } = useToast();

  // Get exercises data
  const { data: exercises = [], isLoading: exercisesLoading } = useQuery({
    queryKey: ["exercises"],
    queryFn: () => {
      try {
        console.log("Loading exercises from localStorage");
        return safeJSONParse<Exercise[]>("exercises", []);
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
  });

  // Get categories data
  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ["exerciseCategories"],
    queryFn: () => {
      try {
        console.log("Loading categories from localStorage");
        return safeJSONParse<ExerciseCategory[]>("exerciseCategories", []);
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
  });

  // Get exercise types data
  const { data: exerciseTypes = [], isLoading: typesLoading } = useQuery({
    queryKey: ["exerciseTypes"],
    queryFn: () => {
      try {
        console.log("Loading exercise types from localStorage");
        return safeJSONParse<any[]>("exerciseTypes", []);
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
  });

  const isLoading = exercisesLoading || categoriesLoading || typesLoading;

  return {
    exercises,
    categories,
    exerciseTypes,
    isLoading
  };
};
