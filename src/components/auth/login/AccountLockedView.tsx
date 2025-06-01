
import { motion } from "framer-motion";
import { useEffect } from "react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { LockIcon } from "./components/LockIcon";
import { LockHeader } from "./components/LockHeader";
import { SecurityAlert } from "./components/SecurityAlert";
import { CountdownDisplay } from "./components/CountdownDisplay";
import { SecurityFooter } from "./components/SecurityFooter";

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
        <LockIcon />
        <LockHeader />
      </motion.div>

      {/* Alert Message */}
      <motion.div variants={itemVariants} className="mb-6">
        <SecurityAlert />
      </motion.div>

      {/* Countdown Timer */}
      <motion.div variants={itemVariants}>
        <CountdownDisplay timeLeft={timeLeft} />
      </motion.div>

      {/* Security Message */}
      <motion.div 
        variants={itemVariants}
        className="mt-6 space-y-6"
      >
        <SecurityFooter />
      </motion.div>
    </motion.div>
  );
};
