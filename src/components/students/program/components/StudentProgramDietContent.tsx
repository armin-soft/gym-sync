
import React, { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import StudentDietSelector from "../StudentDietSelector";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Utensils } from "lucide-react";
import { MealType } from "@/types/meal";
import { Badge } from "@/components/ui/badge";

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
  { id: 4, name: "سه شنبه" },
  { id: 5, name: "چهارشنبه" },
  { id: 6, name: "پنج شنبه" },
  { id: 7, name: "جمعه" },
];

const mealTypes = [
  { id: 1, name: "صبحانه" },
  { id: 2, name: "میان وعده صبح" },
  { id: 3, name: "ناهار" },
  { id: 4, name: "میان وعده عصر" },
  { id: 5, name: "شام" },
  { id: 6, name: "میان وعده" },
];

const StudentProgramDietContent: React.FC<StudentProgramDietContentProps> = ({
  selectedMeals,
  setSelectedMeals,
  meals,
  currentDietDay = 0, // Changed to 0 to represent no selection
  setCurrentDietDay = () => {}
}) => {
  const [currentMealType, setCurrentMealType] = useState<number>(0); // 0 means all meal types
  const [activeMealTypeCount, setActiveMealTypeCount] = useState<Record<number, number>>({});

  // Reset meal type when day changes
  useEffect(() => {
    setCurrentMealType(0);
  }, [currentDietDay]);

  // Count meals by type
  useEffect(() => {
    if (meals && meals.length > 0) {
      const counts: Record<number, number> = {};
      
      meals.forEach(meal => {
        const typeObj = mealTypes.find(t => t.name === meal.type);
        if (typeObj) {
          counts[typeObj.id] = (counts[typeObj.id] || 0) + 1;
        }
      });
      
      setActiveMealTypeCount(counts);
    }
  }, [meals]);

  // Filter meals by selected type if a specific type is selected
  const filteredMeals = currentMealType === 0 
    ? meals 
    : meals.filter(meal => {
        const typeName = mealTypes.find(t => t.id === currentMealType)?.name;
        return meal.type === typeName;
      });

  // Animation variants
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
    <TabsContent value="diet" className="m-0 h-full" dir="rtl">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="mb-4 h-full flex flex-col"
      >
        <motion.div variants={itemVariants}>
          <h3 className="font-semibold text-lg mb-4 text-right">
            برنامه غذایی {currentDietDay ? `روز ${toPersianNumbers(currentDietDay)}` : ''}
          </h3>
        </motion.div>
        
        {/* Day selector */}
        <motion.div variants={itemVariants} className="mb-4">
          <ScrollArea className="w-full" orientation="horizontal">
            <div className="flex items-center justify-start space-x-1 space-x-reverse pb-2">
              {weekDays.map((day) => (
                <motion.button
                  key={day.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentDietDay(day.id)}
                  className={cn(
                    "h-10 px-4 py-2 rounded-lg transition-all",
                    currentDietDay === day.id 
                      ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-md" 
                      : "bg-white/80 text-gray-700 border border-gray-200/80 hover:bg-gray-50"
                  )}
                >
                  {day.name}
                </motion.button>
              ))}
            </div>
          </ScrollArea>
        </motion.div>
        
        {/* Only show meal type selector if a day is selected */}
        {currentDietDay > 0 && (
          <motion.div variants={itemVariants} className="mb-6">
            <ScrollArea className="w-full" orientation="horizontal">
              <div className="flex items-center justify-start space-x-1 space-x-reverse pb-2">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentMealType(0)}
                  className={cn(
                    "h-10 px-4 py-2 rounded-lg transition-all flex items-center gap-2",
                    currentMealType === 0
                      ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md"
                      : "bg-white/80 text-gray-700 border border-gray-200/80 hover:bg-gray-50"
                  )}
                >
                  <span>همه وعده‌ها</span>
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    {toPersianNumbers(meals.length)}
                  </Badge>
                </motion.button>
                {mealTypes.map((type) => (
                  <motion.button
                    key={type.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentMealType(type.id)}
                    className={cn(
                      "h-10 px-4 py-2 rounded-lg transition-all flex items-center gap-2",
                      currentMealType === type.id 
                        ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md" 
                        : "bg-white/80 text-gray-700 border border-gray-200/80 hover:bg-gray-50"
                    )}
                  >
                    <span>{type.name}</span>
                    {activeMealTypeCount[type.id] > 0 && (
                      <Badge variant="secondary" className={cn(
                        "text-xs",
                        currentMealType === type.id 
                          ? "bg-white/20 text-white" 
                          : "bg-gray-100 text-gray-700"
                      )}>
                        {toPersianNumbers(activeMealTypeCount[type.id] || 0)}
                      </Badge>
                    )}
                  </motion.button>
                ))}
              </div>
            </ScrollArea>
          </motion.div>
        )}
        
        <motion.div variants={itemVariants} className="flex-1 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={`day-${currentDietDay}-type-${currentMealType}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full"
            >
              {currentDietDay > 0 ? (
                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm border border-gray-100/80">
                  <StudentDietSelector 
                    meals={filteredMeals}
                    selectedMeals={selectedMeals}
                    setSelectedMeals={setSelectedMeals}
                    currentDay={currentDietDay}
                    currentMealType={currentMealType > 0 ? mealTypes.find(t => t.id === currentMealType)?.name as MealType : undefined}
                  />
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-muted/30 to-muted/10 backdrop-blur-sm border border-border/30 shadow-sm max-w-md">
                    <div className="mx-auto w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
                      <Utensils className="w-8 h-8 text-green-500" />
                    </div>
                    <h4 className="text-xl font-semibold mb-2">انتخاب روز</h4>
                    <p className="text-muted-foreground mb-4">
                      لطفاً یک روز را از منوی بالا انتخاب کنید تا بتوانید برنامه غذایی را مشاهده و مدیریت نمایید.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </TabsContent>
  );
};

export default StudentProgramDietContent;
