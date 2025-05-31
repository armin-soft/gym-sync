
import { motion } from "framer-motion";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Info } from "lucide-react";

export const ModernLoadingTip = () => {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
    >
      {/* Main tip */}
      <div className="max-w-md mx-auto bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
            <Info className="w-4 h-4 text-blue-300" />
          </div>
          <div className="text-center">
            <p className="text-sm text-white/80 leading-relaxed">
              با جیم سینک، مدیریت باشگاه و مربیان در تمام مراحل همراه شماست
            </p>
          </div>
        </div>
      </div>

      {/* Version and decorative elements */}
      <motion.div
        className="text-center text-white/60 text-sm space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <p>سیستم مدیریت حرفه‌ای ورزشی - نسخه {toPersianNumbers("4.4.1")}</p>
        
        {/* Decorative dots */}
        <div className="flex justify-center gap-2">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-white/30 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
