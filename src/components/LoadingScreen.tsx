
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Simulate asset loading with realistic progress
    const steps = [
      { target: 15, duration: 400 },
      { target: 35, duration: 600 },
      { target: 65, duration: 800 },
      { target: 85, duration: 500 },
      { target: 100, duration: 700 }
    ];
    
    let currentStep = 0;
    let timer: ReturnType<typeof setTimeout>;
    
    const updateProgress = () => {
      if (currentStep < steps.length) {
        const { target, duration } = steps[currentStep];
        const startValue = currentStep > 0 ? steps[currentStep - 1].target : 0;
        const increment = (target - startValue) / (duration / 50);
        let currentValue = startValue;
        
        const progressInterval = setInterval(() => {
          currentValue += increment;
          if (currentValue >= target) {
            clearInterval(progressInterval);
            setProgress(target);
            currentStep++;
            
            if (currentStep < steps.length) {
              timer = setTimeout(updateProgress, 100);
            } else {
              // Loading complete
              setTimeout(() => {
                onLoadingComplete();
              }, 500);
            }
          } else {
            setProgress(Math.round(currentValue));
          }
        }, 50);
      }
    };
    
    // Start the progress animation
    updateProgress();
    
    return () => {
      clearTimeout(timer);
    };
  }, [onLoadingComplete]);
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-background to-background/95 z-50"
    >
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="w-full max-w-md px-8 py-10 flex flex-col items-center"
      >
        <div className="relative mb-4">
          <Loader className="h-16 w-16 text-primary animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Weight className="h-8 w-8 text-primary" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold mb-8 text-center">
          در حال بارگذاری برنامه مدیریت باشگاه
        </h1>
        
        <div className="w-full space-y-4">
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
};

// Import the Weight icon
import { Weight } from "lucide-react";
