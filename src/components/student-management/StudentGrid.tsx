
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StudentCard } from "./StudentCard";
import { EmptyState } from "./EmptyState";
import { Student } from "@/components/students/StudentTypes";

interface StudentGridProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
  onAddExercise: (student: Student) => void;
  onAddDiet: (student: Student) => void;
  onAddSupplement: (student: Student) => void;
  onAddStudent: () => void;
  searchQuery?: string;
  isLoading?: boolean;
}

export const StudentGrid: React.FC<StudentGridProps> = ({
  students,
  onEdit,
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
  onAddStudent,
  searchQuery = "",
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-200 rounded-2xl h-80 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <EmptyState 
        onAddStudent={onAddStudent}
        searchQuery={searchQuery}
      />
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <AnimatePresence>
        {students.map((student) => (
          <motion.div
            key={student.id}
            variants={itemVariants}
            layout
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <StudentCard
              student={student}
              onEdit={() => onEdit(student)}
              onDelete={() => onDelete(student.id)}
              onAddExercise={() => onAddExercise(student)}
              onAddDiet={() => onAddDiet(student)}
              onAddSupplement={() => onAddSupplement(student)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};
