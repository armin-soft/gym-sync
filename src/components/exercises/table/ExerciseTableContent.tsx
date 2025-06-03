
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
  isMobile?: boolean;
}

export const ExerciseTableContent: React.FC<ExerciseTableContentProps> = ({
  exercises,
  categories,
  selectedExercises,
  onSelectAll,
  onSelectExercise,
  onEdit,
  onDelete,
  onClearFilters,
  isMobile
}) => {
  const allSelected = exercises.length > 0 && selectedExercises.length === exercises.length;
  const isIndeterminate = selectedExercises.length > 0 && selectedExercises.length < exercises.length;

  return (
    <div className="relative rounded-lg border border-indigo-100 overflow-hidden w-full">
      <div className="w-full overflow-auto max-h-[50vh] sm:max-h-[55vh] md:max-h-[60vh] lg:max-h-[65vh]">
        <Table className="min-w-[450px] sm:min-w-[500px] w-full">
          <TableHeader className="sticky top-0 z-10 bg-white">
            <TableRow className="bg-gradient-to-r from-indigo-50 to-transparent hover:bg-indigo-50/50">
              <TableHead className="w-[40px] text-center py-2 sm:py-3">
                <Checkbox 
                  checked={allSelected}
                  onCheckedChange={onSelectAll}
                  className={cn(
                    "h-3.5 w-3.5 sm:h-4 sm:w-4",
                    isIndeterminate && "data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                  )}
                />
              </TableHead>
              <TableHead className="font-bold text-indigo-800 whitespace-nowrap py-2 sm:py-3 text-xs sm:text-sm">ردیف</TableHead>
              <TableHead className="font-bold text-indigo-800 whitespace-nowrap py-2 sm:py-3 text-xs sm:text-sm">نام حرکت</TableHead>
              <TableHead className="font-bold text-indigo-800 whitespace-nowrap py-2 sm:py-3 text-xs sm:text-sm">دسته‌بندی</TableHead>
              <TableHead className="w-[80px] sm:w-[100px] text-center font-bold text-indigo-800 whitespace-nowrap py-2 sm:py-3 text-xs sm:text-sm">عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {exercises.length === 0 ? (
              <TableRow>
                <TableCell 
                  colSpan={5} 
                  className="text-center h-24 sm:h-32 text-muted-foreground animate-fade-in"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Dumbbell className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-indigo-200" />
                    <p className="text-sm sm:text-base">هیچ حرکتی یافت نشد</p>
                    {onClearFilters && (
                      <Button variant="link" onClick={onClearFilters} className="text-indigo-500 text-xs sm:text-sm">
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
                    <TableCell className="py-1.5 sm:py-2 md:py-3">
                      <Checkbox 
                        checked={selectedExercises.includes(exercise.id)}
                        onCheckedChange={(checked) => onSelectExercise(exercise.id, checked as boolean)}
                        className="h-3.5 w-3.5 sm:h-4 sm:w-4 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                      />
                    </TableCell>
                    <TableCell className="font-medium text-muted-foreground text-xs sm:text-sm py-1.5 sm:py-2 md:py-3">
                      {toPersianNumbers(index + 1)}
                    </TableCell>
                    <TableCell className="font-medium text-xs sm:text-sm py-1.5 sm:py-2 md:py-3">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-500 group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
                        <span className="group-hover:text-indigo-600 transition-colors duration-200 whitespace-nowrap">
                          {exercise.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-1.5 sm:py-2 md:py-3">
                      <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-gradient-to-r from-indigo-500 to-indigo-400 text-white rounded-full text-xs sm:text-xs font-medium shadow-sm whitespace-nowrap">
                        {category?.name}
                      </span>
                    </TableCell>
                    <TableCell className="py-1.5 sm:py-2 md:py-3">
                      <div className="flex items-center justify-center gap-1 sm:gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 hover:bg-indigo-100 hover:text-indigo-600 transition-colors"
                          onClick={() => onEdit(exercise)}
                        >
                          <Edit className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 hover:bg-red-100 hover:text-red-600 transition-colors"
                          onClick={() => onDelete([exercise.id])}
                        >
                          <Trash2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
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
