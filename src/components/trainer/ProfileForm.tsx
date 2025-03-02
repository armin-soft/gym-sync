
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { TrainerProfile } from "@/types/trainer";
import { isValidEmail, isValidIranianMobile, isValidPassword, isValidPersianName } from "@/utils/validation";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FormTabs } from "./FormTabs";
import { GymInfoForm } from "./GymInfoForm";
import { PersonalInfoForm } from "./PersonalInfoForm";
import { SaveButton } from "./SaveButton";
import { SocialMediaForm } from "./SocialMediaForm";

interface ProfileFormProps {
  profile: TrainerProfile;
  onUpdate: (key: keyof TrainerProfile, value: string) => void;
  onSave: () => void;
  errors: Partial<Record<keyof TrainerProfile, string>>;
  setErrors: React.Dispatch<React.SetStateAction<Partial<Record<keyof TrainerProfile, string>>>>;
  validFields: Partial<Record<keyof TrainerProfile, boolean>>;
  setValidFields: React.Dispatch<React.SetStateAction<Partial<Record<keyof TrainerProfile, boolean>>>>;
  activeSection: string;
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
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
  setActiveSection 
}: ProfileFormProps) => {
  const { toast } = useToast();

  const validateField = (key: keyof TrainerProfile, value: string) => {
    let isValid = false;
    let error = '';

    switch (key) {
      case 'name':
        isValid = isValidPersianName(value);
        error = !value ? "نام و نام خانوادگی اجباری است" : 
                !isValid ? "لطفاً نام را به فارسی وارد کنید" : '';
        break;
      case 'bio':
        isValid = !!value;
        error = !isValid ? "بیوگرافی اجباری است" : '';
        break;
      case 'phone':
        isValid = isValidIranianMobile(value);
        error = !value ? "شماره موبایل اجباری است" :
                !isValid ? "شماره موبایل معتبر نیست" : '';
        break;
      case 'email':
        isValid = isValidEmail(value);
        error = !value ? "ایمیل اجباری است" :
                !isValid ? "ایمیل معتبر نیست" : '';
        break;
      case 'password':
        isValid = isValidPassword(value);
        error = !value ? "گذرواژه اجباری است" :
                !isValid ? "گذرواژه باید شامل حروف انگلیسی و اعداد باشد (حداقل ۸ کاراکتر)" : '';
        break;
      case 'gymName':
        isValid = !!value;
        error = !isValid ? "نام باشگاه اجباری است" : '';
        break;
      case 'gymDescription':
        isValid = !!value;
        error = !isValid ? "توضیحات باشگاه اجباری است" : '';
        break;
      case 'gymAddress':
        isValid = !!value;
        error = !isValid ? "آدرس باشگاه اجباری است" : '';
        break;
      case 'instagram':
        // اینستاگرام اختیاری است
        isValid = true;
        break;
      case 'website':
        // وب‌سایت اختیاری است
        isValid = true;
        break;
      default:
        isValid = true;
    }

    setValidFields((prev) => ({ ...prev, [key]: isValid }));
    setErrors((prev) => ({ ...prev, [key]: error }));
  };

  // Validate initial values
  useEffect(() => {
    Object.entries(profile).forEach(([key, value]) => {
      if (key !== 'image' && value) {
        validateField(key as keyof TrainerProfile, value);
      }
    });
  }, []);

  const handleInputChange = (key: keyof TrainerProfile, value: string) => {
    // Filter input for name field - only allow Persian characters
    if (key === 'name') {
      const persianOnly = value.replace(/[^[\u0600-\u06FF\s]]/g, '');
      onUpdate(key, persianOnly);
      validateField(key, persianOnly);
      return;
    }

    // Filter input for phone field - only allow numbers
    if (key === 'phone') {
      let numbersOnly = value.replace(/[^0-9۰-۹]/g, '');
      if (!numbersOnly.startsWith('09') && !numbersOnly.startsWith('۰۹')) {
        numbersOnly = '09' + numbersOnly.slice(2);
      }
      onUpdate(key, numbersOnly);
      validateField(key, numbersOnly);
      return;
    }

    onUpdate(key, value);
    validateField(key, value);
  };

  const handleSave = () => {
    let hasErrors = false;
    Object.entries(profile).forEach(([key, value]) => {
      if (key !== 'image') {
        validateField(key as keyof TrainerProfile, value);
        if (!value || errors[key as keyof TrainerProfile]) {
          hasErrors = true;
        }
      }
    });

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

  const renderTabContent = () => {
    switch (activeSection) {
      case 'personal':
        return (
          <PersonalInfoForm
            profile={profile}
            onChange={handleInputChange}
            errors={errors}
            validFields={validFields}
          />
        );
      case 'gym':
        return (
          <GymInfoForm
            profile={profile}
            onChange={handleInputChange}
            errors={errors}
            validFields={validFields}
          />
        );
      case 'social':
        return (
          <SocialMediaForm
            profile={profile}
            onChange={handleInputChange}
            errors={errors}
            validFields={validFields}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card className="backdrop-blur-xl bg-white/50 border-primary/10 shadow-xl">
      <div className="p-6 space-y-6">
        {/* Desktop Tabs */}
        <FormTabs
          activeSection={activeSection}
          onTabChange={setActiveSection}
        />

        <AnimatePresence mode="wait">
          {renderTabContent()}
        </AnimatePresence>

        <SaveButton onSave={handleSave} />
      </div>
    </Card>
  );
};
