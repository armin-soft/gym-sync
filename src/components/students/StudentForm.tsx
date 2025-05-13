
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Student } from "@/components/students/StudentTypes";
import { cn } from "@/lib/utils";

// Import our new components
import { ProfileImageUpload } from "./form-components/ProfileImageUpload";
import { PersonalInfoSection } from "./form-components/PersonalInfoSection";
import { MeasurementsSection } from "./form-components/MeasurementsSection";
import { PaymentField } from "./form-components/PaymentField";
import { FormActions } from "./form-components/FormActions";

// Define schema for form validation
const studentFormSchema = z.object({
  name: z.string().min(2, { message: "نام و نام خانوادگی الزامی است" }),
  phone: z.string().regex(/^09\d{9}$/, { message: "شماره موبایل معتبر نیست" }),
  height: z.string().regex(/^\d+$/, { message: "قد باید عدد باشد" }),
  weight: z.string().regex(/^\d+$/, { message: "وزن باید عدد باشد" }),
  image: z.string().default("/placeholder.svg"),
  payment: z.string().regex(/^\d+$/, { message: "مبلغ باید عدد باشد" }),
});

// Form data type derived from the schema
type StudentFormValues = z.infer<typeof studentFormSchema>;

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
  const [previewImage, setPreviewImage] = useState<string>(student?.image || "/placeholder.svg");
  
  // Initialize form with default values or student data
  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      name: student?.name || "",
      phone: student?.phone || "",
      height: student?.height || "",
      weight: student?.weight || "",
      image: student?.image || "/placeholder.svg",
      payment: student?.payment || "",
    },
  });

  // Update form when student data changes
  useEffect(() => {
    if (student) {
      form.reset({
        name: student.name || "",
        phone: student.phone || "",
        height: student.height || "",
        weight: student.weight || "",
        image: student.image || "/placeholder.svg",
        payment: student.payment || "",
      });
      setPreviewImage(student.image || "/placeholder.svg");
    } else {
      form.reset({
        name: "",
        phone: "",
        height: "",
        weight: "",
        image: "/placeholder.svg",
        payment: "",
      });
      setPreviewImage("/placeholder.svg");
    }
  }, [student, form]);

  const onSubmit = (data: StudentFormValues) => {
    try {
      onSave(data);
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
