
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Student } from "@/components/students/StudentTypes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserRound, CheckCircle, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StudentTableRowProps {
  student: Student;
  onEdit?: (student: Student) => void;
  onDelete: (id: number) => void;
  onAddExercise: (student: Student) => void;
  onAddDiet: (student: Student) => void;
  onAddSupplement: (student: Student) => void;
  onDownload?: (student: Student) => void;
  isProfileComplete: boolean;
  index?: number;
}

export const StudentTableRow: React.FC<StudentTableRowProps> = ({
  student,
  onAddExercise,
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
        <div className="flex items-center justify-center">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 text-xs py-1 px-2 hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-purple-900/20 dark:hover:text-purple-400 transition-colors"
            onClick={() => onAddExercise(student)}
          >
            <CalendarDays className="h-3.5 w-3.5" />
            <span>تخصیص برنامه</span>
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};
