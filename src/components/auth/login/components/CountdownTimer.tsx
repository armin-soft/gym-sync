
import React from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface CountdownTimerProps {
  countdown: number;
}

export const CountdownTimer = ({ countdown }: CountdownTimerProps) => {
  if (countdown <= 0) return null;

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;
  const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center justify-center gap-2"
    >
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <Clock className="h-4 w-4 text-orange-400" />
      </motion.div>
      
      <p className="text-white/70 text-sm font-medium">
        ارسال مجدد کد تا {toPersianNumbers(timeString)} دیگر
      </p>
      
      {/* Progress indicator */}
      <motion.div
        className="w-1 h-1 bg-orange-400 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </motion.div>
  );
};
