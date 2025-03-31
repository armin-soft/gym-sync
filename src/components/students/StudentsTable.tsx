
import { useState } from "react";
import { Table, TableBody } from "@/components/ui/table";
import { Student } from "./StudentTypes";
import { motion, AnimatePresence } from "framer-motion";
import { GlassmorphicCard } from "@/components/ui/glassmorphic-card";
import { ShimmerEffect } from "@/components/ui/shimmer-effect";
import { EmptyStudentList } from "./student-table/EmptyStudentList";
import { StudentGridCard } from "./student-table/StudentGridCard";
import { StudentsTableHeader } from "./student-table/StudentsTableHeader";
import { StudentTableRow } from "./student-table/StudentTableRow";

interface StudentsTableProps {
  students: Student[];
  sortedAndFilteredStudents: Student[];
  searchQuery: string;
  refreshTrigger: number;
  onEdit: (student: Student) => void;
  onDelete: (studentId: number) => void;
  onAddExercise: (student: Student) => void;
  onAddDiet: (student: Student) => void;
  onAddSupplement: (student: Student) => void;
  onDownload: (student: Student) => void;
  onAddStudent: () => void;
  onClearSearch: () => void;
  viewMode: "table" | "grid";
}

export const StudentsTable = ({ 
  students, 
  sortedAndFilteredStudents,
  searchQuery,
  refreshTrigger,
  onEdit, 
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
  onDownload,
  onAddStudent,
  onClearSearch,
  viewMode
}: StudentsTableProps) => {
  const [hoveredRowId, setHoveredRowId] = useState<number | null>(null);

  // Grid view layout
  if (viewMode === "grid") {
    return (
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedAndFilteredStudents.length === 0 ? (
            <div className="col-span-full">
              <EmptyStudentList 
                searchQuery={searchQuery}
                onClearSearch={onClearSearch}
                onAddStudent={onAddStudent}
              />
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {sortedAndFilteredStudents.map((student, index) => (
                <StudentGridCard
                  key={student.id}
                  student={student}
                  index={index}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onAddExercise={onAddExercise}
                  onAddDiet={onAddDiet}
                  onAddSupplement={onAddSupplement}
                  onDownload={onDownload}
                />
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    );
  }

  // Table view layout
  return (
    <GlassmorphicCard 
      variant="default" 
      className="rounded-3xl border border-slate-200/70 dark:border-gray-800/70 shadow-xl shadow-slate-200/20 dark:shadow-black/10 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/30 dark:hover:shadow-black/20 relative"
    >
      <ShimmerEffect />
      <Table>
        <StudentsTableHeader />
        <TableBody>
          {sortedAndFilteredStudents.length === 0 ? (
            <motion.tr
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <td colSpan={8} className="h-64">
                <EmptyStudentList 
                  searchQuery={searchQuery}
                  onClearSearch={onClearSearch}
                  onAddStudent={onAddStudent}
                />
              </td>
            </motion.tr>
          ) : (
            <AnimatePresence mode="popLayout">
              {sortedAndFilteredStudents.map((student, index) => (
                <StudentTableRow
                  key={student.id}
                  student={student}
                  index={index}
                  isHovered={hoveredRowId === student.id}
                  onHover={setHoveredRowId}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onAddExercise={onAddExercise}
                  onAddDiet={onAddDiet}
                  onAddSupplement={onAddSupplement}
                  onDownload={onDownload}
                />
              ))}
            </AnimatePresence>
          )}
        </TableBody>
      </Table>
    </GlassmorphicCard>
  );
};
