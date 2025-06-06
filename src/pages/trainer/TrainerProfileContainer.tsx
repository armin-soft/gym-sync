
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PageContainer } from "@/components/ui/page-container";
import { TrainerProfileHeader } from "./components/TrainerProfileHeader";
import { TrainerProfileContent } from "./components/TrainerProfileContent";
import { TrainerProfileBackground } from "./components/TrainerProfileBackground";
import { useTrainerProfileData } from "./hooks/useTrainerProfileData";

export const TrainerProfileContainer = () => {
  const {
    profile,
    isLoading,
    updateProfile,
    saveProfile,
    isSaving
  } = useTrainerProfileData();

  if (isLoading) {
    return (
      <PageContainer withBackground fullWidth fullHeight>
        <div className="min-h-screen flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full"
          />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer withBackground fullWidth fullHeight>
      <div className="relative min-h-screen">
        <TrainerProfileBackground />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 container mx-auto px-4 py-8 max-w-7xl"
        >
          <TrainerProfileHeader />
          
          <TrainerProfileContent
            profile={profile}
            onUpdateProfile={updateProfile}
            onSaveProfile={saveProfile}
            isSaving={isSaving}
          />
        </motion.div>
      </div>
    </PageContainer>
  );
};
