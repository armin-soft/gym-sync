
import React from 'react';
import { Student } from '@/components/students/StudentTypes';
import { StudentTable } from '@/components/students/StudentTable';

interface StudentTableViewProps {
  students: Student[];
  sortedAndFilteredStudents: Student[];
  searchQuery: string;
  refreshTrigger?: number;
  isProfileComplete: boolean;
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
  onAddExercise: (student: Student) => void;
  onAddDiet: (student: Student) => void;
  onAddSupplement: (student: Student) => void;
  onDownload?: (student: Student) => void;
  onAddStudent: () => void;
  onClearSearch: () => void;
  viewMode: "table" | "grid";
}

export const StudentTableView: React.FC<StudentTableViewProps> = ({
  students,
  sortedAndFilteredStudents,
  searchQuery,
  refreshTrigger,
  isProfileComplete,
  onEdit,
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
  onDownload,
  onAddStudent,
  onClearSearch,
  viewMode
}) => {
  return (
    <StudentTable
      students={students}
      sortedAndFilteredStudents={sortedAndFilteredStudents}
      searchQuery={searchQuery}
      refreshTrigger={refreshTrigger || 0}
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
  );
};
