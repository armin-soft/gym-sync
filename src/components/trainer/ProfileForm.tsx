
import { useToast } from "@/hooks/use-toast";
import { TrainerProfile } from "@/types/trainer";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { SaveButton } from "./SaveButton";
import { FormProvider } from "./form/FormContext";
import { FormContent } from "./form/FormContent";
import { validateField, validateAllFields } from "./form/validation";
import { motion } from "framer-motion";

interface ProfileFormProps {
  profile: TrainerProfile;
  onUpdate: (key: keyof TrainerProfile, value: string) => void;
  onSave: () => void;
  errors: Partial<Record<keyof TrainerProfile, string>>;
  setErrors: React.Dispatch<React.SetStateAction<Partial<Record<keyof TrainerProfile, string>>>>;
  validFields: Partial<Record<keyof TrainerProfile, boolean>>;
  setValidFields: React.Dispatch<React.SetStateAction<Partial<Record<keyof TrainerProfile, boolean>>>>;
  activeSection: string;
  isSaving: boolean;
}

export const ProfileForm = ({
  profile,
  onUpdate,
  onSave,
  errors,
  setErrors,
  validFields,
  setValidFields,
  activeSection,
  isSaving
}: ProfileFormProps) => {
  const { toast } = useToast();
  const deviceInfo = useDeviceInfo();

  useEffect(() => {
    Object.entries(profile).forEach(([key, value]) => {
      if (key !== 'image' && value) {
        validateField(key as keyof TrainerProfile, value, setValidFields, setErrors);
      }
    });
  }, []);

  const handleInputChange = (key: keyof TrainerProfile, value: string) => {
    onUpdate(key, value);
    validateField(key, value, setValidFields, setErrors);
    
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: '' }));
    }
  };

  const handleSave = () => {
    const hasErrors = validateAllFields(profile, setValidFields, setErrors);

    if (hasErrors) {
      toast({
        variant: "destructive",
        title: "خطا در اطلاعات",
        description: "لطفاً خطاهای فرم را برطرف کنید"
      });
      return;
    }
    
    onSave();
  };

  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden h-fit"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Form Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
        <h2 className="text-2xl font-bold">ویرایش اطلاعات</h2>
        <p className="text-indigo-100 mt-1">اطلاعات خود را کامل کرده و به‌روزرسانی کنید</p>
      </div>

      {/* Form Content */}
      <div className="p-6 md:p-8">
        <FormProvider
          profile={profile}
          onUpdate={handleInputChange}
          errors={errors}
          setErrors={setErrors}
          validFields={validFields}
          setValidFields={setValidFields}
          activeSection={activeSection}
          isSaving={isSaving}
        >
          <FormContent />
        </FormProvider>

        {/* Save Button */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <SaveButton onSave={handleSave} isLoading={isSaving} />
        </div>
      </div>
    </motion.div>
  );
};
