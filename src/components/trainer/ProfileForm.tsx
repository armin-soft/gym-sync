
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
import { Edit3, Save, Sparkles, CheckCircle2 } from "lucide-react";

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

  const getSectionTitle = () => {
    switch (activeSection) {
      case 'personal':
        return 'اطلاعات شخصی';
      case 'gym':
        return 'اطلاعات باشگاه';
      case 'social':
        return 'شبکه‌های اجتماعی';
      default:
        return 'ویرایش اطلاعات';
    }
  };

  const getSectionDescription = () => {
    switch (activeSection) {
      case 'personal':
        return 'اطلاعات شخصی خود را کامل کنید';
      case 'gym':
        return 'اطلاعات باشگاه خود را وارد کنید';
      case 'social':
        return 'حضور آنلاین خود را مدیریت کنید';
      default:
        return 'اطلاعات خود را به‌روزرسانی کنید';
    }
  };

  const getSectionIcon = () => {
    switch (activeSection) {
      case 'personal':
        return 'from-violet-500 to-purple-600';
      case 'gym':
        return 'from-blue-500 to-cyan-600';
      case 'social':
        return 'from-emerald-500 to-teal-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <motion.div 
      className="bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-slate-900 dark:via-gray-900 dark:to-zinc-900 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden h-fit"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-blue-500/5 pointer-events-none" />
      
      {/* Form Header */}
      <div className={`relative z-10 bg-gradient-to-r ${getSectionIcon()} p-6 text-white border-b border-white/20`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
              <Edit3 className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                {getSectionTitle()}
                <Sparkles className="h-5 w-5 text-yellow-300" />
              </h2>
              <p className="text-white/80 mt-1">{getSectionDescription()}</p>
            </div>
          </div>
          
          {/* Status Badge */}
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
            <CheckCircle2 className="h-4 w-4 text-green-300" />
            <span className="text-sm font-medium">فعال</span>
          </div>
        </div>
        
        {/* Progress Indicator */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm text-white/70 mb-2">
            <span>پیشرفت تکمیل پروفایل</span>
            <span>۸۵%</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "85%" }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="relative z-10 p-6 md:p-8">
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
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <SaveButton onSave={handleSave} isLoading={isSaving} />
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-4 w-32 h-32 bg-gradient-to-br from-violet-400/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-4 w-24 h-24 bg-gradient-to-br from-blue-400/10 to-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
    </motion.div>
  );
};
