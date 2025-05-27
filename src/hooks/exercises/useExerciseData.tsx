
import { useQuery } from "@tanstack/react-query";
import { Exercise, ExerciseCategory } from "@/types/exercise";
import { useToast } from "@/hooks/use-toast";
import { safeJSONParse } from "@/utils/database";

/**
 * Hook to fetch exercises data from localStorage with improved performance
 */
export const useExerciseData = () => {
  const { toast } = useToast();

  // Initialize sample data if not exists
  const initializeSampleData = () => {
    // Exercise Types
    const existingTypes = localStorage.getItem("exerciseTypes");
    if (!existingTypes) {
      const sampleTypes = ["قدرتی", "کاردیو", "انعطاف‌پذیری", "تعادل", "ورزشی"];
      localStorage.setItem("exerciseTypes", JSON.stringify(sampleTypes));
    }

    // Exercise Categories
    const existingCategories = localStorage.getItem("exerciseCategories");
    if (!existingCategories) {
      const sampleCategories: ExerciseCategory[] = [
        { id: 1, name: "سینه", type: "قدرتی", description: "تمرینات عضلات سینه" },
        { id: 2, name: "پشت", type: "قدرتی", description: "تمرینات عضلات پشت" },
        { id: 3, name: "پا", type: "قدرتی", description: "تمرینات عضلات پا" },
        { id: 4, name: "بازو", type: "قدرتی", description: "تمرینات عضلات بازو" },
        { id: 5, name: "شکم", type: "قدرتی", description: "تمرینات عضلات شکم" },
        { id: 6, name: "دویدن", type: "کاردیو", description: "تمرینات دویدن" },
        { id: 7, name: "دوچرخه", type: "کاردیو", description: "تمرینات دوچرخه‌سواری" },
        { id: 8, name: "کشش", type: "انعطاف‌پذیری", description: "تمرینات کشش" },
      ];
      localStorage.setItem("exerciseCategories", JSON.stringify(sampleCategories));
    }

    // Sample Exercises
    const existingExercises = localStorage.getItem("exercises");
    if (!existingExercises) {
      const sampleExercises: Exercise[] = [
        { id: 1, name: "پرس سینه", categoryId: 1, description: "تمرین پرس سینه با دمبل", targetMuscle: "سینه" },
        { id: 2, name: "فلای سینه", categoryId: 1, description: "تمرین فلای سینه", targetMuscle: "سینه" },
        { id: 3, name: "حرکت کشیدن", categoryId: 2, description: "تمرین کشیدن برای پشت", targetMuscle: "پشت" },
        { id: 4, name: "اسکات", categoryId: 3, description: "تمرین اسکات", targetMuscle: "پا" },
        { id: 5, name: "جلو بازو", categoryId: 4, description: "تمرین جلو بازو", targetMuscle: "بایسپس" },
        { id: 6, name: "دویدن روی تردمیل", categoryId: 6, description: "دویدن با سرعت متوسط", targetMuscle: "کل بدن" },
      ];
      localStorage.setItem("exercises", JSON.stringify(sampleExercises));
    }
  };

  // Get exercises data
  const { data: exercises = [], isLoading: exercisesLoading } = useQuery({
    queryKey: ["exercises"],
    queryFn: () => {
      try {
        console.log("Loading exercises from localStorage");
        initializeSampleData(); // Initialize sample data first
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
        initializeSampleData(); // Initialize sample data first
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
        initializeSampleData(); // Initialize sample data first
        return safeJSONParse<string[]>("exerciseTypes", []);
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
