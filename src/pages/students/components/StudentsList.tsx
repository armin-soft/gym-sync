
import React from 'react';
import { Student } from '@/components/students/StudentTypes';
import { StudentEmptyState } from './EmptyStudentState';
import { StudentGridView } from './StudentGridView';
import { StudentTableView } from './StudentTableView';

interface StudentsListProps {
  students: Student[];
  searchQuery: string;
  viewMode: 'table' | 'grid';
  refreshTrigger?: number;
  isProfileComplete: boolean;
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
  refreshTrigger,
  isProfileComplete,
  onAddStudent,
  onEdit,
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
  onClearSearch,
  onDownload
}) => {
  // Render empty state when no students
  if (students.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-4 md:p-6 lg:p-10">
        <StudentEmptyState 
          searchQuery={searchQuery} 
          onClearSearch={onClearSearch} 
          onAddStudent={onAddStudent} 
        />
      </div>
    );
  }

  // Show grid view
  if (viewMode === 'grid') {
    return (
      <StudentGridView 
        students={students}
        isProfileComplete={isProfileComplete}
        onEdit={onEdit}
        onDelete={onDelete}
        onAddExercise={onAddExercise}
        onAddDiet={onAddDiet}
        onAddSupplement={onAddSupplement}
      />
    );
  }

  // Show table view
  return (
    <StudentTableView
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
  );
};
