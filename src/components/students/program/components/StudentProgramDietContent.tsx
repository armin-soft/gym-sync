
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import StudentDietSelector from "../StudentDietSelector";
import { motion, AnimatePresence } from "framer-motion";
import { UtensilsCrossed, Coffee, Apple, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { cn } from "@/lib/utils";

interface StudentProgramDietContentProps {
  selectedMeals: number[];
  setSelectedMeals: React.Dispatch<React.SetStateAction<number[]>>;
  meals: any[];
  currentDietDay: number;
  setCurrentDietDay: (day: number) => void;
}

const StudentProgramDietContent: React.FC<StudentProgramDietContentProps> = ({
  selectedMeals,
  setSelectedMeals,
  meals,
  currentDietDay,
  setCurrentDietDay,
}) => {
  const days = [1, 2, 3, 4, 5, 6, 7];
  const dayLabels = {
    1: "شنبه",
    2: "یکشنبه", 
    3: "دوشنبه",
    4: "سه‌شنبه",
    5: "چهارشنبه",
    6: "پنج‌شنبه",
    7: "جمعه"
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
    <TabsContent value="diet" className="m-0 h-full text-right" dir="rtl">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="h-full flex flex-col"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <Card className="border-0 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 p-4 sm:p-6 rounded-2xl shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <UtensilsCrossed className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200 text-right mb-1">
                    برنامه غذایی {dayLabels[currentDietDay as keyof typeof dayLabels]}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-right">
                    برنامه تغذیه متوازن و کامل
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-right" dir="rtl">
                <div className="text-center">
                  <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                    <Apple className="w-4 h-4" />
                    <span className="text-xs font-medium">وعده‌ها</span>
                  </div>
                  <div className="text-lg font-bold text-gray-800 dark:text-gray-200">
                    {toPersianNumbers(selectedMeals.length)}
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs font-medium">روز</span>
                  </div>
                  <div className="text-lg font-bold text-gray-800 dark:text-gray-200">
                    {toPersianNumbers(currentDietDay)}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-4">
          <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-xl p-3">
            <div className="grid grid-cols-3 sm:grid-cols-7 gap-1 sm:gap-2">
              {days.map((day) => (
                <Button
                  key={day}
                  onClick={() => setCurrentDietDay(day)}
                  variant={currentDietDay === day ? "default" : "ghost"}
                  className={cn(
                    "relative h-12 sm:h-14 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300",
                    currentDietDay === day
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg scale-105"
                      : "text-gray-600 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-green-950/20 hover:text-green-600"
                  )}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xs opacity-80">روز</span>
                    <span className="font-bold">{toPersianNumbers(day)}</span>
                    <span className="text-2xs hidden sm:block">
                      {dayLabels[day as keyof typeof dayLabels]}
                    </span>
                  </div>
                  
                  {currentDietDay === day && (
                    <motion.div
                      layoutId="dietDayIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-xl"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Button>
              ))}
            </div>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={`diet-day-${currentDietDay}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="h-full"
            >
              <Card className="h-full border-0 shadow-lg bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl overflow-hidden">
                <StudentDietSelector
                  selectedMeals={selectedMeals}
                  setSelectedMeals={setSelectedMeals}
                  meals={meals}
                  currentDay={currentDietDay}
                  dayLabel={dayLabels[currentDietDay as keyof typeof dayLabels]}
                />
              </Card>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </TabsContent>
  );
};

export default StudentProgramDietContent;
