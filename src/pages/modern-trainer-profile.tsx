
import React from "react";
import { motion } from "framer-motion";
import { PageContainer } from "@/components/ui/page-container";
import { ModernTrainerProfileBackground } from "./modern-trainer-profile/components/ModernTrainerProfileBackground";
import { ModernTrainerProfileHeader } from "./modern-trainer-profile/components/ModernTrainerProfileHeader";
import { ModernTrainerProfileContent } from "./modern-trainer-profile/components/ModernTrainerProfileContent";
import { useModernTrainerProfile } from "./modern-trainer-profile/hooks/useModernTrainerProfile";

const ModernTrainerProfile = () => {
  const {
    profile,
    errors,
    validFields,
    activeSection,
    isSaving,
    completionPercentage,
    handleUpdate,
    handleSave,
    setActiveSection
  } = useModernTrainerProfile();

  return (
    <PageContainer withBackground fullWidth fullHeight className="min-h-screen">
      <ModernTrainerProfileBackground />
      
      <motion.div 
        className="relative z-10 container mx-auto p-4 lg:p-8 max-w-7xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <ModernTrainerProfileHeader completionPercentage={completionPercentage} />
        
        <ModernTrainerProfileContent
          profile={profile}
          errors={errors}
          validFields={validFields}
          activeSection={activeSection}
          isSaving={isSaving}
          onUpdate={handleUpdate}
          onSave={handleSave}
          onSectionChange={setActiveSection}
        />
      </motion.div>
    </PageContainer>
  );
};

export default ModernTrainerProfile;
