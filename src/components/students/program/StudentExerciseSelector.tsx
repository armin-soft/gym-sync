
import React, { useState, useMemo } from "react";
import { ExerciseWithSets } from "@/types/exercise";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Minus, Dumbbell, List, Grid3X3, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface StudentExerciseSelectorProps {
  exercises: any[];
  selectedExercises: ExerciseWithSets[];
  setSelectedExercises: React.Dispatch<React.SetStateAction<ExerciseWithSets[]>>;
  dayNumber: number;
}

const StudentExerciseSelector: React.FC<StudentExerciseSelectorProps> = ({
  exercises,
  selectedExercises,
  setSelectedExercises,
  dayNumber
}) => {
  // State for exercise type and category filtering
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  
  // Extract unique exercise types
  const exerciseTypes = useMemo(() => {
    const types = new Set<string>();
    exercises.forEach(exercise => {
      if (exercise.type) types.add(exercise.type);
    });
    return Array.from(types);
  }, [exercises]);
  
  // Extract categories based on selected type
  const categories = useMemo(() => {
    const categoryMap = new Map<number, string>();
    exercises.forEach(exercise => {
      if ((!selectedType || exercise.type === selectedType) && 
          exercise.categoryId && exercise.category) {
        categoryMap.set(exercise.categoryId, exercise.category);
      }
    });
    return Array.from(categoryMap.entries()).map(([id, name]) => ({ id, name }));
  }, [exercises, selectedType]);
  
  // Filter exercises based on type and category
  const filteredExercises = useMemo(() => {
    return exercises.filter(exercise => {
      const typeMatch = !selectedType || exercise.type === selectedType;
      const categoryMatch = !selectedCategory || exercise.categoryId === selectedCategory;
      return typeMatch && categoryMatch;
    });
  }, [exercises, selectedType, selectedCategory]);

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
    setSelectedExercises(prev => 
      prev.map(ex => 
        ex.id === exerciseId ? { ...ex, [field]: value } : ex
      )
    );
  };

  const clearFilters = () => {
    setSelectedType(null);
    setSelectedCategory(null);
  };

  return (
    <div className="space-y-4 rtl">
      {/* نمایش فیلترهای تمرینی */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Tabs defaultValue="types" className="w-full">
          <TabsList className="mb-4 justify-center">
            <TabsTrigger value="types">انواع تمرین</TabsTrigger>
            <TabsTrigger value="categories">دسته‌بندی‌ها</TabsTrigger>
            <TabsTrigger value="exercises">همه تمرین‌ها</TabsTrigger>
          </TabsList>
          
          {/* بخش نمایش انواع تمرین */}
          <div className="flex flex-wrap gap-2 mb-2">
            {selectedType ? (
              <Badge 
                variant="outline" 
                className="flex items-center gap-1 bg-indigo-50 text-indigo-700"
              >
                {selectedType}
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="h-4 w-4 p-0 rounded-full"
                  onClick={() => setSelectedType(null)}
                >
                  <X className="h-2.5 w-2.5" />
                </Button>
              </Badge>
            ) : (
              exerciseTypes.map(type => (
                <Button 
                  key={type} 
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => setSelectedType(type)}
                >
                  {type}
                </Button>
              ))
            )}
          </div>
          
          {/* بخش نمایش دسته‌بندی‌ها */}
          {selectedType && (
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedCategory ? (
                <Badge 
                  variant="outline" 
                  className="flex items-center gap-1 bg-green-50 text-green-700"
                >
                  {categories.find(c => c.id === selectedCategory)?.name}
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-4 w-4 p-0 rounded-full"
                    onClick={() => setSelectedCategory(null)}
                  >
                    <X className="h-2.5 w-2.5" />
                  </Button>
                </Badge>
              ) : (
                categories.map(category => (
                  <Button 
                    key={category.id} 
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </Button>
                ))
              )}
            </div>
          )}
        </Tabs>
        
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0"
              onClick={() => setViewMode("list")}
            >
              <List className={`h-4 w-4 ${viewMode === "list" ? "text-indigo-600" : "text-gray-400"}`} />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className={`h-4 w-4 ${viewMode === "grid" ? "text-indigo-600" : "text-gray-400"}`} />
            </Button>
          </div>
          
          {(selectedType || selectedCategory) && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={clearFilters}
            >
              پاک کردن فیلترها
            </Button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <h4 className="font-medium mb-3 flex items-center gap-2 justify-center">
              <Dumbbell className="h-4 w-4 text-indigo-500" />
              <span>تمرین‌های انتخاب شده برای روز {toPersianNumbers(dayNumber)}</span>
              <span className="inline-flex items-center justify-center bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full h-5 min-w-[20px] px-1.5">
                {toPersianNumbers(selectedExercises.length)}
              </span>
            </h4>
            
            <ScrollArea className="h-[300px] pr-4">
              {selectedExercises.length === 0 ? (
                <div className="text-center p-6 text-muted-foreground">
                  هنوز تمرینی برای روز {toPersianNumbers(dayNumber)} انتخاب نشده است.
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
                            <Input
                              id={`sets-${exercise.id}`}
                              value={exercise.sets}
                              onChange={(e) => updateExerciseDetails(exercise.id, 'sets', parseInt(e.target.value) || 1)}
                              className="h-8 text-sm mt-1 text-right"
                              type="number"
                              min="1"
                              max="10"
                            />
                          </div>
                          <div className="text-right">
                            <Label htmlFor={`reps-${exercise.id}`} className="text-xs">تکرار</Label>
                            <Input
                              id={`reps-${exercise.id}`}
                              value={exercise.reps}
                              onChange={(e) => updateExerciseDetails(exercise.id, 'reps', e.target.value)}
                              className="h-8 text-sm mt-1 text-right"
                              type="number"
                              min="1"
                              max="100"
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
            <ScrollArea className="h-[300px] pr-4">
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
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentExerciseSelector;
