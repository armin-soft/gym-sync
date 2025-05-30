
import { MealTypeSection } from "./MealTypeSection";
import { mealTypeOrder } from "./MealTypeUtils";
import type { Meal, MealType } from "@/types/meal";
import { motion } from "framer-motion";

interface DayContentProps {
  day: string;
  mealTypes: MealType[];
  meals: Meal[];
  onEdit: (meal: Meal) => void;
  onDelete: (id: number) => void;
}

export const DayContent = ({ day, mealTypes, meals, onEdit, onDelete }: DayContentProps) => {
  const sortedMealTypes = [...mealTypes].sort((a, b) => {
    const orderA = mealTypeOrder[a] || 99;
    const orderB = mealTypeOrder[b] || 99;
    return orderA - orderB;
  });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };
  
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6"
    >
      {meals.length === 0 ? (
        <motion.div 
          variants={itemVariants}
          className="text-center py-16 text-muted-foreground"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="opacity-60">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" fill="currentColor"/>
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">هیچ وعده غذایی برای روز {day} ثبت نشده است</h3>
              <p className="text-sm">برای افزودن وعده غذایی، از دکمه "افزودن وعده غذایی" استفاده کنید</p>
            </div>
          </div>
        </motion.div>
      ) : (
        sortedMealTypes.map((type, typeIndex) => {
          const typeMeals = meals.filter(meal => meal.type === type);
          
          if (typeMeals.length === 0) return null;
          
          return (
            <motion.div key={`${day}-${type}`} variants={itemVariants}>
              <MealTypeSection
                type={type}
                meals={typeMeals}
                day={day}
                onEdit={onEdit}
                onDelete={onDelete}
                typeIndex={typeIndex}
              />
            </motion.div>
          );
        })
      )}
    </motion.div>
  );
};
