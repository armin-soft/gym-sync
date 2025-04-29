
import { Camera } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import type { TrainerProfile } from "@/types/trainer";
import { defaultProfile } from "@/types/trainer";
import { ProfileImage } from "@/components/trainer/ProfileImage";
import { ProfileForm } from "@/components/trainer/ProfileForm";
import { PageContainer } from "@/components/ui/page-container";
import { useDeviceInfo } from "@/hooks/use-mobile";

const TrainerProfile = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState<TrainerProfile>(defaultProfile);
  const [errors, setErrors] = useState<Partial<Record<keyof TrainerProfile, string>>>({});
  const [validFields, setValidFields] = useState<Partial<Record<keyof TrainerProfile, boolean>>>({});
  const [activeSection, setActiveSection] = useState<string>("personal");
  const deviceInfo = useDeviceInfo();

  // Load saved profile from localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem('trainerProfile');
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
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

  const getContainerPadding = () => {
    if (deviceInfo.isMobile) return "py-4 px-3";
    if (deviceInfo.isTablet) return "py-6 px-4";
    if (deviceInfo.isSmallLaptop) return "py-6 px-6";
    return "py-8 px-4 md:px-6 lg:px-8";
  };

  const getGridLayout = () => {
    if (deviceInfo.isMobile) return "flex flex-col gap-6";
    if (deviceInfo.isTablet) return "flex flex-col gap-8";
    return "grid lg:grid-cols-[300px_1fr] gap-8";
  };

  return (
    <PageContainer withBackground fullWidth fullHeight className="w-full overflow-auto">
      <motion.div 
        className={`w-full h-full flex flex-col mx-auto ${getContainerPadding()} space-y-6 sm:space-y-8`}
        variants={stagger}
        initial="initial"
        animate="animate"
      >
        <motion.div 
          className="flex flex-col space-y-4 sm:space-y-6"
          variants={fadeIn}
        >
          <motion.div 
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
              <Camera className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                پروفایل مربی
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                اطلاعات پروفایل خود را مدیریت کنید
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className={getGridLayout()}
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

            {/* Tabs for mobile view */}
            <div className="flex lg:hidden overflow-x-auto pb-2 gap-2 no-scrollbar">
              {["personal", "gym", "social"].map((section) => (
                <motion.button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap ${
                    activeSection === section
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted"
                  }`}
                  animate={activeSection === section ? 
                    { opacity: 1, y: 0, scale: 1.05 } : 
                    { opacity: 0.7, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {section === "personal" ? "اطلاعات شخصی" : 
                   section === "gym" ? "اطلاعات باشگاه" : 
                   "شبکه‌های اجتماعی"}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeIn} className="flex-1">
            <ProfileForm
              profile={profile}
              onUpdate={handleUpdate}
              onSave={handleSave}
              errors={errors}
              setErrors={setErrors}
              validFields={validFields}
              setValidFields={setValidFields}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </PageContainer>
  );
};

export default TrainerProfile;
