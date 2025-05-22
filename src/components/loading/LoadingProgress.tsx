
import { Progress } from "@/components/ui/progress";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { motion } from "framer-motion";

interface LoadingProgressProps {
  progress: number;
  loadingText: string;
}

export const LoadingProgress = ({ progress, loadingText }: LoadingProgressProps) => {
  return (
    <div className="w-full">
      <motion.div 
        className="space-y-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Progress 
          value={progress} 
          className="h-3 sm:h-4 bg-white/10 overflow-hidden" 
          indicatorClassName="bg-white"
        />
        <div className="flex justify-between items-center text-sm">
          <span className="text-white/70">{loadingText}</span>
          <motion.div 
            className="bg-white/10 px-3 py-1 rounded-full text-white font-bold"
            key={Math.floor(progress)} // Force animation restart on significant progress change
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 10 }}
          >
            {toPersianNumbers(Math.floor(progress))}٪
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
