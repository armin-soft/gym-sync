
import React from "react";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { 
  MoreVertical, 
  CalendarDays,
} from "lucide-react";
import { Student } from "../StudentTypes";
import { MenuItemWithIcon } from "./menu-item/MenuItemWithIcon";
import { MenuHeader } from "./menu-item/MenuHeader";

interface StudentCardMenuProps {
  student: Student;
  onEdit?: () => void;
  onDelete?: (id: number) => void;
  onAddExercise: () => void;
  onAddDiet?: () => void;
  onAddSupplement?: () => void;
  onDownload?: () => void;
  isProfileComplete: boolean;
}

export const StudentCardMenu: React.FC<StudentCardMenuProps> = ({
  student,
  onAddExercise,
  isProfileComplete
}) => {
  // Add a console log to debug when the menu is rendered
  console.log("Rendering StudentCardMenu for student:", student.name);
  
  const handleProgramClick = () => {
    console.log("Add Exercise clicked for student:", student.name);
    if (onAddExercise) {
      onAddExercise();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 rounded-full hover:bg-indigo-100/80 dark:hover:bg-indigo-900/30 transition-colors duration-200 relative overflow-hidden group"
        >
          <span className="absolute inset-0 bg-indigo-100 dark:bg-indigo-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full scale-0 group-hover:scale-100 transition-transform"></span>
          <MoreVertical className="h-4 w-4 relative z-10 text-slate-600 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300" />
          <span className="sr-only">باز کردن منو</span>
        </Button>
      </DropdownMenuTrigger>
      <AnimatePresence>
        <DropdownMenuContent 
          align="end" 
          className="w-64 p-2 rounded-xl border-slate-200 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-xl dark:shadow-black/20 border dark:border-slate-800/60"
          sideOffset={8}
        >
          <MenuHeader student={student} />
          
          <div className="space-y-0.5 py-1">
            {/* تخصیص برنامه */}
            <MenuItemWithIcon 
              icon={<CalendarDays className="h-4 w-4" />}
              onClick={handleProgramClick}
              title="تخصیص برنامه"
              subtitle="افزودن تمرین و برنامه"
              iconClassName="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 group-hover/item:bg-purple-200 dark:group-hover/item:bg-purple-800/50"
              hoverClassName="group-hover/item:text-purple-600 dark:group-hover/item:text-purple-400"
              custom={0}
            />
          </div>
        </DropdownMenuContent>
      </AnimatePresence>
    </DropdownMenu>
  );
};

