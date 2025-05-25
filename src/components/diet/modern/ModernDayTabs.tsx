
import React, { ReactNode } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WeekDay } from "@/types/meal";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ModernDayTabsProps {
  weekDays: WeekDay[];
  selectedDay: WeekDay;
  onDayChange: (day: WeekDay) => void;
  daysWithContent?: WeekDay[];
  children?: ReactNode;
}

export const ModernDayTabs = ({ weekDays, selectedDay, onDayChange, daysWithContent = [], children }: ModernDayTabsProps) => {
  const dayOrder: Record<WeekDay, number> = {
    'شنبه': 0,
    'یکشنبه': 1,
    'دوشنبه': 2,
    'سه شنبه': 3,
    'چهارشنبه': 4,
    'پنج شنبه': 5,
    'جمعه': 6
  };

  const sortedWeekDays = [...weekDays].sort((a, b) => dayOrder[a] - dayOrder[b]);

  return (
    <div className="w-full" dir="rtl">
      <div className="bg-gradient-to-r from-white/90 via-white/95 to-gray-50/90 dark:from-gray-900/90 dark:via-gray-900/95 dark:to-gray-800/90 backdrop-blur-xl sticky top-0 z-30 pb-6 border-b border-gradient-to-r from-transparent via-gray-200/50 to-transparent dark:via-gray-700/50">
        
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white text-right bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            انتخاب روز هفته
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            روزی را برای مشاهده برنامه غذایی انتخاب کنید
          </p>
        </motion.div>

        <TabsList className="w-full grid grid-cols-7 gap-2 bg-gray-100/60 dark:bg-gray-800/60 backdrop-blur-sm p-2 rounded-2xl border border-gray-200/30 dark:border-gray-700/30">
          {sortedWeekDays.map((day, index) => {
            const hasContent = daysWithContent.includes(day);
            const isActive = selectedDay === day;
            
            return (
              <motion.div
                key={day}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <TabsTrigger 
                  value={day}
                  className={cn(
                    "relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl transition-all duration-300 min-h-[60px] sm:min-h-[70px] text-xs sm:text-sm font-medium",
                    "data-[state=active]:bg-gradient-to-br data-[state=active]:from-emerald-500 data-[state=active]:to-teal-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-emerald-500/30",
                    "hover:bg-white/80 dark:hover:bg-gray-700/80 hover:scale-105"
                  )}
                >
                  {hasContent && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-orange-400 to-red-500 rounded-full shadow-lg"
                    />
                  )}
                  
                  <div className="font-bold text-center leading-tight">
                    {day}
                  </div>
                  
                  <div className={cn(
                    "text-xs mt-1 text-center transition-colors duration-200",
                    isActive ? "text-white/90" : "text-gray-500 dark:text-gray-400"
                  )}>
                    {hasContent ? "دارای برنامه" : "خالی"}
                  </div>
                </TabsTrigger>
              </motion.div>
            );
          })}
        </TabsList>
      </div>
      
      {children}
    </div>
  );
};
