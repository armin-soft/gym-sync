
import { Button } from "@/components/ui/button";
import { Save, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface SaveButtonProps {
  onSave: () => void;
  isLoading?: boolean;
}

export const SaveButton = ({ onSave, isLoading = false }: SaveButtonProps) => {
  const deviceInfo = useDeviceInfo();
  
  // تنظیم اندازه دکمه و پدینگ بر اساس سایز صفحه
  const getButtonPadding = () => {
    if (deviceInfo.isMobile) return "py-4";
    if (deviceInfo.isTablet) return "py-5";
    return "py-6";
  };
  
  // تنظیم اندازه متن بر اساس سایز صفحه
  const getTextSize = () => {
    if (deviceInfo.isMobile) return "text-sm";
    return "text-base";
  };
  
  // تنظیم اندازه آیکون بر اساس سایز صفحه
  const getIconSize = () => {
    if (deviceInfo.isMobile) return "h-4 w-4";
    return "h-5 w-5";
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="pt-4 sm:pt-6 md:pt-8 mt-2 sm:mt-4 md:mt-6 border-t border-gray-100 dark:border-gray-800"
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            <Button 
              disabled
              className={cn(
                "w-full bg-gradient-to-r from-indigo-500 to-sky-500",
                getButtonPadding()
              )}
            >
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                <div className={cn("animate-spin w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full")} />
                <span className={getTextSize()}>در حال ذخیره‌سازی...</span>
              </div>
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="save"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            <Button 
              onClick={onSave} 
              className={cn(
                "w-full relative overflow-hidden",
                "bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-600 hover:to-sky-600",
                "shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30",
                "border border-indigo-600/20",
                "transition-all duration-300",
                getButtonPadding()
              )}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-indigo-600/40 to-sky-600/40"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.8 }}
              />
              
              <motion.div 
                className="relative flex items-center justify-center gap-2 sm:gap-3"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Save className={cn(getIconSize(), "transition-transform group-hover:rotate-[-10deg]")} />
                <span className={getTextSize()}>ذخیره اطلاعات</span>
              </motion.div>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
