
import React from "react";
import { Student } from "@/components/students/StudentTypes";
import { AnimatePresence } from "framer-motion";
import {
  ContextMenu,
  ContextMenuContent,
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
import { ContextMenuHeader } from "./context-menu/ContextMenuHeader";
import { ContextMenuItemWithAnimation } from "./context-menu/ContextMenuItem";
import { ContextMenuSection } from "./context-menu/ContextMenuSection";

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
    if (onAddExercise) onAddExercise(student);
  };

  const handleDietClick = () => {
    if (onAddDiet) onAddDiet(student);
  };

  const handleSupplementClick = () => {
    if (onAddSupplement) onAddSupplement(student);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger className="w-full h-full">
        {children}
      </ContextMenuTrigger>
      
      <AnimatePresence>
        <ContextMenuContent className="w-64 p-1.5 rounded-xl border-slate-200 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-xl dark:shadow-black/20 border dark:border-slate-800/60">
          <ContextMenuHeader student={student} />
          
          {/* Program Management Section */}
          <ContextMenuSection title="مدیریت برنامه">
            <ContextMenuItemWithAnimation
              icon={<CalendarDays className="h-4 w-4" />}
              title="تخصیص برنامه"
              subtitle="برنامه‌های تمرینی و رژیم"
              onClick={handleProgramClick}
              index={0}
              variant="purple"
            />
            
            <ContextMenuItemWithAnimation
              icon={<ClipboardList className="h-4 w-4" />}
              title="برنامه غذایی"
              subtitle="مدیریت تغذیه و رژیم"
              onClick={handleDietClick}
              index={1}
              variant="purple"
            />

            <ContextMenuItemWithAnimation
              icon={<FileText className="h-4 w-4" />}
              title="مکمل‌ها و ویتامین‌ها"
              subtitle="مدیریت مکمل‌ها"
              onClick={handleSupplementClick}
              index={2}
              variant="purple"
            />
          </ContextMenuSection>
          
          <ContextMenuSeparator className="my-1 bg-slate-200/70 dark:bg-slate-700/40" />
          
          {/* Actions Section */}
          <ContextMenuSection title="اقدامات">
            {onEdit && (
              <ContextMenuItemWithAnimation
                icon={<Pencil className="h-4 w-4" />}
                title="ویرایش اطلاعات"
                subtitle="تغییر پروفایل شاگرد"
                onClick={() => onEdit(student)}
                index={3}
                variant="blue"
              />
            )}
            
            {onDelete && (
              <ContextMenuItemWithAnimation
                icon={<Trash2 className="h-4 w-4" />}
                title="حذف شاگرد"
                subtitle="حذف کامل اطلاعات"
                onClick={() => onDelete(student.id)}
                index={4}
                variant="red"
              />
            )}
          </ContextMenuSection>
          
          <ContextMenuSeparator className="my-1 bg-slate-200/70 dark:bg-slate-700/40" />
          
          {/* Reports Section */}
          <ContextMenuSection title="خروجی و گزارش">
            {onDownload && (
              <ContextMenuItemWithAnimation
                icon={<Download className="h-4 w-4" />}
                title="دانلود برنامه"
                subtitle="خروجی PDF"
                onClick={() => onDownload(student)}
                index={5}
                variant="green"
              />
            )}
            
            <ContextMenuItemWithAnimation
              icon={<BarChart className="h-4 w-4" />}
              title="گزارش پیشرفت"
              subtitle="تحلیل روند پیشرفت"
              index={6}
              variant="orange"
            />
          </ContextMenuSection>
        </ContextMenuContent>
      </AnimatePresence>
    </ContextMenu>
  );
};

export default StudentContextMenu;
