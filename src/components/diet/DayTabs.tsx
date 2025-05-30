
import React, { ReactNode } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WeekDay } from "@/types/meal";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface DayTabsProps {
  weekDays: WeekDay[];
  selectedDay: WeekDay;
  onDayChange: (day: WeekDay) => void;
  daysWithContent?: WeekDay[];
  children?: ReactNode;
}

export const DayTabs = ({ weekDays, selectedDay, onDayChange, daysWithContent = [], children }: DayTabsProps) => {
  // Sort weekDays based on order
  const dayOrder: Record<WeekDay, number> = {
    'شنبه': 0,
    'یکشنبه': 1,
    'دوشنبه': 2,
    'سه شنبه': 3,
    'چهار شنبه': 4,
    'پنج شنبه': 5,
    'جمعه': 6
  };

  const sortedWeekDays = [...weekDays].sort((a, b) => dayOrder[a] - dayOrder[b]);

  return (
    <div className="w-full">
      <div className="bg-gradient-to-b from-background via-background/95 to-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10 pb-2 sm:pb-4 w-full">
        <TabsList className="w-full flex justify-between gap-1 bg-muted/30 p-1 rounded-xl">
          {sortedWeekDays.map((day) => {
            const hasContent = daysWithContent.includes(day);
            
            return (
              <TabsTrigger 
                key={day} 
                value={day}
                className={cn(
                  "flex-1 text-xs xs:text-sm sm:text-base px-1.5 xs:px-2 sm:px-4 py-1.5 sm:py-3 rounded-lg",
                  "transition-all duration-300 hover:bg-primary/10",
                  "relative overflow-hidden group",
                  hasContent ? "font-medium" : "font-normal"
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Animation indicator for active tab */}
                {selectedDay === day && (
                  <motion.div 
                    layoutId="active-tab-indicator"
                    className="absolute inset-0 bg-primary z-0 rounded-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                
                {/* Content Badge Indicator */}
                {hasContent && (
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-primary z-10"></span>
                )}
                
                <div className={cn(
                  "relative whitespace-nowrap z-10",
                  selectedDay === day ? "text-primary-foreground" : "",
                )}>
                  {day}
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
