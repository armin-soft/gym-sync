
import { motion } from "framer-motion";
import { Timer } from "lucide-react";

interface CountdownDisplayProps {
  timeLeft: string;
}

export const CountdownDisplay = ({ timeLeft }: CountdownDisplayProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-2 text-white/90">
        <Timer className="h-5 w-5 text-orange-400 animate-pulse" />
        <p className="font-medium text-sm">زمان باقی‌مانده تا رفع محدودیت:</p>
      </div>
      
      <div className="relative">
        {/* Background blur effect */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"></div>
        
        {/* Timer display */}
        <div className="relative p-6 text-center">
          <motion.div 
            className="bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-xl py-4 px-6 border border-red-400/30"
            animate={{
              boxShadow: [
                "0 0 0 rgba(239, 68, 68, 0.1)",
                "0 0 20px rgba(239, 68, 68, 0.3)",
                "0 0 0 rgba(239, 68, 68, 0.1)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <p className="text-xl font-bold text-red-300 persian-numbers">{timeLeft}</p>
          </motion.div>
        </div>
        
        {/* Focus indicator */}
        <motion.div 
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-red-400 to-orange-500"
          animate={{ width: ["0%", "100%", "0%"] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>
    </div>
  );
};
