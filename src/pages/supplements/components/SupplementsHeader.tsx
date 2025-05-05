
import { FlaskConical, Pill, Package, Sparkles, Beaker, Star } from "lucide-react";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-violet-400/10 via-indigo-400/5 to-blue-400/10 rounded-xl sm:rounded-2xl lg:rounded-3xl" />
      
      <div className="absolute right-0 top-0 h-24 w-24 md:h-40 md:w-40 bg-gradient-to-br from-violet-500/20 to-blue-500/10 rounded-full blur-2xl -mr-12 -mt-12" />
      <div className="absolute left-0 bottom-0 h-20 w-20 md:h-32 md:w-32 bg-gradient-to-br from-blue-500/10 to-violet-500/20 rounded-full blur-xl -ml-10 -mb-10" />
      
      <div className="relative backdrop-blur-sm p-4 sm:p-6 md:p-8 overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl border border-white/10 dark:border-gray-800/50 shadow-xl">
        <div className="grid grid-cols-6 gap-2 sm:gap-4">
          <div className="col-span-6 sm:col-span-4 flex items-start gap-3 sm:gap-4">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex-shrink-0"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/80 to-indigo-600/80 blur-md rounded-2xl transform -rotate-3" />
              <div className="relative p-2.5 sm:p-4 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-2xl shadow-2xl transform rotate-3">
                <Package className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
            </motion.div>
            
            <motion.div variants={container} initial="hidden" animate="visible">
              <motion.h2 
                variants={item}
                className={`${getHeaderSize()} font-extrabold tracking-tight text-gradient bg-gradient-to-r from-violet-700 to-blue-600 bg-clip-text text-transparent`}
              >
                مکمل ها و ویتامین ها
              </motion.h2>
              <motion.p 
                variants={item}
                className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-medium mt-1"
              >
                در این بخش می توانید مکمل های ورزشی و ویتامین های خود را مدیریت کنید
              </motion.p>
            </motion.div>
          </div>
          
          <div className="col-span-6 sm:col-span-2 flex justify-center sm:justify-end items-end">
            <div className="hidden sm:flex space-x-4 items-center">
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
                className="relative flex-shrink-0"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/80 to-violet-600/80 blur-md rounded-full" />
                <div className="relative p-2 bg-gradient-to-br from-violet-500 to-violet-600 rounded-full shadow-lg">
                  <FlaskConical className="h-5 w-5 text-white" />
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7, type: "spring" }}
                className="relative flex-shrink-0"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/80 to-blue-600/80 blur-md rounded-full" />
                <div className="relative p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-lg">
                  <Pill className="h-5 w-5 text-white" />
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
                className="relative flex-shrink-0"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/80 to-indigo-600/80 blur-md rounded-full" />
                <div className="relative p-2 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full shadow-lg">
                  <Beaker className="h-5 w-5 text-white" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Animated floating icons */}
        <motion.div 
          className="absolute right-8 top-1/4 opacity-5"
          animate={{ 
            y: [0, -8, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <FlaskConical size={40} />
        </motion.div>
        
        <motion.div 
          className="absolute right-24 bottom-1/4 opacity-5"
          animate={{ 
            y: [0, 6, 0],
            rotate: [0, -3, 0]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity,
            repeatType: "reverse",
            delay: 0.5
          }}
        >
          <Pill size={35} />
        </motion.div>
        
        <motion.div 
          className="absolute left-12 top-1/3 opacity-5"
          animate={{ 
            y: [0, 5, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 4.5, 
            repeat: Infinity,
            repeatType: "reverse",
            delay: 0.8
          }}
        >
          <Sparkles size={30} />
        </motion.div>
      </div>
    </motion.div>
  );
};
