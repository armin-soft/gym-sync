
import React from "react";
import { StudentDialog } from "@/components/StudentDialog";
import StudentExerciseDialog from "@/components/exercises/StudentExerciseDialog";
import { StudentDietDialog } from "@/components/nutrition/StudentDietDialog";
import { StudentSupplementDialog } from "@/components/nutrition/StudentSupplementDialog";
import { StudentDownloadDialog } from "@/components/students/StudentDownloadDialog";
import { Student } from "@/components/students/StudentTypes";

interface StudentDialogContentProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  isExerciseDialogOpen: boolean;
  setIsExerciseDialogOpen: (open: boolean) => void;
  isDietDialogOpen: boolean;
  setIsDietDialogOpen: (open: boolean) => void;
  isSupplementDialogOpen: boolean;
  setIsSupplementDialogOpen: (open: boolean) => void;
  isDownloadDialogOpen: boolean;
  setIsDownloadDialogOpen: (open: boolean) => void;
  selectedStudent?: Student;
  selectedStudentForExercise: Student | null;
  selectedStudentForDiet: Student | null;
  selectedStudentForSupplement: Student | null;
  selectedStudentForDownload: Student | null;
  handleSaveWrapper: (data: Omit<Student, "id" | "exercises" | "exercisesDay1" | "exercisesDay2" | "exercisesDay3" | "exercisesDay4" | "meals" | "supplements" | "vitamins">) => void;
  handleSaveExercisesWrapper: (exerciseIds: number[], dayNumber?: number) => boolean;
  handleSaveDietWrapper: (mealIds: number[]) => boolean;
  handleSaveSupplementsWrapper: (data: {supplements: number[], vitamins: number[]}) => boolean;
  exercises: any[];
  meals: any[];
  supplements: any[];
}

export const StudentDialogContent: React.FC<StudentDialogContentProps> = ({
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
  selectedStudent,
  selectedStudentForExercise,
  selectedStudentForDiet,
  selectedStudentForSupplement,
  selectedStudentForDownload,
  handleSaveWrapper,
  handleSaveExercisesWrapper,
  handleSaveDietWrapper,
  handleSaveSupplementsWrapper,
  exercises,
  meals,
  supplements
}) => {
  // Safely get exercise data
  const getStudentExercises = (student: Student | null) => {
    if (!student) return {
      exercises: [],
      exercisesDay1: [],
      exercisesDay2: [],
      exercisesDay3: [],
      exercisesDay4: []
    };
    
    return {
      exercises: student.exercises || [],
      exercisesDay1: student.exercisesDay1 || [],
      exercisesDay2: student.exercisesDay2 || [],
      exercisesDay3: student.exercisesDay3 || [],
      exercisesDay4: student.exercisesDay4 || []
    };
  };
  
  // If exercise dialog is open and we have a selected student
  const showExerciseDialog = isExerciseDialogOpen && selectedStudentForExercise;
  const studentExercises = getStudentExercises(selectedStudentForExercise);
  
  return (
    <>
      <StudentDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveWrapper}
        student={selectedStudent}
      />

      {showExerciseDialog && (
        <StudentExerciseDialog
          open={isExerciseDialogOpen}
          onOpenChange={setIsExerciseDialogOpen}
          studentName={selectedStudentForExercise?.name || ""}
          onSave={handleSaveExercisesWrapper}
          initialExercises={studentExercises.exercises}
          initialExercisesDay1={studentExercises.exercisesDay1}
          initialExercisesDay2={studentExercises.exercisesDay2}
          initialExercisesDay3={studentExercises.exercisesDay3}
          initialExercisesDay4={studentExercises.exercisesDay4}
          exercises={exercises || []}
          categories={[]}
        />
      )}
      
      {isDietDialogOpen && selectedStudentForDiet && (
        <StudentDietDialog
          open={isDietDialogOpen}
          onOpenChange={setIsDietDialogOpen}
          studentName={selectedStudentForDiet.name || ""}
          onSave={handleSaveDietWrapper}
          initialMeals={selectedStudentForDiet.meals || []}
          meals={meals || []}
        />
      )}

      {isSupplementDialogOpen && selectedStudentForSupplement && (
        <StudentSupplementDialog
          open={isSupplementDialogOpen}
          onOpenChange={setIsSupplementDialogOpen}
          studentName={selectedStudentForSupplement.name || ""}
          onSave={handleSaveSupplementsWrapper}
          initialSupplements={selectedStudentForSupplement.supplements || []}
          initialVitamins={selectedStudentForSupplement.vitamins || []}
          supplements={supplements || []}
        />
      )}

      {isDownloadDialogOpen && selectedStudentForDownload && (
        <StudentDownloadDialog
          open={isDownloadDialogOpen}
          onOpenChange={setIsDownloadDialogOpen}
          student={{
            ...selectedStudentForDownload,
            payment: selectedStudentForDownload.payment || ''
          }}
          exercises={exercises || []}
          meals={meals || []}
          supplements={supplements || []}
          vitamins={(supplements || []).filter(item => item.type === 'vitamin')}
        />
      )}
    </>
  );
};
