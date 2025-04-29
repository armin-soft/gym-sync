
import { motion } from "framer-motion";
import { Camera, Award, Medal, Settings } from "lucide-react";

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
        <div className="relative">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/40 to-sky-500/40 blur-xl opacity-70" />
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 relative z-10">
            <Camera className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            پروفایل مربی
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            اطلاعات و تنظیمات پروفایل خود را مدیریت کنید
          </p>
        </div>

        <div className="hidden md:flex ml-auto gap-2">
          <motion.div 
            className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm border border-gray-200/50 dark:border-gray-700/50"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Award className="h-4 w-4 text-amber-500" />
            <span className="text-xs font-medium">مربی حرفه‌ای</span>
          </motion.div>

          <motion.div 
            className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm border border-gray-200/50 dark:border-gray-700/50"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Medal className="h-4 w-4 text-indigo-500" />
            <span className="text-xs font-medium">+۵ سال سابقه</span>
          </motion.div>

          <motion.div 
            className="w-10 h-10 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 rounded-full flex items-center justify-center shadow-sm border border-gray-200/50 dark:border-gray-700/50 cursor-pointer"
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9, rotate: 0 }}
          >
            <Settings className="h-4 w-4 text-gray-600 dark:text-gray-300" />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};
