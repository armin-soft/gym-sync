
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Dumbbell, Zap, Shield, Star, Heart } from "lucide-react";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface SidebarFooterProps {
  gymName?: string;
}

export const SidebarFooter: React.FC<SidebarFooterProps> = ({ gymName }) => {
  const deviceInfo = useDeviceInfo();
  const [appVersion, setAppVersion] = useState("در حال بارگذاری...");
  
  useEffect(() => {
    const getVersionFromManifest = async () => {
      try {
        const response = await fetch('/Manifest.json');
        const manifest = await response.json();
        
        if (manifest && manifest.version) {
          setAppVersion(manifest.version);
          localStorage.setItem('app_version', manifest.version);
        } else {
          const cachedVersion = localStorage.getItem('app_version');
          setAppVersion(cachedVersion || "نامشخص");
        }
      } catch (err) {
        console.error('Error loading Manifest.json:', err);
        const cachedVersion = localStorage.getItem('app_version');
        setAppVersion(cachedVersion || "خطا در بارگذاری");
      }
    };
    
    getVersionFromManifest();
  }, []);
  
  const getFooterPadding = () => {
    if (deviceInfo.isMobile) return "p-3";
    if (deviceInfo.isTablet) return "p-3";
    return "p-4";
  };
  
  const getContentPadding = () => {
    if (deviceInfo.isMobile) return "p-3";
    if (deviceInfo.isTablet) return "p-3";
    return "p-3";
  };

  return (
    <motion.div 
      className={cn(
        "border-t border-emerald-200/40 dark:border-emerald-700/40 bg-gradient-to-br from-white/60 via-emerald-50/80 to-sky-50/60 dark:from-slate-800/60 dark:via-emerald-900/80 dark:to-sky-900/60 backdrop-blur-sm relative overflow-hidden",
        getFooterPadding()
      )}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
    >
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-emerald-400/15 to-sky-400/5 rounded-full blur-xl" />
      
      <motion.div 
        className={cn(
          "relative rounded-xl bg-gradient-to-br from-white/70 via-emerald-50/90 to-sky-50/70 dark:from-slate-700/70 dark:via-emerald-800/90 dark:to-sky-800/70 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-600/50 shadow-lg overflow-hidden",
          getContentPadding()
        )}
        whileHover={{ scale: 1.01, y: -1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Animated background effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
          animate={{ x: ['-100%', '200%'] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <div className="relative z-10 flex items-center gap-3">
          {/* Icon Container */}
          <motion.div 
            className="flex-shrink-0 rounded-xl bg-gradient-to-br from-emerald-500 via-sky-500 to-emerald-600 p-2.5 shadow-lg relative overflow-hidden"
            animate={{ 
              boxShadow: [
                "0 0 15px rgba(16, 185, 129, 0.2)",
                "0 0 20px rgba(14, 165, 233, 0.4)",
                "0 0 15px rgba(16, 185, 129, 0.2)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/25 to-transparent" />
            <Dumbbell className="h-5 w-5 text-white relative z-10" />
            
            {/* Floating heart effect */}
            <motion.div
              className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5"
              animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="w-2.5 h-2.5 text-red-400 fill-current" />
            </motion.div>
          </motion.div>
          
          {/* Content */}
          <div className="flex-1">
            <motion.div 
              className="flex items-center gap-1.5 mb-1.5"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
            >
              <span className={cn(
                "font-bold bg-gradient-to-r from-emerald-800 to-sky-700 dark:from-emerald-200 dark:to-sky-300 bg-clip-text text-transparent",
                deviceInfo.isMobile ? "text-sm" : "text-sm"
              )}>
                {gymName || "جیم‌سینک پرو"}
              </span>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Star className="h-3 w-3 text-yellow-500 fill-current" />
              </motion.div>
            </motion.div>
            
            <motion.div 
              className={cn(
                "flex items-center gap-2",
                deviceInfo.isMobile ? "text-2xs" : "text-xs"
              )}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
            >
              <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <Zap className="h-2.5 w-2.5" />
                <span>نسخه {toPersianNumbers(appVersion)}</span>
              </div>
              <div className="w-0.5 h-0.5 bg-emerald-400 rounded-full" />
              <div className="flex items-center gap-1 text-sky-600 dark:text-sky-400">
                <Shield className="h-2.5 w-2.5" />
                <span>حرفه‌ای</span>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Bottom decorative gradient */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 via-sky-500 to-emerald-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        />
      </motion.div>

      {/* Copyright text */}
      <motion.div
        className="mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <p className="text-center text-3xs text-emerald-600/60 dark:text-emerald-400/60">
          ساخته شده با ❤️ برای مربیان حرفه‌ای
        </p>
      </motion.div>
    </motion.div>
  );
};
