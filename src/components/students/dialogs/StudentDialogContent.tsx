
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
  return (
    <>
      <StudentDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveWrapper}
        student={selectedStudent}
      />

      <StudentExerciseDialog
        open={isExerciseDialogOpen}
        onOpenChange={setIsExerciseDialogOpen}
        studentName={selectedStudentForExercise?.name || ""}
        onSave={handleSaveExercisesWrapper}
        initialExercises={selectedStudentForExercise?.exercises || []}
        initialExercisesDay1={selectedStudentForExercise?.exercisesDay1 || []}
        initialExercisesDay2={selectedStudentForExercise?.exercisesDay2 || []}
        initialExercisesDay3={selectedStudentForExercise?.exercisesDay3 || []}
        initialExercisesDay4={selectedStudentForExercise?.exercisesDay4 || []}
      />
      
      <StudentDietDialog
        open={isDietDialogOpen}
        onOpenChange={setIsDietDialogOpen}
        studentName={selectedStudentForDiet?.name || ""}
        onSave={handleSaveDietWrapper}
        initialMeals={selectedStudentForDiet?.meals || []}
      />

      <StudentSupplementDialog
        open={isSupplementDialogOpen}
        onOpenChange={setIsSupplementDialogOpen}
        studentName={selectedStudentForSupplement?.name || ""}
        onSave={handleSaveSupplementsWrapper}
        initialSupplements={selectedStudentForSupplement?.supplements || []}
        initialVitamins={selectedStudentForSupplement?.vitamins || []}
        supplements={supplements}
      />

      <StudentDownloadDialog
        open={isDownloadDialogOpen}
        onOpenChange={setIsDownloadDialogOpen}
        student={selectedStudentForDownload}
        exercises={exercises}
        meals={meals}
        supplements={supplements}
        vitamins={supplements.filter(item => item.type === 'vitamin')}
      />
    </>
  );
};
