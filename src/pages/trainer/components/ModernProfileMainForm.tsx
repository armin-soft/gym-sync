
import { motion, AnimatePresence } from "framer-motion";
import { ModernFormHeader } from "./form/ModernFormHeader";
import { ModernFormContent } from "./form/ModernFormContent";
import { ModernFormActions } from "./form/ModernFormActions";
import { ModernFormBackground } from "./form/ModernFormBackground";

interface ModernProfileMainFormProps {
  profileData: any;
  deviceInfo: any;
}

export const ModernProfileMainForm = ({ profileData, deviceInfo }: ModernProfileMainFormProps) => {
  return (
    <motion.div 
      className="relative overflow-hidden"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="bg-gradient-to-br from-white/80 via-gray-50/80 to-blue-50/80 dark:from-gray-900/80 dark:via-gray-800/80 dark:to-gray-700/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 overflow-hidden">
        <ModernFormBackground />
        
        {/* هدر فرم */}
        <ModernFormHeader 
          profileData={profileData}
          deviceInfo={deviceInfo}
        />

        {/* محتوای فرم */}
        <div className="relative z-10 p-6 md:p-8">
          <AnimatePresence mode="wait">
            <ModernFormContent 
              key={profileData.activeSection}
              profileData={profileData}
              deviceInfo={deviceInfo}
            />
          </AnimatePresence>

          {/* دکمه‌های عملیات */}
          <div className="mt-8 pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
            <ModernFormActions 
              profileData={profileData}
              deviceInfo={deviceInfo}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
