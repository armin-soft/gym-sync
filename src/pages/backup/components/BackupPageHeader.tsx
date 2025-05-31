
import { motion } from "framer-motion";
import { Shield, Sparkles, Database, Lock } from "lucide-react";

export function BackupPageHeader() {
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div variants={itemVariants} className="text-center mb-8 sm:mb-10 lg:mb-16 relative">
      {/* Main Icon with advanced effects */}
      <div className="relative inline-flex items-center justify-center mb-6 sm:mb-8">
        <motion.div 
          variants={iconVariants}
          className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 rounded-2xl sm:rounded-3xl shadow-2xl"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl sm:rounded-3xl blur-xl opacity-30 animate-pulse" />
          
          {/* Inner gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10 rounded-2xl sm:rounded-3xl" />
          
          <Shield className="relative z-10 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-white m-auto mt-3 sm:mt-4 md:mt-5" />
          
          {/* Floating icons around main icon */}
          <motion.div
            className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full shadow-lg flex items-center justify-center"
            animate={{ 
              y: [0, -8, 0],
              rotate: [0, 360]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Database className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          </motion.div>
          
          <motion.div
            className="absolute -bottom-2 -left-2 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full shadow-lg flex items-center justify-center"
            animate={{ 
              y: [0, 8, 0],
              rotate: [360, 0]
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            <Lock className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          </motion.div>
          
          <motion.div
            className="absolute -top-2 -left-2 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg flex items-center justify-center"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          >
            <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
          </motion.div>
        </motion.div>
      </div>

      {/* Title with advanced typography */}
      <motion.h1 
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <span className="relative">
          مدیریت پیشرفته پشتیبان‌گیری
          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-lg"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </span>
      </motion.h1>

      {/* Subtitle with enhanced styling */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed px-4 mb-4">
          سیستم هوشمند حفاظت از اطلاعات با امکانات پیشرفته امنیت و بازیابی سریع
        </p>
        
        {/* Feature badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-6">
          {[
            { text: "امنیت بالا", color: "from-emerald-500 to-teal-600" },
            { text: "بازیابی سریع", color: "from-blue-500 to-indigo-600" },
            { text: "فشرده‌سازی هوشمند", color: "from-purple-500 to-pink-600" },
            { text: "رمزگذاری پیشرفته", color: "from-orange-500 to-red-600" }
          ].map((badge, index) => (
            <motion.div
              key={badge.text}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r ${badge.color} text-white text-xs sm:text-sm font-medium rounded-full shadow-lg backdrop-blur-sm border border-white/20`}
            >
              {badge.text}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
