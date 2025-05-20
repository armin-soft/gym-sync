
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
  centered?: boolean; // Added the centered prop as optional
}

export const MealTypeSection = ({ type, meals, day, onEdit, onDelete, typeIndex, centered = false }: MealTypeSectionProps) => {
  const styles = getMealTypeStyle(type);
  
  // Animation variants for the container
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.div
      variants={item}
      className={cn(
        "rounded-xl border overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300",
        "bg-gradient-to-br from-card/90 to-card",
        styles?.border
      )}
    >
      <MealTypeHeader type={type} count={meals.length} />

      <div className="p-3 xs:p-4 sm:p-5">
        {meals.length > 0 ? (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 xs:gap-4">
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
          <div className={cn(
            "col-span-full py-6 text-muted-foreground",
            centered ? "text-center" : "text-right"
          )}>
            هیچ موردی برای {type} در روز {day} یافت نشد
          </div>
        )}
      </div>
    </motion.div>
  );
};
