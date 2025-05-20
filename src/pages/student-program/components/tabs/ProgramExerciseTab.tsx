
import React from "react";
import { Student } from "@/components/students/StudentTypes";
import { ExerciseWithSets } from "@/types/exercise";
import DaySelector from "./exercise/DaySelector";
import ExerciseHeader from "./exercise/ExerciseHeader";
import ExerciseContent from "./exercise/ExerciseContent";
import ExerciseCounter from "./exercise/ExerciseCounter";
import { useExerciseTabState } from "./exercise/useExerciseTabState";

interface ProgramExerciseTabProps {
  student: Student;
  exercises: any[];
  onSaveExercises: (exercisesWithSets: ExerciseWithSets[], dayNumber?: number) => boolean;
  currentDay?: number;
  setCurrentDay?: React.Dispatch<React.SetStateAction<number>>;
}

const ProgramExerciseTab: React.FC<ProgramExerciseTabProps> = ({
  student,
  exercises,
  onSaveExercises,
  currentDay: propCurrentDay,
  setCurrentDay: propSetCurrentDay
}) => {
  const {
    selectedExercises,
    setSelectedExercises,
    currentDay,
    setCurrentDay,
    isSaving,
    handleSave
  } = useExerciseTabState(student, propCurrentDay, propSetCurrentDay, onSaveExercises);

  return (
    <div className="flex flex-col h-full space-y-4 rtl">
      <ExerciseHeader 
        exerciseCount={selectedExercises.length}
        currentDay={currentDay}
        isSaving={isSaving}
        onSave={handleSave}
      />
      
      <DaySelector 
        currentDay={currentDay} 
        onDayChange={setCurrentDay} 
      />
      
      <ExerciseContent
        currentDay={currentDay}
        selectedExercises={selectedExercises}
        setSelectedExercises={setSelectedExercises}
        exercises={exercises}
      />
      
      <ExerciseCounter count={selectedExercises.length} />
    </div>
  );
};

export default ProgramExerciseTab;
