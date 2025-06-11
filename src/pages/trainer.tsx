
import { motion } from "framer-motion";
import { TrainerProfileContainer } from "./trainer/components/TrainerProfileContainer";
import { TrainerProfileBackground } from "./trainer/components/TrainerProfileBackground";
import { useTrainerProfile } from "./trainer/hooks/useTrainerProfile";

const TrainerProfile = () => {
  const profileData = useTrainerProfile();

  return (
    <div className="w-screen h-screen overflow-hidden bg-gradient-to-br from-emerald-50 via-sky-50/30 to-emerald-50/40" dir="rtl">
      <TrainerProfileBackground />
      
      <motion.div 
        className="relative z-10 w-full h-full flex items-center justify-center overflow-y-auto overflow-x-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-full h-full p-4 lg:p-6">
          <TrainerProfileContainer {...profileData} />
        </div>
      </motion.div>
    </div>
  );
};

export default TrainerProfile;
