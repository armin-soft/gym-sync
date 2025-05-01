
import { useQuery } from "@tanstack/react-query";
import { Exercise, ExerciseCategory } from "@/types/exercise";
import { useToast } from "@/hooks/use-toast";

/**
 * Hook to fetch exercises data from localStorage
 */
export const useExerciseData = () => {
  const { toast } = useToast();

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
