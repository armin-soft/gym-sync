
import React from "react";
import { motion } from "framer-motion";
import { Student } from "../StudentTypes";
import { StudentGrid } from "./StudentGrid";
import { EmptyStudentsState } from "./EmptyStudentsState";

interface StudentTableViewProps {
  students: Student[];
  sortedAndFilteredStudents: Student[];
  searchQuery: string;
  refreshTrigger?: number;
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
  onAddExercise: (student: Student) => void;
  onAddDiet: (student: Student) => void;
  onAddSupplement: (student: Student) => void;
  onAddStudent: () => void;
  onClearSearch: () => void;
  viewMode: string;
  isProfileComplete: boolean;
  sortField?: string;
  sortOrder?: string;
  onSortChange?: (field: string) => void;
}

export const StudentTableView: React.FC<StudentTableViewProps> = ({
  students,
  sortedAndFilteredStudents,
  searchQuery,
  onEdit,
  onDelete,
  onAddExercise,
  onAddStudent,
  onClearSearch,
}) => {
  const handleManageProgram = (student: Student) => {
    onAddExercise(student);
  };

  if (sortedAndFilteredStudents.length === 0) {
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
      className="w-full"
    >
      <StudentGrid
        students={sortedAndFilteredStudents}
        searchQuery={searchQuery}
        onEdit={onEdit}
        onDelete={onDelete}
        onManageProgram={handleManageProgram}
        onAddStudent={onAddStudent}
      />
    </motion.div>
  );
};
