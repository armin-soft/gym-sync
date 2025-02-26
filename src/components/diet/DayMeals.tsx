
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Coffee, Cookie, UtensilsCrossed, Apple, Moon } from "lucide-react";
import type { Meal, MealType } from "@/types/meal";
import { motion } from "framer-motion";

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

export const DayMeals = ({ meals, mealTypes, onEdit, onDelete }: DayMealsProps) => {
  return (
    <div className="space-y-6">
      {mealTypes.map((type, typeIndex) => {
        const typeMeals = meals.filter((meal) => meal.type === type);
        
        return (
          <motion.div
            key={type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: typeIndex * 0.1 }}
          >
            <Card className="overflow-hidden group">
              <div className="p-6 bg-gradient-to-l from-background via-background to-muted/20">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-3 text-foreground/80">
                  {getMealTypeIcon(type)}
                  {type}
                </h3>
                {typeMeals.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {typeMeals.map((meal, index) => (
                      <motion.div
                        key={meal.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.2,
                          delay: index * 0.05 + typeIndex * 0.1
                        }}
                      >
                        <Card className="overflow-hidden group/card">
                          <div className="p-4 bg-gradient-to-br from-background via-background to-muted/10 space-y-2">
                            <div className="flex items-start justify-between">
                              <h4 className="font-medium text-foreground/90 group-hover/card:text-primary transition-colors duration-300">
                                {meal.name}
                              </h4>
                              <div className="flex gap-1.5">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 hover:bg-primary/10 hover:text-primary transition-colors duration-300"
                                  onClick={() => onEdit(meal)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 hover:bg-red-500/10 hover:text-red-500 transition-colors duration-300"
                                  onClick={() => onDelete(meal.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{meal.description}</p>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-muted-foreground text-sm flex items-center gap-2"
                  >
                    <UtensilsCrossed className="w-4 h-4" />
                    هیچ وعده غذایی برای {type} ثبت نشده است
                  </motion.p>
                )}
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};
