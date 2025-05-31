
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
      className={cn("border-t border-gradient-to-r from-violet-200/30 via-blue-200/30 to-purple-200/30 dark:from-violet-700/30 dark:via-blue-700/30 dark:to-purple-700/30 bg-gradient-to-br from-white/60 to-gray-50/40 dark:from-gray-800/60 dark:to-gray-700/40 backdrop-blur-sm relative overflow-hidden", getFooterPadding())}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-violet-400/20 to-transparent rounded-full blur-xl" />
      
      <motion.div 
        className={cn(
          "flex items-center gap-4 rounded-2xl bg-gradient-to-br from-white/80 via-gray-50/60 to-violet-50/40 dark:from-gray-700/80 dark:via-gray-600/60 dark:to-violet-800/40 backdrop-blur-sm border border-white/50 dark:border-gray-600/50 shadow-xl relative overflow-hidden", 
          getContentPadding()
        )}
        whileHover={{ scale: 1.02, y: -2 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Icon Container */}
        <motion.div 
          className={cn(
            "flex-shrink-0 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 shadow-xl relative overflow-hidden", 
            getIconPadding()
          )}
          animate={{ 
            boxShadow: [
              "0 0 20px rgba(139, 92, 246, 0.3)",
              "0 0 30px rgba(139, 92, 246, 0.6)",
              "0 0 20px rgba(139, 92, 246, 0.3)"
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
            <span className={cn("font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent", getTextSize())}>
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
            className={cn("text-slate-600 dark:text-slate-400 flex items-center gap-2", getVersionSize())}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex items-center gap-1">
              <Zap className="h-3 w-3 text-emerald-500" />
              <span>نسخه {toPersianNumbers(appVersion)}</span>
            </div>
            <div className="w-1 h-1 bg-slate-400 rounded-full" />
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3 text-blue-500" />
              <span>حرفه‌ای</span>
            </div>
          </motion.div>
        </div>
        
        {/* Decorative Gradient Line */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-blue-500 to-purple-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        />
      </motion.div>
    </motion.div>
  );
}
