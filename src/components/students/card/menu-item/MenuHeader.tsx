
import React from "react";
import { Student } from "../../StudentTypes";
import { DropdownMenuLabel } from "@/components/ui/dropdown-menu";

interface MenuHeaderProps {
  student: Student;
}

export const MenuHeader: React.FC<MenuHeaderProps> = ({ student }) => {
  return (
    <div className="px-2 py-1.5 mb-1 border-b border-slate-100 dark:border-slate-800/90">
      <DropdownMenuLabel className="text-sm font-medium text-indigo-600 dark:text-indigo-400 p-0">
        {student.name}
      </DropdownMenuLabel>
      {student.phone && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          {student.phone}
        </p>
      )}
    </div>
  );
};
