
import React from "react";
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
