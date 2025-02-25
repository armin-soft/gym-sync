
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
    <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-white to-indigo-50/30">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Dumbbell className="w-5 h-5 text-indigo-500" />
            حرکات
          </h3>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onSort}
              className="hover:bg-indigo-50 text-indigo-600 transition-all duration-300"
            >
              <ArrowUpDown className={`h-4 w-4 transition-transform duration-300 ${isAscending ? 'rotate-0' : 'rotate-180'}`} />
            </Button>
            <Button 
              onClick={onAdd}
              className="bg-gradient-to-r from-indigo-600 to-indigo-400 hover:from-indigo-700 hover:to-indigo-500 text-white shadow-indigo-200 shadow-lg transition-all duration-300 hover:scale-105"
              size="sm"
            >
              <Plus className="w-4 h-4 ml-2" />
              افزودن حرکت
            </Button>
          </div>
        </div>

        <div className="relative overflow-x-auto rounded-lg border border-indigo-100">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-indigo-50 to-transparent hover:bg-indigo-50/50">
                <TableHead className="font-bold text-indigo-800">نام حرکت</TableHead>
                <TableHead className="font-bold text-indigo-800">دسته‌بندی</TableHead>
                <TableHead className="w-[100px] text-center font-bold text-indigo-800">عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exercises.length === 0 ? (
                <TableRow>
                  <TableCell 
                    colSpan={3} 
                    className="text-center h-32 text-muted-foreground animate-fade-in"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Dumbbell className="w-8 h-8 text-indigo-200" />
                      <p>هیچ حرکتی ثبت نشده است</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                exercises.map((exercise) => {
                  const category = categories.find(c => c.id === exercise.categoryId);
                  return (
                    <TableRow 
                      key={exercise.id}
                      className="group hover:bg-indigo-50/50 transition-all duration-200"
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Activity className="w-4 h-4 text-indigo-500 group-hover:scale-110 transition-transform duration-300" />
                          <span className="group-hover:text-indigo-600 transition-colors duration-200">
                            {exercise.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="px-3 py-1.5 bg-gradient-to-r from-indigo-500 to-indigo-400 text-white rounded-full text-sm font-medium shadow-sm">
                          {category?.name}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-indigo-100 hover:text-indigo-600 transition-colors"
                            onClick={() => onEdit(exercise)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-red-100 hover:text-red-600 transition-colors"
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
      </div>
    </Card>
  );
}
