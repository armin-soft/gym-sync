
import { motion } from "framer-motion";
import { PageContainer } from "@/components/ui/page-container";
import { NewTrainerProfileBackground } from "./trainer/NewTrainerProfileBackground";
import { NewTrainerProfileHeader } from "./trainer/NewTrainerProfileHeader";  
import { NewTrainerProfileContent } from "./trainer/NewTrainerProfileContent";
import { useNewTrainerProfile } from "./trainer/useNewTrainerProfile";

const TrainerProfile = () => {
  const profileData = useNewTrainerProfile();

  return (
    <PageContainer withBackground fullWidth fullHeight className="min-h-screen overflow-x-hidden" dir="rtl">
      <NewTrainerProfileBackground />
      
      <motion.div 
        className="relative z-10 w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <NewTrainerProfileHeader />
          <NewTrainerProfileContent profileData={profileData} />
        </div>
      </motion.div>
    </PageContainer>
  );
};

export default TrainerProfile;
