
import { motion } from "framer-motion";
import { ModernProfileHeader } from "./components/ModernProfileHeader";
import { ModernProfileSidebar } from "./components/ModernProfileSidebar";
import { ModernProfileMainForm } from "./components/ModernProfileMainForm";

interface ModernTrainerProfileContentProps {
  profileData: any;
  deviceInfo: any;
}

export const ModernTrainerProfileContent = ({ 
  profileData, 
  deviceInfo 
}: ModernTrainerProfileContentProps) => {
  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* هدر صفحه */}
        <ModernProfileHeader deviceInfo={deviceInfo} />

        {/* محتوای اصلی */}
        <motion.div 
          className={`grid gap-8 ${
            deviceInfo.isMobile 
              ? 'grid-cols-1' 
              : 'grid-cols-1 lg:grid-cols-[420px_1fr] xl:grid-cols-[480px_1fr]'
          }`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* سایدبار پروفایل */}
          <ModernProfileSidebar 
            profileData={profileData}
            deviceInfo={deviceInfo}
          />

          {/* فرم اصلی */}
          <ModernProfileMainForm 
            profileData={profileData}
            deviceInfo={deviceInfo}
          />
        </motion.div>
      </div>
    </div>
  );
};
