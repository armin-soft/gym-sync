
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import StudentExerciseSelector from "../StudentExerciseSelector";
import { ExerciseWithSets } from "@/types/exercise";
import DaySelector from "./exercise/DaySelector";
import useDayManagement from "./exercise/useDayManagement";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, Target, Timer, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StudentProgramExerciseContentProps {
  currentDay: number;
  setCurrentDay: (day: number) => void;
  selectedExercises: ExerciseWithSets[];
  setSelectedExercises: React.Dispatch<React.SetStateAction<ExerciseWithSets[]>>;
  exercises: any[];
}

const StudentProgramExerciseContent: React.FC<StudentProgramExerciseContentProps> = ({
  currentDay,
  setCurrentDay,
  selectedExercises,
  setSelectedExercises,
  exercises,
}) => {
  const {
    days,
    dayLabels,
    editingDay,
    setEditingDay,
    tempDayLabel,
    setTempDayLabel,
    setShowAddDayDialog,
    setShowDeleteDayDialog,
    confirmDeleteDay,
    maxDays,
    getDayLabel,
    isDayMandatory,
    isDayOptional
  } = useDayManagement({
    initialDays: [1, 2, 3, 4, 5, 6],
    initialDayLabels: {
      1: "روز اول",
      2: "روز دوم", 
      3: "روز سوم",
      4: "روز چهارم",
      5: "روز پنجم",
      6: "روز ششم",
    },
    onDayChange: setCurrentDay
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  const currentDayExercises = selectedExercises.filter(ex => ex.day === currentDay);
  const totalSets = currentDayExercises.reduce((sum, ex) => sum + ex.sets, 0);

  return (
    <TabsContent value="exercise" className="m-0 h-full text-right" dir="rtl">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="h-full flex flex-col"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <Card className="border-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-4 sm:p-6 rounded-2xl shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Dumbbell className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200 text-right mb-1">
                    برنامه تمرینی {getDayLabel(currentDay)}
                  </h3>
                  <div className="flex items-center gap-2 text-right" dir="rtl">
                    {isDayMandatory(currentDay) && (
                      <Badge variant="destructive" className="text-xs px-2 py-1">
                        اجباری
                      </Badge>
                    )}
                    {isDayOptional(currentDay) && (
                      <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-xs px-2 py-1">
                        اختیاری
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-right" dir="rtl">
                <div className="text-center">
                  <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                    <Target className="w-4 h-4" />
                    <span className="text-xs font-medium">تمرینات</span>
                  </div>
                  <div className="text-lg font-bold text-gray-800 dark:text-gray-200">
                    {toPersianNumbers(currentDayExercises.length)}
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                    <Timer className="w-4 h-4" />
                    <span className="text-xs font-medium">کل ست</span>
                  </div>
                  <div className="text-lg font-bold text-gray-800 dark:text-gray-200">
                    {toPersianNumbers(totalSets)}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <DaySelector 
            days={days}
            dayLabels={dayLabels}
            currentDay={currentDay}
            setCurrentDay={setCurrentDay}
            editingDay={editingDay}
            setEditingDay={setEditingDay}
            tempDayLabel={tempDayLabel}
            setTempDayLabel={setTempDayLabel}
            setShowAddDayDialog={setShowAddDayDialog}
            confirmDeleteDay={confirmDeleteDay}
            maxDays={maxDays}
            isDayMandatory={isDayMandatory}
            isDayOptional={isDayOptional}
          />
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex-1 overflow-hidden mt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={`exercise-day-${currentDay}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="h-full"
            >
              <Card className="h-full border-0 shadow-lg bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl overflow-hidden">
                <StudentExerciseSelector
                  selectedExercises={selectedExercises}
                  setSelectedExercises={setSelectedExercises}
                  dayNumber={currentDay}
                  exercises={exercises}
                  dayLabel={getDayLabel(currentDay)}
                  noScroll={true}
                  isDayMandatory={isDayMandatory(currentDay)}
                  isDayOptional={isDayOptional(currentDay)}
                />
              </Card>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </TabsContent>
  );
};

export default StudentProgramExerciseContent;
