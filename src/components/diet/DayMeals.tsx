
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { useDeviceInfo } from "@/hooks/use-mobile";
import type { Meal, MealType } from "@/types/meal";
import { DayTabs } from "./DayTabs";
import { DayContent } from "./DayContent";

interface DayMealsProps {
  meals: Meal[];
  mealTypes: MealType[];
  onEdit: (meal: Meal) => void;
  onDelete: (id: number) => void;
}

// Define weekdays array
const weekDays = [
  'شنبه', 
  'یکشنبه', 
  'دوشنبه', 
  'سه‌شنبه', 
  'چهارشنبه', 
  'پنجشنبه', 
  'جمعه'
];

export const DayMeals = ({ meals, mealTypes, onEdit, onDelete }: DayMealsProps) => {
  const [selectedDay, setSelectedDay] = useState<string>("شنبه");
  const deviceInfo = useDeviceInfo();
  
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
              meals={meals}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </DayTabs>
      </ScrollArea>
    </div>
  );
};
