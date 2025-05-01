
import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Exercise, ExerciseCategory } from "@/types/exercise";
import { useToast } from "@/hooks/use-toast";

/**
 * Hook to fetch and manage exercise data for the exercise dialog with enhanced UI/UX
 * Supports hierarchical selection: Exercise Type → Category → Exercises
 */
export const useExerciseDialogData = () => {
  const { toast } = useToast();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedExerciseIds, setSelectedExerciseIds] = useState<number[]>([]);
  
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

  // Set initial selected type when data loads
  useEffect(() => {
    if (exerciseTypes.length > 0 && !selectedType) {
      console.log("Setting initial exercise type:", exerciseTypes[0]);
      setSelectedType(exerciseTypes[0]);
    }
  }, [exerciseTypes, selectedType]);

  // Reset category selection when exercise type changes
  useEffect(() => {
    setSelectedCategoryId(null);
    setSelectedExerciseIds([]);
  }, [selectedType]);

  // Reset exercise selection when category changes
  useEffect(() => {
    setSelectedExerciseIds([]);
  }, [selectedCategoryId]);

  // Filter categories based on selected type
  const filteredCategories = useMemo(() => {
    if (!selectedType) return [];
    
    const filtered = categories.filter(cat => cat.type === selectedType);
    console.log(`Filtered categories for type '${selectedType}':`, filtered);
    return filtered;
  }, [categories, selectedType]);

  // Get filtered exercises based on selection and search
  const filteredExercises = useMemo(() => {
    // Must have an exercise type selected to proceed
    if (!selectedType) {
      console.log("No exercise type selected, returning empty array");
      return [];
    }
    
    // Must have a category selected if categories are available for the selected type
    if (filteredCategories.length > 0 && !selectedCategoryId) {
      console.log("Exercise type selected but no category selected, returning empty array");
      return [];
    }
    
    return exercises
      .filter(exercise => {
        // Filter by category if selected
        const matchesCategory = !selectedCategoryId || exercise.categoryId === selectedCategoryId;
        
        // Filter by search query if provided
        const matchesSearch = !searchQuery || 
          exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (exercise.description && exercise.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (exercise.targetMuscle && exercise.targetMuscle.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (exercise.equipment && exercise.equipment.toLowerCase().includes(searchQuery.toLowerCase()));
        
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortOrder === "asc") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
  }, [exercises, selectedType, selectedCategoryId, filteredCategories, searchQuery, sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === "asc" ? "desc" : "asc");
    console.log(`Sort order toggled to: ${sortOrder === "asc" ? "desc" : "asc"}`);
  };
  
  const toggleExerciseSelection = (exerciseId: number) => {
    setSelectedExerciseIds(prev => {
      if (prev.includes(exerciseId)) {
        return prev.filter(id => id !== exerciseId);
      } else {
        return [...prev, exerciseId];
      }
    });
  };
  
  const handleClearSearch = () => {
    setSearchQuery("");
  };

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
    isLoading,
    // Enhanced UI/UX features
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    sortOrder,
    toggleSortOrder,
    selectedExerciseIds,
    setSelectedExerciseIds,
    toggleExerciseSelection,
    handleClearSearch
  };
};

export default useExerciseDialogData;
