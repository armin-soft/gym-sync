
import { TabsContent } from "@/components/ui/tabs";
import { MealTypeSection } from "./MealTypeSection";
import { mealTypeOrder } from "./MealTypeUtils";
import type { Meal, MealType, WeekDay } from "@/types/meal";
import { motion } from "framer-motion";

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
  
  // Animation variants for staggered children
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-4 sm:space-y-6"
    >
      {sortedMealTypes.map((type, typeIndex) => {
        const typeMeals = meals.filter(meal => meal.type === type);
        
        if (typeMeals.length === 0) return null;
        
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
    </motion.div>
  );
};
