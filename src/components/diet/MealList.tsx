
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";
import { Meal as AppMeal } from "@/types/meal";

// Updated interface to match what we need for this component
export interface Meal {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  description: string;
  image?: string;
  time: string;
  type?: string; // Added type property to match the app's Meal type
}

interface MealListProps {
  meals: Meal[];
  onEdit: (meal: AppMeal) => void; // Changed to accept AppMeal type
  onDelete: (id: number) => void;
}

// Define meal time order for consistent display
const mealTimeOrder: Record<string, number> = {
  "صبحانه": 1,
  "میان وعده صبح": 2, 
  "ناهار": 3,
  "میان وعده عصر": 4,
  "شام": 5
};

export const MealList = ({ meals, onEdit, onDelete }: MealListProps) => {
  // Sort meals by their time according to the defined order
  const sortedMeals = [...meals].sort((a, b) => {
    const timeA = a.time;
    const timeB = b.time;
    
    return (mealTimeOrder[timeA] || 999) - (mealTimeOrder[timeB] || 999);
  });

  return (
    <Card className="p-6">
      <div className="relative w-full overflow-auto" dir="rtl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">نام غذا</TableHead>
              <TableHead className="text-right">زمان</TableHead>
              <TableHead className="text-right">کالری</TableHead>
              <TableHead className="text-right">پروتئین</TableHead>
              <TableHead className="text-right">کربوهیدرات</TableHead>
              <TableHead className="text-right">چربی</TableHead>
              <TableHead className="text-right">عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedMeals.map((meal) => (
              <TableRow key={meal.id}>
                <TableCell className="text-right">{meal.name}</TableCell>
                <TableCell className="text-right">{meal.time}</TableCell>
                <TableCell className="text-right">{meal.calories}</TableCell>
                <TableCell className="text-right">{meal.protein}</TableCell>
                <TableCell className="text-right">{meal.carbs}</TableCell>
                <TableCell className="text-right">{meal.fat}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center gap-2 justify-end">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onEdit({
                        id: meal.id,
                        name: meal.name,
                        description: meal.description,
                        type: meal.time as any, // Convert time to type
                        calories: meal.calories.toString(),
                        protein: meal.protein.toString(),
                        carbs: meal.carbs.toString(),
                        fat: meal.fat.toString()
                      })}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => onDelete(meal.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
