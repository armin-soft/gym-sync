
import React from "react";
import { Student } from "@/components/students/StudentTypes";
import { ExerciseWithSets } from "@/types/exercise";
import { Supplement } from "@/types/supplement";
import { useStudentProgramManager } from "./hooks/useStudentProgramManager";
import StudentProgramHeader from "./components/StudentProgramHeader";
import StudentProgramTabs from "./components/StudentProgramTabs";
import StudentProgramExerciseContent from "./components/StudentProgramExerciseContent";
import StudentProgramDietContent from "./components/StudentProgramDietContent";
import StudentProgramSupplementContent from "./components/StudentProgramSupplementContent";

interface StudentProgramManagerProps {
  student: Student;
  exercises: any[];
  meals: any[];
  supplements: Supplement[];
  onSaveExercises: (exercisesWithSets: ExerciseWithSets[], dayNumber?: number) => boolean;
  onSaveDiet: (mealIds: number[], dayNumber?: number) => boolean;
  onSaveSupplements: (data: {supplements: number[], vitamins: number[]}) => boolean;
  onClose: () => void;
}

const StudentProgramManager: React.FC<StudentProgramManagerProps> = ({
  student,
  exercises,
  meals,
  supplements,
  onSaveExercises,
  onSaveDiet,
  onSaveSupplements,
  onClose
}) => {
  const {
    activeTab,
    setActiveTab,
    currentDay,
    setCurrentDay,
    currentDietDay,
    setCurrentDietDay,
    selectedExercises,
    setSelectedExercises,
    selectedMeals,
    setSelectedMeals,
    selectedSupplements,
    setSelectedSupplements,
    selectedVitamins,
    setSelectedVitamins,
    handleSaveAll
  } = useStudentProgramManager({
    student,
    onSaveExercises,
    onSaveDiet,
    onSaveSupplements
  });

  return (
    <div className="space-y-4 h-full w-full flex flex-col">
      <StudentProgramHeader 
        student={student} 
        onClose={onClose} 
        handleSaveAll={handleSaveAll} 
      />

      <StudentProgramTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentDay={activeTab === "exercise" ? currentDay : currentDietDay}
        setCurrentDay={activeTab === "exercise" ? setCurrentDay : setCurrentDietDay}
      >
        <StudentProgramExerciseContent 
          currentDay={currentDay}
          setCurrentDay={setCurrentDay}
          selectedExercises={selectedExercises}
          setSelectedExercises={setSelectedExercises}
          exercises={exercises}
        />
        
        <StudentProgramDietContent 
          selectedMeals={selectedMeals}
          setSelectedMeals={setSelectedMeals}
          meals={meals}
          currentDietDay={currentDietDay}
          setCurrentDietDay={setCurrentDietDay}
        />
        
        <StudentProgramSupplementContent 
          selectedSupplements={selectedSupplements}
          setSelectedSupplements={setSelectedSupplements}
          selectedVitamins={selectedVitamins}
          setSelectedVitamins={setSelectedVitamins}
          supplements={supplements}
        />
      </StudentProgramTabs>
    </div>
  );
};

export default StudentProgramManager;
