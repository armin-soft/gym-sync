
import React from "react";
import { motion } from "framer-motion";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { WEEK_DAYS } from "./utils";

interface DaySelectorProps {
  selectedDay: string;
  onDayChange: (day: string) => void;
  getDayMeals: (day: string) => any[];
}

export const DaySelector: React.FC<DaySelectorProps> = ({
  selectedDay,
  onDayChange,
  getDayMeals
}) => {
  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg p-2 mb-6">
      <TabsList className="grid w-full grid-cols-7 bg-transparent h-auto p-0 gap-1" dir="rtl">
        {WEEK_DAYS.map((day, index) => {
          const dayMealCount = getDayMeals(day).length;
          const isSelected = selectedDay === day;
          
          return (
            <motion.div
              key={day}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <TabsTrigger
                value={day}
                className={cn(
                  "relative w-full h-16 p-2 rounded-xl transition-all duration-300 flex flex-col items-center justify-center gap-1 border-2",
                  isSelected 
                    ? "bg-gradient-to-br from-emerald-500 to-teal-500 text-white border-emerald-400 shadow-lg shadow-emerald-200/50 dark:shadow-emerald-900/30" 
                    : "bg-gray-50/80 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 border-gray-200/50 dark:border-gray-600/50 hover:bg-emerald-50/80 dark:hover:bg-emerald-950/20 hover:border-emerald-200 dark:hover:border-emerald-700"
                )}
              >
                <div className="text-center">
                  <div className={cn(
                    "text-xs font-bold leading-tight",
                    isSelected ? "text-white" : "text-gray-700 dark:text-gray-300"
                  )}>
                    {day}
                  </div>
                  {dayMealCount > 0 && (
                    <Badge 
                      variant="secondary" 
                      className={cn(
                        "text-2xs px-1.5 py-0.5 mt-1 h-4 min-w-[16px]",
                        isSelected 
                          ? "bg-white/20 text-white border-white/30" 
                          : "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700"
                      )}
                    >
                      {toPersianNumbers(dayMealCount)}
                    </Badge>
                  )}
                </div>
              </TabsTrigger>
            </motion.div>
          );
        })}
      </TabsList>
    </div>
  );
};
