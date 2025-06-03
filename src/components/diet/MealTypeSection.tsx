
import { motion } from "framer-motion";
import { MealTypeHeader } from "./MealTypeHeader";
import { MealCard } from "./MealCard";
import { getMealTypeStyle } from "./MealTypeUtils";
import type { Meal, MealType } from "@/types/meal";

interface MealTypeSectionProps {
  type: MealType;
  meals: Meal[];
  day: string;
  onEdit: (meal: Meal) => void;
  onDelete: (id: number) => void;
  typeIndex: number;
}

export const MealTypeSection = ({ type, meals, day, onEdit, onDelete }: MealTypeSectionProps) => {
  const styles = getMealTypeStyle(type);
  
  return (
    <div dir="rtl" className={`rounded-lg border p-4 text-right ${styles?.border || 'border-border'}`}>
      <div className="text-right">
        <MealTypeHeader type={type} count={meals.length} />
      </div>

      <div className="mt-4 text-right">
        {meals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" dir="rtl">
            {meals.map((meal, index) => (
              <MealCard 
                key={`${meal.id}-${index}`}
                meal={meal}
                onEdit={onEdit}
                onDelete={onDelete}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground" dir="rtl">
            هیچ موردی برای {type} در روز {day} یافت نشد
          </div>
        )}
      </div>
    </div>
  );
};
