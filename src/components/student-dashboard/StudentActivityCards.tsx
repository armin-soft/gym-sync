
import React from "react";
import { motion } from "framer-motion";
import { Student } from "@/components/students/StudentTypes";
import { Dumbbell, CheckSquare } from "lucide-react";

interface StudentActivityCardsProps {
  student: Student;
}

export const StudentActivityCards: React.FC<StudentActivityCardsProps> = ({ student }) => {
  const exercises = student.exercises || [];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-5 h-full"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">فعالیت‌های اخیر</h2>
        <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 py-1 px-2 rounded-full">
          امروز
        </span>
      </div>
      
      <div className="space-y-4">
        {exercises.length > 0 ? (
          exercises.slice(0, 4).map((exercise, index) => (
            <div 
              key={index}
              className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/30 border border-slate-100 dark:border-slate-700"
            >
              <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-800 dark:text-slate-100">
                  {exercise.name || "تمرین بدون نام"}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {exercise.sets} ست - {exercise.reps} تکرار
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <CheckSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-slate-500 dark:text-slate-400">
            <Dumbbell className="w-12 h-12 mx-auto mb-3 text-slate-300 dark:text-slate-600" />
            <p>هنوز تمرینی برای شما تعریف نشده است.</p>
            <p className="text-sm mt-1">بزودی برنامه تمرینی شما اضافه خواهد شد.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};
