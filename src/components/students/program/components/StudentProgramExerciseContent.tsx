
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import StudentExerciseSelector from "../StudentExerciseSelector";
import { ExerciseWithSets } from "@/types/exercise";
import DaySelector from "./exercise/DaySelector";
import AddDayDialog from "./exercise/AddDayDialog";
import DeleteDayDialog from "./exercise/DeleteDayDialog";
import useDayManagement from "./exercise/useDayManagement";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  // Use our custom hook for day management
  const {
    days,
    dayLabels,
    editingDay,
    setEditingDay,
    tempDayLabel,
    setTempDayLabel,
    showAddDayDialog,
    setShowAddDayDialog,
    showDeleteDayDialog,
    setShowDeleteDayDialog,
    dayToDelete,
    newDayLabel,
    setNewDayLabel,
    maxDays,
    getDayLabel,
    handleAddDay,
    confirmDeleteDay,
    handleDeleteDay,
  } = useDayManagement({
    initialDays: [1, 2, 3, 4],
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
    <TabsContent value="exercise" className="m-0 h-full">
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
            
            {/* Removed the Add Day button as requested */}
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
              {selectedExercises.length > 0 ? (
                <StudentExerciseSelector 
                  selectedExercises={selectedExercises}
                  setSelectedExercises={setSelectedExercises}
                  dayNumber={currentDay}
                  exercises={exercises}
                  dayLabel={getDayLabel(currentDay)}
                />
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-muted/30 to-muted/10 backdrop-blur-sm border border-border/30 shadow-sm max-w-md">
                    <div className="mx-auto w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                      <Dumbbell className="w-8 h-8 text-blue-500" />
                    </div>
                    <h4 className="text-xl font-semibold mb-2">هیچ تمرینی انتخاب نشده</h4>
                    <p className="text-muted-foreground mb-4">
                      برای روز {toPersianNumbers(currentDay)} هنوز هیچ تمرینی اضافه نشده است. میتوانید تمرینات را انتخاب کنید.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>
      
      {/* Add Day Dialog */}
      <AddDayDialog
        open={showAddDayDialog}
        onOpenChange={setShowAddDayDialog}
        newDayLabel={newDayLabel}
        setNewDayLabel={setNewDayLabel}
        handleAddDay={handleAddDay}
      />
      
      {/* Delete Day Dialog */}
      <DeleteDayDialog
        open={showDeleteDayDialog}
        onOpenChange={setShowDeleteDayDialog}
        dayLabel={dayToDelete ? getDayLabel(dayToDelete) : ''}
        onDelete={handleDeleteDay}
      />
    </TabsContent>
  );
};

export default StudentProgramExerciseContent;
