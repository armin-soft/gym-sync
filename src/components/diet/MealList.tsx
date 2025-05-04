
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
import { motion } from "framer-motion";
import { toPersianNumbers } from "@/lib/utils/numbers";

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
}

interface MealListProps {
  meals: Meal[];
  onEdit: (meal: Meal) => void;
  onDelete: (id: number) => void;
}

// Define meal time order for consistent display
const mealTimeOrder: Record<string, number> = {
  "صبحانه": 1,
  "میان وعده صبح": 2, 
  "ناهار": 3,
  "میان وعده عصر": 4,
  "شام": 5,
  "میان وعده": 6
};

export const MealList = ({ meals, onEdit, onDelete }: MealListProps) => {
  // Sort meals by their time according to the defined order
  const sortedMeals = [...meals].sort((a, b) => {
    const timeA = a.time;
    const timeB = b.time;
    
    return (mealTimeOrder[timeA] || 999) - (mealTimeOrder[timeB] || 999);
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="overflow-hidden shadow-sm">
        <div className="relative w-full overflow-auto" dir="rtl">
          <Table>
            <TableHeader className="bg-muted/50 backdrop-blur-sm sticky top-0">
              <TableRow>
                <TableHead className="text-right font-semibold">نام غذا</TableHead>
                <TableHead className="text-right font-semibold">زمان</TableHead>
                <TableHead className="text-right font-semibold">کالری</TableHead>
                <TableHead className="text-right font-semibold">پروتئین (g)</TableHead>
                <TableHead className="text-right font-semibold">کربوهیدرات (g)</TableHead>
                <TableHead className="text-right font-semibold">چربی (g)</TableHead>
                <TableHead className="text-right font-semibold">عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedMeals.length > 0 ? (
                sortedMeals.map((meal, index) => (
                  <motion.tr
                    key={meal.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.03 }}
                    className="group"
                  >
                    <TableCell className="text-right font-medium">{meal.name}</TableCell>
                    <TableCell className="text-right">
                      <span className="px-2 py-0.5 text-xs rounded-md bg-primary/10 text-primary">
                        {meal.time}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">{toPersianNumbers(meal.calories)}</TableCell>
                    <TableCell className="text-right">{toPersianNumbers(meal.protein)}</TableCell>
                    <TableCell className="text-right">{toPersianNumbers(meal.carbs)}</TableCell>
                    <TableCell className="text-right">{toPersianNumbers(meal.fat)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-2 justify-end opacity-70 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
                          onClick={() => onEdit(meal)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-red-500/10 hover:text-red-500"
                          onClick={() => onDelete(meal.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                    هیچ وعده غذایی یافت نشد
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </motion.div>
  );
};
