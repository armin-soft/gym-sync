
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
  // گرفتن مقادیر اولیه با اطمینان از معتبر بودن داده‌ها
  const getInitialExercises = (student: Student | null, field: keyof Pick<Student, "exercises" | "exercisesDay1" | "exercisesDay2" | "exercisesDay3" | "exercisesDay4">) => {
    if (!student) return [];
    return Array.isArray(student[field]) ? student[field] as number[] : [];
  };

  return (
    <>
      <StudentDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveWrapper}
        student={selectedStudent}
      />

      {selectedStudentForExercise && (
        <StudentExerciseDialog
          open={isExerciseDialogOpen}
          onOpenChange={setIsExerciseDialogOpen}
          studentName={selectedStudentForExercise?.name || ""}
          onSave={handleSaveExercisesWrapper}
          initialExercises={getInitialExercises(selectedStudentForExercise, "exercises")}
          initialExercisesDay1={getInitialExercises(selectedStudentForExercise, "exercisesDay1")}
          initialExercisesDay2={getInitialExercises(selectedStudentForExercise, "exercisesDay2")}
          initialExercisesDay3={getInitialExercises(selectedStudentForExercise, "exercisesDay3")}
          initialExercisesDay4={getInitialExercises(selectedStudentForExercise, "exercisesDay4")}
        />
      )}
      
      {selectedStudentForDiet && (
        <StudentDietDialog
          open={isDietDialogOpen}
          onOpenChange={setIsDietDialogOpen}
          studentName={selectedStudentForDiet?.name || ""}
          onSave={handleSaveDietWrapper}
          initialMeals={Array.isArray(selectedStudentForDiet?.meals) ? selectedStudentForDiet.meals : []}
          meals={meals}
        />
      )}

      {selectedStudentForSupplement && (
        <StudentSupplementDialog
          open={isSupplementDialogOpen}
          onOpenChange={setIsSupplementDialogOpen}
          studentName={selectedStudentForSupplement?.name || ""}
          onSave={handleSaveSupplementsWrapper}
          initialSupplements={Array.isArray(selectedStudentForSupplement?.supplements) ? selectedStudentForSupplement.supplements : []}
          initialVitamins={Array.isArray(selectedStudentForSupplement?.vitamins) ? selectedStudentForSupplement.vitamins : []}
          supplements={supplements}
          categories={[]}
        />
      )}

      {selectedStudentForDownload && (
        <StudentDownloadDialog
          open={isDownloadDialogOpen}
          onOpenChange={setIsDownloadDialogOpen}
          student={{
            ...selectedStudentForDownload,
            payment: selectedStudentForDownload.payment || ''  // Ensure payment is never undefined
          }}
          exercises={exercises}
          meals={meals}
          supplements={supplements}
          vitamins={supplements.filter(item => item.type === 'vitamin')}
        />
      )}
    </>
  );
};
