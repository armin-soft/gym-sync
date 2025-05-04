
import React, { ReactNode } from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WeekDay } from "@/types/meal";
import { cn } from "@/lib/utils";

interface DayTabsProps {
  weekDays: WeekDay[];
  selectedDay: WeekDay;
  onDayChange: (day: WeekDay) => void;
  children?: ReactNode;
}

export const DayTabs = ({ weekDays, selectedDay, onDayChange, children }: DayTabsProps) => {
  // Sort weekDays based on order
  const dayOrder: Record<WeekDay, number> = {
    'شنبه': 0,
    'یکشنبه': 1,
    'دوشنبه': 2,
    'سه‌شنبه': 3,
    'چهارشنبه': 4,
    'پنجشنبه': 5,
    'جمعه': 6
  };

  const sortedWeekDays = [...weekDays].sort((a, b) => dayOrder[a] - dayOrder[b]);

  return (
    <div className="bg-gradient-to-b from-background via-background/95 to-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10 pb-2 sm:pb-4">
      <TabsList className="w-full flex justify-between gap-1 bg-muted/30 p-1 rounded-xl">
        {sortedWeekDays.map((day) => (
          <TabsTrigger 
            key={day} 
            value={day}
            onClick={() => onDayChange(day)}
            className={cn(
              "flex-1 text-xs xs:text-sm sm:text-base px-1.5 xs:px-2 sm:px-4 py-1.5 sm:py-3 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
              "transition-all duration-300 hover:bg-primary/10 data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20",
              "data-[state=active]:scale-105 relative overflow-hidden group"
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative whitespace-nowrap">
              {day}
            </div>
          </TabsTrigger>
        ))}
      </TabsList>
      {children}
    </div>
  );
};
