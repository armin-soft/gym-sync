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
    // Load exercises for the current day
    if (currentDay === 1 && student.exercisesDay1) {
      const loadedExercises: ExerciseWithSets[] = student.exercisesDay1.map(id => ({
        id,
        sets: student.exerciseSetsDay1?.[id] || 3,
        reps: student.exerciseRepsDay1?.[id] || "12-15",
        day: 1
      }));
      setSelectedExercises(loadedExercises);
    } else if (currentDay === 2 && student.exercisesDay2) {
      const loadedExercises: ExerciseWithSets[] = student.exercisesDay2.map(id => ({
        id,
        sets: student.exerciseSetsDay2?.[id] || 3,
        reps: student.exerciseRepsDay2?.[id] || "12-15",
        day: 2
      }));
      setSelectedExercises(loadedExercises);
    } else if (currentDay === 3 && student.exercisesDay3) {
      const loadedExercises: ExerciseWithSets[] = student.exercisesDay3.map(id => ({
        id,
        sets: student.exerciseSetsDay3?.[id] || 3,
        reps: student.exerciseRepsDay3?.[id] || "12-15",
        day: 3
      }));
      setSelectedExercises(loadedExercises);
    } else if (currentDay === 4 && student.exercisesDay4) {
      const loadedExercises: ExerciseWithSets[] = student.exercisesDay4.map(id => ({
        id,
        sets: student.exerciseSetsDay4?.[id] || 3,
        reps: student.exerciseRepsDay4?.[id] || "12-15",
        day: 4
      }));
      setSelectedExercises(loadedExercises);
    } else {
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
