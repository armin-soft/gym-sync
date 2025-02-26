
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Coffee, Cookie, UtensilsCrossed, Apple, Moon } from "lucide-react";
import type { Meal, MealType } from "@/types/meal";
import { motion } from "framer-motion";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface DayMealsProps {
  meals: Meal[];
  mealTypes: MealType[];
  onEdit: (meal: Meal) => void;
  onDelete: (id: number) => void;
}

const getMealTypeIcon = (type: MealType) => {
  switch (type) {
    case "صبحانه":
      return <Coffee className="w-5 h-5 text-amber-500" />;
    case "میان وعده صبح":
      return <Cookie className="w-5 h-5 text-orange-500" />;
    case "ناهار":
      return <UtensilsCrossed className="w-5 h-5 text-green-500" />;
    case "میان وعده عصر":
      return <Apple className="w-5 h-5 text-red-500" />;
    case "شام":
      return <Moon className="w-5 h-5 text-blue-500" />;
  }
};

const getMealTypeBorder = (type: MealType) => {
  switch (type) {
    case "صبحانه":
      return "border-amber-500/20 hover:border-amber-500/30";
    case "میان وعده صبح":
      return "border-orange-500/20 hover:border-orange-500/30";
    case "ناهار":
      return "border-green-500/20 hover:border-green-500/30";
    case "میان وعده عصر":
      return "border-red-500/20 hover:border-red-500/30";
    case "شام":
      return "border-blue-500/20 hover:border-blue-500/30";
  }
};

export const DayMeals = ({ meals, mealTypes, onEdit, onDelete }: DayMealsProps) => {
  return (
    <div className="space-y-8">
      {mealTypes.map((type, typeIndex) => {
        const typeMeals = meals.filter((meal) => meal.type === type);
        const borderColor = getMealTypeBorder(type);
        
        return (
          <motion.div
            key={type}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: typeIndex * 0.05 }}
            className="relative"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-xl">
                {getMealTypeIcon(type)}
                <h3 className="text-base font-medium text-foreground/90">
                  {type}
                </h3>
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-muted to-transparent" />
            </div>

            <ScrollArea className="w-full">
              <div className="flex gap-4 pb-4">
                {typeMeals.length > 0 ? (
                  typeMeals.map((meal, index) => (
                    <motion.div
                      key={meal.id}
                      initial={{ opacity: 0, scale: 0.9, x: -20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      transition={{
                        duration: 0.2,
                        delay: index * 0.05,
                      }}
                      className="min-w-[280px] max-w-[280px]"
                    >
                      <Card className={`group relative h-full border-2 ${borderColor} transition-all duration-300 hover:shadow-lg hover:shadow-muted/20`}>
                        <div className="p-4 h-full flex flex-col">
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <h4 className="text-base font-medium text-foreground/90 group-hover:text-primary transition-colors duration-300">
                              {meal.name}
                            </h4>
                            <div className="flex gap-1 opacity-60 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:bg-primary/10 hover:text-primary rounded-lg"
                                onClick={() => onEdit(meal)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:bg-red-500/10 hover:text-red-500 rounded-lg"
                                onClick={() => onDelete(meal.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {meal.description}
                          </p>
                        </div>
                      </Card>
                    </motion.div>
                  ))
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full"
                  >
                    <Card className="p-6 border-dashed border-2 border-muted">
                      <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                        <UtensilsCrossed className="w-4 h-4" />
                        هیچ وعده غذایی برای {type} ثبت نشده است
                      </p>
                    </Card>
                  </motion.div>
                )}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </motion.div>
        );
      })}
    </div>
  );
};
