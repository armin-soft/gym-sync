
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import type { Meal, MealType } from "@/types/meal";

interface DayMealsProps {
  meals: Meal[];
  mealTypes: MealType[];
  onEdit: (meal: Meal) => void;
  onDelete: (id: number) => void;
}

export const DayMeals = ({ meals, mealTypes, onEdit, onDelete }: DayMealsProps) => {
  return (
    <div className="space-y-6">
      {mealTypes.map((type) => {
        const typeMeals = meals.filter((meal) => meal.type === type);
        
        return (
          <Card key={type} className="p-4">
            <h3 className="text-lg font-semibold mb-4">{type}</h3>
            {typeMeals.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {typeMeals.map((meal) => (
                  <Card key={meal.id} className="p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium">{meal.name}</h4>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"
                          onClick={() => onEdit(meal)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-red-50 hover:text-red-600"
                          onClick={() => onDelete(meal.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{meal.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span>کالری: {meal.calories}</span>
                      <span>پروتئین: {meal.protein}g</span>
                      <span>کربوهیدرات: {meal.carbs}g</span>
                      <span>چربی: {meal.fat}g</span>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                هیچ وعده غذایی برای {type} ثبت نشده است
              </p>
            )}
          </Card>
        );
      })}
    </div>
  );
};
