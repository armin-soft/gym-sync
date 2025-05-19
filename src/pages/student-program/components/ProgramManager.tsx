
import React from "react";
import { Tabs } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Student } from "@/components/students/StudentTypes";
import { ExerciseWithSets } from "@/types/exercise";
import { Supplement } from "@/types/supplement";
import { useProgramTabs } from "../hooks/useProgramTabs";
import { containerVariants, itemVariants } from "../utils/animations";
import ProgramTabsHeader from "./ProgramTabsHeader";
import ProgramTabsContent from "./ProgramTabsContent";

interface ProgramManagerProps {
  student: Student;
  exercises: any[];
  meals: any[];
  supplements: Supplement[];
  onSaveExercises: (exercisesWithSets: ExerciseWithSets[], dayNumber?: number) => boolean;
  onSaveDiet: (mealIds: number[]) => boolean;
  onSaveSupplements: (data: {supplements: number[], vitamins: number[]}) => boolean;
}

const ProgramManager: React.FC<ProgramManagerProps> = ({
  student,
  exercises,
  meals,
  supplements,
  onSaveExercises,
  onSaveDiet,
  onSaveSupplements
}) => {
  const { activeTab, setActiveTab } = useProgramTabs();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full h-full flex flex-col"
    >
      <Tabs 
        defaultValue="exercise" 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className="w-full flex-1 flex flex-col"
      >
        <motion.div variants={itemVariants}>
          <Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 border border-gray-200/50 dark:border-gray-700/50 shadow-lg overflow-hidden">
            <ProgramTabsHeader activeTab={activeTab} />
            
            <ProgramTabsContent 
              student={student}
              exercises={exercises}
              meals={meals}
              supplements={supplements}
              onSaveExercises={onSaveExercises}
              onSaveDiet={onSaveDiet}
              onSaveSupplements={onSaveSupplements}
            />
          </Card>
        </motion.div>
      </Tabs>
    </motion.div>
  );
};

export default ProgramManager;
