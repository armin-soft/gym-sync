
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  PersonalInfoSection, 
  MeasurementsSection, 
  PaymentField,
  StudentDialogHeader,
  StudentImageUpload,
  FormActions
} from "./index";
import { useToast } from "@/hooks/use-toast";
import { Student } from "@/components/students/StudentTypes";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { formatPayment } from "@/utils/studentUtils";

interface StudentFormData {
  name: string;
  phone: string;
  height: string;
  weight: string;
  image: string;
  payment: string;
}

interface StudentDialogContentProps {
  student?: Student;
  onSave: (data: StudentFormData) => void;
  onCancel: () => void;
}

export const StudentDialogContent: React.FC<StudentDialogContentProps> = ({
  student,
  onSave,
  onCancel
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<StudentFormData>({
    name: student?.name || "",
    phone: student?.phone || "",
    height: student?.height || "",
    weight: student?.weight || "",
    image: student?.image || "/placeholder.svg",
    payment: student?.payment || "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof StudentFormData, string>>>({});

  const dialogVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  const validateField = (key: keyof StudentFormData, value: string) => {
    let error = "";
    switch (key) {
      case "name":
        if (!value) error = "نام و نام خانوادگی الزامی است";
        break;
      case "phone":
        if (!value) error = "شماره موبایل الزامی است";
        else if (!/^09\d{9}$/.test(value)) error = "شماره موبایل معتبر نیست";
        break;
      case "height":
        if (!value) error = "قد الزامی است";
        else if (!/^\d+$/.test(value)) error = "قد باید عدد باشد";
        break;
      case "weight":
        if (!value) error = "وزن الزامی است";
        else if (!/^\d+$/.test(value)) error = "وزن باید عدد باشد";
        break;
      case "image":
        break;
      case "payment":
        if (!value) error = "مبلغ الزامی است";
        else if (!/^\d+$/.test(value)) error = "مبلغ باید عدد باشد";
        break;
    }
    setErrors(prev => ({ ...prev, [key]: error }));
    return !error;
  };

  const handleFieldChange = (field: keyof StudentFormData, value: string) => {
    let processedValue = value;
    
    if (field === "phone" || field === "height" || field === "weight") {
      processedValue = value.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
    } else if (field === "payment") {
      processedValue = value.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace(/\D/g, '');
    }
    
    setFormData({ ...formData, [field]: processedValue });
    validateField(field, processedValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let isValid = true;
    
    Object.entries(formData).forEach(([key, value]) => {
      if (!validateField(key as keyof StudentFormData, value)) {
        isValid = false;
      }
    });

    if (!isValid) {
      toast({
        title: "خطا",
        description: "لطفاً همه فیلدها را به درستی پر کنید",
        variant: "destructive",
      });
      return;
    }

    onSave(formData);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={dialogVariants}
      className="relative"
    >
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-indigo-500 to-violet-600 -z-10" />
      
      <StudentDialogHeader isEdit={!!student} itemVariants={itemVariants} />
      
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-t-3xl px-6 pt-6 pb-6 shadow-[0_-40px_80px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_-40px_80px_-15px_rgba(0,0,0,0.5)] space-y-6">
        <StudentImageUpload 
          image={formData.image}
          onImageChange={(imageUrl) => handleFieldChange("image", imageUrl)}
          error={errors.image}
          itemVariants={itemVariants}
        />
        
        <motion.div variants={itemVariants} className="space-y-4">
          <PersonalInfoSection 
            control={{
              value: {
                name: formData.name,
                phone: formData.phone
              },
              onChange: (field: string, value: string) => handleFieldChange(field as keyof StudentFormData, value),
              errors
            }}
            itemVariants={itemVariants}
          />

          <MeasurementsSection 
            control={{
              value: {
                height: formData.height,
                weight: formData.weight
              },
              onChange: (field: string, value: string) => handleFieldChange(field as keyof StudentFormData, value),
              errors
            }}
            itemVariants={itemVariants}
          />

          <PaymentField
            value={toPersianNumbers(formatPayment(formData.payment || ''))}
            onChange={(value) => handleFieldChange("payment", value)}
            error={errors.payment}
            itemVariants={itemVariants}
          />
        </motion.div>

        <FormActions isEdit={!!student} onCancel={onCancel} />
      </form>
    </motion.div>
  );
};
