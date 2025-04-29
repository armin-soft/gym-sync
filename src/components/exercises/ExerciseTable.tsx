
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowUpDown, Edit, Plus, Trash2, Activity, Dumbbell, Filter, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Exercise, ExerciseCategory } from "@/types/exercise";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface ExerciseTableProps {
  exercises: Exercise[];
  categories: ExerciseCategory[];
  onAdd: () => void;
  onEdit: (exercise: Exercise) => void;
  onDelete: (exerciseIds: number[]) => void;
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
  const [selectedExercises, setSelectedExercises] = useState<number[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [exercisesToDelete, setExercisesToDelete] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>(exercises);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedExercises(filteredExercises.map(ex => ex.id));
    } else {
      setSelectedExercises([]);
    }
  };

  const handleSelectExercise = (exerciseId: number, checked: boolean) => {
    setSelectedExercises(prev => 
      checked 
        ? [...prev, exerciseId]
        : prev.filter(id => id !== exerciseId)
    );
  };

  const confirmDelete = (ids: number[]) => {
    setExercisesToDelete(ids);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    onDelete(exercisesToDelete);
    setIsDeleteDialogOpen(false);
    setExercisesToDelete([]);
    setSelectedExercises([]);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategoryId(null);
  };

  useEffect(() => {
    let result = exercises;

    if (searchQuery) {
      result = result.filter(ex => 
        ex.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategoryId) {
      result = result.filter(ex => ex.categoryId === selectedCategoryId);
    }

    setFilteredExercises(result);
  }, [exercises, searchQuery, selectedCategoryId]);

  useEffect(() => {
    setSelectedExercises([]);
  }, [filteredExercises]);

  const allSelected = filteredExercises.length > 0 && selectedExercises.length === filteredExercises.length;
  const isIndeterminate = selectedExercises.length > 0 && selectedExercises.length < filteredExercises.length;

  return (
    <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-white to-indigo-50/30">
      <div className="p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between mb-4 sm:mb-6 gap-3">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Dumbbell className="w-5 h-5 text-indigo-500" />
            حرکات تمرینی
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            {selectedExercises.length > 0 && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => confirmDelete(selectedExercises)}
                className="gap-1 text-xs sm:text-sm"
              >
                <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                حذف {selectedExercises.length > 1 
                  ? `${toPersianNumbers(selectedExercises.length)} حرکت` 
                  : "حرکت منتخب"}
              </Button>
            )}
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
              <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
              افزودن حرکت
            </Button>
          </div>
        </div>

        <div className="mb-4 flex flex-col sm:flex-row gap-2 sm:gap-4">
          <div className="relative flex-1">
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search className="h-4 w-4" />
            </div>
            <Input
              placeholder="جستجوی حرکت..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 h-9 sm:h-10"
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 w-full sm:w-auto h-9 sm:h-10 text-xs sm:text-sm">
                <Filter className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                فیلتر دسته‌بندی
                {selectedCategoryId && <span className="px-1.5 py-0.5 bg-indigo-100 text-indigo-800 rounded-full text-xs mr-1">{toPersianNumbers(1)}</span>}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem 
                onClick={() => setSelectedCategoryId(null)}
                className={!selectedCategoryId ? "bg-indigo-50 text-indigo-700 font-medium" : ""}
              >
                همه دسته‌بندی‌ها
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              
              {categories.map(category => (
                <DropdownMenuItem
                  key={category.id}
                  onClick={() => setSelectedCategoryId(category.id)}
                  className={selectedCategoryId === category.id ? "bg-indigo-50 text-indigo-700 font-medium" : ""}
                >
                  {category.name}
                </DropdownMenuItem>
              ))}
              
              {(searchQuery || selectedCategoryId) && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleClearFilters} className="text-red-600">
                    پاک کردن فیلترها
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="relative overflow-x-auto rounded-lg border border-indigo-100">
          <div className="w-full overflow-auto max-h-[50vh]">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-indigo-50 to-transparent hover:bg-indigo-50/50">
                  <TableHead className="w-[40px] text-center">
                    <Checkbox 
                      checked={allSelected}
                      onCheckedChange={handleSelectAll}
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
                {filteredExercises.length === 0 ? (
                  <TableRow>
                    <TableCell 
                      colSpan={5} 
                      className="text-center h-32 text-muted-foreground animate-fade-in"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Dumbbell className="w-8 h-8 text-indigo-200" />
                        <p>هیچ حرکتی یافت نشد</p>
                        {(searchQuery || selectedCategoryId) && (
                          <Button variant="link" onClick={handleClearFilters} className="text-indigo-500">
                            پاک کردن فیلترها
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredExercises.map((exercise, index) => {
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
                            onCheckedChange={(checked) => handleSelectExercise(exercise.id, checked as boolean)}
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
                              onClick={() => confirmDelete([exercise.id])}
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
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="max-w-[90%] w-[450px]">
          <AlertDialogHeader>
            <AlertDialogTitle>تأیید حذف</AlertDialogTitle>
            <AlertDialogDescription className="whitespace-pre-line max-h-[40vh] overflow-auto">
              {exercisesToDelete.length === 1 ? (
                `آیا از حذف حرکت «${exercises.find(ex => ex.id === exercisesToDelete[0])?.name}» اطمینان دارید؟`
              ) : (
                `آیا از حذف ${toPersianNumbers(exercisesToDelete.length)} حرکت زیر اطمینان دارید؟\n\n${
                  exercisesToDelete
                    .map((id, index) => {
                      const exercise = exercises.find(ex => ex.id === id);
                      return `${toPersianNumbers(index + 1)}. ${exercise?.name}`;
                    })
                    .join('\n')
                }`
              )}
              {'\n\n'}
              این عملیات قابل بازگشت نیست.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row-reverse space-x-2 space-x-reverse">
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              حذف
            </AlertDialogAction>
            <AlertDialogCancel className="hover:bg-gray-100">انصراف</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
