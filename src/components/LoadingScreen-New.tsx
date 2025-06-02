
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingBackgroundNew } from "./loading-new/LoadingBackground-New";
import { LoadingContentNew } from "./loading-new/LoadingContent-New";
import { LoadingProgressNew } from "./loading-new/LoadingProgress-New";
import { useLoadingStateNew } from "@/hooks/useLoadingState-New";

interface LoadingScreenNewProps {
  onLoadingComplete?: () => void;
  isVisible?: boolean;
}

export const LoadingScreenNew = React.memo<LoadingScreenNewProps>(({ 
  onLoadingComplete, 
  isVisible = true 
}) => {
  const { progress, loadingText, gymName, systemInfo } = useLoadingStateNew();
  
  React.useEffect(() => {
    if (progress === 100 && onLoadingComplete) {
      console.log('Loading completed, transitioning to main app...');
      const timer = setTimeout(() => {
        console.log('All systems ready, launching application...');
        onLoadingComplete();
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [progress, onLoadingComplete]);
  
  if (!isVisible) return null;
  
  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key="loading-screen-new"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 w-full h-full overflow-hidden z-[9999]"
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}
      >
        <LoadingBackgroundNew />
        
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
          <LoadingContentNew 
            gymName={gymName}
            systemInfo={systemInfo}
          />
          
          <LoadingProgressNew 
            progress={progress}
            loadingText={loadingText}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
});

LoadingScreenNew.displayName = "LoadingScreenNew";
