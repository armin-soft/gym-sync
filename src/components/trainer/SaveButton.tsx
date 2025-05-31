
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
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="pt-6 sm:pt-8 mt-4 sm:mt-6 border-t border-gray-100 dark:border-gray-800"
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
              className="w-full py-6 bg-gradient-to-r from-orange-500 to-gold-500 hover:from-orange-600 hover:to-gold-600 text-black"
            >
              <div className="flex items-center justify-center gap-3">
                <div className="animate-spin w-5 h-5 border-2 border-black border-t-transparent rounded-full" />
                <span className="text-base">در حال ذخیره‌سازی...</span>
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
                "w-full py-6 relative overflow-hidden",
                "bg-gradient-to-r from-orange-500 to-gold-500 hover:from-orange-600 hover:to-gold-600 text-black",
                "shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30",
                "border border-orange-600/20",
                "transition-all duration-300"
              )}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-orange-600/40 to-gold-600/40"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.8 }}
              />
              
              <motion.div 
                className="relative flex items-center justify-center gap-3"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Save className="h-5 w-5 transition-transform group-hover:rotate-[-10deg]" />
                <span className="text-base">ذخیره اطلاعات</span>
              </motion.div>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
