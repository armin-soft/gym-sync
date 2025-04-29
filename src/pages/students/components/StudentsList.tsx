
import { motion } from "framer-motion";
import { Student } from "@/components/students/StudentTypes";
import { StudentCard } from "@/components/students/StudentCard";
import { StudentTable } from "@/components/students/StudentTable";
import { EmptyStudentState } from "@/components/students/EmptyStudentState";

interface StudentsListProps {
  students: Student[];
  searchQuery: string;
  viewMode: "table" | "grid";
  isProfileComplete: boolean;
  onAddStudent: () => void;
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
  onAddExercise: (student: Student) => void;
  onAddDiet: (student: Student) => void;
  onAddSupplement: (student: Student) => void;
  onClearSearch: () => void;
}

export const StudentsList: React.FC<StudentsListProps> = ({
  students,
  searchQuery,
  viewMode,
  isProfileComplete,
  onAddStudent,
  onEdit,
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
  onClearSearch
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
    <div className="pr-2">
      <motion.div 
        key={viewMode}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
            onEdit={onEdit}
            onDelete={onDelete}
            onAddExercise={onAddExercise}
            onAddDiet={onAddDiet}
            onAddSupplement={onAddSupplement}
            isProfileComplete={isProfileComplete}
          />
        )}
      </motion.div>
    </div>
  );
};
