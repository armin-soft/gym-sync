
import { memo, useEffect } from "react";
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
export const LoadingScreen = memo(({ onLoadingComplete, isVisible = true }: LoadingScreenProps) => {
  const { progress, gymName, loadingText } = useLoadingState();
  
  // اجرای کالبک تکمیل بارگذاری
  useEffect(() => {
    if (progress === 100 && onLoadingComplete) {
      const timer = setTimeout(() => {
        onLoadingComplete();
      }, 500);
      
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
        exit={{ opacity: 0 }}
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
