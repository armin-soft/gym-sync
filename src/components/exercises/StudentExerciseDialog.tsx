import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useExerciseSelection } from "@/hooks/useExerciseSelection";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import StudentExerciseListWrapper from "./StudentExerciseListWrapper";

interface StudentExerciseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
  onSave: (exerciseIds: number[], dayNumber?: number) => void;
  initialExercises: number[];
  initialExercisesDay1: number[];
  initialExercisesDay2: number[];
  initialExercisesDay3: number[];
  initialExercisesDay4: number[];
}

const StudentExerciseDialog: React.FC<StudentExerciseDialogProps> = ({
  open,
  onOpenChange,
  studentName,
  onSave,
  initialExercises,
  initialExercisesDay1,
  initialExercisesDay2,
  initialExercisesDay3,
  initialExercisesDay4,
}) => {
  const { toast } = useToast();
  const [selectedExercisesDay1, setSelectedExercisesDay1] = useState<number[]>(initialExercisesDay1 || []);
  const [selectedExercisesDay2, setSelectedExercisesDay2] = useState<number[]>(initialExercisesDay2 || []);
  const [selectedExercisesDay3, setSelectedExercisesDay3] = useState<number[]>(initialExercisesDay3 || []);
  const [selectedExercisesDay4, setSelectedExercisesDay4] = useState<number[]>(initialExercisesDay4 || []);
  
  const { selectedExercises, toggleExercise } = useExerciseSelection(initialExercises);
  
  const { data: exercises = [] } = useQuery({
    queryKey: ["exercises"],
    queryFn: () => {
      const exercisesData = localStorage.getItem("exercises");
      return exercisesData ? JSON.parse(exercisesData) : [];
    },
  });
  
  useEffect(() => {
    setSelectedExercisesDay1(initialExercisesDay1 || []);
  }, [initialExercisesDay1]);
  
  useEffect(() => {
    setSelectedExercisesDay2(initialExercisesDay2 || []);
  }, [initialExercisesDay2]);
  
  useEffect(() => {
    setSelectedExercisesDay3(initialExercisesDay3 || []);
  }, [initialExercisesDay3]);
  
  useEffect(() => {
    setSelectedExercisesDay4(initialExercisesDay4 || []);
  }, [initialExercisesDay4]);

  const handleSave = (dayNumber?: number) => {
    let exerciseIds: number[] = [];
    
    switch (dayNumber) {
      case 1:
        exerciseIds = selectedExercisesDay1;
        break;
      case 2:
        exerciseIds = selectedExercisesDay2;
        break;
      case 3:
        exerciseIds = selectedExercisesDay3;
        break;
      case 4:
        exerciseIds = selectedExercisesDay4;
        break;
      default:
        exerciseIds = selectedExercises;
        break;
    }
    
    const success = onSave(exerciseIds, dayNumber);
    if (success) {
      toast({
        title: "ذخیره موفق",
        description: "تغییرات با موفقیت ذخیره شدند",
      });
    }
  };
  
  const toggleExerciseDay1 = (exerciseId: number) => {
    setSelectedExercisesDay1(prevExercises =>
      prevExercises.includes(exerciseId)
        ? prevExercises.filter(id => id !== exerciseId)
        : [...prevExercises, exerciseId]
    );
  };
  
  const toggleExerciseDay2 = (exerciseId: number) => {
    setSelectedExercisesDay2(prevExercises =>
      prevExercises.includes(exerciseId)
        ? prevExercises.filter(id => id !== exerciseId)
        : [...prevExercises, exerciseId]
    );
  };
  
  const toggleExerciseDay3 = (exerciseId: number) => {
    setSelectedExercisesDay3(prevExercises =>
      prevExercises.includes(exerciseId)
        ? prevExercises.filter(id => id !== exerciseId)
        : [...prevExercises, exerciseId]
    );
  };
  
  const toggleExerciseDay4 = (exerciseId: number) => {
    setSelectedExercisesDay4(prevExercises =>
      prevExercises.includes(exerciseId)
        ? prevExercises.filter(id => id !== exerciseId)
        : [...prevExercises, exerciseId]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>مدیریت تمرین‌های {studentName}</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="day1" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="day1">روز اول</TabsTrigger>
            <TabsTrigger value="day2">روز دوم</TabsTrigger>
            <TabsTrigger value="day3">روز سوم</TabsTrigger>
            <TabsTrigger value="day4">روز چهارم</TabsTrigger>
          </TabsList>
          
          <TabsContent value="day1">
            <StudentExerciseListWrapper>
              <div className="grid gap-4">
                {exercises.map((exercise) => (
                  <div key={exercise.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`exercise-${exercise.id}-day1`}
                      className="h-4 w-4 rounded border-gray-200 text-blue-600 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                      checked={selectedExercisesDay1.includes(exercise.id)}
                      onChange={() => toggleExerciseDay1(exercise.id)}
                    />
                    <label
                      htmlFor={`exercise-${exercise.id}-day1`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {exercise.name}
                    </label>
                  </div>
                ))}
              </div>
            </StudentExerciseListWrapper>
            <div className="flex justify-end mt-4">
              <Button onClick={() => handleSave(1)} className="gap-2">
                <Save className="h-4 w-4" />
                ذخیره تمرین‌های روز اول
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="day2">
            <StudentExerciseListWrapper>
              <div className="grid gap-4">
                {exercises.map((exercise) => (
                  <div key={exercise.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`exercise-${exercise.id}-day2`}
                      className="h-4 w-4 rounded border-gray-200 text-blue-600 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                      checked={selectedExercisesDay2.includes(exercise.id)}
                      onChange={() => toggleExerciseDay2(exercise.id)}
                    />
                    <label
                      htmlFor={`exercise-${exercise.id}-day2`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {exercise.name}
                    </label>
                  </div>
                ))}
              </div>
            </StudentExerciseListWrapper>
            <div className="flex justify-end mt-4">
              <Button onClick={() => handleSave(2)} className="gap-2">
                <Save className="h-4 w-4" />
                ذخیره تمرین‌های روز دوم
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="day3">
            <StudentExerciseListWrapper>
              <div className="grid gap-4">
                {exercises.map((exercise) => (
                  <div key={exercise.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`exercise-${exercise.id}-day3`}
                      className="h-4 w-4 rounded border-gray-200 text-blue-600 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                      checked={selectedExercisesDay3.includes(exercise.id)}
                      onChange={() => toggleExerciseDay3(exercise.id)}
                    />
                    <label
                      htmlFor={`exercise-${exercise.id}-day3`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {exercise.name}
                    </label>
                  </div>
                ))}
              </div>
            </StudentExerciseListWrapper>
            <div className="flex justify-end mt-4">
              <Button onClick={() => handleSave(3)} className="gap-2">
                <Save className="h-4 w-4" />
                ذخیره تمرین‌های روز سوم
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="day4">
            <StudentExerciseListWrapper>
              <div className="grid gap-4">
                {exercises.map((exercise) => (
                  <div key={exercise.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`exercise-${exercise.id}-day4`}
                      className="h-4 w-4 rounded border-gray-200 text-blue-600 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                      checked={selectedExercisesDay4.includes(exercise.id)}
                      onChange={() => toggleExerciseDay4(exercise.id)}
                    />
                    <label
                      htmlFor={`exercise-${exercise.id}-day4`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {exercise.name}
                    </label>
                  </div>
                ))}
              </div>
            </StudentExerciseListWrapper>
            <div className="flex justify-end mt-4">
              <Button onClick={() => handleSave(4)} className="gap-2">
                <Save className="h-4 w-4" />
                ذخیره تمرین‌های روز چهارم
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default StudentExerciseDialog;
