
import React from "react";
import { Student } from "@/components/students/StudentTypes";
import { AnimatePresence, motion } from "framer-motion";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  CalendarDays,
  FileText,
  Pencil,
  Trash2,
  ClipboardList,
  BarChart,
  AppWindow,
  Download
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface StudentContextMenuProps {
  student: Student;
  children: React.ReactNode;
  onEdit?: (student: Student) => void;
  onDelete?: (id: number) => void;
  onAddExercise?: (student: Student) => void;
  onAddDiet?: (student: Student) => void;
  onAddSupplement?: (student: Student) => void;
  onDownload?: (student: Student) => void;
  isProfileComplete: boolean;
}

export const StudentContextMenu: React.FC<StudentContextMenuProps> = ({
  student,
  children,
  onEdit,
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
  onDownload,
  isProfileComplete
}) => {
  const navigate = useNavigate();
  
  const handleProgramClick = () => {
    navigate(`/student-program/${student.id}`);
  };

  const handleExerciseClick = () => {
    if (onAddExercise) onAddExercise(student);
  };

  const handleDietClick = () => {
    if (onAddDiet) onAddDiet(student);
  };

  const handleSupplementClick = () => {
    if (onAddSupplement) onAddSupplement(student);
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -5 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.04,
        duration: 0.15,
      }
    })
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger className="w-full h-full">
        {children}
      </ContextMenuTrigger>
      
      <AnimatePresence>
        <ContextMenuContent className="w-64 p-1.5 rounded-xl border-slate-200 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-xl dark:shadow-black/20 border dark:border-slate-800/60">
          <motion.div 
            className="px-2 py-1.5 mb-1 border-b border-slate-100 dark:border-slate-800/90"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100">{student.name}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">منوی مدیریت شاگرد</p>
          </motion.div>
          
          {/* دسته اول: مدیریت برنامه */}
          <div className="pb-1.5">
            <div className="px-2 py-1">
              <span className="text-xs font-medium text-indigo-500 dark:text-indigo-400">مدیریت برنامه</span>
            </div>
            
            <ContextMenuItem asChild className="focus:bg-transparent focus:text-foreground">
              <motion.div variants={menuItemVariants} initial="hidden" animate="visible" custom={0} className="w-full">
                <ContextMenuButton onClick={handleProgramClick}>
                  <CalendarDays className="h-4 w-4" />
                  <div>
                    <span>تخصیص برنامه</span>
                    <span className="text-xs text-muted-foreground">برنامه‌های تمرینی و رژیم</span>
                  </div>
                </ContextMenuButton>
              </motion.div>
            </ContextMenuItem>
            
            <ContextMenuItem asChild className="focus:bg-transparent focus:text-foreground">
              <motion.div variants={menuItemVariants} initial="hidden" animate="visible" custom={1} className="w-full">
                <ContextMenuButton onClick={handleExerciseClick} variant="purple">
                  <ClipboardList className="h-4 w-4" />
                  <div>
                    <span>برنامه تمرینی</span>
                    <span className="text-xs text-muted-foreground">مدیریت تمرینات</span>
                  </div>
                </ContextMenuButton>
              </motion.div>
            </ContextMenuItem>
            
            <ContextMenuSeparator className="my-1 bg-slate-200/70 dark:bg-slate-700/40" />
            
            {/* دسته دوم: سایر اقدامات */}
            <div className="px-2 py-1">
              <span className="text-xs font-medium text-indigo-500 dark:text-indigo-400">اقدامات</span>
            </div>
            
            {onEdit && (
              <ContextMenuItem asChild className="focus:bg-transparent focus:text-foreground">
                <motion.div variants={menuItemVariants} initial="hidden" animate="visible" custom={2} className="w-full">
                  <ContextMenuButton onClick={() => onEdit(student)} variant="blue">
                    <Pencil className="h-4 w-4" />
                    <div>
                      <span>ویرایش اطلاعات</span>
                      <span className="text-xs text-muted-foreground">تغییر پروفایل شاگرد</span>
                    </div>
                  </ContextMenuButton>
                </motion.div>
              </ContextMenuItem>
            )}
            
            {onDelete && (
              <ContextMenuItem asChild className="focus:bg-transparent focus:text-foreground">
                <motion.div variants={menuItemVariants} initial="hidden" animate="visible" custom={3} className="w-full">
                  <ContextMenuButton onClick={() => onDelete(student.id)} variant="red">
                    <Trash2 className="h-4 w-4" />
                    <div>
                      <span>حذف شاگرد</span>
                      <span className="text-xs text-muted-foreground">حذف کامل اطلاعات</span>
                    </div>
                  </ContextMenuButton>
                </motion.div>
              </ContextMenuItem>
            )}
            
            <ContextMenuSeparator className="my-1 bg-slate-200/70 dark:bg-slate-700/40" />
            
            {/* دسته سوم: خروجی و گزارش‌گیری */}
            <div className="px-2 py-1">
              <span className="text-xs font-medium text-indigo-500 dark:text-indigo-400">خروجی و گزارش</span>
            </div>
            
            {onDownload && (
              <ContextMenuItem asChild className="focus:bg-transparent focus:text-foreground">
                <motion.div variants={menuItemVariants} initial="hidden" animate="visible" custom={4} className="w-full">
                  <ContextMenuButton 
                    onClick={() => onDownload(student)} 
                    variant="green"
                    disabled={!isProfileComplete}
                  >
                    <Download className="h-4 w-4" />
                    <div>
                      <span>دانلود برنامه</span>
                      <span className="text-xs text-muted-foreground">خروجی PDF</span>
                    </div>
                  </ContextMenuButton>
                </motion.div>
              </ContextMenuItem>
            )}
            
            <ContextMenuItem asChild className="focus:bg-transparent focus:text-foreground">
              <motion.div variants={menuItemVariants} initial="hidden" animate="visible" custom={5} className="w-full">
                <ContextMenuButton variant="orange" disabled={!isProfileComplete}>
                  <BarChart className="h-4 w-4" />
                  <div>
                    <span>گزارش پیشرفت</span>
                    <span className="text-xs text-muted-foreground">تحلیل روند پیشرفت</span>
                  </div>
                </ContextMenuButton>
              </motion.div>
            </ContextMenuItem>
            
            <ContextMenuItem asChild className="focus:bg-transparent focus:text-foreground">
              <motion.div variants={menuItemVariants} initial="hidden" animate="visible" custom={6} className="w-full">
                <ContextMenuButton variant="slate">
                  <AppWindow className="h-4 w-4" />
                  <div>
                    <span>مشاهده پنل شاگرد</span>
                    <span className="text-xs text-muted-foreground">دسترسی به حساب کاربری</span>
                  </div>
                </ContextMenuButton>
              </motion.div>
            </ContextMenuItem>
          </div>
        </ContextMenuContent>
      </AnimatePresence>
    </ContextMenu>
  );
};

interface ContextMenuButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "blue" | "purple" | "green" | "orange" | "red" | "slate";
}

const ContextMenuButton: React.FC<ContextMenuButtonProps> = ({ 
  children, 
  onClick, 
  disabled = false,
  variant = "blue"
}) => {
  const getVariantClasses = () => {
    const baseClasses = "group hover:bg-opacity-90 dark:hover:bg-opacity-30";
    
    switch (variant) {
      case "purple":
        return `${baseClasses} hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-700 dark:hover:text-purple-300`;
      case "blue":
        return `${baseClasses} hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300`;
      case "green":
        return `${baseClasses} hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-700 dark:hover:text-green-300`;
      case "orange":
        return `${baseClasses} hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-700 dark:hover:text-orange-300`;
      case "red":
        return `${baseClasses} hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300`;
      case "slate":
        return `${baseClasses} hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200`;
      default:
        return `${baseClasses} hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200`;
    }
  };

  const getIconClasses = () => {
    switch (variant) {
      case "purple": return "text-purple-500 dark:text-purple-400";
      case "blue": return "text-blue-500 dark:text-blue-400";
      case "green": return "text-green-500 dark:text-green-400";
      case "orange": return "text-orange-500 dark:text-orange-400";
      case "red": return "text-red-500 dark:text-red-400";
      case "slate": return "text-slate-500 dark:text-slate-400";
      default: return "text-slate-500 dark:text-slate-400";
    }
  };

  return (
    <button
      className={`w-full flex items-start gap-3 px-2.5 py-2 rounded-lg text-left text-sm transition-all duration-200 ${getVariantClasses()} ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      <span className={`mt-0.5 ${getIconClasses()}`}>
        {React.Children.toArray(children)[0]}
      </span>
      <div className="flex flex-col">
        {React.Children.toArray(children)[1]}
      </div>
    </button>
  );
};

export default StudentContextMenu;
