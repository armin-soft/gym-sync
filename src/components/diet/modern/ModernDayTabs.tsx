
import React, { ReactNode } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WeekDay } from "@/types/meal";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Calendar, CheckCircle } from "lucide-react";

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
    <div className="w-full">
      <div className="bg-gradient-to-b from-white/80 via-white/60 to-transparent dark:from-gray-900/80 dark:via-gray-900/60 backdrop-blur-lg sticky top-0 z-20 pb-6 w-full border-b border-gray-200/30 dark:border-gray-700/30">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              انتخاب روز هفته
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              برنامه غذایی مورد نظر را از روزهای هفته انتخاب کنید
            </p>
          </div>
        </div>

        {/* Tabs */}
        <TabsList className="w-full grid grid-cols-7 gap-2 bg-gray-100/50 dark:bg-gray-800/50 p-2 rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
          {sortedWeekDays.map((day) => {
            const hasContent = daysWithContent.includes(day);
            const isActive = selectedDay === day;
            
            return (
              <TabsTrigger 
                key={day} 
                value={day}
                className={cn(
                  "relative flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 hover:scale-105 group min-h-[80px]",
                  "data-[state=active]:bg-gradient-to-br data-[state=active]:from-emerald-500 data-[state=active]:to-teal-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-emerald-500/25",
                  !isActive && "hover:bg-white/70 dark:hover:bg-gray-700/70"
                )}
              >
                {/* Background glow for active tab */}
                {isActive && (
                  <motion.div 
                    layoutId="activeTabGlow"
                    className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 rounded-xl blur-lg -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                
                {/* Content indicator */}
                {hasContent && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <CheckCircle className="w-3 h-3 text-white" />
                  </motion.div>
                )}
                
                {/* Day name */}
                <div className={cn(
                  "font-bold text-sm transition-colors",
                  isActive ? "text-white" : "text-gray-700 dark:text-gray-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400"
                )}>
                  {day}
                </div>
                
                {/* Status indicator */}
                <div className={cn(
                  "text-xs mt-1 font-medium",
                  isActive ? "text-emerald-100" : hasContent ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-500"
                )}>
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
