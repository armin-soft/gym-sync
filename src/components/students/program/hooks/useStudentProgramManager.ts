
import { useState, useEffect } from "react";
import { Student } from "@/components/students/StudentTypes";
import { ExerciseWithSets } from "@/types/exercise";
import { useToast } from "@/hooks/use-toast";

interface UseStudentProgramManagerProps {
  student: Student;
  onSaveExercises: (exercisesWithSets: ExerciseWithSets[], dayNumber?: number) => boolean;
  onSaveDiet: (mealIds: number[], dayNumber?: number) => boolean;
  onSaveSupplements: (data: {supplements: number[], vitamins: number[], day?: number}, studentId: number) => boolean;
}

export function useStudentProgramManager({
  student,
  onSaveExercises,
  onSaveDiet,
  onSaveSupplements
}: UseStudentProgramManagerProps) {
  const [activeTab, setActiveTab] = useState("exercise");
  const { toast } = useToast();

  // Exercise state
  const [selectedExercises, setSelectedExercises] = useState<ExerciseWithSets[]>([]);
  const [currentDay, setCurrentDay] = useState<number>(1);
  
  // Diet state
  const [selectedMeals, setSelectedMeals] = useState<number[]>([]);
  const [currentDietDay, setCurrentDietDay] = useState<number>(1);
  
  // Supplement state
  const [selectedSupplements, setSelectedSupplements] = useState<number[]>([]);
  const [selectedVitamins, setSelectedVitamins] = useState<number[]>([]);
  const [currentSupplementDay, setCurrentSupplementDay] = useState<number>(1);

  // Load initial data for the student
  useEffect(() => {
    if (!student) return;
    
    // Find all available day properties in the student object
    const dayProperties = Object.keys(student).filter(key => key.startsWith('exercisesDay'));
    
    // If there are no day properties, default to empty
    if (dayProperties.length === 0) {
      setSelectedExercises([]);
    } else {
      // If current day data exists, load it
      const dayKey = `exercisesDay${currentDay}`;
      const setsKey = `exerciseSetsDay${currentDay}`;
      const repsKey = `exerciseRepsDay${currentDay}`;
      
      if (student[dayKey]) {
        const loadedExercises: ExerciseWithSets[] = student[dayKey].map(id => ({
          id,
          sets: student[setsKey]?.[id] || 3,
          reps: student[repsKey]?.[id] || "12",
          day: currentDay
        }));
        setSelectedExercises(loadedExercises);
      } else {
        // Current day has no exercises
        setSelectedExercises([]);
      }
    }
    
    // Load meals for current diet day
    const dietDayKey = `mealsDay${currentDietDay}`;
    if (student[dietDayKey]) {
      setSelectedMeals(student[dietDayKey]);
    } else if (student.meals) {
      // Fall back to general meals if no day-specific meals found
      setSelectedMeals(student.meals);
    } else {
      setSelectedMeals([]);
    }
    
    // Load supplements for current day
    const supplementDayKey = `supplementsDay${currentSupplementDay}`;
    const vitaminDayKey = `vitaminsDay${currentSupplementDay}`;
    
    if (student[supplementDayKey]) {
      setSelectedSupplements(student[supplementDayKey]);
    } else if (student.supplements) {
      // Fall back to general supplements if no day-specific found
      setSelectedSupplements(student.supplements);
    } else {
      setSelectedSupplements([]);
    }
    
    // Load vitamins for current day
    if (student[vitaminDayKey]) {
      setSelectedVitamins(student[vitaminDayKey]);
    } else if (student.vitamins) {
      // Fall back to general vitamins if no day-specific found
      setSelectedVitamins(student.vitamins);
    } else {
      setSelectedVitamins([]);
    }
  }, [student, currentDay, currentDietDay, currentSupplementDay]);

  // Sync days between tabs - removing conditional hooks
  useEffect(() => {
    // This effect now runs on every render, not conditionally
    if (activeTab === "exercise") {
      setCurrentSupplementDay(currentDay);
      setCurrentDietDay(currentDay);
    } else if (activeTab === "diet") {
      setCurrentSupplementDay(currentDietDay);
      setCurrentDay(currentDietDay);
    } else if (activeTab === "supplement") {
      setCurrentDay(currentSupplementDay);
      setCurrentDietDay(currentSupplementDay);
    }
  }, [activeTab, currentDay, currentDietDay, currentSupplementDay]);

  // Load supplements and vitamins when current day changes
  useEffect(() => {
    if (!student) return;
    
    // Always load supplement data regardless of active tab
    const supplementDayKey = `supplementsDay${currentSupplementDay}`;
    const vitaminDayKey = `vitaminsDay${currentSupplementDay}`;
    
    if (student[supplementDayKey]) {
      setSelectedSupplements(student[supplementDayKey]);
    } else if (student.supplements) {
      setSelectedSupplements(student.supplements);
    } else {
      setSelectedSupplements([]);
    }
    
    if (student[vitaminDayKey]) {
      setSelectedVitamins(student[vitaminDayKey]);
    } else if (student.vitamins) {
      setSelectedVitamins(student.vitamins);
    } else {
      setSelectedVitamins([]);
    }
  }, [student, currentSupplementDay]);

  const handleSaveAll = () => {
    let success = true;
    
    // Save exercises for current day
    if (activeTab === "exercise") {
      success = onSaveExercises(selectedExercises, currentDay);
    }
    
    // Save diet for current day
    if (activeTab === "diet") {
      success = onSaveDiet(selectedMeals, currentDietDay);
    }
    
    // Supplement state
    if (activeTab === "supplement") {
      success = onSaveSupplements({
        supplements: selectedSupplements,
        vitamins: selectedVitamins,
        day: currentSupplementDay
      }, student.id);
    }
    
    if (success) {
      toast({
        title: "ذخیره موفق",
        description: "برنامه‌های شاگرد با موفقیت ذخیره شد",
      });
    }
  };

  return {
    activeTab,
    setActiveTab,
    currentDay,
    setCurrentDay,
    currentDietDay,
    setCurrentDietDay,
    currentSupplementDay,
    setCurrentSupplementDay,
    selectedExercises,
    setSelectedExercises,
    selectedMeals,
    setSelectedMeals,
    selectedSupplements,
    setSelectedSupplements,
    selectedVitamins,
    setSelectedVitamins,
    handleSaveAll
  };
}
