
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Student } from "@/components/students/StudentTypes";
import { cn } from "@/lib/utils";
import { studentFormSchema, StudentFormValues } from "@/lib/validations/student";

// Import our new components
import { ProfileImageUpload } from "./form-components/ProfileImageUpload";
import { PersonalInfoSection } from "./form-components/PersonalInfoSection";
import { MeasurementsSection } from "./form-components/MeasurementsSection";
import { PaymentField } from "./form-components/PaymentField";
import { FormActions } from "./form-components/FormActions";
import { GenderField } from "./form-components/GenderField";

interface StudentFormProps {
  student?: Student;
  onSave: (data: StudentFormValues) => void;
  onCancel: () => void;
  isDialog?: boolean;
}

export const StudentForm = ({
  student,
  onSave,
  onCancel,
  isDialog = false,
}: StudentFormProps) => {
  const { toast } = useToast();
  const [previewImage, setPreviewImage] = useState<string>(student?.image || "/Assets/Image/Place-Holder.svg");
  
  // Initialize form with default values or student data
  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      name: student?.name || "",
      phone: student?.phone || "",
      height: student?.height || "",
      weight: student?.weight || "",
      image: student?.image || "/Assets/Image/Place-Holder.svg",
      payment: student?.payment || "",
      password: student?.password || "",
      age: student?.age || "",
      grade: student?.grade || "",
      group: student?.group || "",
      gender: student?.gender || "male",
    },
  });

  // Update form when student data changes
  useEffect(() => {
    if (student) {
      console.log("Updating form with student data:", student);
      form.reset({
        name: student.name || "",
        phone: student.phone || "",
        height: student.height || "",
        weight: student.weight || "",
        image: student.image || "/Assets/Image/Place-Holder.svg",
        payment: student.payment || "",
        password: student.password || "",
        age: student.age || "",
        grade: student.grade || "",
        group: student.group || "",
        gender: student.gender || "male",
      });
      setPreviewImage(student.image || "/Assets/Image/Place-Holder.svg");
    }
  }, [student, form]);

  const onSubmit = (data: StudentFormValues) => {
    try {
      console.log("Form submission data:", data);
      
      // در صورت ویرایش و عدم تغییر گذرواژه، گذرواژه قبلی را حفظ کن
      const submitData = {
        ...data,
        password: data.password || student?.password || ""
      };
      
      console.log("Final submit data with preserved password:", submitData);
      onSave(submitData);
    } catch (error) {
      console.error("Error saving student:", error);
      toast({
        title: "خطا در ذخیره‌سازی",
        description: "مشکلی در ذخیره‌سازی اطلاعات دانش‌آموز پیش آمد. لطفا مجدد تلاش کنید.",
        variant: "destructive",
      });
    }
  };

  // Motion variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const handleImageChange = (imageData: string) => {
    setPreviewImage(imageData);
    form.setValue("image", imageData);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={containerVariants}
      className={cn(
        "w-full max-w-4xl mx-auto",
        isDialog ? "p-0" : "p-6 md:p-8"
      )}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Profile Image Section */}
          <motion.div 
            variants={itemVariants}
            className="flex justify-center"
          >
            <ProfileImageUpload 
              previewImage={previewImage}
              onChange={handleImageChange}
              error={!!form.formState.errors.image}
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Info Section */}
            <div className="space-y-4">
              <PersonalInfoSection 
                control={form.control} 
                itemVariants={itemVariants} 
              />
              
              {/* Gender Field */}
              <GenderField 
                control={form.control}
                itemVariants={itemVariants}
              />
            </div>
            
            {/* Measurements Section */}
            <div>
              <MeasurementsSection 
                control={form.control} 
                itemVariants={itemVariants} 
              />
            </div>
          </div>

          {/* Payment Field */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <PaymentField 
              control={form.control}
              itemVariants={itemVariants}
            />
          </motion.div>

          {/* Form Actions */}
          <motion.div variants={itemVariants}>
            <FormActions 
              isEdit={!!student} 
              onCancel={onCancel} 
            />
          </motion.div>
        </form>
      </Form>
    </motion.div>
  );
};
