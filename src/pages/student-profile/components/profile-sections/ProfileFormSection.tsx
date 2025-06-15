
import React from "react";
import { motion } from "framer-motion";
import { StudentProfile } from "../../types/studentProfile";
import { PersonalInfoForm } from "../forms/PersonalInfoForm";
import { HealthInfoForm } from "../forms/HealthInfoForm";
import { GoalsForm } from "../forms/GoalsForm";
import { ProfileSaveButton } from "../forms/ProfileSaveButton";
import { ProfileProgress } from "../forms/ProfileProgress";

interface ProfileFormSectionProps {
  profile: StudentProfile;
  errors: Partial<Record<keyof StudentProfile, string>>;
  setErrors: React.Dispatch<React.SetStateAction<Partial<Record<keyof StudentProfile, string>>>>;
  validFields: Partial<Record<keyof StudentProfile, boolean>>;
  setValidFields: React.Dispatch<React.SetStateAction<Partial<Record<keyof StudentProfile, boolean>>>>;
  activeSection: string;
  isSaving: boolean;
  handleUpdate: (key: keyof StudentProfile, value: string) => void;
  handleSave: () => void;
}

export const ProfileFormSection: React.FC<ProfileFormSectionProps> = (props) => {
  const { activeSection } = props;

  const renderActiveForm = () => {
    switch (activeSection) {
      case "personal":
        return <PersonalInfoForm {...props} />;
      case "health":
        return <HealthInfoForm {...props} />;
      case "goals":
        return <GoalsForm {...props} />;
      default:
        return <PersonalInfoForm {...props} />;
    }
  };

  return (
    <div className="p-8 space-y-8">
      {/* نوار پیشرفت */}
      <ProfileProgress profile={props.profile} />
      
      {/* فرم فعال */}
      <motion.div
        key={activeSection}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        {renderActiveForm()}
      </motion.div>

      {/* دکمه ذخیره */}
      <div className="pt-6 border-t border-slate-200/50 dark:border-slate-700/50">
        <ProfileSaveButton 
          onSave={props.handleSave}
          isLoading={props.isSaving}
        />
      </div>
    </div>
  );
};
