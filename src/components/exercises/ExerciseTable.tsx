
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowUpDown, Edit, Plus, Trash2, Activity, Dumbbell } from "lucide-react";
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
  onAdd: () => void;
  onEdit: (exercise: Exercise) => void;
  onDelete: (exerciseId: number) => void;
  onSort: () => void;
  isAscending: boolean;
}

export function ExerciseTable({ 
  exercises,
  categories,
  onAdd,
  onEdit,
  onDelete,
  onSort,
  isAscending
}: ExerciseTableProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Dumbbell className="w-5 h-5 text-blue-500" />
          حرکات
        </h3>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onSort}
            className="hover:bg-blue-50"
          >
            <ArrowUpDown className="h-4 w-4 text-blue-500" />
          </Button>
          <Button onClick={onAdd} size="sm" variant="outline" className="hover:bg-blue-50">
            <Plus className="w-4 h-4 ml-2" />
            افزودن حرکت
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="font-bold">نام حرکت</TableHead>
              <TableHead className="font-bold">دسته‌بندی</TableHead>
              <TableHead className="w-[100px] text-center font-bold">عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {exercises.length === 0 ? (
              <TableRow>
                <TableCell 
                  colSpan={3} 
                  className="text-center h-32 text-muted-foreground animate-fade-in"
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
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-blue-500" />
                        {exercise.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                        {category?.name}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          onClick={() => onEdit(exercise)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
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
      </div>
    </Card>
  );
}
