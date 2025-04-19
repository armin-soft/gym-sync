
import { Student } from "./StudentTypes";
import { StudentTableView } from "./table-view/StudentTableView";

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
  isProfileComplete?: boolean;
}

export const StudentsTable = ({
  students,
  sortedAndFilteredStudents,
  searchQuery,
  onEdit,
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
  onAddStudent,
  onClearSearch,
  isProfileComplete = true,
}: StudentsTableProps) => {
  return (
    <StudentTableView
      students={students}
      sortedAndFilteredStudents={sortedAndFilteredStudents}
      searchQuery={searchQuery}
      isProfileComplete={isProfileComplete}
      onEdit={onEdit}
      onDelete={onDelete}
      onAddExercise={onAddExercise}
      onAddDiet={onAddDiet}
      onAddSupplement={onAddSupplement}
      onAddStudent={onAddStudent}
      onClearSearch={onClearSearch}
    />
  );
};
