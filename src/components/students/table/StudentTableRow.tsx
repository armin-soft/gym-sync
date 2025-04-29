
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Student } from "@/components/students/StudentTypes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserRound, CheckCircle } from "lucide-react";
import { EditStudentButton } from "../EditStudentButton";
import { StudentActions } from "../StudentActions";

interface StudentTableRowProps {
  student: Student;
  onEdit?: (student: Student) => void;
  onDelete: (id: number) => void;
  onAddExercise: (student: Student) => void;
  onAddDiet: (student: Student) => void;
  onAddSupplement: (student: Student) => void;
  onDownload?: (student: Student) => void;
  isProfileComplete: boolean;
}

export const StudentTableRow: React.FC<StudentTableRowProps> = ({
  student,
  onEdit,
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
  onDownload,
  isProfileComplete,
}) => {
  return (
    <TableRow>
      <TableCell className="flex items-center justify-center">
        <Avatar>
          <AvatarImage src={student.image} alt={student.name} />
          <AvatarFallback><UserRound className="h-4 w-4" /></AvatarFallback>
        </Avatar>
      </TableCell>
      
      <TableCell>
        <div className="font-medium">{student.name}</div>
      </TableCell>
      
      <TableCell className="text-center">{student.phone}</TableCell>
      
      <TableCell className="text-center">{student.height}</TableCell>
      
      <TableCell className="text-center">{student.weight}</TableCell>
      
      <TableCell className="text-center">{student.payment}</TableCell>
      
      <TableCell className="text-center">
        {isProfileComplete ? (
          <Badge variant="outline" className="gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            کامل
          </Badge>
        ) : (
          <Badge variant="destructive" className="gap-2">
            ناقص
          </Badge>
        )}
      </TableCell>
      
      <TableCell className="text-center">
        <div className="flex items-center justify-center gap-1">
          {onEdit ? (
            <EditStudentButton studentId={student.id} onClick={() => onEdit(student)} />
          ) : (
            <EditStudentButton studentId={student.id} />
          )}
          
          <StudentActions
            student={student}
            onDelete={onDelete}
            onAddExercise={onAddExercise}
            onAddDiet={onAddDiet}
            onAddSupplement={onAddSupplement}
            onDownload={onDownload}
          />
        </div>
      </TableCell>
    </TableRow>
  );
};
