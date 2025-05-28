
import React, { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import StudentDietSelector from "../StudentDietSelector";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Utensils, Calendar, ChefHat } from "lucide-react";

interface StudentProgramDietContentProps {
  selectedMeals: number[];
  setSelectedMeals: React.Dispatch<React.SetStateAction<number[]>>;
  meals: any[];
  currentDietDay?: number;
  setCurrentDietDay?: React.Dispatch<React.SetStateAction<number>>;
}

const weekDays = [
  { id: 1, name: "شنبه" },
  { id: 2, name: "یکشنبه" },
  { id: 3, name: "دوشنبه" },
  { id: 4, name: "سه‌شنبه" },
  { id: 5, name: "چهارشنبه" },
  { id: 6, name: "پنج‌شنبه" },
  { id: 7, name: "جمعه" },
];

const mealTypes = [
  { id: 1, name: "صبحانه" },
  { id: 2, name: "میان‌وعده صبح" },
  { id: 3, name: "ناهار" },
  { id: 4, name: "میان‌وعده عصر" },
  { id: 5, name: "شام" },
  { id: 6, name: "میان‌وعده شب" },
];

const StudentProgramDietContent: React.FC<StudentProgramDietContentProps> = ({
  selectedMeals,
  setSelectedMeals,
  meals,
  currentDietDay = 1,
  setCurrentDietDay = () => {}
}) => {
  const [currentMealType, setCurrentMealType] = useState<string>("all");

  // Reset meal type when day changes
  useEffect(() => {
    setCurrentMealType("all");
  }, [currentDietDay]);

  const getCurrentDayName = () => {
    const day = weekDays.find(d => d.id === currentDietDay);
    return day ? day.name : `روز ${toPersianNumbers(currentDietDay)}`;
  };

  return (
    <TabsContent value="diet" className="m-0 h-full" style={{ direction: "rtl" }} dir="rtl">
      <div className="h-full flex flex-col p-6 text-right">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <Utensils className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  برنامه غذایی {getCurrentDayName()}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    برنامه‌ریزی وعده‌های غذایی
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/30 px-4 py-2 rounded-xl">
              <ChefHat className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-green-700 dark:text-green-300">
                {toPersianNumbers(selectedMeals.length)} غذا انتخاب شده
              </span>
            </div>
          </div>
        </motion.div>
        
        {/* Day selector */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 text-center">انتخاب روز هفته</h4>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {weekDays.map((day) => (
                <motion.button
                  key={day.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentDietDay(day.id)}
                  className={cn(
                    "px-4 py-2 rounded-lg font-medium transition-all text-center min-w-[80px]",
                    currentDietDay === day.id 
                      ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg" 
                      : "bg-white/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-600/50 hover:bg-gray-50 dark:hover:bg-gray-600/80"
                  )}
                >
                  {day.name}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Meal type selector */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 text-center">انتخاب نوع وعده</h4>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentMealType("all")}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium transition-all text-center",
                  currentMealType === "all"
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                    : "bg-white/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-600/50 hover:bg-gray-50 dark:hover:bg-gray-600/80"
                )}
              >
                همه وعده‌ها
              </motion.button>
              
              {mealTypes.map((mealType) => (
                <motion.button
                  key={mealType.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentMealType(mealType.name)}
                  className={cn(
                    "px-4 py-2 rounded-lg font-medium transition-all text-center",
                    currentMealType === mealType.name
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                      : "bg-white/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-600/50 hover:bg-gray-50 dark:hover:bg-gray-600/80"
                  )}
                >
                  {mealType.name}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Diet Content */}
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentDietDay}-${currentMealType}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm"
            >
              <div className="h-full p-4" style={{ direction: "rtl" }} dir="rtl">
                <StudentDietSelector
                  selectedMeals={selectedMeals}
                  setSelectedMeals={setSelectedMeals}
                  meals={meals}
                  currentDay={currentDietDay}
                  currentMealType={currentMealType}
                  dayLabel={getCurrentDayName()}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </TabsContent>
  );
};

export default StudentProgramDietContent;
