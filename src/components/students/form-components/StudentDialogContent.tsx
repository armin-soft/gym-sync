
import React from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Student } from "@/components/students/StudentTypes";
import { dialogVariants, itemVariants } from "./FormContainer";
import { StudentDialogHeader } from "./StudentDialogHeader";
import { StudentForm } from "./StudentForm";

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
      onSave({
        ...formData,
        image: formData.image || student?.image || "/placeholder.svg"
      });
    } catch (error) {
      console.error("Error saving student:", error);
      toast({
        title: "خطا در ذخیره‌سازی",
        description: "مشکلی در ذخیره‌سازی اطلاعات دانش‌آموز پیش آمد. لطفا مجدد تلاش کنید.",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      className="relative flex flex-col rounded-3xl shadow-2xl overflow-hidden w-full max-w-2xl mx-auto bg-white dark:bg-slate-900"
      initial="hidden"
      animate="visible"
      variants={dialogVariants}
    >
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-indigo-600 to-violet-600 -z-10" />
      
      <StudentDialogHeader isEdit={Boolean(student)} itemVariants={itemVariants} />
      
      <StudentForm
        student={student}
        onSave={handleSave}
        onCancel={onCancel}
      />
    </motion.div>
  );
};
