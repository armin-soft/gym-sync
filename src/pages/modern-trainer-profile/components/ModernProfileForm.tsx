
import React from "react";
import { motion } from "framer-motion";
import { TrainerProfile } from "@/types/trainer";
import { ModernFormHeader } from "./form/ModernFormHeader";
import { ModernFormContent } from "./form/ModernFormContent";
import { ModernFormActions } from "./form/ModernFormActions";
import { ModernFormBackground } from "./form/ModernFormBackground";

interface ModernProfileFormProps {
  profile: TrainerProfile;
  errors: Partial<Record<keyof TrainerProfile, string>>;
  validFields: Partial<Record<keyof TrainerProfile, boolean>>;
  activeSection: string;
  isSaving: boolean;
  onUpdate: (key: keyof TrainerProfile, value: string) => void;
  onSave: () => void;
}

export const ModernProfileForm = ({
  profile,
  errors,
  validFields,
  activeSection,
  isSaving,
  onUpdate,
  onSave
}: ModernProfileFormProps) => {
  const getSectionConfig = () => {
    const configs = {
      personal: {
        title: 'اطلاعات شخصی',
        description: 'مدیریت کامل اطلاعات شخصی و حرفه‌ای',
        gradient: 'from-emerald-600 to-emerald-700'
      },
      gym: {
        title: 'اطلاعات باشگاه',
        description: 'جزئیات کامل باشگاه و مرکز تمرینی',
        gradient: 'from-sky-600 to-sky-700'
      },
      social: {
        title: 'شبکه‌های اجتماعی',
        description: 'مدیریت حضور آنلاین و شبکه‌های اجتماعی',
        gradient: 'from-emerald-500 to-sky-600'
      }
    };
    
    return configs[activeSection as keyof typeof configs] || configs.personal;
  };

  const sectionConfig = getSectionConfig();

  return (
    <motion.div 
      className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-emerald-100/50 dark:border-emerald-800/30 overflow-hidden"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <ModernFormBackground />
      
      {/* هدر فرم */}
      <ModernFormHeader sectionConfig={sectionConfig} />

      {/* محتوای فرم */}
      <div className="relative z-10 p-8">
        <ModernFormContent
          profile={profile}
          errors={errors}
          validFields={validFields}
          activeSection={activeSection}
          onUpdate={onUpdate}
        />

        {/* اکشن‌ها */}
        <ModernFormActions onSave={onSave} isSaving={isSaving} />
      </div>
    </motion.div>
  );
};
