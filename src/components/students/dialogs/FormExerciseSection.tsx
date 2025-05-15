
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DumbellIcon } from "lucide-react";

interface FormExerciseSectionProps {
  active: boolean;
  exercises: number[];
  setExercises: React.Dispatch<React.SetStateAction<number[]>>;
  exercisesDay1: number[];
  setExercisesDay1: React.Dispatch<React.SetStateAction<number[]>>;
  exercisesDay2: number[];
  setExercisesDay2: React.Dispatch<React.SetStateAction<number[]>>;
  exercisesDay3: number[];
  setExercisesDay3: React.Dispatch<React.SetStateAction<number[]>>;
  exercisesDay4: number[];
  setExercisesDay4: React.Dispatch<React.SetStateAction<number[]>>;
  setExercisesDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  exercisesDialogOpen: boolean;
  setExercisesDayDialogOpen: React.Dispatch<React.SetStateAction<{isOpen: boolean; day: number}>>;
  exercisesDayDialogOpen: {isOpen: boolean; day: number};
}

// Custom dumbell icon since Lucide doesn't have one
const DumbellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6.5 6.5h11"></path>
    <path d="M6.5 17.5h11"></path>
    <path d="M4 8v8"></path>
    <path d="M9 5v14"></path>
    <path d="M15 5v14"></path>
    <path d="M20 8v8"></path>
  </svg>
);

export const FormExerciseSection: React.FC<FormExerciseSectionProps> = ({
  active,
  exercises,
  exercisesDay1,
  exercisesDay2,
  exercisesDay3,
  exercisesDay4,
  setExercisesDialogOpen,
  setExercisesDayDialogOpen,
}) => {
  if (!active) return null;

  return (
    <Card className="flex-1 overflow-y-auto p-6">
      <Tabs defaultValue="general" className="flex flex-col h-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">عمومی</TabsTrigger>
          <TabsTrigger value="day1">روز اول</TabsTrigger>
          <TabsTrigger value="day2">روز دوم</TabsTrigger>
          <TabsTrigger value="day3">روز سوم</TabsTrigger>
          <TabsTrigger value="day4">روز چهارم</TabsTrigger>
        </TabsList>
        
        <div className="flex-1 pt-4">
          <TabsContent value="general" className="mt-0">
            <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg bg-muted/50">
              <DumbellIcon />
              <h3 className="mt-4 text-lg font-medium">تمرین‌های عمومی</h3>
              <p className="mt-2 text-sm text-muted-foreground text-center">
                برنامه تمرینی عمومی برای شاگرد
              </p>
              <Button 
                variant="default" 
                className="mt-4" 
                onClick={() => setExercisesDialogOpen(true)}
              >
                افزودن تمرین
              </Button>
              
              <div className="mt-4 w-full">
                <p className="text-sm text-muted-foreground text-center">
                  {exercises.length > 0 
                    ? `${exercises.length} تمرین انتخاب شده است` 
                    : "هیچ تمرینی انتخاب نشده"}
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="day1" className="mt-0">
            <ExerciseDaySection
              dayNumber={1}
              exercisesCount={exercisesDay1.length}
              onAddExercise={() => setExercisesDayDialogOpen({ isOpen: true, day: 1 })}
            />
          </TabsContent>
          
          <TabsContent value="day2" className="mt-0">
            <ExerciseDaySection
              dayNumber={2}
              exercisesCount={exercisesDay2.length}
              onAddExercise={() => setExercisesDayDialogOpen({ isOpen: true, day: 2 })}
            />
          </TabsContent>
          
          <TabsContent value="day3" className="mt-0">
            <ExerciseDaySection
              dayNumber={3}
              exercisesCount={exercisesDay3.length}
              onAddExercise={() => setExercisesDayDialogOpen({ isOpen: true, day: 3 })}
            />
          </TabsContent>
          
          <TabsContent value="day4" className="mt-0">
            <ExerciseDaySection
              dayNumber={4}
              exercisesCount={exercisesDay4.length}
              onAddExercise={() => setExercisesDayDialogOpen({ isOpen: true, day: 4 })}
            />
          </TabsContent>
        </div>
      </Tabs>
    </Card>
  );
};

const ExerciseDaySection: React.FC<{
  dayNumber: number;
  exercisesCount: number;
  onAddExercise: () => void;
}> = ({ dayNumber, exercisesCount, onAddExercise }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg bg-muted/50">
      <DumbellIcon />
      <h3 className="mt-4 text-lg font-medium">تمرین‌های روز {dayNumber}</h3>
      <p className="mt-2 text-sm text-muted-foreground text-center">
        برنامه تمرینی روز {dayNumber} برای شاگرد
      </p>
      <Button 
        variant="default" 
        className="mt-4" 
        onClick={onAddExercise}
      >
        افزودن تمرین
      </Button>
      
      <div className="mt-4 w-full">
        <p className="text-sm text-muted-foreground text-center">
          {exercisesCount > 0 
            ? `${exercisesCount} تمرین انتخاب شده است` 
            : "هیچ تمرینی انتخاب نشده"}
        </p>
      </div>
    </div>
  );
};
