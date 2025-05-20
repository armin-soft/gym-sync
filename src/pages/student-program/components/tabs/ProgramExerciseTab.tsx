
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { Student } from "@/components/students/StudentTypes";
import { ExerciseWithSets } from "@/types/exercise";
import { toPersianNumbers } from "@/lib/utils/numbers";
import StudentExerciseSelector from "@/components/students/program/StudentExerciseSelector";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface ProgramExerciseTabProps {
  student: Student;
  exercises: any[];
  onSaveExercises: (exercisesWithSets: ExerciseWithSets[], dayNumber?: number) => boolean;
}

const ProgramExerciseTab: React.FC<ProgramExerciseTabProps> = ({
  student,
  exercises,
  onSaveExercises
}) => {
  const { toast } = useToast();
  const [selectedExercises, setSelectedExercises] = useState<ExerciseWithSets[]>([]);
  const [currentDay, setCurrentDay] = useState<number>(1);
  const [isSaving, setIsSaving] = useState(false);
  
  // คัชเดิเระิฑาทร่อย่างเพื่อเพิ่มประสิทธิภาพการใช้งาน
  const exerciseCacheRef = React.useRef<Record<number, ExerciseWithSets[]>>({
    1: [],
    2: [],
    3: [],
    4: []
  });
  
  // Initializing cache once on load
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
    
    exerciseCacheRef.current = cachedExercises;
    
    // Set first day exercises initially
    setSelectedExercises(cachedExercises[1]);
  }, [student]);

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
    setIsSaving(true);
    try {
      // Save to cache before sending to server
      const updatedCache = {
        ...exerciseCacheRef.current,
        [currentDay]: [...selectedExercises]
      };
      exerciseCacheRef.current = updatedCache;
      
      // مطمئن شویم day در هر تمرین به درستی تنظیم شده است
      const exercisesWithDay = selectedExercises.map(ex => ({
        ...ex,
        day: currentDay
      }));
      
      const success = onSaveExercises(exercisesWithDay, currentDay);
      
      if (success) {
        toast({
          title: "ذخیره موفق",
          description: `تمرین‌های روز ${toPersianNumbers(currentDay)} با موفقیت ذخیره شدند`
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
  
  // Day buttons with animation for better UX
  const DayButton = ({ day }: { day: number }) => (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => setCurrentDay(day)}
      className={cn(
        "h-10 px-6 rounded-none border-0",
        currentDay === day 
          ? "bg-indigo-500 text-white" 
          : "bg-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
      )}
    >
      روز {toPersianNumbers(day)}
    </motion.button>
  );

  return (
    <div className="flex flex-col h-full space-y-4 rtl">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          برنامه تمرینی روز {toPersianNumbers(currentDay)}
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="flex items-center gap-1 bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
          >
            {isSaving ? (
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            <span>ذخیره</span>
          </Button>
        </div>
      </div>
      
      <div className="flex items-center justify-center mb-4">
        <motion.div 
          className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {[1, 2, 3, 4].map(day => (
            <DayButton key={day} day={day} />
          ))}
        </motion.div>
      </div>
      
      <motion.div 
        className="flex-1 overflow-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
        key={`day-${currentDay}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <StudentExerciseSelector 
          exercises={exercises}
          selectedExercises={selectedExercises}
          setSelectedExercises={(newExercises) => {
            setSelectedExercises(newExercises);
            // Update cache to preserve changes when switching between days
            // Fix the type issue by creating a new actual array instead of a setState action
            const updatedCache = { ...exerciseCacheRef.current };
            updatedCache[currentDay] = Array.isArray(newExercises) ? 
              [...newExercises] : 
              typeof newExercises === 'function' ? 
                [...selectedExercises] : // If it's a function, use current state (this should never happen though)
                [];
            exerciseCacheRef.current = updatedCache;
          }}
          dayNumber={currentDay}
        />
      </motion.div>
      
      <div className="text-xs text-gray-500 dark:text-gray-400 text-center p-2">
        <span className="inline-flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
          <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
          <span>{toPersianNumbers(selectedExercises.length)} تمرین انتخاب شده</span>
        </span>
      </div>
    </div>
  );
};

export default ProgramExerciseTab;
