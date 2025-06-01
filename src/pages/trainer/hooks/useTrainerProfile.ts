
import { useState, useEffect } from "react";
import { TrainerProfile, defaultProfile } from "@/types/trainer";
import { useToast } from "@/hooks/use-toast";

export const useTrainerProfile = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState<TrainerProfile>(defaultProfile);
  const [errors, setErrors] = useState<Partial<Record<keyof TrainerProfile, string>>>({});
  const [validFields, setValidFields] = useState<Partial<Record<keyof TrainerProfile, boolean>>>({});
  const [activeSection, setActiveSection] = useState<string>("personal");
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Load saved profile from localStorage
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem('trainerProfile');
      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        setProfile(parsed);
      }
    } catch (error) {
      console.error('Error loading profile from localStorage:', error);
      toast({
        variant: "destructive",
        title: "خطا در بارگذاری اطلاعات",
        description: "مشکلی در بارگذاری اطلاعات پیش آمده است"
      });
    }
  }, [toast]);

  const handleUpdate = (key: keyof TrainerProfile, value: string) => {
    setProfile(prev => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: '' }));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      localStorage.setItem('trainerProfile', JSON.stringify(profile));
      window.dispatchEvent(new Event('storage'));
      
      toast({
        title: "ذخیره موفق",
        description: "اطلاعات پروفایل با موفقیت ذخیره شد"
      });
    } catch (error) {
      console.error('Error saving profile to localStorage:', error);
      toast({
        variant: "destructive",
        title: "خطا در ذخیره اطلاعات",
        description: "مشکلی در ذخیره اطلاعات پیش آمده است"
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
