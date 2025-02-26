
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import type { Meal, MealType } from "@/types/meal";
import { motion } from "framer-motion";

interface DayMealsProps {
  meals: Meal[];
  mealTypes: MealType[];
  onEdit: (meal: Meal) => void;
  onDelete: (id: number) => void;
}

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
            <Card className="p-6 backdrop-blur-sm bg-gradient-to-br from-card to-card/50 border-muted/50">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
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
                      <Card className="p-4 space-y-2 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-background to-muted/30">
                        <div className="flex items-start justify-between">
                          <h4 className="font-medium">{meal.name}</h4>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                              onClick={() => onEdit(meal)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 hover:bg-red-50 hover:text-red-600 transition-colors"
                              onClick={() => onDelete(meal.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{meal.description}</p>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">
                  هیچ وعده غذایی برای {type} ثبت نشده است
                </p>
              )}
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};
