
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface VoiceQualityIndicatorProps {
  isActive: boolean;
  quality: number; // بین 0 تا 100
  className?: string;
}

export const VoiceQualityIndicator = ({ 
  isActive, 
  quality, 
  className 
}: VoiceQualityIndicatorProps) => {
  // تبدیل کیفیت به یکی از سه حالت (ضعیف، متوسط، خوب)
  const getQualityLevel = (q: number) => {
    if (q < 30) return "ضعیف";
    if (q < 70) return "متوسط";
    return "خوب";
  };
  
  // رنگ‌بندی بر اساس کیفیت
  const getQualityColor = (q: number) => {
    if (q < 30) return "bg-red-500";
    if (q < 70) return "bg-amber-500";
    return "bg-green-500";
  };
  
  // تعداد میله‌های فعال
  const getActiveBars = (q: number) => {
    return Math.floor((q / 100) * 5);
  };
  
  const qualityLevel = getQualityLevel(quality);
  const qualityColor = getQualityColor(quality);
  const activeBars = getActiveBars(quality);
  
  const bars = [0, 1, 2, 3, 4]; // 5 میله
  
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-end h-4 gap-[2px]">
        {bars.map((bar) => (
          <motion.div
            key={bar}
            className={cn(
              "w-[3px] rounded-full",
              isActive && bar < activeBars ? qualityColor : "bg-gray-200 dark:bg-gray-700"
            )}
            style={{
              height: `${(bar + 1) * 20}%`
            }}
            animate={isActive ? {
              opacity: [0.7, 1, 0.7],
              scale: bar < activeBars ? [1, 1.1, 1] : 1,
            } : {}}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>
      
      {isActive && (
        <motion.span
          className="text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          کیفیت: <span className={cn(
            "font-medium",
            quality < 30 ? "text-red-600 dark:text-red-400" :
            quality < 70 ? "text-amber-600 dark:text-amber-400" :
                          "text-green-600 dark:text-green-400"
          )}>{qualityLevel}</span>
        </motion.span>
      )}
    </div>
  );
};

export default VoiceQualityIndicator;
