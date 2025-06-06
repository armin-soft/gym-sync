
import { useState, useEffect } from "react";
import { TrainerProfile, defaultProfile } from "@/types/trainer";
import { useToast } from "@/hooks/use-toast";

export const useTrainerProfileData = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState<TrainerProfile>(defaultProfile);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // بارگذاری اطلاعات ذخیره شده
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem('trainerProfile');
      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        setProfile(parsed);
      }
    } catch (error) {
      console.error('خطا در بارگذاری اطلاعات پروفایل:', error);
      toast({
        variant: "destructive",
        title: "خطا در بارگذاری",
        description: "مشکلی در بارگذاری اطلاعات پیش آمده است"
      });
    }
  }, [toast]);

  const updateProfile = (key: keyof TrainerProfile, value: string) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  const saveProfile = async () => {
    setIsLoading(true);
    
    try {
      // شبیه‌سازی تاخیر شبکه
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      localStorage.setItem('trainerProfile', JSON.stringify(profile));
      window.dispatchEvent(new Event('storage'));
      
      toast({
        title: "ذخیره موفق",
        description: "اطلاعات پروفایل با موفقیت ذخیره شد"
      });
    } catch (error) {
      console.error('خطا در ذخیره اطلاعات:', error);
      toast({
        variant: "destructive",
        title: "خطا در ذخیره",
        description: "مشکلی در ذخیره اطلاعات پیش آمده است"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    profile,
    updateProfile,
    saveProfile,
    isLoading
  };
};
