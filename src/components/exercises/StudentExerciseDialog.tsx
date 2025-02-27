
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowRight, Dumbbell, Tag, FolderTree, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  Exercise,
  ExerciseCategory,
  ExerciseType,
} from "@/types/exercise";

interface StudentExerciseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
  onSave?: (exerciseIds: number[]) => void;
  initialExercises?: number[];
}

export function StudentExerciseDialog({
  open,
  onOpenChange,
  studentName,
  onSave,
  initialExercises = [],
}: StudentExerciseDialogProps) {
  const { toast } = useToast();
  const [exerciseTypes, setExerciseTypes] = useState<ExerciseType[]>([]);
  const [categories, setCategories] = useState<ExerciseCategory[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedExercises, setSelectedExercises] = useState<number[]>(initialExercises);
  const [isLoading, setIsLoading] = useState(false);

  // بارگذاری داده‌ها از localStorage
  const loadData = () => {
    try {
      const savedTypes = localStorage.getItem("exerciseTypes");
      const savedCategories = localStorage.getItem("exerciseCategories");
      const savedExercises = localStorage.getItem("exercises");

      if (savedTypes) setExerciseTypes(JSON.parse(savedTypes));
      if (savedCategories) setCategories(JSON.parse(savedCategories));
      if (savedExercises) setExercises(JSON.parse(savedExercises));
    } catch (error) {
      console.error("Error loading data:", error);
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطا در بارگذاری اطلاعات"
      });
    }
  };

  // پاکسازی انتخاب‌ها به جز تمرینات اولیه
  const resetSelections = () => {
    setSelectedType("");
    setSelectedCategories([]);
    // تنظیم تمرینات انتخاب شده به مقدار اولیه
    setSelectedExercises(initialExercises);
  };

  // بارگذاری اولیه داده‌ها و تنظیم تمرینات اولیه
  useEffect(() => {
    if (open) {
      loadData();
      resetSelections();
    }
  }, [open, initialExercises]);

  const filteredCategories = categories.filter(cat => cat.type === selectedType);
  
  const filteredExercises = exercises.filter(ex => 
    selectedCategories.includes(ex.categoryId)
  );
  
  // تمرینات انتخاب شده قبلی که باید نمایش داده شوند
  const selectedExercisesList = initialExercises.length > 0 
    ? exercises.filter(ex => initialExercises.includes(ex.id))
    : [];

  const handleSave = async () => {
    if (selectedExercises.length === 0) return;

    setIsLoading(true);
    try {
      console.log("Selected exercises:", selectedExercises);
      
      // فراخوانی callback برای ذخیره‌سازی
      if (onSave) {
        onSave(selectedExercises);
      }
      
      toast({
        title: "موفقیت",
        description: "حرکات تمرینی با موفقیت اضافه شدند"
      });
      
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving exercises:", error);
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطا در ذخیره‌سازی اطلاعات"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader className="pb-4">
          <DialogTitle className="flex items-center gap-2 text-lg">
            <Dumbbell className="h-5 w-5 text-blue-500" />
            افزودن تمرین برای {studentName}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            حرکات تمرینی مورد نظر را انتخاب کنید
          </DialogDescription>
        </DialogHeader>

        {/* نمایش تمرینات فعلی */}
        {selectedExercisesList.length > 0 && (
          <div className="bg-blue-50 p-3 rounded-md mb-4">
            <h3 className="font-semibold text-blue-700 mb-2 flex items-center gap-1">
              <Dumbbell className="h-4 w-4" />
              تمرینات فعلی ({selectedExercisesList.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedExercisesList.map(exercise => (
                <div key={exercise.id} className="bg-white rounded-full px-3 py-1 text-sm border border-blue-200 flex items-center">
                  {exercise.name}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 flex-1 min-h-0">
          {/* ستون نوع تمرین */}
          <Card className="p-4 space-y-4 overflow-hidden flex flex-col">
            <div className="flex items-center gap-2 pb-2 border-b">
              <Tag className="h-5 w-5 text-blue-500" />
              <h3 className="font-semibold">نوع تمرین</h3>
            </div>
            <ScrollArea className="flex-1">
              <div className="space-y-2 pr-4">
                {exerciseTypes.map((type) => (
                  <Button
                    key={type}
                    variant={selectedType === type ? "default" : "outline"}
                    className="w-full justify-start gap-2"
                    onClick={() => {
                      setSelectedType(type);
                      setSelectedCategories([]);
                    }}
                  >
                    <ArrowRight className="h-4 w-4" />
                    {type}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </Card>

          {/* ستون دسته بندی */}
          <Card className="p-4 space-y-4 overflow-hidden flex flex-col">
            <div className="flex items-center gap-2 pb-2 border-b">
              <FolderTree className="h-5 w-5 text-purple-500" />
              <h3 className="font-semibold">دسته بندی</h3>
            </div>
            <ScrollArea className="flex-1">
              <div className="space-y-2 pr-4">
                {selectedType ? (
                  filteredCategories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center space-x-2 space-x-reverse"
                    >
                      <Checkbox
                        id={`category-${category.id}`}
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={(checked) => {
                          setSelectedCategories(prev =>
                            checked
                              ? [...prev, category.id]
                              : prev.filter(id => id !== category.id)
                          );
                        }}
                      />
                      <label
                        htmlFor={`category-${category.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {category.name}
                      </label>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    لطفاً ابتدا نوع تمرین را انتخاب کنید
                  </p>
                )}
              </div>
            </ScrollArea>
          </Card>

          {/* ستون حرکات */}
          <Card className="p-4 space-y-4 overflow-hidden flex flex-col">
            <div className="flex items-center gap-2 pb-2 border-b">
              <Dumbbell className="h-5 w-5 text-indigo-500" />
              <h3 className="font-semibold">حرکات</h3>
            </div>
            <ScrollArea className="flex-1">
              <div className="space-y-2 pr-4">
                {selectedCategories.length > 0 ? (
                  filteredExercises.map((exercise) => (
                    <div
                      key={exercise.id}
                      className="flex items-center space-x-2 space-x-reverse"
                    >
                      <Checkbox
                        id={`exercise-${exercise.id}`}
                        checked={selectedExercises.includes(exercise.id)}
                        onCheckedChange={(checked) => {
                          setSelectedExercises(prev =>
                            checked
                              ? [...prev, exercise.id]
                              : prev.filter(id => id !== exercise.id)
                          );
                        }}
                      />
                      <label
                        htmlFor={`exercise-${exercise.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {exercise.name}
                      </label>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    لطفاً ابتدا دسته بندی را انتخاب کنید
                  </p>
                )}
              </div>
            </ScrollArea>
          </Card>
        </div>

        <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => {
              onOpenChange(false);
            }}
            disabled={isLoading}
          >
            انصراف
          </Button>
          <Button
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            disabled={selectedExercises.length === 0 || isLoading}
            onClick={handleSave}
          >
            {isLoading ? (
              "در حال ذخیره..."
            ) : (
              <>
                <Plus className="w-4 h-4 ml-2" />
                ذخیره حرکات
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
