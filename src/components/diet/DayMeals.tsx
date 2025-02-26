
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
      return <Coffee className="w-4 h-4 text-amber-500" />;
    case "میان وعده صبح":
      return <Cookie className="w-4 h-4 text-orange-500" />;
    case "ناهار":
      return <UtensilsCrossed className="w-4 h-4 text-green-500" />;
    case "میان وعده عصر":
      return <Apple className="w-4 h-4 text-red-500" />;
    case "شام":
      return <Moon className="w-4 h-4 text-blue-500" />;
  }
};

const getMealTypeGradient = (type: MealType) => {
  switch (type) {
    case "صبحانه":
      return "from-amber-500/10 to-orange-500/5";
    case "میان وعده صبح":
      return "from-orange-500/10 to-red-500/5";
    case "ناهار":
      return "from-green-500/10 to-emerald-500/5";
    case "میان وعده عصر":
      return "from-red-500/10 to-pink-500/5";
    case "شام":
      return "from-blue-500/10 to-indigo-500/5";
  }
};

export const DayMeals = ({ meals, mealTypes, onEdit, onDelete }: DayMealsProps) => {
  return (
    <div className="space-y-6">
      {mealTypes.map((type, typeIndex) => {
        const typeMeals = meals.filter((meal) => meal.type === type);
        const gradient = getMealTypeGradient(type);
        
        return (
          <motion.div
            key={type}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: typeIndex * 0.05 }}
          >
            <Card className={`overflow-hidden bg-gradient-to-br ${gradient} hover:shadow-lg transition-all duration-500 border-muted`}>
              <div className="p-4">
                <h3 className="text-base font-medium mb-4 flex items-center gap-2 text-foreground/90">
                  {getMealTypeIcon(type)}
                  {type}
                </h3>
                {typeMeals.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {typeMeals.map((meal, index) => (
                      <motion.div
                        key={meal.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.15,
                          delay: index * 0.03 + typeIndex * 0.05
                        }}
                      >
                        <Card className="overflow-hidden group hover:shadow-md transition-all duration-300 border-muted/50">
                          <div className="p-3 bg-gradient-to-br from-background via-background/95 to-background/90 space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <h4 className="text-sm font-medium text-foreground/90 group-hover:text-primary transition-colors duration-300 truncate">
                                {meal.name}
                              </h4>
                              <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
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
                            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                              {meal.description}
                            </p>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-gradient-to-r from-muted/80 to-muted/40 rounded-xl p-4"
                  >
                    <p className="text-sm text-muted-foreground flex items-center gap-2 justify-center">
                      <UtensilsCrossed className="w-4 h-4" />
                      هیچ وعده غذایی برای {type} ثبت نشده است
                    </p>
                  </motion.div>
                )}
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};
