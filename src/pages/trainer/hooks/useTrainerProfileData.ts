
import { useState, useEffect } from "react";
import { TrainerProfile, defaultProfile } from "@/types/trainer";
import { useToast } from "@/hooks/use-toast";

export const useTrainerProfileData = () => {
  const [profile, setProfile] = useState<TrainerProfile>(defaultProfile);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const saved = localStorage.getItem('trainerProfile');
        if (saved) {
          setProfile(JSON.parse(saved));
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        toast({
          variant: "destructive",
          title: "خطا در بارگذاری",
          description: "مشکلی در بارگذاری اطلاعات پیش آمد"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [toast]);

  const updateProfile = (key: keyof TrainerProfile, value: string) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  const saveProfile = async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem('trainerProfile', JSON.stringify(profile));
      
      toast({
        title: "ذخیره موفق",
        description: "اطلاعات پروفایل با موفقیت ذخیره شد"
      });
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        variant: "destructive",
        title: "خطا در ذخیره",
        description: "مشکلی در ذخیره اطلاعات پیش آمد"
      });
    } finally {
      setIsSaving(false);
    }
  };

  return {
    profile,
    isLoading,
    isSaving,
    updateProfile,
    saveProfile
  };
};
