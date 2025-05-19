
import React from "react";
import { ExerciseWithSets } from "@/types/exercise";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Minus, Dumbbell } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

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
  const toggleExercise = (exerciseId: number) => {
    if (selectedExercises.some(ex => ex.id === exerciseId)) {
      setSelectedExercises(prev => prev.filter(ex => ex.id !== exerciseId));
    } else {
      setSelectedExercises(prev => [
        ...prev, 
        { 
          id: exerciseId, 
          sets: 3, 
          reps: "12-15", 
          rest: "60s",
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

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Dumbbell className="h-4 w-4 text-indigo-500" />
              تمرین‌های انتخاب شده ({selectedExercises.length})
            </h4>
            
            <ScrollArea className="h-[300px] pr-4">
              {selectedExercises.length === 0 ? (
                <div className="text-center p-6 text-muted-foreground">
                  هنوز تمرینی برای روز {dayNumber} انتخاب نشده است.
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedExercises.map(exercise => {
                    const exerciseInfo = exercises.find(e => e.id === exercise.id);
                    return (
                      <div key={exercise.id} className="border rounded-md p-3">
                        <div className="flex justify-between items-center mb-2">
                          <div className="font-medium">{exerciseInfo?.name || `تمرین ${exercise.id}`}</div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                            onClick={() => toggleExercise(exercise.id)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          <div>
                            <Label htmlFor={`sets-${exercise.id}`} className="text-xs">تعداد ست</Label>
                            <Input
                              id={`sets-${exercise.id}`}
                              value={exercise.sets}
                              onChange={(e) => updateExerciseDetails(exercise.id, 'sets', parseInt(e.target.value) || 1)}
                              className="h-8 text-sm mt-1"
                              type="number"
                              min="1"
                              max="10"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`reps-${exercise.id}`} className="text-xs">تکرار</Label>
                            <Input
                              id={`reps-${exercise.id}`}
                              value={exercise.reps}
                              onChange={(e) => updateExerciseDetails(exercise.id, 'reps', e.target.value)}
                              className="h-8 text-sm mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`rest-${exercise.id}`} className="text-xs">استراحت</Label>
                            <Input
                              id={`rest-${exercise.id}`}
                              value={exercise.rest}
                              onChange={(e) => updateExerciseDetails(exercise.id, 'rest', e.target.value)}
                              className="h-8 text-sm mt-1"
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
            <h4 className="font-medium mb-3">لیست تمرین‌ها</h4>
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-2">
                {exercises.map(exercise => (
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
                      <div>
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
                        if (selectedExercises.some(ex => ex.id === exercise.id)) {
                          toggleExercise(exercise.id);
                        } else {
                          toggleExercise(exercise.id);
                        }
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
