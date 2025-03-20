
import React from 'react';
import { Calendar, ArrowLeft } from 'lucide-react';
import { WeekDay } from '@/types/meal';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MealDayTabsProps {
  selectedDay: WeekDay;
  setSelectedDay: (day: WeekDay) => void;
  weekDays: WeekDay[];
}

export const MealDayTabs: React.FC<MealDayTabsProps> = ({ 
  selectedDay, 
  setSelectedDay, 
  weekDays 
}) => {
  return (
    <div className="bg-gradient-to-b from-background via-background/95 to-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10 px-6 py-4">
      <Tabs 
        value={selectedDay} 
        onValueChange={(value) => setSelectedDay(value as WeekDay)}
        className="w-full"
      >
        <TabsList className="w-full flex justify-between gap-1 bg-muted/30 p-1 rounded-2xl">
          {weekDays.map((day, index) => (
            <TabsTrigger 
              key={day} 
              value={day}
              className="flex-1 px-4 py-3 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground 
                transition-all duration-300 gap-2 hover:bg-primary/10 data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20
                data-[state=active]:scale-105 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex flex-col items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">{day}</span>
                {index < weekDays.length - 1 && (
                  <ArrowLeft className="w-4 h-4 absolute -left-6 top-1/2 -translate-y-1/2 text-muted-foreground/30" />
                )}
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};
