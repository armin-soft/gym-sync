
import React from "react";
import { Student } from "@/components/students/StudentTypes";

interface ContextMenuHeaderProps {
  student: Student;
}

export const ContextMenuHeader: React.FC<ContextMenuHeaderProps> = ({ 
  student
}) => {
  return (
    <div className="px-3 py-2 mb-1 border-b border-slate-100 dark:border-slate-800/90">
      <h3 className="text-sm font-medium text-slate-800 dark:text-white">
        {student.name}
      </h3>
      {student.phone && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          {student.phone}
        </p>
      )}
    </div>
  );
};
