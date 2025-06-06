
import React from "react";
import { motion } from "framer-motion";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { TrainerProfile } from "@/types/trainer";
import { ModernProfileSidebar } from "./ModernProfileSidebar";
import { ModernProfileForm } from "./ModernProfileForm";
import { cn } from "@/lib/utils";

interface ModernTrainerProfileContentProps {
  profile: TrainerProfile;
  errors: Partial<Record<keyof TrainerProfile, string>>;
  validFields: Partial<Record<keyof TrainerProfile, boolean>>;
  activeSection: string;
  isSaving: boolean;
  onUpdate: (key: keyof TrainerProfile, value: string) => void;
  onSave: () => void;
  onSectionChange: (section: string) => void;
}

export const ModernTrainerProfileContent = ({
  profile,
  errors,
  validFields,
  activeSection,
  isSaving,
  onUpdate,
  onSave,
  onSectionChange
}: ModernTrainerProfileContentProps) => {
  const deviceInfo = useDeviceInfo();

  return (
    <motion.div 
      className={cn(
        "grid gap-8",
        deviceInfo.isMobile 
          ? "grid-cols-1" 
          : "grid-cols-1 lg:grid-cols-[420px_1fr] xl:grid-cols-[480px_1fr]"
      )}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      {/* ساید بار */}
      <ModernProfileSidebar
        profile={{
          image: profile.image,
          name: profile.name,
          phone: profile.phone
        }}
        onImageChange={(image) => onUpdate('image', image)}
        activeSection={activeSection}
        onSectionChange={onSectionChange}
      />

      {/* فرم */}
      <ModernProfileForm
        profile={profile}
        errors={errors}
        validFields={validFields}
        activeSection={activeSection}
        isSaving={isSaving}
        onUpdate={onUpdate}
        onSave={onSave}
      />
    </motion.div>
  );
};
