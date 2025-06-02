
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
  const { progress, loadingText, gymName, systemInfo } = useLoadingState();
  
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
        key="loading-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 w-full h-full overflow-hidden z-[9999]"
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}
      >
        <LoadingBackground />
        
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
          <LoadingContent 
            gymName={gymName}
            systemInfo={systemInfo}
          />
          
          <LoadingProgress 
            progress={progress}
            loadingText={loadingText}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
});

LoadingScreen.displayName = "LoadingScreen";
