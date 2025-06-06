
import React from "react";
import { motion } from "framer-motion";
import { TrainerProfileSidebar } from "./TrainerProfileSidebar";
import { TrainerProfileForm } from "./TrainerProfileForm";
import { TrainerProfile } from "@/types/trainer";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface TrainerProfileContentProps {
  profile: TrainerProfile;
  updateProfile: (key: keyof TrainerProfile, value: string) => void;
  saveProfile: () => Promise<void>;
  isLoading: boolean;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const TrainerProfileContent: React.FC<TrainerProfileContentProps> = ({
  profile,
  updateProfile,
  saveProfile,
  isLoading,
  activeSection,
  setActiveSection
}) => {
  const deviceInfo = useDeviceInfo();

  return (
    <motion.div 
      className={`grid gap-8 ${deviceInfo.isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-[420px_1fr] xl:grid-cols-[480px_1fr]'}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {/* نوار کناری */}
      <TrainerProfileSidebar
        profile={profile}
        onImageChange={(image) => updateProfile('image', image)}
        activeSection={activeSection}
        onTabChange={setActiveSection}
      />

      {/* فرم اصلی */}
      <TrainerProfileForm
        profile={profile}
        updateProfile={updateProfile}
        saveProfile={saveProfile}
        isLoading={isLoading}
        activeSection={activeSection}
      />
    </motion.div>
  );
};
