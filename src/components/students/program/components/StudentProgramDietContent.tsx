
import React, { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import StudentDietSelector from "../StudentDietSelector";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Utensils } from "lucide-react";
import { MealType } from "@/types/meal";

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
  { id: 6, name: "میان وعده شب" },
];

const StudentProgramDietContent: React.FC<StudentProgramDietContentProps> = ({
  selectedMeals,
  setSelectedMeals,
  meals,
  currentDietDay = 0, // Changed to 0 to represent no selection
  setCurrentDietDay = () => {}
}) => {
  const [currentMealType, setCurrentMealType] = useState<number>(0); // 0 means all meal types

  // Reset meal type when day changes
  useEffect(() => {
    setCurrentMealType(0);
  }, [currentDietDay]);

  // Filter meals by selected type if a specific type is selected
  const filteredMeals = currentMealType === 0 
    ? meals 
    : meals.filter(meal => {
        const typeName = mealTypes.find(t => t.id === currentMealType)?.name;
        return meal.type === typeName;
      });

  return (
    <TabsContent value="diet" className="m-0 h-full" dir="rtl">
      <div className="mb-4 h-full flex flex-col">
        <h3 className="font-semibold text-lg mb-4 text-center">
          برنامه غذایی {currentDietDay ? `روز ${toPersianNumbers(currentDietDay)}` : ''}
        </h3>
        
        {/* Day selector */}
        <div className="flex items-center justify-center mb-4">
          <ScrollArea className="w-full max-w-3xl" orientation="horizontal">
            <div className="flex items-center justify-center space-x-1 space-x-reverse">
              {weekDays.map((day) => (
                <motion.button
                  key={day.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentDietDay(day.id)}
                  className={cn(
                    "h-10 px-4 py-2 rounded-md border text-sm transition-all",
                    currentDietDay === day.id 
                      ? "bg-green-500 text-white border-green-500" 
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                  )}
                >
                  {day.name}
                </motion.button>
              ))}
            </div>
          </ScrollArea>
        </div>
        
        {/* Only show meal type selector if a day is selected */}
        {currentDietDay > 0 && (
          <div className="flex items-center justify-center mb-6">
            <ScrollArea className="w-full max-w-3xl" orientation="horizontal">
              <div className="flex items-center justify-center space-x-1 space-x-reverse">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentMealType(0)}
                  className={cn(
                    "h-10 px-4 py-2 rounded-md border text-sm transition-all",
                    currentMealType === 0
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                  )}
                >
                  همه وعده‌ها
                </motion.button>
                {mealTypes.map((type) => (
                  <motion.button
                    key={type.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentMealType(type.id)}
                    className={cn(
                      "h-10 px-4 py-2 rounded-md border text-sm transition-all",
                      currentMealType === type.id 
                        ? "bg-blue-500 text-white border-blue-500" 
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                    )}
                  >
                    {type.name}
                  </motion.button>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
        
        <div className="flex-1 overflow-auto">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <StudentDietSelector 
              meals={filteredMeals}
              selectedMeals={selectedMeals}
              setSelectedMeals={setSelectedMeals}
              currentDay={currentDietDay}
              currentMealType={currentMealType > 0 ? mealTypes.find(t => t.id === currentMealType)?.name as MealType : undefined}
            />
          </div>
        </div>
      </div>
    </TabsContent>
  );
};

export default StudentProgramDietContent;
