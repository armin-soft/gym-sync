
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Student } from "@/components/students/StudentTypes";
import { cn } from "@/lib/utils";
import { studentFormSchema, StudentFormValues } from "@/lib/validations/student";
import { toPersianNumbers } from "@/lib/utils/numbers";

// Import our modern components
import { ModernProfileImageUpload } from "./ModernProfileImageUpload";
import { ModernPersonalInfoSection } from "./ModernPersonalInfoSection";
import { ModernMeasurementsSection } from "./ModernMeasurementsSection";
import { ModernGenderField } from "./ModernGenderField";
import { ModernFormActions } from "./ModernFormActions";

interface ModernStudentFormProps {
  student?: Student;
  onSave: (data: StudentFormValues) => void;
  onCancel: () => void;
  isDialog?: boolean;
}

export const ModernStudentForm = ({
  student,
  onSave,
  onCancel,
  isDialog = false,
}: ModernStudentFormProps) => {
  const { toast } = useToast();
  const [previewImage, setPreviewImage] = useState<string>(student?.image || "/Assets/Image/Place-Holder.svg");
  const [currentStep, setCurrentStep] = useState(0);
  
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
      age: student?.age || "",
      grade: student?.grade || "",
      group: student?.group || "",
      gender: student?.gender || undefined,
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
        image: student.image || "/Assets/Image/Place-Holder.svg",
        payment: student.payment || "",
        age: student.age || "",
        grade: student.grade || "",
        group: student.group || "",
        gender: student.gender || undefined,
      });
      setPreviewImage(student.image || "/Assets/Image/Place-Holder.svg");
    }
  }, [student, form]);

  const onSubmit = (data: StudentFormValues) => {
    try {
      onSave(data);
    } catch (error) {
      console.error("Error saving student:", error);
      toast({
        title: "خطا در ذخیره‌سازی",
        description: "مشکلی در ذخیره‌سازی اطلاعات شاگرد پیش آمد. لطفا مجدد تلاش کنید.",
        variant: "destructive",
      });
    }
  };

  // Motion variants for animations
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
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
        "w-full max-w-5xl mx-auto",
        isDialog ? "p-0" : "p-6 md:p-8"
      )}
      dir="rtl"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-violet-400/20 to-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl" />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 relative">
          {/* Header Section with Progress */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              <div className="w-8 h-8 bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">
                  {toPersianNumbers(student ? "ویرایش" : "جدید")}
                </span>
              </div>
              <h2 className="text-3xl font-bold">
                {student ? "ویرایش اطلاعات شاگرد" : "افزودن شاگرد جدید"}
              </h2>
            </div>
            <p className="text-muted-foreground mt-2">
              {student 
                ? "اطلاعات شاگرد را با دقت ویرایش کنید" 
                : "فرم زیر را برای افزودن شاگرد جدید تکمیل کنید"}
            </p>
          </motion.div>

          {/* Main Form Content */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl shadow-gray-200/20 dark:shadow-black/20 overflow-hidden">
            
            {/* Profile Image Section */}
            <motion.div 
              variants={itemVariants}
              className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/50 dark:to-purple-950/50 p-8 border-b border-gray-200/50 dark:border-gray-700/50"
            >
              <div className="flex justify-center">
                <ModernProfileImageUpload 
                  previewImage={previewImage}
                  onChange={handleImageChange}
                  error={!!form.formState.errors.image}
                />
              </div>
            </motion.div>

            {/* Form Fields */}
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Right Column - Personal Info */}
                <motion.div variants={itemVariants} className="space-y-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-800/50">
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                      <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs">شخ</span>
                      </div>
                      اطلاعات شخصی
                    </h3>
                    <ModernPersonalInfoSection 
                      control={form.control} 
                      itemVariants={itemVariants} 
                    />
                  </div>

                  {/* Gender Field */}
                  <motion.div variants={itemVariants}>
                    <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 rounded-2xl p-6 border border-emerald-200/50 dark:border-emerald-800/50">
                      <ModernGenderField 
                        control={form.control}
                        itemVariants={itemVariants}
                      />
                    </div>
                  </motion.div>
                </motion.div>
                
                {/* Left Column - Measurements */}
                <motion.div variants={itemVariants}>
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-2xl p-6 border border-amber-200/50 dark:border-amber-800/50 h-full">
                    <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-4 flex items-center gap-2">
                      <div className="w-6 h-6 bg-amber-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs">اند</span>
                      </div>
                      اندازه‌گیری و تعرفه
                    </h3>
                    <ModernMeasurementsSection 
                      control={form.control} 
                      itemVariants={itemVariants} 
                    />
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Form Actions */}
            <motion.div variants={itemVariants}>
              <ModernFormActions 
                isEdit={!!student} 
                onCancel={onCancel} 
              />
            </motion.div>
          </div>
        </form>
      </Form>
    </motion.div>
  );
};
