
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Clock, Shield } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { containerVariants, lockIconVariants, lockTimerVariants } from "./form/AnimationVariants";

// Extracted subcomponents for better organization
const LockIcon = () => (
  <motion.div 
    className="rounded-full bg-destructive/10 p-3 sm:p-5"
    whileHover={lockIconVariants.hover}
    whileTap={lockIconVariants.tap}
  >
    <AlertTriangle className="h-8 sm:h-12 w-8 sm:w-12 text-destructive" />
  </motion.div>
);

const LockAlert = () => (
  <Alert variant="destructive" className="border-destructive/30 bg-destructive/10">
    <AlertDescription className="text-center font-semibold py-1 text-xs sm:text-sm">
      حساب کاربری شما موقتاً قفل شده است
    </AlertDescription>
  </Alert>
);

const LockTimer = ({ timeLeft }: { timeLeft: string }) => (
  <div className="w-full space-y-2 sm:space-y-3">
    <div className="flex items-center justify-center space-x-2 space-x-reverse">
      <Clock className="h-4 sm:h-5 w-4 sm:w-5 text-primary animate-pulse" />
      <p className="text-muted-foreground font-medium text-xs sm:text-sm">زمان باقی‌مانده تا رفع محدودیت:</p>
    </div>
    <motion.div 
      className="bg-red-600/15 rounded-lg py-2 sm:py-3 px-3 sm:px-4 text-center border-2 border-red-600/30 shadow-inner shadow-red-500/10"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ 
        scale: 1,
        opacity: 1,
        boxShadow: [
          "0 0 0 rgba(239, 68, 68, 0.1)",
          "0 0 20px rgba(239, 68, 68, 0.2)",
          "0 0 0 rgba(239, 68, 68, 0.1)"
        ],
        transition: {
          boxShadow: {
            repeat: Infinity,
            duration: 2
          }
        }
      }}
    >
      <p className="text-base sm:text-lg font-bold text-red-700 persian-numbers">{timeLeft}</p>
    </motion.div>
  </div>
);

const SecurityMessage = () => (
  <motion.div 
    className="flex items-center justify-center text-xs sm:text-sm text-muted-foreground space-x-2 space-x-reverse mt-2 sm:mt-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1, transition: { delay: 0.6 } }}
  >
    <Shield className="h-3 sm:h-4 w-3 sm:w-4" />
    <p>این محدودیت برای حفظ امنیت حساب شما اعمال شده است</p>
  </motion.div>
);

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

  return (
    <div className="relative z-10 p-4 sm:p-6">
      <motion.div 
        variants={containerVariants}
        className="flex flex-col items-center justify-center space-y-4 sm:space-y-6 p-2 sm:p-4"
      >
        <LockIcon />
        <LockAlert />
        <LockTimer timeLeft={timeLeft} />
        <SecurityMessage />
      </motion.div>
    </div>
  );
};
