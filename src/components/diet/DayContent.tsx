
import { TabsContent } from "@/components/ui/tabs";
import { MealTypeSection } from "./MealTypeSection";
import { mealTypeOrder } from "./MealTypeUtils";
import type { Meal, MealType, WeekDay } from "@/types/meal";

interface DayContentProps {
  day: string;
  mealTypes: MealType[];
  meals: Meal[];
  onEdit: (meal: Meal) => void;
  onDelete: (id: number) => void;
}

export const DayContent = ({ day, mealTypes, meals, onEdit, onDelete }: DayContentProps) => {
  // Sort meal types based on the defined order
  const sortedMealTypes = [...mealTypes].sort((a, b) => mealTypeOrder[a] - mealTypeOrder[b]);
  
  return (
    <TabsContent
      key={day}
      value={day}
      className="mt-4 sm:mt-6 focus-visible:outline-none"
    >
      <div className="space-y-4 sm:space-y-6">
        {sortedMealTypes.map((type, typeIndex) => {
          const typeMeals = meals.filter(meal => meal.type === type);
          
          return (
            <MealTypeSection
              key={type}
              type={type}
              meals={typeMeals}
              day={day}
              onEdit={onEdit}
              onDelete={onDelete}
              typeIndex={typeIndex}
            />
          );
        })}
      </div>
    </TabsContent>
  );
};
