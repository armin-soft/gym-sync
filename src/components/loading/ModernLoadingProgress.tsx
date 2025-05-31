
import { Progress } from "@/components/ui/progress";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface ModernLoadingProgressProps {
  progress: number;
  loadingText: string;
}

export const ModernLoadingProgress = ({ progress, loadingText }: ModernLoadingProgressProps) => {
  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      {/* Progress Bar Container */}
      <div className="relative">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div className="space-y-4">
            <Progress 
              value={progress} 
              className="h-4 bg-white/10 overflow-hidden rounded-full" 
              indicatorClassName="bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 transition-all duration-500 ease-out"
              showAnimation={progress < 100}
            />
            
            <div className="flex justify-between items-center">
              <motion.span 
                className="text-white/70 text-sm font-medium"
                key={loadingText}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {loadingText}
              </motion.span>
              
              <div className="flex items-center gap-2">
                {progress === 100 && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </motion.div>
                )}
                <div className="bg-white/10 px-3 py-1 rounded-full text-white font-bold backdrop-blur-sm border border-white/20">
                  {toPersianNumbers(progress)}٪
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Glow effect for progress container */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl -z-10"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [0.95, 1.05, 0.95]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Progress milestones */}
      <div className="flex justify-between text-xs text-white/50">
        <span>شروع</span>
        <span>در حال پردازش</span>
        <span>تکمیل</span>
      </div>
    </div>
  );
};
