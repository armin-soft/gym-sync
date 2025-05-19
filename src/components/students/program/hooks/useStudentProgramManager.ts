
import { useState, useEffect } from "react";
import { Student } from "@/components/students/StudentTypes";
import { ExerciseWithSets } from "@/types/exercise";
import { useToast } from "@/hooks/use-toast";

interface UseStudentProgramManagerProps {
  student: Student;
  onSaveExercises: (exercisesWithSets: ExerciseWithSets[], dayNumber?: number) => boolean;
  onSaveDiet: (mealIds: number[]) => boolean;
  onSaveSupplements: (data: {supplements: number[], vitamins: number[]}) => boolean;
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
  
  // Supplement state
  const [selectedSupplements, setSelectedSupplements] = useState<number[]>([]);
  const [selectedVitamins, setSelectedVitamins] = useState<number[]>([]);

  // Load initial data for the student
  useEffect(() => {
    // Find all available day properties in the student object
    const dayProperties = Object.keys(student).filter(key => key.startsWith('exercisesDay'));
    
    // If there are no day properties, default to empty
    if (dayProperties.length === 0) {
      setSelectedExercises([]);
      return;
    }
    
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
    
    // Load meals
    if (student.meals) {
      setSelectedMeals(student.meals);
    }
    
    // Load supplements
    if (student.supplements) {
      setSelectedSupplements(student.supplements);
    }
    
    // Load vitamins
    if (student.vitamins) {
      setSelectedVitamins(student.vitamins);
    }
  }, [student, currentDay]);

  const handleSaveAll = () => {
    let success = true;
    
    // Save exercises for current day
    if (activeTab === "exercise") {
      success = onSaveExercises(selectedExercises, currentDay);
    }
    
    // Save diet
    if (activeTab === "diet") {
      success = onSaveDiet(selectedMeals);
    }
    
    // Supplement state
    if (activeTab === "supplement") {
      success = onSaveSupplements({
        supplements: selectedSupplements,
        vitamins: selectedVitamins
      });
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
