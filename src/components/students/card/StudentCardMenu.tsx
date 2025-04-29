
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { 
  MoreVertical, 
  Edit, 
  Trash2, 
  Dumbbell, 
  UtensilsCrossed, 
  Pill, 
  Clipboard, 
  Download 
} from "lucide-react";
import { EditStudentButton } from "../EditStudentButton";
import { Student } from "../StudentTypes";

interface StudentCardMenuProps {
  student: Student;
  onEdit?: () => void;
  onDelete: () => void;
  onAddExercise: () => void;
  onAddDiet: () => void;
  onAddSupplement: () => void;
  isProfileComplete: boolean;
}

export const StudentCardMenu: React.FC<StudentCardMenuProps> = ({
  student,
  onEdit,
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
  isProfileComplete
}) => {
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
        
        <div className="flex items-center gap-2.5 py-2.5 px-3 cursor-pointer rounded-lg text-slate-700 dark:text-slate-200 focus:bg-slate-100 dark:focus:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 group/item">
          {onEdit ? (
            <Button
              variant="ghost"
              size="sm"
              className="h-9 px-3 flex-1"
              onClick={onEdit}
            >
              <Edit className="h-4 w-4 mr-2" />
              ویرایش
            </Button>
          ) : (
            <EditStudentButton
              studentId={student.id}
              variant="ghost"
              size="sm"
              className="h-9 px-3 flex-1"
            />
          )}
        </div>
        
        <MenuItemWithIcon 
          icon={<Dumbbell className="h-4 w-4" />}
          onClick={onAddExercise}
          disabled={!isProfileComplete}
          title="برنامه تمرینی"
          subtitle="تنظیم حرکات ورزشی"
          iconClassName="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 group-hover/item:bg-indigo-200 dark:group-hover/item:bg-indigo-800/50"
          hoverClassName="group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400"
        />
        
        <MenuItemWithIcon 
          icon={<UtensilsCrossed className="h-4 w-4" />}
          onClick={onAddDiet}
          disabled={!isProfileComplete}
          title="برنامه غذایی"
          subtitle="تنظیم وعده‌های غذایی"
          iconClassName="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 group-hover/item:bg-green-200 dark:group-hover/item:bg-green-800/50"
          hoverClassName="group-hover/item:text-green-600 dark:group-hover/item:text-green-400"
        />
        
        <MenuItemWithIcon 
          icon={<Pill className="h-4 w-4" />}
          onClick={onAddSupplement}
          disabled={!isProfileComplete}
          title="مکمل و ویتامین"
          subtitle="تنظیم مکمل‌های ورزشی"
          iconClassName="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 group-hover/item:bg-purple-200 dark:group-hover/item:bg-purple-800/50"
          hoverClassName="group-hover/item:text-purple-600 dark:group-hover/item:text-purple-400"
        />
        
        <div className="h-px bg-slate-200 dark:bg-slate-700/50 my-2 mx-1"></div>
        
        <MenuItemWithIcon 
          icon={<Download className="h-4 w-4" />}
          disabled={!isProfileComplete}
          title="دانلود برنامه"
          subtitle="دریافت فایل PDF برنامه"
          iconClassName="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 group-hover/item:bg-amber-200 dark:group-hover/item:bg-amber-800/50"
          hoverClassName="group-hover/item:text-amber-600 dark:group-hover/item:text-amber-400"
        />
        
        <MenuItemWithIcon 
          icon={<Clipboard className="h-4 w-4" />}
          disabled={!isProfileComplete}
          title="پرینت برنامه"
          subtitle="آماده‌سازی برای چاپ"
          iconClassName="bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 group-hover/item:bg-cyan-200 dark:group-hover/item:bg-cyan-800/50"
          hoverClassName="group-hover/item:text-cyan-600 dark:group-hover/item:text-cyan-400"
        />
        
        <div className="h-px bg-slate-200 dark:bg-slate-700/50 my-2 mx-1"></div>
        
        <MenuItemWithIcon 
          icon={<Trash2 className="h-4 w-4" />}
          onClick={onDelete}
          title="حذف شاگرد"
          subtitle="حذف کامل اطلاعات"
          iconClassName="bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 group-hover/item:bg-rose-200 dark:group-hover/item:bg-rose-800/50"
          menuItemClassName="text-rose-600 dark:text-rose-500 focus:bg-rose-50 dark:focus:bg-rose-900/20 hover:bg-rose-50 dark:hover:bg-rose-900/20"
          hoverClassName="group-hover/item:text-rose-700 dark:group-hover/item:text-rose-300"
          subtitleClassName="text-rose-500/70 dark:text-rose-400/70"
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
  );
};
