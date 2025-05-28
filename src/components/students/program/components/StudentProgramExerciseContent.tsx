
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import StudentExerciseSelector from "../StudentExerciseSelector";
import { ExerciseWithSets } from "@/types/exercise";
import DaySelector from "./exercise/DaySelector";
import useDayManagement from "./exercise/useDayManagement";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, Calendar, Trophy } from "lucide-react";

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
  // Use our custom hook for day management with 6 days (1-4 mandatory, 5-6 optional)
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

  return (
    <TabsContent value="exercise" className="m-0 h-full" style={{ direction: "rtl" }} dir="rtl">
      <div className="h-full flex flex-col p-6 text-right">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  برنامه تمرینی روز {toPersianNumbers(currentDay)}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {getDayLabel(currentDay)}
                  </span>
                  {isDayMandatory(currentDay) && (
                    <span className="text-xs bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 px-2 py-1 rounded-full font-medium">
                      اجباری
                    </span>
                  )}
                  {isDayOptional(currentDay) && (
                    <span className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 px-2 py-1 rounded-full font-medium">
                      اختیاری
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-xl">
              <Trophy className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                {toPersianNumbers(selectedExercises.length)} تمرین انتخاب شده
              </span>
            </div>
          </div>
          
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
        
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={`day-${currentDay}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="h-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm"
            >
              <div className="h-full p-4" style={{ direction: "rtl" }} dir="rtl">
                <StudentExerciseSelector 
                  selectedExercises={selectedExercises}
                  setSelectedExercises={setSelectedExercises}
                  dayNumber={currentDay}
                  exercises={exercises}
                  dayLabel={getDayLabel(currentDay)}
                  isDayMandatory={isDayMandatory(currentDay)}
                  isDayOptional={isDayOptional(currentDay)}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </TabsContent>
  );
};

export default StudentProgramExerciseContent;
