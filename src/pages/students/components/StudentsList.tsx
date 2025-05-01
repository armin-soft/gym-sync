
import { motion } from "framer-motion";
import { Student } from "@/components/students/StudentTypes";
import { StudentCard } from "@/components/students/StudentCard";
import { StudentTable } from "@/components/students/StudentTable";
import { EmptyStudentState } from "./EmptyStudentState";

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
  onDownload
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
    <div className="w-full h-full overflow-auto">
      <motion.div 
        key={viewMode}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="h-full"
      >
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
            {students.map(student => (
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
          </div>
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
