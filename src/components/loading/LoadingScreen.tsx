
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingBackground } from "./components/LoadingBackground";
import { LoadingContent } from "./components/LoadingContent";
import { LoadingProgress } from "./components/LoadingProgress";
import { useLoadingState } from "@/hooks/loading/useLoadingState";

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
  isVisible?: boolean;
}

export const LoadingScreen = React.memo<LoadingScreenProps>(({ 
  onLoadingComplete, 
  isVisible = true 
}) => {
  const { progress, loadingText, gymName, systemInfo, isComplete } = useLoadingState();
  
  React.useEffect(() => {
    if (isComplete && progress === 100 && onLoadingComplete) {
      console.log('Loading completed, transitioning to main app...');
      const timer = setTimeout(() => {
        console.log('All systems ready, launching application...');
        onLoadingComplete();
      }, 1200);
      
      return () => clearTimeout(timer);
    }
  }, [progress, isComplete, onLoadingComplete]);
  
  if (!isVisible) return null;
  
  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key="loading-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 w-full h-full z-[9999] bg-gradient-to-br from-emerald-600 via-sky-500 to-emerald-500"
      >
        <LoadingBackground />
        
        <div className="relative z-10 w-full min-h-screen overflow-y-auto">
          <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <LoadingContent 
              gymName={gymName}
              systemInfo={systemInfo}
            />
            
            <LoadingProgress 
              progress={progress}
              loadingText={loadingText}
            />
          </div>
          
          {/* محتوای اضافی برای نمایش اسکرول */}
          <div className="w-full max-w-4xl mx-auto px-4 pb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-white font-bold text-lg mb-2">مدیریت شاگردان</h3>
                <p className="text-white/80 text-sm">سیستم پیشرفته مدیریت اطلاعات شاگردان</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-white font-bold text-lg mb-2">برنامه تمرینی</h3>
                <p className="text-white/80 text-sm">تنظیم برنامه‌های تمرینی اختصاصی</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-white font-bold text-lg mb-2">تغذیه هوشمند</h3>
                <p className="text-white/80 text-sm">راهنمایی‌های تغذیه‌ای شخصی‌سازی شده</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-white font-bold text-lg mb-2">مکمل‌ها و ویتامین‌ها</h3>
                <p className="text-white/80 text-sm">مدیریت مکمل‌های ورزشی</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-white font-bold text-lg mb-2">گزارش‌گیری</h3>
                <p className="text-white/80 text-sm">تحلیل پیشرفت و عملکرد</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-white font-bold text-lg mb-2">پشتیبان‌گیری</h3>
                <p className="text-white/80 text-sm">حفظ امن اطلاعات و بازیابی</p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-white/60 text-sm">
                © 2024 GymSync Pro - سیستم جامع مدیریت باشگاه
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
});

LoadingScreen.displayName = "LoadingScreen";
