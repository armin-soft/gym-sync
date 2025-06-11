
import React, { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Student } from "@/components/students/StudentTypes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserRound, CheckCircle, CalendarDays, Edit, Trash2, Menu, User, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toPersianNumbers, formatPrice } from "@/lib/utils/numbers";

interface StudentTableRowProps {
  student: Student;
  onEdit?: (student: Student) => void;
  onDelete: (id: number) => void;
  onAddExercise: (student: Student) => void;
  onAddDiet: (student: Student) => void;
  onAddSupplement: (student: Student) => void;
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
  isProfileComplete,
  index,
}) => {
  return (
    <>
      <TableCell className="p-2">
        <div className="flex items-center justify-center">
          <Avatar className="h-10 w-10 border-2 border-white/20 shadow-lg">
            <AvatarImage src={student.image} alt={student.name} />
            <AvatarFallback><UserRound className="h-4 w-4" /></AvatarFallback>
          </Avatar>
        </div>
      </TableCell>
      
      <TableCell>
        <div className="font-medium">{student.name}</div>
      </TableCell>
      
      <TableCell className="text-center">{toPersianNumbers(student.phone)}</TableCell>
      
      <TableCell className="text-center">
        {student.gender && (
          <Badge variant="outline" className={`gap-2 ${student.gender === 'male' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-700/30 dark:text-emerald-400' : 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-900/20 dark:border-sky-700/30 dark:text-sky-400'}`}>
            {student.gender === 'male' ? <User className="h-3.5 w-3.5" /> : <UserCheck className="h-3.5 w-3.5" />}
            {student.gender === 'male' ? "مرد" : "زن"}
          </Badge>
        )}
      </TableCell>
      
      <TableCell className="text-center">
        <div className="flex flex-col">
          <span>{toPersianNumbers(student.height)}</span>
          <span className="text-xs text-muted-foreground">سانتی‌متر</span>
        </div>
      </TableCell>
      
      <TableCell className="text-center">
        <div className="flex flex-col">
          <span>{toPersianNumbers(student.weight)}</span>
          <span className="text-xs text-muted-foreground">کیلوگرم</span>
        </div>
      </TableCell>
      
      <TableCell className="text-center">
        <span className="inline-block bg-gradient-to-br from-emerald-50 to-sky-100 dark:from-emerald-900/20 dark:to-sky-800/30 px-2.5 py-1 rounded-lg text-emerald-700 dark:text-emerald-300 font-medium text-sm">
          {formatPrice(student.payment)}
        </span>
      </TableCell>
      
      <TableCell className="text-center">
        {isProfileComplete ? (
          <Badge variant="outline" className="gap-2 bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:border-green-700/30 dark:text-green-400">
            <CheckCircle className="h-3.5 w-3.5 text-green-500" />
            کامل
          </Badge>
        ) : (
          <Badge variant="outline" className="gap-2 bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:border-amber-700/30 dark:text-amber-400">
            ناقص
          </Badge>
        )}
      </TableCell>
      
      <TableCell className="text-center">
        <div className="flex items-center justify-center space-x-1 rtl:space-x-reverse">
          {/* Mobile view: dropdown menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Menu className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg border border-slate-200/70 dark:border-slate-700/70">
              {onEdit && (
                <DropdownMenuItem onClick={() => onEdit(student)} className="cursor-pointer">
                  <Edit className="h-3.5 w-3.5 mr-2" />
                  ویرایش
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => onAddExercise(student)} className="cursor-pointer">
                <CalendarDays className="h-3.5 w-3.5 mr-2" />
                برنامه
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(student.id)} className="cursor-pointer text-red-600 dark:text-red-400">
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
              className="flex items-center gap-1 text-xs py-1 px-2 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-900/20 dark:hover:text-emerald-400 transition-colors"
              onClick={() => onAddExercise(student)}
            >
              <CalendarDays className="h-3.5 w-3.5" />
              <span>برنامه</span>
            </Button>
            
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-xs py-1 px-2 hover:bg-sky-50 hover:text-sky-700 dark:hover:bg-sky-900/20 dark:hover:text-sky-400 transition-colors"
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
