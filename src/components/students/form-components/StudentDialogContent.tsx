
import React, { useState } from "react";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Coins, Height, Phone, Ruler, User, Weight } from "lucide-react";
import { studentFormSchema, StudentFormValues } from "@/lib/validations/student";
import { Student } from "@/components/students/StudentTypes";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { StudentImageUpload } from "./StudentImageUpload";
import { FormActions } from "./FormActions";
import { dialogVariants, itemVariants } from "./FormContainer";
import { StudentDialogHeader } from "./StudentDialogHeader";

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
  const [imageData, setImageData] = useState<string | null>(student?.image || null);
  const [imageError, setImageError] = useState<string | null>(null);
  
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
      group: student?.group || ""
    }
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) {
      setImageError("حجم تصویر باید کمتر از ۵ مگابایت باشد");
      return;
    }
    
    setImageError(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageData(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleResetImage = () => {
    setImageData(null);
    setImageError(null);
  };

  const onSubmit = (data: StudentFormValues) => {
    // Merge form data with image data
    const formData = {
      ...data,
      image: imageData
    };
    
    try {
      onSave(formData);
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
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <motion.div variants={itemVariants} className="p-6 flex flex-col sm:flex-row gap-6">
            <div className="w-full sm:w-1/3 flex flex-col items-center gap-3">
              <StudentImageUpload 
                imageData={imageData}
                onChange={handleImageChange}
                onReset={handleResetImage}
                error={imageError}
                itemVariants={itemVariants}
              />
            </div>
            
            <div className="w-full sm:w-2/3 flex flex-col gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <User className="h-4 w-4 text-indigo-500" />
                      نام و نام خانوادگی
                    </FormLabel>
                    <FormControl>
                      <Input 
                        className="bg-slate-50 dark:bg-slate-800/70 focus-visible:ring-indigo-500" 
                        placeholder="نام و نام خانوادگی شاگرد" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-indigo-500" />
                      شماره تماس
                    </FormLabel>
                    <FormControl>
                      <Input 
                        dir="ltr" 
                        className="text-left bg-slate-50 dark:bg-slate-800/70 focus-visible:ring-indigo-500" 
                        placeholder="۰۹۱۲۳۴۵۶۷۸۹" 
                        value={toPersianNumbers(field.value)}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel className="flex items-center gap-2">
                        <Ruler className="h-4 w-4 text-indigo-500" />
                        قد (سانتی‌متر)
                      </FormLabel>
                      <FormControl>
                        <Input 
                          dir="ltr" 
                          className="text-left bg-slate-50 dark:bg-slate-800/70 focus-visible:ring-indigo-500" 
                          placeholder="۱۷۵" 
                          value={toPersianNumbers(field.value)}
                          onChange={(e) => {
                            const value = e.target.value.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel className="flex items-center gap-2">
                        <Weight className="h-4 w-4 text-indigo-500" />
                        وزن (کیلوگرم)
                      </FormLabel>
                      <FormControl>
                        <Input 
                          dir="ltr" 
                          className="text-left bg-slate-50 dark:bg-slate-800/70 focus-visible:ring-indigo-500" 
                          placeholder="۸۰" 
                          value={toPersianNumbers(field.value)}
                          onChange={(e) => {
                            const value = e.target.value.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="payment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Coins className="h-4 w-4 text-indigo-500" />
                      مبلغ برنامه (تومان)
                    </FormLabel>
                    <FormControl>
                      <Input 
                        dir="ltr" 
                        className="text-left bg-slate-50 dark:bg-slate-800/70 focus-visible:ring-indigo-500" 
                        placeholder="۵۰۰,۰۰۰" 
                        value={toPersianNumbers(field.value)}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                    <p className="text-xs text-muted-foreground mt-1">مبلغ دریافتی بابت صدور برنامه</p>
                  </FormItem>
                )}
              />
            </div>
          </motion.div>
          
          <FormActions isEdit={Boolean(student)} onCancel={onCancel} />
        </form>
      </Form>
    </motion.div>
  );
};
