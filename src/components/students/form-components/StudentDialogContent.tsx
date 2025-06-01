
import React from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Student } from "@/components/students/StudentTypes";
import { ModernStudentForm } from "./ModernStudentForm";

interface StudentDialogContentProps {
  student?: Student;
  onSave: (data: any) => void;
  onCancel: () => void;
}

export const StudentDialogContent: React.FC<StudentDialogContentProps> = ({
  student,
  onSave,
  onCancel,
}) => {
  const { toast } = useToast();
  
  const handleSave = (formData: any) => {
    try {
      // Always preserve the existing image if the image in formData is a placeholder
      // or not provided
      const preservedImage = 
        (formData.image === "/Assets/Image/Place-Holder.svg" && student?.image) 
          ? student.image 
          : formData.image;
      
      onSave({
        ...formData,
        image: preservedImage
      });
    } catch (error) {
      console.error("Error saving student:", error);
      toast({
        title: "خطا در ذخیره‌سازی",
        description: "مشکلی در ذخیره‌سازی اطلاعات شاگرد پیش آمد. لطفا مجدد تلاش کنید.",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      className="relative flex flex-col rounded-3xl shadow-2xl overflow-hidden w-full max-w-4xl mx-auto bg-white dark:bg-slate-900"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <ModernStudentForm
        student={student}
        onSave={handleSave}
        onCancel={onCancel}
        isDialog={true}
      />
    </motion.div>
  );
};
