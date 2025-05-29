
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { AppIcon } from "../ui/app-icon";

export const LoadingIcon = () => {
  return (
    <div className="relative mb-8 flex items-center justify-center">
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="text-white/80"
      >
        <Loader2 className="h-16 w-16" strokeWidth={1.5} />
      </motion.div>
      <div className="absolute inset-0 flex items-center justify-center">
        <AppIcon size="lg" />
      </div>
    </div>
  );
};
