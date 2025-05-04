
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { useDeviceInfo } from "@/hooks/use-mobile";
import type { Meal, MealType, WeekDay } from "@/types/meal";
import { DayTabs } from "./DayTabs";
import { DayContent } from "./DayContent";
import { TabsContent } from "@/components/ui/tabs";

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
  // Get unique days from meals that have content
  const daysWithContent = Array.from(new Set(meals.map(meal => meal.day))).filter(Boolean) as WeekDay[];
  const [selectedDay, setSelectedDay] = useState<WeekDay>(daysWithContent[0] || weekDays[0]);
  const deviceInfo = useDeviceInfo();
  
  return (
    <div dir="rtl">
      <ScrollArea className="w-full">
        <DayTabs 
          weekDays={weekDays} 
          selectedDay={selectedDay} 
          onDayChange={setSelectedDay}
        >
          {weekDays.map((day) => {
            // Filter meals for current day
            const dayMeals = meals.filter(meal => meal.day === day);
            
            return (
              <TabsContent key={day} value={day} className={dayMeals.length === 0 ? "flex items-center justify-center py-10" : ""}>
                {dayMeals.length > 0 ? (
                  <DayContent
                    key={day}
                    day={day}
                    mealTypes={mealTypes}
                    meals={dayMeals}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                ) : (
                  <div className="text-muted-foreground text-lg">
                    برای روز {day} برنامه غذایی ثبت نشده است
                  </div>
                )}
              </TabsContent>
            );
          })}
        </DayTabs>
      </ScrollArea>
    </div>
  );
};
