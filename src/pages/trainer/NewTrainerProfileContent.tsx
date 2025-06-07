
import { motion } from "framer-motion";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { NewTrainerProfileSidebar } from "./components/NewTrainerProfileSidebar";
import { NewTrainerProfileMainForm } from "./components/NewTrainerProfileMainForm";

interface NewTrainerProfileContentProps {
  profileData: any;
}

export const NewTrainerProfileContent = ({ profileData }: NewTrainerProfileContentProps) => {
  const deviceInfo = useDeviceInfo();

  return (
    <motion.div
      className={`grid gap-8 ${
        deviceInfo.isMobile 
          ? 'grid-cols-1' 
          : 'grid-cols-1 lg:grid-cols-[400px_1fr] xl:grid-cols-[440px_1fr]'
      }`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.8 }}
    >
      {/* سایدبار پروفایل */}
      <NewTrainerProfileSidebar profileData={profileData} />

      {/* فرم اصلی */}
      <NewTrainerProfileMainForm profileData={profileData} />
    </motion.div>
  );
};
