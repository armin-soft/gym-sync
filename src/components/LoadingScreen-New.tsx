
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingBackground-New } from "./loading-new/LoadingBackground-New";
import { LoadingContent-New } from "./loading-new/LoadingContent-New";
import { LoadingProgress-New } from "./loading-new/LoadingProgress-New";
import { useLoadingState-New } from "@/hooks/useLoadingState-New";

interface LoadingScreenNewProps {
  onLoadingComplete?: () => void;
  isVisible?: boolean;
}

export const LoadingScreenNew = React.memo<LoadingScreenNewProps>(({ 
  onLoadingComplete, 
  isVisible = true 
}) => {
  const { progress, loadingText, gymName, systemInfo } = useLoadingState-New();
  
  React.useEffect(() => {
    if (progress === ۱۰۰ && onLoadingComplete) {
      console.log('Loading completed, transitioning to main app...');
      const timer = setTimeout(() => {
        console.log('All systems ready, launching application...');
        onLoadingComplete();
      }, ۸۰۰);
      
      return () => clearTimeout(timer);
    }
  }, [progress, onLoadingComplete]);
  
  if (!isVisible) return null;
  
  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key="loading-screen-new"
        initial={{ opacity: ۰ }}
        animate={{ opacity: ۱ }}
        exit={{ opacity: ۰ }}
        transition={{ duration: ۰.۵ }}
        className="fixed inset-0 w-full h-full overflow-hidden z-[9999]"
        style={{ position: 'fixed', top: ۰, left: ۰, width: '100%', height: '100%' }}
      >
        <LoadingBackground-New />
        
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
          <LoadingContent-New 
            gymName={gymName}
            systemInfo={systemInfo}
          />
          
          <LoadingProgress-New 
            progress={progress}
            loadingText={loadingText}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
});

LoadingScreenNew.displayName = "LoadingScreenNew";
