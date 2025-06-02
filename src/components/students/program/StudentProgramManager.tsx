
import React from "react";
import { Student } from "@/components/students/StudentTypes";
import { ExerciseWithSets } from "@/types/exercise";
import { Supplement } from "@/types/supplement";
import { useStudentProgramManager } from "./hooks/useStudentProgramManager";
import StudentProgramHeader from "./components/StudentProgramHeader";
import StudentProgramTabs from "./components/StudentProgramTabs";
import StudentProgramExerciseContent from "./components/StudentProgramExerciseContent";
import StudentProgramSupplementContent from "./components/StudentProgramSupplementContent";
import StudentDietSelector from "./StudentDietSelector";

interface StudentProgramManagerProps {
  student: Student;
  exercises: any[];
  meals: any[];
  supplements: Supplement[];
  onSaveExercises: (exercisesWithSets: ExerciseWithSets[], dayNumber?: number) => boolean;
  onSaveDiet: (mealIds: number[], dayNumber?: number) => boolean;
  onSaveSupplements: (data: {supplements: number[], vitamins: number[], day?: number}, studentId: number) => boolean;
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
  } = useStudentProgramManager({
    student,
    onSaveExercises,
    onSaveDiet,
    onSaveSupplements
  });

  return (
    <div className="space-y-4 h-full w-full flex flex-col text-right" dir="rtl">
      <StudentProgramHeader 
        student={student} 
        onClose={onClose} 
        handleSaveAll={handleSaveAll} 
      />

      <StudentProgramTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentDay={activeTab === "exercise" 
          ? currentDay 
          : activeTab === "diet" 
            ? currentDietDay 
            : currentSupplementDay}
        setCurrentDay={activeTab === "exercise" 
          ? setCurrentDay 
          : activeTab === "diet" 
            ? setCurrentDietDay 
            : setCurrentSupplementDay}
      >
        <StudentProgramExerciseContent 
          currentDay={currentDay}
          setCurrentDay={setCurrentDay}
          selectedExercises={selectedExercises}
          setSelectedExercises={setSelectedExercises}
          exercises={exercises}
        />
        
        <StudentDietSelector
          selectedMeals={selectedMeals}
          setSelectedMeals={setSelectedMeals}
          meals={meals}
          currentDay={currentDietDay}
        />
        
        <StudentProgramSupplementContent 
          selectedSupplements={selectedSupplements}
          setSelectedSupplements={setSelectedSupplements}
          selectedVitamins={selectedVitamins}
          setSelectedVitamins={setSelectedVitamins}
          supplements={supplements}
          currentDay={currentSupplementDay}
          setCurrentDay={setCurrentSupplementDay}
        />
      </StudentProgramTabs>
    </div>
  );
};

export default StudentProgramManager;
