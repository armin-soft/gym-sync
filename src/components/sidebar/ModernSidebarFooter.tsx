import { toPersianNumbers } from "@/lib/utils/numbers";
import { Dumbbell, Zap, Shield, Star } from "lucide-react";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ModernSidebarFooterProps {
  gymName: string;
}

export function ModernSidebarFooter({ gymName }: ModernSidebarFooterProps) {
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
          if (cachedVersion) {
            setAppVersion(cachedVersion);
          } else {
            setAppVersion("نامشخص");
          }
        }
      } catch (err) {
        console.error('Error loading Manifest.json:', err);
        
        const cachedVersion = localStorage.getItem('app_version');
        if (cachedVersion) {
          setAppVersion(cachedVersion);
        } else {
          setAppVersion("خطا در بارگذاری");
        }
      }
    };
    
    getVersionFromManifest();
  }, []);
  
  const getFooterPadding = () => {
    if (deviceInfo.isMobile) return "p-4";
    if (deviceInfo.isTablet) return "p-5";
    return "p-6";
  };
  
  const getContentPadding = () => {
    if (deviceInfo.isMobile) return "p-4";
    if (deviceInfo.isTablet) return "p-4";
    return "p-5";
  };
  
  const getIconPadding = () => {
    if (deviceInfo.isMobile) return "p-2.5";
    if (deviceInfo.isTablet) return "p-3";
    return "p-3";
  };
  
  const getTextSize = () => {
    if (deviceInfo.isMobile) return "text-sm";
    if (deviceInfo.isTablet) return "text-base";
    return "text-lg";
  };
  
  const getVersionSize = () => {
    if (deviceInfo.isMobile) return "text-xs";
    if (deviceInfo.isTablet) return "text-sm";
    return "text-sm";
  };

  return (
    <motion.div 
      className={cn("border-t border-gradient-to-r from-emerald-200/40 via-sky-200/40 to-emerald-200/40 dark:from-emerald-700/40 dark:via-sky-700/40 dark:to-emerald-700/40 bg-gradient-to-br from-emerald-50/80 to-sky-50/60 dark:from-emerald-800/70 dark:to-sky-800/50 backdrop-blur-sm relative overflow-hidden", getFooterPadding())}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-emerald-400/20 to-sky-400/10 rounded-full blur-xl" />
      
      <motion.div 
        className={cn(
          "flex items-center gap-4 rounded-2xl bg-gradient-to-br from-emerald-50/90 via-sky-50/70 to-emerald-50/80 dark:from-emerald-700/80 dark:via-sky-700/60 dark:to-emerald-800/70 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-600/50 shadow-xl relative overflow-hidden", 
          getContentPadding()
        )}
        whileHover={{ scale: 1.02, y: -2 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Icon Container */}
        <motion.div 
          className={cn(
            "flex-shrink-0 rounded-2xl bg-gradient-to-br from-emerald-500 via-sky-500 to-emerald-600 shadow-xl relative overflow-hidden", 
            getIconPadding()
          )}
          animate={{ 
            boxShadow: [
              "0 0 20px rgba(16, 185, 129, 0.3)",
              "0 0 30px rgba(14, 165, 233, 0.6)",
              "0 0 20px rgba(16, 185, 129, 0.3)"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent" />
          <Dumbbell className="h-6 w-6 text-white relative z-10" />
          
          {/* Floating Elements */}
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        
        {/* Content */}
        <div className="flex-1">
          <motion.div 
            className="flex items-center gap-2 mb-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <span className={cn("font-bold bg-gradient-to-r from-emerald-800 to-sky-700 dark:from-emerald-200 dark:to-sky-300 bg-clip-text text-transparent", getTextSize())}>
              {gymName || "سیستم مدیریت حرفه‌ای"}
            </span>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Star className="h-4 w-4 text-yellow-500" />
            </motion.div>
          </motion.div>
          
          <motion.div 
            className={cn("text-emerald-600 dark:text-emerald-400 flex items-center gap-2", getVersionSize())}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex items-center gap-1">
              <Zap className="h-3 w-3 text-emerald-500" />
              <span>نسخه {toPersianNumbers(appVersion)}</span>
            </div>
            <div className="w-1 h-1 bg-emerald-400 rounded-full" />
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3 text-sky-500" />
              <span>حرفه‌ای</span>
            </div>
          </motion.div>
        </div>
        
        {/* Decorative Gradient Line */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-sky-500 to-emerald-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        />
      </motion.div>
    </motion.div>
  );
}
