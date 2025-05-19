
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDeviceInfo } from "@/hooks/use-mobile";

export const LoadingState = () => {
  const deviceInfo = useDeviceInfo();
  
  const pulse = {
    scale: [1, 1.05, 1],
    opacity: [0.7, 0.9, 0.7],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };
  
  return (
    <div className="flex-1 flex flex-col items-center justify-center w-full h-full">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className={cn(
          "flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 p-4",
          deviceInfo.isMobile ? "w-16 h-16" : "w-20 h-20"
        )}
      >
        <Loader2 className={cn(
          "text-purple-600 dark:text-purple-400",
          deviceInfo.isMobile ? "w-8 h-8" : "w-10 h-10"
        )} />
      </motion.div>
      
      <motion.div 
        animate={pulse}
        className="mt-4 space-y-3"
      >
        <motion.h3 
          className="text-center text-lg sm:text-xl font-bold text-gray-700 dark:text-gray-300"
        >
          در حال بارگذاری...
        </motion.h3>
        <motion.p 
          className="text-center text-sm sm:text-base text-gray-500 dark:text-gray-400"
        >
          لطفا کمی صبر کنید
        </motion.p>
      </motion.div>
      
      <div className="mt-8 w-full max-w-md px-4">
        <div className="flex flex-col space-y-4">
          {[1, 2, 3].map(i => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 0.7, x: 0 }} 
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: i * 0.1
              }}
              className={cn(
                "bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-xl mx-auto",
                deviceInfo.isMobile ? "h-10 w-full" : "h-12 w-full"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
