
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
        window.location.reload();
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      let timeString = "";
      if (days > 0) {
        timeString += `${toPersianNumbers(days)} روز `;
      }
      if (hours > 0) {
        timeString += `${toPersianNumbers(hours)} ساعت `;
      }
      timeString += `${toPersianNumbers(minutes)} دقیقه ${toPersianNumbers(seconds)} ثانیه`;

      setTimeLeft(timeString);
    }, 1000);

    return () => clearInterval(interval);
  }, [lockExpiry, setTimeLeft]);

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        staggerChildren: 0.15
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
        stiffness: 400,
        damping: 30
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-8"
      dir="rtl"
    >
      {/* Lock Icon with enhanced styling */}
      <motion.div 
        variants={itemVariants}
        className="text-center mb-8"
      >
        <LockIcon />
        <LockHeader />
      </motion.div>

      {/* Enhanced Alert Message */}
      <motion.div variants={itemVariants} className="mb-8">
        <SecurityAlert />
      </motion.div>

      {/* Enhanced Countdown Timer */}
      <motion.div variants={itemVariants} className="mb-8">
        <CountdownDisplay timeLeft={timeLeft} />
      </motion.div>

      {/* Enhanced Security Message */}
      <motion.div 
        variants={itemVariants}
        className="space-y-6"
      >
        <SecurityFooter />
      </motion.div>
    </motion.div>
  );
};
