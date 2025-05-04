
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
  // دیباگ
  console.log(`DayContent rendering for day ${day} with ${meals.length} meals`);
  
  // مرتب‌سازی انواع وعده‌های غذایی بر اساس ترتیب تعریف شده
  const sortedMealTypes = [...mealTypes].sort((a, b) => mealTypeOrder[a] - mealTypeOrder[b]);
  
  // واریانت‌های انیمیشن برای کودکان با تأخیر
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
      className="space-y-4 sm:space-y-6 text-right"
    >
      {sortedMealTypes.map((type, typeIndex) => {
        const typeMeals = meals.filter(meal => meal.type === type);
        console.log(`Type ${type} has ${typeMeals.length} meals for day ${day}`);
        
        // نمایش همه انواع وعده غذایی، حتی اگر وعده‌ای نداشته باشند
        return (
          <MealTypeSection
            key={`${day}-${type}`}
            type={type}
            meals={typeMeals}
            day={day}
            onEdit={onEdit}
            onDelete={onDelete}
            typeIndex={typeIndex}
          />
        );
      })}
      
      {/* نمایش پیام خالی بودن اگر هیچ وعده‌ای برای روز وجود نداشت */}
      {meals.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          className="text-muted-foreground text-lg py-10 px-4 rounded-2xl bg-muted/30 backdrop-blur-sm border border-border/30 shadow-sm flex items-center justify-center"
        >
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60">
                <path d="M3 10H21M7 3V5M17 3V5M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.07989 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p>برای روز {day} برنامه غذایی ثبت نشده است</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
