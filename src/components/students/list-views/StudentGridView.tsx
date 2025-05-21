
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Student } from '@/components/students/StudentTypes';
import { StudentCard } from '@/components/students/StudentCard';
import { ScrollArea } from '@/components/ui/scroll-area';

interface StudentGridViewProps {
  students: Student[];
  isProfileComplete: boolean;
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
  onAddExercise: (student: Student) => void;
  onAddDiet: (student: Student) => void;
  onAddSupplement: (student: Student) => void;
}

export const StudentGridView: React.FC<StudentGridViewProps> = ({
  students,
  isProfileComplete,
  onEdit,
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  return (
    <ScrollArea className="h-[calc(100vh-30rem)] md:h-[calc(100vh-26rem)] p-4">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-8"
      >
        <AnimatePresence>
          {students.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onEdit={() => onEdit(student)}
              onDelete={() => onDelete(student.id)}
              onAddExercise={() => onAddExercise(student)}
              onAddDiet={() => onAddDiet(student)}
              onAddSupplement={() => onAddSupplement(student)}
              isProfileComplete={isProfileComplete}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </ScrollArea>
  );
};
