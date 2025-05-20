
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { StudentsList } from "./StudentsList";
import { Student } from "@/components/students/StudentTypes";
import { StudentHistoryTab } from "./StudentHistoryTab";
import { HistoryEntry } from "@/hooks/useStudentHistory";

interface StudentContentProps {
  activeTab: string;
  students: Student[];
  historyEntries: HistoryEntry[];
  viewMode: "table" | "grid";
  searchQuery: string;
  sortedAndFilteredStudents: Student[];
  refreshTrigger: number;
  isProfileComplete: boolean;
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
  onAddExercise: (student: Student) => void;
  onAddDiet: (student: Student) => void;
  onAddSupplement: (student: Student) => void;
  onDownload?: (student: Student) => void;
  onAddStudent: () => void;
  onClearSearch: () => void;
}

const StudentContent: React.FC<StudentContentProps> = ({
  activeTab,
  students,
  historyEntries,
  viewMode,
  searchQuery,
  sortedAndFilteredStudents,
  refreshTrigger,
  isProfileComplete,
  onEdit,
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
  onDownload,
  onAddStudent,
  onClearSearch
}) => {
  const tableContainerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <>
      <TabsContent value="all" className="flex-1 flex flex-col w-full mt-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            variants={tableContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="rounded-xl sm:rounded-3xl backdrop-blur-xl bg-white/50 dark:bg-slate-900/50 border border-gray-200/70 dark:border-gray-800/70 shadow-lg shadow-gray-200/20 dark:shadow-black/10 overflow-hidden transition-all duration-300 flex-1 w-full"
          >
            <StudentsList 
              students={sortedAndFilteredStudents}
              searchQuery={searchQuery}
              viewMode={viewMode}
              isProfileComplete={isProfileComplete}
              refreshTrigger={refreshTrigger}
              onAddStudent={onAddStudent}
              onEdit={onEdit}
              onDelete={onDelete}
              onAddExercise={onAddExercise}
              onAddDiet={onAddDiet}
              onAddSupplement={onAddSupplement}
              onClearSearch={onClearSearch}
              onDownload={onDownload}
            />
          </motion.div>
        </AnimatePresence>
      </TabsContent>
      
      <TabsContent value="history" className="flex-1">
        <StudentHistoryTab
          students={students}
          historyEntries={historyEntries}
        />
      </TabsContent>
    </>
  );
};

export default StudentContent;
