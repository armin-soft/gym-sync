
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { toPersianNumbers } from "@/lib/utils/numbers";
import StudentDietSelector from "@/components/students/program/StudentDietSelector";
import { DayItem } from "./DaySelector";

interface DayContentProps {
  currentDay: number;
  weekDays: DayItem[];
  selectedMeals: number[];
  setSelectedMeals: React.Dispatch<React.SetStateAction<number[]>>;
  meals: any[];
}

const DayContent: React.FC<DayContentProps> = ({
  currentDay,
  weekDays,
  selectedMeals,
  setSelectedMeals,
  meals
}) => {
  // Get the current day name
  const currentDayName = weekDays.find(d => d.id === currentDay)?.name;
  
  // Filter meals for the current day type
  useEffect(() => {
    const daySpecificMeals = meals.filter(meal => {
      return meal.day === currentDayName;
    });
    
    // If there are day specific meals and no selection yet, auto-select them
    if (daySpecificMeals.length > 0 && selectedMeals.length === 0) {
      const dayMealIds = daySpecificMeals.map(meal => meal.id);
      setSelectedMeals(dayMealIds);
    }
  }, [currentDay, currentDayName, meals, selectedMeals.length, setSelectedMeals]);

  return (
    <motion.div
      key={`day-${currentDay}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex-1"
    >
      <div className="bg-gray-50 p-3 rounded-md mb-4">
        <h4 className="font-medium text-green-700">
          وعده‌های غذایی روز {weekDays.find(d => d.id === currentDay)?.name}
        </h4>
        <p className="text-sm text-gray-500">
          {toPersianNumbers(selectedMeals.length)} وعده انتخاب شده
        </p>
      </div>
      
      <StudentDietSelector 
        meals={meals}
        selectedMeals={selectedMeals}
        setSelectedMeals={setSelectedMeals}
        currentDay={currentDay}
      />
    </motion.div>
  );
};

export default DayContent;
