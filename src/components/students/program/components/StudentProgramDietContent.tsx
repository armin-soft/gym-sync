
import React, { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import StudentDietSelector from "../StudentDietSelector";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Utensils, CalendarDays, Coffee, Clock } from "lucide-react";

interface StudentProgramDietContentProps {
  selectedMeals: number[];
  setSelectedMeals: React.Dispatch<React.SetStateAction<number[]>>;
  meals: any[];
  currentDietDay?: number;
  setCurrentDietDay?: React.Dispatch<React.SetStateAction<number>>;
}

const weekDays = [
  { id: 1, name: "شنبه", icon: "ش" },
  { id: 2, name: "یکشنبه", icon: "ی" },
  { id: 3, name: "دوشنبه", icon: "د" },
  { id: 4, name: "سه شنبه", icon: "س" },
  { id: 5, name: "چهارشنبه", icon: "چ" },
  { id: 6, name: "پنج شنبه", icon: "پ" },
  { id: 7, name: "جمعه", icon: "ج" },
];

const mealTypes = [
  { id: 1, name: "صبحانه", icon: Coffee, gradient: "from-orange-400 to-red-500" },
  { id: 2, name: "میان وعده صبح", icon: Clock, gradient: "from-yellow-400 to-orange-500" },
  { id: 3, name: "ناهار", icon: Utensils, gradient: "from-green-400 to-emerald-500" },
  { id: 4, name: "میان وعده عصر", icon: Clock, gradient: "from-blue-400 to-indigo-500" },
  { id: 5, name: "شام", icon: Utensils, gradient: "from-purple-400 to-pink-500" },
  { id: 6, name: "میان وعده", icon: Clock, gradient: "from-teal-400 to-cyan-500" },
];

const StudentProgramDietContent: React.FC<StudentProgramDietContentProps> = ({
  selectedMeals,
  setSelectedMeals,
  meals,
  currentDietDay = 1,
  setCurrentDietDay = () => {}
}) => {
  const [currentMealType, setCurrentMealType] = useState<string>("all");

  useEffect(() => {
    setCurrentMealType("all");
  }, [currentDietDay]);

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

  const currentDayName = weekDays.find(d => d.id === currentDietDay)?.name || `روز ${toPersianNumbers(currentDietDay)}`;
  const currentMealTypeObj = mealTypes.find(m => m.name === currentMealType);

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
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <Utensils className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  برنامه غذایی {currentDayName}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <CalendarDays className="w-4 h-4" />
                  <span>روز {toPersianNumbers(currentDietDay)} هفته</span>
                  {currentMealType !== "all" && (
                    <Badge variant="secondary" className="text-xs">
                      {currentMealType}
                    </Badge>
                  )}
                </p>
              </div>
            </div>
            
            <Card className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border-emerald-200/50 dark:border-emerald-700/50">
              <CardContent className="p-4 text-center">
                <Utensils className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mx-auto mb-2" />
                <p className="text-sm text-emerald-600 dark:text-emerald-400">غذاهای انتخاب شده</p>
                <p className="text-lg font-bold text-emerald-800 dark:text-emerald-300">
                  {toPersianNumbers(selectedMeals.length)}
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
        
        {/* Day Selector */}
        <motion.div variants={itemVariants} className="mb-6">
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-center">
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {weekDays.map((day) => (
                    <motion.button
                      key={day.id}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentDietDay(day.id)}
                      className={cn(
                        "relative h-12 w-12 rounded-xl transition-all duration-300 flex flex-col items-center justify-center",
                        currentDietDay === day.id 
                          ? "bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-lg transform scale-105" 
                          : "bg-white/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 border border-gray-200/80 dark:border-gray-600/80 hover:bg-gray-50 dark:hover:bg-gray-600"
                      )}
                    >
                      <span className="text-xs font-bold">{day.icon}</span>
                      <span className="text-[10px]">{day.name.slice(0, 2)}</span>
                      {currentDietDay === day.id && (
                        <motion.div
                          layoutId="dayIndicator"
                          className="absolute -bottom-1 w-2 h-2 bg-white rounded-full"
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Meal Type Selector */}
        <motion.div variants={itemVariants} className="mb-6">
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-center">
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentMealType("all")}
                    className={cn(
                      "h-10 px-4 py-2 rounded-lg transition-all flex items-center gap-2",
                      currentMealType === "all"
                        ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md"
                        : "bg-white/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 border border-gray-200/80 dark:border-gray-600/80 hover:bg-gray-50 dark:hover:bg-gray-600"
                    )}
                  >
                    همه وعده‌ها
                  </motion.button>
                  
                  {mealTypes.map((mealType) => {
                    const Icon = mealType.icon;
                    const isActive = currentMealType === mealType.name;
                    
                    return (
                      <motion.button
                        key={mealType.id}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCurrentMealType(mealType.name)}
                        className={cn(
                          "h-10 px-3 py-2 rounded-lg transition-all flex items-center gap-2",
                          isActive
                            ? `bg-gradient-to-br ${mealType.gradient} text-white shadow-md`
                            : "bg-white/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 border border-gray-200/80 dark:border-gray-600/80 hover:bg-gray-50 dark:hover:bg-gray-600"
                        )}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm">{mealType.name}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Diet Content */}
        <motion.div variants={itemVariants} className="flex-1 overflow-hidden">
          <Card className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
            <CardContent className="p-0 h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${currentDietDay}-${currentMealType}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                >
                  <StudentDietSelector
                    selectedMeals={selectedMeals}
                    setSelectedMeals={setSelectedMeals}
                    meals={meals}
                    currentDay={currentDietDay}
                    currentMealType={currentMealType}
                    dayLabel={weekDays.find(d => d.id === currentDietDay)?.name}
                  />
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default StudentProgramDietContent;
