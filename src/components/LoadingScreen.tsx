
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingBackground } from "./loading/LoadingBackground";
import { LoadingIcon } from "./loading/LoadingIcon";
import { LoadingProgress } from "./loading/LoadingProgress";
import { LoadingTip } from "./loading/LoadingTip";
import { useLoadingState } from "@/hooks/useLoadingState";

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
  isVisible?: boolean;
}

// استفاده از memo برای جلوگیری از رندر مجدد غیرضروری
export const LoadingScreen = React.memo<LoadingScreenProps>(({ onLoadingComplete, isVisible = true }) => {
  const { progress, gymName, loadingText } = useLoadingState();
  
  // اجرای کالبک تکمیل بارگذاری با تأخیر بیشتر
  React.useEffect(() => {
    if (progress === 100 && onLoadingComplete) {
      console.log('Loading completed, waiting for components to fully initialize...');
      const timer = setTimeout(() => {
        console.log('All components ready, hiding loading screen');
        onLoadingComplete();
      }, 1500); // تأخیر بیشتر برای اطمینان از بارگذاری کامل
      
      return () => clearTimeout(timer);
    }
  }, [progress, onLoadingComplete]);
  
  if (!isVisible) return null;
  
  return (
    <AnimatePresence>
      <motion.div 
        key="loading-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8 } }}
        transition={{ duration: 0.4 }} 
        className="fixed inset-0 flex flex-col items-center justify-center z-50 w-screen h-screen overflow-hidden"
      >
        <LoadingBackground />
        
        {/* محتوای اصلی */}
        <div className="w-full max-w-md px-5 sm:px-6 py-8 flex flex-col items-center relative z-10">
          <LoadingIcon />
          
          {/* عنوان */}
          <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-white relative">
            {gymName ? (
              <>
                <span className="opacity-90">در حال بارگذاری مدیریت برنامه</span>{" "}
                <span className="text-white">{gymName}</span>
              </>
            ) : (
              <span className="opacity-90">در حال بارگذاری مدیریت برنامه</span>
            )}
          </h1>
          
          <LoadingProgress progress={progress} loadingText={loadingText} />
          
          <LoadingTip />
        </div>
      </motion.div>
    </AnimatePresence>
  );
});

// تعیین displayName برای بهبود ابزارهای debugging
LoadingScreen.displayName = "LoadingScreen";
