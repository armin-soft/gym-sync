
import React, { useState, useEffect } from "react";
import { useDeviceInfo } from "@/hooks/use-mobile";
import type { Meal, MealType, WeekDay } from "@/types/meal";
import { ModernDayTabs } from "./ModernDayTabs";
import { ModernDayContent } from "./ModernDayContent";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";

interface ModernDayMealsProps {
  meals: Meal[];
  mealTypes: MealType[];
  onEdit: (meal: Meal) => void;
  onDelete: (id: number) => void;
}

// تابع کمکی برای استاندارد کردن نام روزها
const normalizeDay = (day: string): string => {
  return day.replace(/\s+/g, ' ');
};

// تعریف روزهای هفته با نوع صحیح
const weekDays: WeekDay[] = [
  'شنبه', 
  'یکشنبه', 
  'دوشنبه', 
  'سه شنبه', 
  'چهارشنبه', 
  'پنج شنبه', 
  'جمعه'
];

export const ModernDayMeals = ({ meals, mealTypes, onEdit, onDelete }: ModernDayMealsProps) => {
  // دریافت روزهای دارای محتوا از وعده‌های غذایی
  const daysWithContent = Array.from(
    new Set(meals.map(meal => normalizeDay(meal.day || '')))
  ).filter(Boolean) as WeekDay[];
  
  const [selectedDay, setSelectedDay] = useState<WeekDay>(weekDays[0]);
  const deviceInfo = useDeviceInfo();
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, [meals, daysWithContent]);
  
  const handleDayChange = (value: string) => {
    if (isMounted) {
      setSelectedDay(value as WeekDay);
    }
  };
  
  const getDayMeals = (day: WeekDay): Meal[] => {
    const normalizedSelectedDay = normalizeDay(day);
    const dayMeals = meals.filter(meal => {
      const normalizedMealDay = normalizeDay(meal.day || '');
      return normalizedMealDay === normalizedSelectedDay;
    });
    return dayMeals;
  };
  
  return (
    <div dir="rtl" className="relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        <Tabs value={selectedDay} onValueChange={handleDayChange} className="w-full">
          <div className="min-h-[600px]">
            <ModernDayTabs 
              weekDays={weekDays} 
              selectedDay={selectedDay} 
              onDayChange={setSelectedDay}
              daysWithContent={daysWithContent}
            >
              {weekDays.map((day) => {
                const dayMeals = getDayMeals(day);
                
                return (
                  <TabsContent 
                    key={day} 
                    value={day} 
                    className="mt-8 relative"
                  >
                    <ModernDayContent
                      key={`day-content-${day}`}
                      day={day}
                      mealTypes={mealTypes}
                      meals={dayMeals}
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />
                  </TabsContent>
                );
              })}
            </ModernDayTabs>
          </div>
        </Tabs>
      </motion.div>
    </div>
  );
};
