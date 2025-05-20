
import React from "react";
import StudentExerciseSelector from "../StudentExerciseSelector";
import { ExerciseWithSets } from "@/types/exercise";
import DaySelector from "./exercise/DaySelector";
import useDayManagement from "./exercise/useDayManagement";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell } from "lucide-react";
import { Card } from "@/components/ui/card";

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
  // Use our custom hook for day management with fixed 5 days
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
  } = useDayManagement({
    initialDays: [1, 2, 3, 4, 5],
    initialDayLabels: {
      1: "روز اول",
      2: "روز دوم",
      3: "روز سوم",
      4: "روز چهارم",
      5: "روز پنجم",
    },
    onDayChange: setCurrentDay
  });

  // Animation variants
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

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mb-4 h-full flex flex-col rtl"
    >
      <motion.div variants={itemVariants}>
        <div className="flex flex-wrap items-center justify-between mb-4">
          <h3 className="font-semibold text-lg mb-2 sm:mb-0">
            برنامه تمرینی روز {toPersianNumbers(currentDay)}
          </h3>
        </div>
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
        />
      </motion.div>
      
      <motion.div variants={itemVariants} className="flex-1 overflow-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={`day-${currentDay}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="h-full"
          >
            <Card className="border border-gray-200/80 p-4 h-full">
              <StudentExerciseSelector 
                selectedExercises={selectedExercises}
                setSelectedExercises={setSelectedExercises}
                dayNumber={currentDay}
                exercises={exercises}
                dayLabel={getDayLabel(currentDay)}
              />
            </Card>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default StudentProgramExerciseContent;
