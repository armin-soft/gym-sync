
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Loader2, Save, X } from "lucide-react";
import { Student } from "./StudentTypes";
import { PersonalInfoSection } from "./form-components/PersonalInfoSection";
import { MeasurementsSection } from "./form-components/MeasurementsSection";
import { GenderField } from "./form-components/GenderField";
import { PaymentField } from "./form-components/PaymentField";
import { ProfileImageUpload } from "./form-components/ProfileImageUpload";

interface StudentFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student?: Student | null;
  isEditing?: boolean;
  onSave: (student: Student) => void;
}

const StudentFormDialog: React.FC<StudentFormDialogProps> = ({
  open,
  onOpenChange,
  student,
  isEditing = false,
  onSave
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string>("");

  const form = useForm<Student>({
    defaultValues: {
      id: 0,
      name: "",
      phone: "",
      birthDate: "",
      address: "",
      gender: "male",
      height: 0,
      weight: 0,
      payment: 0,
      image: "",
      exercises: [],
      meals: [],
      supplements: [],
      progress: 0
    }
  });

  useEffect(() => {
    if (student && isEditing) {
      form.reset(student);
      setProfileImage(student.image || "");
    } else {
      form.reset({
        id: 0,
        name: "",
        phone: "",
        birthDate: "",
        address: "",
        gender: "male",
        height: 0,
        weight: 0,
        payment: 0,
        image: "",
        exercises: [],
        meals: [],
        supplements: [],
        progress: 0
      });
      setProfileImage("");
    }
  }, [student, isEditing, form]);

  const handleImageChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfileImage(result);
      };
      reader.readAsDataURL(file);
    } else {
      setProfileImage("");
    }
  };

  const onSubmit = async (data: Student) => {
    setIsLoading(true);
    try {
      const studentData = {
        ...data,
        image: profileImage,
        id: isEditing ? student?.id || 0 : Date.now()
      };
      
      await new Promise(resolve => setTimeout(resolve, 500));
      onSave(studentData);
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving student:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[90vh] p-0 border-emerald-200 dark:border-emerald-800">
        <div className="flex flex-col h-full">
          {/* Header */}
          <DialogHeader className="px-6 py-4 border-b border-emerald-100 dark:border-emerald-800 bg-gradient-to-r from-emerald-50 to-sky-50 dark:from-emerald-900/20 dark:to-sky-900/20">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-bold text-emerald-700 dark:text-emerald-300">
                {isEditing ? "ویرایش شاگرد" : "افزودن شاگرد جدید"}
              </DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
                className="hover:bg-emerald-100 dark:hover:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          {/* Content */}
          <ScrollArea className="flex-1 p-6">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <ProfileImageUpload
                currentImage={profileImage}
                onImageChange={handleImageChange}
                studentName={form.watch("name")}
              />

              <Separator className="bg-emerald-100 dark:bg-emerald-800" />

              <PersonalInfoSection form={form} />

              <Separator className="bg-emerald-100 dark:bg-emerald-800" />

              <GenderField form={form} />

              <Separator className="bg-emerald-100 dark:bg-emerald-800" />

              <MeasurementsSection form={form} />

              <Separator className="bg-emerald-100 dark:bg-emerald-800" />

              <PaymentField form={form} />
            </form>
          </ScrollArea>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-emerald-100 dark:border-emerald-800 bg-gradient-to-r from-emerald-50 to-sky-50 dark:from-emerald-900/20 dark:to-sky-900/20">
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-300 dark:hover:bg-emerald-900/20"
              >
                لغو
              </Button>
              <Button
                onClick={form.handleSubmit(onSubmit)}
                disabled={isLoading}
                className="bg-gradient-to-r from-emerald-600 to-sky-600 hover:from-emerald-700 hover:to-sky-700 text-white shadow-lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    در حال ذخیره...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    {isEditing ? "ویرایش" : "ذخیره"}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudentFormDialog;
