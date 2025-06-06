
import React, { useState } from "react";
import { motion } from "framer-motion";
import { TrainerProfileSidebar } from "./TrainerProfileSidebar";
import { TrainerProfileForm } from "./TrainerProfileForm";
import { TrainerProfile } from "@/types/trainer";

interface TrainerProfileContentProps {
  profile: TrainerProfile;
  onUpdateProfile: (key: keyof TrainerProfile, value: string) => void;
  onSaveProfile: () => void;
  isSaving: boolean;
}

export const TrainerProfileContent = ({
  profile,
  onUpdateProfile,
  onSaveProfile,
  isSaving
}: TrainerProfileContentProps) => {
  const [activeSection, setActiveSection] = useState("personal");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.8 }}
      className="grid grid-cols-1 lg:grid-cols-[400px_1fr] xl:grid-cols-[440px_1fr] gap-8"
    >
      {/* Sidebar */}
      <TrainerProfileSidebar
        profile={profile}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onImageChange={(image) => onUpdateProfile('image', image)}
      />

      {/* Main form */}
      <TrainerProfileForm
        profile={profile}
        activeSection={activeSection}
        onUpdateProfile={onUpdateProfile}
        onSaveProfile={onSaveProfile}
        isSaving={isSaving}
      />
    </motion.div>
  );
};
