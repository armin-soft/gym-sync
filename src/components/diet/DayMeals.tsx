
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { useDeviceInfo } from "@/hooks/use-mobile";
import type { Meal, MealType, WeekDay } from "@/types/meal";
import { DayTabs } from "./DayTabs";
import { DayContent } from "./DayContent";

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
  const [selectedDay, setSelectedDay] = useState<WeekDay>("شنبه");
  const deviceInfo = useDeviceInfo();
  
  // Filter meals by day only, no sorting order
  const dayMeals = meals.filter(meal => meal.day === selectedDay);
  
  return (
    <div dir="rtl">
      <ScrollArea className="w-full">
        <DayTabs 
          weekDays={weekDays} 
          selectedDay={selectedDay} 
          onDayChange={setSelectedDay}
        >
          {weekDays.map((day) => (
            <DayContent
              key={day}
              day={day}
              mealTypes={mealTypes}
              meals={dayMeals.filter(meal => meal.day === day)}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </DayTabs>
      </ScrollArea>
    </div>
  );
};
