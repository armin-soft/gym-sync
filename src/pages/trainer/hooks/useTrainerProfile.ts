import { useState, useEffect } from "react";
import { supabase } from '@/integrations/supabase/client';
import { TrainerProfile, defaultProfile } from "@/types/trainer";
import { useToast } from "@/hooks/use-toast";

export const useTrainerProfile = () => {
  const [profile, setProfile] = useState<TrainerProfile>(defaultProfile);
  const [errors, setErrors] = useState<Partial<Record<keyof TrainerProfile, string>>>({});
  const [validFields, setValidFields] = useState<Partial<Record<keyof TrainerProfile, boolean>>>({});
  const [activeSection, setActiveSection] = useState("personal");
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Load profile data from Supabase on mount
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('trainer_profile')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
          console.error('Error loading trainer profile:', error);
          toast({
            variant: "destructive",
            title: "خطا در بارگیری پروفایل",
            description: error.message
          });
        } else if (data) {
          setProfile(data);
          console.log('Trainer profile loaded from Supabase:', data);
        } else {
          // No profile found, keep default
          console.log('No trainer profile found, using defaults');
        }
      } catch (error) {
        console.error('Unexpected error loading profile:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [toast]);

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
        if (!validateField(field, profile[field] || '')) {
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

      // Check if profile exists
      const { data: existingProfile } = await supabase
        .from('trainer_profile')
        .select('id')
        .limit(1)
        .single();

      if (existingProfile) {
        // Update existing profile
        const { error } = await supabase
          .from('trainer_profile')
          .update(profile)
          .eq('id', existingProfile.id);

        if (error) throw error;
      } else {
        // Create new profile
        const { error } = await supabase
          .from('trainer_profile')
          .insert([profile]);

        if (error) throw error;
      }
      
      // Also save to localStorage for backwards compatibility
      localStorage.setItem('trainerProfile', JSON.stringify(profile));
      
      toast({
        title: "موفقیت آمیز",
        description: "اطلاعات پروفایل با موفقیت ذخیره شد"
      });
    } catch (error: any) {
      console.error('Error saving trainer profile:', error);
      toast({
        variant: "destructive",
        title: "خطا",
        description: error.message || "خطایی در ذخیره اطلاعات رخ داد"
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
    loading,
    handleUpdate,
    handleSave
  };
};
