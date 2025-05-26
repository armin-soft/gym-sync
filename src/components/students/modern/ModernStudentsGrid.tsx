
import React from "react";
import { AnimatePresence } from "framer-motion";
import { Student } from "@/components/students/StudentTypes";
import { ModernStudentCard } from "./ModernStudentCard";
import { ModernEmptyState } from "./ModernEmptyState";

interface ModernStudentsGridProps {
  students: Student[];
  searchQuery: string;
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
  onAddExercise: (student: Student) => void;
  onAddDiet: (student: Student) => void;
  onAddSupplement: (student: Student) => void;
  onAddStudent: () => void;
  onClearSearch: () => void;
  isProfileComplete: boolean;
}

export const ModernStudentsGrid: React.FC<ModernStudentsGridProps> = ({
  students,
  searchQuery,
  onEdit,
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
  onAddStudent,
  onClearSearch,
  isProfileComplete
}) => {
  if (students.length === 0) {
    return (
      <ModernEmptyState
        searchQuery={searchQuery}
        onClearSearch={onClearSearch}
        onAddStudent={onAddStudent}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" dir="rtl">
      <AnimatePresence>
        {students.map((student) => (
          <ModernStudentCard
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
    </div>
  );
};
