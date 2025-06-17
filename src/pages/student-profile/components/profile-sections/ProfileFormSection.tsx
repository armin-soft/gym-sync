
import React from "react";
import { motion } from "framer-motion";
import { StudentProfile } from "../../types/studentProfile";
import { PersonalInfoForm } from "../forms/PersonalInfoForm";
import { HealthInfoForm } from "../forms/HealthInfoForm";
import { GoalsForm } from "../forms/GoalsForm";
import { NotesForm } from "../forms/NotesForm";
import { ProfileSaveButton } from "../forms/ProfileSaveButton";

interface ProfileFormSectionProps {
  profile: StudentProfile;
  errors: Partial<Record<keyof StudentProfile, string>>;
  validFields: Partial<Record<keyof StudentProfile, boolean>>;
  activeSection: string;
  isSaving: boolean;
  handleUpdate: (key: keyof StudentProfile, value: string) => void;
  handleSave: () => void;
}

export const ProfileFormSection: React.FC<ProfileFormSectionProps> = (props) => {
  const renderActiveForm = () => {
    switch (props.activeSection) {
      case "personal":
        return <PersonalInfoForm {...props} />;
      case "health":
        return <HealthInfoForm {...props} />;
      case "goals":
        return <GoalsForm {...props} />;
      case "notes":
        return <NotesForm {...props} />;
      default:
        return <PersonalInfoForm {...props} />;
    }
  };

  return (
    <div className="p-8 h-full flex flex-col">
      <motion.div
        key={props.activeSection}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1"
      >
        {renderActiveForm()}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-8"
      >
        <ProfileSaveButton 
          onSave={props.handleSave}
          isLoading={props.isSaving}
        />
      </motion.div>
    </div>
  );
};
