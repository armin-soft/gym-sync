
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Clock, Shield, Lock, Timer, Ban } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface AccountLockedViewProps {
  timeLeft: string;
  setTimeLeft: (time: string) => void;
  lockExpiry: Date | null;
}

export const AccountLockedView = ({ 
  timeLeft, 
  setTimeLeft, 
  lockExpiry 
}: AccountLockedViewProps) => {
  // Timer effect for countdown
  useEffect(() => {
    if (!lockExpiry) return;

    const interval = setInterval(() => {
      const now = new Date();
      const diff = lockExpiry.getTime() - now.getTime();
      
      if (diff <= 0) {
        localStorage.removeItem("loginLockExpiry");
        localStorage.removeItem("loginAttempts");
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${toPersianNumbers(days)} روز ${toPersianNumbers(hours)} ساعت ${toPersianNumbers(minutes)} دقیقه ${toPersianNumbers(seconds)} ثانیه`);
    }, 1000);

    return () => clearInterval(interval);
  }, [lockExpiry, setTimeLeft]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-8"
    >
      {/* Lock Icon with modern styling */}
      <motion.div 
        variants={itemVariants}
        className="text-center mb-8"
      >
        <div className="relative mx-auto mb-6 w-20 h-20 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl opacity-90 blur-sm"></div>
          <div className="relative bg-gradient-to-br from-red-500 to-red-700 rounded-2xl p-4 shadow-2xl">
            <Lock className="h-12 w-12 text-white" />
          </div>
          
          {/* Warning badge */}
          <motion.div
            className="absolute -top-1 -right-1 bg-yellow-500 rounded-full p-1"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <AlertTriangle className="h-3 w-3 text-white" />
          </motion.div>

          {/* Security badge */}
          <motion.div
            className="absolute -bottom-1 -left-1 bg-orange-500 rounded-full p-1"
            animate={{ rotate: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Ban className="h-3 w-3 text-white" />
          </motion.div>
        </div>
        
        {/* Title with gradient */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="text-2xl font-bold bg-gradient-to-r from-red-400 via-red-300 to-orange-300 bg-clip-text text-transparent mb-3">
            حساب کاربری موقتاً قفل شده
          </h1>
          
          <motion.p 
            className="text-white/70 text-sm leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            دسترسی شما به دلیل تلاش‌های ناموفق متعدد محدود شده است
          </motion.p>

          {/* Decorative line */}
          <motion.div
            className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-red-400/50 to-transparent"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          />
        </motion.div>
      </motion.div>

      {/* Alert Message */}
      <motion.div variants={itemVariants} className="mb-6">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-red-500/20 backdrop-blur-sm rounded-2xl"></div>
          <div className="relative p-4 border border-red-400/30 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm text-red-200 font-medium">دسترسی موقتاً مسدود شده است</p>
              </div>
            </div>
            
            {/* Animated border */}
            <motion.div
              className="absolute inset-0 rounded-2xl border border-red-400/50"
              animate={{
                borderColor: ["rgba(248, 113, 113, 0.3)", "rgba(248, 113, 113, 0.6)", "rgba(248, 113, 113, 0.3)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>

      {/* Countdown Timer */}
      <motion.div variants={itemVariants} className="space-y-4">
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
      </motion.div>

      {/* Security Message */}
      <motion.div 
        variants={itemVariants}
        className="mt-6 flex items-center justify-center gap-2 text-white/60"
      >
        <Shield className="h-4 w-4 text-blue-400" />
        <p className="text-sm">این محدودیت برای حفظ امنیت حساب شما اعمال شده است</p>
      </motion.div>

      {/* Bottom decorative elements */}
      <motion.div
        variants={itemVariants}
        className="mt-8 flex justify-center gap-1"
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-red-400/50 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};
