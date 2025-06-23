
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StudentCard } from "./StudentCard";
import { Student } from "@/components/students/StudentTypes";
import { EmptyStudentsState } from "./EmptyStudentsState";

interface StudentGridProps {
  students: Student[];
  searchQuery: string;
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
  onManageProgram: (student: Student) => void;
  onAddStudent: () => void;
}

export const StudentGrid: React.FC<StudentGridProps> = ({
  students,
  searchQuery,
  onEdit,
  onDelete,
  onManageProgram,
  onAddStudent
}) => {
  if (students.length === 0) {
    return (
      <EmptyStudentsState
        searchQuery={searchQuery}
        onAddStudent={onAddStudent}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <AnimatePresence mode="popLayout">
        {students.map((student, index) => (
          <motion.div
            key={student.id}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ 
              duration: 0.3,
              delay: index * 0.05,
              layout: { duration: 0.3 }
            }}
          >
            <StudentCard
              student={student}
              onEdit={onEdit}
              onDelete={onDelete}
              onManageProgram={onManageProgram}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};
