
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, CheckCircle2 } from "lucide-react";
import { Student } from "@/components/students/StudentTypes";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";

interface StudentCardHeaderProps {
  student: Student;
  onEdit: () => void;
  onDelete: (id: number) => void;
  onAddExercise: () => void;
  onAddDiet: () => void;
  onAddSupplement: () => void;
  onDownload?: () => void;
  isProfileComplete: boolean;
}

export const StudentCardHeader: React.FC<StudentCardHeaderProps> = ({
  student,
  onAddExercise,
  isProfileComplete,
}) => {
  return (
    <div className="flex justify-between items-start">
      <div className="flex items-center space-x-2 space-x-reverse">
        <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
          <AvatarImage src={student.image || "/Assets/Image/Place-Holder.svg"} alt={student.name} />
          <AvatarFallback>
            <User className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-base">{student.name}</h3>
            {isProfileComplete ? (
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            ) : null}
          </div>
          <div className="flex items-center gap-1.5">
            <Badge variant="outline" className="text-xs px-1.5 py-0 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              {student.phone}
            </Badge>
          </div>
        </div>
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-1 text-xs p-1.5 hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-purple-900/20 dark:hover:text-purple-400 rounded-lg transition-colors"
        onClick={onAddExercise}
      >
        <CalendarDays className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">تخصیص برنامه</span>
      </Button>
    </div>
  );
};
