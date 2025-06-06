
import { motion } from "framer-motion";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { PageContainer } from "@/components/ui/page-container";
import { ModernTrainerBackground } from "./trainer/ModernTrainerBackground";
import { ModernTrainerProfileContent } from "./trainer/ModernTrainerProfileContent";
import { useModernTrainerProfile } from "./trainer/hooks/useModernTrainerProfile";

const ModernTrainerProfile = () => {
  const deviceInfo = useDeviceInfo();
  const profileData = useModernTrainerProfile();

  return (
    <PageContainer withBackground fullWidth fullHeight className="min-h-screen overflow-x-hidden">
      <ModernTrainerBackground />
      
      <motion.div 
        className="relative z-10 w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <ModernTrainerProfileContent
          profileData={profileData}
          deviceInfo={deviceInfo}
        />
      </motion.div>
    </PageContainer>
  );
};

export default ModernTrainerProfile;
