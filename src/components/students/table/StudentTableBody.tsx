
import React from "react";
import { TableBody } from "@/components/ui/table";
import { Student } from "@/components/students/StudentTypes";
import { StudentTableRow } from "./StudentTableRow";
import { StudentTableEmpty } from "./StudentTableEmpty";
import { motion, AnimatePresence } from "framer-motion";

interface StudentTableBodyProps {
  students: Student[];
  onEdit?: (student: Student) => void;
  onDelete: (id: number) => void;
  onAddExercise: (student: Student) => void;
  onAddDiet: (student: Student) => void;
  onAddSupplement: (student: Student) => void;
  onDownload?: (student: Student) => void;
  isProfileComplete: boolean;
  columns: any[];
  searchQuery?: string;
  onAddStudent?: () => void;
  onClearSearch?: () => void;
}

export const StudentTableBody: React.FC<StudentTableBodyProps> = ({
  students,
  onEdit,
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
  onDownload,
  isProfileComplete,
  columns,
  searchQuery = "",
  onAddStudent,
  onClearSearch
}) => {
  if (students.length === 0) {
    return (
      <StudentTableEmpty 
        columnsCount={columns.length} 
        searchQuery={searchQuery}
        onAddStudent={onAddStudent}
        onClearSearch={onClearSearch}
      />
    );
  }

  return (
    <TableBody className="divide-y divide-slate-100 dark:divide-slate-800/50">
      <AnimatePresence mode="popLayout">
        {students.map((student, index) => (
          <motion.tr
            key={student.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
            transition={{ 
              type: "spring", 
              stiffness: 500, 
              damping: 30,
              delay: index * 0.05 
            }}
          >
            <StudentTableRow
              student={student}
              onEdit={onEdit}
              onDelete={onDelete}
              onAddExercise={onAddExercise}
              onAddDiet={onAddDiet}
              onAddSupplement={onAddSupplement}
              onDownload={onDownload}
              isProfileComplete={isProfileComplete}
              index={index}
            />
          </motion.tr>
        ))}
      </AnimatePresence>
    </TableBody>
  );
};
