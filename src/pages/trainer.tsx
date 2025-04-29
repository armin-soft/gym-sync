
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { TrainerProfile } from "@/types/trainer";
import { defaultProfile } from "@/types/trainer";
import { ProfileForm } from "@/components/trainer/ProfileForm";
import { PageContainer } from "@/components/ui/page-container";
import { ProfileHeader } from "@/components/trainer/ProfileHeader";
import { ProfileSidebar } from "@/components/trainer/ProfileSidebar";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const TrainerProfile = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState<TrainerProfile>(defaultProfile);
  const [errors, setErrors] = useState<Partial<Record<keyof TrainerProfile, string>>>({});
  const [validFields, setValidFields] = useState<Partial<Record<keyof TrainerProfile, boolean>>>({});
  const [activeSection, setActiveSection] = useState<string>("personal");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const deviceInfo = useDeviceInfo();

  // Load saved profile from localStorage
  useEffect(() => {
    const loadProfile = async () => {
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
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 600);
      }
    };
    
    loadProfile();
  }, []);

  const handleUpdate = (key: keyof TrainerProfile, value: string) => {
    setProfile(prev => ({ ...prev, [key]: value }));
    // Clear error when user starts typing
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: '' }));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      localStorage.setItem('trainerProfile', JSON.stringify(profile));
      // Force update of any components that depend on the gym name
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

  // Decorative elements for the background
  const BackgroundElements = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient blobs */}
      <div className="absolute -top-40 -right-20 w-80 h-80 bg-gradient-to-br from-indigo-500/10 to-purple-500/5 blur-3xl rounded-full" />
      <div className="absolute top-1/4 -left-40 w-80 h-80 bg-gradient-to-br from-sky-500/10 to-blue-500/5 blur-3xl rounded-full" />
      <div className="absolute -bottom-20 right-20 w-60 h-60 bg-gradient-to-tr from-pink-500/10 to-rose-500/5 blur-3xl rounded-full" />
      
      {/* Animated sparkles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ 
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: 0.1,
            scale: 0.5
          }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [0.6, 1, 0.6]
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
        >
          <Sparkles className={cn(
            "text-indigo-400/30",
            i % 3 === 0 ? "w-4 h-4" : i % 3 === 1 ? "w-5 h-5" : "w-3 h-3"
          )} />
        </motion.div>
      ))}
    </div>
  );

  return (
    <PageContainer withBackground fullWidth fullHeight className="w-full overflow-auto">
      <BackgroundElements />
      
      <AnimatePresence>
        {isLoading ? (
          <motion.div 
            initial={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm z-50"
          >
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.05, 1]
              }}
              transition={{
                rotate: { repeat: Infinity, duration: 1, ease: "linear" },
                scale: { repeat: Infinity, duration: 1.5 }
              }}
              className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
            />
          </motion.div>
        ) : (
          <motion.div 
            className="w-full h-full flex flex-col space-y-6 sm:space-y-8 p-4 sm:p-6 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Profile Header */}
            <ProfileHeader />

            {/* Main Content */}
            <div className={
              deviceInfo.isMobile 
                ? "flex flex-col space-y-6" 
                : "grid lg:grid-cols-[320px_1fr] xl:grid-cols-[380px_1fr] gap-6 md:gap-8"
            }>
              {/* Sidebar */}
              <ProfileSidebar
                profile={profile}
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
        )}
      </AnimatePresence>
    </PageContainer>
  );
};

export default TrainerProfile;
