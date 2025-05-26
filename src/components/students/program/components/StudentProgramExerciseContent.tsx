
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import StudentExerciseSelector from "../StudentExerciseSelector";
import { ExerciseWithSets } from "@/types/exercise";
import DaySelector from "./exercise/DaySelector";
import useDayManagement from "./exercise/useDayManagement";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, Target, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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

  const currentDayExercises = selectedExercises.filter(ex => ex.dayNumber === currentDay);

  return (
    <div className="h-full p-6 text-right" dir="rtl">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="h-full flex flex-col"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  برنامه تمرینی روز {toPersianNumbers(currentDay)}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{getDayLabel(currentDay)}</span>
                  {isDayMandatory(currentDay) && (
                    <Badge variant="destructive" className="text-xs">
                      اجباری
                    </Badge>
                  )}
                  {isDayOptional(currentDay) && (
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                      اختیاری
                    </Badge>
                  )}
                </p>
              </div>
            </div>
            
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200/50 dark:border-blue-700/50">
              <CardContent className="p-4 text-center">
                <Target className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                <p className="text-sm text-blue-600 dark:text-blue-400">تمرین‌های انتخاب شده</p>
                <p className="text-lg font-bold text-blue-800 dark:text-blue-300">
                  {toPersianNumbers(currentDayExercises.length)}
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
        
        {/* Day Selector */}
        <motion.div variants={itemVariants} className="mb-6">
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
            <CardContent className="p-4">
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
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Exercise Content */}
        <motion.div variants={itemVariants} className="flex-1 overflow-hidden">
          <Card className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
            <CardContent className="p-0 h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`day-${currentDay}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className="h-full"
                >
                  <div dir="rtl" className="text-right h-full">
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
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default StudentProgramExerciseContent;
