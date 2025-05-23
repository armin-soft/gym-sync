
import React from "react";
import { Student } from "@/components/students/StudentTypes";
import { TableCell } from "@/components/ui/table";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { formatDate } from "@/lib/utils/date";
import { Badge } from "@/components/ui/badge";
import { 
  UserCog, 
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StudentTableRowProps {
  student: Student;
  onEdit?: (student: Student) => void;
  onDelete: (id: number) => void;
  isProfileComplete: boolean;
  index: number;
}

export const StudentTableRow: React.FC<StudentTableRowProps> = ({
  student,
  onEdit,
  onDelete,
  isProfileComplete,
  index,
}) => {
  if (!student) {
    return null;
  }

  const handleEdit = () => {
    if (onEdit) {
      onEdit(student);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(student.id);
  };

  // Format display values
  const displayCreatedAt = student.createdAt 
    ? formatDate(student.createdAt) 
    : "-";

  return (
    <>
      <TableCell className="p-3 sm:p-4">
        <div className="font-medium text-right">{toPersianNumbers(student.name)}</div>
        <div className="text-xs text-muted-foreground text-right mt-1">
          {student.phone ? toPersianNumbers(student.phone) : "-"}
        </div>
      </TableCell>
      
      <TableCell className="p-3 sm:p-4 hidden sm:table-cell text-center">
        {toPersianNumbers(displayCreatedAt)}
      </TableCell>
      
      <TableCell className="p-3 sm:p-4 hidden md:table-cell text-center">
        {toPersianNumbers("-")}
      </TableCell>
      
      <TableCell className="p-3 sm:p-4 hidden lg:table-cell">
        <div className={cn(
          "flex items-center justify-center gap-1.5 text-xs font-medium",
        )}>
          {student.status ? (
            <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200">
              فعال
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
              غیرفعال
            </Badge>
          )}
        </div>
      </TableCell>
                  
      <TableCell className="p-3 sm:p-4 text-right">
        <div className="flex space-x-2 justify-end items-center">
          {onEdit && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleEdit} 
              disabled={!isProfileComplete}
              className="h-8 w-8 p-0"
            >
              <UserCog className="h-4 w-4" />
            </Button>
          )}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleDelete}
            className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </>
  );
};
