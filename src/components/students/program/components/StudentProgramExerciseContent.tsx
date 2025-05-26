
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import StudentExerciseSelector from "../StudentExerciseSelector";
import { ExerciseWithSets } from "@/types/exercise";
import DaySelector from "./exercise/DaySelector";
import useDayManagement from "./exercise/useDayManagement";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell } from "lucide-react";
import ProgramSpeechToText from "./ProgramSpeechToText";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  
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
    initialDays: [1, 2, 3, 4, 5, 6], // Updated to include day 6
    initialDayLabels: {
      1: "روز اول",
      2: "روز دوم",
      3: "روز سوم",
      4: "روز چهارم",
      5: "روز پنجم",
      6: "روز ششم", // Added day 6
    },
    onDayChange: setCurrentDay
  });

  const handleSpeechSave = (transcript: string) => {
    // Parse the transcript to extract exercise names
    const exerciseNames = transcript
      .split(/[،,\n]/)
      .map(name => name.trim())
      .filter(name => name.length > 0);

    if (exerciseNames.length === 0) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "هیچ تمرینی در متن گفتاری یافت نشد"
      });
      return;
    }

    // Find matching exercises
    const matchedExercises: ExerciseWithSets[] = [];
    
    exerciseNames.forEach(name => {
      const foundExercise = exercises.find(exercise => 
        exercise.name.includes(name) || name.includes(exercise.name)
      );
      
      if (foundExercise) {
        const exerciseWithSets: ExerciseWithSets = {
          ...foundExercise,
          sets: 3,
          reps: "8-12"
        };
        
        const isAlreadySelected = selectedExercises.some(ex => ex.id === foundExercise.id);
        if (!isAlreadySelected) {
          matchedExercises.push(exerciseWithSets);
        }
      }
    });

    if (matchedExercises.length > 0) {
      setSelectedExercises(prev => [...prev, ...matchedExercises]);
      toast({
        title: "افزودن موفق",
        description: `${toPersianNumbers(matchedExercises.length)} تمرین از گفتار شما اضافه شد`
      });
    } else {
      toast({
        variant: "destructive",
        title: "هیچ تمرینی یافت نشد",
        description: "لطفا نام تمرین‌ها را واضح‌تر بیان کنید"
      });
    }
  };

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
      <div className="text-right" dir="rtl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mb-4 h-full flex flex-col rtl"
        >
          <motion.div variants={itemVariants}>
            <div className="flex flex-wrap items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-lg mb-2 sm:mb-0 text-right">
                  برنامه تمرینی روز {toPersianNumbers(currentDay)}
                </h3>
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

          {/* Speech to Text for Exercise Input */}
          <motion.div variants={itemVariants} className="mb-4">
            <ProgramSpeechToText
              onSave={handleSpeechSave}
              title="افزودن تمرین با گفتار"
              placeholder="نام تمرین‌های مورد نظر را بگویید"
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
                <div dir="rtl" className="text-right">
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
          </motion.div>
        </motion.div>
      </div>
    </TabsContent>
  );
};

export default StudentProgramExerciseContent;
