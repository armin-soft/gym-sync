
import React from "react";
import { Student } from "@/components/students/StudentTypes";
import { Dot, MoreHorizontal, Edit, Trash2, DotIcon } from "lucide-react";
import { TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils/dates";

interface StudentTableRowProps {
  student: Student;
  onEdit?: (student: Student) => void;
  onDelete: (id: number) => void;
  onAddExercise?: (student: Student) => void;
  onAddDiet?: (student: Student) => void;
  onAddSupplement?: (student: Student) => void;
  isProfileComplete: boolean;
  index: number;
}

export const StudentTableRow: React.FC<StudentTableRowProps> = ({
  student,
  onEdit,
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
  isProfileComplete,
  index
}) => {
  // Format date or provide fallback
  const formattedStartDate = student.startDate ? formatDate(student.startDate) : "تعیین نشده";
  const formattedEndDate = student.endDate ? formatDate(student.endDate) : "تعیین نشده";
  const formattedLastVisit = student.updatedAt ? formatDate(student.updatedAt) : "بازدید نشده";
  const hasLastVisit = Boolean(student.updatedAt);

  return (
    <>
      {/* Index cell */}
      <TableCell className="font-medium text-center p-3 dark:text-slate-300">
        {index + 1}
      </TableCell>

      {/* Name cell */}
      <TableCell className="font-medium p-3">
        <div className="flex items-center gap-2">
          {student.status === "active" && (
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
          )}
          {student.name}
        </div>
      </TableCell>

      {/* Phone number cell */}
      <TableCell className="p-3 dark:text-slate-300">
        {student.phone || "ثبت نشده"}
      </TableCell>

      {/* Status cell */}
      <TableCell className="p-3">
        <div className="flex items-center justify-center">
          <Badge 
            className={cn(
              "px-2 py-1 text-xs font-medium",
              student.status === "active" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" :
              student.status === "pending" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" :
              "bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-400"
            )}
          >
            {student.status === "active" ? "فعال" : 
             student.status === "pending" ? "در انتظار" : 
             student.status === "completed" ? "اتمام" : "نامشخص"}
          </Badge>
        </div>
      </TableCell>

      {/* Start Date cell */}
      <TableCell className="p-3 text-center dark:text-slate-300">
        {formattedStartDate}
      </TableCell>

      {/* End Date cell */}
      <TableCell className="p-3 text-center dark:text-slate-300">
        {formattedEndDate}
      </TableCell>

      {/* Last Visit cell */}
      <TableCell className="p-3 text-center">
        <span className={`${hasLastVisit ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400 dark:text-slate-500 italic'}`}>
          {formattedLastVisit}
        </span>
      </TableCell>

      {/* Actions cell */}
      <TableCell className="p-3">
        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-0 h-8 w-8 rounded-full"
              >
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">اکشن‌ها</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {onEdit && (
                <DropdownMenuItem onClick={() => onEdit(student)}>
                  <Edit className="mr-2 h-4 w-4" />
                  <span>ویرایش اطلاعات</span>
                </DropdownMenuItem>
              )}
              
              {onEdit && onDelete && <DropdownMenuSeparator />}
              
              {onDelete && (
                <DropdownMenuItem 
                  onClick={() => onDelete(student.id)}
                  className="text-red-600 dark:text-red-400 focus:text-red-700 dark:focus:text-red-300"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>حذف</span>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TableCell>
    </>
  );
};
