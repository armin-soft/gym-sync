
import { useState, useRef } from "react";
import { StudentDialog } from "@/components/students/StudentDialog";
import EnhancedExerciseDialog from "@/components/exercises/enhanced-dialog/EnhancedExerciseDialog"; 
import { Student } from "@/components/students/StudentTypes";
import { DietDialog } from "@/components/diet/DietDialog";
import { SupplementDialog } from "@/components/supplements/SupplementDialog";
import { DownloadDialog } from "@/components/download/DownloadDialog";
import { ExerciseWithSets } from "@/types/exercise";

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
  handleSaveWrapper: (data: any) => void;
  handleSaveExercisesWrapper: (exercisesWithSets: ExerciseWithSets[], dayNumber?: number) => boolean;
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
  // Filter exercise categories
  const categories = Array.from(
    new Set(exercises.map((ex) => ex.category || ex.categoryId))
  ).map((category, index) => {
    const matchingExercise = exercises.find(ex => ex.category === category || ex.categoryId === category);
    return {
      id: typeof category === 'number' ? category : index + 1,
      name: typeof category === 'string' ? category : matchingExercise?.category || `دسته ${index + 1}`,
      type: "strength", // Default type
      color: "#4338ca" // Default color
    };
  });

  const handleClose = () => {
    setIsDialogOpen(false);
  };
  
  const handleCloseExercise = () => {
    setIsExerciseDialogOpen(false);
  };
  
  const handleCloseDiet = () => {
    setIsDietDialogOpen(false);
  };
  
  const handleCloseSupplement = () => {
    setIsSupplementDialogOpen(false);
  };
  
  const handleCloseDownload = () => {
    setIsDownloadDialogOpen(false);
  };

  return (
    <>
      {/* Student edit/add dialog */}
      <StudentDialog
        isOpen={isDialogOpen}
        onClose={handleClose}
        onSave={handleSaveWrapper}
        student={selectedStudent}
      />
      
      {/* Exercise dialog */}
      {selectedStudentForExercise && (
        <EnhancedExerciseDialog
          open={isExerciseDialogOpen}
          onOpenChange={handleCloseExercise}
          studentName={selectedStudentForExercise?.name || ""}
          onSave={(exercisesWithSets, dayNumber) => 
            handleSaveExercisesWrapper(exercisesWithSets, dayNumber)
          }
          initialExercisesDay1={selectedStudentForExercise?.exercisesDay1 || []}
          initialExercisesDay2={selectedStudentForExercise?.exercisesDay2 || []}
          initialExercisesDay3={selectedStudentForExercise?.exercisesDay3 || []}
          initialExercisesDay4={selectedStudentForExercise?.exercisesDay4 || []}
          exercises={exercises}
          categories={categories}
        />
      )}
      
      {/* Diet dialog */}
      {selectedStudentForDiet && (
        <DietDialog
          isOpen={isDietDialogOpen}
          onClose={handleCloseDiet}
          onSave={handleSaveDietWrapper}
          studentName={selectedStudentForDiet?.name || ""}
          initialMeals={selectedStudentForDiet?.meals || []}
          meals={meals}
        />
      )}
      
      {/* Supplement dialog */}
      {selectedStudentForSupplement && (
        <SupplementDialog
          open={isSupplementDialogOpen}
          onClose={handleCloseSupplement}
          onSave={handleSaveSupplementsWrapper}
          studentName={selectedStudentForSupplement?.name || ""}
          initialSupplements={selectedStudentForSupplement?.supplements || []}
          initialVitamins={selectedStudentForSupplement?.vitamins || []}
          supplements={supplements}
        />
      )}
      
      {/* Download dialog */}
      {selectedStudentForDownload && (
        <DownloadDialog
          isOpen={isDownloadDialogOpen}
          onClose={handleCloseDownload}
          student={selectedStudentForDownload}
          exercises={exercises}
          meals={meals}
          supplements={supplements}
        />
      )}
    </>
  );
};

export default StudentDialogContent;
