
import React from "react";
import { motion } from "framer-motion";
import { Timer } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface CountdownTimerProps {
  countdown: number;
}

export const CountdownTimer = ({ countdown }: CountdownTimerProps) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${toPersianNumbers(minutes.toString().padStart(2, '0'))}:${toPersianNumbers(remainingSeconds.toString().padStart(2, '0'))}`;
  };

  if (countdown <= 0) return null;

  return (
    <motion.div 
      className="flex items-center justify-center gap-2 text-white/70 text-sm"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <Timer className="h-4 w-4" />
      <span>زمان باقی‌مانده: {formatTime(countdown)}</span>
    </motion.div>
  );
};
