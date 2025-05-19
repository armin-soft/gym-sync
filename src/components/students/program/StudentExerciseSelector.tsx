
import React, { useState, useMemo, useEffect } from "react";
import { ExerciseWithSets } from "@/types/exercise";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Minus, Dumbbell, List, Grid3X3, X, ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useExerciseData } from "@/hooks/exercises/useExerciseData";
import { HierarchicalMenu } from "@/components/exercises/search-filters/HierarchicalMenu";
import { ExerciseSetsInput } from "@/components/exercises/ExerciseSetsInput";
import { ExerciseRepsInput } from "@/components/exercises/ExerciseRepsInput";

interface StudentExerciseSelectorProps {
  selectedExercises: ExerciseWithSets[];
  setSelectedExercises: React.Dispatch<React.SetStateAction<ExerciseWithSets[]>>;
  dayNumber: number;
  exercises: any[]; // Add exercises prop
  dayLabel?: string;
}

const StudentExerciseSelector: React.FC<StudentExerciseSelectorProps> = ({
  selectedExercises,
  setSelectedExercises,
  dayNumber,
  exercises, // Use exercises from props
  dayLabel,
}) => {
  // State for exercise type and category filtering
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  
  // دریافت داده‌ها از دیتابیس محلی
  const { categories, exerciseTypes, isLoading } = useExerciseData();
  
  // فیلتر دسته‌بندی‌ها بر اساس نوع تمرین انتخاب شده
  const filteredCategories = useMemo(() => {
    if (!selectedType) return [];
    
    return categories.filter(cat => cat.type === selectedType);
  }, [categories, selectedType]);
  
  // فیلتر تمرین‌ها بر اساس نوع و دسته‌بندی
  const filteredExercises = useMemo(() => {
    if (isLoading || !selectedType || !selectedCategoryId) return [];
    
    return exercises.filter(exercise => {
      const category = categories.find(cat => cat.id === exercise.categoryId);
      return category?.type === selectedType && exercise.categoryId === selectedCategoryId;
    });
  }, [exercises, categories, selectedType, selectedCategoryId, isLoading]);

  // Auto-select type and category if a student has existing exercises - trigger on day change as well
  useEffect(() => {
    if (selectedExercises.length > 0) {
      const firstExercise = selectedExercises[0];
      const exercise = exercises.find(ex => ex.id === firstExercise.id);
      
      if (exercise) {
        const category = categories.find(cat => cat.id === exercise.categoryId);
        if (category) {
          setSelectedType(category.type);
          setSelectedCategoryId(exercise.categoryId);
        }
      }
    }
  }, [selectedExercises, exercises, categories, dayNumber]);

  const toggleExercise = (exerciseId: number) => {
    if (selectedExercises.some(ex => ex.id === exerciseId)) {
      setSelectedExercises(prev => prev.filter(ex => ex.id !== exerciseId));
    } else {
      setSelectedExercises(prev => [
        ...prev, 
        { 
          id: exerciseId, 
          sets: 3, 
          reps: "12", 
          day: dayNumber
        }
      ]);
    }
  };

  const updateExerciseDetails = (exerciseId: number, field: keyof ExerciseWithSets, value: any) => {
    console.log(`Updating exercise ${exerciseId} field ${field} with value ${value}`);
    setSelectedExercises(prev => 
      prev.map(ex => 
        ex.id === exerciseId ? { ...ex, [field]: value } : ex
      )
    );
  };
  
  const handleSetsChange = (exerciseId: number, sets: number) => {
    console.log(`Sets changing for exercise ${exerciseId} to ${sets}`);
    updateExerciseDetails(exerciseId, 'sets', sets);
  };

  const handleRepsChange = (exerciseId: number, reps: string) => {
    updateExerciseDetails(exerciseId, 'reps', reps);
  };

  const clearFilters = () => {
    setSelectedType(null);
    setSelectedCategoryId(null);
  };

  const getDayLabel = () => {
    if (dayLabel) return dayLabel;
    
    switch (dayNumber) {
      case 1: return "روز اول";
      case 2: return "روز دوم";
      case 3: return "روز سوم";
      case 4: return "روز چهارم";
      default: return `روز ${toPersianNumbers(dayNumber)}`;
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center">در حال بارگذاری...</div>;
  }

  return (
    <div className="space-y-4 rtl">
      {/* نمایش منوی سلسله مراتبی انتخاب */}
      <div className="mb-4">
        <HierarchicalMenu
          selectedExerciseType={selectedType}
          setSelectedExerciseType={setSelectedType}
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
          exerciseTypes={exerciseTypes}
          filteredCategories={filteredCategories}
        />
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          {selectedType && selectedCategoryId ? (
            <span>
              نمایش {toPersianNumbers(filteredExercises.length)} تمرین برای{" "}
              <span className="font-semibold">{selectedType}</span>{" - "}
              <span className="font-semibold">
                {categories.find(c => c.id === selectedCategoryId)?.name}
              </span>
            </span>
          ) : selectedType ? (
            <span>لطفاً یک دسته‌بندی انتخاب کنید</span>
          ) : (
            <span>لطفاً ابتدا نوع تمرین را انتخاب کنید</span>
          )}
        </div>

        {(selectedType || selectedCategoryId) && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={clearFilters}
            className="text-xs"
          >
            پاک کردن فیلترها
            <X className="h-3 w-3 mr-1" />
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <h4 className="font-medium mb-3 flex items-center gap-2 justify-center">
              <Dumbbell className="h-4 w-4 text-indigo-500" />
              <span>تمرین‌های انتخاب شده برای {getDayLabel()}</span>
              <span className="inline-flex items-center justify-center bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full h-5 min-w-[20px] px-1.5">
                {toPersianNumbers(selectedExercises.length)}
              </span>
            </h4>
            
            <ScrollArea className="h-[300px] pr-4">
              {selectedExercises.length === 0 ? (
                <div className="text-center p-6 text-muted-foreground">
                  هنوز تمرینی برای {getDayLabel()} انتخاب نشده است.
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedExercises.map(exercise => {
                    const exerciseInfo = exercises.find(e => e.id === exercise.id);
                    return (
                      <div key={exercise.id} className="border rounded-md p-3">
                        <div className="flex justify-between items-center mb-2">
                          <div className="font-medium text-right">{exerciseInfo?.name || `تمرین ${toPersianNumbers(exercise.id)}`}</div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                            onClick={() => toggleExercise(exercise.id)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div className="text-right">
                            <Label htmlFor={`sets-${exercise.id}`} className="text-xs">تعداد ست</Label>
                            <ExerciseSetsInput
                              exerciseId={exercise.id}
                              sets={exercise.sets}
                              onSetsChange={handleSetsChange}
                              className="mt-1 w-full"
                              isPersian={true}
                            />
                          </div>
                          <div className="text-right">
                            <Label htmlFor={`reps-${exercise.id}`} className="text-xs">تکرار</Label>
                            <ExerciseRepsInput
                              exerciseId={exercise.id}
                              reps={exercise.reps}
                              onRepsChange={handleRepsChange}
                              className="mt-1 w-full"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <h4 className="font-medium mb-3 text-right">لیست تمرین‌ها</h4>
            
            {!selectedType && (
              <div className="text-center p-8 border border-dashed rounded-md">
                <p className="text-muted-foreground">لطفاً ابتدا یک نوع تمرین انتخاب کنید</p>
              </div>
            )}
            
            {selectedType && !selectedCategoryId && (
              <div className="text-center p-8 border border-dashed rounded-md">
                <p className="text-muted-foreground">لطفاً یک دسته‌بندی انتخاب کنید</p>
              </div>
            )}
            
            {selectedType && selectedCategoryId && (
              <ScrollArea className="h-[300px] pr-4">
                {filteredExercises.length === 0 ? (
                  <div className="text-center p-8 border border-dashed rounded-md">
                    <p className="text-muted-foreground">هیچ تمرینی برای این دسته‌بندی یافت نشد</p>
                  </div>
                ) : (
                  <div className={viewMode === "grid" ? "grid grid-cols-2 gap-2" : "space-y-2"}>
                    {filteredExercises.map(exercise => (
                      <div 
                        key={exercise.id} 
                        className={`border rounded-md p-2 flex items-center justify-between cursor-pointer hover:bg-slate-50 ${
                          selectedExercises.some(ex => ex.id === exercise.id) ? 'border-indigo-500 bg-indigo-50' : ''
                        }`}
                        onClick={() => toggleExercise(exercise.id)}
                      >
                        <div className="flex items-center gap-3">
                          <Checkbox 
                            checked={selectedExercises.some(ex => ex.id === exercise.id)}
                            className="data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500"
                          />
                          <div className="text-right">
                            <div className="font-medium">{exercise.name}</div>
                            {exercise.category && (
                              <Badge variant="outline" className="text-xs bg-indigo-50 text-indigo-700 border-indigo-200 mt-1">
                                {exercise.category}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 w-7 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExercise(exercise.id);
                          }}
                        >
                          {selectedExercises.some(ex => ex.id === exercise.id) ? (
                            <Minus className="h-4 w-4" />
                          ) : (
                            <Plus className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentExerciseSelector;
