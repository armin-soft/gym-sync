
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
  type: string;
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
}

interface MealListProps {
  meals: Meal[];
  onEdit: (meal: Meal) => void;
  onDelete: (id: number) => void;
}

export const MealList = ({ meals, onEdit, onDelete }: MealListProps) => {
  return (
    <Card className="p-6">
      <div className="relative w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>نام غذا</TableHead>
              <TableHead>نوع وعده</TableHead>
              <TableHead>کالری</TableHead>
              <TableHead>پروتئین</TableHead>
              <TableHead>کربوهیدرات</TableHead>
              <TableHead>چربی</TableHead>
              <TableHead>عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {meals.map((meal) => (
              <TableRow key={meal.id}>
                <TableCell>{meal.name}</TableCell>
                <TableCell>{meal.type}</TableCell>
                <TableCell>{meal.calories}</TableCell>
                <TableCell>{meal.protein}</TableCell>
                <TableCell>{meal.carbs}</TableCell>
                <TableCell>{meal.fat}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
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
