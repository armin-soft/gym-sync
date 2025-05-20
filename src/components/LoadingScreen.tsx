
import { memo } from "react";
import { motion } from "framer-motion";
import { LoadingBackground } from "./loading/LoadingBackground";
import { LoadingIcon } from "./loading/LoadingIcon";
import { LoadingProgress } from "./loading/LoadingProgress";
import { LoadingTip } from "./loading/LoadingTip";
import { useLoadingState } from "@/hooks/useLoadingState";

// Use memo to prevent unnecessary re-renders
export const LoadingScreen = memo(() => {
  // Make sure the hook is called inside the function component body
  const { progress, gymName, loadingText } = useLoadingState();
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }} 
      className="fixed inset-0 flex flex-col items-center justify-center z-50 w-screen h-screen overflow-hidden"
    >
      <LoadingBackground />
      
      {/* Main content */}
      <div className="w-full max-w-md px-5 sm:px-6 py-8 flex flex-col items-center relative z-10">
        <LoadingIcon />
        
        {/* Title */}
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
  );
});

// Set displayName for better debugging
LoadingScreen.displayName = "LoadingScreen";
