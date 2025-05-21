
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, CheckCircle2 } from "lucide-react";
import { Student } from "@/components/students/StudentTypes";
import { Badge } from "@/components/ui/badge";
import { StudentCardMenu } from "./StudentCardMenu";

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
  onEdit,
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
  onDownload,
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
      
      <StudentCardMenu 
        student={student}
        onEdit={onEdit}
        onDelete={() => onDelete(student.id)}
        onAddExercise={onAddExercise}
        onAddDiet={onAddDiet}
        onAddSupplement={onAddSupplement}
        onDownload={onDownload}
        isProfileComplete={isProfileComplete}
      />
    </div>
  );
};
