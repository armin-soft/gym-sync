
import React from "react";
import { motion } from "framer-motion";
import { ModernLoadingBackground } from "./loading/ModernLoadingBackground";
import { ModernLoadingIcon } from "./loading/ModernLoadingIcon";
import { ModernLoadingProgress } from "./loading/ModernLoadingProgress";
import { ModernLoadingTip } from "./loading/ModernLoadingTip";
import { ModernLoadingHeader } from "./loading/ModernLoadingHeader";
import { ModernLoadingStats } from "./loading/ModernLoadingStats";
import { useLoadingState } from "@/hooks/useLoadingState";

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
  isVisible?: boolean;
}

export const LoadingScreen = React.memo<LoadingScreenProps>(({ onLoadingComplete, isVisible = true }) => {
  const { progress, gymName, loadingText } = useLoadingState();
  
  React.useEffect(() => {
    if (progress === 100 && onLoadingComplete) {
      console.log('Loading completed, waiting for components to fully initialize...');
      const timer = setTimeout(() => {
        console.log('All components ready, hiding loading screen');
        onLoadingComplete();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [progress, onLoadingComplete]);
  
  if (!isVisible) return null;
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const contentVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  };
  
  return (
    <motion.div 
      key="loading-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="fixed inset-0 flex flex-col items-center justify-center z-50 w-screen h-screen overflow-hidden"
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    >
      <ModernLoadingBackground />
      
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-2xl">
          <motion.div variants={contentVariants} className="text-center space-y-12">
            
            <ModernLoadingHeader gymName={gymName} />
            
            <ModernLoadingIcon />
            
            <ModernLoadingProgress progress={progress} loadingText={loadingText} />
            
            <ModernLoadingStats />
            
            <ModernLoadingTip />
            
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
});

LoadingScreen.displayName = "LoadingScreen";
