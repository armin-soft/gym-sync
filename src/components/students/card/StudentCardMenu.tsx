
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
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
import { MenuItemWithIcon } from "./menu-item/MenuItemWithIcon";
import { MenuHeader } from "./menu-item/MenuHeader";

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
      <DropdownMenuContent 
        align="end" 
        className="w-64 p-2 rounded-xl border-slate-200 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-xl dark:shadow-black/20 border dark:border-slate-800/60"
        // اضافه کردن این پارامترها برای باز شدن سریع‌تر منو
        sideOffset={8}
        alignOffset={0}
        avoidCollisions={false}
      >
        <MenuHeader student={student} />
        
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
            disableAnimation={true}
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
              disableAnimation={true}
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
            disableAnimation={true}
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
            disableAnimation={true}
          />
          
          {/* تنظیمات شاگرد */}
          <MenuItemWithIcon 
            icon={<Settings className="h-4 w-4" />}
            title="تنظیمات شاگرد"
            subtitle="مدیریت دسترسی‌ها"
            iconClassName="bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 group-hover/item:bg-slate-200 dark:group-hover/item:bg-slate-700"
            hoverClassName="group-hover/item:text-slate-800 dark:group-hover/item:text-slate-200"
            custom={4}
            disableAnimation={true}
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
