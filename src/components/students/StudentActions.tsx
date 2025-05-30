
import { useState } from "react";
import { Student } from "@/components/students/StudentTypes";
import { Button } from "@/components/ui/button";
import { CalendarDays, MoreHorizontal, Sparkles } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ModernMenuItemWithAnimation } from "./ModernMenuItemWithAnimation";

interface StudentActionsProps {
  student: Student;
  onEdit?: (student: Student) => void;
  onDelete?: (id: number) => void;
  onAddExercise: (student: Student) => void;
  onAddDiet?: (student: Student) => void;
  onAddSupplement?: (student: Student) => void;
  isCard?: boolean;
}

export const StudentActions = ({
  student,
  onAddExercise,
  isCard = false,
}: StudentActionsProps) => {
  const navigate = useNavigate();

  console.log("Rendering modern StudentActions for student:", student.name);

  // تخصیص برنامه
  const handleProgramClick = () => {
    console.log("StudentActions: Add Exercise clicked for student:", student.name);
    if (onAddExercise) {
      onAddExercise(student);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-10 w-10 rounded-xl hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-900/20 dark:hover:to-purple-900/20 transition-all duration-300 relative overflow-hidden group shadow-sm hover:shadow-md"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
            <MoreHorizontal className="h-5 w-5 relative z-10 text-slate-600 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300" />
            <span className="sr-only">منوی اقدامات مدرن</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align={isCard ? "end" : "start"} 
          className="w-64 p-3 rounded-2xl border-slate-200/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl dark:shadow-black/40 border-2 dark:border-slate-800/60"
        >
          {/* هدر مدرن */}
          <div className="px-3 py-2 mb-3 rounded-xl bg-gradient-to-l from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-100 dark:border-indigo-800/30">
            <DropdownMenuLabel className="text-sm font-bold text-indigo-700 dark:text-indigo-300 p-0 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              اقدامات پیشرفته
            </DropdownMenuLabel>
            <p className="text-xs text-indigo-600/80 dark:text-indigo-400/80 mt-1">
              مدیریت هوشمند {student.name}
            </p>
          </div>
          
          <div className="space-y-1">
            {/* تخصیص برنامه */}
            <ModernMenuItemWithAnimation
              icon={<CalendarDays className="h-4 w-4 text-purple-600 dark:text-purple-400" />}
              onClick={handleProgramClick}
              label="تخصیص برنامه"
              description="ایجاد برنامه جدید"
              index={0}
              bgHoverClass="hover:bg-gradient-to-l hover:from-purple-50 hover:to-purple-100 dark:hover:from-purple-900/20 dark:hover:to-purple-800/20"
            />
          </div>
          
          {/* پایین منو */}
          <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-700/60">
            <div className="text-xs text-slate-500 dark:text-slate-400 text-center">
              نسخه پیشرفته GymSync
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
