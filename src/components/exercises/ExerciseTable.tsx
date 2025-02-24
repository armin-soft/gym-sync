
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Edit, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Exercise, ExerciseCategory } from "@/types/exercise";

interface ExerciseTableProps {
  exercises: Exercise[];
  categories: ExerciseCategory[];
  onSort: () => void;
  onEdit: (exercise: Exercise) => void;
  onDelete: (exerciseId: number) => void;
}

export function ExerciseTable({ 
  exercises,
  categories,
  onSort,
  onEdit,
  onDelete 
}: ExerciseTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/50">
          <TableHead>
            <Button variant="ghost" onClick={onSort} className="text-base font-bold hover:bg-transparent">
              نام حرکت
              <ArrowUpDown className="mr-2 h-4 w-4" />
            </Button>
          </TableHead>
          <TableHead className="text-base font-bold">دسته‌بندی</TableHead>
          <TableHead className="text-base font-bold w-32">عملیات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {exercises.length === 0 ? (
          <TableRow>
            <TableCell 
              colSpan={3} 
              className="text-center py-10 text-muted-foreground animate-fade-in"
            >
              هیچ حرکتی ثبت نشده است
            </TableCell>
          </TableRow>
        ) : (
          exercises.map((exercise) => {
            const category = categories.find(c => c.id === exercise.categoryId);
            return (
              <TableRow 
                key={exercise.id}
                className="group hover:bg-muted/50 transition-colors duration-200"
              >
                <TableCell className="font-medium">
                  {exercise.name}
                </TableCell>
                <TableCell>
                  {category?.name}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      onClick={() => onEdit(exercise)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 hover:bg-red-50 hover:text-red-600 transition-colors"
                      onClick={() => onDelete(exercise.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
}
