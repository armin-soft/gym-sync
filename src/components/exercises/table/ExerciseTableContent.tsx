
import React from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Exercise, ExerciseCategory } from "@/types/exercise";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Dumbbell, Activity, Edit, Trash2 } from "lucide-react";

interface ExerciseTableContentProps {
  exercises: Exercise[];
  categories: ExerciseCategory[];
  selectedExercises: number[];
  onSelectAll: (checked: boolean) => void;
  onSelectExercise: (id: number, checked: boolean) => void;
  onEdit: (exercise: Exercise) => void;
  onDelete: (ids: number[]) => void;
  onClearFilters?: () => void;
}

export const ExerciseTableContent: React.FC<ExerciseTableContentProps> = ({
  exercises,
  categories,
  selectedExercises,
  onSelectAll,
  onSelectExercise,
  onEdit,
  onDelete,
  onClearFilters
}) => {
  const allSelected = exercises.length > 0 && selectedExercises.length === exercises.length;
  const isIndeterminate = selectedExercises.length > 0 && selectedExercises.length < exercises.length;

  return (
    <div className="relative overflow-x-auto rounded-lg border border-indigo-100">
      <div className="w-full overflow-auto max-h-[50vh]">
        <Table>
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-indigo-50 to-transparent hover:bg-indigo-50/50">
              <TableHead className="w-[40px] text-center">
                <Checkbox 
                  checked={allSelected}
                  onCheckedChange={onSelectAll}
                  className={cn(
                    isIndeterminate && "data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                  )}
                />
              </TableHead>
              <TableHead className="font-bold text-indigo-800 whitespace-nowrap">ردیف</TableHead>
              <TableHead className="font-bold text-indigo-800 whitespace-nowrap">نام حرکت</TableHead>
              <TableHead className="font-bold text-indigo-800 whitespace-nowrap">دسته‌بندی</TableHead>
              <TableHead className="w-[100px] text-center font-bold text-indigo-800 whitespace-nowrap">عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {exercises.length === 0 ? (
              <TableRow>
                <TableCell 
                  colSpan={5} 
                  className="text-center h-32 text-muted-foreground animate-fade-in"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Dumbbell className="w-8 h-8 text-indigo-200" />
                    <p>هیچ حرکتی یافت نشد</p>
                    {onClearFilters && (
                      <Button variant="link" onClick={onClearFilters} className="text-indigo-500">
                        پاک کردن فیلترها
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              exercises.map((exercise, index) => {
                const category = categories.find(c => c.id === exercise.categoryId);
                const key = `${exercise.id}-${exercise.name}-${index}`;
                return (
                  <TableRow 
                    key={key}
                    className={cn(
                      "group hover:bg-indigo-50/50 transition-all duration-200",
                      selectedExercises.includes(exercise.id) && "bg-indigo-50"
                    )}
                  >
                    <TableCell>
                      <Checkbox 
                        checked={selectedExercises.includes(exercise.id)}
                        onCheckedChange={(checked) => onSelectExercise(exercise.id, checked as boolean)}
                        className="data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                      />
                    </TableCell>
                    <TableCell className="font-medium text-muted-foreground">
                      {toPersianNumbers(index + 1)}
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-indigo-500 group-hover:scale-110 transition-transform duration-300" />
                        <span className="group-hover:text-indigo-600 transition-colors duration-200 whitespace-nowrap">
                          {exercise.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 sm:px-3 sm:py-1.5 bg-gradient-to-r from-indigo-500 to-indigo-400 text-white rounded-full text-xs sm:text-sm font-medium shadow-sm whitespace-nowrap">
                        {category?.name}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-1 sm:gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 sm:h-8 sm:w-8 hover:bg-indigo-100 hover:text-indigo-600 transition-colors"
                          onClick={() => onEdit(exercise)}
                        >
                          <Edit className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 sm:h-8 sm:w-8 hover:bg-red-100 hover:text-red-600 transition-colors"
                          onClick={() => onDelete([exercise.id])}
                        >
                          <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
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
  );
};

export default ExerciseTableContent;
