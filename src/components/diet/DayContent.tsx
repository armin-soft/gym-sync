
import { TabsContent } from "@/components/ui/tabs";
import { MealTypeSection } from "./MealTypeSection";
import { mealTypeOrder } from "./MealTypeUtils";
import type { Meal, MealType, WeekDay } from "@/types/meal";
import { motion } from "framer-motion";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { cn } from "@/lib/utils";

interface DayContentProps {
  day: string;
  mealTypes: MealType[];
  meals: Meal[];
  onEdit: (meal: Meal) => void;
  onDelete: (id: number) => void;
  centered?: boolean;
}

export const DayContent = ({ day, mealTypes, meals, onEdit, onDelete, centered = false }: DayContentProps) => {
  console.log(`*** DAY CONTENT ${day} RECEIVED MEALS: ${meals.length} ***`);
  console.log("Meals details:", meals);
  console.log("Meal types:", mealTypes);
  console.log("Day:", day);
  
  // مرتب‌سازی انواع وعده‌های غذایی بر اساس ترتیب تعریف شده
  const sortedMealTypes = [...mealTypes].sort((a, b) => {
    const orderA = mealTypeOrder[a] || 99;
    const orderB = mealTypeOrder[b] || 99;
    return orderA - orderB;
  });
  
  // انیمیشن برای ظهور آیتم‌ها
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
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
  
  console.log(`*** RENDERING CONTENT for ${day} with ${meals.length} meals ***`);
  
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={cn(
        "space-y-4 sm:space-y-6",
        centered ? "text-center" : "text-right"
      )}
    >
      {meals.length === 0 ? (
        <motion.div 
          variants={itemVariants}
          className="text-muted-foreground text-lg py-16 px-6 rounded-2xl bg-gradient-to-br from-muted/30 to-muted/10 backdrop-blur-sm border border-border/30 shadow-sm flex items-center justify-center"
        >
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7.5L12.5 7L9 7.5L3 7V9L9 8.5C10.5 8.5 12 8.5 12 8.5S13.5 8.5 15 8.5L21 9ZM15 10.5V19C15 20.1 14.1 21 13 21S11 20.1 11 19V15H9V19C9 20.1 8.1 21 7 21S5 20.1 5 19V10.5L9 10C10.5 10 12 10 12 10S13.5 10 15 10.5Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor"/>
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">هیچ وعده غذایی برای روز {day} ثبت نشده است</h3>
              <p className="text-sm text-muted-foreground">برای افزودن وعده غذایی، از دکمه "افزودن وعده غذایی" استفاده کنید</p>
            </div>
          </div>
        </motion.div>
      ) : (
        sortedMealTypes.map((type, typeIndex) => {
          const typeMeals = meals.filter(meal => meal.type === type);
          console.log(`*** ${type} meals for ${day}:`, typeMeals.length);
          
          // فقط انواع وعده‌هایی که غذا دارند نمایش داده شوند
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
                centered={centered}
              />
            </motion.div>
          );
        })
      )}
    </motion.div>
  );
};
