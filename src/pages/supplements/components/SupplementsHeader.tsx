
import { FlaskConical, Pill } from "lucide-react";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

export const SupplementsHeader = () => {
  const deviceInfo = useDeviceInfo();

  const getHeaderSize = () => {
    if (deviceInfo.isMobile) {
      return "text-xl";
    } else if (deviceInfo.isTablet) {
      return "text-2xl";
    } else {
      return "text-3xl";
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/5 to-purple-500/10 rounded-xl sm:rounded-2xl lg:rounded-3xl" />
      <div className="absolute right-0 top-0 h-20 w-20 md:h-32 md:w-32 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-xl -mr-10 -mt-10" />
      <div className="absolute left-0 bottom-0 h-16 w-16 md:h-24 md:w-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-lg -ml-6 -mb-6" />
      
      <div className="relative bg-white/50 backdrop-blur-sm rounded-xl sm:rounded-2xl lg:rounded-3xl border shadow-sm p-3 sm:p-5 lg:p-8 overflow-hidden">
        {/* Animated floating icons */}
        <motion.div 
          className="absolute right-8 top-8 opacity-5"
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <FlaskConical size={100} />
        </motion.div>
        
        <motion.div 
          className="absolute left-12 bottom-6 opacity-5"
          animate={{ 
            y: [0, 8, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
        >
          <Pill size={80} />
        </motion.div>
        
        <div className="flex items-center gap-2 sm:gap-3">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 sm:p-3 md:p-4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-xl"
          >
            <FlaskConical className={`h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white`} />
          </motion.div>
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className={`${getHeaderSize()} font-extrabold tracking-tight bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent`}
            >
              مکمل ها و ویتامین ها
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className={`text-xs sm:text-sm lg:text-base text-muted-foreground mt-1 lg:mt-2`}
            >
              در این بخش می توانید مکمل های ورزشی و ویتامین های خود را مدیریت کنید
            </motion.p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
