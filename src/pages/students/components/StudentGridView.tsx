
import React from 'react';
import { Student } from "@/components/students/StudentTypes";
import { StudentCard } from "@/components/students/StudentCard";

export interface StudentGridViewProps {
  students: Student[];
  isProfileComplete: boolean;
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
  onAddExercise: (student: Student) => void;
  onAddDiet: (student: Student) => void;
  onAddSupplement: (student: Student) => void;
  setStudents: React.Dispatch<React.SetStateAction<Student[]>> | (() => void);
}

const StudentGridView: React.FC<StudentGridViewProps> = ({
  students,
  isProfileComplete,
  onEdit,
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
  setStudents
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {students.map((student) => (
        <StudentCard
          key={student.id}
          student={student}
          onEdit={() => onEdit(student)}
          onDelete={() => onDelete(student.id)}
          onAddExercise={() => onAddExercise(student)}
          onAddDiet={() => onAddDiet(student)}
          onAddSupplement={() => onAddSupplement(student)}
          setStudents={setStudents}
          students={students}
          isProfileComplete={isProfileComplete}
        />
      ))}
    </div>
  );
};

export default StudentGridView;
