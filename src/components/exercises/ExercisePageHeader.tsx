
import { motion } from "framer-motion";
import { useDeviceInfo } from "@/hooks/use-mobile";

export const ExercisePageHeader = () => {
  const deviceInfo = useDeviceInfo();

  return (
    <motion.div 
      className="flex flex-col gap-3 sm:gap-4 lg:gap-5"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-0.5 sm:space-y-1">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
            مدیریت حرکات تمرینی
          </h2>
          <p className={`text-muted-foreground ${deviceInfo.isMobile ? "text-2xs" : deviceInfo.isTablet ? "text-xs" : "text-sm"}`}>
            مدیریت انواع، دسته بندی ها و حرکات تمرینی
          </p>
        </div>
      </div>
    </motion.div>
  );
};
