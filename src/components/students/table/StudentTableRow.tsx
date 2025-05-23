
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
import { ButtonGroup } from "@/components/ui/button-group";
import { RowButton } from "@/components/ui/row-button";
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
  
  const displayLastVisit = student.lastVisit
    ? formatDate(student.lastVisit)
    : "-";

  return (
    <>
      <TableCell className="p-3 sm:p-4">
        <div className="font-medium text-right">{toPersianNumbers(student.name)}</div>
        <div className="text-xs text-muted-foreground text-right mt-1">
          {student.phoneNumber ? toPersianNumbers(student.phoneNumber) : "-"}
        </div>
      </TableCell>
      
      <TableCell className="p-3 sm:p-4 hidden sm:table-cell text-center">
        {toPersianNumbers(displayCreatedAt)}
      </TableCell>
      
      <TableCell className="p-3 sm:p-4 hidden md:table-cell text-center">
        {toPersianNumbers(displayLastVisit)}
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
        <ButtonGroup>
          {onEdit && (
            <RowButton onClick={handleEdit} disabled={!isProfileComplete} icon={<UserCog className="h-4 w-4" />} />
          )}
          <RowButton 
            onClick={handleDelete} 
            variant="destructive" 
            icon={<Trash2 className="h-4 w-4" />} 
          />
        </ButtonGroup>
      </TableCell>
    </>
  );
};
