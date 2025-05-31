
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { TrainerProfile } from "@/types/trainer";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { SaveButton } from "./SaveButton";
import { FormProvider } from "./form/FormContext";
import { FormContent } from "./form/FormContent";
import { validateField, validateAllFields } from "./form/validation";

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

  // Validate initial values
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
    
    // Clear error when user starts typing
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

  const getCardPadding = () => {
    if (deviceInfo.isMobile) return "px-4 py-5";
    if (deviceInfo.isTablet) return "px-5 py-6";
    return "px-6 py-7";
  };

  return (
    <Card className={cn(
      "backdrop-blur-xl bg-white/50 dark:bg-gray-900/30 border-primary/10 shadow-xl h-full",
      "transition-all duration-300 hover:shadow-2xl hover:bg-white/60 dark:hover:bg-gray-900/40"
    )}>
      <div className={cn(
        getCardPadding(),
        "space-y-6 h-full flex flex-col"
      )}>
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

        <SaveButton onSave={handleSave} isLoading={isSaving} />
      </div>
    </Card>
  );
};
