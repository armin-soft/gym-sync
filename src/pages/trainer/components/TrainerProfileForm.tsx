
import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { TrainerProfile } from "@/types/trainer";
import { PersonalInfoForm } from "./forms/PersonalInfoForm";
import { GymInfoForm } from "./forms/GymInfoForm";
import { SocialMediaForm } from "./forms/SocialMediaForm";
import { SaveButton } from "./forms/SaveButton";

interface TrainerProfileFormProps {
  profile: TrainerProfile;
  activeSection: string;
  onUpdateProfile: (key: keyof TrainerProfile, value: string) => void;
  onSaveProfile: () => void;
  isSaving: boolean;
}

export const TrainerProfileForm = ({
  profile,
  activeSection,
  onUpdateProfile,
  onSaveProfile,
  isSaving
}: TrainerProfileFormProps) => {
  const renderFormContent = () => {
    switch (activeSection) {
      case "personal":
        return <PersonalInfoForm profile={profile} onUpdate={onUpdateProfile} />;
      case "gym":
        return <GymInfoForm profile={profile} onUpdate={onUpdateProfile} />;
      case "social":
        return <SocialMediaForm profile={profile} onUpdate={onUpdateProfile} />;
      default:
        return <PersonalInfoForm profile={profile} onUpdate={onUpdateProfile} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Card className="border-0 bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-xl shadow-2xl">
        <div className="p-8">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {renderFormContent()}
            
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <SaveButton onSave={onSaveProfile} isLoading={isSaving} />
            </div>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
};
