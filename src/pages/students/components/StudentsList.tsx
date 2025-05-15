
import { motion } from "framer-motion";
import { Student } from "@/components/students/StudentTypes";
import { StudentTable } from "@/components/students/StudentTable";
import { EmptyStudentState } from "./EmptyStudentState";
import { StudentGridView } from "./StudentGridView";

interface StudentsListProps {
  students: Student[];
  searchQuery: string;
  viewMode: "table" | "grid";
  isProfileComplete: boolean;
  refreshTrigger?: number;
  onAddStudent: () => void;
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
  onAddExercise: (student: Student) => void;
  onAddDiet: (student: Student) => void;
  onAddSupplement: (student: Student) => void;
  onClearSearch: () => void;
  onDownload?: (student: Student) => void;
  setStudents?: React.Dispatch<React.SetStateAction<Student[]>>; // Make setStudents optional in this component
}

export const StudentsList: React.FC<StudentsListProps> = ({
  students,
  searchQuery,
  viewMode,
  isProfileComplete,
  refreshTrigger = 0,
  onAddStudent,
  onEdit,
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
  onClearSearch,
  onDownload,
  setStudents // Include setStudents even though it might be undefined
}) => {
  if (students.length === 0) {
    return (
      <EmptyStudentState 
        isSearching={searchQuery.length > 0} 
        onAddStudent={onAddStudent} 
        onClearSearch={onClearSearch}
      />
    );
  }

  return (
    <div className="w-full h-full flex-1 overflow-auto">
      <motion.div 
        key={viewMode}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="h-full"
      >
        {viewMode === "grid" ? (
          <StudentGridView
            students={students}
            setStudents={setStudents || (() => {})} // Provide a no-op function if setStudents is undefined
            isProfileComplete={isProfileComplete}
            onEdit={onEdit}
            onDelete={onDelete}
            onAddExercise={onAddExercise}
            onAddDiet={onAddDiet}
            onAddSupplement={onAddSupplement}
          />
        ) : (
          <StudentTable 
            students={students}
            sortedAndFilteredStudents={students}
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
            isProfileComplete={isProfileComplete}
          />
        )}
      </motion.div>
    </div>
  );
};
