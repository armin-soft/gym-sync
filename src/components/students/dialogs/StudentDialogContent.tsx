import React, { useEffect, useState } from "react";
import { StudentDialog } from "@/components/students/StudentDialog";
import StudentExerciseDialog from "@/components/exercises/StudentExerciseDialog";
import { StudentDietDialog } from "@/components/nutrition/StudentDietDialog";
import { StudentSupplementDialog } from "@/components/nutrition/StudentSupplementDialog";
import { StudentDownloadDialog } from "@/components/students/StudentDownloadDialog";
import { Student } from "@/components/students/StudentTypes";
import { Supplement, SupplementCategory } from "@/types/supplement";
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
  handleSaveWrapper: (data: Omit<Student, "id" | "exercises" | "exercisesDay1" | "exercisesDay2" | "exercisesDay3" | "exercisesDay4" | "meals" | "supplements" | "vitamins">) => void;
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
  const [localSupplements, setLocalSupplements] = useState<Supplement[]>([]);
  const [localCategories, setLocalCategories] = useState<SupplementCategory[]>([]);
  const [supplementsLoaded, setSupplementsLoaded] = useState(false);

  // بارگذاری مکمل‌ها و دسته‌بندی‌ها از localStorage
  useEffect(() => {
    const loadSupplementsData = () => {
      try {
        const savedSupplements = localStorage.getItem('supplements');
        const savedCategories = localStorage.getItem('supplementCategories');
        
        if (savedSupplements) {
          const parsedSupplements = JSON.parse(savedSupplements);
          console.log("Loaded supplements from localStorage in DialogContent:", parsedSupplements);
          setLocalSupplements(parsedSupplements);
        } else if (supplements && supplements.length > 0) {
          console.log("Using supplements from props:", supplements);
          setLocalSupplements(supplements);
        }
        
        if (savedCategories) {
          const parsedCategories = JSON.parse(savedCategories);
          console.log("Loaded categories from localStorage in DialogContent:", parsedCategories);
          setLocalCategories(parsedCategories);
        }
        
        setSupplementsLoaded(true);
      } catch (error) {
        console.error("Error loading supplements data:", error);
      }
    };

    loadSupplementsData();
  }, [supplements, isSupplementDialogOpen]);

  // اطلاعات دیالوگ‌های مکمل‌ها و ویتامین‌ها در کنسول برای اشکال‌زدایی
  useEffect(() => {
    if (isSupplementDialogOpen && selectedStudentForSupplement) {
      console.log("Opening supplement dialog for student:", selectedStudentForSupplement);
      console.log("Student supplements:", selectedStudentForSupplement.supplements || []);
      console.log("Student vitamins:", selectedStudentForSupplement.vitamins || []);
      console.log("Available supplements:", localSupplements);
      console.log("Available categories:", localCategories);
    }
  }, [isSupplementDialogOpen, selectedStudentForSupplement, localSupplements, localCategories]);

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

      {/* استفاده از حالت بارگذاری برای اطمینان از بارگذاری داده‌ها قبل از نمایش دیالوگ */}
      {supplementsLoaded && (
        <StudentSupplementDialog
          open={isSupplementDialogOpen}
          onOpenChange={setIsSupplementDialogOpen}
          studentName={selectedStudentForSupplement?.name || ""}
          onSave={handleSaveSupplementsWrapper}
          initialSupplements={selectedStudentForSupplement?.supplements || []}
          initialVitamins={selectedStudentForSupplement?.vitamins || []}
          supplements={localSupplements.length > 0 ? localSupplements : supplements}
          categories={localCategories}
        />
      )}

      <StudentDownloadDialog
        open={isDownloadDialogOpen}
        onOpenChange={setIsDownloadDialogOpen}
        student={selectedStudentForDownload as any} // Using type assertion to bypass the strict type checking
        exercises={exercises}
        meals={meals}
        supplements={localSupplements.length > 0 ? localSupplements : supplements}
        vitamins={localSupplements.filter(item => item.type === 'vitamin')}
      />
    </>
  );
};
