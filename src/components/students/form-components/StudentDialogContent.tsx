
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from "@/components/ui/form";
import { ImageIcon, User2 } from "lucide-react";
import { studentFormSchema } from "@/lib/validations/student";
import { FormActions } from "./FormActions";
import { FormContainer, dialogVariants, itemVariants } from "./FormContainer";
import { StudentDialogHeader } from "./StudentDialogHeader";
import { Student } from "@/components/students/StudentTypes";

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
  const { theme } = useTheme();
  const { toast } = useToast();
  const [imageData, setImageData] = useState<string | null>(student?.image || null);
  const [imageError, setImageError] = useState<string | null>(null);
  
  const form = useForm({
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

  const onSubmit = (data: any) => {
    // Merge form data with image data
    const formData = {
      ...data,
      image: imageData
    };
    
    onSave(formData);
  };

  return (
    <motion.div
      className="relative flex flex-col rounded-md shadow-lg overflow-hidden w-full max-w-2xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={dialogVariants}
    >
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-indigo-500 to-violet-600 -z-10" />
      
      <StudentDialogHeader isEdit={Boolean(student)} itemVariants={itemVariants} />
      
      <Form {...form}>
        <FormContainer onSubmit={form.handleSubmit(onSubmit)}>
          <motion.div variants={itemVariants} className="p-6 flex flex-col sm:flex-row gap-6">
            <div className="w-full sm:w-1/3 flex flex-col items-center gap-3">
              <Avatar className="w-32 h-32 relative">
                {imageData ? (
                  <AvatarImage src={imageData} alt="Student Image" className="object-cover" />
                ) : (
                  <AvatarFallback>
                    <User2 className="h-12 w-12 text-muted-foreground" />
                  </AvatarFallback>
                )}
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute bottom-0 right-0 shadow-md"
                  onClick={() => document.getElementById("image-upload")?.click()}
                  type="button"
                >
                  <ImageIcon className="h-4 w-4" />
                  <Input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </Button>
              </Avatar>
              
              {imageError && <p className="text-red-500 text-sm">{imageError}</p>}
              
              <Button variant="link" onClick={handleResetImage} className="text-xs" type="button">
                حذف تصویر
              </Button>
            </div>
            
            <div className="w-full sm:w-2/3 flex flex-col gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نام و نام خانوادگی</FormLabel>
                    <FormControl>
                      <Input placeholder="نام و نام خانوادگی" {...field} />
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
                    <FormLabel>شماره تماس</FormLabel>
                    <FormControl>
                      <Input placeholder="شماره تماس" {...field} />
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
                      <FormLabel>قد (سانتی‌متر)</FormLabel>
                      <FormControl>
                        <Input placeholder="قد" {...field} />
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
                      <FormLabel>وزن (کیلوگرم)</FormLabel>
                      <FormControl>
                        <Input placeholder="وزن" {...field} />
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
                    <FormLabel>مبلغ برنامه</FormLabel>
                    <FormControl>
                      <Input placeholder="مبلغ برنامه" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </motion.div>
          
          <FormActions isEdit={Boolean(student)} onCancel={onCancel} />
        </FormContainer>
      </Form>
    </motion.div>
  );
};
