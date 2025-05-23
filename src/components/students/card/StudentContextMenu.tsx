
import React from "react";
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
  Printer,
  FileText,
} from "lucide-react";
import { ContextMenuHeader } from "./context-menu/ContextMenuHeader";
import { ContextMenuItemWithAnimation } from "./context-menu/ContextMenuItem";
import { ContextMenuSection } from "./context-menu/ContextMenuSection";
import { exportStudentProgramToPdf } from "@/lib/utils/pdf-export";
import { useToast } from "@/hooks/use-toast";
import { PdfPreviewModal } from "@/components/ui/PdfPreviewModal";
import { useState } from "react";

interface StudentContextMenuProps {
  student: Student;
  children: React.ReactNode;
  onEdit?: () => void;
  onDelete?: () => void;
  onAddExercise: () => void;
  onAddDiet?: () => void;
  onAddSupplement?: () => void;
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
  isProfileComplete
}) => {
  // Log when this component renders to help with debugging
  console.log("Rendering StudentContextMenu for:", student.name);
  const { toast } = useToast();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

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
  
  const handleExportProgramClick = () => {
    console.log("Context Menu: Export Program clicked for student:", student.name);
    
    // Show the toast notification that export is in progress
    toast({
      title: "در حال آماده سازی برنامه",
      description: "لطفا منتظر بمانید...",
    });
    
    // Call the export function
    setTimeout(() => {
      exportStudentProgramToPdf(student)
        .then(() => {
          toast({
            title: "صدور برنامه انجام شد",
            description: "برنامه با موفقیت به صورت PDF صادر شد",
          });
        })
        .catch((error) => {
          console.error("Error exporting program:", error);
          toast({
            variant: "destructive",
            title: "خطا در صدور برنامه",
            description: "مشکلی در صدور برنامه پیش آمد. لطفا مجددا تلاش کنید.",
          });
        });
    }, 500);
  };
  
  const handlePreviewProgramClick = () => {
    console.log("Context Menu: Preview Program clicked for student:", student.name);
    setIsPreviewOpen(true);
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
              icon={<FileText className="h-4 w-4" />}
              title="پیش‌نمایش برنامه"
              subtitle="مشاهده برنامه به صورت PDF"
              onClick={handlePreviewProgramClick}
              index={1}
              variant="blue"
            />
            
            <ContextMenuItemWithAnimation
              icon={<Printer className="h-4 w-4" />}
              title="صدور برنامه"
              subtitle="چاپ و خروجی PDF"
              onClick={handleExportProgramClick}
              index={2}
              variant="green"
            />
            
            {onAddDiet && (
              <ContextMenuItemWithAnimation
                icon={<Apple className="h-4 w-4" />}
                title="افزودن رژیم غذایی"
                subtitle="مدیریت برنامه غذایی"
                onClick={handleDietClick}
                index={3}
                variant="green"
              />
            )}
            
            {onAddSupplement && (
              <ContextMenuItemWithAnimation
                icon={<Pill className="h-4 w-4" />}
                title="افزودن مکمل"
                subtitle="مدیریت مکمل‌های ورزشی"
                onClick={handleSupplementClick}
                index={4}
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
                index={5}
                variant="blue"
              />
            )}
            
            {onDelete && (
              <ContextMenuItemWithAnimation
                icon={<Trash className="h-4 w-4" />}
                title="حذف شاگرد"
                subtitle="حذف کامل اطلاعات"
                onClick={handleDeleteClick}
                index={6}
                variant="red"
              />
            )}
          </ContextMenuSection>
        </ContextMenuContent>
      </AnimatePresence>
      
      <PdfPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        student={student}
      />
    </ContextMenu>
  );
};

export default StudentContextMenu;
