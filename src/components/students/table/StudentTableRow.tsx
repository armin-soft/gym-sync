
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Student } from "@/components/students/StudentTypes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserRound, CheckCircle, CalendarDays, Edit, Trash2, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

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
  onEdit,
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
  onDownload,
  isProfileComplete,
  index,
}) => {
  return (
    <>
      <TableCell className="p-2">
        <div className="flex items-center justify-center">
          <Avatar>
            <AvatarImage src={student.image} alt={student.name} />
            <AvatarFallback><UserRound className="h-4 w-4" /></AvatarFallback>
          </Avatar>
        </div>
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
        <div className="flex items-center justify-center space-x-1 rtl:space-x-reverse">
          {/* Mobile view: dropdown menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {onEdit && (
                <DropdownMenuItem onClick={() => onEdit(student)}>
                  <Edit className="h-3.5 w-3.5 mr-2" />
                  ویرایش
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => onAddExercise(student)}>
                <CalendarDays className="h-3.5 w-3.5 mr-2" />
                برنامه
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(student.id)}>
                <Trash2 className="h-3.5 w-3.5 mr-2" />
                حذف
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Desktop view: inline buttons */}
          <div className="hidden md:flex md:items-center md:gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 text-xs py-1 px-2 hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-purple-900/20 dark:hover:text-purple-400 transition-colors"
              onClick={() => onAddExercise(student)}
            >
              <CalendarDays className="h-3.5 w-3.5" />
              <span>برنامه</span>
            </Button>
            
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-xs py-1 px-2 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 transition-colors"
                onClick={() => onEdit(student)}
              >
                <Edit className="h-3.5 w-3.5" />
                <span>ویرایش</span>
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 text-xs py-1 px-2 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-colors"
              onClick={() => onDelete(student.id)}
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>حذف</span>
            </Button>
          </div>
        </div>
      </TableCell>
    </>
  );
};
