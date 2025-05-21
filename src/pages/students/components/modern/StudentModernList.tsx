import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TabsContent } from "@/components/ui/tabs";
import { Student } from "@/components/students/StudentTypes";
import { HistoryEntry } from "@/hooks/useStudentHistory";
import { StudentGrid } from "./lists/StudentGrid";
import { StudentTable } from "./lists/StudentTable";
import { StudentKanban } from "./lists/StudentKanban";
import { StudentHistory } from "./lists/StudentHistory";
import { StudentAnalytics } from "./lists/StudentAnalytics";
import { StudentEmptyState } from "./lists/StudentEmptyState";

interface StudentModernListProps {
  activeTab: "all" | "history" | "analytics";
  viewMode: "table" | "grid" | "kanban";
  students: Student[];
  sortedAndFilteredStudents: Student[];
  searchQuery: string;
  historyEntries: HistoryEntry[];
  refreshTrigger: number;
  isProfileComplete: boolean;
  loading: boolean;
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
  onAddExercise: (student: Student) => void;
  onAddDiet: (student: Student) => void;
  onAddSupplement: (student: Student) => void;
  onDownload: (student: Student) => void;
  onAddStudent: () => void;
  onClearSearch: () => void;
  onClearHistory: () => void;
}

const StudentModernList = ({
  activeTab,
  viewMode,
  students,
  sortedAndFilteredStudents,
  searchQuery,
  historyEntries,
  refreshTrigger,
  isProfileComplete,
  loading,
  onEdit,
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
  onDownload,
  onAddStudent,
  onClearSearch,
  onClearHistory,
}: StudentModernListProps) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { delay: 0.1, duration: 0.4 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  // Render student list component based on view mode
  const renderStudentsView = () => {
    // Show empty state if no students
    if (sortedAndFilteredStudents.length === 0) {
      return (
        <StudentEmptyState 
          searchQuery={searchQuery} 
          onAddStudent={onAddStudent} 
          onClearSearch={onClearSearch}
        />
      );
    }

    // Otherwise show the appropriate view
    switch (viewMode) {
      case "table":
        return (
          <StudentTable 
            students={sortedAndFilteredStudents}
            isProfileComplete={isProfileComplete}
            loading={loading}
            refreshTrigger={refreshTrigger}
            onEdit={onEdit}
            onDelete={onDelete}
            onAddExercise={onAddExercise}
            onAddDiet={onAddDiet}
            onAddSupplement={onAddSupplement}
            onDownload={onDownload}
          />
        );
      case "grid":
        return (
          <StudentGrid 
            students={sortedAndFilteredStudents}
            isProfileComplete={isProfileComplete}
            loading={loading}
            refreshTrigger={refreshTrigger}
            onEdit={onEdit}
            onDelete={onDelete}
            onAddExercise={onAddExercise}
            onAddDiet={onAddDiet}
            onAddSupplement={onAddSupplement}
          />
        );
      case "kanban":
        return (
          <StudentKanban 
            students={sortedAndFilteredStudents}
            isProfileComplete={isProfileComplete}
            loading={loading}
            refreshTrigger={refreshTrigger}
            onEdit={onEdit}
            onDelete={onDelete}
            onAddExercise={onAddExercise}
            onAddDiet={onAddDiet}
            onAddSupplement={onAddSupplement}
          />
        );
    }
  };

  return (
    <div className="flex-1 overflow-hidden rounded-2xl backdrop-blur-xl bg-white/50 dark:bg-gray-900/50 border border-gray-200/70 dark:border-gray-800/70 shadow-lg shadow-gray-200/20 dark:shadow-black/10">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="h-full"
        >
          <TabsContent value="all" className="mt-0 h-full">
            {renderStudentsView()}
          </TabsContent>
          
          <TabsContent value="history" className="mt-0 h-full">
            <StudentHistory 
              students={students} 
              historyEntries={historyEntries}
              onClearHistory={onClearHistory}
            />
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-0 h-full">
            <StudentAnalytics students={students} />
          </TabsContent>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default StudentModernList;
