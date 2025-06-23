
import React from "react";
import { motion } from "framer-motion";
import { StudentCard } from "./StudentCard";
import { Student } from "@/components/students/StudentTypes";

interface StudentsGridProps {
  students: Student[];
  onEditStudent: (student: Student) => void;
  onDeleteStudent: (student: Student) => void;
  onManageProgram: (student: Student) => void;
}

export const StudentsGrid: React.FC<StudentsGridProps> = ({
  students,
  onEditStudent,
  onDeleteStudent,
  onManageProgram
}) => {
  if (students.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-16 space-y-4"
      >
        <div className="w-24 h-24 rounded-full student-gradient-bg flex items-center justify-center">
          <span className="text-4xl">👨‍🎓</span>
        </div>
        <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-300">
          هیچ شاگردی یافت نشد
        </h3>
        <p className="text-slate-500 text-center max-w-md">
          هنوز هیچ شاگردی به سیستم اضافه نشده است. برای افزودن شاگرد جدید روی دکمه "افزودن شاگرد جدید" کلیک کنید.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {students.map((student, index) => (
        <StudentCard
          key={student.id}
          student={student}
          onEdit={() => onEditStudent(student)}
          onDelete={() => onDeleteStudent(student)}
          onManageProgram={() => onManageProgram(student)}
          index={index}
        />
      ))}
    </motion.div>
  );
};
