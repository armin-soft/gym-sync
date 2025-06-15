
import React from "react";
import { motion } from "framer-motion";
import { StudentProfileCard } from "./StudentProfileCard";
import { StudentProfileHeader } from "./StudentProfileHeader";
import { StudentProfile } from "../types/studentProfile";

interface StudentProfileContainerProps {
  profile: StudentProfile;
  errors: Partial<Record<keyof StudentProfile, string>>;
  setErrors: React.Dispatch<React.SetStateAction<Partial<Record<keyof StudentProfile, string>>>>;
  validFields: Partial<Record<keyof StudentProfile, boolean>>;
  setValidFields: React.Dispatch<React.SetStateAction<Partial<Record<keyof StudentProfile, boolean>>>>;
  activeSection: string;
  setActiveSection: (section: string) => void;
  isSaving: boolean;
  handleUpdate: (key: keyof StudentProfile, value: string) => void;
  handleSave: () => void;
}

export const StudentProfileContainer: React.FC<StudentProfileContainerProps> = (props) => {
  return (
    <div className="w-full max-w-7xl mx-auto" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="space-y-8"
      >
        <StudentProfileHeader />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid grid-cols-1 xl:grid-cols-12 gap-8"
        >
          <div className="xl:col-span-12">
            <StudentProfileCard {...props} />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
