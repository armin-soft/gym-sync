import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FormInfoSection } from "./FormInfoSection";
import { FormExerciseSection } from "./FormExerciseSection";
import { FormMealsSection } from "./FormMealsSection";
import { FormSupplementsSection } from "./FormSupplementsSection";
import { FormActionArea } from "./FormActionArea";
import { Student } from "../StudentTypes";
import { ModernStudentSupplementDialog } from "@/components/nutrition/ModernStudentSupplementDialog"; // Update import

interface DialogContentCoreProps {
  student?: Student;
  onSave: (student: Student) => void;
  onClose: () => void;
  loading?: boolean;
}

// Update Student type if wrist is missing
declare module "@/components/students/StudentTypes" {
  interface Student {
    wrist?: string;
  }
}

export const DialogContentCore: React.FC<DialogContentCoreProps> = ({
  student,
  onSave,
  onClose,
  loading = false,
}) => {
  const [activeTab, setActiveTab] = useState<string>("info");
  
  const [name, setName] = useState<string>(student?.name || "");
  const [age, setAge] = useState<string>(student?.age?.toString() || "");
  const [height, setHeight] = useState<string>(student?.height?.toString() || "");
  const [weight, setWeight] = useState<string>(student?.weight?.toString() || "");
  const [wrist, setWrist] = useState<string>(student?.wrist?.toString() || "");
  const [phone, setPhone] = useState<string>(student?.phone || "");
  const [goal, setGoal] = useState<string>(student?.goal || "");
  const [exercises, setExercises] = useState<number[]>(student?.exercises || []);
  const [exercisesDay1, setExercisesDay1] = useState<number[]>(
    student?.exercisesDay1 || []
  );
  const [exercisesDay2, setExercisesDay2] = useState<number[]>(
    student?.exercisesDay2 || []
  );
  const [exercisesDay3, setExercisesDay3] = useState<number[]>(
    student?.exercisesDay3 || []
  );
  const [exercisesDay4, setExercisesDay4] = useState<number[]>(
    student?.exercisesDay4 || []
  );
  const [meals, setMeals] = useState<any[]>(student?.meals || []);
  const [supplements, setSupplements] = useState<number[]>(
    student?.supplements || []
  );
  const [vitamins, setVitamins] = useState<number[]>(student?.vitamins || []);
  const [supplementDialogOpen, setSupplementDialogOpen] = useState(false);
  const [exercisesDialogOpen, setExercisesDialogOpen] = useState(false);
  const [exercisesDayDialogOpen, setExercisesDayDialogOpen] = useState({
    isOpen: false,
    day: 0,
  });
  const [mealsDialogOpen, setMealsDialogOpen] = useState(false);

  const handleSave = () => {
    // Calculate progress value
    let progressCount = 0;
    if (exercises?.length) progressCount++;
    if (exercisesDay1?.length || exercisesDay2?.length || exercisesDay3?.length || exercisesDay4?.length) {
      progressCount++;
    }
    if (meals?.length) progressCount++;
    if (supplements?.length || vitamins?.length) progressCount++;
    
    const progress = Math.round((progressCount / 4) * 100);
    
    // Parse numeric values
    const parsedAge = age ? parseInt(age) : undefined;
    const parsedHeight = height ? parseInt(height) : undefined;
    const parsedWeight = weight ? parseInt(weight) : undefined;
    const parsedWrist = wrist ? parseInt(wrist) : undefined;
    
    // Create new student object or update existing one
    const updatedStudent: Student = {
      id: student?.id || Date.now(),
      name,
      age: parsedAge,
      height: parsedHeight,
      weight: parsedWeight,
      wrist: parsedWrist?.toString(), // Store as string to match Student type
      phone,
      goal,
      exercises,
      exercisesDay1,
      exercisesDay2,
      exercisesDay3,
      exercisesDay4,
      meals,
      supplements,
      vitamins,
      progress,
    };
    
    onSave(updatedStudent);
  };

  const handleSaveSupplements = (data: {supplements: number[], vitamins: number[]}) => {
    setSupplements(data.supplements);
    setVitamins(data.vitamins);
    return true;
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-hidden flex flex-col">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col"
        >
          <div className="px-6 border-b">
            <TabsList className="grid w-full grid-cols-4 h-12">
              <TabsTrigger value="info">اطلاعات اولیه</TabsTrigger>
              <TabsTrigger value="exercises">تمرین‌ها</TabsTrigger>
              <TabsTrigger value="meals">تغذیه</TabsTrigger>
              <TabsTrigger value="supplements">مکمل‌ها</TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-hidden pt-6">
            <FormInfoSection
              active={activeTab === "info"}
              name={name}
              setName={setName}
              age={age}
              setAge={setAge}
              height={height}
              setHeight={setHeight}
              weight={weight}
              setWeight={setWeight}
              wrist={wrist}
              setWrist={setWrist}
              phone={phone}
              setPhone={setPhone}
              goal={goal}
              setGoal={setGoal}
            />

            <FormExerciseSection
              active={activeTab === "exercises"}
              exercises={exercises}
              setExercises={setExercises}
              exercisesDay1={exercisesDay1}
              setExercisesDay1={setExercisesDay1}
              exercisesDay2={exercisesDay2}
              setExercisesDay2={setExercisesDay2}
              exercisesDay3={exercisesDay3}
              setExercisesDay3={setExercisesDay3}
              exercisesDay4={exercisesDay4}
              setExercisesDay4={setExercisesDay4}
              setExercisesDialogOpen={setExercisesDialogOpen}
              exercisesDialogOpen={exercisesDialogOpen}
              setExercisesDayDialogOpen={setExercisesDayDialogOpen}
              exercisesDayDialogOpen={exercisesDayDialogOpen}
            />

            <FormMealsSection
              active={activeTab === "meals"}
              meals={meals}
              setMeals={setMeals}
              mealsDialogOpen={mealsDialogOpen}
              setMealsDialogOpen={setMealsDialogOpen}
            />

            <FormSupplementsSection
              active={activeTab === "supplements"}
              supplements={supplements}
              vitamins={vitamins}
              onOpenDialog={() => setSupplementDialogOpen(true)}
            />
          </div>
        </Tabs>
      </div>

      <FormActionArea
        loading={loading}
        onSave={handleSave}
        onCancel={onClose}
      />

      {/* New Modern Supplement Dialog */}
      <ModernStudentSupplementDialog
        open={supplementDialogOpen}
        onOpenChange={setSupplementDialogOpen}
        studentName={name || 'شاگرد جدید'}
        initialSupplements={supplements}
        initialVitamins={vitamins}
        onSave={handleSaveSupplements}
      />
    </div>
  );
};
