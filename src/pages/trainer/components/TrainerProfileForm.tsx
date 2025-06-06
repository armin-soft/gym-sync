
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { PersonalInfoForm } from "./forms/PersonalInfoForm";
import { GymInfoForm } from "./forms/GymInfoForm";
import { SocialMediaForm } from "./forms/SocialMediaForm";
import { SaveButton } from "./forms/SaveButton";
import { TrainerProfile } from "@/types/trainer";
import { Edit3, Sparkles, CheckCircle2, TrendingUp } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface TrainerProfileFormProps {
  profile: TrainerProfile;
  updateProfile: (key: keyof TrainerProfile, value: string) => void;
  saveProfile: () => Promise<void>;
  isLoading: boolean;
  activeSection: string;
}

const getSectionConfig = (activeSection: string) => {
  const configs = {
    personal: {
      title: 'اطلاعات شخصی',
      description: 'مدیریت اطلاعات هویتی و شخصی',
      gradient: 'from-indigo-500 to-purple-600',
      icon: Edit3
    },
    gym: {
      title: 'اطلاعات باشگاه',
      description: 'مشخصات و جزئیات باشگاه',
      gradient: 'from-blue-500 to-cyan-600',
      icon: Edit3
    },
    social: {
      title: 'شبکه‌های اجتماعی',
      description: 'مدیریت حضور آنلاین',
      gradient: 'from-purple-500 to-pink-600',
      icon: Edit3
    }
  };
  
  return configs[activeSection as keyof typeof configs] || configs.personal;
};

const calculateCompletionPercentage = (profile: TrainerProfile) => {
  const requiredFields: (keyof TrainerProfile)[] = ['name', 'phone', 'gymName', 'gymAddress'];
  const optionalFields: (keyof TrainerProfile)[] = ['fullName', 'bio', 'gymDescription', 'instagram', 'website'];
  
  let completedRequired = 0;
  let completedOptional = 0;
  
  requiredFields.forEach(field => {
    if (profile[field] && profile[field].trim()) {
      completedRequired++;
    }
  });
  
  optionalFields.forEach(field => {
    if (profile[field] && profile[field].trim()) {
      completedOptional++;
    }
  });
  
  const hasProfileImage = profile.image && profile.image !== "/Assets/Image/Place-Holder.svg";
  
  const requiredPercentage = (completedRequired / requiredFields.length) * 70;
  const optionalPercentage = (completedOptional / optionalFields.length) * 30;
  const imageBonus = hasProfileImage ? 10 : 0;
  
  return Math.min(100, Math.round(requiredPercentage + optionalPercentage + imageBonus));
};

export const TrainerProfileForm: React.FC<TrainerProfileFormProps> = ({
  profile,
  updateProfile,
  saveProfile,
  isLoading,
  activeSection
}) => {
  const [errors, setErrors] = useState<Partial<Record<keyof TrainerProfile, string>>>({});
  
  const sectionConfig = getSectionConfig(activeSection);
  const completionPercentage = calculateCompletionPercentage(profile);
  const Icon = sectionConfig.icon;

  const renderFormContent = () => {
    const variants = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 }
    };

    switch (activeSection) {
      case 'personal':
        return (
          <motion.div 
            key="personal"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
          >
            <PersonalInfoForm
              profile={profile}
              updateProfile={updateProfile}
              errors={errors}
              setErrors={setErrors}
            />
          </motion.div>
        );
      case 'gym':
        return (
          <motion.div 
            key="gym"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
          >
            <GymInfoForm
              profile={profile}
              updateProfile={updateProfile}
              errors={errors}
              setErrors={setErrors}
            />
          </motion.div>
        );
      case 'social':
        return (
          <motion.div 
            key="social"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
          >
            <SocialMediaForm
              profile={profile}
              updateProfile={updateProfile}
              errors={errors}
              setErrors={setErrors}
            />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* هدر فرم */}
      <Card className="border-0 bg-gradient-to-br from-white via-gray-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 shadow-2xl backdrop-blur-xl overflow-hidden">
        <div className={`relative bg-gradient-to-r ${sectionConfig.gradient} p-8 text-white`}>
          {/* المان‌های تزئینی پس‌زمینه */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10" />
          <div className="absolute top-4 left-4 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
          <div className="absolute bottom-4 right-4 w-24 h-24 bg-black/5 rounded-full blur-xl" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-xl bg-white/20 backdrop-blur-sm shadow-lg">
                  <Icon className="h-7 w-7" />
                </div>
                <div>
                  <h2 className="text-3xl font-black flex items-center gap-3">
                    {sectionConfig.title}
                    <Sparkles className="h-6 w-6 text-yellow-300" />
                  </h2>
                  <p className="text-white/80 mt-2 text-lg">{sectionConfig.description}</p>
                </div>
              </div>
              
              {/* نشان وضعیت */}
              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
                <CheckCircle2 className="h-5 w-5 text-green-300" />
                <span className="font-bold">فعال</span>
              </div>
            </div>
            
            {/* نوار پیشرفت */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-white/90">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  <span className="font-bold">پیشرفت تکمیل پروفایل</span>
                </div>
                <span className="font-black text-lg">{toPersianNumbers(completionPercentage.toString())}%</span>
              </div>
              <div className="h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div 
                  className="h-full bg-gradient-to-r from-yellow-300 to-green-400 rounded-full shadow-lg"
                  initial={{ width: 0 }}
                  animate={{ width: `${completionPercentage}%` }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* محتوای فرم */}
      <Card className="border-0 bg-gradient-to-br from-white via-gray-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 shadow-2xl backdrop-blur-xl overflow-hidden">
        <div className="p-8">
          <AnimatePresence mode="wait">
            {renderFormContent()}
          </AnimatePresence>
        </div>
      </Card>

      {/* دکمه ذخیره */}
      <Card className="border-0 bg-gradient-to-br from-white via-gray-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 shadow-2xl backdrop-blur-xl overflow-hidden">
        <div className="p-8">
          <SaveButton onSave={saveProfile} isLoading={isLoading} />
        </div>
      </Card>
    </motion.div>
  );
};
