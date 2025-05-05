
import { FlaskConical, Pill, Package } from "lucide-react";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const SupplementsHeader = () => {
  const deviceInfo = useDeviceInfo();

  const getHeaderSize = () => {
    if (deviceInfo.isMobile) {
      return "text-lg";
    } else if (deviceInfo.isTablet) {
      return "text-xl";
    } else {
      return "text-2xl";
    }
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: -15 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden mb-2 sm:mb-3"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 via-indigo-400/5 to-blue-400/10 rounded-lg sm:rounded-xl" />
      
      <div className="absolute right-0 top-0 h-16 w-16 md:h-24 md:w-24 bg-gradient-to-br from-purple-500/20 to-blue-500/10 rounded-full blur-2xl -mr-8 -mt-8" />
      <div className="absolute left-0 bottom-0 h-12 w-12 md:h-20 md:w-20 bg-gradient-to-br from-blue-500/10 to-purple-500/20 rounded-full blur-xl -ml-6 -mb-6" />
      
      <div className="relative backdrop-blur-sm p-3 sm:p-4 overflow-hidden rounded-lg sm:rounded-xl border border-white/10 dark:border-gray-800/50 shadow-lg">
        <div className="grid grid-cols-6 gap-1 sm:gap-2">
          <div className="col-span-6 sm:col-span-4 flex items-start gap-2 sm:gap-3">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex-shrink-0"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/80 to-indigo-600/80 blur-md rounded-xl transform -rotate-3" />
              <div className="relative p-1.5 sm:p-2.5 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-2xl transform rotate-3">
                <Package className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
            </motion.div>
            
            <motion.div variants={container} initial="hidden" animate="visible">
              <motion.h2 
                variants={item}
                className={`${getHeaderSize()} font-extrabold tracking-tight text-gradient bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent`}
              >
                مکمل ها و ویتامین ها
              </motion.h2>
              <motion.p 
                variants={item}
                className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium mt-0.5"
              >
                در این بخش می توانید مکمل های ورزشی و ویتامین های خود را مدیریت کنید
              </motion.p>
            </motion.div>
          </div>
          
          <div className="col-span-6 sm:col-span-2 flex justify-center sm:justify-end items-end">
            <div className="hidden sm:flex space-x-3 items-center">
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
                className="relative flex-shrink-0"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/80 to-purple-600/80 blur-md rounded-full" />
                <div className="relative p-1.5 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full shadow-lg">
                  <FlaskConical className="h-4 w-4 text-white" />
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7, type: "spring" }}
                className="relative flex-shrink-0"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/80 to-blue-600/80 blur-md rounded-full" />
                <div className="relative p-1.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-lg">
                  <Pill className="h-4 w-4 text-white" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Animated floating icons */}
        <motion.div 
          className="absolute right-6 top-1/4 opacity-5"
          animate={{ 
            y: [0, -6, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <FlaskConical size={28} />
        </motion.div>
        
        <motion.div 
          className="absolute right-16 bottom-1/4 opacity-5"
          animate={{ 
            y: [0, 4, 0],
            rotate: [0, -3, 0]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity,
            repeatType: "reverse",
            delay: 0.5
          }}
        >
          <Pill size={24} />
        </motion.div>
        
        <motion.div 
          className="absolute left-8 top-1/3 opacity-5"
          animate={{ 
            y: [0, 4, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 4.5, 
            repeat: Infinity,
            repeatType: "reverse",
            delay: 0.8
          }}
        >
          <Package size={22} />
        </motion.div>
      </div>
    </motion.div>
  );
};
