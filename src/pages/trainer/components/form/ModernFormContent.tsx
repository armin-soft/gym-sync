
import { motion } from "framer-motion";
import { PersonalInfoSection } from "./sections/PersonalInfoSection";
import { GymInfoSection } from "./sections/GymInfoSection";
import { SocialMediaSection } from "./sections/SocialMediaSection";
import { CertificatesSection } from "./sections/CertificatesSection";
import { StatisticsSection } from "./sections/StatisticsSection";

interface ModernFormContentProps {
  profileData: any;
  deviceInfo: any;
}

export const ModernFormContent = ({ profileData, deviceInfo }: ModernFormContentProps) => {
  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const renderSection = () => {
    switch (profileData.activeSection) {
      case 'personal':
        return <PersonalInfoSection profileData={profileData} deviceInfo={deviceInfo} />;
      case 'gym':
        return <GymInfoSection profileData={profileData} deviceInfo={deviceInfo} />;
      case 'social':
        return <SocialMediaSection profileData={profileData} deviceInfo={deviceInfo} />;
      case 'certificates':
        return <CertificatesSection profileData={profileData} deviceInfo={deviceInfo} />;
      case 'statistics':
        return <StatisticsSection profileData={profileData} deviceInfo={deviceInfo} />;
      default:
        return <PersonalInfoSection profileData={profileData} deviceInfo={deviceInfo} />;
    }
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {renderSection()}
    </motion.div>
  );
};
