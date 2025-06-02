
import React from "react";
import { motion } from "framer-motion";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { CheckCircle, Circle, Clock } from "lucide-react";

interface LoadingProgressProps {
  progress: number;
  loadingText: string;
}

export const LoadingProgress = ({ progress, loadingText }: LoadingProgressProps) => {
  const getStatusIcon = () => {
    if (progress === 100) return CheckCircle;
    if (progress > 0) return Clock;
    return Circle;
  };
  
  const StatusIcon = getStatusIcon();
  
  return (
    <div className="w-full max-w-xs mx-auto">
      {/* نوار پیشرفت اصلی */}
      <div className="mb-3">
        <div className="bg-white/10 backdrop-blur-lg rounded-full h-2 overflow-hidden border border-white/20">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ 
              duration: 0.8,
              ease: "easeOut"
            }}
            className="h-full relative overflow-hidden bg-gradient-to-r from-emerald-400 to-sky-400"
          >
            {/* افکت درخشندگی */}
            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-1/3"
            />
          </motion.div>
        </div>
        
        {/* درصد پیشرفت */}
        <motion.div
          key={progress}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex justify-between items-center mt-2"
        >
          <div className="flex items-center gap-1">
            <StatusIcon className={`w-3 h-3 ${progress === 100 ? 'text-emerald-300' : 'text-white/70'}`} />
            <span className="text-xs text-white/70">وضعیت</span>
          </div>
          
          <div className="bg-white/15 backdrop-blur-lg px-2 py-0.5 rounded-full border border-white/20">
            <span className="text-xs font-bold text-white">
              {toPersianNumbers(progress)}٪
            </span>
          </div>
        </motion.div>
      </div>
      
      {/* متن وضعیت */}
      <motion.div
        key={loadingText}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-3 border border-white/20">
          <p className="text-xs text-white/90 leading-relaxed">
            {loadingText}
          </p>
          
          {/* نقاط انیمیشنی */}
          <div className="flex justify-center items-center gap-1 mt-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
                className="w-1.5 h-1.5 rounded-full bg-white/50"
              />
            ))}
          </div>
        </div>
      </motion.div>
      
      {/* اطلاعات تکمیلی */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="mt-3 text-center"
      >
        <p className="text-xs text-white/60">
          لطفاً صبر کنید...
        </p>
      </motion.div>
    </div>
  );
};
