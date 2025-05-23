
import React, { useState } from "react";
import { Student } from "@/components/students/StudentTypes";
import { AnimatePresence } from "framer-motion";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  CalendarDays,
  Trash,
  Edit,
  Apple,
  Pill,
  Printer
} from "lucide-react";
import { ContextMenuHeader } from "./context-menu/ContextMenuHeader";
import { ContextMenuItemWithAnimation } from "./context-menu/ContextMenuItem";
import { ContextMenuSection } from "./context-menu/ContextMenuSection";
import { ExportProgramPDF } from "../export/ExportProgramPDF";

interface StudentContextMenuProps {
  student: Student;
  children: React.ReactNode;
  onEdit?: () => void;
  onDelete?: () => void;
  onAddExercise: () => void;
  onAddDiet?: () => void;
  onAddSupplement?: () => void;
  isProfileComplete: boolean;
  exercises?: any[];
  meals?: any[];
  supplements?: any[];
}

export const StudentContextMenu: React.FC<StudentContextMenuProps> = ({
  student,
  children,
  onEdit,
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
  isProfileComplete,
  exercises = [],
  meals = [],
  supplements = []
}) => {
  const [showExportPDF, setShowExportPDF] = useState(false);

  // Log when this component renders to help with debugging
  console.log("Rendering StudentContextMenu for:", student.name);

  const handleProgramClick = () => {
    console.log("Context Menu: Add Exercise clicked for student:", student.name);
    if (onAddExercise) onAddExercise();
  };
  
  const handleEditClick = () => {
    if (onEdit) onEdit();
  };
  
  const handleDeleteClick = () => {
    if (onDelete) onDelete();
  };
  
  const handleDietClick = () => {
    if (onAddDiet) onAddDiet();
  };
  
  const handleSupplementClick = () => {
    if (onAddSupplement) onAddSupplement();
  };
  
  const handleExportClick = () => {
    console.log("Export Program clicked for student:", student.name);
    setShowExportPDF(true);
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
              icon={<Printer className="h-4 w-4" />}
              title="صدور برنامه"
              subtitle="خروجی PDF و چاپ"
              onClick={handleExportClick}
              index={1}
              variant="blue"
            />
            
            {onAddDiet && (
              <ContextMenuItemWithAnimation
                icon={<Apple className="h-4 w-4" />}
                title="افزودن رژیم غذایی"
                subtitle="مدیریت برنامه غذایی"
                onClick={handleDietClick}
                index={2}
                variant="green"
              />
            )}
            
            {onAddSupplement && (
              <ContextMenuItemWithAnimation
                icon={<Pill className="h-4 w-4" />}
                title="افزودن مکمل"
                subtitle="مدیریت مکمل‌های ورزشی"
                onClick={handleSupplementClick}
                index={3}
                variant="orange"
              />
            )}
          </ContextMenuSection>
          
          {/* Student Management Section */}
          <ContextMenuSection title="مدیریت شاگرد">
            {onEdit && (
              <ContextMenuItemWithAnimation
                icon={<Edit className="h-4 w-4" />}
                title="ویرایش شاگرد"
                subtitle="تغییر اطلاعات شاگرد"
                onClick={handleEditClick}
                index={4}
                variant="blue"
              />
            )}
            
            {onDelete && (
              <ContextMenuItemWithAnimation
                icon={<Trash className="h-4 w-4" />}
                title="حذف شاگرد"
                subtitle="حذف کامل اطلاعات"
                onClick={handleDeleteClick}
                index={5}
                variant="red"
              />
            )}
          </ContextMenuSection>
        </ContextMenuContent>
      </AnimatePresence>
      
      <ExportProgramPDF 
        student={student}
        exercises={exercises}
        meals={meals}
        supplements={supplements}
        isOpen={showExportPDF}
        onClose={() => setShowExportPDF(false)}
      />
    </ContextMenu>
  );
};

export default StudentContextMenu;
