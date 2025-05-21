
import React from "react";
import { AnimatePresence } from "framer-motion";
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
  Trash2,
  ClipboardEdit,
  BarChart
} from "lucide-react";
import { Student } from "../StudentTypes";
import { MenuItemWithIcon } from "./menu-item/MenuItemWithIcon";
import { MenuHeader } from "./menu-item/MenuHeader";

interface StudentCardMenuProps {
  student: Student;
  onEdit?: () => void;
  onDelete?: (id: number) => void;
  onAddExercise?: () => void;
  onAddDiet?: () => void;
  onAddSupplement?: () => void;
  onDownload?: () => void;
  isProfileComplete: boolean;
}

export const StudentCardMenu: React.FC<StudentCardMenuProps> = ({
  student,
  onDownload,
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
            {onAddExercise && (
              <MenuItemWithIcon 
                icon={<CalendarDays className="h-4 w-4" />}
                onClick={onAddExercise}
                title="تخصیص برنامه"
                subtitle="افزودن تمرین و برنامه"
                iconClassName="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 group-hover/item:bg-purple-200 dark:group-hover/item:bg-purple-800/50"
                hoverClassName="group-hover/item:text-purple-600 dark:group-hover/item:text-purple-400"
                custom={0}
              />
            )}
            
            {/* برنامه غذایی */}
            {onAddDiet && (
              <MenuItemWithIcon 
                icon={<FileText className="h-4 w-4" />}
                onClick={onAddDiet}
                title="برنامه غذایی"
                subtitle="تخصیص رژیم غذایی"
                iconClassName="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover/item:bg-blue-200 dark:group-hover/item:bg-blue-800/50"
                hoverClassName="group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400"
                custom={1}
              />
            )}
            
            {/* ویرایش اطلاعات */}
            {onEdit && (
              <MenuItemWithIcon 
                icon={<ClipboardEdit className="h-4 w-4" />}
                onClick={onEdit}
                title="ویرایش اطلاعات"
                subtitle="تغییر مشخصات شاگرد"
                iconClassName="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 group-hover/item:bg-indigo-200 dark:group-hover/item:bg-indigo-800/50"
                hoverClassName="group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400"
                custom={2}
              />
            )}
            
            <DropdownMenuSeparator className="my-2 bg-slate-200/70 dark:bg-slate-700/40" />
            
            {/* دانلود برنامه */}
            {onDownload && (
              <MenuItemWithIcon 
                icon={<Download className="h-4 w-4" />}
                onClick={onDownload}
                title="دانلود برنامه"
                subtitle="خروجی PDF برنامه‌ها"
                iconClassName="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 group-hover/item:bg-green-200 dark:group-hover/item:bg-green-800/50"
                hoverClassName="group-hover/item:text-green-600 dark:group-hover/item:text-green-400"
                custom={3}
              />
            )}
            
            {/* حذف شاگرد */}
            {onDelete && (
              <MenuItemWithIcon 
                icon={<Trash2 className="h-4 w-4" />}
                onClick={() => onDelete(student.id)}
                title="حذف شاگرد"
                subtitle="حذف دائمی اطلاعات"
                iconClassName="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 group-hover/item:bg-red-200 dark:group-hover/item:bg-red-800/50"
                hoverClassName="group-hover/item:text-red-600 dark:group-hover/item:text-red-400"
                custom={4}
              />
            )}
            
            {/* گزارش‌گیری */}
            <MenuItemWithIcon 
              icon={<BarChart className="h-4 w-4" />}
              title="گزارش‌گیری"
              subtitle="مشاهده آمار و پیشرفت"
              iconClassName="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 group-hover/item:bg-orange-200 dark:group-hover/item:bg-orange-800/50"
              hoverClassName="group-hover/item:text-orange-600 dark:group-hover/item:text-orange-400"
              custom={5}
            />
          </div>
        </DropdownMenuContent>
      </AnimatePresence>
    </DropdownMenu>
  );
};
