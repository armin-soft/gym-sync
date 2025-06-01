
import { motion } from "framer-motion";
import { Sparkles, Crown } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useState, useEffect } from "react";

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    },
  },
};

export const SelectionHeader = () => {
  const [appVersion, setAppVersion] = useState("در حال بارگذاری...");
  
  useEffect(() => {
    const fetchVersionFromManifest = async () => {
      try {
        const response = await fetch('/Manifest.json');
        const manifest = await response.json();
        
        if (manifest && manifest.version) {
          setAppVersion(manifest.version);
          localStorage.setItem('app_version', manifest.version);
          console.log('Version loaded from Manifest.json:', manifest.version);
        } else {
          const cachedVersion = localStorage.getItem('app_version');
          if (cachedVersion) {
            setAppVersion(cachedVersion);
          } else {
            setAppVersion("نامشخص");
          }
        }
      } catch (error) {
        console.error('Error loading version from Manifest.json:', error);
        
        const cachedVersion = localStorage.getItem('app_version');
        if (cachedVersion) {
          setAppVersion(cachedVersion);
        } else {
          setAppVersion("خطا در بارگذاری");
        }
      }
    };
    
    fetchVersionFromManifest();
  }, []);

  return (
    <motion.div variants={itemVariants} className="space-y-4 sm:space-y-6" dir="rtl">
      {/* Logo and Icon Section */}
      <div className="relative inline-flex items-center justify-center mb-4 sm:mb-6 md:mb-8">
        <motion.div
          className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 rounded-2xl sm:rounded-3xl shadow-2xl flex items-center justify-center"
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Crown className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
          
          <motion.div
            className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-yellow-400 rounded-full flex items-center justify-center"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 text-white" />
          </motion.div>
          
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-violet-500/40 to-purple-500/40 rounded-2xl sm:rounded-3xl blur-xl"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>
      
      {/* Main Title */}
      <div className="text-center space-y-2 sm:space-y-3 md:space-y-4">
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-l from-violet-700 via-purple-700 to-indigo-700 bg-clip-text text-transparent leading-tight px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          سیستم مدیریت باشگاه
        </motion.h1>
        
        <motion.p 
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 font-medium max-w-2xl mx-auto leading-relaxed px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          انتخاب نوع دسترسی و ورود به پنل کاربری
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mt-4 sm:mt-6 text-xs sm:text-sm text-gray-500 dark:text-gray-400 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>آنلاین</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
          <div className="flex items-center gap-2">
            <span>نسخه {toPersianNumbers(appVersion)}</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
          <div className="flex items-center gap-2">
            <span>امن و قابل اعتماد</span>
          </div>
        </motion.div>
      </div>
      
      {/* Decorative line */}
      <motion.div
        className="mx-auto mt-6 sm:mt-8 h-px w-32 sm:w-48 md:w-64 bg-gradient-to-l from-transparent via-violet-400/60 to-transparent"
        initial={{ width: 0 }}
        animate={{ width: "auto" }}
        transition={{ delay: 0.8, duration: 1.2 }}
      />
    </motion.div>
  );
};
