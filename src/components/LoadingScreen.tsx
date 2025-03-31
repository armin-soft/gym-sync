
import { useState, useEffect, memo } from "react";
import { Progress } from "@/components/ui/progress";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { AppIcon } from "./ui/app-icon";

// Using memo to prevent unnecessary re-renders
export const LoadingScreen = memo(() => {
  const [progress, setProgress] = useState(0);
  const [gymName, setGymName] = useState("");
  
  useEffect(() => {
    // Load gym name from trainer profile - optimize by doing this once
    try {
      const savedProfile = localStorage.getItem('trainerProfile');
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        if (profile.gymName) {
          setGymName(profile.gymName);
        }
      }
    } catch (error) {
      console.error('Error loading gym name:', error);
    }
    
    // Simulate asset loading with realistic progress - optimized version
    let currentProgress = 0;
    const targetProgress = 100;
    const duration = 2000; // 2 seconds total
    const step = 5;
    const interval = duration / (targetProgress / step);
    
    const timer = setInterval(() => {
      currentProgress += step;
      setProgress(currentProgress);
      
      if (currentProgress >= targetProgress) {
        clearInterval(timer);
      }
    }, interval);
    
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }} // Faster animation
      className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-background to-background/95 z-50"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }} // Faster animation
        className="w-full max-w-md px-8 py-8 flex flex-col items-center"
      >
        <div className="relative mb-4">
          <Loader className="h-16 w-16 text-primary animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <AppIcon size="lg" animated />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold mb-6 text-center">
          {gymName ? (
            <>در حال بارگذاری مدیریت برنامه {gymName}</>
          ) : (
            <>در حال بارگذاری مدیریت برنامه</>
          )}
        </h1>
        
        <div className="w-full space-y-3">
          <Progress value={progress} className="h-3" />
          
          <div className="flex justify-between items-center text-sm font-medium">
            <span className="text-muted-foreground">درحال بارگذاری...</span>
            <span className="text-primary font-bold">
              {toPersianNumbers(progress)}٪
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});
