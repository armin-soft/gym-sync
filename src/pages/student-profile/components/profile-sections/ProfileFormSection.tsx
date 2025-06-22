
import React from "react";
import { motion } from "framer-motion";
import { StudentProfile } from "../../types/studentProfile";
import { PersonalInfoForm } from "../forms/PersonalInfoForm";

interface ProfileFormSectionProps {
  profile: StudentProfile;
  activeSection: string;
  handleImageUpdate?: (image: string) => void;
}

export const ProfileFormSection: React.FC<ProfileFormSectionProps> = (props) => {
  return (
    <div className="p-8 h-full flex flex-col">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1"
      >
        <PersonalInfoForm 
          profile={props.profile}
          errors={{}}
          validFields={{}}
          handleUpdate={() => {}} // تابع خالی چون دیگر قابل ویرایش نیست
        />
      </motion.div>
    </div>
  );
};
