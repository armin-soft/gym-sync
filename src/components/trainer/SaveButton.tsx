
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { motion } from "framer-motion";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface SaveButtonProps {
  onSave: () => void;
}

export const SaveButton = ({ onSave }: SaveButtonProps) => {
  const deviceInfo = useDeviceInfo();
  
  const getButtonSize = () => {
    if (deviceInfo.isMobile) return "py-2";
    return "size-lg";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="pt-4 sm:pt-6 mt-4 sm:mt-6 border-t"
    >
      <Button 
        onClick={onSave} 
        className={`w-full group relative overflow-hidden ${getButtonSize()}`}
      >
        <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-sky-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="relative flex items-center justify-center">
          <Save className="ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:rotate-[-10deg]" />
          <span className="text-sm sm:text-base">ذخیره تغییرات</span>
        </span>
      </Button>
    </motion.div>
  );
};
