
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { 
  MoreVertical, 
  FileText
} from "lucide-react";
import { Student } from "../StudentTypes";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface StudentCardMenuProps {
  student: Student;
  onEdit?: () => void;
  onDelete: () => void;
  onAddExercise: () => void;
  onAddDiet: () => void;
  onAddSupplement: () => void;
  onDownload?: () => void;
  isProfileComplete: boolean;
}

export const StudentCardMenu: React.FC<StudentCardMenuProps> = ({
  student,
  onDownload,
  isProfileComplete
}) => {
  const navigate = useNavigate();

  // Navigate to program management page
  const handleProgramClick = () => {
    navigate(`/student-program/${student.id}`);
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-150 relative overflow-hidden group"
        >
          <span className="absolute inset-0 bg-indigo-100 dark:bg-indigo-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full scale-0 group-hover:scale-100 transition-transform"></span>
          <MoreVertical className="h-4 w-4 relative z-10 text-slate-600 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200" />
          <span className="sr-only">باز کردن منو</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-56 p-2 rounded-xl border-slate-200 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm shadow-xl dark:shadow-black/20 animate-in zoom-in-90 duration-100"
      >
        <div className="px-2 py-1.5 mb-1">
          <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100">عملیات</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">مدیریت اطلاعات شاگرد</p>
        </div>
        
        {/* گزینه صدور برنامه */}
        <MenuItemWithIcon 
          icon={<FileText className="h-4 w-4" />}
          onClick={onDownload}
          disabled={!isProfileComplete}
          title="صدور برنامه"
          subtitle="دانلود و چاپ برنامه‌ها"
          iconClassName="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover/item:bg-blue-200 dark:group-hover/item:bg-blue-800/50"
          hoverClassName="group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400"
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface MenuItemWithIconProps {
  icon: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  title: string;
  subtitle: string;
  iconClassName?: string;
  menuItemClassName?: string;
  hoverClassName?: string;
  subtitleClassName?: string;
}

const MenuItemWithIcon: React.FC<MenuItemWithIconProps> = ({
  icon,
  onClick,
  disabled = false,
  title,
  subtitle,
  iconClassName = "",
  menuItemClassName = "",
  hoverClassName = "",
  subtitleClassName = ""
}) => {
  return (
    <motion.div
      whileHover={{ x: 3 }}
      whileTap={{ scale: 0.98 }}
    >
      <DropdownMenuItem 
        onClick={onClick} 
        disabled={disabled} 
        className={`flex items-center gap-2.5 py-2.5 px-3 cursor-pointer rounded-lg text-slate-700 dark:text-slate-200 focus:bg-slate-100 dark:focus:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed group/item ${menuItemClassName}`}
      >
        <div className={`flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center transition-all duration-200 ${iconClassName}`}>
          {icon}
        </div>
        <div className="flex flex-col">
          <span className={`transition-colors duration-200 ${hoverClassName}`}>{title}</span>
          <span className={`text-xs text-slate-500 dark:text-slate-400 ${subtitleClassName}`}>{subtitle}</span>
        </div>
      </DropdownMenuItem>
    </motion.div>
  );
};
