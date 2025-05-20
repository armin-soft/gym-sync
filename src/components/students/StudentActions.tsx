
import { useState } from "react";
import { Student } from "@/components/students/StudentTypes";
import { Button } from "@/components/ui/button";
import { CalendarDays, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

interface StudentActionsProps {
  student: Student;
  onEdit?: (student: Student) => void;
  onDelete: (id: number) => void;
  onAddExercise: (student: Student) => void;
  onAddDiet: (student: Student) => void;
  onAddSupplement: (student: Student) => void;
  onDownload?: (student: Student) => void;
  isCard?: boolean;
}

export const StudentActions = ({
  student,
  onDelete,
  isCard = false,
}: StudentActionsProps) => {
  const navigate = useNavigate();

  // تخصیص برنامه
  const handleProgramClick = () => {
    // هدایت به صفحه برنامه با شناسه شاگرد
    navigate(`/student-program/${student.id}`);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800"
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">منوی اقدامات</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={isCard ? "end" : "start"} className="backdrop-blur-xl bg-white/95 dark:bg-slate-900/95 border border-slate-200/80 dark:border-slate-800/80">
          <DropdownMenuLabel className="text-indigo-500 dark:text-indigo-400">
            اقدامات
          </DropdownMenuLabel>
          
          <DropdownMenuSeparator />
          
          {/* تخصیص برنامه - تنها گزینه منو */}
          <DropdownMenuItem onClick={handleProgramClick} className="gap-2">
            <CalendarDays className="h-4 w-4 text-purple-500" />
            تخصیص برنامه
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
