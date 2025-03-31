
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Student } from "@/components/students/StudentTypes";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { motion } from "framer-motion";

interface StudentProgressBarProps {
  student: Student;
  className?: string;
}

export const StudentProgressBar: React.FC<StudentProgressBarProps> = ({ 
  student,
  className 
}) => {
  // Calculate completion percentage
  const getCompletionPercentage = () => {
    if (typeof student.progress === 'number') {
      return student.progress;
    }
    
    let total = 0;
    let completed = 0;
    
    // Check exercises
    total += 1;
    if (student.exercises?.length || student.exercisesDay1?.length || 
        student.exercisesDay2?.length || student.exercisesDay3?.length || 
        student.exercisesDay4?.length) {
      completed += 1;
    }
    
    // Check meals
    total += 1;
    if (student.meals?.length) completed += 1;
    
    // Check supplements
    total += 1;
    if (student.supplements?.length || student.vitamins?.length) completed += 1;
    
    return Math.round((completed / total) * 100);
  };

  // Get progress bar color based on percentage
  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return "bg-emerald-500";
    if (percentage >= 70) return "bg-green-500";
    if (percentage >= 30) return "bg-amber-500";
    return "bg-blue-500";
  };

  const percentage = getCompletionPercentage();

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-1.5">
        <motion.span 
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xs font-medium text-slate-700 dark:text-slate-300"
        >
          پیشرفت برنامه
        </motion.span>
        <motion.span 
          initial={{ opacity: 0, x: 5 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xs font-medium text-slate-600 dark:text-slate-400"
        >
          {toPersianNumbers(percentage)}٪
        </motion.span>
      </div>
      <Progress 
        value={percentage} 
        className="h-2 bg-opacity-30"
        indicatorClassName={`${getProgressColor(percentage)}`}
      />
    </div>
  );
};
