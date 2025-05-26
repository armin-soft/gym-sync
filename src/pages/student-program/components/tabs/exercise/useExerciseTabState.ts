
import { useState, useEffect, useRef } from "react";
import { Student } from "@/components/students/StudentTypes";
import { ExerciseWithSets } from "@/types/exercise";
import { useToast } from "@/hooks/use-toast";
import { toPersianNumbers } from "@/lib/utils/numbers";

export const useExerciseTabState = (
  student: Student,
  onSaveExercises: (exercisesWithSets: ExerciseWithSets[], dayNumber?: number) => boolean
) => {
  const { toast } = useToast();
  const [selectedExercises, setSelectedExercises] = useState<ExerciseWithSets[]>([]);
  const [currentDay, setCurrentDay] = useState<number>(1);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Exercise cache for day switching - updated for 6 days
  const exerciseCacheRef = useRef<Record<number, ExerciseWithSets[]>>({
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [] // Added day 6
  });
  
  // Initializing cache once on load - updated for 6 days
  useEffect(() => {
    const cachedExercises = { ...exerciseCacheRef.current };
    
    // Day 1
    if (student.exercisesDay1) {
      cachedExercises[1] = student.exercisesDay1.map(id => ({
        id,
        sets: student.exerciseSetsDay1?.[id] || 3,
        reps: student.exerciseRepsDay1?.[id] || "12",
        day: 1
      }));
    }
    
    // Day 2
    if (student.exercisesDay2) {
      cachedExercises[2] = student.exercisesDay2.map(id => ({
        id,
        sets: student.exerciseSetsDay2?.[id] || 3,
        reps: student.exerciseRepsDay2?.[id] || "12",
        day: 2
      }));
    }
    
    // Day 3
    if (student.exercisesDay3) {
      cachedExercises[3] = student.exercisesDay3.map(id => ({
        id,
        sets: student.exerciseSetsDay3?.[id] || 3,
        reps: student.exerciseRepsDay3?.[id] || "12",
        day: 3
      }));
    }
    
    // Day 4
    if (student.exercisesDay4) {
      cachedExercises[4] = student.exercisesDay4.map(id => ({
        id,
        sets: student.exerciseSetsDay4?.[id] || 3,
        reps: student.exerciseRepsDay4?.[id] || "12",
        day: 4
      }));
    }
    
    // Day 5
    if (student.exercisesDay5) {
      cachedExercises[5] = student.exercisesDay5.map(id => ({
        id,
        sets: student.exerciseSetsDay5?.[id] || 3,
        reps: student.exerciseRepsDay5?.[id] || "12",
        day: 5
      }));
    }
    
    // Day 6 (added)
    if (student.exercisesDay6) {
      cachedExercises[6] = student.exercisesDay6.map(id => ({
        id,
        sets: student.exerciseSetsDay6?.[id] || 3,
        reps: student.exerciseRepsDay6?.[id] || "12",
        day: 6
      }));
    }
    
    exerciseCacheRef.current = cachedExercises;
    
    // Set first day exercises initially
    setSelectedExercises(cachedExercises[currentDay]);
  }, [student, currentDay]);

  // Side effect for managing day changes - save to and load from cache
  useEffect(() => {
    // Save current day exercises to cache before changing
    const currentExercises = [...selectedExercises];
    exerciseCacheRef.current = {
      ...exerciseCacheRef.current,
      [currentDay]: currentExercises
    };
    
    // Load exercises from cache for the new day
    setSelectedExercises(exerciseCacheRef.current[currentDay] || []);
  }, [currentDay]);

  const handleSave = async () => {
    if (!onSaveExercises) return;
    
    setIsLoading(true);
    setIsSaving(true);
    setSaveStatus('idle');
    
    try {
      // Save to cache before sending to server
      const updatedCache = {
        ...exerciseCacheRef.current,
        [currentDay]: [...selectedExercises]
      };
      exerciseCacheRef.current = updatedCache;
      
      // Set day in each exercise
      const exercisesWithDay = selectedExercises.map(ex => ({
        ...ex,
        day: currentDay
      }));
      
      const success = onSaveExercises(exercisesWithDay, currentDay);
      
      if (success) {
        setSaveStatus('success');
        toast({
          title: "ذخیره موفق",
          description: `تمرین‌های روز ${toPersianNumbers(currentDay)} با موفقیت ذخیره شدند`
        });
      } else {
        setSaveStatus('error');
        toast({
          variant: "destructive",
          title: "خطا در ذخیره‌سازی",
          description: "مشکلی در ذخیره‌سازی برنامه تمرینی پیش آمد."
        });
      }
    } catch (error) {
      setSaveStatus('error');
      console.error("Error saving exercises:", error);
      toast({
        variant: "destructive",
        title: "خطای سیستمی",
        description: "خطایی در هنگام ذخیره‌سازی رخ داد. لطفا مجدد تلاش کنید."
      });
    } finally {
      setIsSaving(false);
      setIsLoading(false);
      
      // Reset save status after a delay
      setTimeout(() => {
        setSaveStatus('idle');
      }, 2000);
    }
  };

  return {
    selectedExercises,
    setSelectedExercises,
    currentDay,
    setCurrentDay,
    isSaving,
    handleSave,
    exerciseCacheRef,
    isLoading,
    saveStatus
  };
};

export default useExerciseTabState;
