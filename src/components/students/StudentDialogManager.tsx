
import React, { useState, forwardRef, useImperativeHandle } from "react";
import { StudentDialog } from "@/components/StudentDialog";
import StudentExerciseDialog from "@/components/exercises/StudentExerciseDialog";
import { StudentDietDialog } from "@/components/nutrition/StudentDietDialog";
import { StudentSupplementDialog } from "@/components/supplements/StudentSupplementDialog";
import { StudentDownloadDialog } from "@/components/students/StudentDownloadDialog";
import { Student } from "@/components/students/StudentTypes";
import { useToast } from "@/hooks/use-toast";

interface StudentDialogManagerProps {
  onSave: (data: Omit<Student, "id" | "exercises" | "exercisesDay1" | "exercisesDay2" | "exercisesDay3" | "exercisesDay4" | "meals" | "supplements" | "vitamins">, selectedStudent?: Student) => boolean;
  onSaveExercises: (exerciseIds: number[], studentId: number, dayNumber?: number) => boolean;
  onSaveDiet: (mealIds: number[], studentId: number) => boolean;
  onSaveSupplements: (data: {supplements: number[], vitamins: number[]}, studentId: number) => boolean;
  exercises: any[];
  meals: any[];
  supplements: any[];
}

export interface StudentDialogManagerRef {
  handleAdd: () => void;
  handleEdit: (student: Student) => void;
  handleAddExercise: (student: Student) => void;
  handleAddDiet: (student: Student) => void;
  handleAddSupplement: (student: Student) => void;
  handleDownload: (student: Student) => void;
}

export const StudentDialogManager = forwardRef<StudentDialogManagerRef, StudentDialogManagerProps>(({
  onSave,
  onSaveExercises,
  onSaveDiet,
  onSaveSupplements,
  exercises,
  meals,
  supplements
}, ref) => {
  const { toast } = useToast();
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isExerciseDialogOpen, setIsExerciseDialogOpen] = useState(false);
  const [isDietDialogOpen, setIsDietDialogOpen] = useState(false);
  const [isSupplementDialogOpen, setIsSupplementDialogOpen] = useState(false);
  const [isDownloadDialogOpen, setIsDownloadDialogOpen] = useState(false);
  const [selectedStudentForExercise, setSelectedStudentForExercise] = useState<Student | null>(null);
  const [selectedStudentForDiet, setSelectedStudentForDiet] = useState<Student | null>(null);
  const [selectedStudentForSupplement, setSelectedStudentForSupplement] = useState<Student | null>(null);
  const [selectedStudentForDownload, setSelectedStudentForDownload] = useState<Student | null>(null);

  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setSelectedStudent(undefined);
    setIsDialogOpen(true);
  };

  const handleSaveWrapper = (data: Omit<Student, "id" | "exercises" | "exercisesDay1" | "exercisesDay2" | "exercisesDay3" | "exercisesDay4" | "meals" | "supplements" | "vitamins">) => {
    const success = onSave(data, selectedStudent);
    if (success) {
      setIsDialogOpen(false);
    }
  };

  const handleAddExercise = (student: Student) => {
    setSelectedStudentForExercise(student);
    setIsExerciseDialogOpen(true);
  };
  
  const handleAddDiet = (student: Student) => {
    setSelectedStudentForDiet(student);
    setIsDietDialogOpen(true);
  };
  
  const handleAddSupplement = (student: Student) => {
    setSelectedStudentForSupplement(student);
    setIsSupplementDialogOpen(true);
  };

  const handleDownload = (student: Student) => {
    if (!student.payment || student.payment === '') {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "برای دانلود اطلاعات ابتدا باید مبلغ برنامه را وارد کنید"
      });
      handleEdit(student);
      return;
    }
    
    setSelectedStudentForDownload(student);
    setIsDownloadDialogOpen(true);
  };
  
  const handleSaveExercisesWrapper = (exerciseIds: number[], dayNumber?: number): boolean => {
    if (!selectedStudentForExercise) return false;
    
    try {
      const success = onSaveExercises(exerciseIds, selectedStudentForExercise.id, dayNumber);
      // We don't close the dialog here to allow saving for multiple days
      return success;
    } catch (error) {
      console.error("Error saving exercises:", error);
      toast({
        variant: "destructive",
        title: "خطا در ذخیره‌سازی",
        description: "مشکلی در ذخیره‌سازی تمرین‌ها پیش آمد. لطفا مجدد تلاش کنید."
      });
      return false;
    }
  };
  
  const handleSaveDietWrapper = (mealIds: number[]): boolean => {
    if (!selectedStudentForDiet) return false;
    
    const success = onSaveDiet(mealIds, selectedStudentForDiet.id);
    if (success) {
      setIsDietDialogOpen(false);
      toast({
        title: "برنامه غذایی ذخیره شد",
        description: "برنامه غذایی با موفقیت برای شاگرد ذخیره شد.",
      });
    }
    return success;
  };
  
  const handleSaveSupplementsWrapper = (data: {supplements: number[], vitamins: number[]}): boolean => {
    if (!selectedStudentForSupplement) return false;
    
    const success = onSaveSupplements(data, selectedStudentForSupplement.id);
    if (success) {
      setIsSupplementDialogOpen(false);
    }
    return success;
  };

  // Expose methods to parent component via ref
  useImperativeHandle(ref, () => ({
    handleAdd,
    handleEdit,
    handleAddExercise,
    handleAddDiet,
    handleAddSupplement,
    handleDownload
  }));

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
});

StudentDialogManager.displayName = 'StudentDialogManager';
