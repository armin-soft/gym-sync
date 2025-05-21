
import React from "react";
import { Student } from "@/components/students/StudentTypes";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { StudentProgramManager } from "@/components/students/program/StudentProgramManager";
import { ExerciseWithSets } from "@/types/exercise";

interface StudentModernProgramManagerProps {
  student: Student;
  exercises: any[];
  meals: any[];
  supplements: any[];
  onSaveExercises: (exercisesWithSets: ExerciseWithSets[], studentId: number, dayNumber?: number) => boolean;
  onSaveDiet: (mealIds: number[], studentId: number) => boolean;
  onSaveSupplements: (data: {supplements: number[], vitamins: number[]}, studentId: number) => boolean;
  onClose: () => void;
}

export const StudentModernProgramManager: React.FC<StudentModernProgramManagerProps> = ({
  student,
  exercises,
  meals,
  supplements,
  onSaveExercises,
  onSaveDiet,
  onSaveSupplements,
  onClose
}) => {
  const { toast } = useToast();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 24 
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950"
    >
      {/* Header */}
      <motion.div 
        variants={itemVariants}
        className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm py-4"
      >
        <div className="container max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full" 
              onClick={onClose}
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border border-gray-200 dark:border-gray-700">
                <AvatarImage src={student.image} alt={student.name} />
                <AvatarFallback>
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              
              <div>
                <h2 className="text-lg font-medium">{student.name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">مدیریت برنامه</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Content */}
      <motion.div variants={itemVariants} className="container max-w-7xl mx-auto px-4 py-6">
        <StudentProgramManager
          student={student}
          exercises={exercises}
          meals={meals}
          supplements={supplements}
          onSaveExercises={onSaveExercises}
          onSaveDiet={onSaveDiet}
          onSaveSupplements={onSaveSupplements}
        />
      </motion.div>
    </motion.div>
  );
};
