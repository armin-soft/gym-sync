
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

export const MealList = ({ meals, onEdit, onDelete }: MealListProps) => {
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
            {meals.map((meal) => (
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
                      onClick={() => onEdit(meal)}
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
