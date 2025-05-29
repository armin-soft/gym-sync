
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useStudents } from "@/hooks/students";
import { Student } from "@/components/students/StudentTypes";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { toPersianNumbers } from "@/lib/utils/numbers";
import ProgramManager from "./components/ProgramManager";
import ProgramHeader from "./components/ProgramHeader";
import { ExerciseWithSets } from "@/types/exercise";

const StudentProgramPage: React.FC = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [student, setStudent] = useState<Student | null>(null);
  
  const { 
    students,
    exercises,
    meals,
    supplements,
    handleSaveExercises,
    handleSaveDiet,
    handleSaveSupplements
  } = useStudents();

  // Load student data
  useEffect(() => {
    if (studentId) {
      const id = parseInt(studentId);
      const foundStudent = students.find(s => s.id === id);
      
      if (foundStudent) {
        setStudent(foundStudent);
      } else {
        toast({
          title: "خطا",
          description: "شاگرد مورد نظر یافت نشد",
          variant: "destructive"
        });
        navigate("/students");
      }
    }
    
    setIsLoading(false);
  }, [studentId, students, navigate, toast]);

  // Handle back button click
  const handleBack = () => {
    navigate("/students");
  };

  // Handle save exercises
  const handleSaveExercisesWithHistory = (exercisesWithSets: ExerciseWithSets[], dayNumber?: number): boolean => {
    if (!student) return false;
    
    try {
      handleSaveExercises(student.id, exercisesWithSets, dayNumber);
      
      toast({
        title: "ذخیره موفق",
        description: `برنامه تمرینی روز ${toPersianNumbers(dayNumber || 1)} با موفقیت ذخیره شد`,
      });
      return true;
    } catch (error) {
      console.error('Error saving exercises:', error);
      return false;
    }
  };

  // Handle save diet
  const handleSaveDietWithHistory = (mealIds: number[]): boolean => {
    if (!student) return false;
    
    try {
      handleSaveDiet(student.id, mealIds);
      
      toast({
        title: "ذخیره موفق",
        description: "برنامه غذایی با موفقیت ذخیره شد",
      });
      return true;
    } catch (error) {
      console.error('Error saving diet:', error);
      return false;
    }
  };

  // Handle save supplements
  const handleSaveSupplementsWithHistory = (data: {supplements: number[], vitamins: number[]}): boolean => {
    if (!student) return false;
    
    try {
      handleSaveSupplements(student.id, data);
      
      toast({
        title: "ذخیره موفق",
        description: "مکمل و ویتامین با موفقیت ذخیره شد",
      });
      return true;
    } catch (error) {
      console.error('Error saving supplements:', error);
      return false;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          <p className="text-sm text-gray-500 dark:text-gray-400">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold mb-4">شاگرد یافت نشد</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">متأسفانه شاگرد مورد نظر در سیستم یافت نشد.</p>
          <Button onClick={handleBack} className="gap-2">
            <ArrowRight className="h-4 w-4" />
            بازگشت به لیست شاگردان
          </Button>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen w-full flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 text-right"
      >
        <ProgramHeader student={student} onBack={handleBack} />
        
        <div className="flex-1 container mx-auto p-4 sm:p-6 overflow-hidden">
          <ProgramManager
            student={student}
            exercises={exercises}
            meals={meals}
            supplements={supplements}
            onSaveExercises={handleSaveExercisesWithHistory}
            onSaveDiet={handleSaveDietWithHistory}
            onSaveSupplements={handleSaveSupplementsWithHistory}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default StudentProgramPage;
