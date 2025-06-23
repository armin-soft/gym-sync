
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StudentCard } from './StudentCard';
import { EmptyState } from './EmptyState';
import { Student } from '@/components/students/StudentTypes';

interface StudentGridProps {
  students: Student[];
  searchQuery: string;
  onAddStudent: () => void;
  onEditStudent: (student: Student) => void;
  onDeleteStudent: (id: number) => void;
  onViewStudent: (student: Student) => void;
  onManageProgram: (student: Student) => void;
  onClearSearch: () => void;
  isLoading?: boolean;
}

export const StudentGrid: React.FC<StudentGridProps> = ({
  students,
  searchQuery,
  onAddStudent,
  onEditStudent,
  onDeleteStudent,
  onViewStudent,
  onManageProgram,
  onClearSearch,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="h-80 bg-slate-200 dark:bg-slate-800 rounded-3xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <EmptyState
        searchQuery={searchQuery}
        onAddStudent={onAddStudent}
        onClearSearch={onClearSearch}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <AnimatePresence mode="popLayout">
        {students.map((student, index) => (
          <motion.div
            key={student.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 24,
              delay: index * 0.05
            }}
            layout
          >
            <StudentCard
              student={student}
              onEdit={onEditStudent}
              onDelete={onDeleteStudent}
              onView={onViewStudent}
              onProgram={onManageProgram}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
