
import { useState } from "react";
import { Student } from "@/components/students/StudentTypes";
import { useToast } from "@/hooks/use-toast";

export const useStudentDialogs = () => {
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

  const handleAddExercise = (student: Student) => {
    setSelectedStudentForExercise(student);
    setIsExerciseDialogOpen(true);
  };
  
  const handleAddDiet = (student: Student) => {
    setSelectedStudentForDiet(student);
    setIsDietDialogOpen(true);
  };
  
  const handleAddSupplement = (student: Student) => {
    console.log("Opening supplement dialog for student:", student);
    console.log("Current supplements:", student.supplements);
    console.log("Current vitamins:", student.vitamins);
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
  
  return {
    // Dialog states
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
    
    // Selected students for different dialogs
    selectedStudentForExercise,
    selectedStudentForDiet,
    selectedStudentForSupplement,
    selectedStudentForDownload,
    
    // Handler functions
    handleEdit,
    handleAdd,
    handleAddExercise,
    handleAddDiet,
    handleAddSupplement,
    handleDownload
  };
};
