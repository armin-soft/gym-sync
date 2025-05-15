
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { ExerciseWithSets } from "@/hooks/exercise-selection";
import ExerciseDialogFooter from "./ExerciseDialogFooter";
import ExerciseDialogHeader from "./ExerciseDialogHeader";
import ExerciseDialogLoading from "./dialog/ExerciseDialogLoading";
import { StudentExerciseDialogState } from "./dialog/StudentExerciseDialogState";
import StudentExerciseDialogContent from "./dialog/StudentExerciseDialogContent";
import { StudentExerciseDialogProps } from "./dialog/StudentExerciseDialogProps";
import { motion } from "framer-motion";

const StudentExerciseDialog: React.FC<StudentExerciseDialogProps> = ({
  open,
  onOpenChange,
  studentName,
  onSave,
  initialExercises = [],
  initialExercisesDay1 = [],
  initialExercisesDay2 = [],
  initialExercisesDay3 = [],
  initialExercisesDay4 = [],
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[100vw] p-0 m-0 h-[100vh] w-[100vw] rounded-none border-none overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 flex flex-col">
        <DialogTitle className="sr-only">
          انتخاب تمرین برای {studentName}
        </DialogTitle>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col h-full"
        >
          <ExerciseDialogHeader studentName={studentName} />

          <StudentExerciseDialogState
            open={open}
            onOpenChange={onOpenChange}
            studentName={studentName}
            onSave={onSave}
            initialExercises={initialExercises}
            initialExercisesDay1={initialExercisesDay1}
            initialExercisesDay2={initialExercisesDay2}
            initialExercisesDay3={initialExercisesDay3}
            initialExercisesDay4={initialExercisesDay4}
          >
            {({ 
              isLoading,
              activeTab,
              getActiveTabSelectedExercises,
              handleSave,
              handleSaveDay,
              ...contentProps
            }) => (
              <>
                {isLoading ? (
                  <ExerciseDialogLoading />
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="flex-1 flex overflow-hidden"
                  >
                    <StudentExerciseDialogContent 
                      isLoading={isLoading}
                      activeTab={activeTab}
                      handleSaveExercises={(exercisesWithSets, dayNumber) => {
                        return handleSaveDay(
                          exercisesWithSets, 
                          onSave, 
                          dayNumber || parseInt(activeTab.replace("day", ""))
                        );
                      }}
                      {...contentProps} 
                    />
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <ExerciseDialogFooter
                    activeTab={activeTab}
                    selectedExercisesCount={getActiveTabSelectedExercises().length}
                    onCancel={() => onOpenChange(false)}
                    onSave={handleSave}
                  />
                </motion.div>
              </>
            )}
          </StudentExerciseDialogState>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default StudentExerciseDialog;
