
import { useState, useEffect, useRef } from "react";
import { Student } from "@/components/students/StudentTypes";
import { ExerciseWithSets } from "@/types/exercise";
import { useToast } from "@/hooks/use-toast";
import { toPersianNumbers } from "@/lib/utils/numbers";

export const useExerciseTabState = (
  student: Student,
  propCurrentDay?: number,
  propSetCurrentDay?: React.Dispatch<React.SetStateAction<number>>,
  onSaveExercises?: (exercisesWithSets: ExerciseWithSets[], dayNumber?: number) => boolean
) => {
  const { toast } = useToast();
  const [selectedExercises, setSelectedExercises] = useState<ExerciseWithSets[]>([]);
  const [currentDay, setCurrentDay] = useState<number>(propCurrentDay || 1);
  const [isSaving, setIsSaving] = useState(false);
  
  // Use prop state if provided, otherwise use local state
  const effectiveCurrentDay = propCurrentDay !== undefined ? propCurrentDay : currentDay;
  const effectiveSetCurrentDay = propSetCurrentDay || setCurrentDay;
  
  // Exercise cache for day switching - updated for 5 days
  const exerciseCacheRef = useRef<Record<number, ExerciseWithSets[]>>({
    1: [],
    2: [],
    3: [],
    4: [],
    5: []
  });
  
  // Initializing cache once on load - updated for 5 days
  useEffect(() => {
    const cachedExercises = { ...exerciseCacheRef.current };
    
    if (student.exercisesDay1) {
      cachedExercises[1] = student.exercisesDay1.map(id => ({
        id,
        sets: student.exerciseSetsDay1?.[id] || 3,
        reps: student.exerciseRepsDay1?.[id] || "12",
        day: 1
      }));
    }
    
    if (student.exercisesDay2) {
      cachedExercises[2] = student.exercisesDay2.map(id => ({
        id,
        sets: student.exerciseSetsDay2?.[id] || 3,
        reps: student.exerciseRepsDay2?.[id] || "12",
        day: 2
      }));
    }
    
    if (student.exercisesDay3) {
      cachedExercises[3] = student.exercisesDay3.map(id => ({
        id,
        sets: student.exerciseSetsDay3?.[id] || 3,
        reps: student.exerciseRepsDay3?.[id] || "12",
        day: 3
      }));
    }
    
    if (student.exercisesDay4) {
      cachedExercises[4] = student.exercisesDay4.map(id => ({
        id,
        sets: student.exerciseSetsDay4?.[id] || 3,
        reps: student.exerciseRepsDay4?.[id] || "12",
        day: 4
      }));
    }
    
    if (student.exercisesDay5) {
      cachedExercises[5] = student.exercisesDay5.map(id => ({
        id,
        sets: student.exerciseSetsDay5?.[id] || 3,
        reps: student.exerciseRepsDay5?.[id] || "12",
        day: 5
      }));
    }
    
    exerciseCacheRef.current = cachedExercises;
    
    // Set first day exercises initially
    setSelectedExercises(cachedExercises[effectiveCurrentDay]);
  }, [student, effectiveCurrentDay]);

  // Side effect for managing day changes - save to and load from cache
  useEffect(() => {
    // Save current day exercises to cache before changing
    const currentExercises = [...selectedExercises];
    exerciseCacheRef.current = {
      ...exerciseCacheRef.current,
      [effectiveCurrentDay]: currentExercises
    };
    
    // Load exercises from cache for the new day
    setSelectedExercises(exerciseCacheRef.current[effectiveCurrentDay] || []);
  }, [effectiveCurrentDay]);

  const handleSave = async () => {
    if (!onSaveExercises) return;
    
    setIsSaving(true);
    try {
      // Save to cache before sending to server
      const updatedCache = {
        ...exerciseCacheRef.current,
        [effectiveCurrentDay]: [...selectedExercises]
      };
      exerciseCacheRef.current = updatedCache;
      
      // Set day in each exercise
      const exercisesWithDay = selectedExercises.map(ex => ({
        ...ex,
        day: effectiveCurrentDay
      }));
      
      const success = onSaveExercises(exercisesWithDay, effectiveCurrentDay);
      
      if (success) {
        toast({
          title: "ذخیره موفق",
          description: `تمرین‌های روز ${toPersianNumbers(effectiveCurrentDay)} با موفقیت ذخیره شدند`
        });
      } else {
        toast({
          variant: "destructive",
          title: "خطا در ذخیره‌سازی",
          description: "مشکلی در ذخیره‌سازی برنامه تمرینی پیش آمد."
        });
      }
    } catch (error) {
      console.error("Error saving exercises:", error);
      toast({
        variant: "destructive",
        title: "خطای سیستمی",
        description: "خطایی در هنگام ذخیره‌سازی رخ داد. لطفا مجدد تلاش کنید."
      });
    } finally {
      setIsSaving(false);
    }
  };

  return {
    selectedExercises,
    setSelectedExercises,
    currentDay: effectiveCurrentDay,
    setCurrentDay: effectiveSetCurrentDay,
    isSaving,
    handleSave,
    exerciseCacheRef
  };
};
