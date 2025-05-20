
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { 
  MoreVertical, 
  FileText,
  CalendarDays,
  Download,
  Settings,
  BarChart,
  ClipboardEdit
} from "lucide-react";
import { Student } from "../StudentTypes";
import { useNavigate } from "react-router-dom";

interface StudentCardMenuProps {
  student: Student;
  onEdit?: () => void;
  onDelete?: (id: number) => void;
  onAddExercise?: (student: Student) => void;
  onAddDiet?: (student: Student) => void;
  onAddSupplement?: (student: Student) => void;
  onDownload?: () => void;
  isProfileComplete: boolean;
}

export const StudentCardMenu: React.FC<StudentCardMenuProps> = ({
  student,
  onDownload,
  onEdit,
  isProfileComplete
}) => {
  const navigate = useNavigate();

  // Navigate to program management page
  const handleProgramClick = () => {
    navigate(`/student-program/${student.id}`);
  };
  
  const menuItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.2,
        ease: "easeOut"
      }
    }),
    exit: { opacity: 0, x: -10, transition: { duration: 0.1 } }
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
          <motion.div 
            className="px-2 py-1.5 mb-1 border-b border-slate-100 dark:border-slate-800/90"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100">عملیات شاگرد</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">مدیریت اطلاعات {student.name}</p>
          </motion.div>
          
          <div className="space-y-0.5 py-1">
            {/* تخصیص برنامه */}
            <MenuItemWithIcon 
              icon={<CalendarDays className="h-4 w-4" />}
              onClick={handleProgramClick}
              title="تخصیص برنامه"
              subtitle="افزودن تمرین، رژیم و مکمل"
              iconClassName="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 group-hover/item:bg-purple-200 dark:group-hover/item:bg-purple-800/50"
              hoverClassName="group-hover/item:text-purple-600 dark:group-hover/item:text-purple-400"
              custom={0}
            />
            
            {/* ویرایش اطلاعات */}
            {onEdit && (
              <MenuItemWithIcon 
                icon={<ClipboardEdit className="h-4 w-4" />}
                onClick={onEdit}
                title="ویرایش اطلاعات"
                subtitle="تغییر مشخصات شاگرد"
                iconClassName="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 group-hover/item:bg-indigo-200 dark:group-hover/item:bg-indigo-800/50"
                hoverClassName="group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400"
                custom={1}
              />
            )}
            
            <DropdownMenuSeparator className="my-2 bg-slate-200/70 dark:bg-slate-700/40" />
            
            {/* گزینه صدور برنامه */}
            <MenuItemWithIcon 
              icon={<FileText className="h-4 w-4" />}
              onClick={onDownload}
              disabled={!isProfileComplete}
              title="صدور برنامه"
              subtitle="دانلود و چاپ برنامه‌ها"
              iconClassName="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover/item:bg-blue-200 dark:group-hover/item:bg-blue-800/50"
              hoverClassName="group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400"
              custom={2}
            />
            
            {/* گزارش‌گیری */}
            <MenuItemWithIcon 
              icon={<BarChart className="h-4 w-4" />}
              disabled={!isProfileComplete}
              title="گزارش‌گیری"
              subtitle="مشاهده آمار و پیشرفت"
              iconClassName="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 group-hover/item:bg-green-200 dark:group-hover/item:bg-green-800/50"
              hoverClassName="group-hover/item:text-green-600 dark:group-hover/item:text-green-400"
              custom={3}
            />
            
            {/* تنظیمات شاگرد */}
            <MenuItemWithIcon 
              icon={<Settings className="h-4 w-4" />}
              title="تنظیمات شاگرد"
              subtitle="مدیریت دسترسی‌ها"
              iconClassName="bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 group-hover/item:bg-slate-200 dark:group-hover/item:bg-slate-700"
              hoverClassName="group-hover/item:text-slate-800 dark:group-hover/item:text-slate-200"
              custom={4}
            />
          </div>
        </DropdownMenuContent>
      </AnimatePresence>
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
  custom: number;
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
  subtitleClassName = "",
  custom
}) => {
  return (
    <motion.div
      variants={menuItemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      custom={custom}
      whileHover={{ x: 3 }}
      whileTap={{ scale: 0.98 }}
    >
      <DropdownMenuItem 
        onClick={onClick} 
        disabled={disabled} 
        className={`flex items-center gap-2.5 py-2.5 px-3 cursor-pointer rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-slate-800/50 focus:bg-slate-100/80 dark:focus:bg-slate-800/50 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed group/item ${menuItemClassName}`}
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
