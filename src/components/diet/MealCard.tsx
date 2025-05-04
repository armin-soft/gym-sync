
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { toPersianNumbers } from "@/lib/utils/numbers";
import type { Meal } from "@/types/meal";
import { getMealTypeStyle } from "./MealTypeUtils";

interface MealCardProps {
  meal: Meal;
  onEdit: (meal: Meal) => void;
  onDelete: (id: number) => void;
  index: number;
}

export const MealCard = ({ meal, onEdit, onDelete, index }: MealCardProps) => {
  const styles = getMealTypeStyle(meal.type);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
        ease: "easeOut"
      }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
    >
      <Card 
        className={`relative border overflow-hidden group ${styles?.border} ${styles?.hover} transition-all duration-300 h-full`}
      >
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Indicator bar */}
        <div className={`absolute top-0 right-0 w-1 h-full ${styles?.accent}`} />
        
        <div className="p-3 sm:p-4 text-right h-full flex flex-col relative">
          <div className="flex items-start justify-between gap-2">
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-200">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 sm:h-7 sm:w-7 hover:bg-primary/10 hover:text-primary rounded-lg"
                onClick={() => onEdit(meal)}
              >
                <Edit className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 sm:h-7 sm:w-7 hover:bg-red-500/10 hover:text-red-500 rounded-lg"
                onClick={() => onDelete(meal.id)}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
            <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300">
              {meal.name}
            </h4>
          </div>
          
          <div className="mt-auto pt-3 border-t border-dashed border-border/30 flex flex-wrap gap-1.5 justify-end">
            {meal.calories && (
              <Badge variant="outline" className="text-xs bg-amber-50/70 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900 shadow-sm">
                {toPersianNumbers(meal.calories)} کالری
              </Badge>
            )}
            {meal.protein && (
              <Badge variant="outline" className="text-xs bg-green-50/70 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-900 shadow-sm">
                {toPersianNumbers(meal.protein)}g پروتئین
              </Badge>
            )}
            {meal.carbs && (
              <Badge variant="outline" className="text-xs bg-blue-50/70 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800 shadow-sm">
                {toPersianNumbers(meal.carbs)}g کربوهیدرات
              </Badge>
            )}
            {meal.fat && (
              <Badge variant="outline" className="text-xs bg-red-50/70 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800 shadow-sm">
                {toPersianNumbers(meal.fat)}g چربی
              </Badge>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
