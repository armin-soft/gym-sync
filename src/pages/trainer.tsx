
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { TrainerProfile } from "@/types/trainer";
import { defaultProfile } from "@/types/trainer";
import { ProfileForm } from "@/components/trainer/ProfileForm";
import { PageContainer } from "@/components/ui/page-container";
import { ProfileHeader } from "@/components/trainer/ProfileHeader";
import { ProfileSidebar } from "@/components/trainer/ProfileSidebar";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const TrainerProfile = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState<TrainerProfile>(defaultProfile);
  const [errors, setErrors] = useState<Partial<Record<keyof TrainerProfile, string>>>({});
  const [validFields, setValidFields] = useState<Partial<Record<keyof TrainerProfile, boolean>>>({});
  const [activeSection, setActiveSection] = useState<string>("personal");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const deviceInfo = useDeviceInfo();

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
  }, []);

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

  const backgroundPattern = `data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%236366f1" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E`;

  return (
    <PageContainer withBackground fullWidth fullHeight className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 dark:from-slate-900 dark:via-gray-900/30 dark:to-zinc-900/40">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-30" 
        style={{ backgroundImage: `url("${backgroundPattern}")` }}
      />
      
      <motion.div 
        className="relative z-10 container mx-auto p-4 md:p-6 lg:p-8 max-w-7xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <ProfileHeader />

        {/* Main Content */}
        <div className={cn(
          "mt-8 grid gap-6",
          deviceInfo.isMobile 
            ? "grid-cols-1" 
            : "grid-cols-1 lg:grid-cols-[380px_1fr] xl:grid-cols-[420px_1fr]"
        )}>
          {/* Sidebar */}
          <ProfileSidebar
            profile={{
              image: profile.image,
              name: profile.name,
              email: profile.email
            }}
            onImageChange={(image) => handleUpdate('image', image)} 
            activeSection={activeSection}
            onTabChange={setActiveSection}
          />

          {/* Form */}
          <ProfileForm
            profile={profile}
            onUpdate={handleUpdate}
            onSave={handleSave}
            errors={errors}
            setErrors={setErrors}
            validFields={validFields}
            setValidFields={setValidFields}
            activeSection={activeSection}
            isSaving={isSaving}
          />
        </div>
      </motion.div>
    </PageContainer>
  );
};

export default TrainerProfile;
