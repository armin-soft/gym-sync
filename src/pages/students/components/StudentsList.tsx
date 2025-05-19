
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Student } from '@/components/students/StudentTypes';
import { StudentCard } from '@/components/students/StudentCard';
import { StudentTable } from '@/components/students/StudentTable'; 
import { SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { EmptyState } from '@/components/ui/empty-state';

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
        {searchQuery ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto"
          >
            <SearchX size={50} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">نتیجه‌ای یافت نشد</h3>
            <p className="text-gray-500 mb-4">هیچ شاگردی با عبارت جستجوی «{searchQuery}» پیدا نشد.</p>
            <Button onClick={onClearSearch} variant="outline">پاک کردن جستجو</Button>
          </motion.div>
        ) : (
          <EmptyState
            icon="UserPlus"
            title="هنوز شاگردی اضافه نشده است"
            description="برای شروع، اولین شاگرد خود را اضافه کنید"
            action={{
              label: "افزودن شاگرد",
              onClick: onAddStudent
            }}
          />
        )}
      </div>
    );
  }

  // Show grid view
  if (viewMode === 'grid') {
    return (
      <ScrollArea className="h-[calc(100vh-30rem)] md:h-[calc(100vh-26rem)] p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-8">
          <AnimatePresence>
            {students.map((student) => (
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
          </AnimatePresence>
        </div>
      </ScrollArea>
    );
  }

  // Show table view
  return (
    <StudentTable
      students={students}
      sortedAndFilteredStudents={students}
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
