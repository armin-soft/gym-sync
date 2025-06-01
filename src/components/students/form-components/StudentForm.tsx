
import React from "react";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { studentFormSchema, StudentFormValues } from "@/lib/validations/student";
import { Student } from "@/components/students/StudentTypes";
import { StudentImageSection } from "./StudentImageSection";
import { StudentPersonalInfo } from "./StudentPersonalInfo";
import { FormActions } from "./FormActions";
import { itemVariants } from "./FormContainer";

interface StudentFormProps {
  student?: Student;
  onSave: (data: any) => void;
  onCancel: () => void;
}

export const StudentForm: React.FC<StudentFormProps> = ({
  student,
  onSave,
  onCancel,
}) => {
  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      name: student?.name || "",
      phone: student?.phone || "",
      height: student?.height || "",
      weight: student?.weight || "",
      payment: student?.payment || "",
      age: student?.age?.toString() || "",
      grade: student?.grade || "",
      group: student?.group || "",
      image: student?.image || "/Assets/Image/Place-Holder.svg"
    }
  });

  const onSubmit = (data: StudentFormValues) => {
    try {
      // Ensure image is preserved from the student object if not changed in the form
      onSave(data);
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <motion.div variants={itemVariants} className="p-6 flex flex-col sm:flex-row gap-6">
          <StudentImageSection 
            initialImage={student?.image} 
            form={form} 
            itemVariants={itemVariants} 
          />
          
          <StudentPersonalInfo form={form} />
        </motion.div>
        
        <FormActions isEdit={Boolean(student)} onCancel={onCancel} />
      </form>
    </Form>
  );
};
