
import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Student } from "@/components/students/StudentTypes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell, Utensils, Pill, Save } from "lucide-react";
import { ExerciseWithSets } from "@/types/exercise";
import { Supplement } from "@/types/supplement";
import { useToast } from "@/hooks/use-toast";
import StudentExerciseSelector from "./StudentExerciseSelector";
import StudentDietSelector from "./StudentDietSelector";
import StudentSupplementSelector from "./StudentSupplementSelector";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StudentProgramManagerProps {
  student: Student;
  exercises: any[];
  meals: any[];
  supplements: Supplement[];
  onSaveExercises: (exercisesWithSets: ExerciseWithSets[], dayNumber?: number) => boolean;
  onSaveDiet: (mealIds: number[]) => boolean;
  onSaveSupplements: (data: {supplements: number[], vitamins: number[]}) => boolean;
  onClose: () => void;
}

const StudentProgramManager: React.FC<StudentProgramManagerProps> = ({
  student,
  exercises,
  meals,
  supplements,
  onSaveExercises,
  onSaveDiet,
  onSaveSupplements,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState("exercise");
  const { toast } = useToast();

  // Exercise state
  const [selectedExercises, setSelectedExercises] = useState<ExerciseWithSets[]>([]);
  const [currentDay, setCurrentDay] = useState<number>(1);
  
  // Diet state
  const [selectedMeals, setSelectedMeals] = useState<number[]>([]);
  
  // Supplement state
  const [selectedSupplements, setSelectedSupplements] = useState<number[]>([]);
  const [selectedVitamins, setSelectedVitamins] = useState<number[]>([]);

  // Load initial data for the student
  useEffect(() => {
    // Load exercises for the current day
    if (currentDay === 1 && student.exercisesDay1) {
      const loadedExercises = student.exercisesDay1.map(id => ({
        id,
        sets: student.exerciseSetsDay1?.[id] || 3,
        reps: student.exerciseRepsDay1?.[id] || "12-15",
        rest: "60s"
      }));
      setSelectedExercises(loadedExercises);
    } else if (currentDay === 2 && student.exercisesDay2) {
      const loadedExercises = student.exercisesDay2.map(id => ({
        id,
        sets: student.exerciseSetsDay2?.[id] || 3,
        reps: student.exerciseRepsDay2?.[id] || "12-15",
        rest: "60s"
      }));
      setSelectedExercises(loadedExercises);
    } else if (currentDay === 3 && student.exercisesDay3) {
      const loadedExercises = student.exercisesDay3.map(id => ({
        id,
        sets: student.exerciseSetsDay3?.[id] || 3,
        reps: student.exerciseRepsDay3?.[id] || "12-15",
        rest: "60s"
      }));
      setSelectedExercises(loadedExercises);
    } else if (currentDay === 4 && student.exercisesDay4) {
      const loadedExercises = student.exercisesDay4.map(id => ({
        id,
        sets: student.exerciseSetsDay4?.[id] || 3,
        reps: student.exerciseRepsDay4?.[id] || "12-15",
        rest: "60s"
      }));
      setSelectedExercises(loadedExercises);
    }
    
    // Load meals
    if (student.meals) {
      setSelectedMeals(student.meals);
    }
    
    // Load supplements
    if (student.supplements) {
      setSelectedSupplements(student.supplements);
    }
    
    // Load vitamins
    if (student.vitamins) {
      setSelectedVitamins(student.vitamins);
    }
  }, [student, currentDay]);

  const handleSaveAll = () => {
    let success = true;
    
    // Save exercises for current day
    if (activeTab === "exercise") {
      success = onSaveExercises(selectedExercises, currentDay);
    }
    
    // Save diet
    if (activeTab === "diet") {
      success = onSaveDiet(selectedMeals);
    }
    
    // Supplement state
    if (activeTab === "supplement") {
      success = onSaveSupplements({
        supplements: selectedSupplements,
        vitamins: selectedVitamins
      });
    }
    
    if (success) {
      toast({
        title: "ذخیره موفق",
        description: "برنامه‌های شاگرد با موفقیت ذخیره شد",
      });
    }
  };

  return (
    <div className="space-y-4 h-full w-full flex flex-col">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">برنامه‌های {student.name}</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onClose}>
            بازگشت
          </Button>
          <Button onClick={handleSaveAll}>
            <Save className="h-4 w-4 ml-2" />
            ذخیره
          </Button>
        </div>
      </div>

      <Tabs defaultValue="exercise" value={activeTab} onValueChange={setActiveTab} className="w-full flex-1 flex flex-col">
        <Card className="flex flex-col flex-1">
          <CardHeader className="pb-0">
            <TabsList className="grid grid-cols-3 mb-0">
              <TabsTrigger value="exercise" className="flex items-center gap-2">
                <Dumbbell className="h-4 w-4" />
                <span>برنامه تمرینی</span>
              </TabsTrigger>
              <TabsTrigger value="diet" className="flex items-center gap-2">
                <Utensils className="h-4 w-4" />
                <span>برنامه غذایی</span>
              </TabsTrigger>
              <TabsTrigger value="supplement" className="flex items-center gap-2">
                <Pill className="h-4 w-4" />
                <span>مکمل و ویتامین</span>
              </TabsTrigger>
            </TabsList>
          </CardHeader>
          <CardContent className="pt-6 flex-1 overflow-auto">
            <TabsContent value="exercise" className="m-0 h-full">
              <div className="mb-4 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">برنامه تمرینی</h3>
                  <div className="flex items-center border rounded-md">
                    {[1, 2, 3, 4].map(day => (
                      <Button 
                        key={day}
                        variant={currentDay === day ? "default" : "ghost"}
                        className="h-8 rounded-md"
                        onClick={() => setCurrentDay(day)}
                      >
                        روز {toPersianNumbers(day)}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="flex-1 overflow-auto">
                  <StudentExerciseSelector 
                    exercises={exercises}
                    selectedExercises={selectedExercises}
                    setSelectedExercises={setSelectedExercises}
                    dayNumber={currentDay}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="diet" className="m-0 h-full">
              <div className="mb-4 h-full flex flex-col">
                <h3 className="font-semibold text-lg mb-4">برنامه غذایی</h3>
                <div className="flex-1 overflow-auto">
                  <StudentDietSelector 
                    meals={meals}
                    selectedMeals={selectedMeals}
                    setSelectedMeals={setSelectedMeals}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="supplement" className="m-0 h-full">
              <div className="mb-4 h-full flex flex-col">
                <h3 className="font-semibold text-lg mb-4">مکمل و ویتامین</h3>
                <div className="flex-1 overflow-auto">
                  <StudentSupplementSelector 
                    supplements={supplements}
                    selectedSupplements={selectedSupplements}
                    setSelectedSupplements={setSelectedSupplements}
                    selectedVitamins={selectedVitamins}
                    setSelectedVitamins={setSelectedVitamins}
                  />
                </div>
              </div>
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
};

export default StudentProgramManager;
