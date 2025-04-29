
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Student } from "@/components/students/StudentTypes";
import { 
  UserRound, 
  Phone, 
  Ruler, 
  Weight, 
  Save, 
  X, 
  Camera, 
  Coins, 
  PlusCircle 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPayment } from "@/utils/studentUtils";

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string>(student?.image || "/placeholder.svg");
  const [isUploading, setIsUploading] = useState(false);

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

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "خطا",
          description: "حجم تصویر نباید بیشتر از ۲ مگابایت باشد",
          variant: "destructive",
        });
        return;
      }

      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreviewImage(result);
        form.setValue("image", result);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

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
            <div className="relative group">
              <div className="relative">
                <div className={cn(
                  "w-24 h-24 rounded-full overflow-hidden border-4",
                  form.formState.errors.image 
                    ? "border-red-500" 
                    : "border-white dark:border-slate-800"
                )}>
                  <img
                    src={previewImage}
                    alt="تصویر پروفایل"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {isUploading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <Button
                type="button"
                size="icon"
                variant="secondary"
                className="absolute bottom-0 right-0 h-8 w-8 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                onClick={handleImageClick}
              >
                <Camera className="h-4 w-4" />
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
              
              <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-lg scale-90 -z-10" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Field */}
            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <UserRound className="h-4 w-4 text-indigo-500" />
                      نام و نام خانوادگی
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-slate-50 dark:bg-slate-800/50 focus-visible:ring-indigo-400"
                        placeholder="نام و نام خانوادگی را وارد کنید"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
            
            {/* Phone Field */}
            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-indigo-500" />
                      شماره موبایل
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        dir="ltr"
                        className="text-left bg-slate-50 dark:bg-slate-800/50 focus-visible:ring-indigo-400"
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
            </motion.div>

            {/* Height Field */}
            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Ruler className="h-4 w-4 text-indigo-500" />
                      قد (سانتی متر)
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        dir="ltr"
                        className="text-left bg-slate-50 dark:bg-slate-800/50 focus-visible:ring-indigo-400"
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
            </motion.div>
            
            {/* Weight Field */}
            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Weight className="h-4 w-4 text-indigo-500" />
                      وزن (کیلوگرم)
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        dir="ltr"
                        className="text-left bg-slate-50 dark:bg-slate-800/50 focus-visible:ring-indigo-400"
                        placeholder="۷۵"
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
            </motion.div>

            {/* Payment Field */}
            <motion.div variants={itemVariants} className="md:col-span-2">
              <FormField
                control={form.control}
                name="payment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Coins className="h-4 w-4 text-indigo-500" />
                      <span>مبلغ (تومان)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        dir="ltr"
                        className="text-left bg-slate-50 dark:bg-slate-800/50 focus-visible:ring-indigo-400"
                        placeholder="۵۰۰,۰۰۰"
                        value={toPersianNumbers(formatPayment(field.value || ''))}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace(/\D/g, '');
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <p className="text-xs text-muted-foreground mt-1">مبلغ صدور برنامه‌ها به تومان</p>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
          </div>

          {/* Form Actions */}
          <motion.div variants={itemVariants} className="flex justify-end gap-4 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel} 
              className="gap-2"
            >
              <X className="h-4 w-4" />
              انصراف
            </Button>
            <Button 
              type="submit" 
              className="gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white"
            >
              <Save className="h-4 w-4" />
              {student ? "ذخیره تغییرات" : "افزودن شاگرد"}
            </Button>
          </motion.div>
        </form>
      </Form>
    </motion.div>
  );
};
