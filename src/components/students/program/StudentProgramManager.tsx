
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-gray-800/50 dark:to-gray-900" style={{ direction: "rtl" }}>
      <div className="space-y-6 h-full w-full flex flex-col text-right p-6" dir="rtl">
        <StudentProgramHeader 
          student={student} 
          onClose={onClose} 
          handleSaveAll={handleSaveAll} 
        />

        <div className="flex-1 bg-white/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden">
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
              currentDay={currentSupplementDay}
              setCurrentDay={setCurrentSupplementDay}
            />
          </StudentProgramTabs>
        </div>
      </div>
    </div>
  );
};

export default StudentProgramManager;
