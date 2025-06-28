
import { useState, useEffect } from "react";
import { TrainerProfile, defaultProfile } from "@/types/trainer";
import { useToast } from "@/hooks/use-toast";

export const useTrainerProfile = () => {
  const [profile, setProfile] = useState<TrainerProfile>(defaultProfile);
  const [errors, setErrors] = useState<Partial<Record<keyof TrainerProfile, string>>>({});
  const [validFields, setValidFields] = useState<Partial<Record<keyof TrainerProfile, boolean>>>({});
  const [activeSection, setActiveSection] = useState("personal");
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  // Load profile data from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('trainerProfile');
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        setProfile(parsedProfile);
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    }
  }, []);

  const validateField = (key: keyof TrainerProfile, value: string): boolean => {
    switch (key) {
      case "name":
        if (!value.trim()) {
          setErrors(prev => ({ ...prev, [key]: "نام مربی الزامی است" }));
          return false;
        }
        break;
      case "phone":
        if (!value.trim()) {
          setErrors(prev => ({ ...prev, [key]: "شماره تلفن الزامی است" }));
          return false;
        }
        if (!/^09\d{9}$/.test(value)) {
          setErrors(prev => ({ ...prev, [key]: "شماره تلفن معتبر نیست" }));
          return false;
        }
        break;
      case "gymName":
        if (!value.trim()) {
          setErrors(prev => ({ ...prev, [key]: "نام باشگاه الزامی است" }));
          return false;
        }
        break;
      case "gymAddress":
        if (!value.trim()) {
          setErrors(prev => ({ ...prev, [key]: "آدرس باشگاه الزامی است" }));
          return false;
        }
        break;
    }

    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[key];
      return newErrors;
    });
    return true;
  };

  const handleUpdate = (key: keyof TrainerProfile, value: string) => {
    setProfile(prev => ({ ...prev, [key]: value }));
    
    const isValid = validateField(key, value);
    setValidFields(prev => ({ ...prev, [key]: isValid }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // Validate all required fields
      const requiredFields: (keyof TrainerProfile)[] = ['name', 'phone', 'gymName', 'gymAddress'];
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!validateField(field, profile[field])) {
          isValid = false;
        }
      });

      if (!isValid) {
        toast({
          variant: "destructive",
          title: "خطا در اعتبارسنجی",
          description: "لطفاً تمام فیلدهای الزامی را پر کنید"
        });
        setIsSaving(false);
        return;
      }

      // Save to localStorage
      localStorage.setItem('trainerProfile', JSON.stringify(profile));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "موفقیت آمیز",
        description: "اطلاعات پروفایل با موفقیت ذخیره شد"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطایی در ذخیره اطلاعات رخ داد"
      });
    } finally {
      setIsSaving(false);
    }
  };

  return {
    profile,
    errors,
    setErrors,
    validFields,
    setValidFields,
    activeSection,
    setActiveSection,
    isSaving,
    handleUpdate,
    handleSave
  };
};
