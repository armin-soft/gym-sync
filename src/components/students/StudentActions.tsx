
import { useState } from "react";
import { Student } from "@/components/students/StudentTypes";
import { Button } from "@/components/ui/button";
import { CalendarDays, FileText, MoreHorizontal, ClipboardEdit, BarChart, Download } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface StudentActionsProps {
  student: Student;
  onEdit?: (student: Student) => void;
  onDelete?: (id: number) => void;
  onAddExercise?: (student: Student) => void;
  onAddDiet?: (student: Student) => void;
  onAddSupplement?: (student: Student) => void;
  onDownload?: (student: Student) => void;
  isCard?: boolean;
}

export const StudentActions = ({
  student,
  onEdit,
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
  onDownload,
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
            className="h-8 w-8 rounded-full hover:bg-indigo-100/80 dark:hover:bg-indigo-900/30 transition-colors duration-200 relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-indigo-100 dark:bg-indigo-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full scale-0 group-hover:scale-100 transition-transform"></span>
            <MoreHorizontal className="h-4 w-4 relative z-10 text-slate-600 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300" />
            <span className="sr-only">منوی اقدامات</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align={isCard ? "end" : "start"} 
          className="w-52 p-2 rounded-xl border-slate-200 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-xl dark:shadow-black/20 border dark:border-slate-800/60"
        >
          <div className="px-2 py-1.5 mb-1 border-b border-slate-100 dark:border-slate-800/90">
            <DropdownMenuLabel className="text-sm font-medium text-indigo-600 dark:text-indigo-400 p-0">
              اقدامات شاگرد
            </DropdownMenuLabel>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">منوی مدیریت {student.name}</p>
          </div>
          
          <div className="space-y-0.5 py-1">
            {/* تخصیص برنامه */}
            <MenuItemWithAnimation
              icon={<CalendarDays className="h-4 w-4 text-purple-600 dark:text-purple-400" />}
              onClick={handleProgramClick}
              label="تخصیص برنامه"
              index={0}
              bgHoverClass="hover:bg-purple-50 dark:hover:bg-purple-900/20"
            />
            
            {/* ویرایش اطلاعات */}
            {onEdit && (
              <MenuItemWithAnimation
                icon={<ClipboardEdit className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />}
                onClick={() => onEdit(student)}
                label="ویرایش اطلاعات"
                index={1}
                bgHoverClass="hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
              />
            )}
            
            <DropdownMenuSeparator className="my-1.5 bg-slate-200/70 dark:bg-slate-700/40" />
            
            {/* صدور برنامه */}
            {onDownload && (
              <MenuItemWithAnimation
                icon={<Download className="h-4 w-4 text-blue-600 dark:text-blue-400" />}
                onClick={() => onDownload(student)}
                label="دانلود برنامه"
                index={2}
                bgHoverClass="hover:bg-blue-50 dark:hover:bg-blue-900/20"
              />
            )}
            
            {/* گزارش‌گیری */}
            <MenuItemWithAnimation
              icon={<BarChart className="h-4 w-4 text-green-600 dark:text-green-400" />}
              label="گزارش‌گیری"
              index={3}
              bgHoverClass="hover:bg-green-50 dark:hover:bg-green-900/20"
            />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

interface MenuItemWithAnimationProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  index: number;
  bgHoverClass?: string;
}

const MenuItemWithAnimation: React.FC<MenuItemWithAnimationProps> = ({ 
  icon, 
  label, 
  onClick, 
  index,
  bgHoverClass = "hover:bg-slate-100 dark:hover:bg-slate-800/60" 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ 
        opacity: 1, 
        x: 0,
        transition: { delay: index * 0.05, duration: 0.2 } 
      }}
      whileHover={{ x: 3 }}
      whileTap={{ scale: 0.98 }}
    >
      <DropdownMenuItem 
        onClick={onClick} 
        className={`flex items-center gap-2.5 py-2 px-2.5 cursor-pointer rounded-lg text-slate-700 dark:text-slate-200 transition-all duration-200 group ${bgHoverClass}`}
      >
        <span className="flex-shrink-0 p-1.5 rounded-md bg-white/80 dark:bg-slate-800/80 shadow-sm">
          {icon}
        </span>
        <span className="text-sm">{label}</span>
      </DropdownMenuItem>
    </motion.div>
  );
};
