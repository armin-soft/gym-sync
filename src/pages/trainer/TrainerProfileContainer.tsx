
import React, { useState } from "react";
import { motion } from "framer-motion";
import { PageContainer } from "@/components/ui/page-container";
import { TrainerProfileBackground } from "./components/TrainerProfileBackground";
import { TrainerProfileHeader } from "./components/TrainerProfileHeader";
import { TrainerProfileContent } from "./components/TrainerProfileContent";
import { useTrainerProfileData } from "./hooks/useTrainerProfileData";

export const TrainerProfileContainer: React.FC = () => {
  const { profile, updateProfile, saveProfile, isLoading } = useTrainerProfileData();
  const [activeSection, setActiveSection] = useState<string>("personal");

  return (
    <PageContainer withBackground fullWidth fullHeight className="min-h-screen relative">
      <TrainerProfileBackground />
      
      <motion.div 
        className="relative z-10 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <TrainerProfileHeader />
          <TrainerProfileContent
            profile={profile}
            updateProfile={updateProfile}
            saveProfile={saveProfile}
            isLoading={isLoading}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        </div>
      </motion.div>
    </PageContainer>
  );
};
