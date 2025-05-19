
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { Student } from "@/components/students/StudentTypes";
import { ExerciseWithSets } from "@/types/exercise";
import { toPersianNumbers } from "@/lib/utils/numbers";
import StudentExerciseSelector from "@/components/students/program/StudentExerciseSelector";

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
  const [selectedExercises, setSelectedExercises] = useState<ExerciseWithSets[]>([]);
  const [currentDay, setCurrentDay] = useState<number>(1);
  const [isSaving, setIsSaving] = useState(false);
  
  // Load initial data for the current day
  useEffect(() => {
    if (currentDay === 1 && student.exercisesDay1) {
      const loadedExercises = student.exercisesDay1.map(id => ({
        id,
        sets: student.exerciseSetsDay1?.[id] || 3,
        reps: student.exerciseRepsDay1?.[id] || "12-15",
        rest: "60s"
      }));
      setSelectedExercises(loadedExercises);
    } else if (currentDay === 2 && student.exercisesDay2) {
      const loadedExercises = student.exercisesDay2.map(id => ({
        id,
        sets: student.exerciseSetsDay2?.[id] || 3,
        reps: student.exerciseRepsDay2?.[id] || "12-15",
        rest: "60s"
      }));
      setSelectedExercises(loadedExercises);
    } else if (currentDay === 3 && student.exercisesDay3) {
      const loadedExercises = student.exercisesDay3.map(id => ({
        id,
        sets: student.exerciseSetsDay3?.[id] || 3,
        reps: student.exerciseRepsDay3?.[id] || "12-15",
        rest: "60s"
      }));
      setSelectedExercises(loadedExercises);
    } else if (currentDay === 4 && student.exercisesDay4) {
      const loadedExercises = student.exercisesDay4.map(id => ({
        id,
        sets: student.exerciseSetsDay4?.[id] || 3,
        reps: student.exerciseRepsDay4?.[id] || "12-15",
        rest: "60s"
      }));
      setSelectedExercises(loadedExercises);
    } else {
      setSelectedExercises([]);
    }
  }, [student, currentDay]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      onSaveExercises(selectedExercises, currentDay);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          برنامه تمرینی روز {toPersianNumbers(currentDay)}
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            {[1, 2, 3, 4].map(day => (
              <Button 
                key={day}
                variant={currentDay === day ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentDay(day)}
                className={`h-8 rounded-none border-0 ${
                  currentDay === day 
                    ? "bg-indigo-500 text-white hover:bg-indigo-600" 
                    : "text-gray-600 dark:text-gray-300"
                }`}
              >
                روز {toPersianNumbers(day)}
              </Button>
            ))}
          </div>
          
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
      
      <div className="flex-1 overflow-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <StudentExerciseSelector 
          exercises={exercises}
          selectedExercises={selectedExercises}
          setSelectedExercises={setSelectedExercises}
          dayNumber={currentDay}
        />
      </div>
      
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
