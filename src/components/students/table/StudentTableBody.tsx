
import React from "react";
import { TableBody } from "@/components/ui/table";
import { Student } from "@/components/students/StudentTypes";
import { StudentTableRow } from "./StudentTableRow";

interface StudentTableBodyProps {
  students: Student[];
  onEdit?: (student: Student) => void;
  onDelete: (id: number) => void;
  onAddExercise: (student: Student) => void;
  onAddDiet: (student: Student) => void;
  onAddSupplement: (student: Student) => void;
  onDownload?: (student: Student) => void;
  isProfileComplete: boolean;
  columns: any[];
}

export const StudentTableBody: React.FC<StudentTableBodyProps> = ({
  students,
  onEdit,
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
  onDownload,
  isProfileComplete,
  columns
}) => {
  if (students.length === 0) {
    return (
      <TableBody>
        <tr>
          <td colSpan={columns.length} className="h-24 text-center">
            هنوز هیچ شاگردی ثبت نشده است.
          </td>
        </tr>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {students.map((student) => (
        <StudentTableRow
          key={student.id}
          student={student}
          onEdit={onEdit}
          onDelete={onDelete}
          onAddExercise={onAddExercise}
          onAddDiet={onAddDiet}
          onAddSupplement={onAddSupplement}
          onDownload={onDownload}
          isProfileComplete={isProfileComplete}
        />
      ))}
    </TableBody>
  );
};
