
import React from "react";
import { Exercise, ExerciseCategory } from "@/types/exercise";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Plus, Minus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ExerciseSetsInput } from "@/components/exercises/inputs/ExerciseSetsInput";
import { ExerciseRepsInput } from "@/components/exercises/inputs/ExerciseRepsInput";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface EnhancedExerciseTabProps {
  exercises: Exercise[];
  databaseExercises: Exercise[];
  categories: ExerciseCategory[];
  selectedExercises: number[];
  toggleExercise: (id: number) => void;
  exerciseSets: Record<number, number>;
  handleSetsChange: (exerciseId: number, sets: number) => void;
  exerciseReps: Record<number, string>;
  handleRepsChange: (exerciseId: number, reps: string) => void;
  showAllExercises: boolean;
}

const EnhancedExerciseTab: React.FC<EnhancedExerciseTabProps> = ({
  exercises,
  databaseExercises,
  categories,
  selectedExercises,
  toggleExercise,
  exerciseSets,
  handleSetsChange,
  exerciseReps,
  handleRepsChange,
  showAllExercises,
}) => {
  // Find category for an exercise
  const getCategoryForExercise = (exercise: Exercise) => {
    return categories.find(c => c.id === exercise.categoryId) || { name: "دسته‌بندی نشده", color: "#888888" };
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1">
        {selectedExercises.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center p-4">
              <h3 className="font-medium text-lg mb-2">هیچ تمرینی انتخاب نشده</h3>
              <p className="text-muted-foreground mb-4">
                با استفاده از گفتار یا انتخاب از لیست، تمرین‌های مورد نظر را اضافه کنید
              </p>
              <Button
                variant="outline"
                onClick={() => {}}
                className="mx-auto"
              >
                افزودن تمرین
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <h3 className="font-medium">تمرین‌های انتخاب شده</h3>
            <div className="space-y-2">
              {exercises
                .filter(ex => selectedExercises.includes(ex.id))
                .map(exercise => {
                  const category = getCategoryForExercise(exercise);
                  return (
                    <Card key={exercise.id} className="p-3 overflow-hidden">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-right">{exercise.name}</h4>
                            <div className="flex items-center mt-1 gap-1">
                              <div 
                                className="h-3 w-3 rounded-full" 
                                style={{ backgroundColor: category.color }} 
                              />
                              <span className="text-xs text-muted-foreground">
                                {category.name}
                              </span>
                            </div>
                          </div>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8 border-red-200 hover:bg-red-50 hover:text-red-600"
                            onClick={() => toggleExercise(exercise.id)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 mt-1">
                          <div>
                            <label className="text-xs mb-1 block">تعداد ست</label>
                            <ExerciseSetsInput
                              value={exerciseSets[exercise.id] || 3}
                              onChange={(value) => handleSetsChange(exercise.id, value)}
                            />
                          </div>
                          <div>
                            <label className="text-xs mb-1 block">تکرار</label>
                            <ExerciseRepsInput
                              value={exerciseReps[exercise.id] || ""}
                              onChange={(value) => handleRepsChange(exercise.id, value)}
                            />
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
            </div>
          </div>
        )}
        
        {showAllExercises && databaseExercises.length > 0 && (
          <>
            <Separator className="my-4" />
            <div className="mb-2">
              <h3 className="font-medium">لیست تمرین‌ها</h3>
              <p className="text-xs text-muted-foreground">
                برای افزودن تمرین به برنامه، روی آن کلیک کنید
              </p>
            </div>
            <ScrollArea className="h-[200px]">
              <div className="space-y-2 pr-2">
                {databaseExercises.map(exercise => {
                  const isSelected = selectedExercises.includes(exercise.id);
                  const category = getCategoryForExercise(exercise);
                  
                  return (
                    <Card 
                      key={exercise.id} 
                      className={`p-3 overflow-hidden flex items-center justify-between transition-colors ${
                        isSelected ? "bg-blue-50 dark:bg-blue-900/20" : ""
                      }`}
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-right">{exercise.name}</h4>
                        <div className="flex items-center mt-1 gap-1">
                          <div 
                            className="h-3 w-3 rounded-full" 
                            style={{ backgroundColor: category.color }} 
                          />
                          <span className="text-xs text-muted-foreground">
                            {category.name}
                          </span>
                        </div>
                      </div>
                      
                      <Button
                        size="icon"
                        variant={isSelected ? "default" : "outline"}
                        className={`h-8 w-8 ${
                          isSelected 
                            ? "bg-blue-500 hover:bg-blue-600" 
                            : "hover:bg-blue-50 hover:text-blue-600"
                        }`}
                        onClick={() => toggleExercise(exercise.id)}
                      >
                        {isSelected ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Plus className="h-4 w-4" />
                        )}
                      </Button>
                    </Card>
                  );
                })}
              </div>
            </ScrollArea>
          </>
        )}
      </div>
    </div>
  );
};

export default EnhancedExerciseTab;
