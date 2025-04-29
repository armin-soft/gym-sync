
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
      key={meal.id}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.2,
        delay: index * 0.05,
      }}
    >
      <Card 
        className={`group relative border ${styles?.border} ${styles?.hover} transition-all duration-300 hover:shadow-sm h-full`}
      >
        <div className="p-2 xs:p-3 text-right h-full flex flex-col">
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-xs xs:text-sm font-medium text-foreground/90 group-hover:text-primary transition-colors duration-300">
              {meal.name}
            </h4>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 sm:h-7 sm:w-7 hover:bg-primary/10 hover:text-primary rounded-lg"
                onClick={() => onEdit(meal)}
              >
                <Edit className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 sm:h-7 sm:w-7 hover:bg-red-500/10 hover:text-red-500 rounded-lg"
                onClick={() => onDelete(meal.id)}
              >
                <Trash2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              </Button>
            </div>
          </div>
          {meal.description && (
            <p className="mt-1 text-2xs xs:text-xs text-muted-foreground line-clamp-2">
              {meal.description}
            </p>
          )}
          <div className="mt-2 pt-2 border-t border-dashed border-border/40 flex flex-wrap gap-1 mt-auto">
            {meal.calories && (
              <Badge variant="outline" className="text-2xs xs:text-xs bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900">
                کالری: {toPersianNumbers(meal.calories)}
              </Badge>
            )}
            {meal.protein && (
              <Badge variant="outline" className="text-2xs xs:text-xs bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-900">
                پروتئین: {toPersianNumbers(meal.protein)}
              </Badge>
            )}
            {meal.carbs && (
              <Badge variant="outline" className="text-2xs xs:text-xs bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800">
                کربوهیدرات: {toPersianNumbers(meal.carbs)}
              </Badge>
            )}
            {meal.fat && (
              <Badge variant="outline" className="text-2xs xs:text-xs bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800">
                چربی: {toPersianNumbers(meal.fat)}
              </Badge>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
