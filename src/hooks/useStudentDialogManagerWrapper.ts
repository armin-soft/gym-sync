
import { useRef } from 'react';
import { Student } from "@/components/students/StudentTypes";
import { StudentDialogManagerRef } from "@/components/students/StudentDialogManager";
import { ExerciseWithSets } from "@/types/exercise";
import { useToast } from "@/hooks/use-toast";
import { HistoryEntry } from "@/hooks/useStudentHistory";

interface UseStudentDialogManagerWrapperProps {
  onSave: (data: Omit<Student, "id" | "exercises" | "exercisesDay1" | "exercisesDay2" | "exercisesDay3" | "exercisesDay4" | "meals" | "supplements" | "vitamins">, selectedStudent?: Student) => boolean;
  onSaveExercises: (exercisesWithSets: ExerciseWithSets[], studentId: number, dayNumber?: number) => boolean;
  onSaveDiet: (mealIds: number[], studentId: number) => boolean;
  onSaveSupplements: (data: {supplements: number[], vitamins: number[]}, studentId: number) => boolean;
  onDelete: (id: number) => void;
  exercises: any[];
  meals: any[];
  supplements: any[];
  addHistoryEntry?: (student: Student, type: string, description: string) => void;
  students: Student[];
}

export const useStudentDialogManagerWrapper = ({
  onSave,
  onSaveExercises,
  onSaveDiet,
  onSaveSupplements,
  onDelete,
  exercises,
  meals,
  supplements,
  addHistoryEntry,
  students
}: UseStudentDialogManagerWrapperProps) => {
  const dialogManagerRef = useRef<StudentDialogManagerRef>(null);
  const { toast } = useToast();

  // Handle student addition
  const handleAdd = () => {
    if (dialogManagerRef.current) {
      dialogManagerRef.current.handleAdd();
    }
  };

  // Handle student editing
  const handleEdit = (student: Student) => {
    if (dialogManagerRef.current) {
      dialogManagerRef.current.handleEdit(student);
    }
  };

  // Handle adding exercises to a student
  const handleAddExercise = (student: Student) => {
    if (dialogManagerRef.current) {
      dialogManagerRef.current.handleAddExercise(student);
    }
  };

  // Handle adding diet to a student
  const handleAddDiet = (student: Student) => {
    if (dialogManagerRef.current) {
      dialogManagerRef.current.handleAddDiet(student);
    }
  };

  // Handle adding supplements to a student
  const handleAddSupplement = (student: Student) => {
    if (dialogManagerRef.current) {
      dialogManagerRef.current.handleAddSupplement(student);
    }
  };

  // Handle downloading student info
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
    
    if (dialogManagerRef.current) {
      dialogManagerRef.current.handleDownload(student);
    }
  };

  // Enhanced delete handler with history tracking
  const handleDeleteWithHistory = (studentId: number) => {
    if (addHistoryEntry) {
      const student = students.find(s => s.id === studentId);
      if (student) {
        addHistoryEntry(
          student, 
          'delete',
          `شاگرد ${student.name} حذف شد`
        );
      }
    }
    
    onDelete(studentId);
  };

  return {
    dialogManagerRef,
    handleAdd,
    handleEdit,
    handleAddExercise,
    handleAddDiet,
    handleAddSupplement,
    handleDownload,
    handleDelete: handleDeleteWithHistory
  };
};
