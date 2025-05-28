
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
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

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

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="h-full w-full flex flex-col text-right bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800" dir="rtl">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="h-full flex flex-col gap-4 sm:gap-6 p-3 sm:p-4 lg:p-6"
      >
        <motion.div variants={itemVariants}>
          <StudentProgramHeader 
            student={student} 
            onClose={onClose} 
            handleSaveAll={handleSaveAll} 
          />
        </motion.div>

        <motion.div variants={itemVariants} className="flex-1 overflow-hidden">
          <Card className="h-full border-0 shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl">
            <div className="h-full p-4 sm:p-6">
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
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default StudentProgramManager;
