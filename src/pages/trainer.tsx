
import React from 'react';
import { motion } from 'framer-motion';
import { PageContainer } from "@/components/ui/page-container";
import { ModernTrainerProfileContent } from './trainer/ModernTrainerProfileContent';
import { ModernTrainerBackground } from './trainer/ModernTrainerBackground';

const TrainerProfile = () => {
  return (
    <PageContainer withBackground fullWidth fullHeight className="min-h-screen overflow-hidden">
      <ModernTrainerBackground />
      
      <div className="relative z-10 h-full">
        <motion.div 
          className="h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <ModernTrainerProfileContent />
        </motion.div>
      </div>
    </PageContainer>
  );
};

export default TrainerProfile;
