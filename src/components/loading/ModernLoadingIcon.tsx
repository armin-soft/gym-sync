
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { AppIcon } from "../ui/app-icon";

export const ModernLoadingIcon = () => {
  return (
    <div className="relative mb-8 flex items-center justify-center">
      {/* Outer rotating ring */}
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute w-32 h-32 border-4 border-white/20 border-t-white/60 rounded-full"
      />
      
      {/* Middle rotating ring */}
      <motion.div 
        animate={{ rotate: -360 }} 
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="absolute w-24 h-24 border-2 border-purple-400/30 border-r-purple-400 rounded-full"
      />
      
      {/* Inner spinning loader */}
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="text-white/80"
      >
        <Loader2 className="h-16 w-16" strokeWidth={1.5} />
      </motion.div>
      
      {/* Central app icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AppIcon size="lg" />
      </div>
      
      {/* Pulsing glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};
