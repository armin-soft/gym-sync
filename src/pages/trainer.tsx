
import { Camera } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import type { TrainerProfile } from "@/types/trainer";
import { defaultProfile } from "@/types/trainer";
import { ProfileImage } from "@/components/trainer/ProfileImage";
import { ProfileForm } from "@/components/trainer/ProfileForm";

const TrainerProfile = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState<TrainerProfile>(defaultProfile);
  const [errors, setErrors] = useState<Partial<Record<keyof TrainerProfile, string>>>({});
  const [validFields, setValidFields] = useState<Partial<Record<keyof TrainerProfile, boolean>>>({});

  // Load saved profile from localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem('trainerProfile');
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        // Handle migration from old profile structure to new one
        if (!parsed.gymName) {
          parsed.gymName = "";
          parsed.gymDescription = "مرکز تخصصی آمادگی جسمانی و بدنسازی";
          parsed.gymAddress = "تهران، خیابان ولیعصر، پلاک ۱۲۸";
        }
        setProfile(parsed);
      } catch (error) {
        console.error('Error loading profile from localStorage:', error);
        toast({
          variant: "destructive",
          title: "خطا در بارگذاری اطلاعات",
          description: "مشکلی در بارگذاری اطلاعات پیش آمده است"
        });
      }
    }
  }, []);

  const handleUpdate = (key: keyof TrainerProfile, value: string) => {
    setProfile(prev => ({ ...prev, [key]: value }));
    // Clear error when user starts typing
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: '' }));
    }
  };

  const handleSave = () => {
    try {
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
    }
  };

  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-sky-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-slate-200 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-grid-slate-800/50" />
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-sky-500/5" />
      
      <motion.div 
        className="container mx-auto py-8 relative z-10 space-y-8 px-4"
        variants={stagger}
        initial="initial"
        animate="animate"
      >
        <motion.div 
          className="flex flex-col space-y-6"
          variants={fadeIn}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
              <Camera className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                پروفایل مربی
              </h2>
              <p className="text-muted-foreground">
                اطلاعات پروفایل خود را مدیریت کنید
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="grid lg:grid-cols-[300px_1fr] gap-6"
          variants={stagger}
        >
          <motion.div 
            className="space-y-6"
            variants={fadeIn}
          >
            <ProfileImage 
              image={profile.image}
              onImageChange={(image) => handleUpdate('image', image)}
            />
          </motion.div>

          <motion.div variants={fadeIn}>
            <ProfileForm
              profile={profile}
              onUpdate={handleUpdate}
              onSave={handleSave}
              errors={errors}
              setErrors={setErrors}
              validFields={validFields}
              setValidFields={setValidFields}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TrainerProfile;
