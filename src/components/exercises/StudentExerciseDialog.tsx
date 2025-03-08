import React from "react";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useExerciseSelection } from "@/hooks/useExerciseSelection";
import { ExerciseCard } from "./ExerciseCard";
import { StudentExerciseListWrapper } from "./StudentExerciseListWrapper";

interface StudentExerciseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
  onSave: (exerciseIds: number[], dayNumber?: number) => boolean;
  initialExercises?: number[];
  initialExercisesDay1?: number[];
  initialExercisesDay2?: number[];
  initialExercisesDay3?: number[];
  initialExercisesDay4?: number[];
}

const StudentExerciseDialog: React.FC<StudentExerciseDialogProps> = ({
  open,
  onOpenChange,
  studentName,
  onSave,
  initialExercises = [],
  initialExercisesDay1 = [],
  initialExercisesDay2 = [],
  initialExercisesDay3 = [],
  initialExercisesDay4 = [],
}) => {
  const { data: exercises = [] } = useQuery({
    queryKey: ["exercises"],
    queryFn: () => {
      const exercisesData = localStorage.getItem("exercises");
      return exercisesData ? JSON.parse(exercisesData) : [];
    },
  });

  const {
    selectedExercises,
    selectedExercisesDay1,
    selectedExercisesDay2,
    selectedExercisesDay3,
    selectedExercisesDay4,
    toggleExercise,
    toggleExerciseDay1,
    toggleExerciseDay2,
    toggleExerciseDay3,
    toggleExerciseDay4,
  } = useExerciseSelection(initialExercises, initialExercisesDay1, initialExercisesDay2, initialExercisesDay3, initialExercisesDay4);

  const handleSaveExercises = (exerciseIds: number[], dayNumber?: number) => {
    onSave(exerciseIds, dayNumber);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl">
            مدیریت تمرین‌های {studentName}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="day1" className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="grid grid-cols-5 gap-2">
            <TabsTrigger value="day1">روز اول</TabsTrigger>
            <TabsTrigger value="day2">روز دوم</TabsTrigger>
            <TabsTrigger value="day3">روز سوم</TabsTrigger>
            <TabsTrigger value="day4">روز چهارم</TabsTrigger>
            <TabsTrigger value="general">عمومی</TabsTrigger>
          </TabsList>

          {/* Day 1 */}
          <TabsContent value="day1" className="flex-1 overflow-hidden flex flex-col">
            <StudentExerciseListWrapper maxHeight="50vh">
              {exercises.map((exercise) => (
                <ExerciseCard
                  key={exercise.id}
                  title={exercise.name}
                  description={exercise.description}
                  imageUrl={exercise.imageUrl}
                  selected={selectedExercisesDay1.includes(exercise.id)}
                  onClick={() => toggleExerciseDay1(exercise.id)}
                />
              ))}
            </StudentExerciseListWrapper>
            <div className="mt-4 flex justify-end">
              <Button 
                onClick={() => handleSaveExercises(selectedExercisesDay1, 1)} 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                ذخیره تمرین‌های روز اول
              </Button>
            </div>
          </TabsContent>

          {/* Day 2 */}
          <TabsContent value="day2" className="flex-1 overflow-hidden flex flex-col">
            <StudentExerciseListWrapper maxHeight="50vh">
              {exercises.map((exercise) => (
                <ExerciseCard
                  key={exercise.id}
                  title={exercise.name}
                  description={exercise.description}
                  imageUrl={exercise.imageUrl}
                  selected={selectedExercisesDay2.includes(exercise.id)}
                  onClick={() => toggleExerciseDay2(exercise.id)}
                />
              ))}
            </StudentExerciseListWrapper>
            <div className="mt-4 flex justify-end">
              <Button 
                onClick={() => handleSaveExercises(selectedExercisesDay2, 2)} 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                ذخیره تمرین‌های روز دوم
              </Button>
            </div>
          </TabsContent>

          {/* Day 3 */}
          <TabsContent value="day3" className="flex-1 overflow-hidden flex flex-col">
            <StudentExerciseListWrapper maxHeight="50vh">
              {exercises.map((exercise) => (
                <ExerciseCard
                  key={exercise.id}
                  title={exercise.name}
                  description={exercise.description}
                  imageUrl={exercise.imageUrl}
                  selected={selectedExercisesDay3.includes(exercise.id)}
                  onClick={() => toggleExerciseDay3(exercise.id)}
                />
              ))}
            </StudentExerciseListWrapper>
            <div className="mt-4 flex justify-end">
              <Button 
                onClick={() => handleSaveExercises(selectedExercisesDay3, 3)} 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                ذخیره تمرین‌های روز سوم
              </Button>
            </div>
          </TabsContent>

          {/* Day 4 */}
          <TabsContent value="day4" className="flex-1 overflow-hidden flex flex-col">
            <StudentExerciseListWrapper maxHeight="50vh">
              {exercises.map((exercise) => (
                <ExerciseCard
                  key={exercise.id}
                  title={exercise.name}
                  description={exercise.description}
                  imageUrl={exercise.imageUrl}
                  selected={selectedExercisesDay4.includes(exercise.id)}
                  onClick={() => toggleExerciseDay4(exercise.id)}
                />
              ))}
            </StudentExerciseListWrapper>
            <div className="mt-4 flex justify-end">
              <Button 
                onClick={() => handleSaveExercises(selectedExercisesDay4, 4)} 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                ذخیره تمرین‌های روز چهارم
              </Button>
            </div>
          </TabsContent>

          {/* General */}
          <TabsContent value="general" className="flex-1 overflow-hidden flex flex-col">
            <StudentExerciseListWrapper maxHeight="50vh">
              {exercises.map((exercise) => (
                <ExerciseCard
                  key={exercise.id}
                  title={exercise.name}
                  description={exercise.description}
                  imageUrl={exercise.imageUrl}
                  selected={selectedExercises.includes(exercise.id)}
                  onClick={() => toggleExercise(exercise.id)}
                />
              ))}
            </StudentExerciseListWrapper>
            <div className="mt-4 flex justify-end">
              <Button 
                onClick={() => handleSaveExercises(selectedExercises)} 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                ذخیره تمرین‌های عمومی
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            بستن
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StudentExerciseDialog;
