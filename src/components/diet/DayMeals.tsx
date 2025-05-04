
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { useDeviceInfo } from "@/hooks/use-mobile";
import type { Meal, MealType, WeekDay } from "@/types/meal";
import { DayTabs } from "./DayTabs";
import { DayContent } from "./DayContent";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";

interface DayMealsProps {
  meals: Meal[];
  mealTypes: MealType[];
  onEdit: (meal: Meal) => void;
  onDelete: (id: number) => void;
}

// Define weekdays array with correct type
const weekDays: WeekDay[] = [
  'شنبه', 
  'یکشنبه', 
  'دوشنبه', 
  'سه‌شنبه', 
  'چهارشنبه', 
  'پنجشنبه', 
  'جمعه'
];

export const DayMeals = ({ meals, mealTypes, onEdit, onDelete }: DayMealsProps) => {
  // Get unique days from meals that have content - هنوز این را نگهداشتیم برای نمایش روزهای دارای محتوا در نشانگر
  const daysWithContent = Array.from(new Set(meals.map(meal => meal.day))).filter(Boolean) as WeekDay[];
  
  // استفاده از همه روزهای هفته به جای فقط روزهایی که محتوا دارند
  const [selectedDay, setSelectedDay] = useState<WeekDay>(weekDays[0]);
  const deviceInfo = useDeviceInfo();
  
  // Fix: Create a handler function to properly cast the string to WeekDay
  const handleDayChange = (value: string) => {
    setSelectedDay(value as WeekDay);
  };
  
  return (
    <div dir="rtl" className="relative">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        <Tabs value={selectedDay} onValueChange={handleDayChange} className="w-full">
          <ScrollArea 
            className="w-full overflow-hidden" 
            orientation="horizontal"
          >
            <div className="min-h-[600px] pb-4">
              <DayTabs 
                weekDays={weekDays} 
                selectedDay={selectedDay} 
                onDayChange={(day) => setSelectedDay(day)}
                daysWithContent={daysWithContent}
              >
                {weekDays.map((day) => {
                  // Filter meals for current day
                  const dayMeals = meals.filter(meal => meal.day === day);
                  
                  return (
                    <TabsContent 
                      key={day} 
                      value={day} 
                      className="mt-6 relative"
                    >
                      <DayContent
                        key={day}
                        day={day}
                        mealTypes={mealTypes}
                        meals={dayMeals}
                        onEdit={onEdit}
                        onDelete={onDelete}
                      />
                    </TabsContent>
                  );
                })}
              </DayTabs>
            </div>
          </ScrollArea>
        </Tabs>
      </motion.div>
    </div>
  );
};
