
import React, { useState } from "react";
import { Student } from "@/components/students/StudentTypes";
import { TableBody, TableRow, TableCell } from "@/components/ui/table";
import { StudentTableRow } from "./StudentTableRow";
import { StudentActions } from "@/components/students/StudentActions";

interface StudentTableBodyProps {
  students: Student[];
  onEdit?: (student: Student) => void;
  onDelete: (id: number) => void;
  onAddExercise: (student: Student) => void;
  onAddDiet: (student: Student) => void;
  onAddSupplement: (student: Student) => void;
  onAddStudent: () => void;
  onClearSearch: () => void;
  isProfileComplete: boolean;
  searchQuery: string;
  exercises?: any[];
  meals?: any[];
  supplements?: any[];
}

export const StudentTableBody: React.FC<StudentTableBodyProps> = ({
  students,
  onEdit,
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
  isProfileComplete,
  searchQuery,
  onAddStudent,
  onClearSearch,
  exercises = [],
  meals = [],
  supplements = []
}) => {
  return (
    <TableBody>
      {students.map((student) => (
        <StudentTableRow key={student.id} student={student}>
          <TableCell className="p-2 sm:p-3">
            <StudentActions
              student={student}
              onEdit={() => onEdit?.(student)}
              onDelete={() => onDelete(student.id)}
              onAddExercise={onAddExercise}
              onAddDiet={onAddDiet}
              onAddSupplement={onAddSupplement}
              exercises={exercises}
              meals={meals}
              supplements={supplements}
            />
          </TableCell>
        </StudentTableRow>
      ))}
    </TableBody>
  );
};
