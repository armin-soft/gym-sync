
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Coffee, Cookie, UtensilsCrossed, Apple, Moon } from "lucide-react";
import type { Meal, MealType } from "@/types/meal";
import { motion } from "framer-motion";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface DayMealsProps {
  meals: Meal[];
  mealTypes: MealType[];
  onEdit: (meal: Meal) => void;
  onDelete: (id: number) => void;
}

// Define meal type order for consistent display
const mealTypeOrder: Record<MealType, number> = {
  "صبحانه": 1,
  "میان وعده صبح": 2, 
  "ناهار": 3,
  "میان وعده عصر": 4,
  "شام": 5,
  "میان وعده": 6
};

const getMealTypeIcon = (type: MealType) => {
  switch (type) {
    case "صبحانه":
      return <Coffee className="w-5 h-5" />;
    case "میان وعده صبح":
      return <Cookie className="w-5 h-5" />;
    case "ناهار":
      return <UtensilsCrossed className="w-5 h-5" />;
    case "میان وعده عصر":
      return <Apple className="w-5 h-5" />;
    case "شام":
      return <Moon className="w-5 h-5" />;
    case "میان وعده":
      return <Cookie className="w-5 h-5" />;
  }
};

const getMealTypeStyle = (type: MealType) => {
  switch (type) {
    case "صبحانه":
      return {
        icon: "text-amber-500",
        border: "border-amber-500/20",
        hover: "hover:border-amber-500/40",
        bg: "bg-amber-500/5"
      };
    case "میان وعده صبح":
      return {
        icon: "text-orange-500",
        border: "border-orange-500/20",
        hover: "hover:border-orange-500/40",
        bg: "bg-orange-500/5"
      };
    case "ناهار":
      return {
        icon: "text-green-500",
        border: "border-green-500/20",
        hover: "hover:border-green-500/40",
        bg: "bg-green-500/5"
      };
    case "میان وعده عصر":
      return {
        icon: "text-red-500",
        border: "border-red-500/20",
        hover: "hover:border-red-500/40",
        bg: "bg-red-500/5"
      };
    case "شام":
      return {
        icon: "text-blue-500",
        border: "border-blue-500/20",
        hover: "hover:border-blue-500/40",
        bg: "bg-blue-500/5"
      };
    case "میان وعده":
      return {
        icon: "text-purple-500",
        border: "border-purple-500/20",
        hover: "hover:border-purple-500/40",
        bg: "bg-purple-500/5"
      };
  }
};

export const DayMeals = ({ meals, mealTypes, onEdit, onDelete }: DayMealsProps) => {
  // Sort meal types based on the defined order
  const sortedMealTypes = [...mealTypes].sort((a, b) => mealTypeOrder[a] - mealTypeOrder[b]);

  return (
    <div className="space-y-6" dir="rtl">
      {sortedMealTypes.map((type, typeIndex) => {
        const typeMeals = meals.filter((meal) => meal.type === type);
        const styles = getMealTypeStyle(type);
        
        return (
          <motion.div
            key={type}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: typeIndex * 0.05 }}
            className={cn(
              "rounded-xl border border-border/50 overflow-hidden",
              styles?.border
            )}
            dir="rtl"
          >
            <div className={`p-4 ${styles?.bg} rounded-t-xl border-b ${styles?.border}`}>
              <div className="flex items-center gap-2">
                <div className={`${styles?.icon}`}>
                  {getMealTypeIcon(type)}
                </div>
                <h3 className="text-base font-medium text-foreground/90">
                  {type}
                </h3>
                <Badge variant="outline" className={cn("mr-2 bg-background/50", styles?.border)}>
                  {toPersianNumbers(typeMeals.length)} مورد
                </Badge>
              </div>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
                {typeMeals.length > 0 ? (
                  typeMeals.map((meal, index) => (
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
                        <div className="p-3 text-right h-full flex flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-sm font-medium text-foreground/90 group-hover:text-primary transition-colors duration-300">
                              {meal.name}
                            </h4>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 hover:bg-primary/10 hover:text-primary rounded-lg"
                                onClick={() => onEdit(meal)}
                              >
                                <Edit className="h-3.5 w-3.5" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 hover:bg-red-500/10 hover:text-red-500 rounded-lg"
                                onClick={() => onDelete(meal.id)}
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </div>
                          {meal.description && (
                            <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                              {meal.description}
                            </p>
                          )}
                          <div className="mt-2 pt-2 border-t border-dashed border-border/40 flex flex-wrap gap-1.5 mt-auto">
                            {meal.calories && (
                              <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900">
                                کالری: {toPersianNumbers(meal.calories)}
                              </Badge>
                            )}
                            {meal.protein && (
                              <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-900">
                                پروتئین: {toPersianNumbers(meal.protein)}
                              </Badge>
                            )}
                            {meal.carbs && (
                              <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800">
                                کربوهیدرات: {toPersianNumbers(meal.carbs)}
                              </Badge>
                            )}
                            {meal.fat && (
                              <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800">
                                چربی: {toPersianNumbers(meal.fat)}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-6 text-muted-foreground">
                    هیچ موردی یافت نشد
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
