
import React from "react";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export interface DayItem {
  id: number;
  name: string;
}

interface DaySelectorProps {
  weekDays: DayItem[];
  currentDay: number | null;
  setCurrentDay: (day: number) => void;
}

const DaySelector: React.FC<DaySelectorProps> = ({
  weekDays,
  currentDay,
  setCurrentDay,
}) => {
  return (
    <div className="text-center mb-6 mt-2">
      <h3 className="text-lg font-medium mb-3">انتخاب روز هفته</h3>
      <ScrollArea className="w-full" orientation="horizontal">
        <div className="flex justify-center items-center space-x-1 space-x-reverse">
          {weekDays.map((day) => (
            <motion.button
              key={day.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentDay(day.id)}
              className={cn(
                "h-10 px-5 py-2 rounded-md border text-sm transition-all",
                currentDay === day.id 
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
  );
};

export default DaySelector;
