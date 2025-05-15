
import React from 'react';
import { Student } from "@/components/students/StudentTypes";
import StudentGridView from './StudentGridView';

interface StudentsListProps {
  students: Student[];
  isProfileComplete: boolean;
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
  onAddExercise: (student: Student) => void;
  onAddDiet: (student: Student) => void;
  onAddSupplement: (student: Student) => void;
  setStudents?: React.Dispatch<React.SetStateAction<Student[]>>;
}

const StudentsList: React.FC<StudentsListProps> = ({
  students,
  isProfileComplete,
  onEdit,
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
  setStudents
}) => {
  if (!students.length) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-center text-gray-500">هیچ شاگردی وجود ندارد. شاگرد جدید اضافه کنید.</p>
      </div>
    );
  }

  return (
    <StudentGridView
      students={students}
      isProfileComplete={isProfileComplete}
      onEdit={onEdit}
      onDelete={onDelete}
      onAddExercise={onAddExercise}
      onAddDiet={onAddDiet}
      onAddSupplement={onAddSupplement}
      setStudents={setStudents || (() => {})}
    />
  );
};

export default StudentsList;
