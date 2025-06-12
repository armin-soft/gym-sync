
import { useState, useEffect } from "react";
import { ExerciseWithSets } from "@/hooks/exercise-selection";
import { useExerciseData } from "@/hooks/exercises/useExerciseData";

interface UseStudentExerciseDialogStateProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
  onSave: (exercisesWithSets: ExerciseWithSets[], dayNumber?: number) => boolean;
  initialExercises?: number[];
  initialExercisesDay1?: number[];
  initialExercisesDay2?: number[];
  initialExercisesDay3?: number[];
  initialExercisesDay4?: number[];
  initialExercisesDay5?: number[];
}

export const useStudentExerciseDialogState = ({
  open,
  onOpenChange,
  studentName,
  onSave,
  initialExercises = [],
  initialExercisesDay1 = [],
  initialExercisesDay2 = [],
  initialExercisesDay3 = [],
  initialExercisesDay4 = [],
  initialExercisesDay5 = []
}: UseStudentExerciseDialogStateProps) => {
  const { exercises, categories, exerciseTypes, isLoading } = useExerciseData();
  
  const [activeTab, setActiveTab] = useState("day1");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedExerciseType, setSelectedExerciseType] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Exercise selections for each day
  const [selectedExercisesDay1, setSelectedExercisesDay1] = useState<number[]>(initialExercisesDay1);
  const [selectedExercisesDay2, setSelectedExercisesDay2] = useState<number[]>(initialExercisesDay2);
  const [selectedExercisesDay3, setSelectedExercisesDay3] = useState<number[]>(initialExercisesDay3);
  const [selectedExercisesDay4, setSelectedExercisesDay4] = useState<number[]>(initialExercisesDay4);
  const [selectedExercisesDay5, setSelectedExercisesDay5] = useState<number[]>(initialExercisesDay5);

  // Exercise sets for each day
  const [exerciseSetsDay1, setExerciseSetsDay1] = useState<Record<number, number>>({});
  const [exerciseSetsDay2, setExerciseSetsDay2] = useState<Record<number, number>>({});
  const [exerciseSetsDay3, setExerciseSetsDay3] = useState<Record<number, number>>({});
  const [exerciseSetsDay4, setExerciseSetsDay4] = useState<Record<number, number>>({});
  const [exerciseSetsDay5, setExerciseSetsDay5] = useState<Record<number, number>>({});

  // Exercise reps for each day
  const [exerciseRepsDay1, setExerciseRepsDay1] = useState<Record<number, string>>({});
  const [exerciseRepsDay2, setExerciseRepsDay2] = useState<Record<number, string>>({});
  const [exerciseRepsDay3, setExerciseRepsDay3] = useState<Record<number, string>>({});
  const [exerciseRepsDay4, setExerciseRepsDay4] = useState<Record<number, string>>({});
  const [exerciseRepsDay5, setExerciseRepsDay5] = useState<Record<number, string>>({});

  // Filtered data
  const filteredCategories = categories.filter(category =>
    selectedExerciseType === "" || category.exerciseType === selectedExerciseType
  );

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategoryId === null || exercise.categoryId === selectedCategoryId;
    const matchesType = selectedExerciseType === "" || 
      categories.find(cat => cat.id === exercise.categoryId)?.exerciseType === selectedExerciseType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  // Handlers
  const toggleSortOrder = () => {
    setSortOrder(prev => prev === "asc" ? "desc" : "asc");
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSelectedCategoryId(null);
    setSelectedExerciseType("");
  };

  const toggleExerciseDay1 = (id: number) => {
    setSelectedExercisesDay1(prev =>
      prev.includes(id) ? prev.filter(exerciseId => exerciseId !== id) : [...prev, id]
    );
  };

  const toggleExerciseDay2 = (id: number) => {
    setSelectedExercisesDay2(prev =>
      prev.includes(id) ? prev.filter(exerciseId => exerciseId !== id) : [...prev, id]
    );
  };

  const toggleExerciseDay3 = (id: number) => {
    setSelectedExercisesDay3(prev =>
      prev.includes(id) ? prev.filter(exerciseId => exerciseId !== id) : [...prev, id]
    );
  };

  const toggleExerciseDay4 = (id: number) => {
    setSelectedExercisesDay4(prev =>
      prev.includes(id) ? prev.filter(exerciseId => exerciseId !== id) : [...prev, id]
    );
  };

  const toggleExerciseDay5 = (id: number) => {
    setSelectedExercisesDay5(prev =>
      prev.includes(id) ? prev.filter(exerciseId => exerciseId !== id) : [...prev, id]
    );
  };

  const handleSetsChangeDay1 = (exerciseId: number, sets: number) => {
    setExerciseSetsDay1(prev => ({ ...prev, [exerciseId]: sets }));
  };

  const handleSetsChangeDay2 = (exerciseId: number, sets: number) => {
    setExerciseSetsDay2(prev => ({ ...prev, [exerciseId]: sets }));
  };

  const handleSetsChangeDay3 = (exerciseId: number, sets: number) => {
    setExerciseSetsDay3(prev => ({ ...prev, [exerciseId]: sets }));
  };

  const handleSetsChangeDay4 = (exerciseId: number, sets: number) => {
    setExerciseSetsDay4(prev => ({ ...prev, [exerciseId]: sets }));
  };

  const handleSetsChangeDay5 = (exerciseId: number, sets: number) => {
    setExerciseSetsDay5(prev => ({ ...prev, [exerciseId]: sets }));
  };

  const handleRepsChangeDay1 = (exerciseId: number, reps: string) => {
    setExerciseRepsDay1(prev => ({ ...prev, [exerciseId]: reps }));
  };

  const handleRepsChangeDay2 = (exerciseId: number, reps: string) => {
    setExerciseRepsDay2(prev => ({ ...prev, [exerciseId]: reps }));
  };

  const handleRepsChangeDay3 = (exerciseId: number, reps: string) => {
    setExerciseRepsDay3(prev => ({ ...prev, [exerciseId]: reps }));
  };

  const handleRepsChangeDay4 = (exerciseId: number, reps: string) => {
    setExerciseRepsDay4(prev => ({ ...prev, [exerciseId]: reps }));
  };

  const handleRepsChangeDay5 = (exerciseId: number, reps: string) => {
    setExerciseRepsDay5(prev => ({ ...prev, [exerciseId]: reps }));
  };

  const getActiveTabSelectedExercises = () => {
    switch (activeTab) {
      case "day1": return selectedExercisesDay1;
      case "day2": return selectedExercisesDay2;
      case "day3": return selectedExercisesDay3;
      case "day4": return selectedExercisesDay4;
      case "day5": return selectedExercisesDay5;
      default: return [];
    }
  };

  const getActiveTabSelectedExercisesWithSets = (): ExerciseWithSets[] => {
    const selectedExercises = getActiveTabSelectedExercises();
    const sets = activeTab === "day1" ? exerciseSetsDay1 :
                activeTab === "day2" ? exerciseSetsDay2 :
                activeTab === "day3" ? exerciseSetsDay3 :
                activeTab === "day4" ? exerciseSetsDay4 :
                exerciseSetsDay5;
    const reps = activeTab === "day1" ? exerciseRepsDay1 :
                activeTab === "day2" ? exerciseRepsDay2 :
                activeTab === "day3" ? exerciseRepsDay3 :
                activeTab === "day4" ? exerciseRepsDay4 :
                exerciseRepsDay5;

    return selectedExercises.map(exerciseId => ({
      exerciseId,
      sets: sets[exerciseId] || 3,
      reps: reps[exerciseId] || "10"
    }));
  };

  const handleSave = () => {
    const exercisesWithSets = getActiveTabSelectedExercisesWithSets();
    const dayNumber = parseInt(activeTab.replace("day", ""));
    return onSave(exercisesWithSets, dayNumber);
  };

  const handleSaveAndContinue = () => {
    const success = handleSave();
    if (success && activeTab !== "day5") {
      const nextDay = parseInt(activeTab.replace("day", "")) + 1;
      setActiveTab(`day${nextDay}`);
    }
    return success;
  };

  const handleSaveDay = (exercisesWithSets: ExerciseWithSets[], onSaveCallback: (exercisesWithSets: ExerciseWithSets[], dayNumber?: number) => boolean, dayNumber: number) => {
    return onSaveCallback(exercisesWithSets, dayNumber);
  };

  return {
    isLoading,
    exercises,
    categories,
    exerciseTypes,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    selectedCategoryId,
    setSelectedCategoryId,
    selectedExerciseType,
    setSelectedExerciseType,
    sortOrder,
    toggleSortOrder,
    viewMode,
    setViewMode,
    filteredExercises,
    filteredCategories,
    handleClearSearch,
    selectedExercisesDay1,
    selectedExercisesDay2,
    selectedExercisesDay3,
    selectedExercisesDay4,
    selectedExercisesDay5,
    toggleExerciseDay1,
    toggleExerciseDay2,
    toggleExerciseDay3,
    toggleExerciseDay4,
    toggleExerciseDay5,
    exerciseSetsDay1,
    exerciseSetsDay2,
    exerciseSetsDay3,
    exerciseSetsDay4,
    exerciseSetsDay5,
    handleSetsChangeDay1,
    handleSetsChangeDay2,
    handleSetsChangeDay3,
    handleSetsChangeDay4,
    handleSetsChangeDay5,
    exerciseRepsDay1,
    exerciseRepsDay2,
    exerciseRepsDay3,
    exerciseRepsDay4,
    exerciseRepsDay5,
    handleRepsChangeDay1,
    handleRepsChangeDay2,
    handleRepsChangeDay3,
    handleRepsChangeDay4,
    handleRepsChangeDay5,
    getActiveTabSelectedExercises,
    getActiveTabSelectedExercisesWithSets,
    handleSave,
    handleSaveAndContinue,
    handleSaveDay
  };
};
