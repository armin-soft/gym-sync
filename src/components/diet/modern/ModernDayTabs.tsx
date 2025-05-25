
import React, { ReactNode } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WeekDay } from "@/types/meal";
import { cn } from "@/lib/utils";

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
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-20 pb-4 border-b border-gray-200/50 dark:border-gray-700/50">
        
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white text-right">
            انتخاب روز هفته
          </h2>
        </div>

        <TabsList className="w-full grid grid-cols-7 gap-1 bg-gray-100/50 dark:bg-gray-800/50 p-1 rounded-xl">
          {sortedWeekDays.map((day) => {
            const hasContent = daysWithContent.includes(day);
            const isActive = selectedDay === day;
            
            return (
              <TabsTrigger 
                key={day} 
                value={day}
                className={cn(
                  "relative flex flex-col items-center justify-center p-2 sm:p-3 rounded-lg transition-all min-h-[50px] sm:min-h-[60px] text-xs sm:text-sm",
                  "data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
                )}
              >
                {hasContent && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full" />
                )}
                
                <div className="font-medium text-center leading-tight">
                  {day}
                </div>
                
                <div className="text-xs mt-1 opacity-75 text-center">
                  {hasContent ? "دارای برنامه" : "خالی"}
                </div>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </div>
      
      {children}
    </div>
  );
};
