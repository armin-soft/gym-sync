
import React, { forwardRef, useImperativeHandle } from "react";
import { Student } from "./StudentTypes";
import { StudentDialog } from "./StudentDialog";
import { ExerciseWithSets } from "@/hooks/exercise-selection";
import { useStudentDialogs } from "@/hooks/useStudentDialogs";
import { StudentDialogContent } from "@/components/students/dialogs/StudentDialogContent";
import StudentExerciseDialog from "@/components/exercises/StudentExerciseDialog";
import { ModernStudentSupplementDialog } from "@/components/nutrition/ModernStudentSupplementDialog";
import { StudentDietDialog } from "@/components/diet/StudentDietDialog";

export interface StudentDialogManagerRef {
  handleAdd: () => void;
  handleEdit: (student: Student) => void;
  handleAddExercise: (student: Student) => void;
  handleAddDiet: (student: Student) => void;
  handleAddSupplement: (student: Student) => void;
  handleDownload: (student: Student) => void;
}

// Define StudentFormData interface to match what StudentDialog expects
interface StudentFormData {
  name: string;
  phone: string;
  height?: string;
  weight?: string;
  image?: string;
  payment?: string;
  age?: string;
  grade?: string;
  group?: string;
  wrist?: string;
}

interface StudentDialogManagerProps {
  onSave: (student: Student) => void;
  onSaveExercises: (exercisesWithSets: ExerciseWithSets[], studentId: number, dayNumber?: number) => boolean;
  onSaveDiet: (mealIds: number[], studentId: number) => boolean;
  onSaveSupplements: (data: {supplements: number[], vitamins: number[]}, studentId: number) => boolean;
  exercises: any[];
  meals: any[];
  supplements: any[];
}

export const StudentDialogManager = forwardRef<StudentDialogManagerRef, StudentDialogManagerProps>(
  ({ 
    onSave, 
    onSaveExercises, 
    onSaveDiet, 
    onSaveSupplements,
    exercises,
    meals,
    supplements 
  }, ref) => {
    const {
      selectedStudent,
      isDialogOpen,
      setIsDialogOpen,
      isExerciseDialogOpen,
      setIsExerciseDialogOpen,
      isDietDialogOpen,
      setIsDietDialogOpen,
      isSupplementDialogOpen,
      setIsSupplementDialogOpen,
      isDownloadDialogOpen,
      setIsDownloadDialogOpen,
      selectedStudentForExercise,
      selectedStudentForDiet,
      selectedStudentForSupplement,
      selectedStudentForDownload,
      handleEdit,
      handleAdd,
      handleAddExercise,
      handleAddDiet,
      handleAddSupplement,
      handleDownload
    } = useStudentDialogs();

    useImperativeHandle(ref, () => ({
      handleAdd,
      handleEdit,
      handleAddExercise,
      handleAddDiet,
      handleAddSupplement,
      handleDownload
    }));

    // Create a wrapper function to adapt the expected types
    const handleSaveWrapper = (formData: StudentFormData) => {
      // Parse age to number if it exists
      const parsedAge = formData.age ? parseInt(formData.age) : undefined;
      
      // If selectedStudent exists, merge the form data with it
      if (selectedStudent) {
        const updatedStudent: Student = {
          ...selectedStudent,
          ...formData,
          age: parsedAge
        };
        onSave(updatedStudent);
      } else {
        // Create a new student with default values and the form data
        const newStudent: Student = {
          id: Date.now(), // Generate a new ID
          name: formData.name,
          phone: formData.phone,
          height: formData.height,
          weight: formData.weight,
          image: formData.image || '/Assets/Image/Place-Holder.svg',
          payment: formData.payment,
          age: parsedAge,
          grade: formData.grade,
          group: formData.group,
          wrist: formData.wrist,
          exercises: [],
          exercisesDay1: [],
          exercisesDay2: [],
          exercisesDay3: [],
          exercisesDay4: [],
          meals: [],
          supplements: [],
          vitamins: []
        };
        
        onSave(newStudent);
      }
      setIsDialogOpen(false);
    };

    const handleSaveExercisesWrapper = (exercisesWithSets: ExerciseWithSets[], dayNumber?: number) => {
      if (!selectedStudentForExercise) return false;
      return onSaveExercises(exercisesWithSets, selectedStudentForExercise.id, dayNumber);
    };

    const handleSaveDietWrapper = (mealIds: number[]) => {
      if (!selectedStudentForDiet) return false;
      return onSaveDiet(mealIds, selectedStudentForDiet.id);
    };

    const handleSaveSupplementsWrapper = (data: {supplements: number[], vitamins: number[]}) => {
      if (!selectedStudentForSupplement) return false;
      return onSaveSupplements(data, selectedStudentForSupplement.id);
    };

    return (
      <>
        <StudentDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSave={handleSaveWrapper}
          student={selectedStudent}
        />
        
        {/* Exercise Dialog */}
        {selectedStudentForExercise && (
          <StudentExerciseDialog
            open={isExerciseDialogOpen}
            onOpenChange={setIsExerciseDialogOpen}
            studentName={selectedStudentForExercise.name}
            onSave={handleSaveExercisesWrapper}
            initialExercises={selectedStudentForExercise.exercises}
            initialExercisesDay1={selectedStudentForExercise.exercisesDay1}
            initialExercisesDay2={selectedStudentForExercise.exercisesDay2}
            initialExercisesDay3={selectedStudentForExercise.exercisesDay3}
            initialExercisesDay4={selectedStudentForExercise.exercisesDay4}
          />
        )}
        
        {/* Diet Dialog */}
        {selectedStudentForDiet && (
          <StudentDietDialog
            open={isDietDialogOpen}
            onOpenChange={setIsDietDialogOpen}
            studentName={selectedStudentForDiet.name}
            initialMeals={selectedStudentForDiet.meals}
            onSave={handleSaveDietWrapper}
          />
        )}
        
        {/* Supplement Dialog */}
        {selectedStudentForSupplement && (
          <ModernStudentSupplementDialog
            open={isSupplementDialogOpen}
            onOpenChange={setIsSupplementDialogOpen}
            studentName={selectedStudentForSupplement.name}
            initialSupplements={selectedStudentForSupplement.supplements}
            initialVitamins={selectedStudentForSupplement.vitamins}
            onSave={handleSaveSupplementsWrapper}
          />
        )}
      </>
    );
  }
);

StudentDialogManager.displayName = "StudentDialogManager";
