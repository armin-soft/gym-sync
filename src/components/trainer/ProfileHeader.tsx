
import { motion } from "framer-motion";
import { UserRound, Sparkles, Crown, Zap } from "lucide-react";

export const ProfileHeader = () => {
  return (
    <motion.div 
      className="flex flex-col space-y-4 sm:space-y-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div 
        className="flex items-center gap-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        {/* Enhanced icon container */}
        <div className="relative">
          {/* Animated background glow */}
          <motion.div 
            className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/40 via-purple-500/30 to-indigo-500/20 blur-2xl"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Main icon container */}
          <motion.div 
            className="w-16 h-16 sm:w-18 sm:h-18 rounded-3xl bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-2xl shadow-violet-500/25 relative z-10 border border-white/20"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <UserRound className="h-7 w-7 sm:h-8 sm:w-8" />
            
            {/* Floating sparkle */}
            <motion.div
              className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg"
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity }
              }}
            >
              <Crown className="w-3 h-3 text-white" />
            </motion.div>
          </motion.div>
        </div>
        
        {/* Enhanced text content */}
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
              پروفایل مربی حرفه‌ای
            </h2>
          </motion.div>
          
          <motion.div
            className="flex items-center gap-2 mt-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <p className="text-base sm:text-lg text-muted-foreground font-medium">
              اطلاعات و تنظیمات پروفایل خود را مدیریت کنید
            </p>
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              <Zap className="w-5 h-5 text-emerald-500" />
            </motion.div>
          </motion.div>
          
          {/* Status indicators */}
          <motion.div 
            className="flex gap-3 mt-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-300/30 dark:border-emerald-600/30">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                فعال
              </span>
            </div>
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-violet-500/20 to-purple-500/20 border border-violet-300/30 dark:border-violet-600/30">
              <Sparkles className="w-3 h-3 text-violet-600 dark:text-violet-400" />
              <span className="text-sm font-semibold text-violet-700 dark:text-violet-300">
                پرو
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};
