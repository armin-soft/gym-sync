
import { motion } from "framer-motion";
import { PageContainer } from "@/components/ui/page-container";
import { ProfileBackground } from "./trainer/components/ProfileBackground";
import { ProfileMainContent } from "./trainer/components/ProfileMainContent";
import { useTrainerProfile } from "./trainer/hooks/useTrainerProfile";

const TrainerProfile = () => {
  const {
    profile,
    errors,
    setErrors,
    validFields,
    setValidFields,
    activeSection,
    setActiveSection,
    isSaving,
    handleUpdate,
    handleSave
  } = useTrainerProfile();

  return (
    <PageContainer withBackground fullWidth fullHeight className="min-h-screen">
      <ProfileBackground />
      
      <motion.div 
        className="relative z-10 container mx-auto p-4 md:p-6 lg:p-8 max-w-7xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <ProfileMainContent
          profile={profile}
          handleUpdate={handleUpdate}
          handleSave={handleSave}
          errors={errors}
          setErrors={setErrors}
          validFields={validFields}
          setValidFields={setValidFields}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          isSaving={isSaving}
        />
      </motion.div>
    </PageContainer>
  );
};

export default TrainerProfile;
