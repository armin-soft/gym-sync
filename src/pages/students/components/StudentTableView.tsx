
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TabsContent } from "@/components/ui/tabs";
import { StudentsTable } from "@/components/students/StudentsTable";
import { Student } from "@/components/students/StudentTypes";

interface StudentTableViewProps {
  viewMode: "table" | "grid";
  sortedAndFilteredStudents: Student[];
  students: Student[];
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
}

const StudentTableView: React.FC<StudentTableViewProps> = ({
  viewMode,
  sortedAndFilteredStudents,
  students,
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
}) => {
  return (
    <TabsContent value="all" className="flex-1 flex flex-col w-full mt-0">
      <AnimatePresence mode="wait">
        <motion.div
          key={viewMode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="rounded-xl sm:rounded-3xl backdrop-blur-xl bg-white/50 dark:bg-slate-900/50 border border-gray-200/70 dark:border-gray-800/70 shadow-lg shadow-gray-200/20 dark:shadow-black/10 overflow-hidden transition-all duration-300 flex-1 w-full"
        >
          <StudentsTable 
            students={students}
            sortedAndFilteredStudents={sortedAndFilteredStudents}
            searchQuery={searchQuery}
            refreshTrigger={refreshTrigger}
            onEdit={onEdit}
            onDelete={onDelete}
            onAddExercise={onAddExercise}
            onAddDiet={onAddDiet}
            onAddSupplement={onAddSupplement}
            onDownload={onDownload}
            onAddStudent={onAddStudent}
            onClearSearch={onClearSearch}
            viewMode={viewMode}
          />
        </motion.div>
      </AnimatePresence>
    </TabsContent>
  );
};

export default StudentTableView;
