
import React from "react";
import { motion } from "framer-motion";
import { TrainerProfileCard } from "./TrainerProfileCard";
import { TrainerProfileHeader } from "./TrainerProfileHeader";
import { TrainerProfile } from "@/types/trainer";

interface TrainerProfileContainerProps {
  profile: TrainerProfile;
  errors: Partial<Record<keyof TrainerProfile, string>>;
  setErrors: React.Dispatch<React.SetStateAction<Partial<Record<keyof TrainerProfile, string>>>>;
  validFields: Partial<Record<keyof TrainerProfile, boolean>>;
  setValidFields: React.Dispatch<React.SetStateAction<Partial<Record<keyof TrainerProfile, boolean>>>>;
  activeSection: string;
  setActiveSection: (section: string) => void;
  isSaving: boolean;
  handleUpdate: (key: keyof TrainerProfile, value: string) => void;
  handleSave: () => void;
}

export const TrainerProfileContainer: React.FC<TrainerProfileContainerProps> = (props) => {
  return (
    <div className="w-full h-full max-w-7xl mx-auto flex flex-col" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full h-full flex flex-col space-y-6 overflow-hidden"
      >
        <motion.div 
          variants={{ 
            initial: { opacity: 0, y: 20 }, 
            animate: { opacity: 1, y: 0 }
          }}
          initial="initial"
          animate="animate"
          className="flex-shrink-0"
        >
          <TrainerProfileHeader />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex-1 w-full overflow-hidden"
        >
          <TrainerProfileCard {...props} />
        </motion.div>
      </motion.div>
    </div>
  );
};
