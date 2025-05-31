
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
import { Sparkles, Star, Crown } from "lucide-react";
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
      {/* Enhanced gradient mesh */}
      <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-violet-500/20 via-purple-500/15 to-indigo-500/10 blur-3xl rounded-full animate-pulse" />
      <div className="absolute top-1/3 -left-48 w-80 h-80 bg-gradient-to-br from-cyan-500/15 via-blue-500/10 to-violet-500/5 blur-3xl rounded-full" />
      <div className="absolute -bottom-32 right-1/4 w-72 h-72 bg-gradient-to-tr from-emerald-500/15 via-teal-500/10 to-cyan-500/5 blur-3xl rounded-full" />
      
      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-20 right-20 w-4 h-4 bg-violet-400/30 rounded-full"
        animate={{
          y: [-10, 10, -10],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-40 left-1/4 w-3 h-3 bg-cyan-400/40 rounded-full"
        animate={{
          y: [10, -15, 10],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />
      
      {/* Animated sparkles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ 
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: 0,
            scale: 0.5
          }}
          animate={{
            opacity: [0.1, 0.6, 0.1],
            scale: [0.5, 1.2, 0.5],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: Math.random() * 6 + 4,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: "easeInOut"
          }}
        >
          {i % 4 === 0 ? (
            <Sparkles className={cn(
              "text-violet-400/40",
              i % 3 === 0 ? "w-4 h-4" : "w-3 h-3"
            )} />
          ) : i % 4 === 1 ? (
            <Star className={cn(
              "text-cyan-400/30",
              i % 3 === 0 ? "w-3 h-3" : "w-2 h-2"
            )} />
          ) : (
            <Crown className={cn(
              "text-emerald-400/35",
              i % 3 === 0 ? "w-4 h-4" : "w-3 h-3"
            )} />
          )}
        </motion.div>
      ))}
      
      {/* Dynamic grid overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-violet-500/5 to-transparent" 
           style={{
             backgroundImage: `
               linear-gradient(45deg, transparent 24%, rgba(139, 92, 246, 0.03) 25%, rgba(139, 92, 246, 0.03) 26%, transparent 27%, transparent 74%, rgba(139, 92, 246, 0.03) 75%, rgba(139, 92, 246, 0.03) 76%, transparent 77%),
               linear-gradient(-45deg, transparent 24%, rgba(14, 165, 233, 0.02) 25%, rgba(14, 165, 233, 0.02) 26%, transparent 27%, transparent 74%, rgba(14, 165, 233, 0.02) 75%, rgba(14, 165, 233, 0.02) 76%, transparent 77%)
             `,
             backgroundSize: '60px 60px'
           }} 
      />
    </div>
  );

  return (
    <PageContainer withBackground fullWidth fullHeight className="relative overflow-hidden">
      <BackgroundElements />
      
      <motion.div 
        className="relative z-10 w-full h-full flex flex-col space-y-6 sm:space-y-8 p-4 sm:p-6 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Enhanced Profile Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <ProfileHeader />
        </motion.div>

        {/* Main Content with enhanced animations */}
        <motion.div 
          className={
            deviceInfo.isMobile 
              ? "flex flex-col space-y-6" 
              : "grid lg:grid-cols-[340px_1fr] xl:grid-cols-[400px_1fr] gap-6 md:gap-8"
          }
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* Enhanced Sidebar */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <ProfileSidebar
              profile={profile}
              onImageChange={(image) => handleUpdate('image', image)} 
              activeSection={activeSection}
              onTabChange={setActiveSection}
            />
          </motion.div>

          {/* Enhanced Form */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
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
          </motion.div>
        </div>
      </motion.div>
    </PageContainer>
  );
};

export default TrainerProfile;
