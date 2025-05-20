
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
import { AnimatePresence, motion } from "framer-motion";

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

  const tabContentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
  };

  return (
    <div className="space-y-4 h-full w-full flex flex-col">
      <StudentProgramHeader 
        student={student} 
        onClose={onClose} 
        handleSaveAll={handleSaveAll} 
        activeTab={activeTab}
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
        <AnimatePresence mode="wait">
          {activeTab === "exercise" && (
            <motion.div
              key="exercise-tab"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="h-full"
            >
              <StudentProgramExerciseContent 
                currentDay={currentDay}
                setCurrentDay={setCurrentDay}
                selectedExercises={selectedExercises}
                setSelectedExercises={setSelectedExercises}
                exercises={exercises}
              />
            </motion.div>
          )}
          
          {activeTab === "diet" && (
            <motion.div
              key="diet-tab"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="h-full"
            >
              <StudentProgramDietContent 
                selectedMeals={selectedMeals}
                setSelectedMeals={setSelectedMeals}
                meals={meals}
                currentDietDay={currentDietDay}
                setCurrentDietDay={setCurrentDietDay}
              />
            </motion.div>
          )}
          
          {activeTab === "supplement" && (
            <motion.div
              key="supplement-tab"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="h-full"
            >
              <StudentProgramSupplementContent 
                selectedSupplements={selectedSupplements}
                setSelectedSupplements={setSelectedSupplements}
                selectedVitamins={selectedVitamins}
                setSelectedVitamins={setSelectedVitamins}
                supplements={supplements}
                currentDay={currentSupplementDay}
                setCurrentDay={setCurrentSupplementDay}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </StudentProgramTabs>
    </div>
  );
};

export default StudentProgramManager;
