
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
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

export const MealTypeSection = ({ type, meals, day, onEdit, onDelete, typeIndex }: MealTypeSectionProps) => {
  const styles = getMealTypeStyle(type);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: typeIndex * 0.05 }}
      className={cn(
        "rounded-xl border border-border/50 overflow-hidden",
        styles?.border
      )}
    >
      <MealTypeHeader type={type} count={meals.length} />

      <div className="p-2 xs:p-3 sm:p-4">
        {meals.length > 0 ? (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 xs:gap-3">
            {meals.map((meal, index) => (
              <MealCard 
                key={meal.id}
                meal={meal}
                onEdit={onEdit}
                onDelete={onDelete}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="col-span-full text-center py-6 text-muted-foreground">
            هیچ موردی برای {type} در روز {day} یافت نشد
          </div>
        )}
      </div>
    </motion.div>
  );
};
